# Neon Glider Gameplay Feedback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add bounded Three.js and DOM feedback for energy collection and obstacle collision without changing simulation, persistence, or release budgets.

**Architecture:** `app-controller` detects semantic transitions between immutable runner snapshots and emits explicit feedback events. A focused Three.js adapter owns preallocated particles, shockwave, ship pulse, and camera shake; the existing game screen owns reusable DOM pulses. Collision rendering is held for a bounded duration before the existing result transition.

**Tech Stack:** TypeScript, Three.js, Vite, Vitest/jsdom, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-18-neon-glider-gameplay-feedback-design.md`

## Global Constraints

- Preserve deterministic simulation, persistence schema version 2, scoring, energy, collision, RNG, and track generation.
- No runtime network request, external asset, audio, haptics, slow motion, or new setting.
- Maximum new active draw calls: 2; existing caps remain fewer than 60 draw calls and fewer than 45 geometries.
- Allocate all Three.js objects, typed arrays, materials, geometries, and DOM feedback nodes during construction, never in the render loop.
- Collection duration is 250 ms normally and 120 ms with reduced motion.
- Collision duration is 320 ms normally and 120 ms with reduced motion.
- Reduced motion disables camera shake and particle rotation and limits collection/collision particles to 6/8.
- Context loss or visibility suspension during a pending collision completes the run immediately with the collision reason intact.

---

### Task 1: Build the bounded Three.js feedback adapter

**Files:**
- Create: `src/render/neon/feedback-effects.ts`
- Create: `tests/render/neon-feedback-effects.test.ts`

**Interfaces:**
- Consumes: `THREE`, `reducedMotion: boolean`.
- Produces:

```ts
export type RunnerFeedback =
  | { kind: 'collect'; count: number }
  | { kind: 'collision' };

export const COLLECTION_FEEDBACK_MS = 250;
export const COLLISION_FEEDBACK_MS = 320;
export const REDUCED_FEEDBACK_MS = 120;

export interface NeonFeedbackEffects {
  readonly root: THREE.Group;
  readonly maxParticles: 20;
  play(event: RunnerFeedback, reducedMotion: boolean): void;
  update(deltaSeconds: number, reducedMotion: boolean): void;
  getShipPulse(): number;
  applyCameraShake(camera: THREE.Camera, reducedMotion: boolean): void;
  reset(): void;
  dispose(): void;
}

export function feedbackDurationMs(event: RunnerFeedback, reducedMotion: boolean): number;
export function createNeonFeedbackEffects(): NeonFeedbackEffects;
```

- [ ] **Step 1: Write failing duration and pool tests**

```ts
import * as THREE from 'three';
import { expect, it, vi } from 'vitest';
import {
  COLLISION_FEEDBACK_MS,
  COLLECTION_FEEDBACK_MS,
  REDUCED_FEEDBACK_MS,
  createNeonFeedbackEffects,
  feedbackDurationMs,
} from '../../src/render/neon/feedback-effects';

it('uses exact normal and reduced feedback durations', () => {
  expect(feedbackDurationMs({ kind: 'collect', count: 1 }, false)).toBe(COLLECTION_FEEDBACK_MS);
  expect(feedbackDurationMs({ kind: 'collision' }, false)).toBe(COLLISION_FEEDBACK_MS);
  expect(feedbackDurationMs({ kind: 'collision' }, true)).toBe(REDUCED_FEEDBACK_MS);
});

it('preallocates one bounded particle pool and one reusable shockwave', () => {
  const effects = createNeonFeedbackEffects();
  expect(effects.maxParticles).toBe(20);
  expect(effects.root.getObjectByName('feedback-particles')).toBeInstanceOf(THREE.Points);
  expect(effects.root.getObjectByName('feedback-shockwave')).toBeInstanceOf(THREE.Mesh);
  effects.dispose();
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/render/neon-feedback-effects.test.ts`

Expected: FAIL because `src/render/neon/feedback-effects.ts` does not exist.

- [ ] **Step 3: Implement fixed resources, duration policy, and event initialization**

Create one `BufferGeometry` with `Float32Array(20 * 3)` positions/colors, one `PointsMaterial`, one `RingGeometry`, and one additive `MeshBasicMaterial`. Initialize both renderables as invisible. `play` clamps collection particles to 12 or 6 and collision particles to 20 or 8, resets elapsed time, writes initial positions/colors into existing arrays, and never replaces array attributes.

```ts
export function feedbackDurationMs(event: RunnerFeedback, reducedMotion: boolean): number {
  if (reducedMotion) return REDUCED_FEEDBACK_MS;
  return event.kind === 'collision' ? COLLISION_FEEDBACK_MS : COLLECTION_FEEDBACK_MS;
}
```

- [ ] **Step 4: Write failing animation, reduced-motion, shake, reset, and disposal tests**

```ts
it('bounds particles and disables shake under reduced motion', () => {
  const effects = createNeonFeedbackEffects();
  const camera = new THREE.PerspectiveCamera();
  effects.play({ kind: 'collision' }, true);
  const points = effects.root.getObjectByName('feedback-particles') as THREE.Points;
  expect(points.geometry.drawRange.count).toBe(8);
  const before = camera.position.clone();
  effects.update(0.06, true);
  effects.applyCameraShake(camera, true);
  expect(camera.position).toEqual(before);
  effects.dispose();
});

it('reuses attributes and disposes owned resources once', () => {
  const effects = createNeonFeedbackEffects();
  const points = effects.root.getObjectByName('feedback-particles') as THREE.Points;
  const attribute = points.geometry.getAttribute('position');
  const geometryDispose = vi.spyOn(points.geometry, 'dispose');
  effects.play({ kind: 'collect', count: 3 }, false);
  effects.update(0.1, false);
  expect(points.geometry.getAttribute('position')).toBe(attribute);
  effects.dispose();
  effects.dispose();
  expect(geometryDispose).toHaveBeenCalledOnce();
});
```

- [ ] **Step 5: Implement allocation-free animation and lifecycle**

Use scalar arithmetic and module-owned reusable vectors. Collection positions spiral toward origin; collision positions expand outward. Scale/fade the shockwave only during collision. `getShipPulse` returns a bounded `0..1` scalar from the active effect clock. `applyCameraShake` adds deterministic sine/cosine offsets only while a non-reduced collision is active. `reset` hides renderables and clears draw range. `dispose` is idempotent.

- [ ] **Step 6: Run Task 1 tests and commit**

Run: `npm test -- tests/render/neon-feedback-effects.test.ts`

Expected: PASS.

```bash
git add src/render/neon/feedback-effects.ts tests/render/neon-feedback-effects.test.ts
git commit -m "feat: add bounded runner feedback effects"
```

---

### Task 2: Integrate feedback into RunnerView

**Files:**
- Modify: `src/render/runner-view.ts`
- Modify: `src/render/neon/ship.ts`
- Modify: `tests/render/runner-view.test.ts`
- Modify: `tests/render/neon-ship.test.ts`

**Interfaces:**
- Consumes: `createNeonFeedbackEffects`, `RunnerFeedback` from Task 1.
- Extends `RunnerView` with `playFeedback(event: RunnerFeedback): void`.
- Extends `NeonShip` with `setFeedbackPulse(strength: number): void`.
- `SceneGraph` owns `feedback: NeonFeedbackEffects` and disposes it before shared materials.

- [ ] **Step 1: Write failing scene integration tests**

```ts
it('attaches feedback to the ship anchor and exposes explicit playback', () => {
  const renderer = rendererFixture();
  const view = createRunnerView(containerFixture(), fixtureOptions(renderer));
  view.setSnapshot(createRunner(4));
  view.playFeedback({ kind: 'collect', count: 1 });
  view.render(1);
  const scene = (renderer.render as ReturnType<typeof vi.fn>).mock.calls[0][0] as THREE.Scene;
  const effects = scene.getObjectByName('runner-feedback-effects');
  expect(effects?.parent?.name).toBe('neon-ship-anchor');
  expect(scene.getObjectByName('feedback-particles')?.visible).toBe(true);
  view.dispose();
});

it('does not infer feedback from ordinary snapshot replacement', () => {
  const renderer = rendererFixture();
  const view = createRunnerView(containerFixture(), fixtureOptions(renderer));
  view.setSnapshot({ ...createRunner(4), crystals: 3 });
  view.render(1);
  const scene = (renderer.render as ReturnType<typeof vi.fn>).mock.calls[0][0] as THREE.Scene;
  expect(scene.getObjectByName('feedback-particles')?.visible).toBe(false);
  view.dispose();
});
```

- [ ] **Step 2: Run focused tests and verify RED**

Run: `npm test -- tests/render/runner-view.test.ts`

Expected: FAIL because `RunnerView.playFeedback` and the feedback scene node are missing.

- [ ] **Step 3: Integrate construction, layers, update, shake, and disposal**

Create feedback in the existing transactional `createSceneGraph` block. Add its root to `shipAnchor`, name the root `runner-feedback-effects`, move its meshes/points to desktop detail layer, enable bloom, and include it in fallback rendering. Add `NeonShip.setFeedbackPulse`, which clamps the input and raises only the ship-owned cloned cyan/armor/metal emissive intensities from their captured base values; zero restores exact base values. During `reconcile`, call `feedback.update(deltaSeconds, reducedMotion)` after the ship update, call `ship.setFeedbackPulse(feedback.getShipPulse())`, calculate the base camera pose, then call `feedback.applyCameraShake(camera, reducedMotion)`. `playFeedback` reads current reduced-motion state and delegates explicitly.

- [ ] **Step 4: Write failing context replacement and draw-budget tests**

Verify an active effect is reset rather than replayed after context restoration, old feedback resources dispose once, inactive effects add zero submissions, and active effects add no more than two submissions.

- [ ] **Step 5: Implement context-safe behavior and run focused tests**

Run: `npm test -- tests/render/neon-feedback-effects.test.ts tests/render/neon-ship.test.ts tests/render/runner-view.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit Task 2**

```bash
git add src/render/runner-view.ts src/render/neon/ship.ts tests/render/runner-view.test.ts tests/render/neon-ship.test.ts
git commit -m "feat: integrate runner feedback rendering"
```

---

### Task 3: Add reusable DOM feedback

**Files:**
- Modify: `src/ui/screens.ts`
- Modify: `src/styles.css`
- Modify: `tests/ui/screens-layout.test.ts`

**Interfaces:**
- Extends `GameScreen` with `playFeedback(kind: 'collect' | 'collision'): void`.
- Creates one persistent `[data-game-feedback]` node and reuses the existing energy HUD.

- [ ] **Step 1: Write failing DOM reuse tests**

```ts
it('reuses one feedback layer and restarts energy and collision classes', () => {
  const screen = createGameScreen(() => undefined);
  document.body.append(screen.element);
  const feedback = screen.element.querySelector('[data-game-feedback]');
  expect(feedback).toBeTruthy();
  screen.playFeedback('collect');
  expect(screen.element.querySelector('[data-energy-bar]')?.classList).toContain('is-energy-pulse');
  screen.playFeedback('collision');
  expect(feedback?.classList).toContain('is-collision-flash');
  expect(screen.element.querySelectorAll('[data-game-feedback]')).toHaveLength(1);
});
```

- [ ] **Step 2: Run focused tests and verify RED**

Run: `npm test -- tests/ui/screens-layout.test.ts`

Expected: FAIL because the feedback layer and `playFeedback` are missing.

- [ ] **Step 3: Implement persistent nodes and animation restart**

Create `div.game-feedback-layer[data-game-feedback]` once inside the viewport. In `playFeedback`, remove the relevant class, force an animation restart with `void node.offsetWidth`, and re-add the class. Reuse the existing energy bar; do not append nodes during playback.

- [ ] **Step 4: Add bounded CSS animations**

Add `energy-pulse` at 250 ms and `collision-flash` at 320 ms. Under `[data-reduced-motion="true"]`, use 120 ms opacity-only animations. Keep `pointer-events: none`, preserve HUD readability, and do not animate layout properties.

- [ ] **Step 5: Run focused tests and commit**

Run: `npm test -- tests/ui/screens-layout.test.ts`

Expected: PASS.

```bash
git add src/ui/screens.ts src/styles.css tests/ui/screens-layout.test.ts
git commit -m "feat: add gameplay feedback overlays"
```

---

### Task 4: Emit semantic events and delay collision completion safely

**Files:**
- Modify: `src/ui/app-controller.ts`
- Modify: `tests/ui/app-controller.test.ts`

**Interfaces:**
- Consumes: `RunnerFeedback`, `feedbackDurationMs`, `RunnerView.playFeedback`, `GameScreen.playFeedback`.
- Adds one controller-owned `completionTimer: ReturnType<typeof setTimeout> | null`.

- [ ] **Step 1: Extend the test RunnerView fixture and write failing transition tests**

Add `playFeedback: vi.fn()` to `runnerView()`.

```ts
it('emits one collection event only when the crystal count increases', () => {
  const frames = frameHarness();
  const view = runnerView();
  const run = {
    ...createRunner(5),
    status: 'playing' as const,
    energy: 50,
    entities: [{ id: 'c', kind: 'crystal' as const, lane: 1 as const, distance: 1, segment: 0 }],
  };
  const app = createAppController(root, dependencies({
    loadRunner: () => run,
    createRunnerView: () => view,
    requestFrame: frames.requestFrame,
    cancelFrame: frames.cancelFrame,
  }));
  vi.useFakeTimers();
  vi.advanceTimersByTime(3_000);
  frames.advance(100);
  expect(view.playFeedback).toHaveBeenCalledWith({ kind: 'collect', count: 1 });
  expect(root.querySelector('[data-energy-bar]')?.classList).toContain('is-energy-pulse');
  app.destroy();
});
```

- [ ] **Step 2: Write failing collision handoff tests**

Use a deterministic obstacle at distance 1. Assert the controller remains on `playing` with `run.status === 'complete'` for 319 ms, calls both view/DOM collision feedback once, rejects lane movement through the existing status guard, and transitions to `result` at 320 ms. Add table coverage showing reduced motion uses 120 ms and depletion remains immediate.

- [ ] **Step 3: Run focused controller tests and verify RED**

Run: `npm test -- tests/ui/app-controller.test.ts`

Expected: FAIL because events are not emitted and collision completion is immediate.

- [ ] **Step 4: Implement snapshot transition detection and completion timer**

Inside `applyAdvance`, retain `const previous = run`, compute `const next = advanceRunner(previous, delta)`, then emit collection feedback from `next.crystals - previous.crystals`. For the active-to-collision transition, set the final snapshot/UI, play both feedback channels, and schedule `finishRun` using `feedbackDurationMs`. Do not call `finishRun` twice; keep depletion immediate.

- [ ] **Step 5: Write failing cleanup and interruption tests**

Use fake timers to assert `destroy`, menu teardown, visibility hidden, and context loss clear the completion timer. Visibility/context interruption must call `finishRun` immediately and preserve `endReason: collision` in the result screen/profile record.

- [ ] **Step 6: Implement timer cleanup/interruption handling and verify GREEN**

Run: `npm test -- tests/ui/app-controller.test.ts tests/ui/screens-layout.test.ts tests/render/runner-view.test.ts tests/render/neon-feedback-effects.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit Task 4**

```bash
git add src/ui/app-controller.ts tests/ui/app-controller.test.ts
git commit -m "feat: sequence collection and collision feedback"
```

---

### Task 5: Browser acceptance, performance, and local preview

**Files:**
- Modify: `e2e/game.spec.ts`
- Modify: `README.md`
- Modify: `design-qa.md`

**Interfaces:**
- Reuses the existing E2E-only test API; production builds expose no unrestricted runtime hook.

- [ ] **Step 1: Write failing E2E feedback assertions**

Add one desktop and one Pixel assertion that collection shows `[data-energy-bar].is-energy-pulse`. Force a real deterministic collision, capture during the impact window, assert `[data-game-feedback].is-collision-flash`, then assert the result appears only after the configured duration. Under reduced motion, assert the CSS duration is `0.12s` and camera framing remains stable.

- [ ] **Step 2: Run focused E2E and verify RED**

Run: `npx playwright test e2e/game.spec.ts --grep "gameplay feedback" --workers=1`

Expected: FAIL until the new browser-visible feedback contract is wired completely.

- [ ] **Step 3: Make only acceptance-driven fixes and capture evidence**

Keep the effect centered on the ship, keep the route/entities/HUD readable, and prevent viewport overflow. Capture collection and collision impact at desktop 1536×1024 and Pixel 7. Inspect both with the existing contact-sheet/reference workflow; do not mark visual QA passed if flash/shockwave hides the route.

- [ ] **Step 4: Run the exact release gates**

```bash
npm ci
npm test
npm run build
npm run test:e2e
du -sk dist
git diff --check
```

Expected:

- all unit tests pass;
- serial desktop/Pixel E2E passes;
- normal, near-gate, collection, and collision-impact diagnostics remain below 60 draw calls and 45 geometries;
- `dist` remains below 5120 KiB;
- no runtime network request or static-base regression.

- [ ] **Step 5: Update evidence and commit**

Document effect behavior, reduced-motion behavior, exact test counts, performance evidence, and local preview command. Keep `final result: passed` only if the new captures have no P0/P1/P2.

```bash
git add e2e/game.spec.ts README.md design-qa.md
git commit -m "test: verify gameplay feedback effects"
```

- [ ] **Step 6: Start the verified local preview**

Run: `npm run preview -- --host 127.0.0.1 --port 4173 --base /neon-glider/`

Expected URL: `http://127.0.0.1:4173/neon-glider/`
