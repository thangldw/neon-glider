import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { HanziEntry } from '../../src/content/types';
import type { GameView, GameViewOptions } from '../../src/render/game-view';
import type { ProgressState, RunState } from '../../src/simulation/types';
import { createAppController, type AppControllerDependencies } from '../../src/ui/app-controller';

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
  const view: GameView = {
    setLane: vi.fn(),
    setGateTerms: vi.fn(),
    resetGatePhase: vi.fn(),
    setPaused: vi.fn(),
    render: vi.fn(),
    dispose: vi.fn(),
  };
  let options: GameViewOptions | undefined;
  const createView = vi.fn((_container: HTMLElement, nextOptions?: GameViewOptions) => {
    options = nextOptions;
    return view;
  });
  return { view, createView, get options() { return options; } };
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
    questionDurationMs: 5_500,
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
  it('uses the selected lane when the gate arrives and saves the updated run', () => {
    vi.useFakeTimers();
    const saveRun = vi.fn(() => true);
    let handlers: { left(): void; right(): void; pause(): void } | undefined;
    const app = createAppController(document.createElement('main'), dependencies({
      saveRun,
      bindActions: (_target, nextHandlers) => {
        handlers = nextHandlers;
        return vi.fn();
      },
      questionDurationMs: 1_000,
    }));
    app.root.querySelector<HTMLButtonElement>('[data-level="1"]')!.click();
    handlers!.left();
    const selectedId = app.getState().choices![0].id;

    vi.advanceTimersByTime(1_000);

    expect(app.getState().run).toMatchObject({ questionIndex: 1, answers: [{ selectedId }] });
    expect(saveRun).toHaveBeenLastCalledWith(expect.objectContaining({ questionIndex: 1 }), expect.any(Function));
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
    const app = createAppController(document.createElement('main'), dependencies({
      restoredRun: run,
      clearRun,
      saveProgress,
      questionDurationMs: 1_000,
    }));
    vi.advanceTimersByTime(3_000);
    vi.advanceTimersByTime(1_000);

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
