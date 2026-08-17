import { GATE_DISTANCE, GAME_VERSION, LOOKAHEAD_DISTANCE, MAX_SPEED, SEGMENT_LENGTH, START_SPEED } from '../simulation/runner';
import { generateSegment } from '../simulation/track-generator';
import type { EndReason, Lane, RunnerState, RunStatus, TrackEntity } from '../simulation/runner-types';

export const RUN_STORAGE_KEY = 'neon-glider.run.v2';

const RUNNER_KEYS = [
  'schemaVersion', 'gameVersion', 'seed', 'rngState', 'status', 'endReason', 'reducedMotion', 'lane',
  'distance', 'speed', 'energy', 'score', 'multiplier', 'gates', 'crystals', 'segmentCursor', 'reachableLanes', 'entities',
] as const;
const ENTITY_KEYS = ['id', 'kind', 'lane', 'distance', 'segment'] as const;
const INITIAL_REACHABLE_LANES: readonly Lane[] = [0, 1, 2];
// Bounds synchronous persisted-state validation to about 20 km of a standard 20 m segment track.
const MAX_PERSISTED_SEGMENTS = 1024;

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
  return isNonNegativeSafeInteger(value) && value <= 0xffff_ffff;
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

function reconstructTrack(seed: number, segmentCursor: number): Pick<RunnerState, 'rngState' | 'reachableLanes' | 'entities'> {
  let rngState = seed;
  let reachableLanes = [...INITIAL_REACHABLE_LANES];
  const entities: TrackEntity[] = [];
  for (let segment = 0; segment < segmentCursor; segment += 1) {
    const distance = 80 + segment * SEGMENT_LENGTH;
    const tier = Math.floor(Math.max(0, distance - LOOKAHEAD_DISTANCE) / GATE_DISTANCE);
    const generated = generateSegment(rngState, segment, tier, reachableLanes);
    rngState = generated.rngState;
    reachableLanes = generated.reachableLanes;
    entities.push(...generated.entities);
  }
  return { rngState, reachableLanes, entities };
}

function hasExactEntity(value: unknown, expected: TrackEntity): boolean {
  return isRecord(value) && hasExactKeys(value, ENTITY_KEYS)
    && value.id === expected.id
    && value.kind === expected.kind
    && value.lane === expected.lane
    && value.distance === expected.distance
    && value.segment === expected.segment;
}

function sameLanes(actual: unknown[], expected: readonly Lane[]): boolean {
  return actual.length === expected.length && actual.every((lane, index) => lane === expected[index]);
}

function sameEntities(actual: unknown[], expected: readonly TrackEntity[]): boolean {
  return actual.length === expected.length && actual.every((entity, index) => hasExactEntity(entity, expected[index]));
}

function expectedSegmentCursor(distance: number): number {
  return Math.floor((distance + LOOKAHEAD_DISTANCE - 80) / SEGMENT_LENGTH) + 1;
}

function hasBoundedCursor(status: RunStatus, distance: number, segmentCursor: number): boolean {
  const expected = expectedSegmentCursor(distance);
  if (!Number.isSafeInteger(expected) || expected > MAX_PERSISTED_SEGMENTS || segmentCursor > MAX_PERSISTED_SEGMENTS) {
    return false;
  }
  return status === 'complete'
    ? segmentCursor === expected || segmentCursor === expected - 1
    : segmentCursor === expected;
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
  const gates = value.gates;

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
    || !isNonNegativeSafeInteger(gates) || gates !== Math.floor(distance / GATE_DISTANCE)
    || !isNonNegativeSafeInteger(value.crystals) || !isNonNegativeSafeInteger(segmentCursor)
    || !hasBoundedCursor(value.status, distance, segmentCursor)) {
    return false;
  }

  const expected = reconstructTrack(seed, segmentCursor);
  const pendingEntities = expected.entities.filter((entity) => entity.distance > distance);
  return value.rngState === expected.rngState
    && sameLanes(value.reachableLanes, expected.reachableLanes)
    && sameEntities(value.entities, pendingEntities);
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
