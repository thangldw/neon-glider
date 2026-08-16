import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearRun, loadRun, saveRun } from '../../src/storage/run-storage';
import { loadProgress, saveProgress, updateMastery } from '../../src/storage/progress-storage';
import type { ProgressState, RunState } from '../../src/simulation/types';

const RUN_KEY = 'hanzi-glider.run';
const PROGRESS_KEY = 'hanzi-glider.progress';

function makeRun(overrides: Partial<RunState> = {}): RunState {
  return {
    schemaVersion: 1,
    datasetVersion: 'hsk3-2026-08-16',
    seed: 1,
    rngState: 2,
    level: 1,
    questionIds: Array.from({ length: 20 }, (_, index) => `q${index + 1}`),
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

function makeProgress(overrides: Partial<ProgressState> = {}): ProgressState {
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

class DeniedStorage implements Storage {
  get length(): number { throw new DOMException('denied'); }
  clear(): void { throw new DOMException('denied'); }
  getItem(): string | null { throw new DOMException('denied'); }
  key(): string | null { throw new DOMException('denied'); }
  removeItem(): void { throw new DOMException('denied'); }
  setItem(): void { throw new DOMException('denied'); }
}

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
});

describe('active run storage', () => {
  it('round-trips a compatible active run', () => {
    const run = makeRun();

    expect(saveRun(sessionStorage, run)).toBe(true);
    expect(loadRun(sessionStorage)).toEqual(run);
  });

  it('clears malformed and semantically incompatible runs rather than casting them through', () => {
    sessionStorage.setItem(RUN_KEY, '{bad json');
    expect(loadRun(sessionStorage)).toBeNull();
    expect(sessionStorage.getItem(RUN_KEY)).toBeNull();

    const duplicateIds = makeRun({ questionIds: Array.from({ length: 20 }, () => 'repeat') });
    sessionStorage.setItem(RUN_KEY, JSON.stringify(duplicateIds));
    expect(loadRun(sessionStorage)).toBeNull();
    expect(sessionStorage.getItem(RUN_KEY)).toBeNull();

    const staleAnswer = makeRun({
      questionIndex: 1,
      answers: [{ questionId: 'wrong-question', selectedId: 'q2', correct: false }],
    });
    sessionStorage.setItem(RUN_KEY, JSON.stringify(staleAnswer));
    expect(loadRun(sessionStorage)).toBeNull();

    const invalidComplete = makeRun({ status: 'complete', questionIndex: 19, answers: Array.from(
      { length: 19 },
      (_, index) => ({ questionId: `q${index + 1}`, selectedId: `q${index + 1}`, correct: true }),
    ) });
    sessionStorage.setItem(RUN_KEY, JSON.stringify(invalidComplete));
    expect(loadRun(sessionStorage)).toBeNull();
  });

  it('rejects negative, non-finite, and structurally inconsistent serialized numeric run state', () => {
    const cases = [
      makeRun({ seed: -1 }),
      makeRun({ rngState: Number.MAX_SAFE_INTEGER + 1 }),
      makeRun({ score: -1 }),
      makeRun({ combo: -1 }),
      makeRun({ energy: 101 }),
      makeRun({ questionIndex: 1, answers: [] }),
    ];

    for (const value of cases) {
      sessionStorage.setItem(RUN_KEY, JSON.stringify(value));
      expect(loadRun(sessionStorage)).toBeNull();
      expect(sessionStorage.getItem(RUN_KEY)).toBeNull();
    }
  });

  it('restores only counters that can be reconstructed from the answer history', () => {
    const answers = [
      { questionId: 'q1', selectedId: 'q1', correct: true },
      { questionId: 'q2', selectedId: 'q2', correct: true },
      { questionId: 'q3', selectedId: 'distractor', correct: false },
    ];
    const valid = makeRun({ questionIndex: 3, answers, score: 210, combo: 0, energy: 50 });

    sessionStorage.setItem(RUN_KEY, JSON.stringify(valid));
    expect(loadRun(sessionStorage)).toEqual(valid);

    for (const invalid of [
      makeRun({ questionIndex: 3, answers, score: 211, combo: 0, energy: 50 }),
      makeRun({ questionIndex: 3, answers, score: 210, combo: 0.5, energy: 50 }),
      makeRun({ questionIndex: 3, answers, score: 210, combo: 0, energy: 49 }),
    ]) {
      sessionStorage.setItem(RUN_KEY, JSON.stringify(invalid));
      expect(loadRun(sessionStorage)).toBeNull();
      expect(sessionStorage.getItem(RUN_KEY)).toBeNull();
    }
  });

  it('falls back safely when session storage is unavailable and notifies once per failed operation', () => {
    const unavailable = vi.fn();
    const denied = new DeniedStorage();

    expect(saveRun(denied, makeRun(), unavailable)).toBe(false);
    expect(unavailable).toHaveBeenCalledTimes(1);

    unavailable.mockClear();
    expect(loadRun(denied, unavailable)).toBeNull();
    expect(unavailable).toHaveBeenCalledTimes(1);

    unavailable.mockClear();
    expect(() => clearRun(denied, unavailable)).not.toThrow();
    expect(unavailable).toHaveBeenCalledTimes(1);
  });
});

describe('persistent progress storage', () => {
  it('returns independent defaults for missing, corrupt, and incompatible persistent state', () => {
    const first = loadProgress(localStorage);
    const second = loadProgress(localStorage);
    expect(first).toEqual(makeProgress());
    expect(second).toEqual(makeProgress());
    expect(first).not.toBe(second);

    localStorage.setItem(PROGRESS_KEY, '{bad json');
    expect(loadProgress(localStorage)).toEqual(makeProgress());
    expect(localStorage.getItem(PROGRESS_KEY)).toBeNull();

    localStorage.setItem(PROGRESS_KEY, JSON.stringify(makeProgress({ datasetVersion: 'old-version' } as never)));
    expect(loadProgress(localStorage)).toEqual(makeProgress());
    expect(localStorage.getItem(PROGRESS_KEY)).toBeNull();
  });

  it('round-trips only valid progress and rejects corrupt mastery, scores, and settings', () => {
    const progress = makeProgress({
      mastery: {
        term: { attempts: 3, correct: 2, streak: 1, lastSeenAt: 100, nextReviewAt: 86_400_100 },
      },
      highScores: { 1: 10, 2: 20, 3: 30 },
      selectedLevel: 3,
      reducedMotion: true,
      volume: 0.5,
    });

    expect(saveProgress(localStorage, progress)).toBe(true);
    expect(loadProgress(localStorage)).toEqual(progress);

    const invalids = [
      makeProgress({ mastery: { term: { attempts: 2, correct: 3, streak: 0, lastSeenAt: 1, nextReviewAt: 1 } } }),
      makeProgress({ mastery: { '': { attempts: 0, correct: 0, streak: 0, lastSeenAt: 0, nextReviewAt: 0 } } }),
      makeProgress({ highScores: { 1: 0, 2: -1, 3: 0 } }),
      makeProgress({ volume: 1.1 }),
      makeProgress({ reducedMotion: 'false' as never }),
      makeProgress({ mastery: { term: { attempts: 1, correct: 1, streak: 1, lastSeenAt: 1.5, nextReviewAt: 2 } } }),
      makeProgress({ mastery: { term: {
        attempts: 1,
        correct: 1,
        streak: 1,
        lastSeenAt: Number.MAX_SAFE_INTEGER + 1,
        nextReviewAt: Number.MAX_SAFE_INTEGER + 1,
      } } }),
    ];

    for (const value of invalids) {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(value));
      expect(loadProgress(localStorage)).toEqual(makeProgress());
      expect(localStorage.getItem(PROGRESS_KEY)).toBeNull();
    }
  });

  it('uses an in-memory default and one notification when persistent storage is unavailable', () => {
    const unavailable = vi.fn();
    const denied = new DeniedStorage();

    expect(loadProgress(denied, unavailable)).toEqual(makeProgress());
    expect(unavailable).toHaveBeenCalledTimes(1);

    unavailable.mockClear();
    expect(saveProgress(denied, makeProgress(), unavailable)).toBe(false);
    expect(unavailable).toHaveBeenCalledTimes(1);
  });
});

describe('mastery updates', () => {
  it.each([
    [1, 1],
    [2, 3],
    [3, 7],
    [4, 14],
    [5, 14],
  ])('schedules correct streak %i after %i days', (streak, days) => {
    const now = 1_700_000_000_000;
    const progress = makeProgress({
      mastery: streak === 1 ? {} : {
        term: { attempts: streak - 1, correct: streak - 1, streak: streak - 1, lastSeenAt: now - 1, nextReviewAt: now },
      },
    });

    const updated = updateMastery(progress, 'term', true, now);
    expect(updated.mastery.term).toEqual({
      attempts: streak,
      correct: streak,
      streak,
      lastSeenAt: now,
      nextReviewAt: now + days * 86_400_000,
    });
    expect(updated).not.toBe(progress);
    expect(updated.mastery).not.toBe(progress.mastery);
    expect(progress.mastery.term?.attempts ?? 0).toBe(streak - 1);
  });

  it('resets an incorrect term to due immediately without mutating other records', () => {
    const now = 1_700_000_000_000;
    const progress = makeProgress({
      mastery: {
        term: { attempts: 4, correct: 4, streak: 4, lastSeenAt: 1, nextReviewAt: 2 },
        untouched: { attempts: 2, correct: 1, streak: 0, lastSeenAt: 3, nextReviewAt: 3 },
      },
    });

    const updated = updateMastery(progress, 'term', false, now);
    expect(updated.mastery.term).toEqual({ attempts: 5, correct: 4, streak: 0, lastSeenAt: now, nextReviewAt: now });
    expect(updated.mastery.untouched).toBe(progress.mastery.untouched);
    expect(progress.mastery.term).toEqual({ attempts: 4, correct: 4, streak: 4, lastSeenAt: 1, nextReviewAt: 2 });
  });

  it.each(['__proto__', 'constructor'])('treats reserved id %s as an unseen own mastery record', (termId) => {
    const now = 1_700_000_000_000;
    const progress = makeProgress();

    const updated = updateMastery(progress, termId, true, now);
    expect(Object.hasOwn(updated.mastery, termId)).toBe(true);
    expect(updated.mastery[termId]).toEqual({
      attempts: 1,
      correct: 1,
      streak: 1,
      lastSeenAt: now,
      nextReviewAt: now + 86_400_000,
    });
    expect(updated.mastery[termId].attempts).toBe(1);
    expect(JSON.parse(JSON.stringify(updated))).toEqual(updated);
    expect(progress.mastery).toEqual({});
  });

  it('rejects unsafe update timestamps and additions that cannot be represented safely', () => {
    const progress = makeProgress();

    expect(() => updateMastery(progress, 'term', true, 1.5)).toThrow(RangeError);
    expect(() => updateMastery(progress, 'term', true, Number.MAX_SAFE_INTEGER)).toThrow(RangeError);
    expect(() => updateMastery(progress, 'term', true, Number.MAX_SAFE_INTEGER - 1)).toThrow(RangeError);
  });
});
