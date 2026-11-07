#!/usr/bin/env node
// Release helper: bump every manifest to a version, regenerate, check, tag.
// Usage: node scripts/release.mjs <version> [--tag]
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const version = args[0];
const TAG = args.includes('--tag');

if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
  console.error('usage: node scripts/release.mjs <x.y.z> [--tag]');
  process.exit(2);
}

const MANIFESTS = [
  'package.json',
  'plugin.json',
  '.claude-plugin/plugin.json',
  '.codex-plugin/plugin.json',
  '.cursor-plugin/plugin.json',
];

for (const rel of MANIFESTS) {
  const path = join(ROOT, rel);
  const text = readFileSync(path, 'utf8');
  const updated = text.replace(/"version": "\d+\.\d+\.\d+"/, `"version": "${version}"`);
  if (updated === text) {
    console.error(`${rel}: no version field found`);
    process.exit(1);
  }
  writeFileSync(path, updated, 'utf8');
  console.log(`bumped ${rel} to ${version}`);
}

function run(cmd, params) {
  const result = spawnSync(cmd, params, { cwd: ROOT, stdio: 'inherit' });
  if (result.status !== 0) {
    console.error(`${cmd} ${params.join(' ')} failed`);
    process.exit(1);
  }
}

run('npm', ['run', 'build']);
run('npm', ['run', 'check']);
if (TAG) run('git', ['tag', `v${version}`]);
console.log(`release ${version}: ready. Commit the changes and push.`);
