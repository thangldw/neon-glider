import { expect, it, vi } from 'vitest';
import { createDefaultProfile, loadProfile, recordCompletedRun, saveProfile } from '../../src/storage/profile-storage';

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
  override setItem(): void { throw new DOMException('blocked', 'SecurityError'); }
}

it('stores high score, longest distance, run count and reduced motion', () => {
  const profile = recordCompletedRun(createDefaultProfile(), {
    score: 12_345.9,
    distance: 2_734.2,
  });

  expect(profile).toEqual({
    schemaVersion: 1,
    highScore: 12_345,
    longestDistance: 2_734.2,
    runCount: 1,
    reducedMotion: false,
  });
});

it('round-trips an exact compatible profile', () => {
  const storage = new MapStorage();
  const profile = { ...createDefaultProfile(), highScore: 42, longestDistance: 9.5, runCount: 3, reducedMotion: true };

  expect(saveProfile(storage, profile)).toBe(true);
  expect(loadProfile(storage)).toEqual(profile);
});

it('fails closed on incompatible profile data', () => {
  const storage = new MapStorage([['neon-glider.profile.v1', JSON.stringify({ schemaVersion: 1, highScore: -1 })]]);

  expect(loadProfile(storage)).toEqual(createDefaultProfile());
  expect(storage.getItem('neon-glider.profile.v1')).toBeNull();
});

it('fails safely when storage and notification callbacks are unavailable', () => {
  const unavailable = vi.fn(() => { throw new Error('notification failure'); });

  expect(saveProfile(new ThrowingStorage(), createDefaultProfile(), unavailable)).toBe(false);
  expect(unavailable).toHaveBeenCalledOnce();
});
