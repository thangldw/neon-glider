# Neon Glider design QA

## Inspection contract

- Pinned source: `docs/superpowers/specs/assets/neon-glider-reference.png` (`1487 × 1058`, SHA-256 `f997cc6f181984faa513d6756ea097f7470a7412089a9de8be7fa8381f3bcfc9`).
- Implementation: `.superpowers/sdd/2026-08-17-neon-glider-redesign/artifacts/desktop-chromium/gameplay-center.png` (`1536 × 1024` CSS and captured pixels, browser device scale factor 1, internal WebGL backing scale 1), active gameplay at 242 m in the center lane.
- Normalized side-by-side inspection: `.superpowers/sdd/2026-08-17-neon-glider-redesign/artifacts/reference-vs-gameplay-final.png` (`2976 × 1024`); source and implementation were normalized to the same height, opened, and judged together in this single image.
- Responsive inspection: `.superpowers/sdd/2026-08-17-neon-glider-redesign/artifacts/mobile-chromium/gameplay-center.png` (`412 × 839` CSS pixels, `1082 × 2202` captured pixels, internal WebGL backing scale 1, Pixel 7 emulation).
- Browser/host: Chromium 151.0.7922.34 on Apple M3 Pro, 18 GiB, macOS arm64. Mobile is browser emulation; desktop is not emulated.

## Blocking iteration history

| Iteration | Finding | Disposition and post-fix evidence |
| --- | --- | --- |
| 1 | P1 — scene was materially smaller, flatter, darker in the playfield, and less detailed than the reference; the ship and tunnel did not establish the same chase-camera hierarchy. | Reframed the camera and ship, moved the near tunnel rib around the camera, and strengthened the gate/tunnel depth. Verified in iterations 2–4. |
| 2 | P1 — bloom washed the tunnel into broad cyan fields and obscured obstacle/crystal depth. | Rebalanced emissive materials and replaced heavy bloom with a restrained single-pass glow. Verified by distinct dark wall/floor planes and crisp entities in iterations 3–4. |
| 3 | P2 — the tunnel interior was sparse relative to the reference, with insufficient longitudinal structure and wall/floor articulation. | Added instanced cyan/magenta rails, panel grids, and floor segmentation. Verified in iterations 4–6. |
| 4 | P2 — near-frame accents and the ship silhouette competed with the center playfield; obstacle and crystal shapes needed stronger separation. | Tuned rail thickness, ship scale/camera placement, ship surfaces, obstacle edges, and emissive crystals. Verified in iterations 5–7. |
| 5 | P2 — the ship silhouette remained too plain and the center body lost definition against the tunnel. | Added merged panel detail while preserving the faceted hull/wing silhouette. Verified in iterations 6–7. |
| 6 | P2 — transparent crystal material and repeated entity meshes reduced both emissive readability and the sustained-frame budget. | Removed transmission and batched obstacles/crystals into instanced geometry. Verified visually and by the performance sample in iterations 7–8. |
| 7 | P1 — the post-processing version still exceeded the sustained-frame gate on the desktop sample. | Reduced internal glow resolution and strength. Verified in iteration 8. |
| 8 | P1 — repeated isolated desktop samples showed the reduced glow still lacked sustained-frame margin. | Switched desktop to direct rendering at a reduced backing scale. The sustained-frame gate passed, but the later review correctly reopened visual fidelity. |
| 9 | P1 — direct inspection of the source, comparison, desktop/mobile lane captures, and live preview found visibly coarse backing resolution, wireframe/flat surfaces, weak gate depth, a dark under-detailed ship, and weak obstacle/crystal depth. | Reopened the gate. Added failing CSS-resolution, solid-material, ship-trim, tunnel/gate, entity-outline, and immediate-keyboard contracts before changing production code. |
| 10 | P2 — the first CSS-faithful recapture was crisp and materially more dimensional, but the near gate and rails still lacked the source's luminous hierarchy. | Raised the full-resolution four-tap glow response and recaptured. The visual change introduced doubled edge/label ghosts and the real desktop sample failed with a 15-frame slow streak, so this version was rejected. |
| 11 | P1 — full-resolution post-processing could not preserve the unchanged sustained-frame gate with margin. | Selected full-resolution direct rendering for both profiles, retained saturated emissive geometry, and moved depth work into low-cost Phong solids plus instanced obstacle outlines and gate accents. The next isolated desktop/mobile samples passed at 32 draw calls with longest streak 1. |
| 12/final | No actionable P0/P1/P2 remains across resolution, composition, tunnel/gate dominance, ship silhouette/detail, solid-surface hierarchy, obstacle/crystal depth, HUD placement, energy/pause placement, clipping, center obstruction, or responsive framing. | Opened the pinned source and latest deterministic desktop capture together in `reference-vs-gameplay-final.png`, then separately inspected all three desktop lanes and the Pixel 7 center lane after the final renderer change. |

## Final findings

- P0: none.
- P1: none.
- P2: none.
- P3: the procedural low-poly release intentionally has less volumetric halo and micro-surface density than the cinematic source. Full-resolution high-contrast emissive geometry is retained instead of a screen-space blur that failed the binding sustained-frame gate; this does not reduce lane, gate, obstacle, crystal, or ship readability.

final result: passed
