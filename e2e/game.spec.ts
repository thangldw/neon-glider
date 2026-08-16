import { mkdirSync, readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

interface BrowserSnapshot {
  screen: 'menu' | 'countdown' | 'playing' | 'paused' | 'review' | 'fatal';
  run: null | {
    schemaVersion: 1;
    datasetVersion: 'hsk3-2026-08-16';
    seed: number;
    rngState: number;
    level: 1 | 2 | 3;
    questionIds: string[];
    questionIndex: number;
    lane: 0 | 1 | 2;
    score: number;
    combo: number;
    energy: number;
    answers: Array<{ questionId: string; selectedId: string; correct: boolean }>;
    status: 'playing' | 'paused' | 'complete';
  };
  choices: null | readonly { id: string; term: string }[];
  reducedMotion: boolean;
  performance: {
    sampleCount: number;
    medianFrameTimeMs: number;
    worstFrameTimeMs: number;
    slowFrameCount: number;
    longestSlowFrameStreak: number;
    maxDrawCalls: number;
    maxGeometries: number;
    maxTextures: number;
  };
  framing: null | { gliderNdcX: number; gliderNdcY: number; gliderVisible: boolean };
}

const artifacts = '.superpowers/sdd/2026-08-16-hanzi-glider-implementation/task-8-artifacts/screenshots';
const content = JSON.parse(readFileSync(new URL('../src/content/generated.json', import.meta.url), 'utf8')) as Array<{
  id: string;
  meaningsVi: string[];
  level: 1 | 2 | 3;
}>;
const longestPromptEntry = content.find(({ id }) => id === 'hsk3-l2-8672');
if (!longestPromptEntry) throw new Error('Missing pinned long-prompt content fixture');

async function openGame(page: Page): Promise<void> {
  const failedRequests: string[] = [];
  page.on('requestfailed', (request) => failedRequests.push(`${request.method()} ${request.url()}`));
  await page.goto('?e2e=1');
  await expect(page.getByText('HSK 3.0 · 2026')).toBeVisible();
  expect(failedRequests).toEqual([]);
}

async function snapshot(page: Page): Promise<BrowserSnapshot> {
  return page.evaluate(() => {
    if (!window.__HANZI_GLIDER_E2E__) throw new Error('Missing E2E hook');
    return window.__HANZI_GLIDER_E2E__.snapshot();
  });
}

async function answer(page: Page, id: string): Promise<boolean> {
  return page.evaluate((selectedId) => window.__HANZI_GLIDER_E2E__?.answer(selectedId) ?? false, id);
}

async function nextRenderedFrame(page: Page): Promise<void> {
  await page.evaluate(() => new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  }));
}

async function screenshot(page: Page, project: string, name: string): Promise<void> {
  mkdirSync(`${artifacts}/${project}`, { recursive: true });
  await page.screenshot({ path: `${artifacts}/${project}/${name}.png`, fullPage: true });
}

test('does not expose deterministic controls without the explicit e2e query', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('[data-screen="menu"]')).toBeVisible();
  expect(await page.evaluate(() => window.__HANZI_GLIDER_E2E__)).toBeUndefined();
});

for (const level of [1, 2, 3] as const) {
  test(`starts a 20-question HSK ${level} run from the relative Pages subpath`, async ({ page }, testInfo) => {
    await openGame(page);
    if (level === 1) {
      await expect(page.locator('[data-screen="menu"]')).toBeFocused();
      expect(await page.locator('[data-screen="menu"]').evaluate((node) => getComputedStyle(node).outlineStyle)).toBe('none');
      await screenshot(page, testInfo.project.name, 'menu');
    }
    await page.getByRole('button', { name: `HSK ${level}`, exact: true }).click();
    const state = await snapshot(page);

    expect(state).toMatchObject({ screen: 'playing', run: { level, questionIndex: 0 } });
    expect(state.run?.questionIds).toHaveLength(20);
    await expect(page.locator('[data-gate-term]')).toHaveCount(3);
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    expect(await canvas.evaluate((node: HTMLCanvasElement) => Boolean(
      node.getContext('webgl2') || node.getContext('webgl') || node.getContext('experimental-webgl'),
    ))).toBe(true);
  });
}

test('supports keyboard or touch lane input and pause countdown', async ({ page, isMobile }, testInfo) => {
  await openGame(page);
  await page.getByRole('button', { name: 'HSK 1', exact: true }).click();
  const viewport = page.locator('[data-game-viewport]');
  const bounds = await viewport.boundingBox();
  if (!bounds) throw new Error('Gameplay viewport has no bounds');

  if (isMobile) {
    await page.touchscreen.tap(bounds.x + 8, bounds.y + bounds.height / 2);
    await expect.poll(async () => (await snapshot(page)).run?.lane).toBe(0);
    await page.touchscreen.tap(bounds.x + bounds.width - 8, bounds.y + bounds.height / 2);
  } else {
    await viewport.press('ArrowLeft');
    await expect.poll(async () => (await snapshot(page)).run?.lane).toBe(0);
    await viewport.click({ position: { x: bounds.width - 8, y: bounds.height / 2 } });
  }
  await expect.poll(async () => (await snapshot(page)).run?.lane).toBe(1);

  await page.getByRole('button', { name: 'Tạm dừng' }).click();
  await expect(page.locator('[data-screen="paused"]')).toBeVisible();
  await screenshot(page, testInfo.project.name, 'paused');
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await expect(page.locator('[data-screen="countdown"]')).toContainText('3');
  await expect.poll(async () => (await snapshot(page)).screen, { timeout: 4_500 }).toBe('playing');
});

test('keeps the Pixel 7 glider visible in every lane', async ({ page, isMobile }, testInfo) => {
  test.skip(!isMobile);
  await openGame(page);
  await page.getByRole('button', { name: 'HSK 1', exact: true }).click();
  const viewport = page.locator('[data-game-viewport]');
  const bounds = await viewport.boundingBox();
  if (!bounds) throw new Error('Gameplay viewport has no bounds');
  const tapLeft = () => page.touchscreen.tap(bounds.x + 8, bounds.y + bounds.height / 2);
  const tapRight = () => page.touchscreen.tap(bounds.x + bounds.width - 8, bounds.y + bounds.height / 2);

  await tapLeft();
  for (const lane of [0, 1, 2] as const) {
    if (lane === 1) await tapRight();
    if (lane === 2) await tapRight();
    await expect.poll(async () => {
      const state = await snapshot(page);
      return state.run?.lane === lane && state.framing?.gliderVisible && Math.abs(state.framing.gliderNdcX) < 0.9;
    }).toBe(true);
    await screenshot(page, testInfo.project.name, `lane-${lane}`);
  }
});

test('reload restores the exact HSK 2 run after a three-second countdown', async ({ page }, testInfo) => {
  await openGame(page);
  await page.getByRole('button', { name: 'HSK 2', exact: true }).click();
  const first = await snapshot(page);
  const wrong = first.choices!.find(({ id }) => id !== first.run!.questionIds[0])!;
  expect(await answer(page, wrong.id)).toBe(true);
  await page.locator('[data-game-viewport]').press('ArrowRight');
  const before = await snapshot(page);
  await expect.poll(async () => {
    const persisted = await page.evaluate(() => JSON.parse(sessionStorage.getItem('hanzi-glider.run') ?? 'null'));
    return persisted?.lane;
  }).toBe(before.run!.lane);
  const persistedBefore = await page.evaluate(() => JSON.parse(sessionStorage.getItem('hanzi-glider.run') ?? 'null'));
  expect(persistedBefore).toEqual(before.run);

  await page.reload();
  const countdown = page.locator('[data-screen="countdown"]');
  await expect(countdown).toContainText('3');
  await screenshot(page, testInfo.project.name, 'reload-countdown');
  expect((await snapshot(page)).run).toEqual({ ...before.run!, status: 'paused' });
  expect(await page.evaluate(() => JSON.parse(sessionStorage.getItem('hanzi-glider.run') ?? 'null')))
    .toEqual({ ...persistedBefore, status: 'paused' });
  await expect(countdown).toContainText('2', { timeout: 1_500 });
  expect((await snapshot(page)).run).toEqual({ ...before.run!, status: 'paused' });
  await expect(countdown).toContainText('1', { timeout: 1_500 });
  expect((await snapshot(page)).run).toEqual({ ...before.run!, status: 'paused' });
  await expect.poll(async () => (await snapshot(page)).screen, { timeout: 4_500 }).toBe('playing');
  expect((await snapshot(page)).run).toEqual(before.run);
  expect(await page.evaluate(() => JSON.parse(sessionStorage.getItem('hanzi-glider.run') ?? 'null'))).toEqual(persistedBefore);
  await screenshot(page, testInfo.project.name, 'gameplay');
});

test('shows the complete longest pinned Vietnamese prompt without clipping', async ({ page }, testInfo) => {
  const remainingIds = content.filter(({ level, id }) => level === 2 && id !== longestPromptEntry.id).slice(0, 19).map(({ id }) => id);
  await page.addInitScript(({ questionIds }) => {
    sessionStorage.setItem('hanzi-glider.run', JSON.stringify({
      schemaVersion: 1,
      datasetVersion: 'hsk3-2026-08-16',
      seed: 1,
      rngState: 2,
      level: 2,
      questionIds,
      questionIndex: 0,
      lane: 1,
      score: 0,
      combo: 0,
      energy: 50,
      answers: [],
      status: 'playing',
    }));
  }, { questionIds: [longestPromptEntry.id, ...remainingIds] });
  await page.goto('?e2e=1');
  await expect(page.locator('[data-screen="countdown"]')).toBeVisible();
  await expect.poll(async () => (await snapshot(page)).screen, { timeout: 4_500 }).toBe('playing');

  const expected = longestPromptEntry.meaningsVi.join('; ');
  const prompt = page.locator('[data-prompt]');
  await expect(prompt).toHaveText(expected);
  const layout = await prompt.evaluate((node) => {
    const bounds = node.getBoundingClientRect();
    return {
      clientWidth: node.clientWidth,
      clientHeight: node.clientHeight,
      scrollWidth: node.scrollWidth,
      scrollHeight: node.scrollHeight,
      bottom: bounds.bottom,
      viewportHeight: innerHeight,
      pageOverflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
  expect(layout.scrollHeight).toBeLessThanOrEqual(layout.clientHeight + 1);
  expect(layout.bottom).toBeLessThan(layout.viewportHeight * 0.4);
  expect(layout.pageOverflow).toBe(false);
  await screenshot(page, testInfo.project.name, 'long-prompt');
});

test('completes exactly 20 questions and shows detailed mistake review with renderer evidence', async ({ page }, testInfo) => {
  await openGame(page);
  await page.getByRole('button', { name: 'HSK 3', exact: true }).click();
  await nextRenderedFrame(page);
  await screenshot(page, testInfo.project.name, 'hsk3-course');
  await page.evaluate(() => window.__HANZI_GLIDER_E2E__!.resetPerformance());

  let firstMistake: { correctTerm: string; selectedTerm: string } | null = null;
  for (let index = 0; index < 20; index += 1) {
    const current = await snapshot(page);
    expect(current.screen).toBe('playing');
    expect(current.choices).toHaveLength(3);
    await expect(page.locator('[data-gate-term]')).toHaveCount(3);
    const correctId = current.run!.questionIds[current.run!.questionIndex];
    let selectedId = correctId;
    if (index === 0) selectedId = current.choices!.find(({ id }) => id !== correctId)!.id;
    if (index === 0) {
      firstMistake = await page.evaluate(({ correctId: answerId, selectedId: chosenId }) => {
        const entries = Array.from(document.querySelectorAll<HTMLElement>('[data-gate-term]'));
        const selectedTerm = window.__HANZI_GLIDER_E2E__!.snapshot().choices!.find(({ id }) => id === chosenId)!.term;
        const correctTerm = window.__HANZI_GLIDER_E2E__!.snapshot().choices!.find(({ id }) => id === answerId)!.term;
        if (entries.length !== 3) throw new Error('Expected exactly three gate terms');
        return { correctTerm, selectedTerm };
      }, { correctId, selectedId });
    }
    expect(await answer(page, selectedId)).toBe(true);
    await nextRenderedFrame(page);
  }

  await expect(page.locator('[data-screen="review"]')).toBeVisible();
  await expect(page.locator('.review-item')).toHaveCount(1);
  const review = page.locator('.review-item').first();
  await expect(review.locator('.review-term')).toHaveText(firstMistake!.correctTerm);
  await expect(review.locator('.review-selected')).toContainText(firstMistake!.selectedTerm);
  const details = (await review.locator('p').first().textContent()) ?? '';
  expect(details.split(' · ')[0].trim().length).toBeGreaterThan(0);
  expect(details.split(' · ')[1]?.trim().length).toBeGreaterThan(0);
  await screenshot(page, testInfo.project.name, 'review');

  const completed = await snapshot(page);
  expect(completed.run).toMatchObject({ questionIndex: 20, status: 'complete' });
  expect(completed.performance).toMatchObject({
    sampleCount: expect.any(Number),
    maxDrawCalls: expect.any(Number),
    maxGeometries: expect.any(Number),
    maxTextures: expect.any(Number),
  });
  expect(completed.performance.sampleCount).toBeGreaterThanOrEqual(20);
  expect(completed.performance.maxDrawCalls).toBeGreaterThan(0);
  expect(completed.performance.maxGeometries).toBeGreaterThan(0);
  expect(completed.performance.maxTextures).toBeGreaterThan(0);
  expect(completed.performance.longestSlowFrameStreak).toBeLessThan(3);
  console.log(`PERF_EVIDENCE ${testInfo.project.name} ${JSON.stringify(completed.performance)}`);
});

test('keeps menu, HUD, and resized canvas inside the viewport with reduced motion', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openGame(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const transitionDuration = await page.getByRole('button', { name: 'HSK 1', exact: true })
    .evaluate((node) => getComputedStyle(node).transitionDuration);
  expect(parseFloat(transitionDuration)).toBeLessThanOrEqual(0.001);
  await page.getByRole('button', { name: 'HSK 1', exact: true }).click();
  expect((await snapshot(page)).reducedMotion).toBe(true);

  await page.setViewportSize(testInfo.project.name.startsWith('mobile')
    ? { width: 360, height: 740 }
    : { width: 1024, height: 640 });
  const canvasBox = await page.locator('canvas').boundingBox();
  expect(canvasBox?.width).toBe( testInfo.project.name.startsWith('mobile') ? 360 : 1024);
  expect(canvasBox?.height).toBe(testInfo.project.name.startsWith('mobile') ? 740 : 640);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await screenshot(page, testInfo.project.name, 'reduced-motion-resize');
});

test('a new browser context does not inherit the prior active run', async ({ browser, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium');
  if (!baseURL) throw new Error('Missing base URL');
  const firstContext = await browser.newContext();
  const firstPage = await firstContext.newPage();
  await firstPage.goto(`${baseURL}?e2e=1`);
  await firstPage.getByRole('button', { name: 'HSK 1', exact: true }).click();
  expect(await firstPage.evaluate(() => sessionStorage.getItem('hanzi-glider.run'))).not.toBeNull();
  await firstContext.close();

  const secondContext = await browser.newContext();
  const secondPage = await secondContext.newPage();
  await secondPage.goto(`${baseURL}?e2e=1`);
  await expect(secondPage.locator('[data-screen="menu"]')).toBeVisible();
  expect(await secondPage.evaluate(() => sessionStorage.getItem('hanzi-glider.run'))).toBeNull();
  await secondContext.close();
});

test('shows the WebGL fallback instead of a blank canvas', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium');
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function getContext(this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') return null;
      return original.call(this, type, ...args as []) as never;
    } as typeof original;
  });
  await page.goto('?e2e=1');
  await page.getByRole('button', { name: 'HSK 1', exact: true }).click();
  await expect(page.locator('[data-screen="fatal"]')).toContainText('Trình duyệt không hỗ trợ WebGL');
  await screenshot(page, testInfo.project.name, 'webgl-fallback');
});
