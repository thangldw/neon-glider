# Hanzi Glider Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a lightweight Three.js lane-flight game that drills simplified HSK 3.0 levels 1–3 vocabulary from the pinned official 2026 syllabus, resumes after reload, and deploys manually to GitHub Pages.

**Architecture:** A pure TypeScript simulation owns questions, scoring, mastery, and serializable run state. Three.js renders primitive geometry from simulation snapshots, while DOM components render menus, prompts, HUD, and review screens. A build-time content pipeline snapshots the official HSK source, merges human-reviewed Vietnamese meanings, validates provenance, and emits static JSON.

**Tech Stack:** TypeScript, Vite, Three.js, Vitest, jsdom, Playwright, Cheerio, GitHub Pages, `gh-pages`.

## Global Constraints

- Static frontend only; no backend, accounts, cloud synchronization, multiplayer, or global leaderboard.
- Content label: `HSK 3.0 · 2026`.
- Source syllabus SHA-256: `ec74ce0439e837bbb15154be13e747ae798903b2fd3a331629df6c3b45504941`.
- Dataset version: `hsk3-2026-08-16`.
- Levels: HSK 3.0 levels 1, 2, and 3 only; simplified terms may contain one or more characters.
- One run contains 20 questions and targets a 3–5 minute session.
- `sessionStorage` owns the active run; `localStorage` owns mastery, scores, and settings.
- Reload resumes the active run behind a three-second countdown; a new page session without compatible state starts a new run.
- Use Three.js primitive geometry and DOM UI; do not add React, a physics engine, complex models, or heavy post-processing.
- Vietnamese meanings must be human-reviewed before a level can be marked release-ready.
- Manual deployment only: `npm test` followed by `npm run deploy`; do not add GitHub Actions.

---

## File Map

```text
index.html                          Vite entry document
package.json                        commands and dependencies
package-lock.json                   locked dependency graph
tsconfig.json                       strict TypeScript configuration
vite.config.ts                      relative production asset base
vitest.config.ts                    unit/integration test configuration
playwright.config.ts                browser test configuration
README.md                           local run, content refresh, and manual deploy
scripts/fetch-hsk3.mts              official-source snapshot fetcher
scripts/build-content.mts           reviewed translation merger and manifest builder
scripts/verify-content.mts          release content gate
content/source/hsk3-2026.json normalized official source snapshot
content/review/hsk3-2026.vi.csv human-reviewed Vietnamese meanings
src/content/types.ts                content and manifest contracts
src/content/validate.ts             runtime/build validation
src/content/generated.json          built static content pack
src/content/generated.manifest.json built provenance manifest
src/simulation/types.ts             run, question, answer, and mastery contracts
src/simulation/rng.ts               deterministic PRNG
src/simulation/scheduler.ts         weak/due/new question selection
src/simulation/run.ts               run creation and answer reducer
src/storage/run-storage.ts          session save/restore adapter
src/storage/progress-storage.ts     persistent mastery/settings adapter
src/render/game-view.ts             Three.js lifecycle and scene adapter
src/render/course.ts                lanes, gates, obstacles, and movement
src/render/glyph-texture.ts         readable Chinese gate textures
src/input/actions.ts                keyboard/pointer/touch action mapping
src/ui/app-controller.ts            screen and simulation orchestration
src/ui/screens.ts                   DOM menu, HUD, countdown, and review surfaces
src/diagnostics/perf-overlay.ts     development-only frame and draw-call metrics
src/styles.css                      responsive visual system and reduced motion
src/main.ts                         application composition root
tests/fixtures/hsk-page.html         deterministic official-page parser fixture
tests/content/fetch-hsk3.test.ts     source parser tests
tests/content/validate.test.ts       content/provenance validation tests
tests/simulation/rng.test.ts         PRNG reproducibility tests
tests/simulation/scheduler.test.ts   selection allocation tests
tests/simulation/run.test.ts         scoring and run transition tests
tests/storage/storage.test.ts        reload and corrupt-state tests
tests/ui/app-controller.test.ts      DOM/simulation integration tests
e2e/game.spec.ts                    production browser workflow tests
```

---

### Task 1: Vite, TypeScript, Test, and Manual Deploy Foundation

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `index.html`
- Create: `src/main.ts`
- Create: `src/styles.css`
- Test: `tests/app-shell.test.ts`

**Interfaces:**
- Produces: `npm run dev`, `npm run build`, `npm test`, and `npm run deploy`.
- Produces: `#app` as the single DOM mount point used by Task 7.

- [ ] **Step 1: Install the runtime and development dependencies**

```bash
npm init -y
npm install three
npm install --save-dev typescript vite vitest jsdom @types/three gh-pages @playwright/test cheerio csv-parse tsx
```

- [ ] **Step 2: Replace package scripts and create strict configuration**

Use these scripts in `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "content:fetch": "tsx scripts/fetch-hsk3.mts",
    "content:build": "tsx scripts/build-content.mts",
    "content:verify": "tsx scripts/verify-content.mts",
    "predeploy": "npm test && npm run content:verify && npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

Create `vite.config.ts` so repository subpaths work without knowing the repository name:

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: { target: 'es2022' },
});
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
    coverage: { reporter: ['text', 'html'] },
  },
});
```

- [ ] **Step 3: Write the failing app-shell test**

```ts
// tests/app-shell.test.ts
import { describe, expect, it } from 'vitest';

describe('app shell', () => {
  it('provides one application mount point', () => {
    document.body.innerHTML = '<main id="app"></main>';
    expect(document.querySelectorAll('#app')).toHaveLength(1);
  });
});
```

- [ ] **Step 4: Add the minimal entry document and application bootstrap**

```html
<!-- index.html -->
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hanzi Glider</title>
  </head>
  <body>
    <main id="app"></main>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

```ts
// src/main.ts
import './styles.css';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Missing #app mount point');
root.textContent = 'Hanzi Glider';
```

- [ ] **Step 5: Run tests and production build**

Run:

```bash
npm test
npm run build
```

Expected: one passing test and a `dist/index.html` whose asset URLs are relative.

- [ ] **Step 6: Commit the foundation**

```bash
git add package.json package-lock.json tsconfig.json vite.config.ts vitest.config.ts index.html src tests/app-shell.test.ts
git commit -m "build: scaffold Hanzi Glider frontend"
```

---

### Task 2: HSK 3.0 2026 Source Snapshot and Parser

**Files:**
- Create: `src/content/types.ts`
- Create: `scripts/fetch-hsk3.mts`
- Create: `tests/fixtures/hsk-page.html`
- Test: `tests/content/fetch-hsk3.test.ts`
- Generate: `content/source/hsk3-2026.json`

**Interfaces:**
- Produces: `HskLevel`, `SourceTerm`, `SourceSnapshot`, and `parseTermsPage(html, level)`.
- Produces: deterministic `content/source/hsk3-2026.json` consumed by Task 3.

- [ ] **Step 1: Define exact source contracts**

```ts
// src/content/types.ts
export type HskLevel = 1 | 2 | 3;

export interface SourceTerm {
  id: string;
  term: string;
  pinyin: string;
  level: HskLevel;
  sourceOrder: number;
}

export interface HanziEntry extends SourceTerm {
  meaningsVi: string[];
}

export interface SourceSnapshot {
  datasetVersion: 'hsk3-2026-08-16';
  label: 'HSK 3.0 · 2026';
  syllabusUrl: string;
  syllabusSha256: string;
  retrievedAt: '2026-08-16';
  terms: SourceTerm[];
}
```

- [ ] **Step 2: Write a parser fixture and failing parser test**

```html
<!-- tests/fixtures/hsk-page.html -->
<table>
  <tr><th>No.</th><th>级别</th><th>词语</th><th>拼音</th><th>词性</th></tr>
  <tr><td>1</td><td>一级</td><td>爱</td><td>ài</td><td>动</td></tr>
  <tr><td>2</td><td>一级</td><td>爱好</td><td>àihào</td><td>名、动</td></tr>
</table>
```

```ts
// tests/content/fetch-hsk3.test.ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseTermsPage } from '../../scripts/fetch-hsk3.mts';

describe('parseTermsPage', () => {
  it('normalizes official table rows', () => {
    const html = readFileSync('tests/fixtures/hsk-page.html', 'utf8');
    expect(parseTermsPage(html, 1)).toEqual([
      { id: 'hsk3-l1-0001', term: '爱', pinyin: 'ài', level: 1, sourceOrder: 1 },
      { id: 'hsk3-l1-0002', term: '爱好', pinyin: 'àihào', level: 1, sourceOrder: 2 },
    ]);
  });
});
```

- [ ] **Step 3: Run the parser test and verify failure**

Run: `npm test -- tests/content/fetch-hsk3.test.ts`

Expected: FAIL because `parseTermsPage` does not exist.

- [ ] **Step 4: Implement the parser and authenticated page-session fetch**

```ts
// scripts/fetch-hsk3.mts
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { load } from 'cheerio';
import type { HskLevel, SourceSnapshot, SourceTerm } from '../src/content/types';

const INFO_URL = 'https://admin.chinesetest.cn/standardsAction.do?means=standardInfo';
const SYLLABUS_URL = 'https://hsk.cn-bj.ufileos.com/3.0/%E6%96%B0%E7%89%88HSK%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B21219.pdf';
const EXPECTED_HASH = 'ec74ce0439e837bbb15154be13e747ae798903b2fd3a331629df6c3b45504941';
const LEVEL_NAMES: Record<HskLevel, string> = { 1: '一级', 2: '二级', 3: '三级' };

export function parseTermsPage(html: string, level: HskLevel): SourceTerm[] {
  const $ = load(html);
  return $('table tr').slice(1).toArray().flatMap((row) => {
    const cells = $(row).find('td').map((_, cell) => $(cell).text().trim()).get();
    const sourceOrder = Number(cells[0]);
    if (cells.length < 4 || !Number.isInteger(sourceOrder)) return [];
    return [{
      id: `hsk3-l${level}-${String(sourceOrder).padStart(4, '0')}`,
      term: cells[2],
      pinyin: cells[3],
      level,
      sourceOrder,
    }];
  });
}

async function fetchSource(): Promise<SourceSnapshot> {
  const landing = await fetch(INFO_URL);
  if (!landing.ok) throw new Error(`HSK source landing failed: ${landing.status}`);
  const landingHtml = await landing.text();
  const sessionId = landingHtml.match(/standardsAction\.do;jsessionid=([A-F0-9]+)/)?.[1];
  if (!sessionId) throw new Error('HSK source session id not found');
  const cookie = landing.headers.get('set-cookie')?.split(';', 1)[0] ?? '';
  const terms: SourceTerm[] = [];

  for (const level of [1, 2, 3] as const) {
    for (let offset = 0; ; offset += 10) {
      const url = new URL(`https://admin.chinesetest.cn/standardsAction.do;jsessionid=${sessionId}`);
      url.search = new URLSearchParams({
        means: 'getStandardWordsList',
        A: '0',
        leves: LEVEL_NAMES[level],
        words: '',
        pinyin: '',
        words_type: '',
        'pager.offset': String(offset),
      }).toString();
      const response = await fetch(url, { headers: { cookie } });
      if (!response.ok) throw new Error(`HSK level ${level} offset ${offset}: ${response.status}`);
      const page = parseTermsPage(await response.text(), level);
      if (page.length === 0) break;
      terms.push(...page);
      if (page.length < 10) break;
    }
  }

  const syllabus = new Uint8Array(await (await fetch(SYLLABUS_URL)).arrayBuffer());
  const hash = createHash('sha256').update(syllabus).digest('hex');
  if (hash !== EXPECTED_HASH) throw new Error(`Syllabus hash changed: ${hash}`);

  return {
    datasetVersion: 'hsk3-2026-08-16',
    label: 'HSK 3.0 · 2026',
    syllabusUrl: SYLLABUS_URL,
    syllabusSha256: hash,
    retrievedAt: '2026-08-16',
    terms,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const snapshot = await fetchSource();
  await mkdir('content/source', { recursive: true });
  await writeFile('content/source/hsk3-2026.json', `${JSON.stringify(snapshot, null, 2)}\n`);
}
```

- [ ] **Step 5: Verify parser behavior and generate the pinned snapshot**

Run:

```bash
npm test -- tests/content/fetch-hsk3.test.ts
npm run content:fetch
```

Expected: parser test PASS; snapshot contains only levels 1–3, non-empty terms, the fixed label, and the pinned hash. If the official site shape or PDF hash differs, stop and review the source rather than accepting new content silently.

- [ ] **Step 6: Commit source ingestion**

```bash
git add src/content/types.ts scripts/fetch-hsk3.mts tests/fixtures/hsk-page.html tests/content/fetch-hsk3.test.ts content/source/hsk3-2026.json
git commit -m "feat: ingest official HSK 3.0 vocabulary"
```

---

### Task 3: Reviewed Vietnamese Content Pack and Release Gate

**Files:**
- Create: `content/review/hsk3-2026.vi.csv`
- Create: `src/content/validate.ts`
- Create: `scripts/build-content.mts`
- Create: `scripts/verify-content.mts`
- Generate: `src/content/generated.json`
- Generate: `src/content/generated.manifest.json`
- Test: `tests/content/validate.test.ts`

**Interfaces:**
- Produces: `validateEntries(entries): string[]` and `loadContent(): HanziEntry[]`.
- Produces: validated generated JSON consumed by Tasks 4 and 7.

- [ ] **Step 1: Define the review CSV contract**

The first line of `content/review/hsk3-2026.vi.csv` is exact:

```csv
id,meaningsVi,reviewedBy,reviewedAt
```

Add one row for every source term. `meaningsVi` uses `|` between distinct Vietnamese senses. `reviewedBy` is the human reviewer's name or team identifier; `reviewedAt` is ISO `YYYY-MM-DD`. A row without both review fields is draft content and must fail the release gate.

- [ ] **Step 2: Write failing validation tests**

```ts
// tests/content/validate.test.ts
import { describe, expect, it } from 'vitest';
import { validateEntries } from '../../src/content/validate';

describe('validateEntries', () => {
  it('rejects duplicate ids and missing Vietnamese meanings', () => {
    const errors = validateEntries([
      { id: 'x', term: '爱', pinyin: 'ài', level: 1, sourceOrder: 1, meaningsVi: [] },
      { id: 'x', term: '爱好', pinyin: 'àihào', level: 1, sourceOrder: 2, meaningsVi: ['sở thích'] },
    ]);
    expect(errors).toContain('duplicate id: x');
    expect(errors).toContain('x: meaningsVi must not be empty');
  });
});
```

- [ ] **Step 3: Implement content validation**

```ts
// src/content/validate.ts
import type { HanziEntry } from './types';

export function validateEntries(entries: HanziEntry[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const entry of entries) {
    if (ids.has(entry.id)) errors.push(`duplicate id: ${entry.id}`);
    ids.add(entry.id);
    if (![1, 2, 3].includes(entry.level)) errors.push(`${entry.id}: invalid level`);
    if (!entry.term.trim()) errors.push(`${entry.id}: term must not be empty`);
    if (!entry.pinyin.trim()) errors.push(`${entry.id}: pinyin must not be empty`);
    if (entry.meaningsVi.length === 0 || entry.meaningsVi.some((item) => !item.trim())) {
      errors.push(`${entry.id}: meaningsVi must not be empty`);
    }
  }
  return errors;
}
```

- [ ] **Step 4: Implement the deterministic merger and manifest**

`scripts/build-content.mts` must:

1. Read `content/source/hsk3-2026.json`.
2. Parse CSV with `parse` from `csv-parse/sync` using `{ columns: true, bom: true, skip_empty_lines: true }`; do not split raw lines on commas.
3. Require exactly one review row per source ID.
4. Require non-empty `reviewedBy` and valid `reviewedAt`.
5. Split `meaningsVi` on `|`, trim values, and call `validateEntries`.
6. Sort by level then `sourceOrder`.
7. Write `src/content/generated.json` and a manifest containing dataset version, label, source URL/hash, importer version, review date range, and entry counts by level.

Expose this loader for runtime code:

```ts
// src/content/index.ts
import rawEntries from './generated.json';
import type { HanziEntry } from './types';
import { validateEntries } from './validate';

export function loadContent(): HanziEntry[] {
  const entries = structuredClone(rawEntries) as HanziEntry[];
  const errors = validateEntries(entries);
  if (errors.length) throw new Error(`Invalid HSK content: ${errors.join('; ')}`);
  return entries;
}
```

- [ ] **Step 5: Implement the release verification command**

`scripts/verify-content.mts` must rebuild content in memory, verify the source hash, ensure each selected level is non-empty, compare generated files byte-for-byte with the rebuild, and exit non-zero on any draft or missing review row.

Run:

```bash
npm test -- tests/content/validate.test.ts
npm run content:build
npm run content:verify
```

Expected: PASS only after all HSK 1–3 Vietnamese meanings have a human reviewer and review date. Treat review completion as a release gate, not an automated quality claim.

- [ ] **Step 6: Commit reviewed content and pipeline**

```bash
git add content/review src/content scripts/build-content.mts scripts/verify-content.mts tests/content/validate.test.ts
git commit -m "feat: add reviewed Vietnamese HSK content pack"
```

---

### Task 4: Deterministic Scheduler, Run State, and Scoring

**Files:**
- Create: `src/simulation/types.ts`
- Create: `src/simulation/rng.ts`
- Create: `src/simulation/scheduler.ts`
- Create: `src/simulation/run.ts`
- Test: `tests/simulation/rng.test.ts`
- Test: `tests/simulation/scheduler.test.ts`
- Test: `tests/simulation/run.test.ts`

**Interfaces:**
- Produces: `createRng(seed)`, `selectQuestionIds(...)`, `createRun(...)`, `moveLane(...)`, and `answerCurrent(...)`.
- Produces: serializable `RunState` and `ProgressState` used by Tasks 5–7.

- [ ] **Step 1: Define simulation contracts**

```ts
// src/simulation/types.ts
import type { HskLevel } from '../content/types';

export interface MasteryRecord {
  attempts: number;
  correct: number;
  streak: number;
  lastSeenAt: number;
  nextReviewAt: number;
}

export interface ProgressState {
  schemaVersion: 1;
  datasetVersion: 'hsk3-2026-08-16';
  mastery: Record<string, MasteryRecord>;
  highScores: Record<HskLevel, number>;
  selectedLevel: HskLevel;
  reducedMotion: boolean;
  volume: number;
}

export interface AnswerRecord {
  questionId: string;
  selectedId: string;
  correct: boolean;
}

export interface RunState {
  schemaVersion: 1;
  datasetVersion: 'hsk3-2026-08-16';
  seed: number;
  rngState: number;
  level: HskLevel;
  questionIds: string[];
  questionIndex: number;
  lane: 0 | 1 | 2;
  score: number;
  combo: number;
  energy: number;
  answers: AnswerRecord[];
  status: 'playing' | 'paused' | 'complete';
}
```

- [ ] **Step 2: Write deterministic RNG and scheduler tests**

```ts
// tests/simulation/rng.test.ts
import { expect, it } from 'vitest';
import { createRng } from '../../src/simulation/rng';

it('replays the same sequence from the same seed', () => {
  const a = createRng(42);
  const b = createRng(42);
  expect([a.next(), a.next(), a.next()]).toEqual([b.next(), b.next(), b.next()]);
});
```

```ts
// tests/simulation/scheduler.test.ts
import { expect, it } from 'vitest';
import { selectQuestionIds } from '../../src/simulation/scheduler';

it('returns 20 unique eligible ids deterministically', () => {
  const entries = Array.from({ length: 30 }, (_, index) => ({
    id: `hsk3-l1-${String(index + 1).padStart(4, '0')}`,
    term: `词${index}`,
    pinyin: `ci${index}`,
    meaningsVi: [`nghĩa ${index}`],
    level: 1 as const,
    sourceOrder: index + 1,
  }));
  const first = selectQuestionIds(entries, {}, 1, 20, 7, 1_700_000_000_000);
  const second = selectQuestionIds(entries, {}, 1, 20, 7, 1_700_000_000_000);
  expect(first).toHaveLength(20);
  expect(new Set(first).size).toBe(20);
  expect(first).toEqual(second);
});
```

- [ ] **Step 3: Implement PRNG and 50/30/20 scheduler**

Use Mulberry32 and return its internal state after every draw:

```ts
// src/simulation/rng.ts
export function createRng(initialState: number) {
  let state = initialState >>> 0;
  return {
    next(): number {
      state = (state + 0x6d2b79f5) >>> 0;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
    },
    state: () => state,
  };
}
```

`selectQuestionIds` classifies eligible items as weak, due, or new; targets 10/6/4 items for a 20-question run; redistributes empty-bucket capacity; shuffles with `createRng`; and throws if fewer than 20 unique eligible entries exist.

- [ ] **Step 4: Write failing run reducer tests**

```ts
// tests/simulation/run.test.ts
import { expect, it } from 'vitest';
import { answerCurrent, moveLane } from '../../src/simulation/run';

const run = {
  schemaVersion: 1 as const,
  datasetVersion: 'hsk3-2026-08-16' as const,
  seed: 9,
  rngState: 9,
  level: 1 as const,
  questionIds: ['a', 'b'],
  questionIndex: 0,
  lane: 1 as const,
  score: 0,
  combo: 0,
  energy: 50,
  answers: [],
  status: 'playing' as const,
};

it('clamps lane movement and rewards a correct answer', () => {
  expect(moveLane(moveLane(run, -1), -1).lane).toBe(0);
  const next = answerCurrent(run, 'a', 'a');
  expect(next).toMatchObject({ questionIndex: 1, score: 100, combo: 1, energy: 55 });
});

it('resets combo but keeps the run alive after a mistake', () => {
  const next = answerCurrent({ ...run, combo: 4 }, 'b', 'a');
  expect(next).toMatchObject({ questionIndex: 1, combo: 0, energy: 40, status: 'playing' });
});
```

- [ ] **Step 5: Implement run creation and reducers**

Correct answers add `100 + combo * 10`, increment combo, and add 5 energy capped at 100. Wrong answers reset combo and subtract 10 energy floored at 0; energy reaching 0 does not end the educational run. `questionIndex === questionIds.length` sets `status: 'complete'`.

- [ ] **Step 6: Run simulation tests and commit**

```bash
npm test -- tests/simulation
git add src/simulation tests/simulation
git commit -m "feat: add deterministic learning run simulation"
```

---

### Task 5: Session Resume and Persistent Mastery

**Files:**
- Create: `src/storage/run-storage.ts`
- Create: `src/storage/progress-storage.ts`
- Test: `tests/storage/storage.test.ts`

**Interfaces:**
- Produces: `saveRun`, `loadRun`, `clearRun`, `saveProgress`, `loadProgress`, and `updateMastery`.
- Consumes: `RunState`, `ProgressState`, and `MasteryRecord` from Task 4.

- [ ] **Step 1: Write storage failure and restoration tests**

```ts
// tests/storage/storage.test.ts
import { beforeEach, expect, it } from 'vitest';
import { loadRun, saveRun } from '../../src/storage/run-storage';

beforeEach(() => sessionStorage.clear());

it('round-trips a compatible active run', () => {
  const run = {
    schemaVersion: 1 as const,
    datasetVersion: 'hsk3-2026-08-16' as const,
    seed: 1, rngState: 2, level: 1 as const,
    questionIds: Array.from({ length: 20 }, (_, index) => `q${index + 1}`), questionIndex: 0, lane: 1 as const,
    score: 0, combo: 0, energy: 50, answers: [], status: 'playing' as const,
  };
  saveRun(sessionStorage, run);
  expect(loadRun(sessionStorage)).toEqual(run);
});

it('clears corrupt run state', () => {
  sessionStorage.setItem('hanzi-glider.run', '{bad json');
  expect(loadRun(sessionStorage)).toBeNull();
  expect(sessionStorage.getItem('hanzi-glider.run')).toBeNull();
});
```

- [ ] **Step 2: Implement strict session storage adapters**

```ts
// src/storage/run-storage.ts
import type { RunState } from '../simulation/types';

const KEY = 'hanzi-glider.run';

function isRunState(value: unknown): value is RunState {
  if (!value || typeof value !== 'object') return false;
  const run = value as Partial<RunState>;
  return run.schemaVersion === 1
    && run.datasetVersion === 'hsk3-2026-08-16'
    && Number.isInteger(run.seed)
    && Number.isInteger(run.rngState)
    && [1, 2, 3].includes(run.level ?? 0)
    && Array.isArray(run.questionIds)
    && run.questionIds.length === 20
    && Number.isInteger(run.questionIndex)
    && (run.questionIndex ?? -1) >= 0
    && (run.questionIndex ?? 21) <= run.questionIds.length
    && [0, 1, 2].includes(run.lane ?? -1)
    && Array.isArray(run.answers)
    && ['playing', 'paused', 'complete'].includes(run.status ?? '');
}

export function saveRun(
  storage: Storage,
  run: RunState,
  onUnavailable: () => void = () => undefined,
): boolean {
  try {
    storage.setItem(KEY, JSON.stringify(run));
    return true;
  } catch {
    onUnavailable();
    return false;
  }
}

export function loadRun(
  storage: Storage,
  onUnavailable: () => void = () => undefined,
): RunState | null {
  try {
    const raw = storage.getItem(KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!isRunState(value)) {
      storage.removeItem(KEY);
      return null;
    }
    return value;
  } catch {
    try { storage.removeItem(KEY); } catch { onUnavailable(); }
    return null;
  }
}

export function clearRun(storage: Storage, onUnavailable: () => void = () => undefined): void {
  try { storage.removeItem(KEY); } catch { onUnavailable(); }
}
```

- [ ] **Step 3: Implement persistent defaults and mastery intervals**

`loadProgress` returns defaults after missing, corrupt, or incompatible data. `updateMastery(progress, termId, correct, now)` updates attempts, correct count, streak, `lastSeenAt`, and `nextReviewAt` using `[0, 1, 3, 7, 14]` day intervals indexed by the new streak and capped at 14 days. Wrong answers set streak to zero and `nextReviewAt` to `now`.

- [ ] **Step 4: Add storage-access fallback tests**

Use a fake `Storage` whose methods throw `DOMException('denied')`; verify adapters return in-memory defaults and invoke an optional `onUnavailable` callback exactly once rather than crashing the game.

- [ ] **Step 5: Run storage tests and commit**

```bash
npm test -- tests/storage/storage.test.ts
git add src/storage tests/storage
git commit -m "feat: persist runs and learning mastery"
```

---

### Task 6: Three.js Lane Course and Input Actions

**Files:**
- Create: `src/render/game-view.ts`
- Create: `src/render/course.ts`
- Create: `src/render/glyph-texture.ts`
- Create: `src/input/actions.ts`
- Test: `tests/render/course.test.ts`
- Test: `tests/input/actions.test.ts`

**Interfaces:**
- Produces: `GameView`, `laneToX(lane)`, `createGlyphTexture(text)`, and `bindActions(target, handlers)`.
- Consumes: simulation snapshots; never mutates scoring, questions, or storage.

- [ ] **Step 1: Write pure lane-position and action-map tests**

```ts
// tests/render/course.test.ts
import { expect, it } from 'vitest';
import { laneToX } from '../../src/render/course';

it('maps three lanes symmetrically', () => {
  expect([laneToX(0), laneToX(1), laneToX(2)]).toEqual([-3, 0, 3]);
});
```

```ts
// tests/input/actions.test.ts
import { expect, it, vi } from 'vitest';
import { bindActions } from '../../src/input/actions';

it('maps ArrowLeft and ArrowRight once', () => {
  const left = vi.fn();
  const right = vi.fn();
  const dispose = bindActions(window, { left, right, pause: vi.fn() });
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
  expect(left).toHaveBeenCalledOnce();
  expect(right).toHaveBeenCalledOnce();
  dispose();
});
```

- [ ] **Step 2: Implement course primitives and glyph textures**

`course.ts` creates three emissive rails, pooled wireframe obstacle meshes, and three gate planes. `createGlyphTexture` draws a white simplified term centered on a 512×256 canvas with a CJK-capable system font stack and returns a `THREE.CanvasTexture`; dispose replaced textures immediately.

```ts
export const laneToX = (lane: 0 | 1 | 2): number => [-3, 0, 3][lane];
```

- [ ] **Step 3: Implement the renderer lifecycle**

```ts
// src/render/game-view.ts
export interface GameView {
  setLane(lane: 0 | 1 | 2): void;
  setGateTerms(terms: readonly [string, string, string]): void;
  setPaused(paused: boolean): void;
  render(elapsedSeconds: number): void;
  dispose(): void;
}
```

Implementation requirements:

- One `WebGLRenderer`, one perspective camera, one scene, fog, ambient light, and one directional light.
- Cap device pixel ratio at `Math.min(devicePixelRatio, 2)`.
- Resize from the container's client size with `ResizeObserver`.
- Pause animation on `webglcontextlost`; rebuild resources on `webglcontextrestored`.
- Use lerp for lane movement; use elapsed time only for visual motion.
- Provide reduced-motion mode that disables camera shake and shortens transitions.
- Dispose geometries, materials, textures, observers, and event listeners.

- [ ] **Step 4: Implement keyboard, touch, and pointer action mapping**

Map `ArrowLeft`/`A`, `ArrowRight`/`D`, and `Escape`/`P`. Pointer/touch horizontal swipes above 32 CSS pixels dispatch exactly one lane action. Click/tap on the left or right 35% of the playfield dispatches a lane action when no swipe occurred.

- [ ] **Step 5: Run focused tests and commit**

```bash
npm test -- tests/render tests/input
git add src/render src/input tests/render tests/input
git commit -m "feat: render lightweight Three.js lane course"
```

---

### Task 7: Menu, HUD, Countdown, Review, and App Controller

**Files:**
- Create: `src/ui/screens.ts`
- Create: `src/ui/app-controller.ts`
- Modify: `src/main.ts`
- Modify: `src/styles.css`
- Test: `tests/ui/app-controller.test.ts`

**Interfaces:**
- Produces: `createAppController(root, dependencies)` and `destroy()`.
- Consumes: content loader, simulation functions, storage adapters, input actions, and `GameView`.

- [ ] **Step 1: Write the level-selection and resume tests**

```ts
// tests/ui/app-controller.test.ts
import { expect, it, vi } from 'vitest';
import { createAppController } from '../../src/ui/app-controller';

it('labels the official 2026 dataset and starts the selected level', () => {
  const root = document.createElement('main');
  const startRun = vi.fn();
  const app = createAppController(root, { startRun, restoredRun: null });
  expect(root.textContent).toContain('HSK 3.0 · 2026');
  root.querySelector<HTMLButtonElement>('[data-level="2"]')?.click();
  expect(startRun).toHaveBeenCalledWith(2);
  app.destroy();
});

it('shows a three-second countdown before resuming', () => {
  vi.useFakeTimers();
  const root = document.createElement('main');
  const restoredRun = {
    schemaVersion: 1 as const,
    datasetVersion: 'hsk3-2026-08-16' as const,
    seed: 1, rngState: 2, level: 1 as const,
    questionIds: ['a'], questionIndex: 0, lane: 1 as const,
    score: 0, combo: 0, energy: 50, answers: [], status: 'playing' as const,
  };
  const app = createAppController(root, { startRun: vi.fn(), restoredRun });
  expect(root.textContent).toContain('3');
  vi.advanceTimersByTime(3_000);
  expect(root.querySelector('[data-screen="game"]')).not.toBeNull();
  app.destroy();
  vi.useRealTimers();
});
```

- [ ] **Step 2: Implement DOM screen factories**

`screens.ts` creates these surfaces with semantic HTML and stable selectors:

- Menu: title, `HSK 3.0 · 2026`, three level buttons, reduced-motion toggle.
- HUD: Vietnamese or pinyin prompt, score, combo, energy, progress `current / 20`, pause.
- Countdown: `3`, `2`, `1` without advancing simulation.
- Review: incorrect term, pinyin, Vietnamese meanings, selected answer, restart/menu actions.
- Error: content unavailable, WebGL unsupported, or save unavailable.

The current prompt and gate terms must be available to assistive technology. Lane changes use an `aria-live="polite"` status without announcing every animation frame.

- [ ] **Step 3: Implement the controller state machine**

Controller states are `menu`, `countdown`, `playing`, `paused`, `review`, and `fatal`. It must:

1. Load content and progress once.
2. Restore a compatible session run or show the menu.
3. Create one `GameView` only while gameplay is visible.
4. Save after every answer, every 500 ms while playing, and `visibilitychange`.
5. Update mastery and high score when a run completes.
6. Clear session run after the review screen is acknowledged.
7. Pause input and simulation when the tab is hidden or WebGL context is lost.

- [ ] **Step 4: Replace bootstrap and implement responsive styling**

`main.ts` composes real browser dependencies and catches startup failures. `styles.css` uses a full-viewport black-violet canvas, edge-aligned HUD, high-contrast CJK terms, minimum 44×44 px touch targets, safe-area insets, and `@media (prefers-reduced-motion: reduce)`.

- [ ] **Step 5: Run UI integration tests and the full unit suite**

```bash
npm test -- tests/ui/app-controller.test.ts
npm test
npm run build
```

Expected: all unit tests PASS and production TypeScript build exits 0.

- [ ] **Step 6: Commit the integrated playable loop**

```bash
git add src/main.ts src/styles.css src/ui tests/ui
git commit -m "feat: integrate Hanzi Glider gameplay flow"
```

---

### Task 8: Browser Smoke Tests, Performance Evidence, and Deployment Guide

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/game.spec.ts`
- Create: `src/diagnostics/perf-overlay.ts`
- Create: `README.md`
- Modify: `package.json`

**Interfaces:**
- Produces: `npm run test:e2e` and documented `npm run deploy` workflow.
- Verifies: GitHub Pages subpath assets, input, reload resume, level selection, completion, responsive layout, WebGL, and reduced motion.

- [ ] **Step 1: Configure Playwright against the production preview**

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://127.0.0.1:4173' },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1',
    port: 4173,
    reuseExistingServer: false,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
});
```

Add scripts:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "pretest:e2e": "npm run build"
  }
}
```

Install the Chromium runtime once on the development machine:

```bash
npx playwright install chromium
```

- [ ] **Step 2: Write the critical browser workflow**

```ts
// e2e/game.spec.ts
import { expect, test } from '@playwright/test';

test('selects HSK 2 and restores the same run after reload', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('HSK 3.0 · 2026')).toBeVisible();
  await page.getByRole('button', { name: /HSK 2/i }).click();
  const runBefore = await page.evaluate(() => JSON.parse(sessionStorage.getItem('hanzi-glider.run') ?? 'null'));
  expect(runBefore).toBeTruthy();
  await page.reload();
  await expect(page.getByText('3')).toBeVisible();
  await expect(page.locator('[data-screen="game"]')).toBeVisible({ timeout: 5_000 });
  const runAfter = await page.evaluate(() => JSON.parse(sessionStorage.getItem('hanzi-glider.run') ?? 'null'));
  expect(runAfter.seed).toBe(runBefore.seed);
  expect(runAfter.questionIds).toEqual(runBefore.questionIds);
  expect(runAfter.questionIndex).toBe(runBefore.questionIndex);
});

test('renders without horizontal overflow on mobile', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  expect(overflow).toBe(false);
});

test('a new browser context starts without the previous active run', async ({ browser }) => {
  const firstContext = await browser.newContext();
  const firstPage = await firstContext.newPage();
  await firstPage.goto('/');
  await firstPage.getByRole('button', { name: /HSK 1/i }).click();
  expect(await firstPage.evaluate(() => sessionStorage.getItem('hanzi-glider.run'))).toBeTruthy();
  await firstContext.close();

  const secondContext = await browser.newContext();
  const secondPage = await secondContext.newPage();
  await secondPage.goto('/');
  await expect(secondPage.getByRole('button', { name: /HSK 1/i })).toBeVisible();
  expect(await secondPage.evaluate(() => sessionStorage.getItem('hanzi-glider.run'))).toBeNull();
  await secondContext.close();
});
```

- [ ] **Step 3: Add deterministic test hooks for full-run completion**

Expose test hooks only when `import.meta.env.MODE === 'test'` or query parameter `e2e=1` is present. The hook advances the current question with an explicitly selected answer ID; it must call the same reducer and storage code as real input. Add an e2e case that completes 20 questions, reaches review, and verifies incorrect items display term, pinyin, and Vietnamese meanings.

- [ ] **Step 4: Capture performance evidence**

Add a development-only diagnostic overlay showing frame time, draw calls, geometry count, and texture count. Run one full desktop and one full mobile-emulated Playwright session. Record observed median and worst frame time plus maximum draw calls in `README.md`; do not convert this single-machine evidence into a universal FPS claim. Treat visible sustained input lag or repeated frames above 50 ms as a release blocker.

- [ ] **Step 5: Document manual deployment**

`README.md` must contain these exact operator steps:

```bash
npm ci
npm test
npm run test:e2e
npm run deploy
```

Also document GitHub repository Settings → Pages → Deploy from branch → `gh-pages` / root, required Git push access, the pinned official HSK source and content label, content review gate, storage semantics, and the browser-session restoration limitation.

- [ ] **Step 6: Run the complete release gate**

```bash
npm ci
npm test
npm run content:verify
npm run build
npm run test:e2e
git diff --check
```

Expected: all commands exit 0. Do not run `npm run deploy` until the repository remote and GitHub Pages branch settings have been confirmed by the user.

- [ ] **Step 7: Commit release verification and documentation**

```bash
git add package.json package-lock.json playwright.config.ts e2e README.md src/diagnostics
git commit -m "test: verify Hanzi Glider browser release"
```

---

## Implementation Completion Evidence

Before claiming completion, attach or report:

- Commit hashes for Tasks 1–8.
- `npm test` summary with total passed and failed.
- `npm run content:verify` result including dataset version, source hash, and per-level counts.
- `npm run build` output and `dist/` size.
- Playwright results for desktop and mobile projects.
- Recorded frame-time and draw-call observations with device/browser context.
- Manual deploy command result and resulting GitHub Pages URL, only if the user authorized deployment and provided a configured remote.
