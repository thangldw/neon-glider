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
});
