import { describe, expect, it } from 'vitest';
import { parseReviewCsv, rebuildContent } from '../../scripts/build-content.mts';

describe('parseReviewCsv', () => {
  it('accepts the exact review header when a UTF-8 BOM is present', () => {
    expect(parseReviewCsv('\uFEFFid,meaningsVi,reviewedBy,reviewedAt\nrow,mặc,,\n')).toEqual([
      { id: 'row', meaningsVi: 'mặc', reviewedBy: '', reviewedAt: '' },
    ]);
  });
});

it('copies reconstructable vocabulary and syllabus provenance into the release manifest', async () => {
  const { manifest } = await rebuildContent();

  expect(manifest.source).toEqual({
    vocabularySourceUrl: 'https://admin.chinesetest.cn/standardsAction.do',
    retrievedAt: '2026-08-16',
    vocabularyImportMethod: 'sessionized-paged-html-table',
    vocabularyQuery: 'means=getStandardWordsList&A=0&leves={一级|二级|三级}&words=&pinyin=&words_type=&pager.offset={0,10,...}',
    syllabusUrl: 'https://hsk.cn-bj.ufileos.com/3.0/%E6%96%B0%E7%89%88HSK%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B21219.pdf',
    syllabusSha256: 'ec74ce0439e837bbb15154be13e747ae798903b2fd3a331629df6c3b45504941',
    snapshotSha256: expect.stringMatching(/^[a-f0-9]{64}$/),
  });
});
