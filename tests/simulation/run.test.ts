import { describe, expect, it } from 'vitest';
import { advanceRunner, createRunner, moveRunnerLane } from '../../src/simulation/runner';

describe('Neon Glider simulation', () => {
  it('creates a deterministic serializable run', () => {
    expect(createRunner(91)).toEqual(createRunner(91));
    expect(createRunner(91)).toMatchObject({
      schemaVersion: 3,
      gameVersion: 'neon-glider-2026-08-17',
      lane: 1,
      distance: 0,
      speed: 26,
      energy: 100,
      score: 0,
      multiplier: 1,
      gates: 0,
      crystals: 0,
      status: 'playing',
      endReason: null,
      reducedMotion: false,
    });
    expect(createRunner(91, true).reducedMotion).toBe(true);
    expect(() => createRunner(91, 'true' as never)).toThrow(RangeError);
  });

  it('moves exactly one lane and clamps the edges', () => {
    const center = createRunner(1);
    expect(moveRunnerLane(center, -1).lane).toBe(0);
    expect(moveRunnerLane(moveRunnerLane(center, -1), -1).lane).toBe(0);
    expect(moveRunnerLane(center, 1).lane).toBe(2);
  });

  it('advances distance, score and energy from one accepted delta', () => {
    const next = advanceRunner(createRunner(1), 0.25);
    expect(next.distance).toBeCloseTo(6.5);
    expect(next.score).toBeCloseTo(65);
    expect(next.energy).toBeCloseTo(99.375);
  });

  it('passes a gate and applies exact gate rewards', () => {
    const run = { ...createRunner(4), distance: 249, entities: [] };
    const next = advanceRunner(run, 1 / 26);
    expect(next).toMatchObject({ gates: 1, speed: 27.5, multiplier: 1.25, energy: 100 });
  });

  it('collects a crystal in the selected lane', () => {
    const run = { ...createRunner(5), energy: 50, entities: [
      { id: 'c', kind: 'crystal' as const, lane: 1 as const, distance: 5, segment: 0 },
    ] };
    const next = advanceRunner(run, 5 / 26);
    expect(next.crystals).toBe(1);
    expect(next.energy).toBeGreaterThan(50);
    expect(next.entities).toEqual([]);
  });

  it('ends immediately on an obstacle collision', () => {
    const run = { ...createRunner(6), entities: [
      { id: 'o', kind: 'cube' as const, lane: 1 as const, distance: 5, segment: 0 },
    ] };
    expect(advanceRunner(run, 5 / 26)).toMatchObject({ status: 'complete', endReason: 'collision' });
  });

  it('stops a collision tick at impact without applying later events', () => {
    const run = {
      ...createRunner(6),
      entities: [
        { id: 'impact', kind: 'cube' as const, lane: 1 as const, distance: 5, segment: 0 },
        { id: 'later-crystal', kind: 'crystal' as const, lane: 1 as const, distance: 6, segment: 0 },
      ],
    };

    const next = advanceRunner(run, 0.25);

    expect(next).toMatchObject({
      distance: 5,
      score: 50,
      energy: 100 - (2.5 * 5) / 26,
      crystals: 0,
      status: 'complete',
      endReason: 'collision',
    });
    expect(next.entities).toEqual([{ id: 'later-crystal', kind: 'crystal', lane: 1, distance: 6, segment: 0 }]);
  });

  it('ends when energy reaches zero and never exceeds speed or multiplier caps', () => {
    const depleted = advanceRunner({ ...createRunner(7), energy: 0.01, entities: [] }, 0.25);
    expect(depleted).toMatchObject({ status: 'complete', endReason: 'depleted', energy: 0 });
    const capped = advanceRunner({ ...createRunner(8), gates: 40, speed: 52, multiplier: 8, entities: [] }, 0.1);
    expect(capped.speed).toBe(52);
    expect(capped.multiplier).toBe(8);
  });

  it('rejects invalid deltas and leaves a non-playing state unchanged', () => {
    const run = createRunner(9);
    for (const delta of [-0.01, 0.2500001, 1, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(() => advanceRunner(run, delta)).toThrow(RangeError);
    }
    const paused = { ...run, status: 'paused' as const };
    expect(advanceRunner(paused, Number.NaN)).toBe(paused);
  });

  it('does not mutate the input state while advancing', () => {
    const run = { ...createRunner(10), entities: [
      { id: 'crystal', kind: 'crystal' as const, lane: 1 as const, distance: 5, segment: 0 },
    ] };
    const next = advanceRunner(run, 5 / 26);
    expect(run).toMatchObject({ distance: 0, energy: 100, crystals: 0 });
    expect(run.entities).toHaveLength(1);
    expect(next).not.toBe(run);
  });
});
