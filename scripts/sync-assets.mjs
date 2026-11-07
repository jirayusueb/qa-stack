// Copy canonical personas and standards into the skills that must work when
// installed without agents/ or resources/. `--check` verifies byte equality.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');

function hash(text) {
  return createHash('sha256').update(text).digest('hex');
}

function main() {
  const manifest = JSON.parse(readFileSync(join(ROOT, 'scripts/assets.manifest.json'), 'utf8'));
  const problems = [];
  let written = 0;
  for (const entry of manifest.assets) {
    const sourcePath = join(ROOT, entry.source);
    if (!existsSync(sourcePath)) {
      problems.push(`missing source ${entry.source}`);
      continue;
    }
    const source = readFileSync(sourcePath);
    for (const target of entry.targets) {
      const targetPath = join(ROOT, target);
      if (CHECK) {
        if (!existsSync(targetPath)) { problems.push(`missing embedded copy ${target}`); continue; }
        if (hash(readFileSync(targetPath)) !== hash(source)) problems.push(`stale embedded copy ${target}`);
      } else {
        mkdirSync(dirname(targetPath), { recursive: true });
        writeFileSync(targetPath, source);
        written += 1;
      }
    }
  }
  if (CHECK) {
    if (problems.length) {
      console.error(`sync-assets --check: ${problems.length} problem(s)`);
      for (const problem of problems) console.error(`- ${problem}`);
      process.exit(1);
    }
    console.log('sync-assets --check: embedded assets match canonical sources');
    return;
  }
  if (problems.length) {
    console.error(`sync-assets: ${problems.length} problem(s)`);
    for (const problem of problems) console.error(`- ${problem}`);
    process.exit(1);
  }
  console.log(`sync-assets: wrote ${written} embedded copies`);
}

main();
