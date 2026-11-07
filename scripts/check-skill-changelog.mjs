#!/usr/bin/env node
// Fail when a SKILL.md changes without a matching per-skill CHANGELOG.md change.
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const baseIndex = args.indexOf('--base');
const base = (baseIndex === -1 ? process.env.BASE : args[baseIndex + 1]) ?? 'HEAD~1';

function git(...params) {
  return spawnSync('git', params, { cwd: ROOT, encoding: 'utf8' });
}

if (!base || /^0+$/.test(base)) {
  console.log(`check:changelog: skipped (no usable base: ${base})`);
  process.exit(0);
}
const resolved = git('rev-parse', '--verify', `${base}^{commit}`);
if (resolved.status !== 0) {
  console.log(`check:changelog: skipped (base ${base} is not available; fetch more history)`);
  process.exit(0);
}
const sha = resolved.stdout.trim();
const diff = git('diff', '--name-only', sha, 'HEAD');
if (diff.status !== 0) {
  console.error(`check:changelog: git diff failed: ${diff.stderr.trim()}`);
  process.exit(1);
}
const changed = new Set(diff.stdout.split('\n').filter(Boolean));
const broken = [];
for (const file of changed) {
  const match = /^skills\/([^/]+)\/SKILL\.md$/.exec(file);
  if (!match) continue;
  const name = match[1];
  if (!changed.has(`skills/${name}/CHANGELOG.md`)) broken.push(name);
}
if (broken.length) {
  console.error('check:changelog: these skills changed without a CHANGELOG.md update:');
  for (const name of broken) console.error(`- ${name}`);
  process.exit(1);
}
console.log(`check:changelog: ok (${changed.size} files since ${sha.slice(0, 7)})`);
