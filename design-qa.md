# Neon Glider visual-polish design QA

## Evidence contract

- Source truth: `docs/superpowers/specs/assets/neon-glider-reference.png`, SHA-256 `f997cc6f181984faa513d6756ea097f7470a7412089a9de8be7fa8381f3bcfc9`.
- Source pixels: `1487 × 1058`; normalized by aspect-fit with black side padding to a `1536 × 1024` comparison frame.
- Implementation: `.superpowers/sdd/2026-08-17-neon-glider-visual-polish/artifacts/desktop-chromium/gate.png`, `1536 × 1024` CSS and physical pixels at device scale factor `1`, active gameplay at 247 m in the center lane.
- Combined same-state evidence: `.superpowers/sdd/2026-08-17-neon-glider-visual-polish/artifacts/reference-vs-gameplay-final.png`, `3072 × 1024`.
- State overview: `.superpowers/sdd/2026-08-17-neon-glider-visual-polish/artifacts/desktop-contact-sheet.png` and `.superpowers/sdd/2026-08-17-neon-glider-visual-polish/artifacts/mobile-contact-sheet.png`.
- Pixel 7 captures: `412 × 839` CSS pixels at device scale factor `2.625`, producing `1082 × 2202` PNGs.
- Each profile contains exactly: `menu.png`, `gameplay-center.png`, `gameplay-left.png`, `gameplay-right.png`, `gate.png`, `paused.png`, `collision-result.png`, `depleted-result.png`, `reduced-motion.png`, and `restored-run.png`.

## Comparison history

1. The first visual-polish capture kept the transmissive gate plane visible at long range. It flattened tunnel depth and partially obscured obstacles and crystals, a P2 readability mismatch.
2. Review showed that the bounded transmissive plane still became an opaque wall near 247 m and raised the real-render path to 70 desktop / 61 Pixel draw calls. The release marker was withheld.
3. The full-aperture plane was replaced by an open additive octagonal rim on desktop; Pixel keeps the existing open gate frame without an extra flash pass. The first bounded desktop path used composer/base scales of `0.25 / 0.34`.
4. Whole-branch review found visible whole-frame upscaling in that desktop path and an unstable full-serial near-gate slow-frame streak. The release marker was withheld while full-resolution and MSAA variants were measured and rejected for sustained slow frames.
5. The final desktop architecture reconstructs the background from a `0.50` PBR target, renders gate/ribs/ship/entities as a full-resolution lightweight detail layer, and composites selective `0.20` bloom every second frame. This replaces low-resolution critical draws rather than duplicating them. Pixel rendering, bloom presets, gameplay, persistence, inputs, schemas, and all acceptance thresholds remain unchanged.
6. The exact final implementation was recaptured at identical viewports. The normalized comparison uses the center-lane 247 m state. It and both contact sheets show normal one-pixel edge antialiasing without whole-frame block upscaling, an open route, readable obstacles/crystals, full ship silhouettes, and no HUD or viewport clipping.

## Required fidelity surfaces

- Fonts and typography: the condensed display treatment, small uppercase HUD labels, tabular numbers, separated distance unit, and menu hierarchy remain legible at desktop and Pixel 7 sizes. The procedural build does not reproduce the source's exact custom arcade typeface; this is P3.
- Spacing and layout: score/multiplier stay top-left, distance/gate top-right, energy bottom-center, and pause bottom-right. The playfield center and ship remain unobstructed; no horizontal overflow is present.
- Colors and tokens: cyan navigation, magenta accent, deep navy surfaces, restrained translucent HUD backing, and emissive hierarchy match the approved direction. The near-pass frame remains bright, open, and readable without a full-aperture transmission pass.
- Image and asset quality: the source is a cinematic raster concept; the implementation is intentionally procedural Three.js with no runtime image or model assets. Ship, tunnel, gates, obstacles, and crystals are real rendered geometry. Critical desktop silhouettes are rasterized at the full `1536 × 1024` output resolution. Flatter detail-layer lighting, residual micro-surface density, reflections, and volumetric scattering are P3.
- Copy and content: all visible text is game-specific, concise, and contains no Hanzi-learning content.
- Icons and controls: the pause glyph is consistent across desktop/mobile; all primary controls remain visible, keyboard reachable, and at least 44 px.

## Interaction, lifecycle, and console checks

- Verified keyboard steering, desktop pointer steering, Pixel 7 touch steering, pause/resume countdown, collision, real energy depletion, reduced motion, exact reload restoration, hidden-tab pause, WebGL context loss/restore, static `/neon-glider/` paths, and production test-hook isolation.
- No application console errors, application warnings, or uncaught page errors were observed. Chromium emitted only its driver-level `GPU stall due to ReadPixels` warning while Playwright captured screenshots; this is capture-tool readback, not an application event.
- Reduced motion removes UI transitions, banking/exhaust acceleration, and decorative acceleration while retaining static depth cues.

## Performance and release evidence

| Profile/state | Samples | Median | Worst | Slow frames | Longest streak | Draw calls | Geometries | Textures | Input latency |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop normal | 69 | 41.8 ms | 93.2 ms | 6 | 1 | 49 | 13 | 15 | 0.8 ms |
| Desktop near gate, 247 m | 62 | 50.0 ms | 75.0 ms | 20 | 2 | 51 | 15 | 16 | 0.6 ms |
| Pixel 7 normal | 102 | 33.3 ms | 250.0 ms | 1 | 1 | 43 | 13 | 14 | 0.7 ms |
| Pixel 7 near gate, 247 m | 88 | 33.4 ms | 41.8 ms | 0 | 0 | 44 | 14 | 15 | 0.6 ms |

- `npm ci`: 0 vulnerabilities.
- Unit tests: 142/142 passed.
- Browser tests: 30/30 passed serially across desktop Chromium and Pixel 7 emulation.
- Production build: passed; `dist` is 4,704 KiB and uses relative `/neon-glider/` assets.
- P0: none. P1: none. P2: none.
- P3: the procedural scene remains flatter and less photorealistic than the source in material lighting, micro-surface detail, reflection density, and volumetric scattering.
- The full-resolution same-state comparison directly covers the gate aperture, label, ship silhouette, and entity contours; no separate crop is required.

final result: passed
