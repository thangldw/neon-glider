import { describe, expect, it } from 'vitest';

describe('app shell', () => {
  it('provides one application mount point', () => {
    document.body.innerHTML = '<main id="app"></main>';
    expect(document.querySelectorAll('#app')).toHaveLength(1);
  });
});
