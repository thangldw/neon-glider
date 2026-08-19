# Neon Glider UX Redesign

## Status

Selected visual target: `/Users/thang/.codex/generated_images/01a01580-a5d5-7a71-9eb5-2b1d7ddf4d8c/exec-fccfc956-8920-4ac9-bbe5-2691ea3a8d29.png`.

This redesign restores the original Neon Glider identity and replaces the Tempest/monster-collecting direction.

## Product goal

Build a three-lane endless runner whose speed, hazards, and safe routes are readable immediately. The player should feel forward acceleration without losing the ability to make fair lane decisions.

## Core experience

- One compact low-poly glider, viewed from behind and centered low in the frame.
- Three persistent lanes with strong cyan boundaries.
- Magenta blockers occupy exactly one lane and grow from the vanishing point toward the camera.
- Cyan-white energy pickups appear only in traversable space.
- Tunnel ribs, lane arrows, peripheral streaks, obstacle growth, and glider exhaust communicate forward velocity.
- Controls remain left/right lane changes, pause/resume, keyboard and touch.

## Visual system

- Near-black base environment with cyan navigation geometry and hot-magenta hazard geometry.
- Repeating polygon tunnel frames establish depth and tempo.
- The center decision area remains crisp; motion density increases toward the periphery.
- The glider stays smaller than one lane width so it never hides upcoming hazards.
- HUD uses direct edge-aligned typography rather than large panels: Score and Multiplier top-left, Distance and Gate top-right, Energy bottom-center, Pause bottom-right.
- The selected concept image is the source of truth for composition, proportions, palette, and hierarchy.

## Interaction and feedback

- Lane changes are discrete, fast, and eased; the glider banks briefly toward the destination lane.
- Each blocker receives a lane-surface pre-warning before it becomes dangerous.
- Collision removes energy, resets the multiplier, produces a brief magenta impact pulse, and preserves control.
- Energy pickup restores energy, raises multiplier, and produces a brief cyan collection pulse.
- Energy depletion ends the run and exposes score, distance, and restart.
- Pause freezes world motion and preserves run state.
- Reduced-motion mode keeps gameplay timing unchanged while suppressing camera pulse, peripheral streaking, and excessive glider banking.

## Difficulty and fairness

- Early obstacles use one blocker at a time with at least one clearly open lane.
- Multi-obstacle patterns appear only after the player has seen the lane-warning language.
- Spawn spacing is based on reaction time rather than raw distance so difficulty remains stable as speed rises.
- Near-camera blockers may crop at screen edges but cannot visually cover more than one lane before collision resolution.
- Pickup placement must not lead directly into an unavoidable blocker.

## Runtime structure

- Preserve the existing React/Vite/Sites-ready project and frontend-only runtime.
- Separate pure game geometry and spawn rules from React rendering so progression, collision, and fairness can be unit tested.
- Keep one requestAnimationFrame loop for world progression.
- Render tunnel, lane surface, glider, blockers, and pickups as composited visual layers; HUD and state overlays remain DOM UI.
- Persist only the local high score and reduced-motion preference.

## States

- Start: title, one-sentence goal, controls, high score, reduced-motion toggle, Start.
- Countdown: unobtrusive 3–2–1 while the tunnel remains visible.
- Playing: full gameplay HUD and active controls.
- Paused: frozen scene with Continue and Restart.
- Game over: score, distance, best score, Restart.

## Accessibility and responsive behavior

- Keyboard: Left/Right or A/D, Escape/P to pause, Enter to start/restart.
- Touch: tap left/right screen regions or swipe horizontally.
- Visible focus states and semantic labels for HUD and controls.
- Maintain at least 4.5:1 contrast for functional text.
- Desktop composition is primary at 1672 × 941; mobile keeps three readable lanes, moves touch controls above the energy bar, and reduces decorative tunnel density.

## Verification

- Unit tests cover lane clamping, spawn fairness, collision, pickup rewards, multiplier reset, and speed progression.
- Browser tests cover start, countdown, lane movement, pause/resume, collision, pickup, game over, restart, and reduced motion.
- Visual QA compares the selected concept and implementation at 1672 × 941, then checks mobile at 390 × 844.
- Completion requires a successful production build, passing tests, no browser console errors, and `design-qa.md` ending in `final result: passed`.

## Out of scope

- Anime characters, pets, trainer systems, collection mechanics, inventory, backend services, authentication, multiplayer, store, and additional routes.
