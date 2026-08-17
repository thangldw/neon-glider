import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';

it('contains no learning runtime, content tooling, or retired package scripts', () => {
  const files = execFileSync('git', ['ls-files'], { encoding: 'utf8' }).trim().split('\n');
  const removedPaths = [
    'content/',
    'scripts/build-content.mts',
    'scripts/draft-contract.mts',
    'scripts/draft-meanings.mts',
    'scripts/fetch-hsk3.mts',
    'scripts/ollama-transport.mts',
    'scripts/provenance.mts',
    'scripts/repair-checkpoint.mts',
    'scripts/repair-scheduler.mts',
    'scripts/repair-vietnamese-drafts.mts',
    'scripts/verify-content.mts',
    'src/content/',
    'src/render/course.ts',
    'src/render/game-view.ts',
    'src/render/glyph-texture.ts',
    'src/simulation/scheduler.ts',
    'src/simulation/run.ts',
    'src/simulation/types.ts',
    'src/storage/progress-storage.ts',
    'src/storage/run-storage.ts',
    'tests/content/',
    'tests/fixtures/hsk-page.html',
    'tests/render/course.test.ts',
    'tests/render/game-view.test.ts',
    'tests/render/glyph-texture.test.ts',
    'tests/simulation/scheduler.test.ts',
    'tests/storage/storage.test.ts',
  ];
  expect(removedPaths.some((path) => files.some((file) => path.endsWith('/') ? file.startsWith(path) : file === path))).toBe(false);

  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
  const forbiddenScripts = ['fetch', 'draft', 'repair', 'build', 'verify'].map((name) => `content:${name}`);
  const learningDependencies = ['cheerio', 'csv-parse', 'tsx'];
  const directDependencies = { ...pkg.dependencies, ...pkg.devDependencies };
  const lockedRootDependencies = { ...lock.packages[''].dependencies, ...lock.packages[''].devDependencies };

  expect(forbiddenScripts.some((name) => name in pkg.scripts)).toBe(false);
  expect(learningDependencies.some((name) => name in directDependencies)).toBe(false);
  expect(learningDependencies.some((name) => name in lockedRootDependencies)).toBe(false);
  expect(pkg.name).toBe('neon-glider');
  expect(lock.name).toBe('neon-glider');
  expect(lock.packages[''].name).toBe('neon-glider');
});
