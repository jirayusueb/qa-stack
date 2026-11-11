#!/usr/bin/env node
// Executable regressions from real failures. Reads evals/regressions.yaml.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseYamlList } from './lib/yaml.mjs';
import { parseFrontmatter } from './lib/frontmatter.mjs';
import { CORE_SKILLS, ADAPTERS } from './lib/contract.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');
const skillDirs = () => readdirSync(join(ROOT, 'skills')).filter((name) => statSync(join(ROOT, 'skills', name)).isDirectory());
const filesUnder = (root) => {
  const out = [];
  const walk = (rel) => {
    for (const name of readdirSync(join(ROOT, rel))) {
      const child = `${rel}/${name}`;
      if (statSync(join(ROOT, child)).isDirectory()) walk(child);
      else out.push(child);
    }
  };
  walk(root);
  return out;
};

const checks = {
  'no-extension-field': () => {
    for (const dir of skillDirs()) {
      const parsed = parseFrontmatter(read(`skills/${dir}/SKILL.md`));
      if (!parsed.ok) return `cannot parse ${dir}`;
      for (const key of Object.keys(parsed.data)) {
        if (!['name', 'description', 'license'].includes(key)) return `${dir} has frontmatter field ${key}`;
      }
    }
    return true;
  },
  'qa-prefix-count': () => {
    const count = skillDirs().filter((name) => name.startsWith('qa-')).length;
    return count === CORE_SKILLS.length ? true : `expected ${CORE_SKILLS.length} qa-* skills, found ${count}`;
  },
  'command-forms': () => {
    const text = read('README.md');
    for (const phrase of ['/qa-stack:qa-setup', '/skill:qa-setup', 'Command form']) {
      if (!text.includes(phrase)) return `README is missing ${phrase}`;
    }
    return true;
  },
  'no-double-install': () => {
    const text = read('docs/harness/omp.md');
    return /Do not also install/.test(text) ? true : 'omp adapter does not warn about a second install';
  },
  'manifest-parity': () => {
    const pkg = JSON.parse(read('package.json'));
    for (const rel of ['plugin.json', '.claude-plugin/plugin.json', '.codex-plugin/plugin.json', '.cursor-plugin/plugin.json']) {
      const manifest = JSON.parse(read(rel));
      if (manifest.name !== pkg.name) return `${rel} name differs`;
      if (manifest.version !== pkg.version) return `${rel} version differs`;
    }
    return true;
  },
  'adapters-complete': () => {
    for (const name of ADAPTERS) {
      if (!existsSync(join(ROOT, `docs/harness/${name}.md`))) return `missing docs/harness/${name}.md`;
    }
    const hub = read('docs/harness.md');
    for (const host of ['Claude Code', 'Codex', 'Cursor', 'OpenCode', 'Agent Teams', 'omp', 'DeepSeek Harness']) {
      if (!hub.includes(host)) return `harness hub does not name ${host}`;
    }
    if (!hub.includes('Playwright')) return 'harness hub does not name Playwright';
    return true;
  },
  'no-shell-scripts': () => {
    for (const file of filesUnder('skills')) {
      if (extname(file) === '.sh') return `${file} is a shell script`;
      if (readFileSync(join(ROOT, file), 'utf8').startsWith('#!/bin/sh')) return `${file} uses /bin/sh`;
    }
    return true;
  },
  'skill-count': () => {
    const count = skillDirs().length;
    return count === 25 ? true : `expected 25 skills, found ${count}`;
  },
};

const declared = parseYamlList(read('evals/regressions.yaml')).map((item) => item.id);
const missing = declared.filter((id) => !checks[id]);
const extra = Object.keys(checks).filter((id) => !declared.includes(id));
if (missing.length || extra.length) {
  if (missing.length) console.error(`regressions declared without a check: ${missing.join(', ')}`);
  if (extra.length) console.error(`checks without a regression entry: ${extra.join(', ')}`);
  process.exit(1);
}

let failed = 0;
for (const id of declared) {
  const result = checks[id]();
  if (result === true) {
    console.log(`pass ${id}`);
  } else {
    failed += 1;
    console.error(`fail ${id}: ${result}`);
  }
}
if (failed) {
  console.error(`regressions: ${failed} failed`);
  process.exit(1);
}
console.log(`regressions: ${declared.length} passed`);
