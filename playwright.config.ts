import { defineConfig, devices } from '@playwright/test';

const pagesPath = '/hanzi-glider/';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 0,
  reporter: 'line',
  outputDir: '.superpowers/sdd/2026-08-16-hanzi-glider-implementation/task-8-artifacts/test-results',
  use: {
    baseURL: `http://127.0.0.1:4173${pagesPath}`,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npm run preview -- --host 127.0.0.1 --base ${pagesPath}`,
    port: 4173,
    reuseExistingServer: false,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
});
