import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/simulation/rng';

describe('createRng', () => {
  it('replays the same sequence and exposes the advanced state', () => {
    const first = createRng(42);
    const second = createRng(42);

    expect([first.next(), first.next(), first.next()]).toEqual([
      second.next(),
      second.next(),
      second.next(),
    ]);
    expect(first.state()).toBe(second.state());
    expect(first.state()).not.toBe(42);
  });

  it('normalizes a negative seed to an unsigned serializable state', () => {
    const rng = createRng(-1);

    rng.next();

    expect(rng.state()).toBeGreaterThanOrEqual(0);
    expect(rng.state()).toBeLessThanOrEqual(0xffffffff);
  });
});
