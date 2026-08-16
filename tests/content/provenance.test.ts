import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { assertPinnedSourceSnapshot } from '../../scripts/provenance.mts';

describe('source provenance', () => {
  it('rejects a tampered source snapshot byte sequence', () => {
    const source = readFileSync('content/source/hsk3-2026.json');
    expect(() => assertPinnedSourceSnapshot(Buffer.concat([source, Buffer.from('\n')])))
      .toThrow('Pinned source snapshot hash mismatch');
  });
});
