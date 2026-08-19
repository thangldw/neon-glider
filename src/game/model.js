export const LANES = [-1, 0, 1];
export const PHASES = ["start", "countdown", "playing", "paused", "gameover"];
export const INITIAL_ENERGY = 100;

const BASE_SPEED = 28;
const MAX_SPEED = 54;
const HIT_Z = 2.4;
const SPAWN_Z = 118;

function seeded(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function nextPattern(state) {
  const random = seeded(state.seed + state.nextId);
  const shuffled = [...LANES].sort(() => random() - 0.5);
  const blockerCount = state.gate >= 3 && random() > 0.48 ? 2 : 1;
  const blockerLanes = shuffled.slice(0, blockerCount);
  const openLanes = LANES.filter((lane) => !blockerLanes.includes(lane));
  const pickupLane = openLanes[Math.floor(random() * openLanes.length)];
  let nextId = state.nextId;
  const objects = [];

  for (const lane of blockerLanes) {
    const blockerId = nextId++;
    objects.push({ id: blockerId, kind: "blocker", lane, z: SPAWN_Z, resolved: false });
    objects.push({ id: nextId++, kind: "warning", lane, z: SPAWN_Z - 12, resolved: false });
  }
  objects.push({ id: nextId++, kind: "pickup", lane: pickupLane, z: SPAWN_Z - 5, resolved: false });

  return { objects, nextId };
}

export function createGameState(seed = 1) {
  return {
    phase: "start",
    seed,
    lane: 0,
    score: 0,
    distance: 0,
    gate: 1,
    energy: INITIAL_ENERGY,
    multiplier: 1,
    speed: BASE_SPEED,
    spawnClock: 0,
    nextId: 1,
    objects: [],
  };
}

export function startRun(state) {
  return { ...createGameState(state.seed), phase: "playing" };
}

export function moveLane(state, delta) {
  if (state.phase !== "playing") return state;
  return { ...state, lane: Math.max(-1, Math.min(1, state.lane + delta)) };
}

export function togglePause(state) {
  if (state.phase === "playing") return { ...state, phase: "paused" };
  if (state.phase === "paused") return { ...state, phase: "playing" };
  return state;
}

export function stepGame(state, dtMs) {
  if (state.phase !== "playing") return { state, events: [] };

  const dtSeconds = Math.min(50, Math.max(0, dtMs)) / 1000;
  const speed = Math.min(MAX_SPEED, BASE_SPEED + state.distance / 240);
  const distance = state.distance + speed * dtSeconds * 0.32;
  const gate = Math.floor(distance / 500) + 1;
  const events = gate > state.gate ? ["gate"] : [];
  let energy = Math.max(0, state.energy - dtSeconds * (1.7 + speed * 0.018));
  let multiplier = state.multiplier;
  let objects = state.objects.map((object) => ({ ...object, z: object.z - speed * dtSeconds }));

  objects = objects.map((object) => {
    if (object.resolved || object.kind === "warning" || object.z > HIT_Z) return object;
    if (object.z < -8) return { ...object, resolved: true };
    if (object.lane !== state.lane) return { ...object, resolved: true };

    if (object.kind === "pickup") {
      energy = Math.min(INITIAL_ENERGY, energy + 14);
      multiplier = Math.min(4, Number((multiplier + 0.2).toFixed(1)));
      events.push("collect");
    } else if (object.kind === "blocker") {
      energy = Math.max(0, energy - 26);
      multiplier = 1;
      events.push("hit");
    }
    return { ...object, resolved: true };
  });

  objects = objects.filter((object) => object.z >= -8);
  const spawnInterval = Math.max(0.72, 1.32 - speed * 0.009);
  let spawnClock = state.spawnClock + dtSeconds;
  let nextId = state.nextId;
  if (spawnClock >= spawnInterval) {
    spawnClock -= spawnInterval;
    const pattern = nextPattern({ ...state, gate, nextId });
    objects.push(...pattern.objects);
    nextId = pattern.nextId;
  }

  let phase = state.phase;
  if (energy <= 0) {
    phase = "gameover";
    if (!events.includes("gameover")) events.push("gameover");
  }

  return {
    state: {
      ...state,
      phase,
      speed,
      distance,
      gate,
      energy,
      multiplier,
      score: state.score + speed * dtSeconds * 2.2 * multiplier,
      spawnClock,
      nextId,
      objects,
    },
    events,
  };
}
