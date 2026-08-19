# Neon Glider UX Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Tempest prototype with the selected Neon Glider concept and make speed, obstacle lanes, and safe routes immediately readable.

**Architecture:** Keep the existing React/Vite/Sites-ready shell, but move deterministic progression and collision rules into a pure state module. A Three.js scene adapter renders that state into one WebGL canvas; React owns the run state, input, HUD, overlays, preferences, and accessibility semantics.

**Tech Stack:** React 19, Vite 6, Three.js 0.185.1, Node test runner, CSS, existing Sites worker.

**Spec:** `docs/superpowers/specs/2026-08-19-neon-glider-ux-redesign.md`

## Global Constraints

- Selected visual target: `/Users/thang/.codex/generated_images/01a01580-a5d5-7a71-9eb5-2b1d7ddf4d8c/exec-fccfc956-8920-4ac9-bbe5-2691ea3a8d29.png`.
- Preserve the existing React/Vite/Sites-ready project and frontend-only runtime.
- Use one low-poly glider, three persistent lanes, magenta one-lane blockers, and cyan-white energy pickups.
- Desktop visual target is 1672 × 941; mobile verification target is 390 × 844.
- Persist only high score and reduced-motion preference.
- Do not add anime characters, pets, collection mechanics, backend services, authentication, multiplayer, a store, or additional routes.
- The directory is not a Git repository; task checkpoints use tests and file review instead of commits.

## File Structure

- Create `src/game/model.js`: pure game state, deterministic spawning, collision, rewards, speed, and fairness rules.
- Create `src/game/neonWorld.js`: Three.js scene graph, render adapter, resize, pause, and disposal.
- Create `src/game/useNeonGame.js`: requestAnimationFrame loop, React state bridge, input actions, and event feedback.
- Create `src/ui/GameHud.jsx`: accessible Score, Multiplier, Distance, Gate, Energy, and Pause UI.
- Create `src/ui/GameOverlays.jsx`: start, countdown, pause, and game-over states.
- Replace `src/App.jsx`: compose canvas, hook, HUD, overlays, keyboard, pointer, and reduced-motion preference.
- Replace `src/styles.css`: selected visual system, responsive layout, focus states, feedback pulses, and reduced motion.
- Modify `package.json` and `package-lock.json`: add Three.js and unified tests.
- Create `tests/game-model.test.mjs`: model and fairness unit tests.
- Create `tests/neon-world.test.mjs`: Three.js scene graph contract tests.
- Create `tests/ui-markup.test.mjs`: semantic server-rendered UI tests.
- Replace `tests/player-visual.test.mjs` with `tests/neon-source-contract.test.mjs`: prevent Tempest regressions and require selected Neon layers.
- Replace `design-qa.md` and implementation captures only after browser QA.

---

### Task 1: Deterministic game model and fair spawn rules

**Files:**
- Create: `src/game/model.js`
- Create: `tests/game-model.test.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `LANES`, `PHASES`, `INITIAL_ENERGY`, `createGameState(seed)`, `moveLane(state, delta)`, `startRun(state)`, `togglePause(state)`, and `stepGame(state, dtMs)`.
- `stepGame` returns `{ state, events }`; events are strings from `collect`, `hit`, `gate`, and `gameover`.
- Each world object is `{ id, kind: "blocker" | "pickup" | "warning", lane: -1 | 0 | 1, z: number, resolved: boolean }`.

- [ ] **Step 1: Install the rendering dependency and expose one complete test command**

Run:

```bash
npm install three@0.185.1
npm pkg set scripts.test='node --test tests/*.test.mjs'
```

Expected: `package.json` contains `"three": "^0.185.1"` and `npm test` discovers existing tests.

- [ ] **Step 2: Write failing model tests**

Create `tests/game-model.test.mjs` with these assertions:

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  INITIAL_ENERGY,
  createGameState,
  moveLane,
  startRun,
  stepGame,
  togglePause,
} from "../src/game/model.js";

test("lane movement clamps to the three legal lanes", () => {
  let state = startRun(createGameState(7));
  state = moveLane(state, -1);
  state = moveLane(state, -1);
  assert.equal(state.lane, -1);
  state = moveLane(state, 1);
  state = moveLane(state, 1);
  state = moveLane(state, 1);
  assert.equal(state.lane, 1);
});

test("pause freezes distance, score, energy, and objects", () => {
  const playing = startRun(createGameState(11));
  const paused = togglePause(playing);
  const result = stepGame(paused, 1000);
  assert.deepEqual(result.state, paused);
  assert.deepEqual(result.events, []);
});

test("every blocker pattern preserves at least one open lane", () => {
  let state = startRun(createGameState(19));
  for (let i = 0; i < 200; i += 1) state = stepGame(state, 100).state;
  const buckets = Map.groupBy(
    state.objects.filter((object) => object.kind === "blocker"),
    (object) => Math.round(object.z / 8),
  );
  for (const blockers of buckets.values()) {
    assert.ok(new Set(blockers.map((object) => object.lane)).size <= 2);
  }
});

test("pickup rewards energy and multiplier while blocker hits reset multiplier", () => {
  const base = startRun(createGameState(23));
  const pickupState = {
    ...base,
    energy: 60,
    objects: [{ id: 1, kind: "pickup", lane: 0, z: 1, resolved: false }],
  };
  const collected = stepGame(pickupState, 16);
  assert.ok(collected.state.energy > 60);
  assert.ok(collected.state.multiplier > 1);
  assert.deepEqual(collected.events, ["collect"]);

  const hitState = {
    ...collected.state,
    objects: [{ id: 2, kind: "blocker", lane: 0, z: 1, resolved: false }],
  };
  const hit = stepGame(hitState, 16);
  assert.equal(hit.state.multiplier, 1);
  assert.ok(hit.state.energy < INITIAL_ENERGY);
  assert.deepEqual(hit.events, ["hit"]);
});

test("speed increases with distance but never exceeds the cap", () => {
  let state = startRun(createGameState(29));
  for (let i = 0; i < 600; i += 1) state = stepGame(state, 100).state;
  assert.ok(state.speed > 28);
  assert.ok(state.speed <= 54);
});
```

- [ ] **Step 3: Run the model tests and verify RED**

Run: `node --test tests/game-model.test.mjs`

Expected: FAIL because `src/game/model.js` does not exist.

- [ ] **Step 4: Implement the pure model**

Create `src/game/model.js` with these exact public constants and functions:

```js
export const LANES = [-1, 0, 1];
export const PHASES = ["start", "countdown", "playing", "paused", "gameover"];
export const INITIAL_ENERGY = 100;
const BASE_SPEED = 28;
const MAX_SPEED = 54;
const HIT_Z = 2.4;

function seeded(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
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
```

Implement `stepGame` with these exact rules:

```js
// dt is clamped to 50ms.
// speed = min(54, 28 + distance / 240).
// energy drains by dtSeconds * (1.7 + speed * 0.018).
// objects advance by speed * dtSeconds toward z = 0.
// a matching-lane unresolved object at z <= 2.4 resolves once.
// pickup: +14 energy capped at 100, +0.2 multiplier capped at 4, emit collect.
// blocker: -26 energy, multiplier = 1, emit hit.
// energy <= 0: phase = gameover, emit gameover.
// each 500m increments gate and emits gate.
// spawn interval in seconds = max(0.72, 1.32 - speed * 0.009).
// early pattern: one blocker plus one pickup in an open lane.
// after gate 2: one or two unique blocker lanes, always leaving one open lane.
// warning objects share blocker lane and spawn 12 z-units ahead of that blocker.
// pickups never share a lane with a blocker in the same spawn pattern.
// objects with z < -8 are removed.
```

Use `seeded(state.seed + state.nextId)` for every spawn decision so identical initial seeds and input sequences produce identical objects.

- [ ] **Step 5: Run the model suite and verify GREEN**

Run: `node --test tests/game-model.test.mjs`

Expected: 5 tests pass, 0 fail.

- [ ] **Step 6: Run the full current test suite as the task checkpoint**

Run: `npm test`

Expected: all existing Sites and prototype tests still pass.

---

### Task 2: Three.js Neon tunnel and render adapter

**Files:**
- Create: `src/game/neonWorld.js`
- Create: `tests/neon-world.test.mjs`

**Interfaces:**
- Consumes: game state returned by `createGameState` and `stepGame`.
- Produces: `buildNeonScene()` and `createNeonWorld(canvas)`.
- `createNeonWorld` returns `{ render(state, effects), resize(width, height, pixelRatio), setReducedMotion(value), dispose() }`.

- [ ] **Step 1: Write the failing scene-graph test**

Create `tests/neon-world.test.mjs`:

```js
import assert from "node:assert/strict";
import test from "node:test";
import { buildNeonScene } from "../src/game/neonWorld.js";

test("scene contains named tunnel, lane, glider, obstacle, pickup, and effect layers", () => {
  const { scene } = buildNeonScene();
  for (const name of ["tunnel", "lanes", "glider", "objects", "effects"]) {
    assert.ok(scene.getObjectByName(name), `missing ${name}`);
  }
});

test("tunnel uses repeated polygon ribs and exactly three lane guides", () => {
  const { scene } = buildNeonScene();
  assert.equal(scene.getObjectByName("tunnel").children.length, 28);
  assert.equal(scene.getObjectByName("lanes").children.length, 3);
});

test("glider remains a compact single object group", () => {
  const { scene } = buildNeonScene();
  const glider = scene.getObjectByName("glider");
  assert.equal(glider.type, "Group");
  assert.ok(glider.children.length >= 5);
  assert.ok(glider.children.length <= 12);
});
```

- [ ] **Step 2: Run the scene tests and verify RED**

Run: `node --test tests/neon-world.test.mjs`

Expected: FAIL because `src/game/neonWorld.js` does not exist.

- [ ] **Step 3: Build the static scene graph**

In `buildNeonScene()`:

```js
const palette = {
  void: 0x02050b,
  cyan: 0x54e7ff,
  magenta: 0xff18b8,
  danger: 0x310019,
  pickup: 0xd9fbff,
  hull: 0x244a87,
};

// Camera: PerspectiveCamera(64, 16 / 9, 0.1, 240), position (0, 2.7, 7.8).
// Tunnel: 28 octagonal LineLoop ribs, z from -8 to -170 in 6-unit steps.
// Lanes: three cyan Line paths centered at x = -3.4, 0, 3.4.
// Glider: one named Group at (0, 0.25, 3.4) built from BufferGeometry,
// two magenta engine pods, and two narrow exhaust meshes.
// Objects and effects: empty named Groups populated by render().
```

Use `LineBasicMaterial`, `MeshBasicMaterial`, `EdgesGeometry`, `BoxGeometry`, `OctahedronGeometry`, and custom `BufferGeometry` only. Do not load external models or images.

- [ ] **Step 4: Implement the browser render adapter**

`createNeonWorld(canvas)` must:

```js
// Create WebGLRenderer({ canvas, antialias: true, alpha: false }).
// Use SRGBColorSpace and cap pixel ratio at 2.
// Reuse blocker and pickup mesh pools keyed by object id.
// Map lane to x with lane * 3.4 and model z to Three z with -object.z.
// Scale blockers from 0.18 at z=150 to 2.8 at z=0.
// Keep blockers within one lane width: max mesh width 2.75 world units.
// Render warning chevrons on the matching lane with opacity based on z.
// Bank glider toward its lane while lerping x over 130ms.
// Advance tunnel ribs toward camera by a wrapped offset derived from distance.
// Use effects.collect and effects.hit to pulse cyan/magenta emissive opacity.
// In reduced motion, remove camera pulse and exhaust-length oscillation.
// dispose() traverses geometries/materials, disposes renderer, and clears pools.
```

- [ ] **Step 5: Run scene tests and production build**

Run:

```bash
node --test tests/neon-world.test.mjs
npm run build
```

Expected: 3 scene tests pass and Vite builds without Three.js import or tree-shaking errors.

---

### Task 3: React game loop, input, and state bridge

**Files:**
- Create: `src/game/useNeonGame.js`
- Replace: `src/App.jsx`
- Create: `tests/neon-source-contract.test.mjs`
- Delete: `tests/player-visual.test.mjs`

**Interfaces:**
- Consumes: `createGameState`, `startRun`, `moveLane`, `togglePause`, `stepGame`, and `createNeonWorld`.
- Produces: `useNeonGame({ canvasRef, reducedMotion })` returning `{ state, effects, start, move, pause, restart }`.

- [ ] **Step 1: Write the failing source contract test**

Create `tests/neon-source-contract.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const app = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

test("app uses one Neon canvas and no Tempest raster assets", () => {
  assert.match(app, /<canvas ref=\{canvasRef\} className="neon-canvas"/);
  assert.doesNotMatch(app, /tempest-|familiar|Bond|Sync/);
  assert.doesNotMatch(styles, /tempest-|familiar|garden/);
});

test("app exposes keyboard, touch, and reduced-motion controls", () => {
  assert.match(app, /ArrowLeft/);
  assert.match(app, /ArrowRight/);
  assert.match(app, /pointerStartRef/);
  assert.match(app, /reducedMotion/);
});
```

- [ ] **Step 2: Run the contract test and verify RED**

Run: `node --test tests/neon-source-contract.test.mjs`

Expected: FAIL because the current app still uses Tempest raster assets.

- [ ] **Step 3: Implement `useNeonGame`**

The hook must use one `requestAnimationFrame` loop:

```js
export function useNeonGame({ canvasRef, reducedMotion }) {
  // initialize state with createGameState(Date.now() & 0xffff)
  // create the Three world once when canvasRef.current exists
  // clamp frame delta to 50ms
  // call stepGame only while phase === playing
  // pass latest state and { collect, hit } pulses to world.render
  // update React state at most once per frame
  // resize from ResizeObserver and window.devicePixelRatio
  // dispose world, observer, and RAF on cleanup
  // expose start, move(delta), pause, and restart callbacks
}
```

Effects are timestamps `{ collect: number, hit: number }`; set the relevant timestamp when `stepGame` emits that event so rendering can derive pulse age without timers.

- [ ] **Step 4: Replace `App.jsx` with the selected experience**

The component structure must be:

```jsx
<main className={`neon-game phase-${state.phase} ${reducedMotion ? "reduced-motion" : ""}`}>
  <canvas ref={canvasRef} className="neon-canvas" aria-hidden="true" />
  <div
    className="input-surface"
    aria-label="Swipe, tap an edge, or use arrow keys to change lanes"
    onPointerDown={handlePointerDown}
    onPointerUp={handlePointerUp}
  />
  <div
    key={Math.max(effects.collect, effects.hit)}
    className={`feedback-pulse ${effects.hit > effects.collect ? "pulse-hit" : "pulse-collect"}`}
    aria-hidden="true"
  />
  <GameHud state={state} onPause={pause} />
  <GameOverlays
    state={state}
    highScore={highScore}
    reducedMotion={reducedMotion}
    onReducedMotionChange={setReducedMotion}
    onStart={start}
    onResume={pause}
    onRestart={restart}
  />
</main>
```

Keyboard rules: Left/A moves -1, Right/D moves +1, Escape/P toggles pause, Enter starts or restarts. Pointer rules: horizontal swipe above 32px moves by swipe direction; otherwise a tap left/right of viewport center moves one lane.

Persist `neon-high-score` and `neon-reduced-motion` only.

- [ ] **Step 5: Remove the old source contract and verify GREEN**

Delete `tests/player-visual.test.mjs`, then run:

```bash
node --test tests/neon-source-contract.test.mjs
npm test
```

Expected: Neon contract passes and the full suite has no Tempest assumptions.

---

### Task 4: Accessible HUD and state overlays

**Files:**
- Create: `src/ui/GameHud.jsx`
- Create: `src/ui/GameOverlays.jsx`
- Create: `tests/ui-markup.test.mjs`

**Interfaces:**
- `GameHud({ state, onPause })` consumes model fields and emits only pause.
- `GameOverlays({ state, highScore, reducedMotion, onReducedMotionChange, onStart, onResume, onRestart })` owns no game state.

- [ ] **Step 1: Write failing semantic markup tests**

Create `tests/ui-markup.test.mjs` as a source contract so the existing Node test runner does not need a JSX transform:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const hud = await readFile(new URL("../src/ui/GameHud.jsx", import.meta.url), "utf8");
const overlays = await readFile(new URL("../src/ui/GameOverlays.jsx", import.meta.url), "utf8");

test("HUD exposes score, distance, multiplier, gate, energy, and pause semantics", () => {
  assert.match(hud, /aria-label="Score"/);
  assert.match(hud, /aria-label="Distance and gate"/);
  assert.match(hud, /role="progressbar"/);
  assert.match(hud, /aria-valuenow=\{Math\.round\(state\.energy\)\}/);
  assert.match(hud, /aria-label="Pause"/);
});

test("start overlay includes goal, controls, start, and reduced motion", () => {
  assert.match(overlays, /NEON GLIDER/);
  assert.match(overlays, /SURVIVE\. DODGE OBSTACLES\. KEEP YOUR ENERGY UP\./);
  assert.match(overlays, /A \/ D/);
  assert.match(overlays, /Reduced motion/);
  assert.match(overlays, />Start</);
});
```

- [ ] **Step 2: Run markup tests and verify RED**

Run: `node --test tests/ui-markup.test.mjs`

Expected: FAIL because the UI modules do not exist.

- [ ] **Step 3: Implement `GameHud`**

Use semantic regions and the selected copy:

```jsx
<section className="hud-score" aria-label="Score">
  <span>SCORE</span><strong>{Math.round(state.score).toLocaleString()}</strong>
  <span>MULTIPLIER</span><b>×{state.multiplier.toFixed(1)}</b>
</section>
<section className="hud-distance" aria-label="Distance and gate">
  <span>DISTANCE</span><strong>{Math.round(state.distance)}<small>m</small></strong>
  <b>GATE {state.gate}</b>
</section>
<section className="hud-energy" aria-label="Energy">
  <span>ENERGY</span>
  <div role="progressbar" aria-label="Energy" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(state.energy)}>
    <i style={{ width: `${state.energy}%` }} />
  </div>
</section>
```

Pause uses the existing Phosphor `Pause` icon and has a text `aria-label`.

- [ ] **Step 4: Implement all overlay states**

`GameOverlays` must render exactly one of:

```txt
start: ENDLESS NEON RUNNER / NEON GLIDER / goal / high score / controls / Start / Reduced motion
countdown: STARTING IN / 3, 2, or 1
paused: PAUSED / Continue / Restart
gameover: RUN OVER / Score / Distance / Best / Run again
playing: no overlay
```

Start and restart buttons receive focus when their overlays mount. The reduced-motion control is a native checkbox.

- [ ] **Step 5: Run semantic and full tests**

Run:

```bash
node --test tests/ui-markup.test.mjs
npm test
```

Expected: markup tests pass and no existing test regresses.

---

### Task 5: Selected visual system, responsive behavior, and feedback

**Files:**
- Replace: `src/styles.css`
- Modify: `index.html`

**Interfaces:**
- Consumes the class names defined by `App`, `GameHud`, and `GameOverlays`.
- Produces the selected 1672 × 941 composition and the 390 × 844 responsive layout.

- [ ] **Step 1: Add failing CSS source assertions**

Extend `tests/neon-source-contract.test.mjs`:

```js
test("styles include selected palette, responsive target, and reduced motion", () => {
  assert.match(styles, /--cyan: #54e7ff/);
  assert.match(styles, /--magenta: #ff18b8/);
  assert.match(styles, /@media \(max-width: 600px\)/);
  assert.match(styles, /\.reduced-motion/);
  assert.match(styles, /prefers-reduced-motion/);
});
```

- [ ] **Step 2: Run the source contract and verify RED**

Run: `node --test tests/neon-source-contract.test.mjs`

Expected: FAIL because the current stylesheet is still the Tempest visual system.

- [ ] **Step 3: Implement the desktop selected target**

Define exact tokens:

```css
:root {
  --void: #02050b;
  --cyan: #54e7ff;
  --magenta: #ff18b8;
  --text: #f4fbff;
  --muted: #8da4b7;
  --panel: rgba(2, 5, 11, .78);
}
```

Required composition:

```css
.neon-game, .neon-canvas, .input-surface { position: fixed; inset: 0; }
.neon-canvas { width: 100%; height: 100%; display: block; }
.hud-score { position: fixed; top: 28px; left: 34px; }
.hud-distance { position: fixed; top: 28px; right: 34px; text-align: right; }
.hud-energy { position: fixed; left: 50%; bottom: 28px; width: min(36vw, 620px); transform: translateX(-50%); }
.pause-button { position: fixed; right: 30px; bottom: 24px; width: 52px; height: 52px; }
```

Use Barlow Condensed for HUD/display text, Noto Sans for supporting text, a 2px cyan focus ring, and magenta/cyan full-screen inset-box-shadow pulses for hit/collect feedback. Do not add decorative DOM shapes that duplicate the WebGL world.

- [ ] **Step 4: Implement responsive and reduced-motion rules**

At `max-width: 600px`:

```css
@media (max-width: 600px) {
  .hud-score { top: 14px; left: 14px; }
  .hud-distance { top: 14px; right: 14px; }
  .hud-score strong, .hud-distance strong { font-size: clamp(34px, 11vw, 48px); }
  .hud-score b, .hud-distance b { font-size: clamp(24px, 8vw, 34px); }
  .hud-energy { bottom: 82px; width: min(64vw, 360px); }
  .pause-button { right: 14px; bottom: calc(14px + env(safe-area-inset-bottom)); }
}
```

For reduced motion, add:

```css
.reduced-motion .feedback-pulse { animation-duration: 80ms !important; }
@media (prefers-reduced-motion: reduce) {
  .feedback-pulse { animation-duration: 80ms !important; }
  *, *::before, *::after { scroll-behavior: auto !important; }
}
```

WebGL motion reduction remains controlled through `world.setReducedMotion`.

- [ ] **Step 5: Update document metadata and verify**

Set `index.html` title to `Neon Glider` and theme color to `#02050b`, then run:

```bash
node --test tests/neon-source-contract.test.mjs
npm run build
```

Expected: source contract passes and production build succeeds.

---

### Task 6: Browser gameplay QA and design QA gate

**Files:**
- Replace: `design-qa.md`
- Create: `implementation-neon-desktop.png`
- Create: `implementation-neon-mobile.png`
- Create: `qa-comparison-neon.png`

**Interfaces:**
- Consumes the running local app at `http://localhost:4173/` and selected source image.
- Produces verified captures and a passing QA report.

- [ ] **Step 1: Run the complete automated gate**

Run:

```bash
npm test
npm run build
npm run test:sites
```

Expected: all tests pass, Vite builds, and all 4 Sites worker tests pass.

- [ ] **Step 2: Verify desktop gameplay at 1672 × 941**

In the in-app browser:

```txt
Start the run and wait for active gameplay.
Confirm one canvas, one glider, three readable lanes, blocker warning, blocker, and pickup.
Use Left/Right and A/D; confirm lane clamping and visual bank.
Collect a pickup; confirm energy/multiplier and cyan pulse.
Hit a blocker; confirm energy loss, multiplier reset, and magenta pulse.
Pause and resume; confirm distance, objects, and energy freeze while paused.
Reach game over and restart.
Toggle reduced motion and confirm camera/exhaust pulse reduction without timing changes.
Check browser error and warning logs; require zero entries.
```

- [ ] **Step 3: Verify mobile gameplay at 390 × 844**

Check tap-left, tap-right, horizontal swipe, unobscured Energy/Pause controls, readable three lanes, and no viewport overflow. Capture `implementation-neon-mobile.png`.

- [ ] **Step 4: Capture equal-size desktop evidence and compare**

Capture `implementation-neon-desktop.png` at 1672 × 941. Combine it side-by-side with the selected source into `qa-comparison-neon.png`. Judge typography, spacing, colors, image quality, copy, obstacle scale, glider scale, and center-lane readability.

- [ ] **Step 5: Fix all P0/P1/P2 findings and repeat the capture**

For each issue, record the selector/module, visible evidence, exact fix, and post-fix evidence in `design-qa.md`. Do not hand off while an actionable P0/P1/P2 remains.

- [ ] **Step 6: Finish the QA report and final gate**

`design-qa.md` must include source path, implementation paths, viewport/density, interactions tested, console result, required fidelity surfaces, comparison history, remaining P3 items, and finish with exactly:

```txt
final result: passed
```

Run:

```bash
npm test && npm run build && npm run test:sites && test "$(tail -n 1 design-qa.md)" = "final result: passed"
```

Expected: exit code 0.
