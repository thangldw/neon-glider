import type { HanziEntry, HskLevel } from '../content/types';
import { selectQuestions } from './scheduler';
import type { MasteryRecord, RunState } from './types';

const QUESTION_COUNT = 20;
const STARTING_ENERGY = 50;

function assertNonEmptyId(value: string, name: 'selectedId' | 'correctId'): void {
  if (!value.trim()) throw new Error(`${name} must be a non-empty string`);
}

export function createRun(
  entries: readonly HanziEntry[],
  mastery: Record<string, MasteryRecord>,
  level: HskLevel,
  seed: number,
  now: number,
): RunState {
  const selection = selectQuestions(entries, mastery, level, QUESTION_COUNT, seed, now);
  return {
    schemaVersion: 1,
    datasetVersion: 'hsk3-2026-08-16',
    seed: seed >>> 0,
    rngState: selection.rngState,
    level,
    questionIds: selection.questionIds,
    questionIndex: 0,
    lane: 1,
    score: 0,
    combo: 0,
    energy: STARTING_ENERGY,
    answers: [],
    status: 'playing',
  };
}

export function moveLane(run: RunState, direction: number): RunState {
  if (!Number.isFinite(direction)) throw new Error('direction must be finite');
  if (run.status !== 'playing') return run;
  const lane = Math.max(0, Math.min(2, Math.trunc(run.lane + direction))) as 0 | 1 | 2;
  return lane === run.lane ? run : { ...run, lane };
}

export function answerCurrent(run: RunState, selectedId: string, correctId: string): RunState {
  if (run.status !== 'playing') return run;
  assertNonEmptyId(selectedId, 'selectedId');
  assertNonEmptyId(correctId, 'correctId');

  const questionId = run.questionIds[run.questionIndex];
  if (!questionId) throw new Error('Run has no active question');

  const correct = selectedId === correctId;
  const questionIndex = run.questionIndex + 1;
  const score = correct ? run.score + 100 + run.combo * 10 : run.score;
  const combo = correct ? run.combo + 1 : 0;
  const energy = correct ? Math.min(100, run.energy + 5) : Math.max(0, run.energy - 10);

  return {
    ...run,
    questionIndex,
    score,
    combo,
    energy,
    answers: [...run.answers, { questionId, selectedId, correct }],
    status: questionIndex === run.questionIds.length ? 'complete' : 'playing',
  };
}
