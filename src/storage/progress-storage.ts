import type { MasteryRecord, ProgressState } from '../simulation/types';

const KEY = 'hanzi-glider.progress';
const DATASET_VERSION = 'hsk3-2026-08-16';
const DAY_MS = 86_400_000;
const REVIEW_INTERVAL_DAYS = [0, 1, 3, 7, 14] as const;

type UnavailableHandler = () => void;

function notify(handler: UnavailableHandler): void {
  try {
    handler();
  } catch {
    // A notification callback is not allowed to prevent in-memory fallback.
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
  const actual = Object.keys(value);
  return actual.length === keys.length && actual.every((key) => keys.includes(key));
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

function isNonNegativeFinite(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

function isTermId(value: string): boolean {
  return value.trim().length > 0;
}

export function isMasteryRecord(value: unknown): value is MasteryRecord {
  if (!isRecord(value) || !hasExactKeys(value, ['attempts', 'correct', 'streak', 'lastSeenAt', 'nextReviewAt'])) return false;
  return isNonNegativeInteger(value.attempts)
    && isNonNegativeInteger(value.correct)
    && isNonNegativeInteger(value.streak)
    && value.correct <= value.attempts
    && value.streak <= value.correct
    && isNonNegativeFinite(value.lastSeenAt)
    && isNonNegativeFinite(value.nextReviewAt)
    && value.nextReviewAt >= value.lastSeenAt;
}

function isMastery(value: unknown): value is Record<string, MasteryRecord> {
  return isRecord(value) && Object.entries(value).every(([termId, record]) => isTermId(termId) && isMasteryRecord(record));
}

function isHighScores(value: unknown): boolean {
  return isRecord(value) && hasExactKeys(value, ['1', '2', '3'])
    && isNonNegativeInteger(value['1'])
    && isNonNegativeInteger(value['2'])
    && isNonNegativeInteger(value['3']);
}

export function isProgressState(value: unknown): value is ProgressState {
  if (!isRecord(value) || !hasExactKeys(value, [
    'schemaVersion', 'datasetVersion', 'mastery', 'highScores', 'selectedLevel', 'reducedMotion', 'volume',
  ])) return false;

  return value.schemaVersion === 1
    && value.datasetVersion === DATASET_VERSION
    && isMastery(value.mastery)
    && isHighScores(value.highScores)
    && (value.selectedLevel === 1 || value.selectedLevel === 2 || value.selectedLevel === 3)
    && typeof value.reducedMotion === 'boolean'
    && typeof value.volume === 'number'
    && Number.isFinite(value.volume)
    && value.volume >= 0
    && value.volume <= 1;
}

export function createDefaultProgress(): ProgressState {
  return {
    schemaVersion: 1,
    datasetVersion: DATASET_VERSION,
    mastery: {},
    highScores: { 1: 0, 2: 0, 3: 0 },
    selectedLevel: 1,
    reducedMotion: false,
    volume: 1,
  };
}

function clearInvalid(storage: Storage, onUnavailable: UnavailableHandler): void {
  try {
    storage.removeItem(KEY);
  } catch {
    notify(onUnavailable);
  }
}

export function saveProgress(storage: Storage, progress: ProgressState, onUnavailable: UnavailableHandler = () => undefined): boolean {
  if (!isProgressState(progress)) return false;
  try {
    storage.setItem(KEY, JSON.stringify(progress));
    return true;
  } catch {
    notify(onUnavailable);
    return false;
  }
}

export function loadProgress(storage: Storage, onUnavailable: UnavailableHandler = () => undefined): ProgressState {
  let raw: string | null;
  try {
    raw = storage.getItem(KEY);
  } catch {
    notify(onUnavailable);
    return createDefaultProgress();
  }
  if (raw === null) return createDefaultProgress();

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isProgressState(parsed)) {
      clearInvalid(storage, onUnavailable);
      return createDefaultProgress();
    }
    return parsed;
  } catch {
    clearInvalid(storage, onUnavailable);
    return createDefaultProgress();
  }
}

export function updateMastery(progress: ProgressState, termId: string, correct: boolean, now: number): ProgressState {
  if (!isTermId(termId)) throw new Error('termId must be a non-empty string');
  if (typeof correct !== 'boolean') throw new Error('correct must be a boolean');
  if (!isNonNegativeFinite(now)) throw new Error('now must be a finite non-negative timestamp');

  const previous = progress.mastery[termId] ?? {
    attempts: 0,
    correct: 0,
    streak: 0,
    lastSeenAt: now,
    nextReviewAt: now,
  };
  const streak = correct ? previous.streak + 1 : 0;
  const interval = REVIEW_INTERVAL_DAYS[Math.min(streak, REVIEW_INTERVAL_DAYS.length - 1)];
  const record: MasteryRecord = {
    attempts: previous.attempts + 1,
    correct: previous.correct + (correct ? 1 : 0),
    streak,
    lastSeenAt: now,
    nextReviewAt: correct ? now + interval * DAY_MS : now,
  };

  return { ...progress, mastery: { ...progress.mastery, [termId]: record } };
}
