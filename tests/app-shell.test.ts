import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('app shell', () => {
  it('provides one application mount point', () => {
    document.body.innerHTML = '<main id="app"></main>';
    expect(document.querySelectorAll('#app')).toHaveLength(1);
  });

  it('brands the browser shell as Neon Glider', () => {
    const html = readFileSync(`${process.cwd()}/index.html`, 'utf8');
    expect(html).toContain('<title>Neon Glider</title>');
  });
});
