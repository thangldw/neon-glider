import { expect, it } from 'vitest';
import config from '../playwright.config';

it('serializes browser projects so performance evidence measures one GPU workload', () => {
  expect(config.fullyParallel).toBe(false);
  expect(config.workers).toBe(1);
});
