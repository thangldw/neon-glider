# Neon Glider visual-polish design QA

## Evidence contract

- Source truth: `docs/superpowers/specs/assets/neon-glider-reference.png`, SHA-256 `f997cc6f181984faa513d6756ea097f7470a7412089a9de8be7fa8381f3bcfc9`.
- Source pixels: `1487 × 1058`; normalized by aspect-fit with black side padding to a `1536 × 1024` comparison frame.
- Implementation: `.superpowers/sdd/2026-08-17-neon-glider-visual-polish/artifacts/desktop-chromium/gameplay-center.png`, `1536 × 1024` CSS and physical pixels at device scale factor `1`, active gameplay at 190 m in the center lane.
- Combined same-state evidence: `.superpowers/sdd/2026-08-17-neon-glider-visual-polish/artifacts/reference-vs-gameplay-final.png`, `3072 × 1024`.
- State overview: `.superpowers/sdd/2026-08-17-neon-glider-visual-polish/artifacts/desktop-contact-sheet.png` and `.superpowers/sdd/2026-08-17-neon-glider-visual-polish/artifacts/mobile-contact-sheet.png`.
- Pixel 7 captures: `412 × 839` CSS pixels at device scale factor `2.625`, producing `1082 × 2202` PNGs.
- Each profile contains exactly: `menu.png`, `gameplay-center.png`, `gameplay-left.png`, `gameplay-right.png`, `gate.png`, `paused.png`, `collision-result.png`, `depleted-result.png`, `reduced-motion.png`, and `restored-run.png`.

## Comparison history

1. The first visual-polish capture kept the transmissive gate plane visible at long range. It flattened tunnel depth and partially obscured obstacles and crystals, a P2 readability mismatch.
2. The gate glass was bounded to the final 18 m passage flash; mobile also removed low-value recess, floor-seam, and magenta gate-accent passes. Desktop composer/base scales were tuned to `0.30 / 0.42` after the real-RAF gate failed. Bloom strengths, gate material values, particle budgets, gameplay, and thresholds remain unchanged.
3. The final implementation was recaptured at identical viewports. The combined comparison and both contact sheets show an open center view during normal play, a dominant near-pass gate, readable obstacles/crystals, full ship silhouettes in every lane, and no HUD or viewport clipping.

## Required fidelity surfaces

- Fonts and typography: the condensed display treatment, small uppercase HUD labels, tabular numbers, separated distance unit, and menu hierarchy remain legible at desktop and Pixel 7 sizes. The procedural build does not reproduce the source's exact custom arcade typeface; this is P3.
- Spacing and layout: score/multiplier stay top-left, distance/gate top-right, energy bottom-center, and pause bottom-right. The playfield center and ship remain unobstructed; no horizontal overflow is present.
- Colors and tokens: cyan navigation, magenta accent, deep navy surfaces, restrained translucent HUD backing, and emissive hierarchy match the approved direction. The near-pass glass is intentionally brighter than the source's open gate, but is short-lived and does not obscure normal gameplay.
- Image and asset quality: the source is a cinematic raster concept; the implementation is intentionally procedural Three.js with no runtime image or model assets. Ship, tunnel, gates, obstacles, and crystals are real rendered geometry. Residual micro-surface density, reflections, and volumetric scattering are P3.
- Copy and content: all visible text is game-specific, concise, and contains no Hanzi-learning content.
- Icons and controls: the pause glyph is consistent across desktop/mobile; all primary controls remain visible, keyboard reachable, and at least 44 px.

## Interaction, lifecycle, and console checks

- Verified keyboard steering, desktop pointer steering, Pixel 7 touch steering, pause/resume countdown, collision, real energy depletion, reduced motion, exact reload restoration, hidden-tab pause, WebGL context loss/restore, static `/neon-glider/` paths, and production test-hook isolation.
- No application console errors, application warnings, or uncaught page errors were observed. Chromium emitted only its driver-level `GPU stall due to ReadPixels` warning while Playwright captured screenshots; this is capture-tool readback, not an application event.
- Reduced motion removes UI transitions, banking/exhaust acceleration, and decorative acceleration while retaining static depth cues.

## Performance and release evidence

| Profile | Samples | Median | Worst | Slow frames | Longest streak | Draw calls | Geometries | Textures | Input latency |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop `1536 × 1024` | 40 | 50.0 ms | 258.2 ms | 9 | 3 | 50 | 14 | 16 | 1.5 ms |
| Pixel 7 emulation | 59 | 33.4 ms | 100.0 ms | 1 | 1 | 44 | 14 | 15 | 1.2 ms |

- `npm ci`: 0 vulnerabilities.
- Unit tests: 139/139 passed.
- Browser tests: 30/30 passed serially across desktop Chromium and Pixel 7 emulation.
- Production build: passed; `dist` is 4,700 KiB and uses relative `/neon-glider/` assets.
- P0: none. P1: none. P2: none.
- P3: the procedural scene remains less photorealistic than the source in micro-surface detail, reflection density, and volumetric scattering.
- Focused region comparison was not required: HUD typography, gate label, ship silhouette, and entity contours are readable in the full-resolution combined image and individual full-resolution captures.

final result: passed
