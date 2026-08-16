import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  assertPinnedSourceSnapshot,
  assertSourceSnapshotMetadata,
} from '../../scripts/provenance.mts';
import type { SourceSnapshot } from '../../src/content/types';

describe('source provenance', () => {
  it('accepts the tracked snapshot bytes and required retrieval metadata', () => {
    const sourceBytes = readFileSync('content/source/hsk3-2026.json');
    const source = JSON.parse(sourceBytes.toString('utf8')) as SourceSnapshot;

    expect(() => assertPinnedSourceSnapshot(sourceBytes)).not.toThrow();
    expect(() => assertSourceSnapshotMetadata(source)).not.toThrow();
  });

  it('rejects a tampered source snapshot byte sequence', () => {
    const source = readFileSync('content/source/hsk3-2026.json');
    expect(() => assertPinnedSourceSnapshot(Buffer.concat([source, Buffer.from('\n')])))
      .toThrow('Pinned source snapshot hash mismatch');
  });

  it.each([
    ['vocabularySourceUrl', 'https://example.invalid/terms'],
    ['retrievedAt', '2026-08-17'],
    ['vocabularyImportMethod', 'manual-copy'],
    ['vocabularyQuery', 'means=other'],
    ['syllabusUrl', 'https://example.invalid/syllabus.pdf'],
    ['syllabusSha256', '0'.repeat(64)],
  ] as const)('rejects tampered %s provenance metadata', (field, value) => {
    const source = JSON.parse(readFileSync('content/source/hsk3-2026.json', 'utf8')) as SourceSnapshot;
    const tampered = { ...source, [field]: value };

    expect(() => assertSourceSnapshotMetadata(tampered)).toThrow(`Invalid source metadata: ${field}`);
  });
});
