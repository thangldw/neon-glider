import type { RunnerState } from '../simulation/runner-types';

export interface RunnerProfile {
  schemaVersion: 1;
  highScore: number;
  longestDistance: number;
  runCount: number;
  reducedMotion: boolean;
}

export const PROFILE_STORAGE_KEY = 'neon-glider.profile.v1';

type UnavailableHandler = () => void;

const PROFILE_KEYS = ['schemaVersion', 'highScore', 'longestDistance', 'runCount', 'reducedMotion'] as const;

function notify(handler: UnavailableHandler): void {
  try {
    handler();
  } catch {
    // Storage fallback must stay available when telemetry or UI notification fails.
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
  const actual = Object.keys(value);
  return actual.length === keys.length && actual.every((key) => keys.includes(key));
}

function isProfile(value: unknown): value is RunnerProfile {
  if (!isRecord(value) || !hasExactKeys(value, PROFILE_KEYS)) return false;
  return value.schemaVersion === 1
    && typeof value.highScore === 'number' && Number.isSafeInteger(value.highScore) && value.highScore >= 0
    && typeof value.longestDistance === 'number' && Number.isFinite(value.longestDistance) && value.longestDistance >= 0
    && typeof value.runCount === 'number' && Number.isSafeInteger(value.runCount) && value.runCount >= 0
    && typeof value.reducedMotion === 'boolean';
}

function clearInvalid(storage: Storage, onUnavailable: UnavailableHandler): void {
  try {
    storage.removeItem(PROFILE_STORAGE_KEY);
  } catch {
    notify(onUnavailable);
  }
}

export function createDefaultProfile(): RunnerProfile {
  return {
    schemaVersion: 1,
    highScore: 0,
    longestDistance: 0,
    runCount: 0,
    reducedMotion: false,
  };
}

export function recordCompletedRun(profile: RunnerProfile, result: Pick<RunnerState, 'score' | 'distance'>): RunnerProfile {
  if (!isProfile(profile)) throw new TypeError('profile must be a compatible RunnerProfile');
  if (typeof result.score !== 'number' || !Number.isFinite(result.score) || result.score < 0
    || typeof result.distance !== 'number' || !Number.isFinite(result.distance) || result.distance < 0) {
    throw new TypeError('result must contain non-negative finite score and distance');
  }

  const score = Math.floor(result.score);
  if (!Number.isSafeInteger(score) || profile.runCount === Number.MAX_SAFE_INTEGER) {
    throw new RangeError('profile counters cannot exceed safe integer range');
  }
  return {
    ...profile,
    highScore: Math.max(profile.highScore, score),
    longestDistance: Math.max(profile.longestDistance, result.distance),
    runCount: profile.runCount + 1,
  };
}

export function loadProfile(storage: Storage, onUnavailable: UnavailableHandler = () => undefined): RunnerProfile {
  let raw: string | null;
  try {
    raw = storage.getItem(PROFILE_STORAGE_KEY);
  } catch {
    notify(onUnavailable);
    return createDefaultProfile();
  }
  if (raw === null) return createDefaultProfile();

  try {
    const parsed: unknown = JSON.parse(raw);
    if (isProfile(parsed)) return parsed;
  } catch {
    // Invalid serialized state is discarded below.
  }
  clearInvalid(storage, onUnavailable);
  return createDefaultProfile();
}

export function saveProfile(storage: Storage, profile: RunnerProfile, onUnavailable: UnavailableHandler = () => undefined): boolean {
  if (!isProfile(profile)) return false;
  try {
    storage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    return true;
  } catch {
    notify(onUnavailable);
    return false;
  }
}
