import { describe, expect, it, vi } from 'vitest';
import { clearLegacyLearningKeys } from '../../src/storage/legacy-cleanup';

type StorageLike = Pick<Storage, 'removeItem'>;
const clear = clearLegacyLearningKeys;

describe('clearLegacyLearningKeys', () => {
  it('removes both retired browser keys even if one storage backend is unavailable', () => {
    const sessionStorage = { removeItem: vi.fn(() => { throw new Error('blocked'); }) };
    const localStorage = { removeItem: vi.fn() };

    expect(() => clear(() => sessionStorage, () => localStorage)).not.toThrow();
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('hanzi-glider.run');
    expect(localStorage.removeItem).toHaveBeenCalledWith('hanzi-glider.progress');
  });

  it('still clears local storage when reading session storage throws', () => {
    const localStorage = { removeItem: vi.fn() };
    const browser = {
      get sessionStorage(): StorageLike { throw new Error('blocked'); },
      get localStorage(): StorageLike { return localStorage; },
    };

    expect(() => clear(() => browser.sessionStorage, () => browser.localStorage)).not.toThrow();
    expect(localStorage.removeItem).toHaveBeenCalledWith('hanzi-glider.progress');
  });

  it('still clears session storage when reading local storage throws', () => {
    const sessionStorage = { removeItem: vi.fn() };
    const browser = {
      get sessionStorage(): StorageLike { return sessionStorage; },
      get localStorage(): StorageLike { throw new Error('blocked'); },
    };

    expect(() => clear(() => browser.sessionStorage, () => browser.localStorage)).not.toThrow();
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('hanzi-glider.run');
  });
});
