import { expect, it } from 'vitest';
import { createRng } from '../../src/simulation/rng';
import { generateSegment } from '../../src/simulation/track-generator';

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

it('rejects numeric inputs that could make serialized positions ambiguous', () => {
  expect(() => generateSegment(Number.NaN, 0, 0)).toThrow(RangeError);
  expect(() => generateSegment(1, -1, 0)).toThrow(RangeError);
  expect(() => generateSegment(1, Math.floor((Number.MAX_SAFE_INTEGER - 80) / 20) + 1, 0)).toThrow(RangeError);
});
