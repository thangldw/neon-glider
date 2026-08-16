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
    ]);
    expect(errors).toContain('han: meaningsVi must use Vietnamese draft syntax');
    expect(errors).toContain('echo: meaningsVi must use Vietnamese draft syntax');
    expect(errors).toContain('english: meaningsVi must use Vietnamese draft syntax');
    expect(errors).not.toContain('ascii-vi: meaningsVi must use Vietnamese draft syntax');
    expect(errors).not.toContain('valid: meaningsVi must use Vietnamese draft syntax');
  });
});
