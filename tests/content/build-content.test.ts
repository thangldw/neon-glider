import { describe, expect, it } from 'vitest';
import { parseReviewCsv } from '../../scripts/build-content.mts';

describe('parseReviewCsv', () => {
  it('accepts the exact review header when a UTF-8 BOM is present', () => {
    expect(parseReviewCsv('\uFEFFid,meaningsVi,reviewedBy,reviewedAt\nrow,mặc,,\n')).toEqual([
      { id: 'row', meaningsVi: 'mặc', reviewedBy: '', reviewedAt: '' },
    ]);
  });
});
