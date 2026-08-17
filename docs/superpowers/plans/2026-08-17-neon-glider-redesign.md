# Neon Glider Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the HSK learning game with a neon Three.js endless runner that matches the pinned reference image while remaining a static GitHub Pages build.

**Architecture:** A deterministic simulation owns lanes, distance, energy, gates, score, procedural entities, collisions, and persistence. A renderer adapter mirrors immutable simulation snapshots into procedural tunnel, ship, obstacle, collectible, and post-processing objects. A DOM controller owns menus, HUD, countdown, pause, results, browser lifecycle, storage, and test-only hooks.

**Tech Stack:** TypeScript 7, Vite 8, Three.js 0.185, Three.js post-processing modules, Vitest/jsdom, Playwright Chromium, `@phosphor-icons/web`, GitHub Pages via `gh-pages`.

## Global Constraints

- The approved spec is `docs/superpowers/specs/2026-08-17-neon-glider-redesign.md`; it supersedes the prior Hanzi Glider spec.
- The pinned visual target is `docs/superpowers/specs/assets/neon-glider-reference.png`, SHA-256 `f997cc6f181984faa513d6756ea097f7470a7412089a9de8be7fa8381f3bcfc9`.
- Remove all HSK content, translation, mastery, importer, and content-review surfaces rather than hiding them.
- Keep simulation state outside Three.js objects; render objects never own scoring, collisions, generation, or saveable state.
- Use deterministic seeded generation and fail closed on incompatible persisted state.
- Preserve keyboard, pointer, touch, pause, visibility, context-loss, storage-failure, and reload-countdown behavior.
- The production download target is 3–8 MB uncompressed.
- Target at most 60 draw calls on desktop and 45 on mobile during normal gameplay.
- Sustained frames above 50 ms, invisible outer-lane ship positions, unreadable obstacles, or HUD clipping are release blockers.
- Do not deploy without a confirmed Git remote and GitHub Pages branch configuration.
- Do not commit `.superpowers`, `dist`, browser screenshots, traces, or Playwright results.

---

### Task 1: Deterministic Endless-Runner Simulation

**Files:**
- Preserve: `src/simulation/rng.ts`
- Create: `src/simulation/runner-types.ts`
- Create: `src/simulation/track-generator.ts`
- Create: `src/simulation/runner.ts`
- Create: `tests/simulation/track-generator.test.ts`
- Replace: `tests/simulation/run.test.ts`

**Interfaces:**
- Consumes: `createRng(initialState: number)` from `src/simulation/rng.ts`.
- Produces: `Lane`, `TrackEntity`, `RunnerState`, `createRunner(seed)`, `moveRunnerLane(run, direction)`, and `advanceRunner(run, deltaSeconds)`.

- [ ] **Step 1: Define the serializable state and constants in a failing test**

```ts
// tests/simulation/run.test.ts
import { describe, expect, it } from 'vitest';
import { advanceRunner, createRunner, moveRunnerLane } from '../../src/simulation/runner';

describe('Neon Glider simulation', () => {
  it('creates a deterministic serializable run', () => {
    expect(createRunner(91)).toEqual(createRunner(91));
    expect(createRunner(91)).toMatchObject({
      schemaVersion: 2,
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
    });
  });

  it('moves exactly one lane and clamps the edges', () => {
    const center = createRunner(1);
    expect(moveRunnerLane(center, -1).lane).toBe(0);
    expect(moveRunnerLane(moveRunnerLane(center, -1), -1).lane).toBe(0);
    expect(moveRunnerLane(center, 1).lane).toBe(2);
  });

  it('advances distance, score and energy from one accepted delta', () => {
    const next = advanceRunner(createRunner(1), 1);
    expect(next.distance).toBeCloseTo(26);
    expect(next.score).toBeCloseTo(260);
    expect(next.energy).toBeCloseTo(97.5);
  });
});
```

- [ ] **Step 2: Run the reducer test and verify RED**

Run: `npm test -- tests/simulation/run.test.ts`

Expected: FAIL because `runner-types.ts` and the runner exports do not exist.

- [ ] **Step 3: Implement the state contract**

```ts
// src/simulation/runner-types.ts
export type Lane = 0 | 1 | 2;
export type RunStatus = 'playing' | 'paused' | 'complete';
export type EndReason = 'collision' | 'depleted' | null;
export type TrackEntityKind = 'cube' | 'prism' | 'wall' | 'crystal';

export interface TrackEntity {
  id: string;
  kind: TrackEntityKind;
  lane: Lane;
  distance: number;
  segment: number;
}

export interface RunnerState {
  schemaVersion: 2;
  gameVersion: 'neon-glider-2026-08-17';
  seed: number;
  rngState: number;
  status: RunStatus;
  endReason: EndReason;
  lane: Lane;
  distance: number;
  speed: number;
  energy: number;
  score: number;
  multiplier: number;
  gates: number;
  crystals: number;
  segmentCursor: number;
  entities: TrackEntity[];
}
```

Implement these exported constants in `runner.ts`:

```ts
export const GAME_VERSION = 'neon-glider-2026-08-17' as const;
export const START_SPEED = 26;
export const MAX_SPEED = 52;
export const START_ENERGY = 100;
export const GATE_DISTANCE = 250;
export const SEGMENT_LENGTH = 20;
export const LOOKAHEAD_DISTANCE = 600;
```

`createRunner(seed)` normalizes `seed >>> 0`, starts in lane `1`, and fills deterministic entities through the initial lookahead.

- [ ] **Step 4: Specify deterministic, reachable track generation**

```ts
// tests/simulation/track-generator.test.ts
import { expect, it } from 'vitest';
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
```

Implement:

```ts
export interface GeneratedSegment {
  rngState: number;
  entities: TrackEntity[];
}

export function generateSegment(rngState: number, segment: number, tier: number): GeneratedSegment;
```

Use one obstacle before tier `2`, one or two thereafter, sample unique lanes, select `cube`, `prism`, or `wall`, and optionally place one crystal in an open lane. The absolute spawn distance is `80 + segment * SEGMENT_LENGTH`. Consume RNG in a fixed order even when optional entities are absent.

- [ ] **Step 5: Specify gates, crystals, collisions, depletion, and caps**

```ts
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

it('ends when energy reaches zero and never exceeds speed or multiplier caps', () => {
  const depleted = advanceRunner({ ...createRunner(7), energy: 0.01, entities: [] }, 1);
  expect(depleted).toMatchObject({ status: 'complete', endReason: 'depleted', energy: 0 });
  const capped = advanceRunner({ ...createRunner(8), gates: 40, speed: 52, multiplier: 8, entities: [] }, 0.1);
  expect(capped.speed).toBe(52);
  expect(capped.multiplier).toBe(8);
});
```

Implement `advanceRunner` with finite `deltaSeconds` in `[0, 0.25]`; reject other values with `RangeError`. Process gate crossing, entities crossed in `(oldDistance, newDistance]`, score, energy, and lookahead in deterministic order. A complete or paused run is returned unchanged.

- [ ] **Step 6: Run simulation tests and full suite**

Run:

```bash
npm test -- tests/simulation/rng.test.ts tests/simulation/track-generator.test.ts tests/simulation/run.test.ts
npm test
```

Expected: new simulation tests PASS; existing application tests remain PASS because the new runner modules are parallel to the old learning runtime.

- [ ] **Step 7: Commit the simulation**

```bash
git add src/simulation/runner-types.ts src/simulation/track-generator.ts src/simulation/runner.ts tests/simulation/run.test.ts tests/simulation/track-generator.test.ts
git commit -m "feat: add deterministic Neon Glider simulation"
```

---

### Task 2: Runner Session and Profile Persistence

**Files:**
- Create: `src/storage/runner-storage.ts`
- Create: `src/storage/profile-storage.ts`
- Create: `tests/storage/runner-storage.test.ts`
- Create: `tests/storage/profile-storage.test.ts`

**Interfaces:**
- Consumes: `RunnerState` and `GAME_VERSION` from Task 1.
- Produces: strict active-run and persistent-profile adapters for Task 5.

- [ ] **Step 1: Write strict active-run validation tests**

```ts
import { expect, it, vi } from 'vitest';
import { createRunner } from '../../src/simulation/runner';
import { isRunnerState, loadRunner, saveRunner } from '../../src/storage/runner-storage';

class MapStorage implements Storage {
  private readonly values = new Map<string, string>();
  constructor(entries: ReadonlyArray<readonly [string, string]> = []) {
    for (const [key, value] of entries) this.values.set(key, value);
  }
  get length() { return this.values.size; }
  clear() { this.values.clear(); }
  getItem(key: string) { return this.values.get(key) ?? null; }
  key(index: number) { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string) { this.values.delete(key); }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

class ThrowingStorage extends MapStorage {
  override getItem(): string | null { throw new DOMException('blocked', 'SecurityError'); }
}

it('round-trips an exact compatible runner state', () => {
  const storage = new MapStorage();
  const run = createRunner(91);
  expect(saveRunner(storage, run)).toBe(true);
  expect(loadRunner(storage)).toEqual(run);
});

it.each([
  { speed: 53 },
  { multiplier: 8.25 },
  { energy: -1 },
  { status: 'complete', endReason: null },
  { gameVersion: 'hanzi-glider' },
])('rejects corrupt state %o', (patch) => {
  expect(isRunnerState({ ...createRunner(1), ...patch })).toBe(false);
});

it('clears corrupt JSON and reports unavailable storage without throwing', () => {
  const storage = new MapStorage([['neon-glider.run.v2', '{bad']]);
  expect(loadRunner(storage)).toBeNull();
  expect(storage.getItem('neon-glider.run.v2')).toBeNull();
  const unavailable = vi.fn();
  expect(loadRunner(new ThrowingStorage(), unavailable)).toBeNull();
  expect(unavailable).toHaveBeenCalledOnce();
});
```

- [ ] **Step 2: Run the active-run test and verify RED**

Run: `npm test -- tests/storage/runner-storage.test.ts`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the active-run adapter**

```ts
export const RUN_STORAGE_KEY = 'neon-glider.run.v2';

export function isRunnerState(value: unknown): value is RunnerState;
export function saveRunner(storage: Storage, run: RunnerState, onUnavailable?: () => void): boolean;
export function loadRunner(storage: Storage, onUnavailable?: () => void): RunnerState | null;
export function clearRunner(storage: Storage, onUnavailable?: () => void): void;
```

Require exact keys, safe uint32 seed/RNG state, finite numeric counters, valid lane/status/end-reason pairs, unique entity IDs, valid entity lanes/kinds, nonnegative segment/distance values, `speed` in `[26, 52]`, `energy` in `[0, 100]`, and multiplier in `[1, 8]`. Clear invalid stored state. Notification callbacks must not be able to break fallback behavior.

- [ ] **Step 4: Write and implement profile tests**

```ts
import { createDefaultProfile, loadProfile, recordCompletedRun, saveProfile } from '../../src/storage/profile-storage';

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

it('fails closed on incompatible profile data', () => {
  const storage = new MapStorage([['neon-glider.profile.v1', JSON.stringify({ schemaVersion: 1, highScore: -1 })]]);
  expect(loadProfile(storage)).toEqual(createDefaultProfile());
});
```

Implement:

```ts
export interface RunnerProfile {
  schemaVersion: 1;
  highScore: number;
  longestDistance: number;
  runCount: number;
  reducedMotion: boolean;
}

export const PROFILE_STORAGE_KEY = 'neon-glider.profile.v1';
export function createDefaultProfile(): RunnerProfile;
export function recordCompletedRun(profile: RunnerProfile, result: Pick<RunnerState, 'score' | 'distance'>): RunnerProfile;
export function loadProfile(storage: Storage, onUnavailable?: () => void): RunnerProfile;
export function saveProfile(storage: Storage, profile: RunnerProfile, onUnavailable?: () => void): boolean;
```

- [ ] **Step 5: Verify persistence and commit**

Run:

```bash
npm test -- tests/storage/runner-storage.test.ts tests/storage/profile-storage.test.ts
npm test
git diff --check
```

Commit:

```bash
git add src/storage/runner-storage.ts src/storage/profile-storage.ts tests/storage/runner-storage.test.ts tests/storage/profile-storage.test.ts
git commit -m "feat: persist Neon Glider runs and records"
```

---

### Task 3: Procedural Neon Scene Objects

**Files:**
- Create: `src/render/neon/materials.ts`
- Create: `src/render/neon/ship.ts`
- Create: `src/render/neon/tunnel.ts`
- Create: `src/render/neon/entity-field.ts`
- Create: `tests/render/neon-materials.test.ts`
- Create: `tests/render/neon-ship.test.ts`
- Create: `tests/render/neon-tunnel.test.ts`
- Create: `tests/render/neon-entity-field.test.ts`

**Interfaces:**
- Consumes: `Lane`, `RunnerState`, and `TrackEntity` from Task 1.
- Produces: disposable renderer-owned objects used by Task 4.

- [ ] **Step 1: Specify the shared material palette**

```ts
import { expect, it, vi } from 'vitest';
import { createNeonMaterials } from '../../src/render/neon/materials';

it('creates the approved cyan-magenta metallic palette and disposes every material', () => {
  const materials = createNeonMaterials();
  expect(materials.cyan.emissive.getHex()).toBe(0x00cfff);
  expect(materials.magenta.emissive.getHex()).toBe(0xff20c8);
  expect(materials.metal.metalness).toBeGreaterThanOrEqual(0.8);
  const dispose = vi.spyOn(materials.cyan, 'dispose');
  materials.dispose();
  expect(dispose).toHaveBeenCalledOnce();
});
```

Implement a `NeonMaterials` factory containing cyan, magenta, dark metal, obstacle, crystal, and floor materials. Materials use `MeshStandardMaterial`; crystal may use `MeshPhysicalMaterial`. All resource ownership is explicit and disposal is idempotent.

- [ ] **Step 2: Specify the ship silhouette and animation contract**

```ts
it('builds the required named ship parts', () => {
  const ship = createNeonShip(createNeonMaterials());
  for (const name of ['fuselage', 'wing-left', 'wing-right', 'engine-left', 'engine-right', 'trail-left', 'trail-right']) {
    expect(ship.root.getObjectByName(name)).toBeTruthy();
  }
  ship.setLaneX(3, 0.2, false);
  expect(ship.root.rotation.z).toBeLessThan(0);
  ship.dispose();
});
```

Implement:

```ts
export interface NeonShip {
  root: THREE.Group;
  setLaneX(targetX: number, deltaSeconds: number, reducedMotion: boolean): void;
  update(elapsedSeconds: number, speed: number, reducedMotion: boolean): void;
  dispose(): void;
}
```

Build the armored fuselage, swept wings, engine pods, cockpit light, edge lights, and twin translucent trails from shared Three.js geometries/materials. Do not use raster placeholders or CSS art.

- [ ] **Step 3: Specify recycled octagonal tunnel geometry**

```ts
it('creates a bounded recycled tunnel with named gate and floor groups', () => {
  const tunnel = createNeonTunnel({ quality: 'desktop', materials: createNeonMaterials() });
  expect(tunnel.root.getObjectByName('tunnel-ribs')).toBeTruthy();
  expect(tunnel.root.getObjectByName('floor-panels')).toBeTruthy();
  expect(tunnel.root.getObjectByName('active-gate')).toBeTruthy();
  expect(tunnel.segmentCount).toBe(24);
  tunnel.update(1_000, 12);
  expect(tunnel.root.children.length).toBeLessThan(80);
  tunnel.dispose();
});

it('uses the reduced mobile segment budget', () => {
  expect(createNeonTunnel({ quality: 'mobile', materials: createNeonMaterials() }).segmentCount).toBe(16);
});
```

Implement octagonal ribs with shared `EdgesGeometry`/tube or box segments, instanced wall/floor panels, alternating cyan-magenta strips, a recyclable gate arch, and gate-number CanvasTexture. Expose:

```ts
export interface NeonTunnel {
  root: THREE.Group;
  segmentCount: number;
  update(distance: number, nextGate: number): void;
  dispose(): void;
}
```

- [ ] **Step 4: Specify obstacle and crystal reconciliation**

```ts
it('reuses meshes by deterministic entity id and removes stale entities', () => {
  const field = createEntityField(createNeonMaterials());
  const entity = { id: 's1-c', kind: 'crystal' as const, lane: 2 as const, distance: 100, segment: 1 };
  field.sync([entity], 20);
  const first = field.root.getObjectByName(entity.id);
  field.sync([entity], 30);
  expect(field.root.getObjectByName(entity.id)).toBe(first);
  field.sync([], 40);
  expect(field.root.getObjectByName(entity.id)).toBeUndefined();
  field.dispose();
});
```

Implement `createEntityField(materials)` with a pooled mesh per kind, lane mapping `[-3, 0, 3]`, obstacle silhouettes, crystal rotation, and deterministic Z projection from `entity.distance - playerDistance`.

- [ ] **Step 5: Run render-object tests and commit**

Run:

```bash
npm test -- tests/render/neon-materials.test.ts tests/render/neon-ship.test.ts tests/render/neon-tunnel.test.ts tests/render/neon-entity-field.test.ts
npm test
```

Commit:

```bash
git add src/render/neon tests/render/neon-*.test.ts
git commit -m "feat: build procedural neon tunnel scene"
```

---

### Task 4: Responsive Runner View and Post-processing

**Files:**
- Create: `src/render/neon/post-fx.ts`
- Create: `src/render/runner-view.ts`
- Create: `tests/render/post-fx.test.ts`
- Create: `tests/render/runner-view.test.ts`

**Interfaces:**
- Consumes: Task 1 snapshots and Task 3 scene factories.
- Produces: `createRunnerView(container, options): RunnerView` for Task 5.

- [ ] **Step 1: Specify optional post-processing with fallback**

```ts
import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import { createPostFx } from '../../src/render/neon/post-fx';

it('uses bloom when composer creation succeeds and direct rendering when it fails', () => {
  const renderer = rendererFixture();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const composed = createPostFx(renderer, scene, camera, { enabled: true, width: 800, height: 600 });
  composed.render();
  expect(renderer.render).not.toHaveBeenCalled();
  composed.dispose();

  const fallback = createPostFx(renderer, scene, camera, {
    enabled: true,
    width: 800,
    height: 600,
    createComposer: () => { throw new Error('unsupported'); },
  });
  fallback.render();
  expect(renderer.render).toHaveBeenCalledWith(scene, camera);
});
```

`post-fx.ts` imports `EffectComposer`, `RenderPass`, `UnrealBloomPass`, and `OutputPass` from `three/examples/jsm/postprocessing`. Use bloom strength near `1.25`, radius `0.45`, threshold `0.18`; mobile uses strength `0.9` and a lower internal resolution.

Define the renderer and post-processing adapters shared by tests and the view:

```ts
export interface RendererLike {
  readonly domElement: HTMLCanvasElement;
  readonly info?: {
    readonly render: { readonly calls: number };
    readonly memory: { readonly geometries: number; readonly textures: number };
  };
  setPixelRatio(value: number): void;
  setSize(width: number, height: number): void;
  render(scene: THREE.Scene, camera: THREE.Camera): void;
  setAnimationLoop(callback: null): void;
  dispose(): void;
  forceContextLoss?(): void;
}

export interface PostFx {
  render(): void;
  setSize(width: number, height: number): void;
  dispose(): void;
}
```

- [ ] **Step 2: Define the view contract in a failing test**

```ts
import { expect, it, vi } from 'vitest';
import { createRunner } from '../../src/simulation/runner';
import { createRunnerView, type RunnerView, type RunnerViewOptions } from '../../src/render/runner-view';

export interface RunnerView {
  setSnapshot(snapshot: RunnerState): void;
  setPaused(paused: boolean): void;
  render(elapsedSeconds: number): void;
  getDiagnostics(): RendererDiagnostics;
  getFramingDiagnostics(): { gliderNdcX: number; gliderNdcY: number; gliderVisible: boolean };
  dispose(): void;
}

export interface RunnerViewOptions {
  reducedMotion?: boolean;
  forceQuality?: 'desktop' | 'mobile';
  createRenderer?: (canvas: HTMLCanvasElement) => RendererLike;
  createPostFx?: typeof createPostFx;
  createResizeObserver?: (callback: ResizeObserverCallback) => Pick<ResizeObserver, 'observe' | 'disconnect'> | undefined;
  onContextLost?: () => void;
  onContextRestored?: () => void;
}

function rendererFixture(): RendererLike {
  const canvas = document.createElement('canvas');
  return {
    domElement: canvas,
    setPixelRatio: vi.fn(),
    setSize: vi.fn(),
    render: vi.fn(),
    setAnimationLoop: vi.fn(),
    dispose: vi.fn(),
    forceContextLoss: vi.fn(),
    info: { render: { calls: 0 }, memory: { geometries: 0, textures: 0 } },
  };
}

function setContainerSize(container: HTMLElement, width: number, height: number): void {
  Object.defineProperties(container, {
    clientWidth: { configurable: true, value: width },
    clientHeight: { configurable: true, value: height },
  });
}

function fixtureOptions(): RunnerViewOptions {
  return {
    createRenderer: () => rendererFixture(),
    createPostFx: (renderer, scene, camera) => ({
      render: () => renderer.render(scene, camera),
      setSize: vi.fn(),
      dispose: vi.fn(),
    }),
    createResizeObserver: () => ({ observe: vi.fn(), disconnect: vi.fn() }),
  };
}

it('mirrors snapshots without mutating simulation state', () => {
  const run = createRunner(9);
  const frozen = structuredClone(run);
  const view = createRunnerView(container, fixtureOptions());
  view.setSnapshot(run);
  view.render(1);
  expect(run).toEqual(frozen);
  view.dispose();
});
```

- [ ] **Step 3: Implement the chase-camera scene and authoritative visual clock**

`createRunnerView` must:

- create one renderer/canvas, scene, `PerspectiveCamera(64, aspect, 0.1, 220)`, ship, tunnel, entity field, lights, fog, streak particle pool, and optional post FX;
- cap pixel ratio at `2` desktop and `1.35` portrait/mobile;
- accept only finite monotonic frame deltas up to `0.25 s`;
- freeze its local visual clock while paused or context-lost;
- reconcile the latest immutable snapshot before rendering;
- keep the ship in the lower central quarter and adapt lane tracking/ship scale in portrait;
- expose renderer info without enabling production sampling by default.

- [ ] **Step 4: Cover resize, all-lane framing, lifecycle, and context restoration**

```ts
it.each([
  [1536, 1024],
  [412, 915],
])('keeps every lane ship position visible at %sx%s', (width, height) => {
  setContainerSize(container, width, height);
  const view = createRunnerView(container, fixtureOptions());
  for (const lane of [0, 1, 2] as const) {
    view.setSnapshot({ ...createRunner(1), lane });
    view.render(lane + 1);
    expect(view.getFramingDiagnostics().gliderVisible).toBe(true);
  }
  view.dispose();
});

it('pauses on context loss and rebuilds the exact snapshot transactionally', () => {
  const onContextLost = vi.fn();
  const onContextRestored = vi.fn();
  const view = createRunnerView(container, { ...fixtureOptions(), onContextLost, onContextRestored });
  const snapshot = { ...createRunner(2), distance: 333, gates: 1 };
  view.setSnapshot(snapshot);
  const canvas = container.querySelector('canvas');
  canvas?.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
  expect(onContextLost).toHaveBeenCalledOnce();
  canvas?.dispatchEvent(new Event('webglcontextrestored'));
  expect(onContextRestored).toHaveBeenCalledOnce();
  expect(view.getDiagnostics().geometries).toBeGreaterThan(0);
});
```

Also test idempotent disposal, resize-observer fallback, post-FX disposal, pooled resources, and multi-context restoration without duplicate canvases/listeners.

- [ ] **Step 5: Verify renderer tests and production build**

Run:

```bash
npm test -- tests/render/post-fx.test.ts tests/render/runner-view.test.ts
npm test
npm run build
```

- [ ] **Step 6: Commit the view**

```bash
git add src/render/neon/post-fx.ts src/render/runner-view.ts tests/render/post-fx.test.ts tests/render/runner-view.test.ts
git commit -m "feat: render responsive neon chase view"
```

---

### Task 5: Endless-Runner UI and App Controller

**Files:**
- Modify: `src/input/actions.ts`
- Replace: `src/ui/screens.ts`
- Replace: `src/ui/app-controller.ts`
- Modify: `src/main.ts`
- Replace: `src/styles.css`
- Modify: `index.html`
- Replace: `tests/ui/app-controller.test.ts`
- Replace: `tests/ui/screens-layout.test.ts`
- Modify: `tests/input/actions.test.ts`
- Modify: `tests/app-shell.test.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: Task 1 reducers, Task 2 storage, Task 4 `RunnerView`, existing input actions and diagnostics.
- Produces: the playable runtime, semantic HUD/screens, and query-gated E2E control surface.

- [ ] **Step 1: Install the maintained pause-icon library**

Run: `npm install @phosphor-icons/web`

Import only the regular icon font stylesheet from its documented package path. Render `<i class="ph ph-pause" aria-hidden="true"></i>` inside a button whose accessible name is `Tạm dừng`.

- [ ] **Step 2: Write semantic screen tests**

```ts
it('renders the approved sparse arcade HUD', () => {
  const screen = createGameScreen(vi.fn());
  screen.update({ ...createRunner(1), score: 127450, multiplier: 4.2, distance: 2734, gates: 11, energy: 73 });
  expect(screen.element.textContent).toContain('127,450');
  expect(screen.element.textContent).toContain('×4.2');
  expect(screen.element.textContent).toContain('2,734m');
  expect(screen.element.textContent).toContain('GATE 12');
  expect(screen.element.querySelector('[data-energy-bar]')?.getAttribute('aria-valuenow')).toBe('73');
  expect(screen.element.querySelector('[data-hsk], [data-content-notice]')).toBeNull();
});

it('renders collision and depletion results without learning content', () => {
  const collision = createResultScreen({ run: { ...createRunner(1), status: 'complete', endReason: 'collision' }, highScore: 100, onRestart: vi.fn(), onMenu: vi.fn() });
  expect(collision.textContent).toContain('VA CHẠM');
  expect(collision.textContent).not.toMatch(/HSK|chữ Hán|pinyin|từ cần xem lại/i);
});
```

Create Menu, Game/HUD, Countdown, Pause, Result, StorageWarning, and WebGLFatal screen factories. Menu copy is `NEON GLIDER` and `SỐNG SÓT. NÉ CHƯỚNG NGẠI. GIỮ NĂNG LƯỢNG.`.

- [ ] **Step 3: Write controller lifecycle tests**

```ts
function frameHarness() {
  let callback: FrameRequestCallback | null = null;
  let timestamp = 0;
  return {
    requestFrame(next: FrameRequestCallback) {
      callback = next;
      return 1;
    },
    advance(durationMs: number, stepMs = 100) {
      const target = timestamp + durationMs;
      while (timestamp < target) {
        timestamp = Math.min(target, timestamp + stepMs);
        const frame = callback;
        if (!frame) throw new Error('No scheduled frame');
        callback = null;
        frame(timestamp);
      }
    },
  };
}

function dependencies(overrides: Partial<AppControllerDependencies> = {}): AppControllerDependencies {
  const view: RunnerView = {
    setSnapshot: vi.fn(),
    setPaused: vi.fn(),
    render: vi.fn(),
    getDiagnostics: () => ({ drawCalls: 0, geometries: 0, textures: 0 }),
    getFramingDiagnostics: () => ({ gliderNdcX: 0, gliderNdcY: 0, gliderVisible: true }),
    dispose: vi.fn(),
  };
  return {
    loadRunner: () => null,
    saveRunner: vi.fn(() => true),
    clearRunner: vi.fn(),
    loadProfile: () => createDefaultProfile(),
    saveProfile: vi.fn(() => true),
    createRunnerView: () => view,
    bindActions: vi.fn(() => vi.fn()),
    createSeed: () => 1,
    requestFrame: vi.fn(() => 1),
    cancelFrame: vi.fn(),
    enableTestApi: true,
    ...overrides,
  };
}

it('starts, advances, checkpoints and completes one deterministic run', () => {
  const frames = frameHarness();
  const saveRunner = vi.fn(() => true);
  const app = createAppController(root, dependencies({
    requestFrame: frames.requestFrame,
    saveRunner,
    createSeed: () => 91,
  }));
  root.querySelector<HTMLButtonElement>('[data-action="start"]')?.click();
  frames.advance(1_000);
  expect(app.getState().run?.distance).toBeGreaterThan(0);
  expect(saveRunner).toHaveBeenCalled();
  app.destroy();
});

it('restores a compatible session only after a three-second countdown', () => {
  vi.useFakeTimers();
  const restored = { ...createRunner(2), distance: 500, status: 'playing' as const };
  const app = createAppController(root, dependencies({ loadRunner: () => restored }));
  expect(app.getState().screen).toBe('countdown');
  vi.advanceTimersByTime(2_999);
  expect(app.getState().screen).toBe('countdown');
  vi.advanceTimersByTime(1);
  expect(app.getState().screen).toBe('playing');
});

it('records a completed run exactly once and clears the active checkpoint', () => {
  const saveProfile = vi.fn(() => true);
  const clearRunner = vi.fn();
  const app = createAppController(root, dependencies({ saveProfile, clearRunner }));
  app.test?.forceEnd('collision');
  expect(saveProfile).toHaveBeenCalledOnce();
  expect(clearRunner).toHaveBeenCalledOnce();
});
```

Define the controller dependency contract before implementation:

```ts
export interface AppControllerDependencies {
  loadRunner?: (onUnavailable: () => void) => RunnerState | null;
  saveRunner?: (run: RunnerState, onUnavailable: () => void) => boolean;
  clearRunner?: (onUnavailable: () => void) => void;
  loadProfile?: (onUnavailable: () => void) => RunnerProfile;
  saveProfile?: (profile: RunnerProfile, onUnavailable: () => void) => boolean;
  createRunnerView?: (container: HTMLElement, options?: RunnerViewOptions) => RunnerView;
  bindActions?: typeof bindActions;
  createSeed?: () => number;
  requestFrame?: (callback: FrameRequestCallback) => number;
  cancelFrame?: (handle: number) => void;
  enableTestApi?: boolean;
}

export interface AppController {
  root: HTMLElement;
  getState(): { screen: AppScreen; run: RunnerState | null; profile: RunnerProfile };
  test?: NeonGliderE2E;
  destroy(): void;
}
```

- [ ] **Step 4: Implement the controller state machine**

States are `menu`, `countdown`, `playing`, `paused`, `result`, and `fatal`.

The animation frame is authoritative:

```ts
const renderFrame: FrameRequestCallback = (timestamp) => {
  const delta = frameClock.accept(timestamp);
  if (screen === 'playing' && run && delta > 0) {
    run = advanceRunner(run, delta);
    view?.setSnapshot(run);
    gameScreen?.update(run);
    checkpointAccumulator += delta;
    if (checkpointAccumulator >= 0.5) saveCheckpoint();
    if (run.status === 'complete') finishRun();
  }
  view?.render(timestamp / 1_000);
  frameHandle = requestFrame(renderFrame);
};
```

Pause/visibility/context loss resets the frame anchor. Resume always uses a fresh countdown. Only one view exists while gameplay is visible. Completion updates the profile and clears the active run exactly once.

- [ ] **Step 5: Add a query-gated E2E surface through the same reducers**

Only when `new URLSearchParams(location.search).get('e2e') === '1'`, expose:

```ts
export interface NeonGliderE2E {
  snapshot(): { screen: AppScreen; run: RunnerState | null; profile: RunnerProfile };
  setLane(lane: Lane): void;
  advance(seconds: number): void;
  forceEnd(reason: Exclude<EndReason, null>): void;
  diagnostics(): PerfSnapshot | null;
}
```

`advance` loops through the production `advanceRunner` reducer in steps no larger than `0.25`; it never assigns score, distance, energy, or entity state directly. The hook is absent without `?e2e=1`.

- [ ] **Step 6: Replace styling with the reference composition**

CSS requirements:

- black-violet full viewport and canvas;
- HUD labels in condensed uppercase styling with white metrics and magenta multiplier;
- score at top-left, distance/gate at top-right, energy bottom-center, pause bottom-right;
- no permanent cards over the center playfield;
- safe-area insets, minimum 44 px pause target, portrait stacking without overflow;
- visible focus treatment on controls only;
- reduced-motion removes UI animation and strong glows, not gameplay timing.

- [ ] **Step 7: Verify controller/UI and commit**

Run:

```bash
npm test -- tests/ui/app-controller.test.ts tests/ui/screens-layout.test.ts tests/input/actions.test.ts tests/app-shell.test.ts
npm test
npm run build
```

Commit:

```bash
git add package.json package-lock.json index.html src/main.ts src/styles.css src/input/actions.ts src/ui tests/ui tests/input/actions.test.ts tests/app-shell.test.ts
git commit -m "feat: integrate Neon Glider endless-runner flow"
```

---

### Task 6: Remove the Learning Stack and Rebase Release Tooling

**Files:**
- Delete: `content/`
- Delete: `scripts/build-content.mts`
- Delete: `scripts/draft-contract.mts`
- Delete: `scripts/draft-meanings.mts`
- Delete: `scripts/fetch-hsk3.mts`
- Delete: `scripts/ollama-transport.mts`
- Delete: `scripts/provenance.mts`
- Delete: `scripts/repair-checkpoint.mts`
- Delete: `scripts/repair-scheduler.mts`
- Delete: `scripts/repair-vietnamese-drafts.mts`
- Delete: `scripts/verify-content.mts`
- Delete: `src/content/`
- Delete: `src/render/course.ts`
- Delete: `src/render/game-view.ts`
- Delete: `src/render/glyph-texture.ts`
- Delete: `src/simulation/scheduler.ts`
- Delete: old learning `src/simulation/run.ts` and `src/simulation/types.ts` only after all imports use runner modules
- Delete: `src/storage/progress-storage.ts`
- Delete: `src/storage/run-storage.ts`
- Delete: `tests/content/`
- Delete: `tests/fixtures/hsk-page.html`
- Delete: old `tests/render/course.test.ts`, `tests/render/game-view.test.ts`, `tests/render/glyph-texture.test.ts`, `tests/simulation/scheduler.test.ts`, and `tests/storage/storage.test.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Replace: `README.md`
- Create: `tests/no-learning-content.test.ts`

**Interfaces:**
- Consumes: Tasks 1–5 replacement runtime.
- Produces: a learning-free tracked tree and release workflow.

- [ ] **Step 1: Add a failing tracked-tree regression**

```ts
// tests/no-learning-content.test.ts
import { execFileSync } from 'node:child_process';
import { expect, it } from 'vitest';

it('contains no learning runtime, content tooling, or HSK package scripts', () => {
  const files = execFileSync('git', ['ls-files'], { encoding: 'utf8' }).trim().split('\n');
  expect(files.some((file) => file.startsWith('content/') || file.startsWith('src/content/'))).toBe(false);
  expect(files.some((file) => file.includes('hsk') || file.includes('draft-meanings') || file.includes('repair-vietnamese'))).toBe(false);
  const pkg = JSON.parse(execFileSync('node', ['-p', 'JSON.stringify(require("./package.json"))'], { encoding: 'utf8' }));
  expect(Object.keys(pkg.scripts).some((name) => name.startsWith('content:'))).toBe(false);
});
```

- [ ] **Step 2: Run the regression and verify RED**

Run: `npm test -- tests/no-learning-content.test.ts`

Expected: FAIL because the tracked HSK/content files and package scripts still exist.

- [ ] **Step 3: Delete the superseded modules and tests**

Use `git rm` with the exact paths listed in this task. Before deletion, run `rg -n "src/content|content/|Hsk|Hanzi|Mastery|questionIds|meaningsVi|pinyin|content:" src tests e2e README.md package.json` and migrate every remaining production import to the Task 1–5 modules. Keep the historical design/plan documents and pinned redesign reference; history is documentation, not runtime/tooling.

- [ ] **Step 4: Remove learning-only dependencies and scripts**

Run:

```bash
npm uninstall cheerio csv-parse tsx
```

Set:

```json
{
  "name": "neon-glider",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "pretest:e2e": "npm run build",
    "test:e2e": "playwright test",
    "predeploy": "npm test && npm run build && npm run test:e2e",
    "deploy": "gh-pages -d dist"
  }
}
```

Keep existing dependency versions unless the new icon package requires a lockfile update.

- [ ] **Step 5: Add one-time legacy browser-key cleanup**

At bootstrap, attempt to remove `hanzi-glider.run` from session storage and `hanzi-glider.progress` from local storage inside isolated `try/catch` blocks. Failure must not prevent the new game from starting and must not display a save warning for the new keys.

- [ ] **Step 6: Replace README with accurate operator documentation**

Document:

- Neon Glider gameplay and controls;
- static architecture and supported state behavior;
- Node.js, npm, Git, and Playwright Chromium prerequisites;
- `npm ci`, `npm test`, `npm run test:e2e`, `npm run deploy`;
- GitHub Settings → Pages → Deploy from branch → `gh-pages` / root;
- session restoration limitation;
- performance evidence as single-host evidence only;
- no HSK/content-review instructions or release claims.

- [ ] **Step 7: Verify the removal and commit**

Run:

```bash
npm test -- tests/no-learning-content.test.ts
npm test
npm run build
rg -n "HSK|Hanzi|chữ Hán|pinyin|meaningsVi|Mastery|content:verify" src tests e2e README.md package.json
git diff --check
```

Expected: tests/build PASS; `rg` exits `1` with no matches.

Commit all tracked deletions and replacements:

```bash
git add -A
git commit -m "refactor: remove Hanzi learning stack"
```

---

### Task 7: Browser Gameplay, Visual Fidelity, and Release Evidence

**Files:**
- Replace: `e2e/game.spec.ts`
- Modify: `playwright.config.ts`
- Modify: `src/diagnostics/perf-overlay.ts`
- Modify: `README.md`
- Create: `design-qa.md`

**Interfaces:**
- Consumes: query-gated `window.__NEON_GLIDER_E2E__`, renderer diagnostics, and the pinned reference.
- Produces: browser acceptance, visual comparison, performance evidence, and the final manual-deploy runbook.

- [ ] **Step 1: Replace E2E coverage with the endless-runner workflow**

```ts
test('starts, steers, collects, passes a gate and reaches collision result', async ({ page }) => {
  await page.goto('?e2e=1');
  await page.getByRole('button', { name: 'Bắt đầu' }).click();
  await expect(page.getByText('3', { exact: true })).toBeVisible();
  await expect(page.locator('[data-screen="game"]')).toBeVisible({ timeout: 4_000 });
  await page.keyboard.press('ArrowRight');
  await page.evaluate(() => window.__NEON_GLIDER_E2E__?.advance(20));
  const active = await page.evaluate(() => window.__NEON_GLIDER_E2E__?.snapshot());
  expect(active?.run?.distance).toBeGreaterThan(0);
  await page.evaluate(() => window.__NEON_GLIDER_E2E__?.forceEnd('collision'));
  await expect(page.locator('[data-screen="result"]')).toContainText('VA CHẠM');
});
```

Add cases for:

- hook absent without `?e2e=1`;
- exact reload restoration of every serializable field after countdown;
- new browser context isolation and persistent high score;
- pointer and touch lane changes;
- pause, initial-hidden page, visibility resume, and context fallback;
- depletion ending;
- deterministic gate/speed/multiplier caps;
- no horizontal overflow and ship visibility in lane `0/1/2` at desktop and Pixel 7;
- reduced motion;
- static assets under `/neon-glider/`.

- [ ] **Step 2: Capture required visual states**

Save ignored screenshots under `.superpowers/sdd/2026-08-17-neon-glider-redesign/artifacts/{desktop-chromium,mobile-chromium}/`:

- `menu.png`
- `gameplay-center.png`
- `gameplay-left.png`
- `gameplay-right.png`
- `gate.png`
- `paused.png`
- `collision-result.png`
- `depleted-result.png`
- `reduced-motion.png`
- `webgl-fallback.png`

The desktop gameplay capture uses `1536 × 1024`, the same viewport and active-game composition as the pinned reference.

- [ ] **Step 3: Run blocking design QA**

Use the `product-design:image-to-code` workflow and `design-qa` gate. Open both:

- `docs/superpowers/specs/assets/neon-glider-reference.png`
- latest `gameplay-center.png`

Compare composition, tunnel depth, ship silhouette/scale, cyan-magenta palette, gate dominance, obstacle readability, collectible glow, HUD placement, energy/pause placement, clipping, and center playfield obstruction. Write `design-qa.md` with concrete P0/P1/P2/P3 findings. Fix all P0/P1/P2, recapture, and repeat until the file contains exactly:

```text
final result: passed
```

- [ ] **Step 4: Record honest performance and bundle evidence**

During deterministic full runs, record:

```ts
interface PerfEvidence {
  project: 'desktop-chromium' | 'mobile-chromium';
  sampleCount: number;
  medianFrameTimeMs: number;
  worstFrameTimeMs: number;
  slowFrameCount: number;
  longestSlowFrameStreak: number;
  maxDrawCalls: number;
  maxGeometries: number;
  maxTextures: number;
}
```

Fail if `longestSlowFrameStreak > 3`, desktop draw calls exceed `60`, mobile draw calls exceed `45`, the production output exceeds `8 MB`, or the scene shows sustained input/render lag. Record the browser build, host hardware, viewport, and the fact that mobile is emulated.

- [ ] **Step 5: Run the complete local release gate**

Run:

```bash
npm ci
npm test
npm run build
npm run test:e2e
test "$(grep -c '^final result: passed$' design-qa.md)" -eq 1
test "$(du -sk dist | cut -f1)" -le 8192
git diff --check
git status --short
```

Expected: 0 failing unit/browser tests, build exit `0`, one design-QA pass marker, `dist/` no larger than `8192 KiB`, no diff-check errors, and only intentional untracked/ignored QA artifacts outside the tracked changes.

- [ ] **Step 6: Update README evidence and commit**

Add actual build size, desktop/mobile frame measurements, draw-call maxima, test counts, browser version, host, and remaining P3 polish. State explicitly that deployment was not run if no remote/Pages confirmation exists.

Commit:

```bash
git add e2e/game.spec.ts playwright.config.ts src/diagnostics/perf-overlay.ts README.md design-qa.md
git commit -m "test: verify Neon Glider visual release"
```

---

## Implementation Completion Evidence

Before claiming completion, report:

- commits for Tasks 1–7 and review disposition for each;
- total unit tests passed/failed;
- Playwright results for desktop and Pixel 7 projects;
- production `dist/` size and relative GitHub Pages asset paths;
- reference/prototype visual comparison and `design-qa.md` pass;
- desktop/mobile median and worst frame time, slow-frame streak, draw calls, geometries, and textures;
- confirmation that the tracked runtime/tooling contains no HSK learning surface;
- manual deploy result and Pages URL only if deployment was separately authorized and a remote configured.
