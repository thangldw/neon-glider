import { expect, it } from 'vitest';
import { createRng } from '../../src/simulation/rng';
import { generateRunnerSegment, generateSegment, runnerRngStateAt } from '../../src/simulation/track-generator';
import type { Lane } from '../../src/simulation/runner-types';

it('is deterministic and leaves at least one lane open', () => {
  let state = 123;
  for (let segment = 0; segment < 200; segment += 1) {
    const first = generateSegment(state, segment, Math.floor(segment / 12));
    const second = generateSegment(state, segment, Math.floor(segment / 12));
    expect(first).toEqual(second);
    const blocked = new Set(first.entities.filter((entity) => entity.kind !== 'crystal').map((entity) => entity.lane));
    expect(blocked.size).toBeLessThanOrEqual(2);
    expect(first.entities.every((entity) => entity.segment === segment)).toBe(true);
    state = first.rngState;
  }
});

it('never places a crystal in a blocked lane within the same segment', () => {
  const generated = generateSegment(706, 8, 4);
  const blocked = new Set(generated.entities.filter((entity) => entity.kind !== 'crystal').map((entity) => entity.lane));
  expect(generated.entities.filter((entity) => entity.kind === 'crystal').every((entity) => !blocked.has(entity.lane))).toBe(true);
});

it('keeps at least one previously reachable lane open across adjacent segments', () => {
  let state = 123;
  let reachable: Lane[] = [0, 1, 2];
  for (let segment = 0; segment < 200; segment += 1) {
    const generated = generateSegment(state, segment, 4, reachable);
    const open = ([0, 1, 2] as Lane[]).filter((lane) => !generated.entities.some(
      (entity) => entity.kind !== 'crystal' && entity.lane === lane,
    ));
    expect(open.some((lane) => reachable.includes(lane))).toBe(true);
    expect(generated.reachableLanes).toEqual(open);
    state = generated.rngState;
    reachable = generated.reachableLanes;
  }
});

it('consumes a fixed RNG budget and emits collision-free IDs across long runs', () => {
  const rng = createRng(42);
  for (let index = 0; index < 7; index += 1) rng.next();
  expect(generateSegment(42, 0, 0).rngState).toBe(rng.state());
  expect(generateSegment(42, 0, 8).rngState).toBe(rng.state());

  const ids = new Set<string>();
  let state = 42;
  for (let segment = 0; segment < 10_000; segment += 1) {
    const generated = generateSegment(state, segment, Math.floor(segment / 12));
    for (const entity of generated.entities) {
      expect(ids.has(entity.id)).toBe(false);
      ids.add(entity.id);
    }
    state = generated.rngState;
  }
});

it('derives a random-access runner corridor without replaying earlier segments', () => {
  const seed = 91;
  const segment = 10_000_000;
  const previous = generateRunnerSegment(seed, segment - 1);
  const generated = generateRunnerSegment(seed, segment);

  expect(generated).toEqual(generateRunnerSegment(seed, segment));
  expect(generated.rngState).toBe(runnerRngStateAt(seed, segment + 1));
  expect(generated.reachableLanes.some((lane) => previous.reachableLanes.includes(lane))).toBe(true);
  expect(generated.entities.every((entity) => entity.segment === segment)).toBe(true);
});

it('rotates the shared production corridor while keeping every adjacent segment reachable', () => {
  for (const seed of [0, 1, 91, 0xffff_ffff]) {
    let previous: ReturnType<typeof generateRunnerSegment> | null = null;
    let previousCorridor: Lane | null = null;
    const blockedAcrossRun = new Set<Lane>();
    const soleOpenAcrossRun = new Set<Lane>();

    for (let segment = 0; segment < 10_000; segment += 1) {
      const generated = generateRunnerSegment(seed, segment, 8);
      const blocked = generated.entities
        .filter((entity) => entity.kind !== 'crystal')
        .map((entity) => entity.lane);
      blocked.forEach((lane) => blockedAcrossRun.add(lane));
      if (generated.reachableLanes.length === 1) soleOpenAcrossRun.add(generated.reachableLanes[0]);
      if (segment % 4 === 0) {
        expect(generated.corridorLane).toBeDefined();
        if (previousCorridor !== null) {
          expect(Math.abs(generated.corridorLane! - previousCorridor)).toBeLessThanOrEqual(1);
        }
        previousCorridor = generated.corridorLane!;
      }
      if (previous) {
        expect(
          generated.reachableLanes.some((lane) => previous?.reachableLanes.includes(lane)),
          `seed ${seed}, segment ${segment}`,
        ).toBe(true);
      }
      previous = generated;
    }

    expect([...blockedAcrossRun].sort()).toEqual([0, 1, 2]);
    expect([...soleOpenAcrossRun].sort()).toEqual([0, 1, 2]);
  }
});

it('rejects invalid numeric inputs without imposing a run-distance cap', () => {
  expect(() => generateSegment(Number.NaN, 0, 0)).toThrow(RangeError);
  expect(() => generateSegment(1, -1, 0)).toThrow(RangeError);
  expect(() => generateSegment(1, Math.floor((Number.MAX_SAFE_INTEGER - 80) / 20) + 1, 0)).not.toThrow();
  expect(() => generateSegment(1, Number.MAX_SAFE_INTEGER + 1, 0)).toThrow(RangeError);
});
