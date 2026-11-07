#!/usr/bin/env node
// Lint Gherkin feature files against the scenario standard.
// Usage: node scripts/feature-lint.mjs [paths...] (defaults to features/)
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);

const STOP_WORDS = [
  'function', 'method', 'class ', 'module', 'callback', 'async',
  'import ', 'refactor', 'internal api', 'private method',
];

function collect(root) {
  if (!existsSync(root)) return [];
  if (statSync(root).isFile()) return [root];
  const out = [];
  const walk = (rel) => {
    for (const name of readdirSync(rel)) {
      const full = join(rel, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name.endsWith('.feature')) out.push(full);
    }
  };
  walk(root);
  return out;
}

const targets = args.length ? args.map((p) => join(ROOT, p)) : [join(ROOT, 'features')];
const files = targets.flatMap(collect);
const errors = [];

for (const file of files) {
  const rel = file.slice(ROOT.length + 1);
  const text = readFileSync(file, 'utf8');
  if (!/^Feature:/m.test(text)) errors.push(`${rel}: missing Feature: line`);
  const scenarios = text.split(/^\s*Scenario:/m).slice(1);
  if (!scenarios.length) errors.push(`${rel}: no scenarios`);
  let index = 0;
  for (const chunk of scenarios) {
    index += 1;
    const body = chunk.split(/\n(?=\s*(Scenario|Feature):)/)[0];
    if (!/^\s*Given\b/m.test(body)) errors.push(`${rel}: scenario ${index} has no Given`);
    if (!/^\s*When\b/m.test(body)) errors.push(`${rel}: scenario ${index} has no When`);
    if (!/^\s*Then\b/m.test(body)) errors.push(`${rel}: scenario ${index} has no Then`);
    const lower = body.toLowerCase();
    for (const word of STOP_WORDS) {
      if (lower.includes(word)) errors.push(`${rel}: scenario ${index} uses implementation vocabulary "${word.trim()}"`);
    }
  }
  // Tagged scenarios must reference an issue number or regression.
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const tagLine = lines[i];
    if (!/^\s*@\w/.test(tagLine)) continue;
    const next = (lines[i + 1] ?? '').trim();
    if (next.startsWith('Scenario:') && !/@issue-\d+|@regression/.test(tagLine)) {
      errors.push(`${rel}: scenario after line ${i + 1} carries neither @issue-<n> nor @regression`);
    }
  }
}

if (!files.length) {
  console.log('feature-lint: no feature files found (nothing to check)');
  process.exit(0);
}
if (errors.length) {
  console.error(`feature-lint: ${errors.length} problem(s)`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`feature-lint: ok (${files.length} feature file(s))`);
