import { mkdir, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { expect, test, type Page, type TestInfo } from '@playwright/test';
import type { PerfEvidence } from '../src/diagnostics/perf-overlay';

type Lane = 0 | 1 | 2;
type RunSnapshot = {
  lane: Lane;
  distance: number;
  speed: number;
  energy: number;
  score: number;
  multiplier: number;
  gates: number;
  crystals: number;
  status: 'playing' | 'paused' | 'complete';
  endReason: 'collision' | 'depleted' | null;
  entities: Array<{ kind: 'cube' | 'prism' | 'wall' | 'crystal'; lane: Lane; distance: number }>;
  [key: string]: unknown;
};

type E2ESnapshot = {
  screen: 'menu' | 'countdown' | 'playing' | 'paused' | 'result' | 'fatal';
  run: RunSnapshot | null;
  profile: { highScore: number; longestDistance: number; runCount: number; reducedMotion: boolean };
};

const artifactRoot = path.resolve('.superpowers/sdd/2026-08-17-neon-glider-redesign/artifacts');

function artifactDirectory(testInfo: TestInfo): string {
  return path.join(artifactRoot, testInfo.project.name);
}

async function seedNextRun(page: Page, seed = 7): Promise<void> {
  await page.addInitScript((deterministicSeed) => {
    Object.defineProperty(globalThis.crypto, 'getRandomValues', {
      configurable: true,
      value: <T extends ArrayBufferView | null>(array: T): T => {
        const values = array as Uint32Array | null;
        if (values?.length) values[0] = deterministicSeed;
        return array;
      },
    });
  }, seed);
}

async function snapshot(page: Page): Promise<E2ESnapshot> {
  return page.evaluate(() => {
    const api = (window as typeof window & { __NEON_GLIDER_E2E__?: { snapshot(): E2ESnapshot } }).__NEON_GLIDER_E2E__;
    if (!api) throw new Error('E2E hook unavailable');
    return api.snapshot() as unknown as E2ESnapshot;
  });
}

async function waitForScreen(page: Page, expected: E2ESnapshot['screen'], timeout = 5_000): Promise<void> {
  await expect.poll(async () => (await snapshot(page)).screen, { timeout }).toBe(expected);
}

async function startRun(page: Page, seed = 7, realTime = false): Promise<void> {
  await seedNextRun(page, seed);
  if (!realTime) await page.clock.install({ time: new Date('2026-08-17T00:00:00Z') });
  await page.goto('?e2e=1');
  await page.getByRole('button', { name: 'Bắt đầu' }).click();
  await expect(page.getByText('3', { exact: true })).toBeVisible();
  if (!realTime) await page.clock.fastForward(3_000);
  await waitForScreen(page, 'playing', 10_000);
  if (!realTime) await setSimulationFrozen(page, true);
}

async function setSimulationFrozen(page: Page, frozen: boolean): Promise<void> {
  await page.evaluate((next) => {
    const api = (window as typeof window & { __NEON_GLIDER_E2E__?: { setSimulationFrozen(value: boolean): void } })
      .__NEON_GLIDER_E2E__;
    if (!api) throw new Error('E2E hook unavailable');
    api.setSimulationFrozen(next);
  }, frozen);
}

async function setLane(page: Page, lane: Lane): Promise<void> {
  await page.evaluate((targetLane) => {
    (window as typeof window & { __NEON_GLIDER_E2E__?: { setLane(lane: Lane): void } })
      .__NEON_GLIDER_E2E__?.setLane(targetLane);
  }, lane);
  await expect.poll(async () => (await snapshot(page)).run?.lane).toBe(lane);
  await page.clock.fastForward(220);
}

async function advanceSafelyTo(page: Page, targetDistance: number, collectCrystals = true): Promise<E2ESnapshot> {
  return page.evaluate(({ target, collect }) => {
    const api = (window as typeof window & {
      __NEON_GLIDER_E2E__?: {
        snapshot(): E2ESnapshot;
        setLane(lane: Lane): void;
        advance(seconds: number): void;
      };
    }).__NEON_GLIDER_E2E__;
    if (!api) throw new Error('E2E hook unavailable');
    const lanes: Lane[] = [0, 1, 2];
    let guard = 0;
    while ((api.snapshot().run?.distance ?? target) < target && guard < 4_000) {
      const current = api.snapshot().run;
      if (!current || current.status !== 'playing') break;
      const stepDistance = current.speed * 0.25;
      const crossing = current.entities.filter((entity) => (
        entity.distance > current.distance && entity.distance <= current.distance + stepDistance + 0.001
      ));
      const obstacleLanes = new Set(crossing.filter(({ kind }) => kind !== 'crystal').map(({ lane }) => lane));
      const collectible = crossing.find(({ kind, lane }) => kind === 'crystal' && !obstacleLanes.has(lane));
      const clearLane = lanes.find((lane) => !crossing.some((entity) => entity.lane === lane));
      const safeLane = (collect ? collectible?.lane : clearLane)
        ?? lanes.find((lane) => !obstacleLanes.has(lane))
        ?? current.lane;
      api.setLane(safeLane);
      api.advance(Math.min(0.25, (target - current.distance) / current.speed));
      guard += 1;
    }
    if (guard >= 4_000) throw new Error('Safe-advance guard exhausted');
    return api.snapshot() as unknown as E2ESnapshot;
  }, { target: targetDistance, collect: collectCrystals });
}

async function screenshot(page: Page, directory: string, name: string): Promise<void> {
  await mkdir(directory, { recursive: true });
  await page.screenshot({ path: path.join(directory, name) });
}

test('keeps the production hook absent without the explicit query gate', async ({ page }) => {
  await page.goto('');
  expect(await page.evaluate(() => '__NEON_GLIDER_E2E__' in window)).toBe(false);
});

test('starts, steers, collects, passes a gate and reaches collision result', async ({ page }) => {
  await startRun(page, 7);
  await page.keyboard.press('ArrowRight');
  expect((await snapshot(page)).run?.lane).toBe(2);
  const active = await advanceSafelyTo(page, 270);
  expect(active.run?.distance).toBeGreaterThanOrEqual(270);
  expect(active.run?.gates).toBeGreaterThan(0);
  expect(active.run?.crystals).toBeGreaterThan(0);

  await page.evaluate(() => {
    (window as typeof window & { __NEON_GLIDER_E2E__?: { forceEnd(reason: 'collision'): void } })
      .__NEON_GLIDER_E2E__?.forceEnd('collision');
  });
  await expect(page.locator('[data-screen="result"]')).toContainText('VA CHẠM');
});

test('restores every serialized run field exactly after reload countdown', async ({ page }) => {
  await startRun(page, 11);
  await advanceSafelyTo(page, 42);
  await setLane(page, 2);
  const stored = await page.evaluate(() => JSON.parse(sessionStorage.getItem('neon-glider.run.v2') ?? 'null')) as RunSnapshot;
  expect(stored).not.toBeNull();

  await page.reload();
  await setSimulationFrozen(page, true);
  await expect(page.getByText('3', { exact: true })).toBeVisible();
  await page.clock.fastForward(3_000);
  await waitForScreen(page, 'playing', 10_000);
  expect((await snapshot(page)).run).toEqual(stored);
});

test('isolates a new browser context while preserving high score in the active profile', async ({ browser, page }) => {
  await startRun(page, 13);
  await advanceSafelyTo(page, 30);
  const score = Math.floor((await snapshot(page)).run?.score ?? 0);
  await page.evaluate(() => {
    (window as typeof window & { __NEON_GLIDER_E2E__?: { forceEnd(reason: 'collision'): void } })
      .__NEON_GLIDER_E2E__?.forceEnd('collision');
  });
  await page.reload();
  const persisted = await snapshot(page);
  expect(persisted.profile.highScore).toBeGreaterThanOrEqual(score);
  await expect(page.locator('[data-screen="menu"]')).toContainText('KỶ LỤC');

  const isolatedContext = await browser.newContext();
  const isolatedPage = await isolatedContext.newPage();
  try {
    await isolatedPage.goto('http://127.0.0.1:4173/neon-glider/?e2e=1');
    const isolated = await isolatedPage.evaluate(() => (
      (window as typeof window & { __NEON_GLIDER_E2E__?: { snapshot(): E2ESnapshot } })
        .__NEON_GLIDER_E2E__?.snapshot()
    ));
    expect(isolated?.profile.highScore).toBe(0);
    expect(isolated?.run).toBeNull();
  } finally {
    await isolatedContext.close();
  }
});

test('changes lanes through pointer on desktop and touch on Pixel 7', async ({ page }, testInfo) => {
  await startRun(page, 17);
  const viewport = page.locator('[data-game-viewport]');
  const bounds = await viewport.boundingBox();
  if (!bounds) throw new Error('Missing playfield bounds');
  if (testInfo.project.name === 'mobile-chromium') {
    await page.touchscreen.tap(bounds.x + bounds.width * 0.86, bounds.y + bounds.height / 2);
  } else {
    await page.mouse.click(bounds.x + bounds.width * 0.86, bounds.y + bounds.height / 2);
  }
  await expect.poll(async () => (await snapshot(page)).run?.lane).toBe(2);
});

test('pauses, resumes through countdown, and restores after a context interruption', async ({ page }) => {
  await startRun(page, 19);
  await page.getByRole('button', { name: 'Tạm dừng' }).click();
  await waitForScreen(page, 'paused');
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await expect(page.getByText('3', { exact: true })).toBeVisible();
  await page.clock.fastForward(3_000);
  await waitForScreen(page, 'playing', 10_000);

  await page.locator('canvas').evaluate((canvas) => {
    canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
  });
  await waitForScreen(page, 'paused');
  await page.locator('canvas').evaluate((canvas) => canvas.dispatchEvent(new Event('webglcontextrestored')));
  await expect(page.getByText('3', { exact: true })).toBeVisible();
  await page.clock.fastForward(3_000);
  await waitForScreen(page, 'playing', 10_000);
});

test('holds an initially hidden run until visibility resumes', async ({ page }) => {
  await seedNextRun(page, 23);
  await page.clock.install({ time: new Date('2026-08-17T00:00:00Z') });
  await page.addInitScript(() => {
    let visibility: DocumentVisibilityState = 'hidden';
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => visibility });
    (window as typeof window & { __setNeonVisibility?: (state: DocumentVisibilityState) => void }).__setNeonVisibility = (state) => {
      visibility = state;
      document.dispatchEvent(new Event('visibilitychange'));
    };
  });
  await page.goto('?e2e=1');
  await page.getByRole('button', { name: 'Bắt đầu' }).click();
  await waitForScreen(page, 'paused');
  await page.waitForTimeout(3_200);
  await waitForScreen(page, 'paused');
  await page.evaluate(() => (
    window as typeof window & { __setNeonVisibility?: (state: DocumentVisibilityState) => void }
  ).__setNeonVisibility?.('visible'));
  await expect(page.getByText('3', { exact: true })).toBeVisible();
  await page.clock.fastForward(3_000);
  await waitForScreen(page, 'playing', 10_000);
});

test('ends from real energy depletion', async ({ page }) => {
  await startRun(page, 29);
  const activeRun = (await snapshot(page)).run;
  if (!activeRun) throw new Error('Missing active run');
  const depletionSeed: RunSnapshot = { ...activeRun, energy: 0.1, status: 'playing', endReason: null };
  await page.addInitScript((seed) => {
    sessionStorage.setItem('neon-glider.run.v2', JSON.stringify(seed));
  }, depletionSeed);
  await page.reload();
  await setSimulationFrozen(page, true);
  await page.clock.fastForward(3_000);
  await waitForScreen(page, 'playing', 10_000);
  expect((await snapshot(page)).run).toEqual(depletionSeed);
  await page.evaluate(() => {
    (window as typeof window & { __NEON_GLIDER_E2E__?: { advance(seconds: number): void } })
      .__NEON_GLIDER_E2E__?.advance(0.25);
  });
  await expect(page.locator('[data-screen="result"]')).toContainText('CẠN NĂNG LƯỢNG');
});

test('reaches deterministic speed and multiplier caps without collisions', async ({ page }) => {
  await startRun(page, 31);
  const capped = await advanceSafelyTo(page, 7_300);
  expect(capped.run).toMatchObject({ speed: 52, multiplier: 8 });
  expect(capped.run?.gates).toBeGreaterThanOrEqual(29);
});

test('keeps the full ship visible in all lanes without horizontal overflow', async ({ page }) => {
  await startRun(page, 37);
  const renderScale = await page.locator('canvas').evaluate((element) => {
    const canvas = element as HTMLCanvasElement;
    return {
      x: canvas.width / canvas.clientWidth,
      y: canvas.height / canvas.clientHeight,
    };
  });
  expect(renderScale.x).toBeGreaterThanOrEqual(1);
  expect(renderScale.y).toBeGreaterThanOrEqual(1);
  for (const lane of [0, 1, 2] as const) {
    await setLane(page, lane);
    const diagnostics = await page.evaluate(() => (
      window as typeof window & {
        __NEON_GLIDER_E2E__?: { diagnostics(): { framing: { gliderVisible: boolean; gliderBounds: Record<string, number> } } | null };
      }
    ).__NEON_GLIDER_E2E__?.diagnostics());
    expect(diagnostics?.framing.gliderVisible).toBe(true);
    expect(diagnostics?.framing.gliderBounds.minX).toBeGreaterThanOrEqual(-1);
    expect(diagnostics?.framing.gliderBounds.maxX).toBeLessThanOrEqual(1);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
});

test('honors reduced motion in controller, DOM, and CSS', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('?e2e=1');
  await expect(page.locator('#app')).toHaveAttribute('data-reduced-motion', 'true');
  await page.getByRole('button', { name: 'Bắt đầu' }).click();
  await waitForScreen(page, 'playing', 10_000);
  expect((await snapshot(page)).run?.reducedMotion).toBe(true);
  expect(await page.locator('.energy-fill').evaluate((node) => getComputedStyle(node).transitionDuration)).toBe('0s');
});

test('loads production assets from the static /neon-glider/ base path', async ({ page }) => {
  await page.goto('');
  expect(new URL(page.url()).pathname).toBe('/neon-glider/');
  const resources = await page.evaluate(() => performance.getEntriesByType('resource').map(({ name }) => name));
  expect(resources.length).toBeGreaterThan(0);
  for (const resource of resources) expect(new URL(resource).pathname).toMatch(/^\/neon-glider\//);
});

test('captures the required player-visible states', async ({ page }, testInfo) => {
  test.setTimeout(180_000);
  const directory = artifactDirectory(testInfo);
  await seedNextRun(page, 41);
  await page.clock.install({ time: new Date('2026-08-17T00:00:00Z') });
  await page.goto('?e2e=1');
  await screenshot(page, directory, 'menu.png');
  await page.getByRole('button', { name: 'Bắt đầu' }).click();
  await page.clock.fastForward(3_000);
  await waitForScreen(page, 'playing', 10_000);
  await setSimulationFrozen(page, true);
  await advanceSafelyTo(page, 242);
  await setLane(page, 1);
  await screenshot(page, directory, 'gameplay-center.png');
  await setLane(page, 0);
  await screenshot(page, directory, 'gameplay-left.png');
  await setLane(page, 2);
  await screenshot(page, directory, 'gameplay-right.png');
  await advanceSafelyTo(page, 247);
  await screenshot(page, directory, 'gate.png');
  await page.getByRole('button', { name: 'Tạm dừng' }).click();
  await screenshot(page, directory, 'paused.png');
  await page.evaluate(() => (
    window as typeof window & { __NEON_GLIDER_E2E__?: { forceEnd(reason: 'collision'): void } }
  ).__NEON_GLIDER_E2E__?.forceEnd('collision'));
  await screenshot(page, directory, 'collision-result.png');

  await page.goto('?e2e=1');
  await page.getByRole('button', { name: 'Bắt đầu' }).click();
  await page.clock.fastForward(3_000);
  await waitForScreen(page, 'playing', 10_000);
  await setSimulationFrozen(page, true);
  await page.evaluate(() => (
    window as typeof window & { __NEON_GLIDER_E2E__?: { forceEnd(reason: 'depleted'): void } }
  ).__NEON_GLIDER_E2E__?.forceEnd('depleted'));
  await screenshot(page, directory, 'depleted-result.png');

  await page.goto('?e2e=1');
  await page.getByRole('checkbox', { name: 'Giảm chuyển động' }).check();
  await page.getByRole('button', { name: 'Bắt đầu' }).click();
  await page.clock.fastForward(3_000);
  await waitForScreen(page, 'playing', 10_000);
  await setSimulationFrozen(page, true);
  await screenshot(page, directory, 'reduced-motion.png');

  const fallback = await page.context().newPage();
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function patched(this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') return null;
      return original.call(this, type as '2d', ...args as []) as RenderingContext | null;
    } as typeof HTMLCanvasElement.prototype.getContext;
  });
  await fallback.goto('http://127.0.0.1:4173/neon-glider/?e2e=1');
  await fallback.getByRole('button', { name: 'Bắt đầu' }).click();
  await expect(fallback.locator('[data-screen="fatal"]')).toBeVisible();
  await screenshot(fallback, directory, 'webgl-fallback.png');
  await fallback.close();
});

test('records bounded real-render performance evidence', async ({ browser, page }, testInfo) => {
  await startRun(page, 43, true);
  await setSimulationFrozen(page, false);
  await page.waitForTimeout(750);
  const inputLatencyMs = await page.evaluate(() => new Promise<number>((resolve) => {
    const api = (window as typeof window & {
      __NEON_GLIDER_E2E__?: {
        snapshot(): E2ESnapshot;
        setLane(lane: Lane): void;
        resetDiagnostics(): void;
      };
    }).__NEON_GLIDER_E2E__;
    if (!api) throw new Error('E2E hook unavailable');
    api.resetDiagnostics();
    const started = performance.now();
    api.setLane(api.snapshot().run?.lane === 2 ? 1 : 2);
    requestAnimationFrame(() => resolve(performance.now() - started));
  }));
  await page.waitForTimeout(2_000);
  const measured = await page.evaluate(() => (
    window as typeof window & {
      __NEON_GLIDER_E2E__?: {
        diagnostics(): {
          sampleCount: number;
          medianFrameTimeMs: number;
          worstFrameTimeMs: number;
          slowFrameCount: number;
          longestSlowFrameStreak: number;
          maxDrawCalls: number;
          maxGeometries: number;
          maxTextures: number;
        } | null;
      };
    }
  ).__NEON_GLIDER_E2E__?.diagnostics());
  if (!measured) throw new Error('Missing renderer performance diagnostics');
  const viewport = page.viewportSize();
  const perfEvidence: PerfEvidence = {
    project: testInfo.project.name as PerfEvidence['project'],
    ...measured,
  };
  const evidence = {
    ...perfEvidence,
    inputLatencyMs,
    browserVersion: browser.version(),
    host: `${os.cpus()[0]?.model ?? 'unknown CPU'}; ${Math.round(os.totalmem() / 1024 ** 3)} GiB; ${os.platform()} ${os.arch()}`,
    viewport,
    emulated: testInfo.project.name === 'mobile-chromium',
  };
  const directory = artifactDirectory(testInfo);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'performance.json'), `${JSON.stringify(evidence, null, 2)}\n`);

  expect(measured.sampleCount).toBeGreaterThan(30);
  expect(measured.maxDrawCalls).toBeGreaterThan(10);
  expect(measured.longestSlowFrameStreak).toBeLessThanOrEqual(3);
  expect(measured.maxDrawCalls).toBeLessThanOrEqual(testInfo.project.name === 'mobile-chromium' ? 45 : 60);
  expect(inputLatencyMs).toBeLessThan(500);
});
