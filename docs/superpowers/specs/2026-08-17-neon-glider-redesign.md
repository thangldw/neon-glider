# Neon Glider Redesign

## Status

Approved visual and product rebaseline. This document supersedes `2026-08-16-hanzi-glider-design.md` for product behavior, content, UI, rendering, persistence, testing, and release.

The selected visual target is `assets/neon-glider-reference.png`, SHA-256 `f997cc6f181984faa513d6756ea097f7470a7412089a9de8be7fa8381f3bcfc9`.

## Summary

Neon Glider is a static Three.js endless runner set inside a cyan-and-magenta science-fiction tunnel. The player steers a chase-camera spacecraft across three lanes, avoids obstacles, collects energy crystals, passes gates, and survives as distance, speed, and multiplier increase. A run ends on collision or when energy reaches zero.

The game remains deployable as static files on GitHub Pages. It contains no Chinese-learning content, vocabulary data, translation workflow, backend, accounts, or online services.

## Goals

- Match the supplied concept image's composition and mood: chase camera, dominant spacecraft, deep tunnel, luminous gates, cyan-magenta lighting, reflective floor, bloom, fog, speed streaks, and sparse arcade HUD.
- Provide a deterministic three-lane endless-runner loop that is immediately playable with keyboard, pointer, and touch.
- Preserve an active run across reloads within the same browser session and preserve high scores across sessions.
- Remain practical on desktop and representative mid-range mobile hardware through explicit quality scaling.
- Keep the production download within an expected 3–8 MB budget.

## Non-goals

- HSK content, Chinese characters, translations, flashcards, mastery scheduling, or educational progression.
- Multiplayer, accounts, cloud saves, leaderboards, purchases, advertisements, or analytics.
- Combat, bosses, free-flight physics, procedural branching paths, or an editor.
- Pixel-identical reproduction of an AI concept render. The target is equivalent composition, palette, depth, lighting, and perceived polish.
- Audio in the first redesign release.

## Removal Scope

The redesign removes rather than hides the previous learning system:

- official HSK snapshots, generated vocabulary, review CSVs, draft translations, source fetchers, importers, validators, provenance scripts, and content release gate;
- scheduler, mastery records, term-based run state, question choices, learning review screens, and HSK-specific storage;
- HSK labels, notices, documentation, tests, dependencies, and deployment conditions.

Git history remains the historical record of the removed system.

## Core Gameplay

### Run lifecycle

1. The menu shows the title, stored high score, controls, reduced-motion toggle, and Start action.
2. A new run starts after a `3`, `2`, `1` countdown.
3. The ship advances automatically through a deterministic tunnel.
4. The player changes between left, center, and right lanes.
5. Obstacles end the run on contact.
6. Energy drains continuously; crystals restore energy; reaching zero ends the run.
7. Gates increase multiplier, speed, and obstacle difficulty.
8. The result screen shows score, distance, gates, crystals, and high score, with Restart and Menu actions.

### Controls

- Keyboard: `ArrowLeft`/`A`, `ArrowRight`/`D`, `Escape`/`P` to pause.
- Pointer: horizontal swipe or tap the left/right edge of the playfield.
- Touch: horizontal swipe or tap the left/right edge.
- UI controls do not bubble into lane input.

### Energy

- Start at `100`.
- Drain at `2.5 + tier * 0.2` units per second, where `tier` is the number of completed gates capped at `10` for the drain formula.
- A crystal restores `15`, capped at `100`.
- Passing a gate restores `5`, capped at `100`.
- Energy reaching `0` ends the run with reason `depleted`.

### Distance, speed, and gates

- Initial forward speed is `26 m/s`.
- Each completed gate adds `1.5 m/s`, capped at `52 m/s`.
- Gates occur every `250 m` of simulated distance.
- Distance and all spawn decisions advance only from accepted simulation deltas; paused, hidden, and context-lost time does not advance the run.

### Score and multiplier

- Multiplier starts at `1.0`.
- Each gate adds `0.25`, capped at `8.0`.
- Score accumulates deterministically as `forwardDistanceDelta * 10 * multiplier`.
- Each crystal adds `50 * multiplier`.
- Displayed score is the floor of the accumulated score.

### Obstacles and crystals

- Obstacle families are cube barriers, triangular prisms, and paired wall blocks matching the reference silhouette language.
- The deterministic generator works in fixed-distance segments and always leaves at least one reachable lane open.
- The lane required by the immediately preceding segment remains reachable under the configured lane-transition time.
- Crystals never spawn inside an obstacle or exclusively behind an unavoidable collision path.
- Density and mixed obstacle patterns increase by gate tier; vehicle physics do not change.

## Deterministic State

Serializable active state contains:

- schema version and game version;
- seed and current RNG state;
- status and end reason;
- lane, distance, speed, energy, score accumulator, multiplier, gate count, and crystal count;
- deterministic segment cursor and the currently active obstacle/crystal descriptors;
- reduced-motion choice needed to reconstruct presentation timing consistently.

The simulation is authoritative. Three.js objects mirror snapshots and never own scoring, collision outcomes, procedural generation, or persistence.

## Persistence

- `sessionStorage` checkpoints the active run after meaningful events, every `500 ms` while playing, and on `visibilitychange`.
- Reloading a compatible active run restores it paused and requires a three-second countdown.
- A new browser session starts at the menu when no compatible session state exists.
- `localStorage` stores high score, longest distance, reduced-motion preference, and aggregate run count.
- Corrupt or incompatible state is rejected and cleared without blocking a new run.
- Storage failure keeps the in-memory run playable and shows a concise warning.

## Visual Design

### Composition

- Fixed chase camera behind and slightly above the spacecraft.
- Spacecraft occupies the lower central quarter of the desktop frame and stays fully visible in all lanes and portrait viewports.
- The nearest luminous octagonal gate frames the center of the image; repeated tunnel rings create a deep vanishing point.
- Obstacles occupy lanes ahead without hiding the readable path.
- The center remains dominated by the 3D scene rather than UI cards.

### Tunnel

- Recycled octagonal segments form ribbed walls and a dark metallic floor.
- Cyan and magenta emissive strips alternate across ribs, walls, and floor edges.
- Floor panels use physically based metal/roughness materials and receive colored point-light highlights.
- Distance fog, subtle vignette, and speed streaks reinforce depth.
- Tunnel parts use instancing or shared geometry/materials to bound draw calls.

### Spacecraft

- A custom low-poly spacecraft is assembled as one renderer-owned object from shared Three.js geometry and materials.
- Required silhouette: central armored fuselage, swept wings, two engine pods, cyan cockpit light, magenta edge lights, and twin exhaust trails.
- Banking follows lane interpolation. Reduced motion disables camera shake and strong bobbing but retains lane feedback.

### Gates, obstacles, and collectibles

- Gates are large cyan/magenta octagonal arches with a centered `GATE N` label.
- Obstacles are dark metallic volumes with magenta rim lighting.
- Collectibles are cyan emissive diamond crystals with bloom and restrained rotation.
- No raster scene asset is required; the reference's visible scene elements are reconstructed as real-time 3D objects. The pause glyph uses a maintained icon library rather than handcrafted SVG or CSS icon art.

### Post-processing

- Use Three.js `EffectComposer`, `RenderPass`, `UnrealBloomPass`, and output color correction.
- Bloom must enhance emissive edges without washing out obstacle silhouettes or HUD text.
- Post-processing is optional at runtime: renderer initialization or capability failure falls back to direct rendering with emissive materials.

## HUD and Screens

Gameplay HUD follows the reference:

- top-left: score and multiplier;
- top-right: distance and current gate;
- bottom-center: energy label and bar;
- bottom-right: icon-library pause button;
- transient center text for countdown and gate milestones only.

The DOM owns HUD and screens. Menu, pause, game-over, storage warning, and unsupported-WebGL states remain semantic and keyboard accessible. Touch targets are at least `44 × 44 px`; safe-area insets are respected.

## Responsive and Quality Scaling

- Desktop pixel ratio cap: `2.0`; mobile cap: `1.35`.
- Portrait framing changes camera tracking and ship scale so every lane remains visible.
- Mobile reduces tunnel segment count, speed-streak count, shadow use, and bloom resolution before reducing visual clarity of obstacles.
- `prefers-reduced-motion` and the in-game toggle disable camera shake, strong bobbing, and dense streaks; gameplay timing remains identical.
- Sustained frames above `50 ms`, invisible outer-lane ship positions, unreadable obstacles, or HUD clipping are release blockers.

## Architecture

```text
src/
  simulation/   deterministic run, generator, collision, scoring
  storage/      active run and persistent records
  render/       scene/view, tunnel, ship, gates, obstacles, particles, post FX
  input/        keyboard, pointer, touch actions
  ui/           menu, HUD, pause, result, controller
  diagnostics/  opt-in frame and renderer metrics
```

Scene resources use explicit ownership and idempotent disposal. Context loss pauses simulation, rebuilds the scene transactionally, restores the current deterministic snapshot, and resumes through a countdown.

## Error Handling

- WebGL initialization failure shows an unsupported-browser screen.
- Post-processing failure falls back to direct rendering.
- Context loss pauses and attempts renderer reconstruction.
- Storage errors warn without ending an active in-memory run.
- Invalid deterministic state is cleared and replaced by the menu.

## Testing

Unit tests cover:

- RNG vectors and deterministic segment generation;
- at least one reachable lane for every generated segment;
- collision, energy, score, multiplier, gates, crystals, and speed caps;
- serialization, corrupt-state rejection, reload reconstruction, and high scores;
- renderer resource lifecycle, resize, context restoration, quality scaling, and disposal;
- input ownership and UI state transitions.

Browser tests cover desktop Chromium and Pixel 7 emulation:

- menu, new run, countdown, keyboard, pointer, touch, pause, and resume;
- collision and depleted-energy endings;
- exact session reload restoration;
- ship visibility in all lanes and responsive HUD containment;
- nonblank WebGL tunnel, gates, obstacles, crystals, bloom/fallback, and reduced motion;
- a deterministic full run to the result screen.

Visual QA compares the reference and prototype at the same `1536 × 1024` desktop viewport plus a portrait mobile viewport. The blocking criteria are composition, palette, tunnel depth, ship silhouette, gate scale, glow balance, HUD placement, clipping, and gameplay readability.

## Performance and Size Gates

- Production download target: `3–8 MB` uncompressed output.
- Target maximum in normal gameplay: `60` draw calls desktop and `45` mobile.
- Record median/worst frame time, slow-frame streak, draw calls, geometries, and textures on the current development host.
- Do not convert single-host or emulated-device evidence into a universal FPS claim.

## Deployment

The Vite build remains static and repository-subpath safe. Manual GitHub Pages deployment continues to publish `dist/` to the root of `gh-pages`. The predeploy gate becomes unit tests, production build, browser tests, and visual/performance verification; no content-review gate remains.

## Acceptance Criteria

- The product contains no HSK, Hanzi-learning, translation, mastery, vocabulary-import, or content-review runtime/tooling surface.
- The first playable view visibly matches the selected reference's neon tunnel, chase ship, gate, obstacle, collectible, and HUD composition.
- A player can steer three lanes, avoid deterministic obstacles, collect energy, pass gates, increase score/multiplier/speed, and reach collision or depletion game over.
- Reloading restores the exact compatible active run after a countdown.
- High score and longest distance persist when storage is available.
- Desktop and portrait mobile keep the ship, obstacles, energy bar, and pause action visible.
- Automated unit/build/browser gates pass and `design-qa.md` reports `final result: passed` before handoff.
- Deployment is not run without a confirmed Git remote and Pages branch configuration.
