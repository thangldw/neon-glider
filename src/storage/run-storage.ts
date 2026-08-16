import type { AnswerRecord, RunState } from '../simulation/types';

const KEY = 'hanzi-glider.run';
const DATASET_VERSION = 'hsk3-2026-08-16';
const QUESTION_COUNT = 20;
const MAX_UINT32 = 0xffff_ffff;

type UnavailableHandler = () => void;

function notify(handler: UnavailableHandler): void {
  try {
    handler();
  } catch {
    // Storage fallback must not be made unavailable by a notification handler.
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
  const actual = Object.keys(value);
  return actual.length === keys.length && actual.every((key) => keys.includes(key));
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

function isUint32(value: unknown): value is number {
  return isNonNegativeInteger(value) && value <= MAX_UINT32;
}

function isAnswer(value: unknown, expectedQuestionId: string): value is AnswerRecord {
  if (!isRecord(value) || !hasExactKeys(value, ['questionId', 'selectedId', 'correct'])) return false;
  if (value.questionId !== expectedQuestionId || !isNonEmptyString(value.selectedId) || typeof value.correct !== 'boolean') {
    return false;
  }
  return value.correct ? value.selectedId === expectedQuestionId : value.selectedId !== expectedQuestionId;
}

function reconstructCounters(answers: unknown[], questionIds: unknown[]): { score: number; combo: number; energy: number } | null {
  let score = 0;
  let combo = 0;
  let energy = 50;
  for (let index = 0; index < answers.length; index += 1) {
    const answer = answers[index];
    const questionId = questionIds[index];
    if (!isNonEmptyString(questionId) || !isAnswer(answer, questionId)) return null;
    if (answer.correct) {
      score += 100 + combo * 10;
      combo += 1;
      energy = Math.min(100, energy + 5);
    } else {
      combo = 0;
      energy = Math.max(0, energy - 10);
    }
  }
  return { score, combo, energy };
}

export function isRunState(value: unknown): value is RunState {
  if (!isRecord(value) || !hasExactKeys(value, [
    'schemaVersion', 'datasetVersion', 'seed', 'rngState', 'level', 'questionIds',
    'questionIndex', 'lane', 'score', 'combo', 'energy', 'answers', 'status',
  ])) return false;

  if (!Array.isArray(value.questionIds) || !Array.isArray(value.answers)) return false;
  const questionIds = value.questionIds;
  const answers = value.answers;
  const counters = reconstructCounters(answers, questionIds);
  if (value.schemaVersion !== 1 || value.datasetVersion !== DATASET_VERSION
    || !isUint32(value.seed) || !isUint32(value.rngState)
    || (value.level !== 1 && value.level !== 2 && value.level !== 3)
    || questionIds.length !== QUESTION_COUNT
    || !questionIds.every(isNonEmptyString) || new Set(questionIds).size !== QUESTION_COUNT
    || !isNonNegativeInteger(value.questionIndex) || value.questionIndex > QUESTION_COUNT
    || (value.lane !== 0 && value.lane !== 1 && value.lane !== 2)
    || !isNonNegativeInteger(value.score) || !isNonNegativeInteger(value.combo)
    || !isNonNegativeInteger(value.energy) || value.energy > 100
    || answers.length !== value.questionIndex
    || !counters || value.score !== counters.score || value.combo !== counters.combo || value.energy !== counters.energy
    || (value.status !== 'playing' && value.status !== 'paused' && value.status !== 'complete')) {
    return false;
  }

  return value.status === 'complete'
    ? value.questionIndex === QUESTION_COUNT
    : value.questionIndex < QUESTION_COUNT;
}

function clearInvalid(storage: Storage, onUnavailable: UnavailableHandler): void {
  try {
    storage.removeItem(KEY);
  } catch {
    notify(onUnavailable);
  }
}

export function saveRun(storage: Storage, run: RunState, onUnavailable: UnavailableHandler = () => undefined): boolean {
  if (!isRunState(run)) return false;
  try {
    storage.setItem(KEY, JSON.stringify(run));
    return true;
  } catch {
    notify(onUnavailable);
    return false;
  }
}

export function loadRun(storage: Storage, onUnavailable: UnavailableHandler = () => undefined): RunState | null {
  let raw: string | null;
  try {
    raw = storage.getItem(KEY);
  } catch {
    notify(onUnavailable);
    return null;
  }
  if (raw === null) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRunState(parsed)) {
      clearInvalid(storage, onUnavailable);
      return null;
    }
    return parsed;
  } catch {
    clearInvalid(storage, onUnavailable);
    return null;
  }
}

export function clearRun(storage: Storage, onUnavailable: UnavailableHandler = () => undefined): void {
  try {
    storage.removeItem(KEY);
  } catch {
    notify(onUnavailable);
  }
}
