// Static validation and coverage for every eval suite. Never calls a model.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseYamlList } from './lib/yaml.mjs';
import {
  CORE_SKILLS,
  EXTENDED_SKILLS,
  DOMAIN_SKILLS,
  EXPERIMENTAL_SKILLS,
  PLAYBOOKS,
} from './lib/contract.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

const SUITES = {
  routing: { min: 20, keys: ['expect', 'kind'], coverage: true },
  session: { min: 6 },
  file: { min: 6 },
  verify: { min: 6 },
  gate: { min: 5 },
  bdd: { min: 6 },
  ask: { min: 8 },
  browser: { min: 4 },
  delegation: { min: 5 },
  drift: { min: 5 },
  report: { min: 4 },
  injection: { min: 6 },
};

function readEval(name) {
  const rel = `evals/${name}.yaml`;
  if (!existsSync(join(ROOT, rel))) {
    errors.push(`${rel}: missing eval suite`);
    return [];
  }
  try {
    return parseYamlList(readFileSync(join(ROOT, rel), 'utf8'));
  } catch (error) {
    errors.push(`${rel}: ${error.message}`);
    return [];
  }
}

const counts = {};
const routingCases = [];

for (const [name, rules] of Object.entries(SUITES)) {
  const cases = readEval(name);
  counts[name] = cases.length;
  if (cases.length < rules.min) errors.push(`evals/${name}.yaml: ${cases.length} cases, minimum is ${rules.min}`);
  const ids = new Set();
  for (const item of cases) {
    if (!item.id) errors.push(`evals/${name}.yaml: case without id`);
    if (ids.has(item.id)) errors.push(`evals/${name}.yaml: duplicate id ${item.id}`);
    ids.add(item.id);
    if (!item.prompt) errors.push(`evals/${name}.yaml: ${item.id} has no prompt`);
    if (!item.expect && !item.assert) errors.push(`evals/${name}.yaml: ${item.id} has neither expect nor assert`);
    if (name === 'injection') {
      if (!item.fixture) errors.push(`evals/injection.yaml: ${item.id} has no fixture`);
      else if (!existsSync(join(ROOT, item.fixture))) errors.push(`evals/injection.yaml: ${item.id} fixture does not exist`);
    }
    if (item.require && typeof item.require !== 'string') errors.push(`evals/${name}.yaml: ${item.id} require must be one string`);
    if (item.forbid && typeof item.forbid !== 'string') errors.push(`evals/${name}.yaml: ${item.id} forbid must be one string`);
    if (name === 'routing') routingCases.push({ item, rules });
  }
}

// Routing coverage: every skill except the router, every playbook.
const routingCovered = new Set();
for (const { item } of routingCases) {
  if (!item.id) continue;
  if (!['skill', 'playbook'].includes(item.kind)) errors.push(`evals/routing.yaml: ${item.id} kind must be skill or playbook`);
  const known = [...CORE_SKILLS, ...EXTENDED_SKILLS, ...DOMAIN_SKILLS, ...EXPERIMENTAL_SKILLS];
  if (item.kind === 'skill' && !known.includes(item.expect)) errors.push(`evals/routing.yaml: ${item.id} expects unknown skill ${item.expect}`);
  if (item.kind === 'playbook' && !PLAYBOOKS.includes(item.expect)) errors.push(`evals/routing.yaml: ${item.id} expects unknown playbook ${item.expect}`);
  routingCovered.add(item.expect);
}
const requiredRouting = [...CORE_SKILLS, ...EXTENDED_SKILLS, ...DOMAIN_SKILLS, ...EXPERIMENTAL_SKILLS].filter((name) => name !== 'qa-mode');
for (const name of requiredRouting) {
  if (!routingCovered.has(name)) errors.push(`evals/routing.yaml: no case covers skill ${name}`);
}
for (const name of PLAYBOOKS) {
  if (!routingCovered.has(name)) errors.push(`evals/routing.yaml: no case covers playbook ${name}`);
}

// Notes on a suite are allowed; a suite may not be empty.
for (const [name, count] of Object.entries(counts)) {
  if (count === 0) errors.push(`evals/${name}.yaml: suite is empty`);
}

if (errors.length) {
  console.error(`eval --check: ${errors.length} problem(s)`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
const summary = Object.entries(counts).map(([name, count]) => `${name} ${count}`).join(', ');
console.log(`eval --check: ok (${summary})`);
