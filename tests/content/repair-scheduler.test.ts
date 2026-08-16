import { describe, expect, it } from 'vitest';
import { runRepairRound } from '../../scripts/repair-scheduler.mts';

describe('runRepairRound', () => {
  it('continues later batches while deferring rejected and structurally failed items', async () => {
    const calls: number[][] = [];
    const accepted: string[] = [];
    const deferred = await runRepairRound(
      [1, 2, 3, 4, 5],
      2,
      async (items) => {
        calls.push(items);
        if (items[0] === 3) throw new Error('invalid structure');
        return { accepted: items.filter((item) => item % 2 === 1).map(String), rejected: items.filter((item) => item % 2 === 0) };
      },
      async (items) => { accepted.push(...items); },
    );

    expect(calls).toEqual([[1, 2], [3, 4], [5]]);
    expect(accepted).toEqual(['1', '5']);
    expect(deferred).toEqual([2, 3, 4]);
  });
});
