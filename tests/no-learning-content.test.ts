import { execFileSync } from 'node:child_process';
import { expect, it } from 'vitest';

it('contains no learning runtime, content tooling, or retired package scripts', () => {
  const files = execFileSync('git', ['ls-files'], { encoding: 'utf8' }).trim().split('\n');
  expect(files.some((file) => file.startsWith('content/') || file.startsWith('src/content/'))).toBe(false);
  expect(files.some((file) => file.includes('hsk') || file.includes('draft-meanings') || file.includes('repair-vietnamese'))).toBe(false);
  const pkg = JSON.parse(execFileSync('node', ['-p', 'JSON.stringify(require("./package.json"))'], { encoding: 'utf8' }));
  expect(Object.keys(pkg.scripts).some((name) => name.startsWith('content:'))).toBe(false);
});
