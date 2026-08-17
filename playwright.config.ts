import { defineConfig, devices } from '@playwright/test';

const pagesPath = '/neon-glider/';

export default defineConfig({
  testDir: './e2e',
  timeout: 90_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'line',
  outputDir: '.superpowers/sdd/2026-08-17-neon-glider-redesign/artifacts/test-results',
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
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1536, height: 1024 }, deviceScaleFactor: 1 },
    },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
});
