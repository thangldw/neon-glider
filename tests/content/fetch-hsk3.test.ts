import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseTermsPage } from '../../scripts/fetch-hsk3.mts';

describe('parseTermsPage', () => {
  it('normalizes official table rows', () => {
    const html = readFileSync('tests/fixtures/hsk-page.html', 'utf8');

    expect(parseTermsPage(html, 1)).toEqual([
      { id: 'hsk3-l1-0001', term: '爱', pinyin: 'ài', level: 1, sourceOrder: 1 },
      { id: 'hsk3-l1-0002', term: '爱好', pinyin: 'àihào', level: 1, sourceOrder: 2 },
    ]);
  });
});
