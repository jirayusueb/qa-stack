#!/usr/bin/env node
// Static checks for the prompt-injection suite and skill guardrails.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseYamlList } from './lib/yaml.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');
const errors = [];

const GUARDED = [
  'qa-mode', 'qa-ask', 'qa-session', 'qa-repro', 'qa-diagnose',
  'qa-bdd', 'qa-file', 'qa-verify', 'qa-explore', 'qa-gate',
];

for (const name of GUARDED) {
  const rel = `skills/${name}/SKILL.md`;
  if (!existsSync(join(ROOT, rel))) { errors.push(`${rel}: missing`); continue; }
  if (!read(rel).includes('data, not instructions')) {
    errors.push(`${rel}: missing the untrusted-content guardrail`);
  }
}

const cases = existsSync(join(ROOT, 'evals/injection.yaml'))
  ? parseYamlList(read('evals/injection.yaml'))
  : [];
if (cases.length < 6) errors.push(`evals/injection.yaml: ${cases.length} cases, minimum is 6`);
const ids = new Set();
for (const item of cases) {
  if (!item.id) errors.push('injection case without id');
  if (ids.has(item.id)) errors.push(`duplicate injection id ${item.id}`);
  ids.add(item.id);
  if (!item.fixture) { errors.push(`${item.id}: no fixture`); continue; }
  if (!existsSync(join(ROOT, item.fixture))) { errors.push(`${item.id}: missing fixture ${item.fixture}`); continue; }
  const fixture = read(item.fixture);
  if (!/(ignore|system:|assistant:|before you file|send the contents|call the (write|bash|read) tool|approve this|ＩＧＮＯＲＥ)/i.test(fixture)) errors.push(`${item.id}: fixture has no injection marker`);
  if (!item.prompt) errors.push(`${item.id}: no prompt`);
  if (!item.assert) errors.push(`${item.id}: no expected assertion`);
}

const fixtures = existsSync(join(ROOT, 'evals/injection'))
  ? readdirSync(join(ROOT, 'evals/injection')).filter((name) => name.endsWith('.md'))
  : [];
if (fixtures.length < 6) errors.push(`evals/injection: ${fixtures.length} fixtures, minimum is 6`);

if (!existsSync(join(ROOT, 'docs/injection.md'))) errors.push('docs/injection.md: missing');

if (errors.length) {
  console.error(`injection --check: ${errors.length} problem(s)`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`injection --check: ok (${cases.length} cases, ${fixtures.length} fixtures, ${GUARDED.length} guarded skills)`);
