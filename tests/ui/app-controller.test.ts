import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadContent } from '../../src/content';
import type { HanziEntry } from '../../src/content/types';
import { bindActions } from '../../src/input/actions';
import type { GameView, GameViewOptions } from '../../src/render/game-view';
import { createRun } from '../../src/simulation/run';
import type { ProgressState, RunState } from '../../src/simulation/types';
import {
  createAppController,
  createGateChoices,
  getQuestionDurationMs,
  scoreDistractorSimilarity,
  type AppControllerDependencies,
} from '../../src/ui/app-controller';

function entries(): HanziEntry[] {
  return ([1, 2, 3] as const).flatMap((level) => Array.from({ length: 20 }, (_, index) => ({
    id: `l${level}-${index}`,
    term: `${level}${String.fromCharCode(0x4e00 + index)}`,
    pinyin: `pin ${level} ${index}`,
    meaningsVi: [`nghĩa ${level} ${index}`],
    level,
    sourceOrder: (level - 1) * 20 + index + 1,
  })));
}

function progress(overrides: Partial<ProgressState> = {}): ProgressState {
  return {
    schemaVersion: 1,
    datasetVersion: 'hsk3-2026-08-16',
    mastery: {},
    highScores: { 1: 0, 2: 0, 3: 0 },
    selectedLevel: 1,
    reducedMotion: false,
    volume: 1,
    ...overrides,
  };
}

function restoredRun(overrides: Partial<RunState> = {}): RunState {
  return {
    schemaVersion: 1,
    datasetVersion: 'hsk3-2026-08-16',
    seed: 1,
    rngState: 2,
    level: 1,
    questionIds: Array.from({ length: 20 }, (_, index) => `l1-${index}`),
    questionIndex: 0,
    lane: 1,
    score: 0,
    combo: 0,
    energy: 50,
    answers: [],
    status: 'playing',
    ...overrides,
  };
}

function viewFixture() {
  const view = {
    setLane: vi.fn(),
    setGateTerms: vi.fn(),
    setQuestionDuration: vi.fn(),
    resetGatePhase: vi.fn(),
    setPaused: vi.fn(),
    render: vi.fn(),
    dispose: vi.fn(),
  } as GameView & { setQuestionDuration: ReturnType<typeof vi.fn> };
  let options: GameViewOptions | undefined;
  const createView = vi.fn((_container: HTMLElement, nextOptions?: GameViewOptions) => {
    options = nextOptions;
    return view;
  });
  return { view, createView, get options() { return options; } };
}

function frameHarness() {
  let callback: FrameRequestCallback | null = null;
  let timestamp = 0;
  return {
    requestFrame(next: FrameRequestCallback) {
      callback = next;
      return 1;
    },
    advance(durationMs: number, stepMs = 100) {
      const target = timestamp + durationMs;
      while (timestamp < target) {
        timestamp = Math.min(target, timestamp + stepMs);
        const frame = callback;
        if (!frame) throw new Error('No animation frame is scheduled');
        callback = null;
        frame(timestamp);
      }
    },
    gap(durationMs: number) {
      timestamp += durationMs;
      const frame = callback;
      if (!frame) throw new Error('No animation frame is scheduled');
      callback = null;
      frame(timestamp);
    },
  };
}

function clockedViewFixture() {
  let paused = false;
  let anchor: number | null = null;
  let gateElapsed = 0;
  let questionDuration = 0;
  const view: GameView & { gateElapsed(): number; duration(): number } = {
    setLane: vi.fn(),
    setGateTerms: vi.fn(),
    setQuestionDuration(seconds) { questionDuration = seconds; },
    resetGatePhase() { gateElapsed = 0; },
    setPaused(nextPaused) {
      if (paused !== nextPaused) anchor = null;
      paused = nextPaused;
    },
    render(seconds) {
      if (paused) return;
      const delta = anchor === null ? 0 : seconds - anchor;
      anchor = seconds;
      if (delta >= 0 && delta <= 0.25) gateElapsed += delta;
    },
    dispose: vi.fn(),
    gateElapsed: () => gateElapsed,
    duration: () => questionDuration,
  };
  return { view, createView: vi.fn(() => view) };
}

function dependencies(overrides: Partial<AppControllerDependencies> = {}): AppControllerDependencies {
  return {
    loadContent: entries,
    loadProgress: () => progress(),
    loadRun: () => null,
    saveRun: vi.fn(() => true),
    clearRun: vi.fn(),
    saveProgress: vi.fn(() => true),
    createGameView: viewFixture().createView,
    bindActions: vi.fn(() => vi.fn()),
    now: () => 1_700_000_000_000,
    createSeed: () => 123,
    requestFrame: vi.fn(() => 7),
    cancelFrame: vi.fn(),
    ...overrides,
  };
}

beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('menu and run setup', () => {
  it('labels the official dataset and starts the selected 20-question level', () => {
    const root = document.createElement('main');
    const startRun = vi.fn();
    const app = createAppController(root, dependencies({ startRun }));

    expect(root.textContent).toContain('HSK 3.0 · 2026');
    expect(root.textContent).toContain('Nghĩa tiếng Việt đang chờ duyệt');
    root.querySelector<HTMLButtonElement>('[data-level="2"]')!.click();

    expect(startRun).toHaveBeenCalledWith(2);
    expect(app.getState()).toMatchObject({ screen: 'playing', run: { level: 2, questionIds: expect.arrayContaining([]) } });
    expect(app.getState().run?.questionIds).toHaveLength(20);
    expect(root.querySelector('[data-screen="game"]')).not.toBeNull();
    expect(root.textContent).toContain('Tốc độ 1×');
    expect(root.querySelectorAll('[data-gate-term]')).toHaveLength(3);
    expect(new Set(Array.from(root.querySelectorAll('[data-gate-term]'), (node) => node.textContent)).size).toBe(3);
    expect(app.getState().choices?.filter(({ id }) => id === app.getState().run?.questionIds[0])).toHaveLength(1);
    app.destroy();
  });

  it('persists the reduced-motion preference from the menu', () => {
    const saveProgress = vi.fn(() => true);
    const app = createAppController(document.createElement('main'), dependencies({ saveProgress }));
    const toggle = app.root.querySelector<HTMLInputElement>('[data-reduced-motion]')!;

    expect(toggle.checked).toBe(false);
    toggle.click();
    expect(toggle.checked).toBe(true);
    toggle.dispatchEvent(new Event('change'));

    expect(saveProgress).toHaveBeenLastCalledWith(expect.objectContaining({ reducedMotion: true }), expect.any(Function));
    app.destroy();
  });

  it('honors the system reduced-motion preference in the Three.js view', () => {
    const view = viewFixture();
    const app = createAppController(document.createElement('main'), dependencies({
      createGameView: view.createView,
      prefersReducedMotion: () => true,
    }));

    app.root.querySelector<HTMLButtonElement>('[data-level="1"]')!.click();

    expect(view.createView).toHaveBeenCalledWith(expect.any(HTMLElement), expect.objectContaining({ reducedMotion: true }));
    app.destroy();
  });

  it('uses deterministic level-specific reading time and distractor similarity', () => {
    expect([getQuestionDurationMs(1), getQuestionDurationMs(2), getQuestionDurationMs(3)]).toEqual([5_400, 4_800, 4_200]);
    const correct = { id: 'a', term: '学习', pinyin: 'xuexi', meaningsVi: ['học'], level: 1 as const, sourceOrder: 1 };
    const sameLength = { ...correct, id: 'b', term: '天气', sourceOrder: 2 };
    const shared = { ...correct, id: 'c', term: '学生', sourceOrder: 3 };
    const longer = { ...correct, id: 'd', term: '学校里', sourceOrder: 4 };

    expect(scoreDistractorSimilarity(1, correct, sameLength)).toBe(0);
    expect(scoreDistractorSimilarity(2, correct, sameLength)).toBeGreaterThan(scoreDistractorSimilarity(2, correct, longer));
    expect(scoreDistractorSimilarity(3, correct, shared)).toBeGreaterThan(scoreDistractorSimilarity(3, correct, sameLength));
  });

  it('offers exactly three unique displayed terms with exactly one correct ID', () => {
    const fixture = entries();
    fixture[0] = { ...fixture[0], id: 'correct', term: '干' };
    fixture[1] = { ...fixture[1], id: 'duplicate', term: '干' };
    const run = restoredRun({ questionIds: ['correct', ...Array.from({ length: 19 }, (_, index) => `l1-${index + 1}`)] });
    const choices = createGateChoices(run, fixture, new Map(fixture.map((entry) => [entry.id, entry])));

    expect(choices).toHaveLength(3);
    expect(new Set(choices.map(({ term }) => term))).toHaveLength(3);
    expect(choices.filter(({ id }) => id === 'correct')).toHaveLength(1);
  });

  it('keeps the pinned real-data duplicate-term case answerable', () => {
    const content = loadContent();
    const run = createRun(content, {}, 1, 706, 0);
    run.questionIndex = 8;
    expect(run.questionIds[8]).toBe('hsk3-l1-2605');
    const choices = createGateChoices(run, content, new Map(content.map((entry) => [entry.id, entry])));

    expect(new Set(choices.map(({ term }) => term))).toHaveLength(3);
    expect(choices.filter(({ id }) => id === run.questionIds[8])).toHaveLength(1);
  });
});

describe('restore and pause lifecycle', () => {
  it('shows a three-second countdown before resuming a compatible run', () => {
    vi.useFakeTimers();
    const view = viewFixture();
    const app = createAppController(document.createElement('main'), dependencies({
      restoredRun: restoredRun(),
      createGameView: view.createView,
    }));

    expect(app.root.textContent).toContain('3');
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(1_000);
    expect(app.root.textContent).toContain('2');
    vi.advanceTimersByTime(2_000);
    expect(app.getState().screen).toBe('playing');
    expect(view.view.setPaused).toHaveBeenLastCalledWith(false);
    app.destroy();
  });

  it('holds an initially hidden restore until visibility returns and then starts a fresh countdown', () => {
    vi.useFakeTimers();
    let visibility: DocumentVisibilityState = 'hidden';
    vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibility);
    const app = createAppController(document.createElement('main'), dependencies({ restoredRun: restoredRun() }));

    expect(app.getState()).toMatchObject({ screen: 'paused', run: { status: 'paused' } });
    vi.advanceTimersByTime(5_000);
    expect(app.getState().screen).toBe('paused');

    visibility = 'visible';
    document.dispatchEvent(new Event('visibilitychange'));
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(2_999);
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(1);
    expect(app.getState().screen).toBe('playing');
    app.destroy();
  });

  it('pauses on visibility loss, checkpoints, and counts down on return', () => {
    vi.useFakeTimers();
    let visibility: DocumentVisibilityState = 'visible';
    vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibility);
    const saveRun = vi.fn(() => true);
    const app = createAppController(document.createElement('main'), dependencies({ saveRun }));
    app.root.querySelector<HTMLButtonElement>('[data-level="1"]')!.click();

    visibility = 'hidden';
    document.dispatchEvent(new Event('visibilitychange'));
    expect(app.getState()).toMatchObject({ screen: 'paused', run: { status: 'paused' } });
    expect(saveRun).toHaveBeenCalled();

    visibility = 'visible';
    document.dispatchEvent(new Event('visibilitychange'));
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(3_000);
    expect(app.getState()).toMatchObject({ screen: 'playing', run: { status: 'playing' } });
    app.destroy();
  });

  it('pauses for WebGL context loss and resumes via countdown after recovery', () => {
    vi.useFakeTimers();
    const view = viewFixture();
    const app = createAppController(document.createElement('main'), dependencies({ createGameView: view.createView }));
    app.root.querySelector<HTMLButtonElement>('[data-level="1"]')!.click();

    view.options!.onContextLost!();
    expect(app.getState().screen).toBe('paused');
    view.options!.onContextRestored!(true);
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(3_000);
    expect(app.getState().screen).toBe('playing');
    app.destroy();
  });

  it('restarts an interrupted resume countdown after WebGL recovery', () => {
    vi.useFakeTimers();
    const view = viewFixture();
    const app = createAppController(document.createElement('main'), dependencies({
      restoredRun: restoredRun(),
      createGameView: view.createView,
    }));
    expect(app.getState().screen).toBe('countdown');

    view.options!.onContextLost!();
    view.options!.onContextRestored!(false);

    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(3_000);
    expect(app.getState().screen).toBe('playing');
    app.destroy();
  });
});

describe('answers and completion', () => {
  it('uses the selected lane when the authoritative frame clock reaches the gate', () => {
    vi.useFakeTimers();
    const saveRun = vi.fn(() => true);
    const frames = frameHarness();
    let handlers: { left(): void; right(): void; pause(): void } | undefined;
    const app = createAppController(document.createElement('main'), dependencies({
      saveRun,
      requestFrame: (callback) => frames.requestFrame(callback),
      bindActions: (_target, nextHandlers) => {
        handlers = nextHandlers;
        return vi.fn();
      },
      questionDurationMs: 1_000,
    }));
    app.root.querySelector<HTMLButtonElement>('[data-level="1"]')!.click();
    handlers!.left();
    const selectedId = app.getState().choices![0].id;

    frames.gap(0);
    frames.advance(1_000);

    expect(app.getState().run).toMatchObject({ questionIndex: 1, answers: [{ selectedId }] });
    expect(saveRun).toHaveBeenLastCalledWith(expect.objectContaining({ questionIndex: 1 }), expect.any(Function));
    app.destroy();
  });

  it('freezes one authoritative gate clock through late pause and long frame gaps', () => {
    vi.useFakeTimers();
    const frames = frameHarness();
    const view = clockedViewFixture();
    const app = createAppController(document.createElement('main'), dependencies({
      createGameView: view.createView,
      requestFrame: (callback) => frames.requestFrame(callback),
      questionDurationMs: 4_800,
    }));
    app.root.querySelector<HTMLButtonElement>('[data-level="1"]')!.click();
    frames.gap(0);
    frames.advance(4_000);
    expect(view.view.gateElapsed()).toBeCloseTo(4, 5);

    app.root.querySelector<HTMLButtonElement>('[data-action="pause"]')!.click();
    vi.advanceTimersByTime(20_000);
    app.root.querySelector<HTMLButtonElement>('[data-action="resume"]')!.click();
    vi.advanceTimersByTime(3_000);
    frames.gap(5_000);
    expect(app.getState().run?.questionIndex).toBe(0);
    expect(view.view.gateElapsed()).toBeCloseTo(4, 5);

    frames.advance(700);
    expect(app.getState().run?.questionIndex).toBe(0);
    frames.advance(100);
    expect(app.getState().run?.questionIndex).toBe(1);
    expect(view.view.duration()).toBe(4.8);
    app.destroy();
  });

  it('does not route pause-button pointer input into a lane change', () => {
    const app = createAppController(document.createElement('main'), dependencies({ bindActions }));
    app.root.querySelector<HTMLButtonElement>('[data-level="1"]')!.click();
    const pause = app.root.querySelector<HTMLButtonElement>('[data-action="pause"]')!;
    const before = app.getState().run!.lane;

    pause.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 31, button: 0, clientX: 390, clientY: 20 }));
    pause.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 31, clientX: 390, clientY: 20 }));
    pause.click();

    expect(app.getState()).toMatchObject({ screen: 'paused', run: { lane: before } });
    app.destroy();
  });

  it('updates mastery and high score after question 20, then clears only when review is acknowledged', () => {
    vi.useFakeTimers();
    const run = restoredRun({
      questionIndex: 19,
      score: 3_610,
      combo: 19,
      energy: 100,
      answers: Array.from({ length: 19 }, (_, index) => ({
        questionId: `l1-${index}`,
        selectedId: `l1-${index}`,
        correct: true,
      })),
    });
    const clearRun = vi.fn();
    const saveProgress = vi.fn(() => true);
    const frames = frameHarness();
    const app = createAppController(document.createElement('main'), dependencies({
      restoredRun: run,
      clearRun,
      saveProgress,
      requestFrame: (callback) => frames.requestFrame(callback),
      questionDurationMs: 1_000,
    }));
    vi.advanceTimersByTime(3_000);
    frames.gap(0);
    frames.advance(1_000);

    expect(app.getState().screen).toBe('review');
    expect(saveProgress).toHaveBeenCalledWith(expect.objectContaining({
      highScores: expect.objectContaining({ 1: expect.any(Number) }),
      mastery: expect.objectContaining({ 'l1-19': expect.any(Object) }),
    }), expect.any(Function));
    expect(clearRun).not.toHaveBeenCalled();

    app.root.querySelector<HTMLButtonElement>('[data-action="menu"]')!.click();
    expect(clearRun).toHaveBeenCalledOnce();
    expect(app.getState().screen).toBe('menu');
    app.destroy();
  });
});

describe('restored history compatibility', () => {
  it('clears a paused run whose selected answer is not a possible loaded choice', () => {
    const clearRun = vi.fn();
    const corrupt = restoredRun({
      status: 'paused',
      questionIndex: 1,
      energy: 40,
      answers: [{ questionId: 'l1-0', selectedId: 'not-in-dataset', correct: false }],
    });

    const app = createAppController(document.createElement('main'), dependencies({ restoredRun: corrupt, clearRun }));

    expect(app.getState().screen).toBe('menu');
    expect(clearRun).toHaveBeenCalledOnce();
    app.destroy();
  });

  it('clears a completed run with a corrupt historical answer instead of exposing it in review', () => {
    const content = entries();
    const base = restoredRun();
    const map = new Map(content.map((entry) => [entry.id, entry]));
    const answers = base.questionIds.map((questionId, questionIndex) => {
      const snapshot = { ...base, questionIndex };
      const selected = createGateChoices(snapshot, content, map).find(({ id }) => id !== questionId)!;
      return { questionId, selectedId: selected.id, correct: false };
    });
    answers[4] = { ...answers[4], selectedId: 'not-in-dataset' };
    const clearRun = vi.fn();
    const corrupt = restoredRun({ status: 'complete', questionIndex: 20, energy: 0, answers });

    const app = createAppController(document.createElement('main'), dependencies({ restoredRun: corrupt, clearRun }));

    expect(app.getState().screen).toBe('menu');
    expect(app.root.textContent).not.toContain('not-in-dataset');
    expect(clearRun).toHaveBeenCalledOnce();
    app.destroy();
  });
});

it('moves focus intentionally across menu, review, and menu transitions', async () => {
  vi.useFakeTimers();
  const root = document.createElement('main');
  document.body.append(root);
  const frames = frameHarness();
  const run = restoredRun({
    questionIndex: 19,
    score: 3_610,
    combo: 19,
    energy: 100,
    answers: Array.from({ length: 19 }, (_, index) => ({ questionId: `l1-${index}`, selectedId: `l1-${index}`, correct: true })),
  });
  const app = createAppController(root, dependencies({
    restoredRun: run,
    requestFrame: (callback) => frames.requestFrame(callback),
    questionDurationMs: 100,
  }));
  vi.advanceTimersByTime(3_000);
  frames.gap(0);
  frames.advance(100);
  await Promise.resolve();
  expect(document.activeElement).toBe(root.querySelector('[data-screen="review"]'));

  root.querySelector<HTMLButtonElement>('[data-action="menu"]')!.click();
  await Promise.resolve();
  expect(document.activeElement).toBe(root.querySelector('[data-screen="menu"]'));
  app.destroy();
});

describe('failure fallbacks', () => {
  it('shows a concise fatal content error without creating WebGL', () => {
    const createGameView = vi.fn();
    const app = createAppController(document.createElement('main'), dependencies({
      loadContent: () => { throw new Error('invalid content'); },
      createGameView,
    }));

    expect(app.getState().screen).toBe('fatal');
    expect(app.root.textContent).toContain('Không thể tải nội dung');
    expect(createGameView).not.toHaveBeenCalled();
    app.destroy();
  });

  it('shows a WebGL fallback and stays playable when storage is unavailable', () => {
    const unavailable = (callback: () => void) => callback();
    const webglApp = createAppController(document.createElement('main'), dependencies({
      createGameView: () => { throw new Error('WebGL unavailable'); },
    }));
    webglApp.root.querySelector<HTMLButtonElement>('[data-level="1"]')!.click();
    expect(webglApp.getState().screen).toBe('fatal');
    expect(webglApp.root.textContent).toContain('WebGL');
    webglApp.destroy();

    const storageApp = createAppController(document.createElement('main'), dependencies({
      loadProgress: (onUnavailable) => {
        unavailable(onUnavailable);
        return progress();
      },
    }));
    expect(storageApp.root.textContent).toContain('không được lưu');
    storageApp.root.querySelector<HTMLButtonElement>('[data-level="3"]')!.click();
    expect(storageApp.getState().screen).toBe('playing');
    storageApp.destroy();
  });
});

it('releases timers, input bindings, animation frames, and the game view exactly once', () => {
  const view = viewFixture();
  const unbind = vi.fn();
  const cancelFrame = vi.fn();
  const app = createAppController(document.createElement('main'), dependencies({
    createGameView: view.createView,
    bindActions: vi.fn(() => unbind),
    requestFrame: vi.fn(() => 91),
    cancelFrame,
  }));
  app.root.querySelector<HTMLButtonElement>('[data-level="1"]')!.click();

  app.destroy();
  app.destroy();

  expect(unbind).toHaveBeenCalledOnce();
  expect(view.view.dispose).toHaveBeenCalledOnce();
  expect(cancelFrame).toHaveBeenCalledWith(91);
  expect(app.root.textContent).toBe('');
});
