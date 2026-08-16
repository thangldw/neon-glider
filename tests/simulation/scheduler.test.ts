import { describe, expect, it } from 'vitest';
import type { HanziEntry } from '../../src/content/types';
import type { MasteryRecord } from '../../src/simulation/types';
import { selectQuestionIds } from '../../src/simulation/scheduler';

function entries(count: number): HanziEntry[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `hsk3-l1-${String(index + 1).padStart(4, '0')}`,
    term: `词${index + 1}`,
    pinyin: `ci${index + 1}`,
    meaningsVi: [`nghĩa ${index + 1}`],
    level: 1,
    sourceOrder: index + 1,
  }));
}

function record(overrides: Partial<MasteryRecord> = {}): MasteryRecord {
  return {
    attempts: 4,
    correct: 4,
    streak: 2,
    lastSeenAt: 1_699_000_000_000,
    nextReviewAt: 1_800_000_000_000,
    ...overrides,
  };
}

describe('selectQuestionIds', () => {
  it('returns a deterministic, unique 50/30/20 selection', () => {
    const all = entries(30);
    const mastery = Object.fromEntries([
      ...all.slice(0, 10).map((entry) => [entry.id, record({ correct: 1 })]),
      ...all.slice(10, 16).map((entry) => [entry.id, record({ nextReviewAt: 1_600_000_000_000 })]),
    ]);

    const first = selectQuestionIds(all, mastery, 1, 20, 7, 1_700_000_000_000);
    const second = selectQuestionIds(all, mastery, 1, 20, 7, 1_700_000_000_000);

    expect(first).toHaveLength(20);
    expect(new Set(first).size).toBe(20);
    expect(first).toEqual(second);
    expect(first.filter((id) => mastery[id]?.correct === 1)).toHaveLength(10);
    expect(first.filter((id) => mastery[id]?.nextReviewAt === 1_600_000_000_000)).toHaveLength(6);
    expect(first.filter((id) => !mastery[id])).toHaveLength(4);
  });

  it('assigns an overlapping weak and due record to weak before due', () => {
    const all = entries(20);
    const mastery = {
      [all[0].id]: record({ correct: 0, nextReviewAt: 1_600_000_000_000 }),
      ...Object.fromEntries(all.slice(1, 10).map((entry) => [entry.id, record({ correct: 0 })])),
      ...Object.fromEntries(all.slice(10, 16).map((entry) => [entry.id, record({ nextReviewAt: 1_600_000_000_000 })])),
    };

    const ids = selectQuestionIds(all, mastery, 1, 20, 3, 1_700_000_000_000);

    expect(ids).toContain(all[0].id);
    expect(ids.filter((id) => mastery[id]?.correct === 0)).toHaveLength(10);
    expect(ids.filter((id) => mastery[id]?.nextReviewAt === 1_600_000_000_000 && mastery[id]?.correct !== 0)).toHaveLength(6);
  });

  it('redistributes missing bucket capacity without duplicating ids', () => {
    const all = entries(24);
    const mastery = Object.fromEntries(
      all.slice(0, 3).map((entry) => [entry.id, record({ correct: 0 })]),
    );

    const ids = selectQuestionIds(all, mastery, 1, 20, 3, 1_700_000_000_000);

    expect(ids).toHaveLength(20);
    expect(new Set(ids).size).toBe(20);
    expect(ids.filter((id) => mastery[id]?.correct === 0)).toHaveLength(3);
  });

  it('fails closed when the selected level has fewer unique eligible entries than requested', () => {
    expect(() => selectQuestionIds(entries(19), {}, 1, 20, 3, 1_700_000_000_000)).toThrow(
      'Need 20 unique eligible entries for HSK 1; found 19',
    );
  });

  it('ignores entries from other levels', () => {
    const levelOne = entries(20);
    const otherLevel = entries(4).map((entry, index) => ({ ...entry, id: `hsk3-l2-${index + 1}`, level: 2 as const }));

    expect(selectQuestionIds([...levelOne, ...otherLevel], {}, 1, 20, 1, 1_700_000_000_000)).not.toContain('hsk3-l2-1');
  });
});
