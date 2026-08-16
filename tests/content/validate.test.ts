import { describe, expect, it } from 'vitest';
import { validateEntries } from '../../src/content/validate';

describe('validateEntries', () => {
  it('rejects duplicate ids and missing Vietnamese meanings', () => {
    const errors = validateEntries([
      { id: 'x', term: '爱', pinyin: 'ài', level: 1, sourceOrder: 1, meaningsVi: [] },
      { id: 'x', term: '爱好', pinyin: 'àihào', level: 1, sourceOrder: 2, meaningsVi: ['sở thích'] },
    ]);
    expect(errors).toContain('duplicate id: x');
    expect(errors).toContain('x: meaningsVi must not be empty');
  });

  it('rejects Han text, source echoes, and English-only draft meanings', () => {
    const errors = validateEntries([
      { id: 'han', term: '穿', pinyin: 'chuān', level: 1, sourceOrder: 1, meaningsVi: ['穿'] },
      { id: 'echo', term: '爱好', pinyin: 'àihào', level: 1, sourceOrder: 2, meaningsVi: ['aihao'] },
      { id: 'english', term: '六', pinyin: 'liù', level: 1, sourceOrder: 3, meaningsVi: ['six'] },
      { id: 'ascii-vi', term: '二', pinyin: 'èr', level: 1, sourceOrder: 4, meaningsVi: ['hai'] },
      { id: 'valid', term: '穿', pinyin: 'chuān', level: 1, sourceOrder: 5, meaningsVi: ['mặc'] },
      { id: 'accented-vi', term: '能', pinyin: 'néng', level: 1, sourceOrder: 6, meaningsVi: ['có thể'] },
      { id: 'nasal-accented-vi', term: '也', pinyin: 'yě', level: 1, sourceOrder: 7, meaningsVi: ['cũng'] },
    ]);
    expect(errors).toContain('han: meaningsVi must use Vietnamese draft syntax');
    expect(errors).toContain('echo: meaningsVi must use Vietnamese draft syntax');
    expect(errors).toContain('english: meaningsVi must use Vietnamese draft syntax');
    expect(errors).not.toContain('ascii-vi: meaningsVi must use Vietnamese draft syntax');
    expect(errors).not.toContain('valid: meaningsVi must use Vietnamese draft syntax');
    expect(errors).not.toContain('accented-vi: meaningsVi must use Vietnamese draft syntax');
    expect(errors).not.toContain('nasal-accented-vi: meaningsVi must use Vietnamese draft syntax');
  });

  it('rejects mixed English and embedded pinyin in Vietnamese-looking drafts', () => {
    const errors = validateEntries([
      { id: 'mixed-slash', term: '妇女', pinyin: 'fùnǚ', level: 1, sourceOrder: 1, meaningsVi: ['phụ nữ/woman (thường chỉ người trưởng thành)'] },
      { id: 'mixed-word', term: '妇女', pinyin: 'fùnǚ', level: 1, sourceOrder: 2, meaningsVi: ['người woman'] },
      { id: 'embedded-pinyin', term: '爱好', pinyin: 'àihào', level: 1, sourceOrder: 3, meaningsVi: ['người aihao'] },
      { id: 'testing', term: '妇女', pinyin: 'fùnǚ', level: 1, sourceOrder: 4, meaningsVi: ['người testing'] },
      { id: 'hello', term: '妇女', pinyin: 'fùnǚ', level: 1, sourceOrder: 5, meaningsVi: ['người hello'] },
      { id: 'short-pinyin', term: '包', pinyin: 'bāo', level: 1, sourceOrder: 6, meaningsVi: ['một bao'] },
      { id: 'allowlisted-ascii', term: '二', pinyin: 'èr', level: 1, sourceOrder: 7, meaningsVi: ['xe taxi'] },
    ]);
    expect(errors).toContain('mixed-slash: meaningsVi must use Vietnamese draft syntax');
    expect(errors).toContain('mixed-word: meaningsVi must use Vietnamese draft syntax');
    expect(errors).toContain('embedded-pinyin: meaningsVi must use Vietnamese draft syntax');
    expect(errors).toContain('testing: meaningsVi must use Vietnamese draft syntax');
    expect(errors).toContain('hello: meaningsVi must use Vietnamese draft syntax');
    expect(errors).toContain('short-pinyin: meaningsVi must use Vietnamese draft syntax');
    expect(errors).not.toContain('allowlisted-ascii: meaningsVi must use Vietnamese draft syntax');
  });
});
