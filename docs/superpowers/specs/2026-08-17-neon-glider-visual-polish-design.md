# Neon Glider Visual Polish Design

## Status

Approved direction: cinematic procedural polish. This spec refines presentation only; the endless-runner rules, schema version 2, deterministic generation, collision, scoring, energy, persistence, and input contracts remain unchanged.

## Visual Target

The pinned target remains `docs/superpowers/specs/assets/neon-glider-reference.png` with SHA-256 `f997cc6f181984faa513d6756ea097f7470a7412089a9de8be7fa8381f3bcfc9`.

Success means the same gameplay frame reads as a polished neon tunnel runner rather than a technical prototype:

- the ship is the strongest foreground silhouette;
- the active gate is the dominant mid-ground landmark;
- obstacles and crystals remain readable through bloom and motion;
- the tunnel has layered depth, illuminated floor response, and visible forward motion;
- the HUD is sparse, sharp, and visually subordinate to the playfield.

## Selected Approach

Keep the existing procedural Three.js runtime and improve its art direction. Do not add downloaded GLB models, generated background plates, new routes, or gameplay systems.

This approach preserves the lightweight GitHub Pages build, deterministic captures, responsive framing, and current collision geometry while allowing a coherent visual upgrade.

## Render Architecture

Simulation remains independent of Three.js. `RunnerState` continues to be the only gameplay input to the view.

The render adapter gains four presentation layers:

1. **Tunnel shell:** deeper alternating wall and ceiling panels with controlled roughness, cyan/magenta edge lights, and darker recesses.
2. **Track surface:** metallic floor panels, lane seams, reflected neon accents, and faster near-camera motion cues.
3. **Gameplay silhouettes:** a more detailed procedural ship, outlined obstacles, brighter crystals, and a layered active gate.
4. **Atmosphere:** restrained bloom, speed streaks, glow sprites/particles, fog, and distance falloff.

All added geometry must be pooled or instanced. Per-frame updates must not allocate new Three.js objects.

## Ship

The ship remains procedural and collision-neutral. Its visible form gains:

- a faceted central fuselage and raised cockpit canopy;
- swept wings with cyan edge trim and magenta engine accents;
- twin engine housings with visible exhaust cores;
- subtle banking during lane transitions;
- exhaust trails that lengthen with speed and disappear under reduced motion.

The complete ship must remain inside the viewport in all three lanes on desktop and Pixel 7 emulation.

## Tunnel, Gate, and Entities

- Tunnel ribs alternate cyan and magenta but use cyan as the primary navigation color.
- Floor and wall panels use PBR materials with visible light response instead of flat black surfaces.
- The current gate uses a double frame, luminous header, and stronger depth separation from later gates.
- Obstacles use solid dark bodies plus emissive contour lines; silhouettes must remain distinct at approach speed.
- Crystals use transmissive or glossy cyan materials plus a bounded glow treatment.
- Decorative particles never occupy collision lanes densely enough to look interactive.

## HUD and Screens

HUD remains DOM-based and keeps the playfield center and lower-middle clear.

- Score and multiplier stay top-left.
- Distance and gate stay top-right.
- Energy stays bottom-center; pause stays bottom-right.
- Labels become smaller and quieter; numeric values receive stronger hierarchy.
- Panels use minimal translucent backing only where motion reduces legibility.
- Menu, pause, and result screens use the same cyan/magenta material language, compact copy, and a clearer primary action.
- No generic dashboard cards, full-width chrome, or permanent controls panel.

Desktop persistent HUD must stay below 20% viewport coverage. Mobile HUD must collapse without overlapping the ship, gate, energy bar, or pause button.

## Motion and Accessibility

- Strong motion is reserved for forward travel, lane banking, collection, impact, and gate passage.
- Reduced-motion mode disables banking, exhaust stretching, decorative particle acceleration, and non-essential UI transitions.
- Keyboard, pointer, touch, focus, pause, and screen-reader semantics remain unchanged.
- Text contrast and hit targets remain at least as strong as the current implementation.

## Performance and Fallback

- Keep the existing desktop and mobile quality profiles.
- Preserve the current post-processing fallback to direct rendering.
- Desktop and mobile must remain below 60 draw calls and 45 geometries in the release evidence.
- Longest slow-frame streak must remain at or below 3 using the existing real-RAF measurement.
- `dist` remains below 5 MiB.
- Do not introduce runtime network requests or asset-loading stalls.

## Error Handling

- WebGL creation failure keeps the existing fatal screen.
- Post-processing creation failure falls back to direct rendering without changing gameplay.
- Context loss freezes visual time and input-driven simulation exactly as today; restore rebuilds the complete polished scene from the latest snapshot.
- Storage failure continues in memory and shows one warning.

## Verification

Implementation requires:

- focused unit tests for new material, ship, tunnel, HUD, reduced-motion, lifecycle, and disposal contracts;
- the full existing unit suite;
- production build and static `/neon-glider/` asset-base check;
- full serial desktop and Pixel 7 E2E suites;
- captures for menu, center/left/right lanes, active gate, pause, collision, depletion, reduced motion, and restored run;
- a same-viewport combined comparison against the pinned reference;
- `design-qa.md` with exactly `final result: passed` and no actionable P0, P1, or P2 findings.

## Explicit Non-Goals

- no new gameplay mechanics;
- no learning or Hanzi content;
- no GLB or texture-download pipeline;
- no backend, account, leaderboard, or deployment change;
- no schema-version change.
