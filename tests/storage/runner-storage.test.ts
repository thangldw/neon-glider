import { expect, it, vi } from 'vitest';
import { advanceRunner, createRunner, moveRunnerLane } from '../../src/simulation/runner';
import { isRunnerState, loadRunner, saveRunner } from '../../src/storage/runner-storage';

class MapStorage implements Storage {
  private readonly values = new Map<string, string>();

  constructor(entries: ReadonlyArray<readonly [string, string]> = []) {
    for (const [key, value] of entries) this.values.set(key, value);
  }

  get length(): number { return this.values.size; }
  clear(): void { this.values.clear(); }
  getItem(key: string): string | null { return this.values.get(key) ?? null; }
  key(index: number): string | null { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string): void { this.values.delete(key); }
  setItem(key: string, value: string): void { this.values.set(key, value); }
}

class ThrowingStorage extends MapStorage {
  override getItem(): string | null { throw new DOMException('blocked', 'SecurityError'); }
}

it('round-trips an exact compatible runner state', () => {
  const storage = new MapStorage();
  const run = createRunner(91, true);

  expect(saveRunner(storage, run)).toBe(true);
  expect(loadRunner(storage)).toEqual(run);
});

it.each([
  { speed: 53 },
  { multiplier: 8.25 },
  { energy: -1 },
  { gates: 1 },
  { status: 'complete', endReason: null },
  { gameVersion: 'hanzi-glider' },
  { reachableLanes: [0, 0] },
  { unexpected: true },
])('rejects corrupt state %o', (patch) => {
  expect(isRunnerState({ ...createRunner(1), ...patch })).toBe(false);
});

it('rejects states whose random continuation or entities are inconsistent', () => {
  const run = createRunner(1);
  const entity = run.entities[0];
  const changedReachableLanes = run.reachableLanes.length === 1
    ? [run.reachableLanes[0] === 0 ? 1 : 0]
    : [run.reachableLanes[0]];

  expect(isRunnerState({ ...run, rngState: (run.rngState + 1) >>> 0 })).toBe(false);
  expect(isRunnerState({ ...run, entities: [] })).toBe(false);
  expect(isRunnerState({ ...run, entities: [{ ...entity, distance: entity.distance + 1 }, ...run.entities.slice(1)] })).toBe(false);
  expect(isRunnerState({ ...run, entities: [{ ...entity, id: 'different' }, ...run.entities.slice(1)] })).toBe(false);
  expect(isRunnerState({ ...run, entities: [{ ...entity, lane: entity.lane === 0 ? 1 : 0 }, ...run.entities.slice(1)] })).toBe(false);
  expect(isRunnerState({ ...run, entities: [{ ...entity, kind: entity.kind === 'crystal' ? 'cube' : 'crystal' }, ...run.entities.slice(1)] })).toBe(false);
  expect(isRunnerState({ ...run, entities: [{ ...entity }, { ...entity }] })).toBe(false);
  expect(isRunnerState({ ...run, reachableLanes: changedReachableLanes })).toBe(false);
});

it('accepts a legitimate progressed state after crossed entities are removed', () => {
  let run = createRunner(1);

  for (let tick = 0; tick < 13; tick += 1) {
    const nextObstacleDistance = Math.min(...run.entities.filter((entity) => entity.kind !== 'crystal').map((entity) => entity.distance));
    const blockedLanes = run.entities
      .filter((entity) => entity.kind !== 'crystal' && entity.distance === nextObstacleDistance)
      .map((entity) => entity.lane);
    const safeLane = ([0, 1, 2] as const).find((lane) => !blockedLanes.includes(lane));
    run = moveRunnerLane(run, Math.sign((safeLane ?? run.lane) - run.lane));
    run = advanceRunner(run, 0.25);
  }

  expect(run).toMatchObject({ status: 'playing' });
  expect(run.distance).toBeGreaterThan(80);
  expect(run.entities.some((entity) => entity.distance <= run.distance)).toBe(false);
  expect(isRunnerState(run)).toBe(true);
});

it('clears corrupt JSON and reports unavailable storage without throwing', () => {
  const storage = new MapStorage([['neon-glider.run.v2', '{bad']]);
  expect(loadRunner(storage)).toBeNull();
  expect(storage.getItem('neon-glider.run.v2')).toBeNull();

  const unavailable = vi.fn(() => { throw new Error('notification failure'); });
  expect(loadRunner(new ThrowingStorage(), unavailable)).toBeNull();
  expect(unavailable).toHaveBeenCalledOnce();
});
