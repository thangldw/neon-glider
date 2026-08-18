import {
  createPerfMonitor,
  type PerformanceSnapshot,
} from '../diagnostics/perf-overlay';
import { bindActions as bindRunnerActions } from '../input/actions';
import {
  createRunnerView as createThreeRunnerView,
  type FramingDiagnostics,
  type RunnerView,
  type RunnerViewOptions,
} from '../render/runner-view';
import { feedbackDurationMs } from '../render/neon/feedback-effects';
import {
  clearRunner as clearStoredRunner,
  loadRunner as loadStoredRunner,
  saveRunner as saveStoredRunner,
} from '../storage/runner-storage';
import {
  createDefaultProfile,
  loadProfile as loadStoredProfile,
  recordCompletedRun,
  saveProfile as saveStoredProfile,
  type RunnerProfile,
} from '../storage/profile-storage';
import { advanceRunner, createRunner, moveRunnerLane } from '../simulation/runner';
import type { EndReason, Lane, RunnerState } from '../simulation/runner-types';
import {
  createCountdownOverlay,
  createGameScreen,
  createMenuScreen,
  createPauseOverlay,
  createResultScreen,
  createStorageWarning,
  createWebGLFatalScreen,
  type GameScreen,
} from './screens';

export type AppScreen = 'menu' | 'countdown' | 'playing' | 'paused' | 'result' | 'fatal';

export interface PerfSnapshot extends PerformanceSnapshot {
  framing: FramingDiagnostics;
}

export interface NeonGliderE2E {
  snapshot(): { screen: AppScreen; run: RunnerState | null; profile: RunnerProfile };
  setLane(lane: Lane): void;
  advance(seconds: number): void;
  forceEnd(reason: Exclude<EndReason, null>): void;
  diagnostics(): PerfSnapshot | null;
  resetDiagnostics(): void;
  setSimulationFrozen(frozen: boolean): void;
}

export interface AppControllerDependencies {
  loadRunner?: (onUnavailable: () => void) => RunnerState | null;
  saveRunner?: (run: RunnerState, onUnavailable: () => void) => boolean;
  clearRunner?: (onUnavailable: () => void) => void;
  loadProfile?: (onUnavailable: () => void) => RunnerProfile;
  saveProfile?: (profile: RunnerProfile, onUnavailable: () => void) => boolean;
  createRunnerView?: (container: HTMLElement, options?: RunnerViewOptions) => RunnerView;
  bindActions?: typeof bindRunnerActions;
  createSeed?: () => number;
  requestFrame?: (callback: FrameRequestCallback) => number;
  cancelFrame?: (handle: number) => void;
  enableTestApi?: boolean;
}

export interface AppController {
  root: HTMLElement;
  getState(): { screen: AppScreen; run: RunnerState | null; profile: RunnerProfile };
  test?: NeonGliderE2E;
  destroy(): void;
}

class FrameClock {
  private anchor: number | null = null;

  accept(timestampMs: number): number {
    if (!Number.isFinite(timestampMs)) return 0;
    if (this.anchor === null) {
      this.anchor = timestampMs;
      return 0;
    }
    const delta = (timestampMs - this.anchor) / 1_000;
    this.anchor = timestampMs;
    return delta >= 0 && delta <= 0.25 ? delta : 0;
  }

  reset(): void {
    this.anchor = null;
  }
}

type UnavailableHandler = () => void;

function browserLoadRunner(onUnavailable: UnavailableHandler): RunnerState | null {
  try {
    return loadStoredRunner(window.sessionStorage, onUnavailable);
  } catch {
    onUnavailable();
    return null;
  }
}

function browserSaveRunner(run: RunnerState, onUnavailable: UnavailableHandler): boolean {
  try {
    return saveStoredRunner(window.sessionStorage, run, onUnavailable);
  } catch {
    onUnavailable();
    return false;
  }
}

function browserClearRunner(onUnavailable: UnavailableHandler): void {
  try {
    clearStoredRunner(window.sessionStorage, onUnavailable);
  } catch {
    onUnavailable();
  }
}

function browserLoadProfile(onUnavailable: UnavailableHandler): RunnerProfile {
  try {
    return loadStoredProfile(window.localStorage, onUnavailable);
  } catch {
    onUnavailable();
    return createDefaultProfile();
  }
}

function browserSaveProfile(profile: RunnerProfile, onUnavailable: UnavailableHandler): boolean {
  try {
    return saveStoredProfile(window.localStorage, profile, onUnavailable);
  } catch {
    onUnavailable();
    return false;
  }
}

function cloneRun(run: RunnerState | null): RunnerState | null {
  return run ? {
    ...run,
    reachableLanes: [...run.reachableLanes],
    entities: run.entities.map((entity) => ({ ...entity })),
  } : null;
}

function reducedMotionPreference(profile: RunnerProfile): boolean {
  return profile.reducedMotion
    || (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
}

export function createAppController(
  root: HTMLElement,
  dependencies: AppControllerDependencies = {},
): AppController {
  const loadRunner = dependencies.loadRunner ?? browserLoadRunner;
  const saveRunner = dependencies.saveRunner ?? browserSaveRunner;
  const clearRunner = dependencies.clearRunner ?? browserClearRunner;
  const loadProfile = dependencies.loadProfile ?? browserLoadProfile;
  const saveProfile = dependencies.saveProfile ?? browserSaveProfile;
  const createRunnerView = dependencies.createRunnerView ?? createThreeRunnerView;
  const bindActions = dependencies.bindActions ?? bindRunnerActions;
  const createSeed = dependencies.createSeed
    ?? (() => window.crypto.getRandomValues(new Uint32Array(1))[0]);
  const requestFrame = dependencies.requestFrame
    ?? ((callback: FrameRequestCallback) => window.requestAnimationFrame(callback));
  const cancelFrame = dependencies.cancelFrame
    ?? ((handle: number) => window.cancelAnimationFrame(handle));
  const query = new URLSearchParams(window.location.search);
  const enableTestApi = dependencies.enableTestApi ?? query.get('e2e') === '1';
  const enableDiagnostics = enableTestApi || query.get('diagnostics') === '1';
  const perfMonitor = enableDiagnostics
    ? createPerfMonitor({ visible: query.get('diagnostics') === '1', host: document.body })
    : null;

  let screen: AppScreen = 'menu';
  let run: RunnerState | null = null;
  let profile = createDefaultProfile();
  let gameScreen: GameScreen | null = null;
  let view: RunnerView | null = null;
  let unbindActions: (() => void) | null = null;
  let frameHandle: number | null = null;
  let countdownTimer: ReturnType<typeof setInterval> | null = null;
  let completionTimer: ReturnType<typeof setTimeout> | null = null;
  let checkpointAccumulator = 0;
  let storageUnavailable = false;
  let completionRecorded = false;
  let visibilitySuspended = false;
  let contextSuspended = false;
  let resumeRequested = false;
  let destroyed = false;
  let testSimulationFrozen = false;
  const frameClock = new FrameClock();

  const showStorageWarning = () => {
    storageUnavailable = true;
    if (!destroyed && !root.querySelector('[data-storage-warning]')) root.append(createStorageWarning());
  };

  const appendStorageWarning = () => {
    if (storageUnavailable && !root.querySelector('[data-storage-warning]')) root.append(createStorageWarning());
  };

  const clearCountdown = () => {
    if (countdownTimer !== null) clearInterval(countdownTimer);
    countdownTimer = null;
  };

  const clearCompletion = () => {
    if (completionTimer !== null) clearTimeout(completionTimer);
    completionTimer = null;
  };

  const saveCheckpoint = () => {
    if (run && run.status !== 'complete' && !saveRunner(run, showStorageWarning)) showStorageWarning();
  };

  const stopGameplay = () => {
    clearCountdown();
    clearCompletion();
    frameClock.reset();
    checkpointAccumulator = 0;
    if (frameHandle !== null) cancelFrame(frameHandle);
    frameHandle = null;
    unbindActions?.();
    unbindActions = null;
    view?.dispose();
    view = null;
    gameScreen = null;
    visibilitySuspended = false;
    contextSuspended = false;
    resumeRequested = false;
  };

  const setDomReducedMotion = (enabled: boolean) => {
    root.dataset.reducedMotion = String(enabled);
    root.classList.toggle('is-reduced-motion', enabled);
  };

  const syncMenuReducedMotion = () => {
    const enabled = reducedMotionPreference(profile);
    setDomReducedMotion(enabled);
    return enabled;
  };

  const showFatal = () => {
    stopGameplay();
    screen = 'fatal';
    const fatal = createWebGLFatalScreen();
    root.replaceChildren(fatal);
    appendStorageWarning();
    queueMicrotask(() => fatal.focus({ preventScroll: true }));
  };

  const renderMenu = () => {
    stopGameplay();
    run = null;
    screen = 'menu';
    completionRecorded = false;
    syncMenuReducedMotion();
    const menu = createMenuScreen({
      profile,
      onStart: () => startNewRun(),
      onReducedMotion: (enabled) => {
        profile = { ...profile, reducedMotion: enabled };
        syncMenuReducedMotion();
        if (!saveProfile(profile, showStorageWarning)) showStorageWarning();
      },
    });
    root.replaceChildren(menu);
    appendStorageWarning();
    queueMicrotask(() => menu.focus({ preventScroll: true }));
  };

  const finishRun = () => {
    if (completionRecorded || !run || run.status !== 'complete') return;
    completionRecorded = true;
    profile = recordCompletedRun(profile, run);
    if (!saveProfile(profile, showStorageWarning)) showStorageWarning();
    clearRunner(showStorageWarning);
    const completedRun = run;
    stopGameplay();
    screen = 'result';
    const result = createResultScreen({
      run: completedRun,
      highScore: profile.highScore,
      onRestart: () => startNewRun(),
      onMenu: () => renderMenu(),
    });
    root.replaceChildren(result);
    appendStorageWarning();
    queueMicrotask(() => result.focus({ preventScroll: true }));
  };

  const applyAdvance = (delta: number) => {
    if (!run || run.status !== 'playing' || screen !== 'playing' || delta <= 0) return;
    const previous = run;
    const next = advanceRunner(previous, delta);
    run = next;
    view?.setSnapshot(run);
    gameScreen?.update(run);
    const collected = next.crystals - previous.crystals;
    if (collected > 0) {
      view?.playFeedback({ kind: 'collect', count: collected });
      gameScreen?.playFeedback('collect');
    }
    checkpointAccumulator += delta;
    if (checkpointAccumulator >= 0.5) {
      checkpointAccumulator %= 0.5;
      saveCheckpoint();
    }
    if (next.status !== 'complete') return;
    if (next.endReason !== 'collision') {
      finishRun();
      return;
    }
    view?.playFeedback({ kind: 'collision' });
    gameScreen?.playFeedback('collision');
    if (completionTimer === null) {
      completionTimer = setTimeout(() => {
        completionTimer = null;
        finishRun();
      }, feedbackDurationMs({ kind: 'collision' }, next.reducedMotion));
    }
  };

  const renderFrame: FrameRequestCallback = (timestamp) => {
    if (destroyed || !view) return;
    const delta = frameClock.accept(timestamp);
    if (!testSimulationFrozen) applyAdvance(delta);
    view?.render(timestamp / 1_000);
    if (view && perfMonitor) perfMonitor.record(timestamp, view.getDiagnostics());
    if (!destroyed && view) frameHandle = requestFrame(renderFrame);
  };

  const moveToLane = (lane: Lane) => {
    if (!run || run.status !== 'playing' || screen !== 'playing') return;
    let next = run;
    while (next.lane !== lane) next = moveRunnerLane(next, lane < next.lane ? -1 : 1);
    if (next === run) return;
    run = next;
    view?.setSnapshot(run);
    gameScreen?.update(run);
    gameScreen?.announceLane(run.lane);
    saveCheckpoint();
  };

  const move = (direction: -1 | 1) => {
    if (!run || run.status !== 'playing' || screen !== 'playing') return;
    const next = moveRunnerLane(run, direction);
    if (next === run) return;
    run = next;
    view?.setSnapshot(run);
    gameScreen?.update(run);
    gameScreen?.announceLane(run.lane);
    saveCheckpoint();
  };

  const abandonRun = () => {
    clearRunner(showStorageWarning);
    renderMenu();
  };

  const pauseRun = (message = 'Run paused.', wantsResume = false) => {
    if (!run || run.status === 'complete' || !gameScreen || (screen !== 'playing' && screen !== 'countdown' && screen !== 'paused')) return;
    clearCountdown();
    resumeRequested = wantsResume;
    run = { ...run, status: 'paused', endReason: null };
    screen = 'paused';
    frameClock.reset();
    view?.setSnapshot(run);
    view?.setPaused(true);
    saveCheckpoint();
    gameScreen.update(run);
    gameScreen.setModal(true);
    gameScreen.overlay.replaceChildren(createPauseOverlay(message, () => {
      resumeRequested = true;
      resumeWhenReady();
    }, abandonRun));
  };

  function startCountdown() {
    if (!run || !gameScreen || !view || destroyed) return;
    if (document.visibilityState === 'hidden' || contextSuspended) return;
    clearCountdown();
    resumeRequested = false;
    visibilitySuspended = false;
    run = { ...run, status: 'paused', endReason: null };
    screen = 'countdown';
    frameClock.reset();
    view.setSnapshot(run);
    view.setPaused(true);
    gameScreen.update(run);
    gameScreen.setModal(false);
    let value = 3;
    gameScreen.overlay.replaceChildren(createCountdownOverlay(value));
    saveCheckpoint();
    countdownTimer = setInterval(() => {
      if (!run || !gameScreen || !view || destroyed) {
        clearCountdown();
        return;
      }
      value -= 1;
      if (value > 0) {
        gameScreen.overlay.replaceChildren(createCountdownOverlay(value));
        return;
      }
      clearCountdown();
      run = { ...run, status: 'playing', endReason: null };
      screen = 'playing';
      frameClock.reset();
      view.setSnapshot(run);
      view.setPaused(false);
      gameScreen.update(run);
      gameScreen.overlay.replaceChildren();
      saveCheckpoint();
      gameScreen.viewport.focus({ preventScroll: true });
    }, 1_000);
  }

  function resumeWhenReady() {
    if (!resumeRequested || !run || !gameScreen || !view || destroyed) return;
    if (document.visibilityState === 'hidden') {
      visibilitySuspended = true;
      return;
    }
    if (contextSuspended) return;
    startCountdown();
  }

  const prepareGameplay = () => {
    if (!run) return false;
    stopGameplay();
    const nextScreen = createGameScreen(() => pauseRun());
    gameScreen = nextScreen;
    setDomReducedMotion(run.reducedMotion);
    root.replaceChildren(nextScreen.element);
    appendStorageWarning();
    try {
      view = createRunnerView(nextScreen.viewport, {
        reducedMotion: run.reducedMotion,
        onContextLost: () => {
          if (!view || !run || !gameScreen) return;
          if (run.status === 'complete' && run.endReason === 'collision') {
            finishRun();
            return;
          }
          contextSuspended = true;
          pauseRun('Graphics connection interrupted.', screen === 'playing' || screen === 'countdown' || resumeRequested);
        },
        onContextRestored: () => {
          if (!contextSuspended || !run || !gameScreen || !view) return;
          contextSuspended = false;
          resumeWhenReady();
        },
      });
    } catch {
      showFatal();
      return false;
    }
    view.setSnapshot(run);
    view.setPaused(true);
    nextScreen.update(run);
    unbindActions = bindActions(nextScreen.viewport, {
      left: () => move(-1),
      right: () => move(1),
      pause: () => pauseRun(),
    });
    screen = 'paused';
    frameHandle = requestFrame(renderFrame);
    return true;
  };

  function startNewRun() {
    completionRecorded = false;
    run = { ...createRunner(createSeed(), reducedMotionPreference(profile)), status: 'paused' };
    if (!prepareGameplay()) return;
    resumeRequested = true;
    if (document.visibilityState === 'hidden') {
      visibilitySuspended = true;
      pauseRun('Run paused while the page was hidden.', true);
    } else {
      resumeWhenReady();
    }
  }

  const restoreRun = (restored: RunnerState) => {
    completionRecorded = false;
    run = { ...restored, status: 'paused', endReason: null };
    if (!prepareGameplay()) return;
    saveCheckpoint();
    resumeRequested = true;
    if (document.visibilityState === 'hidden') {
      visibilitySuspended = true;
      pauseRun('Run paused while the page was hidden.', true);
    } else {
      resumeWhenReady();
    }
  };

  const onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      if (run?.status === 'complete' && run.endReason === 'collision' && screen === 'playing') {
        finishRun();
        return;
      }
      if (run && (screen === 'playing' || screen === 'countdown')) {
        visibilitySuspended = true;
        pauseRun('Run paused while the page was hidden.', true);
      }
      return;
    }
    if (visibilitySuspended || resumeRequested) resumeWhenReady();
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  profile = loadProfile(showStorageWarning);
  syncMenuReducedMotion();
  const restored = loadRunner(showStorageWarning);
  if (restored?.status === 'complete') {
    clearRunner(showStorageWarning);
    renderMenu();
  } else if (restored) {
    restoreRun(restored);
  } else {
    renderMenu();
  }

  const snapshot = () => ({ screen, run: cloneRun(run), profile: { ...profile } });
  const test: NeonGliderE2E | undefined = enableTestApi ? {
    snapshot,
    setLane(lane) {
      if (lane !== 0 && lane !== 1 && lane !== 2) throw new RangeError('lane must be 0, 1, or 2');
      moveToLane(lane);
    },
    advance(seconds) {
      if (!Number.isFinite(seconds) || seconds < 0) throw new RangeError('seconds must be finite and non-negative');
      let remaining = seconds;
      while (remaining > 0 && run?.status === 'playing' && screen === 'playing') {
        const delta = Math.min(0.25, remaining);
        applyAdvance(delta);
        remaining -= delta;
      }
    },
    forceEnd(reason) {
      if (reason !== 'collision' && reason !== 'depleted') throw new RangeError('unsupported end reason');
      if (!run) run = createRunner(createSeed(), reducedMotionPreference(profile));
      if (completionRecorded) return;
      run = { ...run, status: 'complete', endReason: reason };
      finishRun();
    },
    diagnostics() {
      if (!perfMonitor || !view) return null;
      return { ...perfMonitor.snapshot(), framing: view.getFramingDiagnostics() };
    },
    resetDiagnostics() {
      perfMonitor?.reset();
    },
    setSimulationFrozen(frozen) {
      if (typeof frozen !== 'boolean') throw new TypeError('frozen must be a boolean');
      testSimulationFrozen = frozen;
      frameClock.reset();
    },
  } : undefined;

  return {
    root,
    getState: snapshot,
    test,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      document.removeEventListener('visibilitychange', onVisibilityChange);
      stopGameplay();
      perfMonitor?.dispose();
    },
  };
}
