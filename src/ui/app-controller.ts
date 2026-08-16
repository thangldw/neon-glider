import { loadContent as loadBuiltContent } from '../content';
import type { HanziEntry, HskLevel } from '../content/types';
import {
  createPerfMonitor,
  type PerformanceSnapshot,
  type PerfMonitor,
} from '../diagnostics/perf-overlay';
import { bindActions as bindGameActions, type ActionHandlers } from '../input/actions';
import {
  createGameView as createThreeGameView,
  MAX_FRAME_DELTA_SECONDS,
  type GameView,
  type GameViewOptions,
  type FramingDiagnostics,
} from '../render/game-view';
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
  enableTestHooks?: boolean;
  perfMonitor?: PerfMonitor;
}

export interface AppControllerState {
  screen: AppScreen;
  run: RunState | null;
  choices: readonly [GateChoice, GateChoice, GateChoice] | null;
}

export interface AppController {
  readonly root: HTMLElement;
  readonly testHook?: AppTestHook;
  destroy(): void;
  getState(): AppControllerState;
}

export interface AppTestSnapshot extends AppControllerState {
  performance: PerformanceSnapshot;
  reducedMotion: boolean;
  framing: FramingDiagnostics | null;
}

export interface AppTestHook {
  snapshot(): AppTestSnapshot;
  answer(selectedId: string): boolean;
  resetPerformance(): void;
}

const COUNTDOWN_SECONDS = 3;
const QUESTION_DURATION_MS: Readonly<Record<HskLevel, number>> = { 1: 5_400, 2: 4_800, 3: 4_200 };

/** Higher levels get less reading time without changing glider physics. */
export function getQuestionDurationMs(level: HskLevel): number {
  return QUESTION_DURATION_MS[level];
}

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

/**
 * Level 1 uses broad deterministic distractors. Level 2 prefers equal glyph
 * length. Level 3 additionally prioritizes shared glyphs for closer visual
 * confusability. Hash order remains the stable tie-breaker.
 */
export function scoreDistractorSimilarity(level: HskLevel, correct: HanziEntry, candidate: HanziEntry): number {
  if (level === 1) return 0;
  const correctGlyphs = Array.from(correct.term);
  const candidateGlyphs = Array.from(candidate.term);
  const lengthScore = Math.max(0, 10 - Math.abs(correctGlyphs.length - candidateGlyphs.length) * 5);
  if (level === 2) return lengthScore;
  const candidateSet = new Set(candidateGlyphs);
  const sharedGlyphs = new Set(correctGlyphs.filter((glyph) => candidateSet.has(glyph))).size;
  return lengthScore + sharedGlyphs * 20;
}

export function createGateChoices(
  run: RunState,
  entries: readonly HanziEntry[],
  entriesById: ReadonlyMap<string, HanziEntry>,
): [GateChoice, GateChoice, GateChoice] {
  const correctId = run.questionIds[run.questionIndex];
  const correct = entriesById.get(correctId);
  if (!correct) throw new Error(`Missing question entry: ${correctId}`);
  const salt = `${run.seed}:${run.questionIndex}`;
  const uniqueTerms = new Map<string, HanziEntry>();
  for (const entry of [...entries].sort((left, right) => left.sourceOrder - right.sourceOrder || left.id.localeCompare(right.id))) {
    if (entry.level <= run.level && entry.term !== correct.term && !uniqueTerms.has(entry.term)) uniqueTerms.set(entry.term, entry);
  }
  const distractors = [...uniqueTerms.values()]
    .sort((left, right) => scoreDistractorSimilarity(run.level, correct, right)
      - scoreDistractorSimilarity(run.level, correct, left)
      || hash(`${salt}:${left.id}`) - hash(`${salt}:${right.id}`)
      || left.sourceOrder - right.sourceOrder)
    .slice(0, 2);
  if (distractors.length !== 2) throw new Error(`Need two distractors for HSK ${run.level}`);
  const ordered = [correct, ...distractors]
    .sort((left, right) => hash(`${salt}:lane:${left.id}`) - hash(`${salt}:lane:${right.id}`) || left.sourceOrder - right.sourceOrder)
    .map(({ id, term }) => ({ id, term }));
  const choices = ordered as [GateChoice, GateChoice, GateChoice];
  if (new Set(choices.map(({ term }) => term)).size !== 3
    || choices.filter(({ id }) => id === correct.id).length !== 1) {
    throw new Error('Gate choices must contain three unique terms and exactly one correct ID');
  }
  return choices;
}

function isCompatibleRun(
  run: RunState,
  entries: readonly HanziEntry[],
  entriesById: ReadonlyMap<string, HanziEntry>,
): boolean {
  if (!isRunState(run) || !run.questionIds.every((id) => entriesById.get(id)?.level === run.level)) return false;
  try {
    return run.answers.every((answer, questionIndex) => {
      const selected = entriesById.get(answer.selectedId);
      if (!selected || selected.level > run.level) return false;
      const snapshot = { ...run, questionIndex };
      return createGateChoices(snapshot, entries, entriesById).some(({ id }) => id === answer.selectedId);
    });
  } catch {
    return false;
  }
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
  const questionDurationMs = () => dependencies.questionDurationMs ?? getQuestionDurationMs(run?.level ?? progress.selectedLevel);
  const perfMonitor = dependencies.perfMonitor ?? createPerfMonitor({
    visible: import.meta.env.DEV && import.meta.env.MODE !== 'test',
    host: document.body,
  });
  const enableTestHooks = dependencies.enableTestHooks
    ?? new URLSearchParams(window.location.search).get('e2e') === '1';

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
  let frameAnchorSeconds: number | null = null;
  let questionElapsedMs = 0;
  let checkpointTimer: ReturnType<typeof setInterval> | null = null;
  let countdownTimer: ReturnType<typeof setInterval> | null = null;
  let destroyed = false;
  let storageUnavailable = false;
  let resumeOnVisible = false;
  let resumeAfterContextRestore = false;
  let effectiveReducedMotion = false;

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

  const clearPlayingTimers = (resetFrameAnchor = true) => {
    if (checkpointTimer !== null) clearInterval(checkpointTimer);
    checkpointTimer = null;
    if (resetFrameAnchor) frameAnchorSeconds = null;
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
    questionElapsedMs = 0;
  };

  const showFatal = (kind: 'content' | 'webgl' | 'unknown') => {
    stopGameplay();
    screen = 'fatal';
    const fatal = createFatalScreen(kind);
    root.replaceChildren(fatal);
    queueMicrotask(() => fatal.focus({ preventScroll: true }));
    appendStorageWarning();
  };

  const renderMenu = () => {
    stopGameplay();
    run = null;
    choices = null;
    screen = 'menu';
    const menu = createMenuScreen({
      selectedLevel: progress.selectedLevel,
      reducedMotion: progress.reducedMotion,
      onStart: (level) => startSelectedLevel(level),
      onReducedMotion: (enabled) => {
        progress = { ...progress, reducedMotion: enabled };
        persistProgress();
      },
    });
    root.replaceChildren(menu);
    appendStorageWarning();
    queueMicrotask(() => menu.focus({ preventScroll: true }));
  };

  const updateQuestion = (resetGate: boolean) => {
    if (!run || !gameScreen || !gameView || !choices) return;
    gameScreen.update(run, promptFor(run, entriesById), choices);
    gameView.setLane(run.lane);
    gameView.setGateTerms(choices.map((choice) => choice.term) as [string, string, string]);
    if (resetGate) {
      questionElapsedMs = 0;
      gameView.setQuestionDuration(questionDurationMs() / 1_000);
      gameView.resetGatePhase();
    }
  };

  const renderFrame: FrameRequestCallback = (timestamp) => {
    if (destroyed || !gameView) return;
    const elapsedSeconds = timestamp / 1_000;
    gameView.render(elapsedSeconds);
    perfMonitor.record(timestamp, gameView.getDiagnostics?.() ?? { drawCalls: 0, geometries: 0, textures: 0 });
    if (screen === 'playing') {
      const delta = frameAnchorSeconds === null ? 0 : elapsedSeconds - frameAnchorSeconds;
      frameAnchorSeconds = elapsedSeconds;
      if (delta >= 0 && delta <= MAX_FRAME_DELTA_SECONDS) questionElapsedMs += delta * 1_000;
      if (questionElapsedMs >= questionDurationMs() - 0.01) resolveCurrentQuestion();
    } else {
      frameAnchorSeconds = null;
    }
    if (!destroyed && gameView) frameHandle = requestFrame(renderFrame);
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
    const review = createReviewScreen({
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
    });
    root.replaceChildren(review);
    appendStorageWarning();
    queueMicrotask(() => review.focus({ preventScroll: true }));
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

  const answerSelected = (selectedId: string): boolean => {
    if (!run || screen !== 'playing' || !choices) return false;
    const selected = choices.find((choice) => choice.id === selectedId);
    if (!selected) return false;
    const correctId = run.questionIds[run.questionIndex];
    run = answerCurrent(run, selected.id, correctId);
    saveCheckpoint();
    clearPlayingTimers(false);
    if (run.status === 'complete') {
      finishRun();
      return true;
    }
    choices = createGateChoices(run, entries, entriesById);
    updateQuestion(true);
    startPlayingTimers(false);
    return true;
  };

  const resolveCurrentQuestion = (): boolean => {
    if (!run || !choices) return false;
    return answerSelected(choices[run.lane].id);
  };

  const startPlayingTimers = (resetFrameAnchor = true) => {
    clearPlayingTimers(resetFrameAnchor);
    checkpointTimer = setInterval(saveCheckpoint, 500);
  };

  const holdForVisibility = () => {
    if (!run || !gameScreen || !gameView) return;
    clearCountdown();
    clearPlayingTimers();
    resumeOnVisible = true;
    screen = 'paused';
    run = { ...run, status: 'paused' };
    gameView.setPaused(true);
    gameScreen.overlay.replaceChildren(createPauseOverlay(
      'Trang đang bị ẩn. Lượt chơi sẽ tiếp tục khi trang hiển thị lại.',
      () => beginCountdown(),
      () => {
        clearRun(showStorageWarning);
        renderMenu();
      },
    ));
  };

  const enterPlaying = () => {
    if (!run || !gameView || !gameScreen || destroyed) return;
    if (document.visibilityState === 'hidden') {
      holdForVisibility();
      return;
    }
    clearCountdown();
    screen = 'playing';
    run = { ...run, status: 'playing' };
    gameScreen.overlay.replaceChildren();
    gameView.setPaused(false);
    saveCheckpoint();
    startPlayingTimers();
    gameScreen.viewport.focus({ preventScroll: true });
  };

  const beginCountdown = () => {
    if (!run || !gameScreen || !gameView || destroyed) return;
    if (document.visibilityState === 'hidden') {
      holdForVisibility();
      return;
    }
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
      effectiveReducedMotion = progress.reducedMotion || prefersReducedMotion();
      gameView = createGameView(gameScreen.viewport, {
        reducedMotion: effectiveReducedMotion,
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
      unbindActions = bindActions(gameScreen.viewport, {
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
      choices = createGateChoices(run, entries, entriesById);
      if (!mountGameplay()) return;
      enterPlaying();
    } catch {
      showFatal('content');
    }
  };

  const onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      const wasActive = screen === 'playing' || screen === 'countdown';
      if (wasActive) {
        resumeOnVisible = true;
        pause('Trang đã bị ẩn. Lượt chơi được giữ nguyên.');
      }
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
    if (restored && isCompatibleRun(restored, entries, entriesById)) {
      run = restored.status === 'complete' ? restored : { ...restored, status: 'paused' };
      if (run.status === 'complete') showReview();
      else {
        choices = createGateChoices(run, entries, entriesById);
        if (mountGameplay()) beginCountdown();
      }
    } else {
      if (restored) clearRun(showStorageWarning);
      renderMenu();
    }
  } catch {
    showFatal('content');
  }

  const testHook: AppTestHook | undefined = enableTestHooks ? {
    snapshot: () => structuredClone({
      screen,
      run,
      choices,
      performance: perfMonitor.snapshot(),
      reducedMotion: effectiveReducedMotion,
      framing: gameView?.getFramingDiagnostics?.() ?? null,
    }),
    answer: answerSelected,
    resetPerformance: () => perfMonitor.reset(),
  } : undefined;

  return {
    root,
    testHook,
    getState: () => ({ screen, run, choices }),
    destroy() {
      if (destroyed) return;
      destroyed = true;
      document.removeEventListener('visibilitychange', onVisibilityChange);
      stopGameplay();
      perfMonitor.dispose();
      root.replaceChildren();
    },
  };
}
