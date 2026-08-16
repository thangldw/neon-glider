import { describe, expect, it } from 'vitest';
import type { HanziEntry } from '../../src/content/types';
import { answerCurrent, createRun, moveLane } from '../../src/simulation/run';
import type { RunState } from '../../src/simulation/types';

const questionIds = Array.from({ length: 20 }, (_, index) => `hsk3-l1-${index + 1}`);
const entries: HanziEntry[] = questionIds.map((id, index) => ({
  id,
  term: `词${index + 1}`,
  pinyin: `ci${index + 1}`,
  meaningsVi: [`nghĩa ${index + 1}`],
  level: 1,
  sourceOrder: index + 1,
}));

const run: RunState = {
  schemaVersion: 1,
  datasetVersion: 'hsk3-2026-08-16',
  seed: 9,
  rngState: 9,
  level: 1,
  questionIds: ['a', 'b'],
  questionIndex: 0,
  lane: 1,
  score: 0,
  combo: 0,
  energy: 50,
  answers: [],
  status: 'playing',
};

describe('run reducers', () => {
  it('creates the same serializable run for a seed and preserves post-scheduling rng state', () => {
    const first = createRun(entries, {}, 1, 91, 1_700_000_000_000);
    const second = createRun(entries, {}, 1, 91, 1_700_000_000_000);

    expect(first).toEqual(second);
    expect(first).toMatchObject({ lane: 1, score: 0, combo: 0, energy: 50, questionIndex: 0, status: 'playing' });
    expect(first.rngState).not.toBe(91);
    expect(first.questionIds).toHaveLength(20);
  });

  it('clamps lane movement without mutating the current run', () => {
    const moved = moveLane(moveLane(run, -1), -1);

    expect(moved.lane).toBe(0);
    expect(run.lane).toBe(1);
    expect(moveLane(moved, 99).lane).toBe(2);
  });

  it('records selected id and rewards a correct answer', () => {
    const next = answerCurrent(run, 'a', 'a');

    expect(next).toMatchObject({ questionIndex: 1, score: 100, combo: 1, energy: 55, status: 'playing' });
    expect(next.answers).toEqual([{ questionId: 'a', selectedId: 'a', correct: true }]);
    expect(run.answers).toEqual([]);
  });

  it('caps correct-answer energy and uses the prior combo for score', () => {
    const next = answerCurrent({ ...run, combo: 4, energy: 98 }, 'a', 'a');

    expect(next).toMatchObject({ score: 140, combo: 5, energy: 100 });
  });

  it('floors wrong-answer energy and keeps the educational run alive', () => {
    const next = answerCurrent({ ...run, combo: 4, energy: 5 }, 'x', 'a');

    expect(next).toMatchObject({ questionIndex: 1, combo: 0, energy: 0, status: 'playing' });
    expect(next.answers).toEqual([{ questionId: 'a', selectedId: 'x', correct: false }]);
  });

  it('completes only after recording the final answer', () => {
    const next = answerCurrent({ ...run, questionIndex: 1 }, 'b', 'b');

    expect(next).toMatchObject({ questionIndex: 2, status: 'complete' });
    expect(next.answers).toHaveLength(1);
  });

  it('fails closed for invalid answer ids and leaves non-playing runs unchanged', () => {
    const paused = { ...run, status: 'paused' as const };
    const complete = { ...run, status: 'complete' as const };

    expect(() => answerCurrent(run, '', 'a')).toThrow('selectedId must be a non-empty string');
    expect(answerCurrent(paused, 'a', 'a')).toBe(paused);
    expect(moveLane(complete, -1)).toBe(complete);
  });
});
