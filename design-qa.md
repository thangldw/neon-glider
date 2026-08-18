# Neon Glider gameplay-feedback design QA

## Evidence contract

- Source truth: `docs/superpowers/specs/assets/neon-glider-reference.png`, SHA-256 `f997cc6f181984faa513d6756ea097f7470a7412089a9de8be7fa8381f3bcfc9`, source pixels `1487 × 1058`.
- Plan-local root: `.superpowers/sdd/2026-08-18-neon-glider-gameplay-feedback/artifacts`.
- Desktop implementation captures: `desktop-chromium/feedback-collection.png`, `desktop-chromium/feedback-collision-impact.png`, and `desktop-chromium/feedback-reduced-collision-impact.png`, each `1536 × 1024` CSS and physical pixels at device scale factor `1`.
- Pixel 7 implementation captures: the equivalent files under `mobile-chromium`, each `412 × 839` CSS pixels at device scale factor `2.625`, producing `1082 × 2202` PNGs.
- Combined same-state evidence: `reference-vs-feedback-collection-desktop.png`, `reference-vs-feedback-collision-desktop.png`, `reference-vs-feedback-collection-mobile.png`, and `reference-vs-feedback-collision-mobile.png`.
- Effect overviews: `feedback-desktop-contact-sheet.png` and `feedback-mobile-contact-sheet.png`; columns are collection, normal collision, and reduced-motion collision.
- Each profile contains exactly 13 player-visible PNGs: menu, center/left/right gameplay, gate, paused, collision result, depletion result, reduced motion, restored run, collection feedback, collision impact, and reduced-motion collision impact.

## Comparison and disposition history

1. The prior visual-polish gate established the open route, full ship silhouettes, unclipped HUD, and the split desktop composition. Its transmissive-plane and low-resolution whole-frame variants were rejected before this task.
2. The first gameplay-feedback acceptance run exposed the cyan collection pulse and the red-orange collision flash/shockwave at real deterministic events. Normal collision correctly held the result for `320 ms`; reduced motion completed in `120 ms` without camera shake.
3. Full serial QA initially exposed sustained desktop slow-frame streaks after screenshot readbacks. The authoritative performance test was moved before every screenshot case, unchanged snapshots stopped re-uploading static instance buffers, and the full-output reconstruction pass was reduced from three texture samples to one. Desktop cached bloom was then folded into that reconstruction with its alpha contribution preserved, eliminating a separate full-screen draw without changing output, target, or full-resolution detail sizes. All inherited sample and streak thresholds remained unchanged.
4. The final 34-case serial run regenerated every capture at the pinned viewports. The four combined comparisons and both contact sheets were inspected after that run. Cyan collection particles/pulse remain localized to the ship and energy HUD; the collision flash, particles, and shockwave remain visible without hiding the route, entities, ship, or HUD.
5. The one-sample bilinear background reconstruction shows no block upscaling in the final same-state captures. Gate, ribs, ship, obstacles, crystals, and HUD remain on their existing full-resolution paths.

## Required fidelity surfaces

- Fonts and typography: condensed headings, tabular numbers, separated distance unit, and HUD hierarchy remain legible at desktop and Pixel 7 sizes. The procedural build does not reproduce the reference's exact custom arcade typeface; this remains P3.
- Spacing and layout: score/multiplier stay top-left, distance/gate top-right, energy bottom-center, and pause bottom-right. The effect is ship-centered; no horizontal overflow or viewport clipping is present.
- Colors and tokens: collection uses cyan/white; collision uses red/orange against the established cyan-magenta tunnel. Neither effect erases route contrast.
- Image and asset quality: the reference is a cinematic raster concept; the implementation remains procedural Three.js. Flatter material lighting, lower micro-surface/reflection density, and reduced volumetric scattering remain P3.
- Copy and content: all visible text is game-specific and contains no Hanzi-learning content.
- Icons and controls: the pause control remains visible, keyboard reachable, and at least 44 px in every effect capture.

## Interaction, timing, lifecycle, and console checks

- Collection: a real deterministic crystal pickup restarts the cyan particles, ship emissive pulse, and `.is-energy-pulse` HUD animation for `250 ms`.
- Collision: a real deterministic obstacle hit restarts red-orange particles, shockwave, `.is-collision-flash`, and light camera shake. The result does not replace the impact until the complete `320 ms` duration elapses.
- Reduced motion: collection/collision feedback uses `120 ms`; collision framing remains stable and camera shake is absent.
- Verified keyboard, pointer, and touch steering; pause/resume countdown; collision and real depletion; exact reload restoration; hidden-tab pause; WebGL context loss/restore; static `/neon-glider/` paths; production test-hook isolation; no horizontal overflow.
- Custom isolated browser contexts close in `finally`; the authoritative performance cases run before capture readbacks for each project. No application console error, warning, or uncaught page error was observed in the capture run. Chromium's driver-level `GPU stall due to ReadPixels` capture warning is filtered as tool noise.

## Performance and release evidence

Local single-host evidence used Chromium `151.0.7922.34` on an Apple M3 Pro with 18 GiB RAM (`darwin arm64`), one worker, real RAF, unchanged sample requirements, and the inherited longest-slow-frame-streak cap of `3`.

| Profile/state | Samples | Median | Worst | Slow frames | Longest streak | Draw calls | Geometries | Textures | Input latency |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop normal | 65 | 41.7 ms | 233.3 ms | 7 | 1 | 48 | 13 | 15 | 0.9 ms |
| Desktop near gate, 247 m | 69 | 41.9 ms | 58.3 ms | 7 | 1 | 50 | 16 | 16 | 0.7 ms |
| Desktop collection pulse | 10 | 50.0 ms | 50.4 ms | 2 | 1 | 50 | 16 | 16 | 139.9 ms |
| Desktop collision impact | 1 | 41.6 ms | 41.6 ms | 0 | 0 | 50 | 17 | 16 | 43.1 ms |
| Pixel 7 normal | 86 | 33.3 ms | 250.0 ms | 1 | 1 | 43 | 13 | 14 | 1.1 ms |
| Pixel 7 near gate, 247 m | 72 | 41.7 ms | 124.6 ms | 7 | 2 | 44 | 15 | 15 | 0.9 ms |
| Pixel 7 collection pulse | 10 | 41.65 ms | 49.9 ms | 0 | 0 | 44 | 15 | 15 | 125.5 ms |
| Pixel 7 collision impact | 1 | 25.0 ms | 25.0 ms | 0 | 0 | 45 | 16 | 15 | 32.9 ms |

- `npm ci`: 154 packages installed, 155 audited, 0 vulnerabilities.
- Unit tests: 175/175 passed across 21 files.
- Browser tests: 34/34 passed serially across desktop Chromium and Pixel 7 emulation in 4.0 minutes.
- Production build: passed; `dist` is 4,708 KiB, below 5,120 KiB, and `dist/index.html` uses relative `./assets/...` URLs.
- Runtime network/static base: no source runtime network client was found; both browser projects passed the `/neon-glider/` resource-path gate.
- `git diff --check`: passed.
- P0: none. P1: none. P2: none.
- P3: procedural lighting, surface/reflection density, and volumetric depth remain less photorealistic than the pinned cinematic reference.

final result: passed
