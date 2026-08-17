# Neon Glider Gameplay Feedback Design

Date: 2026-08-18
Status: approved design, pending implementation

## Goal

Add short, readable feedback when the player collects an energy crystal or collides with an obstacle. Preserve the endless-runner rules, deterministic simulation, persistence schema version 2, static GitHub Pages deployment, and existing renderer budgets.

## Player Experience

### Energy collection

- Trigger once for each increase in `RunnerState.crystals`.
- Show up to 12 cyan particles spiraling inward around the ship for 250 ms.
- Pulse the ship emissive treatment and the DOM ENERGY bar for 250 ms.
- Multiple crystals resolved in one simulation step produce one bounded effect whose intensity is clamped; they do not allocate extra emitters.
- The effect is cosmetic and does not modify energy, score, multiplier, entity removal, or persistence.

### Collision

- Trigger only on the transition from an active run to `status: complete` with `endReason: collision`.
- Freeze simulation/input at the deterministic impact state.
- Show an expanding red-orange shockwave, up to 20 sparks, a brief viewport flash, and light camera shake for 320 ms.
- Keep rendering the frozen scene during the impact, then show the existing collision result screen.
- Depletion continues to open its result immediately and does not use the collision effect.

### Reduced motion

- Collection uses at most 6 particles and a 120 ms opacity pulse.
- Collision uses at most 8 particles and a 120 ms flash/shockwave.
- Camera shake and particle rotation are disabled.

## Architecture

### Event ownership

Simulation remains unchanged. `app-controller` compares the pre-advance and post-advance snapshots and emits view feedback:

- crystal count increased: `view.playFeedback({ kind: 'collect', count })` and `gameScreen.playFeedback('collect')`;
- collision transition: `view.playFeedback({ kind: 'collision' })` and `gameScreen.playFeedback('collision')`.

The renderer does not infer or alter gameplay rules. Restore, resize, and ordinary `setSnapshot` calls do not replay feedback.

### Three.js feedback adapter

Add `src/render/neon/feedback-effects.ts` with:

- one preallocated `Points` pool capped at 20 particles;
- one reusable shockwave mesh;
- fixed typed arrays and reusable vectors;
- `play`, `update`, `applyCameraShake`, `reset`, and idempotent `dispose` operations;
- no object, geometry, material, or typed-array allocation in the render loop.

The effect root is attached to the ship anchor, participates in the existing detail/bloom layering, and adds at most two draw calls while active. Inactive objects are hidden and contribute no draw calls.

### DOM feedback

The game screen creates one persistent feedback layer. CSS classes drive the energy-bar pulse and collision flash. Re-triggering restarts the existing animation without creating DOM nodes. Reduced-motion selectors shorten the animation and remove camera-equivalent movement.

### Collision handoff

`app-controller` owns one bounded completion timer. Collision schedules the result screen after the selected effect duration; depletion remains immediate. `stopGameplay` clears the timer. If visibility changes or WebGL context is lost during the impact window, the controller completes the run immediately so it cannot remain stranded or lose its collision reason.

## Resource and Performance Constraints

- No runtime network or external asset.
- Maximum new active draw calls: 2.
- Existing release caps remain unchanged: fewer than 60 draw calls and fewer than 45 geometries in normal and near-gate states.
- Feedback pools are bounded and fully disposed during graph replacement, context restoration, and view disposal.
- No schema, storage, RNG, track generation, collision, energy, or scoring changes.

## Verification

Use TDD with mutation-sensitive coverage for:

- collection and collision transition detection;
- no replay on ordinary snapshot/restore updates;
- bounded particle counts and exact reduced-motion behavior;
- no per-frame allocation and idempotent disposal;
- camera shake active only for non-reduced collision feedback;
- collision result delayed by 320 ms, reduced-motion delay 120 ms, depletion immediate;
- timer cleanup and visibility/context-loss completion;
- DOM feedback reuse and animation restart;
- E2E capture of collection and collision feedback;
- full unit, build, serial desktop/Pixel E2E, visual QA, and unchanged performance/bundle gates.

## Non-goals

- Audio, haptics, new power-ups, damage states, slow motion, gameplay changes, or new settings.
- A general-purpose particle engine or post-processing rewrite.
