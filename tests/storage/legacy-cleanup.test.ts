import { describe, expect, it, vi } from 'vitest';
import { clearLegacyLearningKeys } from '../../src/storage/legacy-cleanup';

describe('clearLegacyLearningKeys', () => {
  it('removes both retired browser keys even if one storage backend is unavailable', () => {
    const sessionStorage = { removeItem: vi.fn(() => { throw new Error('blocked'); }) };
    const localStorage = { removeItem: vi.fn() };

    expect(() => clearLegacyLearningKeys(sessionStorage, localStorage)).not.toThrow();
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('hanzi-glider.run');
    expect(localStorage.removeItem).toHaveBeenCalledWith('hanzi-glider.progress');
  });
});
