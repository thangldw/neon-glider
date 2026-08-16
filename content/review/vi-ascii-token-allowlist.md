# Safe unaccented Vietnamese token allowlist

The draft validator permits an ASCII-only word only when it appears in the explicit `SAFE_UNACCENTED_VIETNAMESE_TOKENS` set in `src/content/validate.ts`. This prevents an accented Vietnamese phrase from hiding arbitrary English text.

## Derivation and review

- Input: token scan of all 2,245 final draft CSV rows after round-3 local repair.
- Candidate definition: a Unicode-letter token containing only ASCII letters.
- 160 distinct candidates were inspected and form the complete bounded allowlist in the validator; no candidate was auto-allowed.
- Every accepted candidate is a Vietnamese unaccented lexical form or established Vietnamese loanword (`taxi`, `tivi`). `an`, `in`, `ty`, and `do` were retained only after local Qwen generated their Vietnamese uses (`an toàn`, `in ấn`, `công ty`, `tự do`).
- The prior English/ambiguous outputs were regenerated instead of being added. Any new ASCII-only token is rejected unless it is explicitly added through the same scan and inspection process.

## Additional fail-closed rules

- Any token with Vietnamese-specific orthography is accepted syntactically.
- Every other ASCII-only token is rejected unless listed above.
- Normalized pinyin tokens from the same source entry are rejected before this allowlist is considered; there is no length exception.
- This is draft-syntax validation only. It does not assert human review or release readiness.
