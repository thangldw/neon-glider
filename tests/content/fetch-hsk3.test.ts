import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { appendTermsPage, parseSourcePage, parseTermsPage } from '../../scripts/fetch-hsk3.mts';

describe('parseTermsPage', () => {
  it('normalizes official table rows', () => {
    const html = readFileSync('tests/fixtures/hsk-page.html', 'utf8');

    expect(parseTermsPage(html, 1)).toEqual([
      { id: 'hsk3-l1-0001', term: '爱', pinyin: 'ài', level: 1, sourceOrder: 1 },
      { id: 'hsk3-l1-0002', term: '爱好', pinyin: 'àihào', level: 1, sourceOrder: 2 },
    ]);
  });

  it('rejects an expired-session page without the official table', () => {
    expect(() => parseTermsPage('<html><body>登录超时，请重新登录</body></html>', 1))
      .toThrow('HSK source table header is invalid');
  });

  it('rejects an altered table header', () => {
    const html = `
      <table>
        <tr><td>序号</td><td>级别</td><td>词语</td><td>拼音</td><td>词性</td></tr>
        <tr><td>1</td><td>一级</td><td>爱</td><td>ài</td><td>动</td></tr>
      </table>
      <div id="tongji">共有 1 条记录</div>`;

    expect(() => parseTermsPage(html, 1)).toThrow('HSK source table header is invalid');
  });

  it('rejects rows with a wrong level or column shape', () => {
    const wrongLevel = `
      <table>
        <tr><td>No.</td><td>级别</td><td>词语</td><td>拼音</td><td>词性</td></tr>
        <tr><td>1</td><td>二级</td><td>爱</td><td>ài</td><td>动</td></tr>
      </table>
      <div id="tongji">共有 1 条记录</div>`;
    const wrongColumns = `
      <table>
        <tr><td>No.</td><td>级别</td><td>词语</td><td>拼音</td><td>词性</td></tr>
        <tr><td>1</td><td>一级</td><td>爱</td><td>ài</td></tr>
      </table>
      <div id="tongji">共有 1 条记录</div>`;

    expect(() => parseTermsPage(wrongLevel, 1)).toThrow('HSK source row level is invalid');
    expect(() => parseTermsPage(wrongColumns, 1)).toThrow('HSK source row column count is invalid');
  });
});

describe('appendTermsPage', () => {
  const firstTerm = { id: 'hsk3-l1-0001', term: '爱', pinyin: 'ài', level: 1 as const, sourceOrder: 1 };

  it('rejects a zero or truncated page before reaching the reported total', () => {
    expect(() => appendTermsPage([], { terms: [], total: 1 }, undefined))
      .toThrow('HSK source page is empty before the reported total');
    expect(() => appendTermsPage([], { terms: [firstTerm], total: 2 }, undefined))
      .toThrow('HSK source page is truncated');
  });

  it('rejects duplicate terms and a changing reported total', () => {
    expect(() => appendTermsPage([firstTerm], { terms: [firstTerm], total: 2 }, 2))
      .toThrow('HSK source page contains a duplicate term id');
    expect(() => appendTermsPage([], { terms: [firstTerm], total: 1 }, 2))
      .toThrow('HSK source reported total changed');
  });

  it('marks a complete page only when it reaches the reported total', () => {
    const page = parseSourcePage(readFileSync('tests/fixtures/hsk-page.html', 'utf8'), 1);

    expect(appendTermsPage([], page, undefined)).toEqual({
      terms: [
        firstTerm,
        { id: 'hsk3-l1-0002', term: '爱好', pinyin: 'àihào', level: 1, sourceOrder: 2 },
      ],
      total: 2,
      complete: true,
    });
  });
});
