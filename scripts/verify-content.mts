import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { rebuildContent } from './build-content.mts';
import { assertPinnedSourceSnapshot } from './provenance.mts';

const ROOT = resolve(import.meta.dirname, '..');

async function verifyContent(): Promise<void> {
  assertPinnedSourceSnapshot(await readFile(resolve(ROOT, 'content/source/hsk3-2026.json')));
  const build = await rebuildContent();
  for (const [level, count] of Object.entries(build.manifest.entryCountsByLevel)) {
    if (count === 0) throw new Error(`HSK level ${level} is empty`);
  }

  const [generatedJson, manifestJson] = await Promise.all([
    readFile(resolve(ROOT, 'src/content/generated.json'), 'utf8'),
    readFile(resolve(ROOT, 'src/content/generated.manifest.json'), 'utf8'),
  ]);
  if (generatedJson !== build.generatedJson) throw new Error('Generated content JSON is stale');
  if (manifestJson !== build.manifestJson) throw new Error('Generated content manifest is stale');
  if (build.manifest.draftCount > 0) {
    throw new Error(`Content release blocked: ${build.manifest.draftCount} draft entries require human review`);
  }
}

try {
  await verifyContent();
  console.log('Content release gate passed.');
} catch (error) {
  console.error((error as Error).message);
  process.exitCode = 1;
}
