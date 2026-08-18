# Neon Glider gameplay-feedback design QA

## Evidence contract

- Source truth: `docs/superpowers/specs/assets/neon-glider-reference.png`, SHA-256 `f997cc6f181984faa513d6756ea097f7470a7412089a9de8be7fa8381f3bcfc9`, source pixels `1487 × 1058`.
- Plan-local root: `.superpowers/sdd/2026-08-18-neon-glider-gameplay-feedback/artifacts`.
- Desktop implementation captures: `desktop-chromium/feedback-collection.png`, `desktop-chromium/feedback-collision-impact.png`, and `desktop-chromium/feedback-reduced-collision-impact.png`, each `1536 × 1024` CSS and physical pixels at device scale factor `1`.
- Pixel 7 implementation captures: the equivalent files under `mobile-chromium`, each `412 × 839` CSS pixels at device scale factor `2.625`, producing `1082 × 2202` PNGs.
- Reference direction/readability comparisons at normalized matching viewport dimensions: `reference-vs-feedback-collection-desktop.png`, `reference-vs-feedback-collision-desktop.png`, `reference-vs-feedback-collection-mobile.png`, and `reference-vs-feedback-collision-mobile.png`. They are not pixel-level same-state evidence: the cinematic source is Gate 12 / 2,734 m with no impact state, while the deterministic implementation captures are Gate 1 / 100–120 m. Mobile normalization preserves the source aspect ratio with black padding.
- Effect overviews: `feedback-desktop-contact-sheet.png` and `feedback-mobile-contact-sheet.png`; columns are collection, normal collision, and reduced-motion collision.
- Each profile contains exactly 13 player-visible PNGs: menu, center/left/right gameplay, gate, paused, collision result, depletion result, reduced motion, restored run, collection feedback, collision impact, and reduced-motion collision impact.

## Comparison and disposition history

1. The prior visual-polish gate established the open route, full ship silhouettes, unclipped HUD, and the split desktop composition. Its transmissive-plane and low-resolution whole-frame variants were rejected before this task.
2. The first gameplay-feedback acceptance run exposed the cyan collection pulse and the red-orange collision flash/shockwave at real deterministic events. Normal collision correctly held the result for `320 ms`; reduced motion completed in `120 ms` without camera shake.
3. Full serial QA initially exposed sustained desktop slow-frame streaks after screenshot readbacks. The authoritative performance test was moved before every screenshot case, unchanged snapshots stopped re-uploading static instance buffers, and the full-output reconstruction pass was reduced from three texture samples to one. Desktop cached bloom was then folded into that reconstruction with its alpha contribution preserved, eliminating a separate full-screen draw without changing output, target, or full-resolution detail sizes. All inherited sample and streak thresholds remained unchanged.
4. The final-fix 34-case serial run regenerated every capture at the pinned viewports. The four direction/readability comparisons and both contact sheets were inspected after that run. A single pickup produces a bounded cyan inward burst; collision produces separated red-orange sparks and a ship-centered shockwave. Normal and reduced-motion effects stay readable without hiding the route, entities, ship, or HUD.
5. The one-sample bilinear background reconstruction shows no block upscaling in the final implementation captures. Gate, ribs, ship, obstacles, crystals, and HUD remain on their existing full-resolution paths.

## Required fidelity surfaces

- Fonts and typography: condensed headings, tabular numbers, separated distance unit, and HUD hierarchy remain legible at desktop and Pixel 7 sizes. The procedural build does not reproduce the reference's exact custom arcade typeface; this remains P3.
- Spacing and layout: score/multiplier stay top-left, distance/gate top-right, energy bottom-center, and pause bottom-right. The feedback root matches the rendered ship X/Y in lanes 0/1/2 on desktop and Pixel 7 while remaining a sibling that does not inherit ship banking. No horizontal overflow or viewport clipping is present.
- Colors and tokens: collection uses cyan/white; collision uses red/orange against the established cyan-magenta tunnel. Neither effect erases route contrast.
- Image and asset quality: the reference is a cinematic raster concept; the implementation remains procedural Three.js. Flatter material lighting, lower micro-surface/reflection density, and reduced volumetric scattering remain P3.
- Copy and content: all visible text is game-specific and contains no Hanzi-learning content.
- Icons and controls: the pause control remains visible, keyboard reachable, and at least 44 px in every effect capture.

## Interaction, timing, lifecycle, and console checks

- Collection: a real deterministic crystal pickup restarts the cyan particles, ship emissive pulse, and `.is-energy-pulse` HUD animation for `250 ms`.
- Collision: a real deterministic obstacle hit restarts red-orange particles, shockwave, `.is-collision-flash`, and light camera shake. The result does not replace the impact until the complete `320 ms` duration elapses.
- Reduced motion: collection/collision feedback uses `120 ms`; collision framing remains stable and camera shake is absent.
- Verified keyboard, pointer, and touch steering; pause/resume countdown; collision and real depletion; exact reload restoration; hidden-tab pause; WebGL context loss/restore; static `/neon-glider/` paths; production test-hook isolation; no horizontal overflow.
- Unit coverage proves every owned feedback geometry/material is disposed exactly once and that scene children, buffer attributes, typed arrays, and resource identities are reused across collection, collision, update, and camera shake. Static production-path review found no allocation in per-frame feedback update/shake.
- A mutation-sensitive real Chromium/WebGL test uses the production composer at the exact desktop and Pixel 7 profiles, isolates the real Three.js `Points`, requires distributed cyan and red-orange pixels, and fails when particle material color writes are disabled. Lane alignment is asserted in screen space in both E2E profiles and after graph/context restoration.
- Custom isolated browser contexts close in `finally`; the authoritative performance cases run before capture readbacks for each project. No application console error, warning, or uncaught page error was observed in the capture run. Chromium's driver-level `GPU stall due to ReadPixels` capture warning is filtered as tool noise.

## Performance and release evidence

Local single-host evidence used Chromium `151.0.7922.34` on an Apple M3 Pro with 18 GiB RAM (`darwin arm64`), one worker, real RAF, unchanged sample requirements, and the inherited longest-slow-frame-streak cap of `3`.

| Profile/state | Samples | Median | Worst | Slow frames | Longest streak | Draw calls | Geometries | Textures | Input latency |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop normal | 73 | 41.7 ms | 191.6 ms | 4 | 2 | 48 | 13 | 15 | 0.8 ms |
| Desktop near gate, 247 m | 65 | 41.7 ms | 225.1 ms | 8 | 1 | 50 | 16 | 16 | 0.7 ms |
| Desktop collection pulse | 10 | 41.7 ms | 58.3 ms | 3 | 1 | 50 | 16 | 16 | 134.5 ms |
| Desktop collision impact | 1 | 75.1 ms | 75.1 ms | 1 | 1 | 50 | 17 | 16 | 72.4 ms |
| Pixel 7 normal | 105 | 33.2 ms | 41.6 ms | 0 | 0 | 43 | 13 | 14 | 0.9 ms |
| Pixel 7 near gate, 247 m | 88 | 33.4 ms | 42.1 ms | 0 | 0 | 44 | 15 | 15 | 0.7 ms |
| Pixel 7 collection pulse | 11 | 33.4 ms | 41.5 ms | 0 | 0 | 44 | 15 | 15 | 106.1 ms |
| Pixel 7 collision impact | 1 | 58.4 ms | 58.4 ms | 1 | 1 | 45 | 16 | 15 | 63.6 ms |

- `npm ci`: 154 packages installed, 155 audited, 0 vulnerabilities.
- Unit tests: 179/179 passed across 21 files.
- Browser tests: 34/34 passed serially across desktop Chromium and Pixel 7 emulation in 3.8 minutes.
- Production build: passed; `dist` is 4,712 KiB, below 5,120 KiB, and `dist/index.html` uses relative `./assets/...` URLs. Vite's only advisory is the 614.51 kB JavaScript chunk.
- Runtime network/static base: no source runtime network client was found; both browser projects passed the `/neon-glider/` resource-path gate.
- `git diff --check`: passed.
- P0: none. P1: none. P2: none.
- P3: procedural lighting, surface/reflection density, and volumetric depth remain less photorealistic than the pinned cinematic reference.

final result: passed
