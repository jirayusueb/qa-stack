#!/usr/bin/env node
// Live eval helper. Lists cases, prints a case brief, records a verdict.
// It never calls a model. A human runs the case and records the result.
import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync, appendFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { parseYamlList } from './lib/yaml.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RESULTS = join(ROOT, 'evals/results');
const args = process.argv.slice(2);

function option(name) {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? undefined : args[index + 1];
}
function has(name) {
  return args.includes(`--${name}`);
}
function suiteNames() {
  return readdirSync(join(ROOT, 'evals')).filter((name) => name.endsWith('.yaml')).map((name) => name.replace(/\.yaml$/, ''));
}
function loadSuite(name) {
  const rel = `evals/${name}.yaml`;
  if (!existsSync(join(ROOT, rel))) {
    console.error(`unknown suite: ${name}`);
    process.exit(2);
  }
  return parseYamlList(readFileSync(join(ROOT, rel), 'utf8'));
}
function commit() {
  const result = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: ROOT, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : 'unknown';
}
function resultsFile(suite) {
  const base = join(RESULTS, `${suite}-${commit()}.md`);
  if (!existsSync(base)) return base;
  const text = readFileSync(base, 'utf8');
  if (text.includes(`| ${option('case')} |`)) {
    let index = 2;
    while (existsSync(join(RESULTS, `${suite}-${commit()}-${index}.md`))) index += 1;
    return join(RESULTS, `${suite}-${commit()}-${index}.md`);
  }
  return base;
}
function ensureHeader(file, suite) {
  if (existsSync(file)) return;
  const header = `# ${suite} live run\n\n- Commit: ${commit()}\n- Host: ${option('host') ?? 'unrecorded'}\n- Model: ${option('model') ?? 'unrecorded'}\n- Operator: ${option('operator') ?? 'unrecorded'}\n- Date: ${new Date().toISOString()}\n\n| Case | Expected | Observed | Verdict | Evidence |\n| --- | --- | --- | --- | --- |\n`;
  writeFileSync(file, header);
}

mkdirSync(RESULTS, { recursive: true });

if (has('help') || args.length === 0) {
  console.log(`Usage: node scripts/run-evals.mjs [command]

Commands:
  --list [suite]                 List cases, optionally for one suite
  --suite <s> --case <id>        Print one case brief
  --suite <s> --case <id> --record --verdict pass|fail|not-run
                                 Append a result. Add --evidence, --observed,
                                 --host, --model, --operator
  --summary                      Count recorded verdicts by suite

Live runs follow docs/evals.md. This tool never calls a model.`);
  process.exit(0);
}

if (has('list')) {
  const only = option('list') ?? args[args.indexOf('--list') + 1];
  const names = only && suiteNames().includes(only) ? [only] : suiteNames();
  for (const name of names) {
    for (const item of loadSuite(name)) {
      console.log(`${name}\t${item.id}\t${item.prompt}`);
    }
  }
  process.exit(0);
}

if (has('summary')) {
  const files = readdirSync(RESULTS).filter((name) => name.endsWith('.md'));
  const tally = {};
  for (const file of files) {
    const text = readFileSync(join(RESULTS, file), 'utf8');
    for (const match of text.matchAll(/^\| ([^|]+) \| [^|]* \| [^|]* \| (pass|fail|not run|not-run) \|/gm)) {
      const suite = file.split('-')[0];
      tally[suite] ??= { pass: 0, fail: 0, 'not run': 0 };
      const verdict = match[2] === 'not-run' ? 'not run' : match[2];
      tally[suite][verdict] += 1;
    }
  }
  if (!files.length) console.log('no recorded results');
  for (const [suite, counts] of Object.entries(tally)) {
    console.log(`${suite}: ${counts.pass ?? 0} pass, ${counts.fail ?? 0} fail, ${counts['not run'] ?? 0} not run`);
  }
  process.exit(0);
}

const suite = option('suite');
const caseId = option('case');
if (!suite || !caseId) {
  console.error('--suite and --case are required');
  process.exit(2);
}
const cases = loadSuite(suite);
const item = cases.find((entry) => entry.id === caseId);
if (!item) {
  console.error(`unknown case ${caseId} in ${suite}`);
  process.exit(2);
}

if (!has('record')) {
  console.log(`suite: ${suite}`);
  console.log(`case: ${item.id}`);
  console.log(`prompt: ${item.prompt}`);
  console.log(`expected: ${item.expect ?? item.assert ?? ''}`);
  if (item.ask_type) console.log(`ask_type: ${item.ask_type}`);
  console.log('\nRun this prompt in a fresh session on the target host. Score against the expected behavior, then record with --record.');
  process.exit(0);
}

const verdict = option('verdict');
if (!['pass', 'fail', 'not-run'].includes(verdict)) {
  console.error('--verdict must be pass, fail, or not-run');
  process.exit(2);
}
const observed = option('observed') ?? '';
const evidence = option('evidence') ?? '';
const file = resultsFile(suite);
ensureHeader(file, suite);
const expected = (item.expect ?? item.assert ?? '').replace(/\|/g, '/');
appendFileSync(file, `| ${item.id} | ${expected} | ${observed.replace(/\|/g, '/')} | ${verdict === 'not-run' ? 'not run' : verdict} | ${evidence.replace(/\|/g, '/')} |\n`);
console.log(`recorded ${suite}/${item.id} as ${verdict} in ${file}`);
