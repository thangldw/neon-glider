import type { HanziEntry, HskLevel } from '../content/types';
import { createRng } from './rng';
import type { MasteryRecord } from './types';

export interface QuestionSelection {
  questionIds: string[];
  rngState: number;
}

type BucketName = 'weak' | 'due' | 'new' | 'other';
type Buckets = Record<BucketName, HanziEntry[]>;

function shuffle<T>(items: readonly T[], next: () => number): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(next() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function targets(count: number): Record<Exclude<BucketName, 'other'>, number> {
  const weak = Math.floor(count * 0.5);
  const due = Math.floor(count * 0.3);
  return { weak, due, new: count - weak - due };
}

function isWeak(record: MasteryRecord | undefined): boolean {
  return Boolean(record && record.attempts > 0 && (record.correct < record.attempts || record.streak === 0));
}

function isDue(record: MasteryRecord | undefined, now: number): boolean {
  return Boolean(record && record.attempts > 0 && record.nextReviewAt <= now);
}

function isNew(record: MasteryRecord | undefined): boolean {
  return !record || record.attempts <= 1;
}

/**
 * Buckets are exclusive: weak wins over due, due wins over new, and any
 * remaining selected-level term is a fallback item for deterministic filling.
 */
function classify(entries: readonly HanziEntry[], mastery: Record<string, MasteryRecord>, now: number): Buckets {
  return entries.reduce<Buckets>((buckets, entry) => {
    const record = mastery[entry.id];
    if (isWeak(record)) buckets.weak.push(entry);
    else if (isDue(record, now)) buckets.due.push(entry);
    else if (isNew(record)) buckets.new.push(entry);
    else buckets.other.push(entry);
    return buckets;
  }, { weak: [], due: [], new: [], other: [] });
}

function assertInput(
  entries: readonly HanziEntry[],
  level: HskLevel,
  count: number,
  seed: number,
  now: number,
): HanziEntry[] {
  if (!Number.isInteger(count) || count < 1) throw new Error('count must be a positive integer');
  if (!Number.isFinite(seed)) throw new Error('seed must be finite');
  if (!Number.isFinite(now)) throw new Error('now must be finite');

  const eligible = entries.filter((entry) => entry.level === level);
  const ids = new Set<string>();
  for (const entry of eligible) {
    if (!entry.id) throw new Error('eligible entries must have non-empty ids');
    if (ids.has(entry.id)) throw new Error(`Duplicate eligible entry id: ${entry.id}`);
    ids.add(entry.id);
  }
  if (eligible.length < count) {
    throw new Error(`Need ${count} unique eligible entries for HSK ${level}; found ${eligible.length}`);
  }
  return eligible;
}

export function selectQuestions(
  entries: readonly HanziEntry[],
  mastery: Record<string, MasteryRecord>,
  level: HskLevel,
  count: number,
  seed: number,
  now: number,
): QuestionSelection {
  const eligible = assertInput(entries, level, count, seed, now);
  const rng = createRng(seed);
  const buckets = classify(eligible, mastery, now);
  const shuffled: Buckets = {
    weak: shuffle(buckets.weak, rng.next),
    due: shuffle(buckets.due, rng.next),
    new: shuffle(buckets.new, rng.next),
    other: shuffle(buckets.other, rng.next),
  };
  const positions: Record<BucketName, number> = { weak: 0, due: 0, new: 0, other: 0 };
  const selection: HanziEntry[] = [];

  for (const name of ['weak', 'due', 'new'] as const) {
    const take = Math.min(targets(count)[name], shuffled[name].length);
    selection.push(...shuffled[name].slice(0, take));
    positions[name] = take;
  }

  // Deterministic redistribution prioritizes the original weak/due/new order,
  // then mature fallback items, after each bucket has met its target.
  for (const name of ['weak', 'due', 'new', 'other'] as const) {
    while (selection.length < count && positions[name] < shuffled[name].length) {
      selection.push(shuffled[name][positions[name]]);
      positions[name] += 1;
    }
  }

  const ordered = shuffle(selection, rng.next);
  return { questionIds: ordered.map((entry) => entry.id), rngState: rng.state() };
}

export function selectQuestionIds(
  entries: readonly HanziEntry[],
  mastery: Record<string, MasteryRecord>,
  level: HskLevel,
  count: number,
  seed: number,
  now: number,
): string[] {
  return selectQuestions(entries, mastery, level, count, seed, now).questionIds;
}
