# Neon Glider final fix-wave report

## Status

- Verdict: **PASS**.
- Finding disposition: Critical `0`; Important `3/3 closed`; Minor `5/5 closed`.
- Implementation commit: `6704dcde838217d87b549a5eee4ec1c2d3acb94d` (`fix: close Neon Glider final review`).
- Scope constraints preserved: `schemaVersion = 2`; no deploy; performance thresholds and real-RAF sampling semantics unchanged; no user work removed.

## Finding dispositions

| Review finding | Disposition | Production change | Regression/evidence |
| --- | --- | --- | --- |
| Important 1 — renderer contract and pinned visual mismatch | Closed | Restored Standard/Physical PBR materials and the production `EffectComposer → RenderPass → UnrealBloomPass → OutputPass` path. Added selective emissive bloom, cyan/magenta/violet light hierarchy, metallic floor/walls, luminous gates/crystals, defined low-poly ship armor, and desktop/mobile quality scaling. Composer failure still falls back to direct rendering. | Focused renderer tests cover pass construction/use, fallback, quality scales, material classes, light hierarchy, and bounded visible instances. Exactly 10 desktop and 10 mobile state captures were regenerated. Direct inspection of the normalized source/implementation composite and both contact sheets found P0 `0`, P1 `0`, P2 `0`; one non-actionable P3 is tracked. |
| Important 2 — schema-v2 validator accepts incompatible states | Closed | Validator now requires `speed === min(26 + gates × 1.5, 52)`, `multiplier === min(1 + gates × 0.25, 8)`, positive energy for playing/paused runs, and zero energy for depleted runs. Invalid records fail closed and are cleared. | Table-driven load/clear tests cover every relationship and are mutation-sensitive. Schema stays at version `2`. |
| Important 3 — permanent safe center lane | Closed | Production random-access generator uses a deterministic rotating shared-open-lane corridor. Adjacent segments retain a reachable transition; chunk boundaries bridge the current and next corridor. All lanes, including center, are blocked over representative long runs. | Production generator regression checks random access, deterministic RNG consumption, every lane blocked, and adjacent reachability. Browser long-run regression reaches 5 km while proving every lane and sole-open lane occurs and run remains reachable/playing. |
| Minor 1 — depletion resolved at frame end | Closed | Runner resolves the earliest exact within-frame terminal event among depletion, collision, and intended end, then applies distance, score, gates, crystals, and energy only through that time. | Regression for `energy = 0.01`, `dt = 0.25` asserts `0.004 s`, `0.104 m`, and `1.04` score; tie/event-order regressions cover gate restoration. |
| Minor 2 — weak context-loss lifecycle regression | Closed | Context restore replays the exact last accepted snapshot. | Test asserts frozen render count and visual time while lost, then exact lane, gate, and all visible entity state after restoration before accepting the next delta. |
| Minor 3 — mutation-insensitive controller teardown | Closed | Existing teardown remains idempotent and disposes every owned resource. | Active countdown/frame test spies on timer cancellation, RAF cancellation, action unbinding, view disposal, monitor disposal, and visibility-listener removal. Deleting listener cleanup made the focused test fail and was reverted. |
| Minor 4 — storage failure missing at controller integration | Closed | Controller preserves in-memory gameplay when persistence is unavailable and emits a deduplicated semantic warning. | Integration injects load/save/clear failures, asserts exactly one warning, and asserts uninterrupted play. Disabling warning deduplication made the focused test fail and was reverted. |
| Minor 5 — visible instance transforms tested only by markers | Closed | Visible cube/prism/wall/crystal `InstancedMesh` batches continue to receive lane/Z/rotation transforms and bounded counts. | Tests read actual instance matrices and counts, including stale-count clearing. Replacing a visible matrix with identity made the focused test fail and was reverted. |

## RED → GREEN evidence

- Initial focused simulation/storage command (`npm test -- tests/storage/runner-storage.test.ts tests/simulation/track-generator.test.ts tests/simulation/run.test.ts`) exposed `7` failures for relationship validation, permanent-center production generation, and frame-end depletion. The final suite passes with the production fixes above.
- Initial focused renderer command (`npm test -- tests/render/neon-materials.test.ts tests/render/post-fx.test.ts tests/render/neon-ship.test.ts tests/render/neon-tunnel.test.ts tests/render/runner-view.test.ts tests/render/neon-entity-field.test.ts`) exposed `9` failures for the missing PBR/composer/light/visible-instance contracts. The final suite passes with the production renderer path enabled on desktop and mobile.
- Mutation checks were run against the new tests and then reverted: identity visible-instance matrix failed lane transform (`expected -3, received 0`); deleted visibility-listener cleanup failed the teardown spy; disabled storage warning guard failed the exactly-once assertion. Validator relationship mutations likewise failed their load/clear table cases.
- Final unit result is `19` files and `129/129` tests passing.

## Visual QA iterations

1. Restoring a full-scene composer closed the missing-bloom contract but measured a `99.9 ms` desktop median.
2. Lower full-composer scales measured `58.3 ms` or made the complete scene visibly coarse, so those variants were rejected.
3. A full-resolution PBR base plus low-resolution selective emissive bloom retained crisp geometry and source-like luminous depth. The first hybrid was retuned to reduce foreground-gate bloom and lift dark wall/floor response.
4. Ship scale/armor, alternating solid panels, sparse panel seams, floor segmentation, gate depth, and cyan/magenta/violet lighting were tuned against the pinned source.
5. PMREM and sampled procedural maps were rejected after sustained slow-frame failures. Geometry/light tuning was retained instead.
6. Final direct inspection covered the `3072 × 1024` normalized source/implementation composite plus desktop and mobile contact sheets. Each sheet contains menu, center/left/right gameplay, gate, pause, collision, depletion, reduced motion, and WebGL fallback. Result: P0 `0`, P1 `0`, P2 `0`; tracked P3 only for lower micro-surface density and volumetric scattering than the cinematic source.

Pinned reference SHA-256: `f997cc6f181984faa513d6756ea097f7470a7412089a9de8be7fa8381f3bcfc9`.

## Final verification

| Command/check | Result |
| --- | --- |
| `npm ci` | PASS; `154` packages added, `155` audited, `0` vulnerabilities. |
| `npm test` | PASS; `19` files, `129/129` tests. |
| `npm run build` | PASS; TypeScript no-emit and Vite production build; advisory only for the `599.56 kB` JavaScript chunk. |
| `npm run test:e2e -- --workers=1` | PASS; `30/30` serial tests in `3.0m` (`15` desktop Chromium, `15` Pixel 7 emulation). |
| Capture count | PASS; exactly `10` desktop PNGs and `10` mobile PNGs. |
| `du -sk dist` | PASS; `4,696 KiB`, below the `5 MiB` release cap. |
| `rg -n '^final result: passed$' design-qa.md` count | PASS; exactly `1`. |
| `git diff --check` | PASS; no whitespace errors. |
| Deployment | Not run. |

Final real-RAF performance evidence was captured with normal simulation advancement:

| Profile | Samples | Median | Worst | Slow frames | Longest streak | Max draw calls | Geometries | Textures | Input latency |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop `1536 × 1024` | 43 | 50.0 ms | 91.7 ms | 7 | 2 | 49 | 14 | 16 | 1.3 ms |
| Pixel 7 emulation | 66 | 33.3 ms | 116.6 ms | 1 | 1 | 45 | 13 | 15 | 1.4 ms |

Unchanged acceptance thresholds all pass: sample count `> 30`, longest slow-frame streak `≤ 3`, desktop draw calls `≤ 60`, mobile draw calls `≤ 45`, and input latency `< 500 ms`.

## Residual concerns

- Visual P3 only: the procedural low-poly implementation has less micro-surface density and volumetric scattering than the cinematic reference; gameplay hierarchy/readability is unaffected.
- Performance is single-host local evidence. Individual worst-frame spikes reached `91.7 ms` desktop and `116.6 ms` mobile, while longest streaks remained within the unchanged threshold (`2` and `1`).
- Vite retains its non-blocking `599.56 kB` chunk-size advisory.
- No deployment, customer acceptance, or cross-device physical-mobile validation was performed; Pixel 7 evidence is emulated.
