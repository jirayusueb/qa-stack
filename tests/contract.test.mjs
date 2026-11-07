// Contract tests: every skill on disk is in the contract and vice versa.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CORE_SKILLS,
  EXTENDED_SKILLS,
  DOMAIN_SKILLS,
  EXPERIMENTAL_SKILLS,
  LINE_BUDGETS,
  PRINCIPLE_BUDGET,
  PRINCIPLE_GROUPS,
  PLAYBOOKS,
} from '../scripts/lib/contract.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function skillDirs() {
  return readdirSync(join(ROOT, 'skills')).filter((name) =>
    statSync(join(ROOT, 'skills', name)).isDirectory(),
  ).sort();
}

test('every contract skill exists on disk', () => {
  const onDisk = new Set(skillDirs());
  for (const name of [...CORE_SKILLS, ...EXTENDED_SKILLS, ...DOMAIN_SKILLS, ...EXPERIMENTAL_SKILLS]) {
    assert.ok(onDisk.has(name), `missing skills/${name}`);
  }
});

test('every core skill has a line budget', () => {
  for (const name of CORE_SKILLS) {
    assert.ok(LINE_BUDGETS[name], `no budget for ${name}`);
  }
});

test('principles on disk match the contract', () => {
  const expected = Object.values(PRINCIPLE_GROUPS).flat().map((n) => `principle-${n}`).sort();
  const actual = skillDirs().filter((n) => n.startsWith('principle-'));
  assert.deepEqual(actual, expected);
});

test('principles stay inside their budget', () => {
  for (const name of skillDirs().filter((n) => n.startsWith('principle-'))) {
    const text = readFileSync(join(ROOT, 'skills', name, 'SKILL.md'), 'utf8');
    const lines = text.split(/\r?\n/).length;
    assert.ok(lines <= PRINCIPLE_BUDGET, `${name} is ${lines} lines`);
    assert.match(text, /\nSources:/);
  }
});

test('playbooks on disk match the contract', () => {
  const dir = join(ROOT, 'skills/qa-mode/playbooks');
  const actual = readdirSync(dir).filter((n) => n.endsWith('.md')).map((n) => n.replace(/\.md$/, '')).sort();
  assert.deepEqual(actual, [...PLAYBOOKS].sort());
});

test('every skill has a changelog', () => {
  for (const name of skillDirs()) {
    const rel = join(ROOT, 'skills', name, 'CHANGELOG.md');
    assert.ok(existsSync(rel), `missing ${rel}`);
    assert.match(readFileSync(rel, 'utf8'), /^# Changelog/);
  }
});
