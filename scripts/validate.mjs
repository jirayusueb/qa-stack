// Verify the repo contract. Exits non-zero on any violation.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter, markdownLinks, countLines } from './lib/frontmatter.mjs';
import {
  CORE_SKILLS,
  EXTENDED_SKILLS,
  DOMAIN_SKILLS,
  EXPERIMENTAL_SKILLS,
  LINE_BUDGETS,
  PRINCIPLE_BUDGET,
  PLAYBOOK_BUDGET,
  AGENT_BUDGET,
  STANDARD_BUDGET,
  PLAYBOOKS,
  STANDARDS,
  PRINCIPLE_GROUPS,
  AGENTS,
  ADAPTERS,
} from './lib/contract.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];

function fail(file, message) {
  errors.push(`${file}: ${message}`);
}

function warn(file, message) {
  warnings.push(`${file}: ${message}`);
}

function read(rel) {
  return readFileSync(join(ROOT, rel), 'utf8');
}

function relFiles(dir) {
  if (!existsSync(join(ROOT, dir))) return [];
  const out = [];
  const walk = (current) => {
    for (const name of readdirSync(join(ROOT, current))) {
      const rel = `${current}/${name}`;
      const full = join(ROOT, rel);
      if (statSync(full).isDirectory()) walk(rel);
      else out.push(rel);
    }
  };
  walk(dir);
  return out;
}

function skillDirs() {
  if (!existsSync(join(ROOT, 'skills'))) return [];
  return readdirSync(join(ROOT, 'skills'))
    .filter((name) => statSync(join(ROOT, 'skills', name)).isDirectory())
    .sort();
}

const SPAWNING = new Set(['qa-delegate', 'qa-session', 'qa-repro', 'qa-explore', 'qa-bdd', 'qa-file', 'qa-verify']);
const ALL_SKILLS = [...CORE_SKILLS, ...EXTENDED_SKILLS, ...DOMAIN_SKILLS, ...EXPERIMENTAL_SKILLS];

function checkSkills() {
  for (const dir of skillDirs()) {
    const file = `skills/${dir}/SKILL.md`;
    if (!existsSync(join(ROOT, file))) { fail(file, 'missing SKILL.md'); continue; }
    const text = read(file);
    const parsed = parseFrontmatter(text);
    if (!parsed.ok) { fail(file, parsed.reason); continue; }
    const data = parsed.data;
    if (data.name !== dir) fail(file, `frontmatter name "${data.name}" does not match directory "${dir}"`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(String(data.name ?? ''))) fail(file, 'name is not kebab-case');
    if (String(data.name ?? '').length > 64) fail(file, 'name exceeds 64 characters');
    const description = String(data.description ?? '');
    if (!description) fail(file, 'description is missing');
    if (description.length > 1024) fail(file, `description is ${description.length} characters, limit is 1024`);
    if (dir.startsWith('principle-')) {
      if (!/^Apply when/.test(description)) fail(file, 'principle description must start with "Apply when"');
    } else if (!description.includes('/')) {
      fail(file, 'description must name its command in /form');
    }
    if (data.license !== 'Apache-2.0') fail(file, 'license must be Apache-2.0');
    for (const key of Object.keys(data)) {
      if (Object.hasOwn(data, 'disable-model-invocation')) fail(file, 'disable-model-invocation breaks strict Agent Plugins consumers; remove it');
      if (!['name', 'description', 'license'].includes(key)) {
        fail(file, `unexpected frontmatter key "${key}"`);
      }
    }
    const lines = countLines(text);
    if (dir.startsWith('principle-')) {
      if (lines > PRINCIPLE_BUDGET) fail(file, `${lines} lines, principle budget is ${PRINCIPLE_BUDGET}`);
      if (!/\nSources:/.test(text)) fail(file, 'missing Sources: line');
    } else {
      const budget = LINE_BUDGETS[dir];
      if (!budget) fail(file, 'no line budget for this skill in the contract');
      else if (lines > budget) fail(file, `${lines} lines, budget is ${budget}`);
    }
    const changelog = `skills/${dir}/CHANGELOG.md`;
    if (!existsSync(join(ROOT, changelog))) fail(changelog, 'missing per-skill changelog');
    else {
      const log = read(changelog);
      if (!log.startsWith('# Changelog')) fail(changelog, 'must start with # Changelog');
      if (!/^## /m.test(log)) fail(changelog, 'needs at least one version heading');
    }
    const deprecated = `skills/${dir}/DEPRECATED.md`;
    if (existsSync(join(ROOT, deprecated))) {
      const text = read(deprecated);
      for (const line of ['Replacement:', 'Since:', 'Remove in:', 'Reason:']) {
        if (!text.includes(line)) fail(deprecated, `missing "${line}"`);
      }
      const replacement = /Replacement:\s*([a-z0-9-]+)/.exec(text)?.[1];
      if (replacement && replacement !== 'none' && !skillDirs().includes(replacement)) {
        fail(deprecated, `replacement skill "${replacement}" does not exist`);
      }
    }
    if (SPAWNING.has(dir)) {
      if (!text.includes('qa-delegate')) fail(file, 'spawning skill must point at the qa-delegate skill');
      if (!text.includes('docs/harness.md')) fail(file, 'spawning skill must point at docs/harness.md for tool mapping');
    }
  }
  for (const name of ALL_SKILLS) {
    if (!skillDirs().includes(name)) fail(`skills/${name}/SKILL.md`, 'skill in the contract is missing from skills/');
  }
}

function checkPrinciples() {
  const expected = Object.values(PRINCIPLE_GROUPS).flat().map((name) => `principle-${name}`);
  const actual = skillDirs().filter((name) => name.startsWith('principle-'));
  for (const name of expected) {
    if (!actual.includes(name)) fail('skills/', `missing principle ${name}`);
  }
  for (const name of actual) {
    if (!expected.includes(name)) fail(`skills/${name}/SKILL.md`, 'principle is not in the contract');
  }
  if (existsSync(join(ROOT, 'skills/qa-mode/SKILL.md'))) {
    const mode = read('skills/qa-mode/SKILL.md');
    for (const name of expected) {
      if (!mode.includes(`../${name}/SKILL.md`)) fail('skills/qa-mode/SKILL.md', `principle index is missing ${name}`);
    }
  }
}

function checkPlaybooks() {
  const dir = 'skills/qa-mode/playbooks';
  const actual = existsSync(join(ROOT, dir))
    ? readdirSync(join(ROOT, dir)).filter((name) => name.endsWith('.md')).map((name) => name.replace(/\.md$/, ''))
    : [];
  for (const name of PLAYBOOKS) {
    if (!actual.includes(name)) fail(dir, `missing playbook ${name}.md`);
  }
  for (const name of actual) {
    if (!PLAYBOOKS.includes(name)) fail(`${dir}/${name}.md`, 'playbook is not in the contract');
    const text = read(`${dir}/${name}.md`);
    if (countLines(text) > PLAYBOOK_BUDGET) fail(`${dir}/${name}.md`, `${countLines(text)} lines, budget is ${PLAYBOOK_BUDGET}`);
    if (!text.startsWith('### ')) fail(`${dir}/${name}.md`, 'playbook must start with an h3 title');
    if (!/Read first:/.test(text)) fail(`${dir}/${name}.md`, 'missing Read first: line');
    if (!/\*\*Reply:\*\*/.test(text)) fail(`${dir}/${name}.md`, 'missing **Reply:** line');
  }
  if (existsSync(join(ROOT, 'skills/qa-mode/SKILL.md'))) {
    const mode = read('skills/qa-mode/SKILL.md');
    for (const name of actual) {
      if (!mode.includes(`playbooks/${name}.md`)) fail('skills/qa-mode/SKILL.md', `playbook list is missing ${name}`);
    }
  }
}

function checkAgents() {
  const dir = 'agents';
  const nonReviewers = new Set(['qa-browser-driver.md', 'qa-explorer.md']);
  for (const rel of relFiles(dir)) {
    if (extname(rel) !== '.md') continue;
    const text = read(rel);
    const parsed = parseFrontmatter(text);
    if (!parsed.ok) { fail(rel, parsed.reason); continue; }
    const stem = rel.split('/').pop().replace(/\.md$/, '');
    if (parsed.data.name !== stem) fail(rel, `frontmatter name "${parsed.data.name}" does not match filename "${stem}"`);
    if (!parsed.data.description) fail(rel, 'description is missing');
    if (parsed.data.license !== 'Apache-2.0') fail(rel, 'license must be Apache-2.0');
    if (countLines(text) > AGENT_BUDGET) fail(rel, `${countLines(text)} lines, budget is ${AGENT_BUDGET}`);
    if (!nonReviewers.has(`${stem}.md`) && !text.includes('Core Mandates')) {
      fail(rel, 'reviewer persona is missing the Core Mandates block');
    }
  }
  for (const name of AGENTS) {
    if (!existsSync(join(ROOT, `agents/${name}.md`))) fail('agents/', `missing persona ${name}.md`);
  }
}

function checkStandards() {
  const dir = 'resources/document_standards';
  for (const name of STANDARDS) {
    const rel = `${dir}/${name}.md`;
    if (!existsSync(join(ROOT, rel))) { fail(dir, `missing standard ${name}.md`); continue; }
    if (countLines(read(rel)) > STANDARD_BUDGET) fail(rel, `${countLines(read(rel))} lines, budget is ${STANDARD_BUDGET}`);
  }
  for (const [skill, standard] of [
    ['skills/qa-file/SKILL.md', 'issue-standard'],
    ['skills/qa-bdd/SKILL.md', 'scenario-standard'],
    ['skills/qa-ask/SKILL.md', 'evidence-standard'],
  ]) {
    if (existsSync(join(ROOT, skill)) && !read(skill).includes(standard)) {
      fail(skill, `must reference ${standard}.md`);
    }
  }
  for (const rel of ['resources/README.md', 'resources/execution_instructions.md']) {
    if (!existsSync(join(ROOT, rel))) fail(rel, 'missing');
  }
}

function checkLinks() {
  const roots = ['README.md', 'AGENTS.md', 'CONTRIBUTING.md', 'UPSTREAM.md', 'docs', 'skills', 'agents', 'resources'];
  const files = [];
  for (const root of roots) {
    if (!existsSync(join(ROOT, root))) continue;
    if (statSync(join(ROOT, root)).isDirectory()) files.push(...relFiles(root));
    else files.push(root);
  }
  for (const rel of files) {
    if (extname(rel) !== '.md') continue;
    const text = read(rel);
    for (const link of markdownLinks(text)) {
      let target = link.target;
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      target = target.split('#')[0];
      if (!target) continue;
      const resolved = resolve(join(ROOT, rel), '..', target);
      const relResolved = relative(ROOT, resolved);
      if (relResolved.startsWith('..')) {
        fail(rel, `link escapes the repository: ${link.target}`);
        continue;
      }
      if (!existsSync(resolved)) fail(rel, `broken link: ${link.target}`);
    }
  }
}

const BANNED = ['agent-transcripts', 'AskQuestion', 'generalPurpose', 'Bugbot', 'Task(', 'C:\\', '/Users/', '#!/bin/sh'];
function checkBannedTokens() {
  const roots = ['skills', 'agents', 'resources', 'docs/guide', 'docs/getting_started.md'];
  const files = [];
  for (const root of roots) {
    if (!existsSync(join(ROOT, root))) continue;
    const full = join(ROOT, root);
    if (statSync(full).isDirectory()) files.push(...relFiles(root));
    else files.push(root);
  }
  for (const rel of files) {
    if (!['.md', '.mjs'].includes(extname(rel))) continue;
    const text = read(rel);
    for (const token of BANNED) {
      if (text.includes(token)) fail(rel, `banned token "${token}"`);
    }
    if (text.includes('\r\n')) fail(rel, 'CRLF line endings');
  }
}

const MANIFESTS = ['plugin.json', '.claude-plugin/plugin.json', '.codex-plugin/plugin.json', '.cursor-plugin/plugin.json'];
function checkManifests() {
  const identity = [];
  for (const rel of MANIFESTS) {
    if (!existsSync(join(ROOT, rel))) { fail(rel, 'missing manifest'); continue; }
    let data;
    try { data = JSON.parse(read(rel)); } catch (error) { fail(rel, `invalid JSON: ${error.message}`); continue; }
    identity.push({ rel, name: data.name, version: data.version, description: data.description, license: data.license });
    if (!data.name) fail(rel, 'missing name');
    if (data.name && !/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/.test(data.name)) fail(rel, 'name does not satisfy the portable manifest rule');
    if (!data.description) fail(rel, 'missing description');
    if (!data.license) fail(rel, 'missing license');
  }
  const names = new Set(identity.map((item) => item.name));
  const versions = new Set(identity.map((item) => item.version));
  const descriptions = new Set(identity.map((item) => item.description));
  const licenses = new Set(identity.map((item) => item.license));
  if (names.size > 1) fail('manifests', `name mismatch: ${JSON.stringify(identity.map((i) => [i.rel, i.name]))}`);
  if (versions.size > 1) fail('manifests', 'version mismatch');
  if (descriptions.size > 1) fail('manifests', 'description mismatch');
  if (licenses.size > 1) fail('manifests', 'license mismatch');
  if (existsSync(join(ROOT, 'package.json'))) {
    try {
      const pkg = JSON.parse(read('package.json'));
      if (pkg.version !== [...versions][0]) fail('package.json', `version ${pkg.version} does not match manifests ${[...versions][0]}`);
      if (pkg.name !== [...names][0]) fail('package.json', `name ${pkg.name} does not match manifests ${[...names][0]}`);
    } catch (error) { fail('package.json', `invalid JSON: ${error.message}`); }
  }

  const marketplaceRel = '.claude-plugin/marketplace.json';
  if (existsSync(join(ROOT, marketplaceRel))) {
    try {
      const market = JSON.parse(read(marketplaceRel));
      if (!market.name) fail(marketplaceRel, 'missing name');
      if (!Array.isArray(market.plugins) || !market.plugins.length) fail(marketplaceRel, 'missing plugins array');
      else {
        const plugin = market.plugins[0];
        if (plugin.name !== identity[0]?.name) fail(marketplaceRel, 'entry name must equal the plugin name');
        if (typeof plugin.source !== 'string' || !plugin.source.startsWith('./')) fail(marketplaceRel, 'source must start with ./');
      }
    } catch (error) { fail(marketplaceRel, `invalid JSON: ${error.message}`); }
  }

  const codexRel = '.codex-plugin/plugin.json';
  if (existsSync(join(ROOT, codexRel))) {
    const codex = JSON.parse(read(codexRel));
    const rootPlugin = JSON.parse(read('plugin.json'));
    if (JSON.stringify(codex.interface) !== JSON.stringify(rootPlugin.extensions?.['com.openai']?.interface)) {
      fail(codexRel, 'interface must equal plugin.json extensions.com.openai.interface');
    }
  }

  const cursorRel = '.cursor-plugin/plugin.json';
  if (existsSync(join(ROOT, cursorRel))) {
    const cursor = JSON.parse(read(cursorRel));
    for (const key of ['skills', 'agents', 'rules']) {
      if (typeof cursor[key] !== 'string' || !cursor[key].startsWith('./')) fail(cursorRel, `${key} must be a ./ path`);
    }
  }

  const agentsMarket = '.agents/plugins/marketplace.json';
  if (existsSync(join(ROOT, agentsMarket))) {
    try {
      const market = JSON.parse(read(agentsMarket));
      if (!market.plugins?.[0]?.name) fail(agentsMarket, 'missing plugin entry');
    } catch (error) { fail(agentsMarket, `invalid JSON: ${error.message}`); }
  }
}

function checkAsk() {
  const file = 'skills/qa-ask/SKILL.md';
  if (!existsSync(join(ROOT, file))) return;
  const text = read(file);
  if (!/read-only/i.test(text)) fail(file, 'missing read-only guarantee');
  if (!/does not write|never writes/i.test(text)) fail(file, 'must state that it does not write files');
  if (!/does not spawn|never spawns/i.test(text)) fail(file, 'must state that it does not spawn');
}

function checkDelegation() {
  const dir = 'skills/qa-delegate/references';
  for (const name of ['brief', 'harnesses', 'teams', 'report']) {
    if (!existsSync(join(ROOT, `${dir}/${name}.md`))) fail(`${dir}/${name}.md`, 'missing delegation reference');
  }
  const harness = 'docs/harness.md';
  if (!existsSync(join(ROOT, harness))) fail(harness, 'missing');
  else {
    const text = read(harness);
    for (const tool of ['Agent', 'spawn_agent', 'Task', 'task', 'spawn_teammate']) {
      if (!text.includes(tool)) fail(harness, `capability matrix does not mention ${tool}`);
    }
    for (const host of ['omp', 'OpenCode', 'Agent Teams', 'DeepSeek Harness']) {
      if (!text.includes(host)) fail(harness, `capability matrix does not mention ${host}`);
    }
    if (!text.includes('fast-browser-use')) fail(harness, 'missing the fast-browser-use driver section');
  }
  for (const adapter of ADAPTERS) {
    const rel = `docs/harness/${adapter}.md`;
    if (!existsSync(join(ROOT, rel))) fail(rel, 'missing adapter');
  }
}

function checkBrowser() {
  const file = 'skills/qa-browser/SKILL.md';
  if (!existsSync(join(ROOT, file))) { fail(file, 'missing'); return; }
  const text = read(file);
  if (!text.includes('screenshot')) fail(file, 'must cover screenshot capture');
  if (!/record|video/i.test(text)) fail(file, 'must cover video recording');
  const drivers = 'skills/qa-browser/references/drivers.md';
  if (!existsSync(join(ROOT, drivers))) fail(drivers, 'missing driver mapping');
  else {
    const text = read(drivers);
    if (!text.includes('fast-browser-use')) fail(drivers, 'missing the fast-browser-use mapping');
  }
}

function checkDocs() {
  const required = [
    'README.md',
    'AGENTS.md',
    'CONTRIBUTING.md',
    'LICENSE',
    'NOTICE',
    'UPSTREAM.md',
    'docs/index.md',
    'docs/getting_started.md',
    'docs/evals.md',
    'docs/harness.md',
    'docs/injection.md',
    'docs/privacy.md',
    'docs/skills.md',
    'docs/designs/qa-stack.md',
  ];
  for (const rel of required) if (!existsSync(join(ROOT, rel))) fail(rel, 'missing');
  if (existsSync(join(ROOT, 'README.md'))) {
    const readme = read('README.md');
    for (const phrase of ['/qa-stack:qa-setup', '/skill:qa-setup', 'Command form']) {
      if (!readme.includes(phrase)) fail('README.md', `install docs are missing "${phrase}"`);
    }
    if (!readme.includes('fast-browser-use')) fail('README.md', 'install docs must mention fast-browser-use');
  }
  for (const rel of ['README.md', 'docs/getting_started.md']) {
    if (existsSync(join(ROOT, rel))) {
      if (!read(rel).includes('generated:')) {
        warn(rel, 'no generated markers found');
      }
    }
  }
}

function checkNoShellWrapper() {
  for (const rel of relFiles('skills')) {
    if (extname(rel) === '.sh') fail(rel, 'shell script found; use a Node launcher');
  }
}

checkSkills();
checkPrinciples();
checkPlaybooks();
checkAgents();
checkStandards();
checkLinks();
checkBannedTokens();
checkManifests();
checkAsk();
checkDelegation();
checkBrowser();
checkDocs();
checkNoShellWrapper();

for (const message of warnings) console.warn(`warning: ${message}`);
if (errors.length) {
  console.error(`validate: ${errors.length} error(s)`);
  for (const message of errors) console.error(`- ${message}`);
  process.exit(1);
}
console.log(`validate: ok (${warnings.length} warning(s))`);
