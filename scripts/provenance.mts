import { createHash } from 'node:crypto';
import type { SourceSnapshot } from '../src/content/types';

export const PINNED_SOURCE_SNAPSHOT_SHA256 = '700f34bcd0dc893e97060dedca94c5a6486da1a2c6f166982dfae8270feab49b';

export const SOURCE_METADATA = {
  datasetVersion: 'hsk3-2026-08-16',
  label: 'HSK 3.0 · 2026',
  vocabularySourceUrl: 'https://admin.chinesetest.cn/standardsAction.do',
  retrievedAt: '2026-08-16',
  vocabularyImportMethod: 'sessionized-paged-html-table',
  vocabularyQuery: 'means=getStandardWordsList&A=0&leves={一级|二级|三级}&words=&pinyin=&words_type=&pager.offset={0,10,...}',
  syllabusUrl: 'https://hsk.cn-bj.ufileos.com/3.0/%E6%96%B0%E7%89%88HSK%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B21219.pdf',
  syllabusSha256: 'ec74ce0439e837bbb15154be13e747ae798903b2fd3a331629df6c3b45504941',
} as const;

export function assertSourceSnapshotMetadata(snapshot: SourceSnapshot): void {
  for (const [field, expected] of Object.entries(SOURCE_METADATA)) {
    if (snapshot[field as keyof typeof SOURCE_METADATA] !== expected) {
      throw new Error(`Invalid source metadata: ${field}`);
    }
  }
}

export function sourceSnapshotSha256(sourceBytes: Uint8Array): string {
  return createHash('sha256').update(sourceBytes).digest('hex');
}

export function assertPinnedSourceSnapshot(sourceBytes: Uint8Array): void {
  const actual = sourceSnapshotSha256(sourceBytes);
  if (actual !== PINNED_SOURCE_SNAPSHOT_SHA256) {
    throw new Error(`Pinned source snapshot hash mismatch: ${actual}`);
  }
}
