// Library tests for the shared helpers.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter, firstSentence, countLines, markdownLinks } from '../scripts/lib/frontmatter.mjs';
import { parseYamlList } from '../scripts/lib/yaml.mjs';

test('parseFrontmatter reads the three allowed keys', () => {
  const parsed = parseFrontmatter('---\nname: qa-gate\ndescription: Run /qa-gate to decide.\nlicense: Apache-2.0\n---\n\n# Gate\n');
  assert.ok(parsed.ok);
  assert.equal(parsed.data.name, 'qa-gate');
  assert.equal(parsed.data.license, 'Apache-2.0');
});

test('parseFrontmatter rejects missing frontmatter', () => {
  const parsed = parseFrontmatter('# No frontmatter');
  assert.ok(!parsed.ok);
});

test('firstSentence stops at the first period', () => {
  assert.equal(firstSentence('One. Two. Three.'), 'One.');
});

test('countLines counts the file', () => {
  assert.equal(countLines('a\nb\nc'), 3);
});

test('markdownLinks finds relative links', () => {
  const links = markdownLinks('see [the standard](references/brief.md) and [docs](../SKILL.md)');
  assert.deepEqual(links.map((l) => l.target), ['references/brief.md', '../SKILL.md']);
});

test('parseYamlList reads flat maps', () => {
  const items = parseYamlList('# comment\n- id: one\n  kind: skill\n- id: two\n');
  assert.equal(items.length, 2);
  assert.equal(items[0].id, 'one');
  assert.equal(items[1].kind, undefined);
});

test('parseYamlList throws on a value before the first item', () => {
  assert.throws(() => parseYamlList('  key: value\n'));
});
