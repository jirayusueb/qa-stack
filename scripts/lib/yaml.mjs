// Tiny YAML reader for the eval files. Supports a top-level list of flat maps
// and comma-separated scalar values. Intentional subset, not a YAML engine.

export function parseYamlList(text) {
  const items = [];
  let current = null;
  const lines = text.split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const item = /^-\s+(.*)$/.exec(line);
    if (item) {
      current = {};
      items.push(current);
      const rest = item[1].trim();
      if (rest) {
        const kv = /^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/.exec(rest);
        if (!kv) throw new Error(`bad list item: ${line}`);
        current[kv[1]] = scalar(kv[2]);
      }
      continue;
    }
    if (!current) throw new Error(`value before first list item: ${line}`);
    const kv = /^\s+([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/.exec(line);
    if (!kv) throw new Error(`bad mapping line: ${line}`);
    current[kv[1]] = scalar(kv[2]);
  }
  return items;
}

function scalar(raw) {
  let value = raw.trim();
  if (/^"(.*)"$/.test(value)) return value.slice(1, -1);
  if (/^'(.*)'$/.test(value)) return value.slice(1, -1);
  if (value.includes(',')) return value.split(',').map((part) => part.trim()).filter(Boolean);
  return value;
}
