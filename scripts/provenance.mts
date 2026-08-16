import { createHash } from 'node:crypto';

export const PINNED_SOURCE_SNAPSHOT_SHA256 = '90df69f473e21279fdfce1206e9b962fe4d7dbd918ee818ea55fecabdc09d27f';

export function sourceSnapshotSha256(sourceBytes: Uint8Array): string {
  return createHash('sha256').update(sourceBytes).digest('hex');
}

export function assertPinnedSourceSnapshot(sourceBytes: Uint8Array): void {
  const actual = sourceSnapshotSha256(sourceBytes);
  if (actual !== PINNED_SOURCE_SNAPSHOT_SHA256) {
    throw new Error(`Pinned source snapshot hash mismatch: ${actual}`);
  }
}
