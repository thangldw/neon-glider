import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createDefaultProfile } from '../../src/storage/profile-storage';
import { createRunner } from '../../src/simulation/runner';
import type { RunnerView } from '../../src/render/runner-view';
import {
  createAppController,
  type AppControllerDependencies,
} from '../../src/ui/app-controller';

function frameHarness() {
  let callback: FrameRequestCallback | null = null;
  let timestamp = 0;
  return {
    requestFrame(next: FrameRequestCallback) {
      if (callback) throw new Error('Duplicate frame scheduled');
      callback = next;
      return 1;
    },
    cancelFrame() {
      callback = null;
    },
    advance(durationMs: number, stepMs = 100) {
      const target = timestamp + durationMs;
      while (timestamp < target) {
        timestamp = Math.min(target, timestamp + stepMs);
        const frame = callback;
        if (!frame) throw new Error('No scheduled frame');
        callback = null;
        frame(timestamp);
      }
    },
  };
}

function runnerView(): RunnerView {
  return {
    setSnapshot: vi.fn(),
    playFeedback: vi.fn(),
    setPaused: vi.fn(),
    render: vi.fn(),
    getDiagnostics: () => ({ drawCalls: 0, geometries: 0, textures: 0 }),
    getFramingDiagnostics: () => ({
      gliderNdcX: 0,
      gliderNdcY: 0,
      feedbackNdcX: 0,
      feedbackNdcY: 0,
      gliderBounds: { minX: -0.2, maxX: 0.2, minY: -0.7, maxY: -0.3, minZ: 0, maxZ: 0.2 },
      gliderVisible: true,
    }),
    dispose: vi.fn(),
  };
}

function dependencies(overrides: Partial<AppControllerDependencies> = {}): AppControllerDependencies {
  const view = runnerView();
  return {
    loadRunner: () => null,
    saveRunner: vi.fn(() => true),
    clearRunner: vi.fn(),
    loadProfile: () => createDefaultProfile(),
    saveProfile: vi.fn(() => true),
    createRunnerView: () => view,
    bindActions: vi.fn(() => vi.fn()),
    createSeed: () => 1,
    requestFrame: vi.fn(() => 1),
    cancelFrame: vi.fn(),
    enableTestApi: true,
    ...overrides,
  };
}

let root: HTMLElement;

beforeEach(() => {
  root = document.createElement('main');
  document.body.append(root);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  document.body.replaceChildren();
  window.history.replaceState(null, '', '/');
});

function start(app: ReturnType<typeof createAppController>) {
  vi.useFakeTimers();
  app.root.querySelector<HTMLButtonElement>('[data-action="start"]')!.click();
  expect(app.getState().screen).toBe('countdown');
  vi.advanceTimersByTime(3_000);
  expect(app.getState().screen).toBe('playing');
}

function feedbackRun(options: {
  kind?: 'crystal' | 'cube';
  reducedMotion?: boolean;
  energy?: number;
} = {}) {
  const run = createRunner(5, options.reducedMotion ?? false);
  return {
    ...run,
    energy: options.energy ?? 50,
    entities: options.kind ? [{
      id: `feedback-${options.kind}`,
      kind: options.kind,
      lane: 1 as const,
      distance: 1,
      segment: 0,
    }] : [],
  };
}

function finishRestoredCountdown(app: ReturnType<typeof createAppController>) {
  expect(app.getState().screen).toBe('countdown');
  vi.advanceTimersByTime(3_000);
  vi.runAllTicks();
  expect(app.getState().screen).toBe('playing');
}

describe('runner lifecycle', () => {
  it('idempotently tears down an active countdown, frame, actions, view, monitor, and visibility listener', () => {
    vi.useFakeTimers();
    window.history.replaceState(null, '', '/?diagnostics=1');
    const view = runnerView();
    const unbind = vi.fn();
    const cancelFrame = vi.fn();
    const removeListener = vi.spyOn(document, 'removeEventListener');
    const app = createAppController(root, dependencies({
      createRunnerView: () => view,
      bindActions: vi.fn(() => unbind),
      requestFrame: vi.fn(() => 73),
      cancelFrame,
    }));
    app.root.querySelector<HTMLButtonElement>('[data-action="start"]')!.click();

    expect(app.getState().screen).toBe('countdown');
    expect(document.querySelector('[data-perf-overlay]')).toBeTruthy();
    app.destroy();
    app.destroy();
    vi.advanceTimersByTime(5_000);
    document.dispatchEvent(new Event('visibilitychange'));

    expect(app.getState().screen).toBe('countdown');
    expect(cancelFrame).toHaveBeenCalledOnce();
    expect(cancelFrame).toHaveBeenCalledWith(73);
    expect(unbind).toHaveBeenCalledOnce();
    expect(view.dispose).toHaveBeenCalledOnce();
    expect(document.querySelector('[data-perf-overlay]')).toBeNull();
    expect(removeListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });

  it('keeps one semantic warning and uninterrupted in-memory play when every storage operation fails', () => {
    vi.useFakeTimers();
    const unavailable = <T,>(fallback: T) => (onUnavailable: () => void): T => {
      onUnavailable();
      return fallback;
    };
    const app = createAppController(root, dependencies({
      loadProfile: unavailable(createDefaultProfile()),
      loadRunner: unavailable(null),
      saveRunner: (run, onUnavailable) => {
        expect(run.schemaVersion).toBe(2);
        onUnavailable();
        return false;
      },
      saveProfile: (_profile, onUnavailable) => {
        onUnavailable();
        return false;
      },
      clearRunner: (onUnavailable) => onUnavailable(),
    }));

    expect(root.querySelectorAll('[data-storage-warning]')).toHaveLength(1);
    app.root.querySelector<HTMLButtonElement>('[data-action="start"]')!.click();
    vi.advanceTimersByTime(3_000);
    expect(app.getState()).toMatchObject({ screen: 'playing', run: { status: 'playing', schemaVersion: 2 } });
    expect(root.querySelectorAll('[data-storage-warning]')).toHaveLength(1);
    app.test?.forceEnd('collision');
    expect(app.getState().screen).toBe('result');
    expect(root.querySelectorAll('[data-storage-warning]')).toHaveLength(1);
    app.destroy();
  });

  it('starts, advances, and checkpoints one deterministic run from one frame loop', () => {
    const frames = frameHarness();
    const saveRunner = vi.fn(() => true);
    const app = createAppController(root, dependencies({
      requestFrame: frames.requestFrame,
      cancelFrame: frames.cancelFrame,
      saveRunner,
      createSeed: () => 91,
    }));

    start(app);
    frames.advance(1_000);

    expect(app.getState().run?.distance).toBeGreaterThan(0);
    expect(saveRunner).toHaveBeenCalled();
    app.destroy();
  });

  it('checkpoints each accepted half-second instead of wall-clock or countdown time', () => {
    const frames = frameHarness();
    const saveRunner = vi.fn(() => true);
    const app = createAppController(root, dependencies({
      requestFrame: frames.requestFrame,
      cancelFrame: frames.cancelFrame,
      saveRunner,
    }));
    start(app);
    saveRunner.mockClear();

    frames.advance(500);
    expect(saveRunner).not.toHaveBeenCalled();
    frames.advance(100);
    expect(saveRunner).toHaveBeenCalledOnce();
    app.destroy();
  });

  it('restores a compatible session only after a three-second countdown', () => {
    vi.useFakeTimers();
    const restored = { ...createRunner(2), distance: 500, status: 'playing' as const };
    const app = createAppController(root, dependencies({ loadRunner: () => restored }));

    expect(app.getState()).toMatchObject({ screen: 'countdown', run: { status: 'paused', distance: 500 } });
    vi.advanceTimersByTime(2_999);
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(1);
    expect(app.getState()).toMatchObject({ screen: 'playing', run: { status: 'playing', distance: 500 } });
    app.destroy();
  });

  it('binds keyboard, pointer, and touch actions only to the focusable playfield', () => {
    let boundTarget: HTMLElement | null = null;
    const bindActions: NonNullable<AppControllerDependencies['bindActions']> = (target) => {
      boundTarget = target;
      return vi.fn();
    };
    const app = createAppController(root, dependencies({ bindActions }));
    start(app);

    const playfield = root.querySelector<HTMLElement>('[data-game-viewport]')!;
    expect(boundTarget).toBe(playfield);
    expect(playfield.tabIndex).toBe(0);
    expect(playfield.contains(root.querySelector('[data-action="pause"]'))).toBe(false);
    app.destroy();
  });

  it('pauses and always resumes through a fresh countdown without advancing hidden time', () => {
    const frames = frameHarness();
    const app = createAppController(root, dependencies({
      requestFrame: frames.requestFrame,
      cancelFrame: frames.cancelFrame,
    }));
    start(app);
    frames.advance(500);
    const beforePause = app.getState().run!.distance;

    root.querySelector<HTMLButtonElement>('[data-action="pause"]')!.click();
    expect(app.getState()).toMatchObject({ screen: 'paused', run: { status: 'paused' } });
    frames.advance(5_000);
    expect(app.getState().run?.distance).toBe(beforePause);
    root.querySelector<HTMLButtonElement>('[data-action="resume"]')!.click();
    vi.advanceTimersByTime(2_999);
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(1);
    expect(app.getState().screen).toBe('playing');
    frames.advance(100);
    expect(app.getState().run?.distance).toBe(beforePause);
    frames.advance(100);
    expect(app.getState().run!.distance).toBeGreaterThan(beforePause);
    app.destroy();
  });

  it('pauses on visibility loss and starts a fresh countdown on return', () => {
    vi.useFakeTimers();
    let visibility: DocumentVisibilityState = 'visible';
    vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibility);
    const saveRunner = vi.fn(() => true);
    const app = createAppController(root, dependencies({ saveRunner }));
    app.root.querySelector<HTMLButtonElement>('[data-action="start"]')!.click();
    vi.advanceTimersByTime(3_000);

    visibility = 'hidden';
    document.dispatchEvent(new Event('visibilitychange'));
    expect(app.getState()).toMatchObject({ screen: 'paused', run: { status: 'paused' } });
    expect(saveRunner).toHaveBeenCalled();
    visibility = 'visible';
    document.dispatchEvent(new Event('visibilitychange'));
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(3_000);
    expect(app.getState()).toMatchObject({ screen: 'playing', run: { status: 'playing' } });
    app.destroy();
  });

  it('holds an initially hidden restored run until visibility returns', () => {
    vi.useFakeTimers();
    let visibility: DocumentVisibilityState = 'hidden';
    vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibility);
    const app = createAppController(root, dependencies({ loadRunner: () => createRunner(8) }));

    expect(app.getState()).toMatchObject({ screen: 'paused', run: { status: 'paused' } });
    vi.advanceTimersByTime(5_000);
    expect(app.getState().screen).toBe('paused');
    visibility = 'visible';
    document.dispatchEvent(new Event('visibilitychange'));
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(3_000);
    expect(app.getState().screen).toBe('playing');
    app.destroy();
  });

  it('pauses for WebGL context loss and resumes via a fresh countdown after recovery', () => {
    vi.useFakeTimers();
    let options: Parameters<NonNullable<AppControllerDependencies['createRunnerView']>>[1];
    const app = createAppController(root, dependencies({
      createRunnerView: (_container, nextOptions) => {
        options = nextOptions;
        return runnerView();
      },
    }));
    app.root.querySelector<HTMLButtonElement>('[data-action="start"]')!.click();
    vi.advanceTimersByTime(3_000);

    options!.onContextLost?.();
    expect(app.getState().screen).toBe('paused');
    options!.onContextRestored?.();
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(3_000);
    expect(app.getState().screen).toBe('playing');
    app.destroy();
  });

  it('keeps a manually paused run blocked until a lost context is restored', () => {
    vi.useFakeTimers();
    let options: Parameters<NonNullable<AppControllerDependencies['createRunnerView']>>[1];
    const app = createAppController(root, dependencies({
      createRunnerView: (_container, nextOptions) => {
        options = nextOptions;
        return runnerView();
      },
    }));
    app.root.querySelector<HTMLButtonElement>('[data-action="start"]')!.click();
    vi.advanceTimersByTime(3_000);
    app.root.querySelector<HTMLButtonElement>('[data-action="pause"]')!.click();

    options!.onContextLost?.();
    app.root.querySelector<HTMLButtonElement>('[data-action="resume"]')!.click();
    vi.advanceTimersByTime(5_000);
    expect(app.getState().screen).toBe('paused');

    options!.onContextRestored?.();
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(2_999);
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(1);
    expect(app.getState().screen).toBe('playing');
    app.destroy();
  });

  it('waits for context restoration when visibility loss happens first', () => {
    vi.useFakeTimers();
    let visibility: DocumentVisibilityState = 'visible';
    vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibility);
    let options: Parameters<NonNullable<AppControllerDependencies['createRunnerView']>>[1];
    const app = createAppController(root, dependencies({
      createRunnerView: (_container, nextOptions) => {
        options = nextOptions;
        return runnerView();
      },
    }));
    app.root.querySelector<HTMLButtonElement>('[data-action="start"]')!.click();
    vi.advanceTimersByTime(3_000);

    visibility = 'hidden';
    document.dispatchEvent(new Event('visibilitychange'));
    options!.onContextLost?.();
    visibility = 'visible';
    document.dispatchEvent(new Event('visibilitychange'));
    vi.advanceTimersByTime(5_000);
    expect(app.getState().screen).toBe('paused');

    options!.onContextRestored?.();
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(3_000);
    expect(app.getState().screen).toBe('playing');
    app.destroy();
  });

  it('waits for visibility when context loss happens first', () => {
    vi.useFakeTimers();
    let visibility: DocumentVisibilityState = 'visible';
    vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibility);
    let options: Parameters<NonNullable<AppControllerDependencies['createRunnerView']>>[1];
    const app = createAppController(root, dependencies({
      createRunnerView: (_container, nextOptions) => {
        options = nextOptions;
        return runnerView();
      },
    }));
    app.root.querySelector<HTMLButtonElement>('[data-action="start"]')!.click();
    vi.advanceTimersByTime(3_000);

    options!.onContextLost?.();
    visibility = 'hidden';
    document.dispatchEvent(new Event('visibilitychange'));
    options!.onContextRestored?.();
    vi.advanceTimersByTime(5_000);
    expect(app.getState().screen).toBe('paused');

    visibility = 'visible';
    document.dispatchEvent(new Event('visibilitychange'));
    expect(app.getState().screen).toBe('countdown');
    vi.advanceTimersByTime(3_000);
    expect(app.getState().screen).toBe('playing');
    app.destroy();
  });

  it('makes the background game UI inert only while the pause dialog is modal', () => {
    const app = createAppController(root, dependencies());
    start(app);
    const playfield = root.querySelector<HTMLElement>('[data-game-viewport]')!;
    const pause = root.querySelector<HTMLButtonElement>('[data-action="pause"]')!;

    pause.click();
    expect(playfield.inert).toBe(true);
    expect(playfield.getAttribute('aria-hidden')).toBe('true');
    expect(pause.inert).toBe(true);
    expect(root.querySelector<HTMLElement>('[data-screen="paused"]')!.hasAttribute('inert')).toBe(false);

    root.querySelector<HTMLButtonElement>('[data-action="resume"]')!.click();
    expect(app.getState().screen).toBe('countdown');
    expect(playfield.inert).toBe(false);
    expect(playfield.hasAttribute('aria-hidden')).toBe(false);
    expect(pause.inert).toBe(false);
    app.destroy();
  });

  it('records a completed run exactly once and clears the active checkpoint', () => {
    const saveProfile = vi.fn(() => true);
    const clearRunner = vi.fn();
    const app = createAppController(root, dependencies({ saveProfile, clearRunner }));

    app.test?.forceEnd('collision');
    app.test?.forceEnd('collision');

    expect(saveProfile).toHaveBeenCalledOnce();
    expect(clearRunner).toHaveBeenCalledOnce();
    expect(app.getState().screen).toBe('result');
    app.destroy();
  });
});

describe('gameplay feedback sequencing', () => {
  it('emits one collection event only for a crystal-count increase', () => {
    vi.useFakeTimers();
    const view = runnerView();
    const app = createAppController(root, dependencies({
      loadRunner: () => feedbackRun({ kind: 'crystal' }),
      createRunnerView: () => view,
    }));
    finishRestoredCountdown(app);

    app.test!.advance(0.1);
    app.test!.advance(0.1);

    expect(view.playFeedback).toHaveBeenCalledOnce();
    expect(view.playFeedback).toHaveBeenCalledWith({ kind: 'collect', count: 1 });
    expect(root.querySelector('[data-energy-bar]')?.classList).toContain('is-energy-pulse');
    app.destroy();
  });

  it('aggregates simultaneous crystals into one collection event and one DOM playback', () => {
    vi.useFakeTimers();
    const view = runnerView();
    const run = feedbackRun({ kind: 'crystal' });
    const app = createAppController(root, dependencies({
      loadRunner: () => ({
        ...run,
        entities: [
          run.entities[0],
          { ...run.entities[0], id: 'feedback-crystal-2' },
        ],
      }),
      createRunnerView: () => view,
    }));
    finishRestoredCountdown(app);
    const energyBar = root.querySelector<HTMLElement>('[data-energy-bar]')!;
    const feedbackReflow = vi.fn(() => 0);
    Object.defineProperty(energyBar, 'offsetWidth', { configurable: true, get: feedbackReflow });

    app.test!.advance(0.1);
    app.test!.advance(0.1);

    expect(view.playFeedback).toHaveBeenCalledOnce();
    expect(view.playFeedback).toHaveBeenCalledWith({ kind: 'collect', count: 2 });
    expect(energyBar.classList).toContain('is-energy-pulse');
    expect(feedbackReflow).toHaveBeenCalledOnce();
    app.destroy();
  });

  it.each([
    { reducedMotion: false, delayMs: 320 },
    { reducedMotion: true, delayMs: 120 },
  ])('holds a $delayMs ms collision impact before result when reducedMotion=$reducedMotion', ({ reducedMotion, delayMs }) => {
    vi.useFakeTimers();
    const view = runnerView();
    const app = createAppController(root, dependencies({
      loadRunner: () => feedbackRun({ kind: 'cube', reducedMotion }),
      createRunnerView: () => view,
    }));
    finishRestoredCountdown(app);
    const collisionFeedback = root.querySelector<HTMLElement>('[data-game-feedback]')!;
    const feedbackReflow = vi.fn(() => 0);
    Object.defineProperty(collisionFeedback, 'offsetWidth', { configurable: true, get: feedbackReflow });

    app.test!.advance(0.1);

    expect(app.getState()).toMatchObject({
      screen: 'playing',
      run: { status: 'complete', endReason: 'collision', lane: 1 },
    });
    expect(view.playFeedback).toHaveBeenCalledOnce();
    expect(view.playFeedback).toHaveBeenCalledWith({ kind: 'collision' });
    expect(collisionFeedback.classList).toContain('is-collision-flash');
    expect(feedbackReflow).toHaveBeenCalledOnce();

    app.test!.setLane(2);
    root.querySelector<HTMLButtonElement>('[data-action="pause"]')!.click();
    expect(app.getState()).toMatchObject({ screen: 'playing', run: { lane: 1, status: 'complete' } });

    vi.advanceTimersByTime(delayMs - 1);
    expect(app.getState().screen).toBe('playing');
    vi.advanceTimersByTime(1);
    expect(app.getState()).toMatchObject({ screen: 'result', run: { endReason: 'collision' } });
    expect(root.querySelector('#result-title')?.textContent).toBe('VA CHẠM');
    app.destroy();
  });

  it.each([
    { reducedMotion: false, delayMs: 320 },
    { reducedMotion: true, delayMs: 120 },
  ])('does not replay collision feedback on RAF frames during the $delayMs ms hold', ({ reducedMotion, delayMs }) => {
    vi.useFakeTimers();
    const frames = frameHarness();
    const view = runnerView();
    const app = createAppController(root, dependencies({
      loadRunner: () => feedbackRun({ kind: 'cube', reducedMotion }),
      createRunnerView: () => view,
      requestFrame: frames.requestFrame,
      cancelFrame: frames.cancelFrame,
    }));
    finishRestoredCountdown(app);
    const collisionFeedback = root.querySelector<HTMLElement>('[data-game-feedback]')!;
    const feedbackReflow = vi.fn(() => 0);
    Object.defineProperty(collisionFeedback, 'offsetWidth', { configurable: true, get: feedbackReflow });
    const timerCountBeforeImpact = vi.getTimerCount();

    frames.advance(100);
    frames.advance(100);
    expect(app.getState()).toMatchObject({ screen: 'playing', run: { status: 'complete', endReason: 'collision' } });
    expect(vi.getTimerCount()).toBe(timerCountBeforeImpact + 1);

    frames.advance(100);

    expect(view.playFeedback).toHaveBeenCalledOnce();
    expect(view.playFeedback).toHaveBeenCalledWith({ kind: 'collision' });
    expect(feedbackReflow).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(timerCountBeforeImpact + 1);
    vi.advanceTimersByTime(delayMs - 1);
    expect(app.getState().screen).toBe('playing');
    vi.advanceTimersByTime(1);
    expect(app.getState().screen).toBe('result');
    app.destroy();
  });

  it('finishes depletion immediately without collision feedback', () => {
    vi.useFakeTimers();
    const view = runnerView();
    const app = createAppController(root, dependencies({
      loadRunner: () => feedbackRun({ energy: 0.1 }),
      createRunnerView: () => view,
    }));
    finishRestoredCountdown(app);

    app.test!.advance(0.1);

    expect(app.getState()).toMatchObject({ screen: 'result', run: { status: 'complete', endReason: 'depleted' } });
    expect(view.playFeedback).not.toHaveBeenCalled();
    expect(root.querySelector('#result-title')?.textContent).toBe('CẠN NĂNG LƯỢNG');
    app.destroy();
  });

  it('cancels a pending collision completion when destroyed', () => {
    vi.useFakeTimers();
    const saveProfile = vi.fn(() => true);
    const app = createAppController(root, dependencies({
      loadRunner: () => feedbackRun({ kind: 'cube' }),
      saveProfile,
    }));
    finishRestoredCountdown(app);
    const timerCountBeforeImpact = vi.getTimerCount();
    app.test!.advance(0.1);
    expect(vi.getTimerCount()).toBe(timerCountBeforeImpact + 1);

    app.destroy();
    expect(vi.getTimerCount()).toBe(timerCountBeforeImpact);
    vi.advanceTimersByTime(1_000);

    expect(saveProfile).not.toHaveBeenCalled();
    expect(app.getState()).toMatchObject({ screen: 'playing', run: { endReason: 'collision' } });
  });

  it('forceEnd finalizes a pending collision once and clears its timer before menu teardown', () => {
    vi.useFakeTimers();
    const saveProfile = vi.fn(() => true);
    const app = createAppController(root, dependencies({
      loadRunner: () => feedbackRun({ kind: 'cube' }),
      saveProfile,
    }));
    finishRestoredCountdown(app);
    const timerCountBeforeImpact = vi.getTimerCount();
    app.test!.advance(0.1);

    app.test!.forceEnd('collision');
    vi.runAllTicks();
    expect(app.getState().screen).toBe('result');
    expect(vi.getTimerCount()).toBe(timerCountBeforeImpact);
    root.querySelector<HTMLButtonElement>('[data-action="menu"]')!.click();

    expect(app.getState().screen).toBe('menu');
    expect(saveProfile).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(timerCountBeforeImpact);
    app.destroy();
  });

  it('finishes a pending collision immediately when the page becomes hidden', () => {
    vi.useFakeTimers();
    let visibility: DocumentVisibilityState = 'visible';
    vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibility);
    const saveProfile = vi.fn(() => true);
    const app = createAppController(root, dependencies({
      loadRunner: () => feedbackRun({ kind: 'cube' }),
      saveProfile,
    }));
    finishRestoredCountdown(app);
    app.test!.advance(0.1);

    visibility = 'hidden';
    document.dispatchEvent(new Event('visibilitychange'));

    expect(app.getState()).toMatchObject({
      screen: 'result',
      run: { status: 'complete', endReason: 'collision' },
      profile: { runCount: 1 },
    });
    expect(root.querySelector('#result-title')?.textContent).toBe('VA CHẠM');
    vi.advanceTimersByTime(1_000);
    expect(saveProfile).toHaveBeenCalledOnce();
    app.destroy();
  });

  it('finishes a pending collision immediately when WebGL context is lost', () => {
    vi.useFakeTimers();
    let options: Parameters<NonNullable<AppControllerDependencies['createRunnerView']>>[1];
    const saveProfile = vi.fn(() => true);
    const app = createAppController(root, dependencies({
      loadRunner: () => feedbackRun({ kind: 'cube' }),
      saveProfile,
      createRunnerView: (_container, nextOptions) => {
        options = nextOptions;
        return runnerView();
      },
    }));
    finishRestoredCountdown(app);
    app.test!.advance(0.1);

    options!.onContextLost?.();

    expect(app.getState()).toMatchObject({
      screen: 'result',
      run: { status: 'complete', endReason: 'collision' },
      profile: { runCount: 1 },
    });
    expect(root.querySelector('#result-title')?.textContent).toBe('VA CHẠM');
    vi.advanceTimersByTime(1_000);
    expect(saveProfile).toHaveBeenCalledOnce();
    app.destroy();
  });

});

describe('test API', () => {
  it('advances and changes lanes through production reducers', () => {
    const app = createAppController(root, dependencies());
    start(app);
    const before = app.test!.snapshot().run!;

    app.test!.setLane(2);
    app.test!.advance(0.5);

    const after = app.test!.snapshot().run!;
    expect(after.lane).toBe(2);
    expect(after.distance).toBeGreaterThan(before.distance);
    expect(after.score).toBeGreaterThan(before.score);
    app.destroy();
  });

  it('is absent unless explicitly enabled or query gated', () => {
    const disabled = createAppController(root, dependencies({ enableTestApi: false }));
    expect(disabled.test).toBeUndefined();
    disabled.destroy();

    window.history.replaceState(null, '', '/?e2e=1');
    const queried = createAppController(root, dependencies({ enableTestApi: undefined }));
    expect(queried.test).toBeDefined();
    queried.destroy();
  });

  it('resets renderer sampling before a bounded performance window', () => {
    const frames = frameHarness();
    const app = createAppController(root, dependencies({
      requestFrame: frames.requestFrame,
      cancelFrame: frames.cancelFrame,
    }));
    start(app);
    frames.advance(300, 100);
    expect(app.test!.diagnostics()!.sampleCount).toBeGreaterThan(0);

    app.test!.resetDiagnostics();

    expect(app.test!.diagnostics()).toMatchObject({ sampleCount: 0, slowFrameCount: 0, longestSlowFrameStreak: 0 });
    app.destroy();
  });

  it('freezes only real-time frames while keeping deterministic reducer advance available', () => {
    const frames = frameHarness();
    const app = createAppController(root, dependencies({
      requestFrame: frames.requestFrame,
      cancelFrame: frames.cancelFrame,
    }));
    start(app);
    const started = app.test!.snapshot().run!.distance;

    app.test!.setSimulationFrozen(true);
    frames.advance(500, 100);
    expect(app.test!.snapshot().run!.distance).toBe(started);
    app.test!.advance(0.25);
    expect(app.test!.snapshot().run!.distance).toBeGreaterThan(started);
    app.test!.setSimulationFrozen(false);
    frames.advance(200, 100);
    expect(app.test!.snapshot().run!.distance).toBeGreaterThan(started + 6.5);
    app.destroy();
  });
});

describe('motion preference', () => {
  it('mirrors the persisted in-app reduced-motion preference onto the app root', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false } as MediaQueryList)));
    const profile = { ...createDefaultProfile(), reducedMotion: true };
    const app = createAppController(root, dependencies({ loadProfile: () => profile }));

    expect(root.dataset.reducedMotion).toBe('true');
    expect(root.classList.contains('is-reduced-motion')).toBe(true);
    app.destroy();
  });

  it('updates the DOM reduced-motion state from the menu toggle without an OS preference', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false } as MediaQueryList)));
    const saveProfile = vi.fn(() => true);
    const app = createAppController(root, dependencies({ saveProfile }));
    const toggle = root.querySelector<HTMLInputElement>('[data-reduced-motion]')!;

    expect(root.dataset.reducedMotion).toBe('false');
    toggle.click();

    expect(root.dataset.reducedMotion).toBe('true');
    expect(root.classList.contains('is-reduced-motion')).toBe(true);
    expect(saveProfile).toHaveBeenLastCalledWith(expect.objectContaining({ reducedMotion: true }), expect.any(Function));
    app.destroy();
  });
});
