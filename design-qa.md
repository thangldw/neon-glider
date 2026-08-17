# Neon Glider design QA

## Inspection contract

- Pinned source: `docs/superpowers/specs/assets/neon-glider-reference.png` (`1487 × 1058`, SHA-256 `f997cc6f181984faa513d6756ea097f7470a7412089a9de8be7fa8381f3bcfc9`).
- Final implementation frame: `.superpowers/sdd/2026-08-17-neon-glider-redesign/artifacts/desktop-chromium/gameplay-center.png` (`1536 × 1024`, desktop Chromium, 242 m, center lane).
- Normalized comparison: `.superpowers/sdd/2026-08-17-neon-glider-redesign/artifacts/reference-vs-gameplay-final.png` (`3072 × 1024`). The pinned source was aspect-fit and padded to `1536 × 1024`; the implementation was captured at the same CSS dimensions.
- Complete state audit: `desktop-contact-sheet.png` and `mobile-contact-sheet.png`, generated from exactly 10 final PNGs per profile: menu, center/left/right gameplay, gate, pause, collision, depletion, reduced motion, and WebGL fallback.
- Browser/host: Chromium `151.0.7922.34`; Apple M3 Pro, 18 GiB, `darwin arm64`. Pixel 7 is emulated; desktop is not.

## Final fix-wave visual iterations

| Iteration | Direct finding | Disposition |
| --- | --- | --- |
| 1 | P1: reviewed release was a direct-render Basic/Phong scene without the required production composer, metallic response, bloom, or source-like luminous hierarchy. | Added Standard/Physical PBR materials and enabled `EffectComposer → RenderPass → UnrealBloomPass → OutputPass` for desktop and mobile. |
| 2 | P1: full-scene composer restored bloom but produced `99.9 ms` desktop median; lower full-composer scales either failed (`58.3 ms`) or visibly pixelated the complete frame. | Rejected those versions. Kept full canvas backing and separated a crisp PBR base from low-resolution selective emissive bloom. |
| 3 | P1: first hybrid frame over-bloomed the foreground gate and left wall/floor surfaces nearly black. | Reduced bloom strength/radius, moved the active gate back, added cyan/magenta/violet light hierarchy, and retuned metal/emissive balance. |
| 4 | P2: ship was oversized and under-defined; large flat wall panels still lacked depth cues. | Reframed the ship, added contrasting PBR armor, merged same-material ship geometry, added alternating panel color and sparse instanced panel seams, and strengthened floor segmentation. |
| 5 | Performance rejection: PMREM and sampled procedural maps improved only micro-detail but caused sustained desktop slow-frame failures. | Removed both experiments. Kept geometry-based panel detail and PBR lighting; thresholds and sampling semantics were not changed. |
| 6/final | No actionable P0/P1/P2 across the normalized comparison or the 20-state desktop/mobile audit. | Final frame preserves the source hierarchy: low chase ship, dominant luminous octagonal gate, deep repeated tunnel, cyan/magenta balance, metallic solid surfaces, readable dark obstacles, emissive crystals, unobstructed center path, and edge-anchored HUD. |

## Renderer and responsive disposition

- Production path uses Standard/Physical PBR materials plus `EffectComposer`, `RenderPass`, `UnrealBloomPass`, and `OutputPass`; composer failure remains fail-safe to direct emissive rendering.
- Desktop keeps canvas backing scale `1`, renders the PBR base at `0.60` internal scale, and composites selective bloom from a `0.35` composer with `0.8` bloom buffers. Mobile keeps direct PBR base rendering, uses the `1.35` DPR cap, hides dense streaks and panel seams, reduces tunnel instances, and uses a `0.75` composer with `0.65` bloom buffers.
- Final real-RAF evidence: desktop `43` samples, `50.0 ms` median, `91.7 ms` worst, `7` slow frames, longest slow streak `2`, `49` draw calls; mobile `66` samples, `33.3 ms` median, `116.6 ms` worst, `1` slow frame, streak `1`, `45` draw calls. Both preserve the unchanged ceilings.
- All three lanes keep the full transformed ship inside the clip volume on desktop and Pixel 7; the final contact sheets show no HUD clipping, center-card obstruction, or fallback-state regression.

## Final findings

- P0: none.
- P1: none.
- P2: none.
- P3: the procedural low-poly implementation retains less micro-surface density and volumetric scattering than the cinematic source. This does not reduce lane, obstacle, crystal, gate, ship, or HUD readability.

final result: passed
