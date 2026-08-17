import { GAME_VERSION, MAX_SPEED, START_SPEED } from '../simulation/runner';
import type { EndReason, Lane, RunnerState, RunStatus, TrackEntity, TrackEntityKind } from '../simulation/runner-types';

export const RUN_STORAGE_KEY = 'neon-glider.run.v2';

const MAX_UINT32 = 0xffff_ffff;
const UINT32_MODULUS = 0x1_0000_0000n;
const RNG_INCREMENT = 0x6d2b79f5n;
const RNG_CALLS_PER_SEGMENT = 7n;
const ENTITY_KINDS: readonly TrackEntityKind[] = ['cube', 'prism', 'wall', 'crystal'];
const RUNNER_KEYS = [
  'schemaVersion', 'gameVersion', 'seed', 'rngState', 'status', 'endReason', 'reducedMotion', 'lane',
  'distance', 'speed', 'energy', 'score', 'multiplier', 'gates', 'crystals', 'segmentCursor', 'reachableLanes', 'entities',
] as const;
const ENTITY_KEYS = ['id', 'kind', 'lane', 'distance', 'segment'] as const;

type UnavailableHandler = () => void;

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

function isFiniteNonNegative(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

function isNonNegativeSafeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

function isUint32(value: unknown): value is number {
  return isNonNegativeSafeInteger(value) && value <= MAX_UINT32;
}

function isLane(value: unknown): value is Lane {
  return value === 0 || value === 1 || value === 2;
}

function isStatus(value: unknown): value is RunStatus {
  return value === 'playing' || value === 'paused' || value === 'complete';
}

function isEndReason(value: unknown): value is EndReason {
  return value === null || value === 'collision' || value === 'depleted';
}

function isTrackEntity(value: unknown, distance: number, segmentCursor: number): value is TrackEntity {
  if (!isRecord(value) || !hasExactKeys(value, ENTITY_KEYS)) return false;
  const { id, kind, lane, segment } = value;
  const entityDistance = value.distance;
  if (typeof id !== 'string' || id.trim().length === 0
    || !ENTITY_KINDS.includes(kind as TrackEntityKind) || !isLane(lane)
    || !isFiniteNonNegative(entityDistance) || !isNonNegativeSafeInteger(segment)
    || segment >= segmentCursor || entityDistance <= distance) {
    return false;
  }
  const expectedId = kind === 'crystal'
    ? `segment-${segment}-crystal`
    : `segment-${segment}-obstacle-`;
  return entityDistance === 80 + segment * 20
    && (kind === 'crystal' ? id === expectedId : id === `${expectedId}0` || id === `${expectedId}1`);
}

function expectedRngState(seed: number, segmentCursor: number): number {
  return Number((BigInt(seed) + BigInt(segmentCursor) * RNG_CALLS_PER_SEGMENT * RNG_INCREMENT) % UINT32_MODULUS);
}

function clearInvalid(storage: Storage, onUnavailable: UnavailableHandler): void {
  try {
    storage.removeItem(RUN_STORAGE_KEY);
  } catch {
    notify(onUnavailable);
  }
}

export function isRunnerState(value: unknown): value is RunnerState {
  if (!isRecord(value) || !hasExactKeys(value, RUNNER_KEYS)
    || !Array.isArray(value.reachableLanes) || !Array.isArray(value.entities)) {
    return false;
  }
  const distance = value.distance;
  const segmentCursor = value.segmentCursor;
  const seed = value.seed;

  if (value.schemaVersion !== 2 || value.gameVersion !== GAME_VERSION
    || !isUint32(seed) || !isUint32(value.rngState)
    || !isStatus(value.status) || !isEndReason(value.endReason)
    || (value.status === 'complete' ? value.endReason === null : value.endReason !== null)
    || typeof value.reducedMotion !== 'boolean' || !isLane(value.lane)
    || !isFiniteNonNegative(distance)
    || typeof value.speed !== 'number' || !Number.isFinite(value.speed) || value.speed < START_SPEED || value.speed > MAX_SPEED
    || typeof value.energy !== 'number' || !Number.isFinite(value.energy) || value.energy < 0 || value.energy > 100
    || !isFiniteNonNegative(value.score)
    || typeof value.multiplier !== 'number' || !Number.isFinite(value.multiplier) || value.multiplier < 1 || value.multiplier > 8
    || !isNonNegativeSafeInteger(value.gates) || !isNonNegativeSafeInteger(value.crystals) || !isNonNegativeSafeInteger(segmentCursor)
    || value.reachableLanes.length === 0 || value.reachableLanes.some((lane) => !isLane(lane))
    || new Set(value.reachableLanes).size !== value.reachableLanes.length
    || !value.entities.every((entity) => isTrackEntity(entity, distance, segmentCursor))
    || new Set(value.entities.map((entity) => entity.id)).size !== value.entities.length
    || value.rngState !== expectedRngState(seed, segmentCursor)) {
    return false;
  }

  return true;
}

export function saveRunner(storage: Storage, run: RunnerState, onUnavailable: UnavailableHandler = () => undefined): boolean {
  if (!isRunnerState(run)) return false;
  try {
    storage.setItem(RUN_STORAGE_KEY, JSON.stringify(run));
    return true;
  } catch {
    notify(onUnavailable);
    return false;
  }
}

export function loadRunner(storage: Storage, onUnavailable: UnavailableHandler = () => undefined): RunnerState | null {
  let raw: string | null;
  try {
    raw = storage.getItem(RUN_STORAGE_KEY);
  } catch {
    notify(onUnavailable);
    return null;
  }
  if (raw === null) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (isRunnerState(parsed)) return parsed;
  } catch {
    // Invalid serialized state is discarded below.
  }
  clearInvalid(storage, onUnavailable);
  return null;
}

export function clearRunner(storage: Storage, onUnavailable: UnavailableHandler = () => undefined): void {
  try {
    storage.removeItem(RUN_STORAGE_KEY);
  } catch {
    notify(onUnavailable);
  }
}
