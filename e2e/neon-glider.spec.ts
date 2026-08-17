import { expect, test } from '@playwright/test';

test('starts from the Neon Glider menu and silently clears retired browser keys', async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem('hanzi-glider.run', 'legacy');
    localStorage.setItem('hanzi-glider.progress', 'legacy');
  });

  await page.goto('?e2e=1');

  await expect(page.locator('[data-screen="menu"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'NEON GLIDER' })).toBeVisible();
  await expect(page.locator('[data-storage-warning]')).toHaveCount(0);
  expect(await page.evaluate(() => sessionStorage.getItem('hanzi-glider.run'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('hanzi-glider.progress'))).toBeNull();
});
