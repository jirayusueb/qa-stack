// Minimal frontmatter and markdown helpers. No dependencies.

export function splitFrontmatter(text) {
  if (!text.startsWith('---\n') && !text.startsWith('---\r\n')) {
    return { ok: false, reason: 'file does not start with a frontmatter block' };
  }
  const lines = text.split(/\r?\n/);
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { end = i; break; }
  }
  if (end === -1) return { ok: false, reason: 'frontmatter block is not closed' };
  const body = lines.slice(end + 1).join('\n');
  return { ok: true, lines: lines.slice(1, end), body, bodyStartLine: end + 2 };
}

export function parseFrontmatter(text) {
  const split = splitFrontmatter(text);
  if (!split.ok) return { ok: false, reason: split.reason };
  const data = {};
  const lines = split.lines;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const match = /^([A-Za-z][A-Za-z0-9_-]*):(.*)$/.exec(line);
    if (!match) {
      return { ok: false, reason: `unparseable frontmatter line: ${line}` };
    }
    const key = match[1];
    let value = match[2].trim();
    if (value === '>-' || value === '>' || value === '|' || value === '|-') {
      const collected = [];
      let j = i + 1;
      for (; j < lines.length; j++) {
        const next = lines[j];
        if (!next.trim()) { collected.push(''); continue; }
        if (!/^\s+/.test(next)) break;
        collected.push(next.trim());
      }
      i = j - 1;
      value = collected.join(' ').replace(/\s+/g, ' ').trim();
    } else if (/^"(.*)"$/.test(value)) {
      value = value.slice(1, -1);
    } else if (/^'(.*)'$/.test(value)) {
      value = value.slice(1, -1);
    }
    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    data[key] = value;
  }
  return { ok: true, data, body: split.body, bodyStartLine: split.bodyStartLine };
}

export function firstHeading(body) {
  for (const line of body.split(/\r?\n/)) {
    const match = /^#\s+(.+)$/.exec(line);
    if (match) return match[1].trim();
  }
  return '';
}

export function firstSentence(text) {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  const match = /^(.+?[.!?])(\s|$)/.exec(clean);
  return (match ? match[1] : clean).trim();
}

export function replaceRegion(text, startMarker, endMarker, replacement) {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) {
    return { ok: false, reason: `missing marker pair ${startMarker} / ${endMarker}` };
  }
  const before = text.slice(0, start + startMarker.length);
  const after = text.slice(end);
  return { ok: true, text: `${before}\n${replacement.trim()}\n${after}` };
}

export function countLines(text) {
  return text.split(/\r?\n/).length;
}

export function markdownLinks(text) {
  const links = [];
  const re = /(!?)\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    links.push({ image: match[1] === '!', target: match[2] });
  }
  return links;
}
