import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  webServer: {
    // `vite dev` doesn't apply `base` to files served from `public/`, only
    // `vite build` + `preview` do (matching how GitHub Pages actually
    // serves the site) — tests run against the production build so they
    // catch base-path asset bugs instead of masking them.
    command: 'npm run build && npm run preview -- --port 4173',
    url: 'http://localhost:4173/creative-portfolio/',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
