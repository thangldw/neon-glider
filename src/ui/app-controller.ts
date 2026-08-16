import { loadContent as loadBuiltContent } from '../content';
import type { HanziEntry, HskLevel } from '../content/types';
import { bindActions as bindGameActions, type ActionHandlers } from '../input/actions';
import { createGameView as createThreeGameView, type GameView, type GameViewOptions } from '../render/game-view';
import { answerCurrent, createRun as createSimulationRun, moveLane } from '../simulation/run';
import type { ProgressState, RunState } from '../simulation/types';
import {
  createDefaultProgress,
  loadProgress as loadStoredProgress,
  saveProgress as saveStoredProgress,
  updateMastery,
} from '../storage/progress-storage';
import {
  clearRun as clearStoredRun,
  isRunState,
  loadRun as loadStoredRun,
  saveRun as saveStoredRun,
} from '../storage/run-storage';
import {
  createCountdownOverlay,
  createFatalScreen,
  createGameScreen,
  createMenuScreen,
  createPauseOverlay,
  createReviewScreen,
  createStorageWarning,
  type GameScreen,
  type GateChoice,
} from './screens';

export type AppScreen = 'menu' | 'countdown' | 'playing' | 'paused' | 'review' | 'fatal';

type StorageUnavailableHandler = () => void;

export interface AppControllerDependencies {
  loadContent?: () => HanziEntry[];
  loadProgress?: (onUnavailable: StorageUnavailableHandler) => ProgressState;
  saveProgress?: (progress: ProgressState, onUnavailable: StorageUnavailableHandler) => boolean;
  loadRun?: (onUnavailable: StorageUnavailableHandler) => RunState | null;
  saveRun?: (run: RunState, onUnavailable: StorageUnavailableHandler) => boolean;
  clearRun?: (onUnavailable: StorageUnavailableHandler) => void;
  restoredRun?: RunState | null;
  startRun?: (level: HskLevel) => RunState | void;
  createGameView?: (container: HTMLElement, options?: GameViewOptions) => GameView;
  bindActions?: (target: Window | HTMLElement, handlers: ActionHandlers) => () => void;
  now?: () => number;
  createSeed?: () => number;
  requestFrame?: (callback: FrameRequestCallback) => number;
  cancelFrame?: (handle: number) => void;
  prefersReducedMotion?: () => boolean;
  questionDurationMs?: number;
}

export interface AppControllerState {
  screen: AppScreen;
  run: RunState | null;
  choices: readonly [GateChoice, GateChoice, GateChoice] | null;
}

export interface AppController {
  readonly root: HTMLElement;
  destroy(): void;
  getState(): AppControllerState;
}

const COUNTDOWN_SECONDS = 3;
const DEFAULT_QUESTION_DURATION_MS = 4_800;

function safeBrowserProgress(onUnavailable: StorageUnavailableHandler): ProgressState {
  try {
    return loadStoredProgress(window.localStorage, onUnavailable);
  } catch {
    onUnavailable();
    return createDefaultProgress();
  }
}

function safeBrowserRun(onUnavailable: StorageUnavailableHandler): RunState | null {
  try {
    return loadStoredRun(window.sessionStorage, onUnavailable);
  } catch {
    onUnavailable();
    return null;
  }
}

function safeSaveProgress(progress: ProgressState, onUnavailable: StorageUnavailableHandler): boolean {
  try {
    return saveStoredProgress(window.localStorage, progress, onUnavailable);
  } catch {
    onUnavailable();
    return false;
  }
}

function safeSaveRun(run: RunState, onUnavailable: StorageUnavailableHandler): boolean {
  try {
    return saveStoredRun(window.sessionStorage, run, onUnavailable);
  } catch {
    onUnavailable();
    return false;
  }
}

function safeClearRun(onUnavailable: StorageUnavailableHandler): void {
  try {
    clearStoredRun(window.sessionStorage, onUnavailable);
  } catch {
    onUnavailable();
  }
}

function hash(value: string): number {
  let result = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 0x01000193);
  }
  return result >>> 0;
}

function createChoices(
  run: RunState,
  entries: readonly HanziEntry[],
  entriesById: ReadonlyMap<string, HanziEntry>,
): [GateChoice, GateChoice, GateChoice] {
  const correctId = run.questionIds[run.questionIndex];
  const correct = entriesById.get(correctId);
  if (!correct) throw new Error(`Missing question entry: ${correctId}`);
  const salt = `${run.seed}:${run.questionIndex}`;
  const distractors = entries
    .filter((entry) => entry.level <= run.level && entry.id !== correct.id)
    .sort((left, right) => hash(`${salt}:${left.id}`) - hash(`${salt}:${right.id}`) || left.sourceOrder - right.sourceOrder)
    .slice(0, 2);
  if (distractors.length !== 2) throw new Error(`Need two distractors for HSK ${run.level}`);
  const ordered = [correct, ...distractors]
    .sort((left, right) => hash(`${salt}:lane:${left.id}`) - hash(`${salt}:lane:${right.id}`) || left.sourceOrder - right.sourceOrder)
    .map(({ id, term }) => ({ id, term }));
  return ordered as [GateChoice, GateChoice, GateChoice];
}

function isCompatibleRun(run: RunState, entriesById: ReadonlyMap<string, HanziEntry>): boolean {
  return isRunState(run)
    && run.questionIds.every((id) => entriesById.get(id)?.level === run.level);
}

function promptFor(run: RunState, entriesById: ReadonlyMap<string, HanziEntry>): string {
  const entry = entriesById.get(run.questionIds[run.questionIndex]);
  if (!entry) throw new Error('Active question is unavailable');
  return run.questionIndex % 2 === 0 ? entry.meaningsVi.join('; ') : entry.pinyin;
}

export function createAppController(
  root: HTMLElement,
  dependencies: AppControllerDependencies = {},
): AppController {
  const loadEntries = dependencies.loadContent ?? loadBuiltContent;
  const loadProgress = dependencies.loadProgress ?? safeBrowserProgress;
  const saveProgress = dependencies.saveProgress ?? safeSaveProgress;
  const loadRun = dependencies.loadRun ?? safeBrowserRun;
  const saveRun = dependencies.saveRun ?? safeSaveRun;
  const clearRun = dependencies.clearRun ?? safeClearRun;
  const createGameView = dependencies.createGameView ?? createThreeGameView;
  const bindActions = dependencies.bindActions ?? bindGameActions;
  const now = dependencies.now ?? Date.now;
  const createSeed = dependencies.createSeed ?? (() => crypto.getRandomValues(new Uint32Array(1))[0]);
  const requestFrame = dependencies.requestFrame ?? requestAnimationFrame;
  const cancelFrame = dependencies.cancelFrame ?? cancelAnimationFrame;
  const prefersReducedMotion = dependencies.prefersReducedMotion
    ?? (() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  const questionDurationMs = dependencies.questionDurationMs ?? DEFAULT_QUESTION_DURATION_MS;

  let screen: AppScreen = 'menu';
  let run: RunState | null = null;
  let choices: [GateChoice, GateChoice, GateChoice] | null = null;
  let progress = createDefaultProgress();
  let entries: HanziEntry[] = [];
  let entriesById = new Map<string, HanziEntry>();
  let gameScreen: GameScreen | null = null;
  let gameView: GameView | null = null;
  let unbindActions: (() => void) | null = null;
  let frameHandle: number | null = null;
  let questionTimer: ReturnType<typeof setTimeout> | null = null;
  let checkpointTimer: ReturnType<typeof setInterval> | null = null;
  let countdownTimer: ReturnType<typeof setInterval> | null = null;
  let destroyed = false;
  let storageUnavailable = false;
  let resumeOnVisible = false;
  let resumeAfterContextRestore = false;

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

  const clearPlayingTimers = () => {
    if (questionTimer !== null) clearTimeout(questionTimer);
    if (checkpointTimer !== null) clearInterval(checkpointTimer);
    questionTimer = null;
    checkpointTimer = null;
  };

  const saveCheckpoint = () => {
    if (!run) return;
    if (!saveRun(run, showStorageWarning)) showStorageWarning();
  };

  const persistProgress = () => {
    if (!saveProgress(progress, showStorageWarning)) showStorageWarning();
  };

  const stopGameplay = () => {
    clearCountdown();
    clearPlayingTimers();
    if (frameHandle !== null) cancelFrame(frameHandle);
    frameHandle = null;
    unbindActions?.();
    unbindActions = null;
    gameView?.dispose();
    gameView = null;
    gameScreen = null;
  };

  const showFatal = (kind: 'content' | 'webgl' | 'unknown') => {
    stopGameplay();
    screen = 'fatal';
    root.replaceChildren(createFatalScreen(kind));
    appendStorageWarning();
  };

  const renderMenu = () => {
    stopGameplay();
    run = null;
    choices = null;
    screen = 'menu';
    root.replaceChildren(createMenuScreen({
      selectedLevel: progress.selectedLevel,
      reducedMotion: progress.reducedMotion,
      onStart: (level) => startSelectedLevel(level),
      onReducedMotion: (enabled) => {
        progress = { ...progress, reducedMotion: enabled };
        persistProgress();
      },
    }));
    appendStorageWarning();
  };

  const updateQuestion = (resetGate: boolean) => {
    if (!run || !gameScreen || !gameView || !choices) return;
    gameScreen.update(run, promptFor(run, entriesById), choices);
    gameView.setLane(run.lane);
    gameView.setGateTerms(choices.map((choice) => choice.term) as [string, string, string]);
    if (resetGate) gameView.resetGatePhase();
  };

  const renderFrame: FrameRequestCallback = (timestamp) => {
    if (destroyed || !gameView) return;
    gameView.render(timestamp / 1_000);
    frameHandle = requestFrame(renderFrame);
  };

  const move = (direction: -1 | 1) => {
    if (!run || screen !== 'playing') return;
    const next = moveLane(run, direction);
    if (next === run) return;
    run = next;
    gameView?.setLane(run.lane);
    gameScreen?.announceLane(run.lane);
  };

  const acknowledgeRun = () => {
    clearRun(showStorageWarning);
  };

  const showReview = () => {
    if (!run) return;
    stopGameplay();
    screen = 'review';
    const completedRun = run;
    root.replaceChildren(createReviewScreen({
      run: completedRun,
      entriesById,
      onRestart: () => {
        acknowledgeRun();
        startSelectedLevel(completedRun.level);
      },
      onMenu: () => {
        acknowledgeRun();
        renderMenu();
      },
    }));
    appendStorageWarning();
  };

  const finishRun = () => {
    if (!run || run.status !== 'complete') return;
    const completedAt = now();
    for (const answer of run.answers) progress = updateMastery(progress, answer.questionId, answer.correct, completedAt);
    progress = {
      ...progress,
      highScores: { ...progress.highScores, [run.level]: Math.max(progress.highScores[run.level], run.score) },
    };
    persistProgress();
    showReview();
  };

  const resolveCurrentQuestion = () => {
    if (!run || screen !== 'playing' || !choices) return;
    const selected = choices[run.lane];
    const correctId = run.questionIds[run.questionIndex];
    run = answerCurrent(run, selected.id, correctId);
    saveCheckpoint();
    clearPlayingTimers();
    if (run.status === 'complete') {
      finishRun();
      return;
    }
    choices = createChoices(run, entries, entriesById);
    updateQuestion(true);
    startPlayingTimers();
  };

  const startPlayingTimers = () => {
    clearPlayingTimers();
    questionTimer = setTimeout(resolveCurrentQuestion, questionDurationMs);
    checkpointTimer = setInterval(saveCheckpoint, 500);
  };

  const enterPlaying = () => {
    if (!run || !gameView || !gameScreen || destroyed) return;
    clearCountdown();
    screen = 'playing';
    run = { ...run, status: 'playing' };
    gameScreen.overlay.replaceChildren();
    gameView.setPaused(false);
    saveCheckpoint();
    startPlayingTimers();
    gameScreen.element.focus({ preventScroll: true });
  };

  const beginCountdown = () => {
    if (!run || !gameScreen || !gameView || destroyed) return;
    clearCountdown();
    clearPlayingTimers();
    screen = 'countdown';
    run = { ...run, status: 'paused' };
    gameView.setPaused(true);
    let remaining = COUNTDOWN_SECONDS;
    const overlay = createCountdownOverlay(remaining);
    gameScreen.overlay.replaceChildren(overlay);
    countdownTimer = setInterval(() => {
      remaining -= 1;
      const value = overlay.querySelector<HTMLElement>('[data-countdown]');
      if (remaining > 0) {
        if (value) value.textContent = String(remaining);
        return;
      }
      enterPlaying();
    }, 1_000);
  };

  const pause = (message = 'Lượt chơi và thời gian đã được giữ nguyên.') => {
    if (!run || (screen !== 'playing' && screen !== 'countdown')) return;
    clearCountdown();
    clearPlayingTimers();
    screen = 'paused';
    run = { ...run, status: 'paused' };
    gameView?.setPaused(true);
    saveCheckpoint();
    gameScreen?.overlay.replaceChildren(createPauseOverlay(message, beginCountdown, () => {
      clearRun(showStorageWarning);
      renderMenu();
    }));
  };

  const mountGameplay = (): boolean => {
    if (!run || !choices) return false;
    stopGameplay();
    gameScreen = createGameScreen(() => pause());
    root.replaceChildren(gameScreen.element);
    appendStorageWarning();
    try {
      gameView = createGameView(gameScreen.viewport, {
        reducedMotion: progress.reducedMotion || prefersReducedMotion(),
        onContextLost: () => {
          resumeAfterContextRestore = screen === 'playing' || screen === 'countdown';
          pause('Mất ngữ cảnh WebGL. Trò chơi đang chờ khôi phục.');
        },
        onContextRestored: () => {
          if (resumeAfterContextRestore && document.visibilityState !== 'hidden') beginCountdown();
          resumeAfterContextRestore = false;
        },
      });
      updateQuestion(true);
      unbindActions = bindActions(gameScreen.element, {
        left: () => move(-1),
        right: () => move(1),
        pause: () => pause(),
      });
      frameHandle = requestFrame(renderFrame);
      return true;
    } catch {
      showFatal('webgl');
      return false;
    }
  };

  const startSelectedLevel = (level: HskLevel) => {
    if (destroyed) return;
    try {
      const suppliedRun = dependencies.startRun?.(level);
      progress = { ...progress, selectedLevel: level };
      persistProgress();
      run = suppliedRun ?? createSimulationRun(entries, progress.mastery, level, createSeed(), now());
      choices = createChoices(run, entries, entriesById);
      if (!mountGameplay()) return;
      enterPlaying();
    } catch {
      showFatal('content');
    }
  };

  const onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      resumeOnVisible = screen === 'playing' || screen === 'countdown';
      if (resumeOnVisible) pause('Trang đã bị ẩn. Lượt chơi được giữ nguyên.');
      else saveCheckpoint();
      return;
    }
    if (resumeOnVisible) {
      resumeOnVisible = false;
      beginCountdown();
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  try {
    entries = loadEntries();
    entriesById = new Map(entries.map((entry) => [entry.id, entry]));
    progress = loadProgress(showStorageWarning);
    const restored = Object.hasOwn(dependencies, 'restoredRun')
      ? dependencies.restoredRun ?? null
      : loadRun(showStorageWarning);
    if (restored && isCompatibleRun(restored, entriesById)) {
      run = restored.status === 'complete' ? restored : { ...restored, status: 'paused' };
      if (run.status === 'complete') showReview();
      else {
        choices = createChoices(run, entries, entriesById);
        if (mountGameplay()) beginCountdown();
      }
    } else {
      if (restored) clearRun(showStorageWarning);
      renderMenu();
    }
  } catch {
    showFatal('content');
  }

  return {
    root,
    getState: () => ({ screen, run, choices }),
    destroy() {
      if (destroyed) return;
      destroyed = true;
      document.removeEventListener('visibilitychange', onVisibilityChange);
      stopGameplay();
      root.replaceChildren();
    },
  };
}
