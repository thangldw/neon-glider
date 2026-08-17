# Neon Glider design QA

## Inspection contract

- Pinned source: `docs/superpowers/specs/assets/neon-glider-reference.png` (`1487 × 1058`, SHA-256 `f997cc6f181984faa513d6756ea097f7470a7412089a9de8be7fa8381f3bcfc9`).
- Implementation: `.superpowers/sdd/2026-08-17-neon-glider-redesign/artifacts/desktop-chromium/gameplay-center.png` (`1536 × 1024` CSS and captured pixels, browser device scale factor 1, internal WebGL pixel ratio 0.5), active gameplay at 242 m in the center lane.
- Normalized side-by-side inspection: `.superpowers/sdd/2026-08-17-neon-glider-redesign/artifacts/reference-vs-gameplay-final.png` (`2976 × 1024`); both source and implementation were opened and judged together in this single image.
- Responsive inspection: `.superpowers/sdd/2026-08-17-neon-glider-redesign/artifacts/mobile-chromium/gameplay-center.png` (`412 × 839` CSS pixels, `1082 × 2202` captured pixels, Pixel 7 emulation).
- Browser/host: Chromium 151.0.7922.34 on Apple M3 Pro, 18 GiB, macOS arm64. Mobile is browser emulation; desktop is not emulated.

## Blocking iteration history

| Iteration | Finding | Disposition and post-fix evidence |
| --- | --- | --- |
| 1 | P1 — scene was materially smaller, flatter, darker in the playfield, and less detailed than the reference; the ship and tunnel did not establish the same chase-camera hierarchy. | Reframed the camera and ship, moved the near tunnel rib around the camera, and strengthened the gate/tunnel depth. Verified in iterations 2–4. |
| 2 | P1 — bloom washed the tunnel into broad cyan fields and obscured obstacle/crystal depth. | Rebalanced emissive materials and replaced heavy bloom with a restrained single-pass glow. Verified by distinct dark wall/floor planes and crisp entities in iterations 3–4. |
| 3 | P2 — the tunnel interior was sparse relative to the reference, with insufficient longitudinal structure and wall/floor articulation. | Added instanced cyan/magenta rails, wire panel grids, and floor segmentation. Verified in iterations 4–6. |
| 4 | P2 — near-frame accents and the ship silhouette competed with the center playfield; obstacle and crystal shapes needed stronger separation. | Tuned rail thickness, ship scale/camera placement, solid ship surfaces, wire obstacles, and emissive crystals. Verified in iterations 5–7. |
| 5 | P2 — the ship silhouette remained too plain and the center body lost definition against the tunnel. | Added merged cyan panel trim and preserved the dark faceted hull/wing silhouette without adding draw calls. Verified in iterations 6–7. |
| 6 | P2 — transparent crystal material and repeated entity meshes reduced both emissive readability and the sustained-frame budget. | Removed transmission and batched obstacles/crystals into instanced geometry while retaining visible diagnostic markers. Verified visually and by the final 28-call performance sample in iterations 7–8. |
| 7 | P1 — the post-processing version still exceeded the sustained-frame gate on the desktop sample. | Reduced internal glow resolution and strength while keeping the cyan/magenta emissive palette. Verified in iteration 8. |
| 8 | P1 — repeated isolated desktop samples showed the reduced glow still lacked sustained-frame margin. | Switched desktop to direct WebGL rendering at a 0.5 release pixel ratio; mobile retains the inexpensive single-pass glow. The final desktop sample has a longest slow-frame streak of 1 and 26 maximum draw calls. |
| 9/final | No actionable P0/P1/P2 remains across composition, tunnel depth, ship silhouette/scale, palette, gate dominance, obstacle/crystal readability, HUD placement, energy/pause placement, clipping, center obstruction, or responsive framing. | Final normalized comparison and desktop/mobile captures inspected after the direct-render performance fix. |

## Final findings

- P0: none.
- P1: none.
- P2: none.
- P3: the procedural low-poly treatment intentionally has less volumetric lighting and micro-surface detail than the cinematic source; the half-resolution desktop canvas and reduced-resolution mobile glow have slight stair-step edges. These are non-blocking polish differences; the implementation preserves the reference hierarchy and game-state readability.

final result: passed
