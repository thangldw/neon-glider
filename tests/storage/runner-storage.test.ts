import { expect, it, vi } from 'vitest';
import { createRunner } from '../../src/simulation/runner';
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

  expect(isRunnerState({ ...run, rngState: (run.rngState + 1) >>> 0 })).toBe(false);
  expect(isRunnerState({ ...run, entities: [{ ...entity, distance: entity.distance + 1 }, ...run.entities.slice(1)] })).toBe(false);
  expect(isRunnerState({ ...run, entities: [{ ...entity, id: 'different' }, ...run.entities.slice(1)] })).toBe(false);
  expect(isRunnerState({ ...run, entities: [{ ...entity }, { ...entity }] })).toBe(false);
});

it('clears corrupt JSON and reports unavailable storage without throwing', () => {
  const storage = new MapStorage([['neon-glider.run.v2', '{bad']]);
  expect(loadRunner(storage)).toBeNull();
  expect(storage.getItem('neon-glider.run.v2')).toBeNull();

  const unavailable = vi.fn(() => { throw new Error('notification failure'); });
  expect(loadRunner(new ThrowingStorage(), unavailable)).toBeNull();
  expect(unavailable).toHaveBeenCalledOnce();
});
