#!/usr/bin/env node
// Description trigger checks. Static validation plus recorded live results.
import { readFileSync, existsSync, mkdirSync, writeFileSync, appendFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { parseYamlList } from './lib/yaml.mjs';
import { CORE_SKILLS } from './lib/contract.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RESULTS = join(ROOT, 'evals/results');
const args = process.argv.slice(2);
const REL = 'evals/descriptions.yaml';

function readCases() {
  return parseYamlList(readFileSync(join(ROOT, REL), 'utf8'));
}
function option(name) {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? undefined : args[index + 1];
}
function has(name) {
  return args.includes(`--${name}`);
}
function commit() {
  const result = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: ROOT, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : 'unknown';
}
function skills() {
  return readdirSync(join(ROOT, 'skills'));
}

if (has('help') || args.length === 0) {
  console.log(`Usage: node scripts/describe-eval.mjs [command]

  --check                         Validate cases and coverage
  --list                          List cases
  --id <case> --triggered <skill|none>
                                  Record a live trigger result
  --summary                       Trigger rate per skill

Live runs use a fresh session. Ask the case query and record which skill
triggered, or none.`);
  process.exit(0);
}

const cases = readCases();

if (has('list')) {
  for (const item of cases) console.log(`${item.id}\t${item.kind}\t${item.skill}\t${item.query}`);
  process.exit(0);
}

if (has('check')) {
  const errors = [];
  const ids = new Set();
  const known = new Set([...skills(), 'none']);
  const positives = new Map();
  let negatives = 0;
  for (const item of cases) {
    if (!item.id) errors.push('case without id');
    if (ids.has(item.id)) errors.push(`duplicate id ${item.id}`);
    ids.add(item.id);
    if (!item.query) errors.push(`${item.id} has no query`);
    if (!['positive', 'negative'].includes(item.kind)) errors.push(`${item.id} kind must be positive or negative`);
    if (!known.has(item.skill)) errors.push(`${item.id} names unknown skill ${item.skill}`);
    if (item.kind === 'positive') {
      positives.set(item.skill, (positives.get(item.skill) ?? 0) + 1);
    } else {
      negatives += 1;
    }
  }
  for (const skill of CORE_SKILLS) {
    const count = positives.get(skill) ?? 0;
    if (count < 2) errors.push(`core skill ${skill} has ${count} positive cases, minimum is 2`);
  }
  if (negatives < 8) errors.push(`${negatives} negative cases, minimum is 8`);
  if (errors.length) {
    console.error(`describe-eval --check: ${errors.length} problem(s)`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`describe-eval --check: ok (${cases.length} cases, ${negatives} negative)`);
  process.exit(0);
}

if (has('summary')) {
  const files = existsSync(RESULTS) ? readdirSync(RESULTS).filter((name) => name.startsWith('descriptions-') && name.endsWith('.md')) : [];
  const perSkill = {};
  for (const file of files) {
    const text = readFileSync(join(RESULTS, file), 'utf8');
    for (const match of text.matchAll(/^\| ([^|]+) \| ([^|]+) \| [^|]+ \| [^|]+ \| (pass|fail) \|/gm)) {
      const skill = match[2].trim();
      perSkill[skill] ??= { pass: 0, fail: 0 };
      perSkill[skill][match[3]] += 1;
    }
  }
  if (!Object.keys(perSkill).length) console.log('no recorded description results');
  for (const [skill, counts] of Object.entries(perSkill)) {
    const total = counts.pass + counts.fail;
    console.log(`${skill}: ${counts.pass}/${total} (${Math.round((counts.pass / total) * 100)}%)`);
  }
  process.exit(0);
}

const id = option('id');
const triggered = option('triggered');
if (!id || !triggered) {
  console.error('--id and --triggered are required');
  process.exit(2);
}
const item = cases.find((entry) => entry.id === id);
if (!item) {
  console.error(`unknown case ${id}`);
  process.exit(2);
}
const verdict = item.kind === 'positive' ? (triggered === item.skill ? 'pass' : 'fail') : (triggered === 'none' ? 'pass' : 'fail');
mkdirSync(RESULTS, { recursive: true });
const file = join(RESULTS, `descriptions-${commit()}.md`);
if (!existsSync(file)) {
  writeFileSync(file, `# descriptions live run\n\n- Commit: ${commit()}\n- Date: ${new Date().toISOString()}\n\n| Case | Skill | Query | Triggered | Verdict |\n| --- | --- | --- | --- | --- |\n`);
}
appendFileSync(file, `| ${item.id} | ${item.skill} | ${item.query.replace(/\|/g, '/')} | ${triggered} | ${verdict} |\n`);
console.log(`recorded ${item.id} as ${verdict} (triggered ${triggered})`);
