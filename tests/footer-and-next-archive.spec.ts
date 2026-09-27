import { test, expect } from '@playwright/test';
import { appUrl, appUrlPattern } from './app-url.ts';

const CYCLE = [
  { path: '/design', nextPath: '/photography', nextLabel: 'PHOTO' },
  { path: '/photography', nextPath: '/video-editing', nextLabel: 'VIDEOGRAPHY' },
  { path: '/video-editing', nextPath: '/social', nextLabel: 'SOCIAL MEDIA' },
  { path: '/social', nextPath: '/', nextLabel: 'HOME' },
];

test.describe('next archive footer link', () => {
  for (const step of CYCLE) {
    test(`${step.path} -> next archive goes to ${step.nextPath}`, async ({ page }) => {
      await page.goto(appUrl(step.path));
      await page.waitForLoadState('networkidle');

      const nextArchive = page.locator('.next-archive');
      await expect(nextArchive).toBeVisible();
      await expect(nextArchive).toContainText(step.nextLabel);

      await nextArchive.click();
      await expect(page).toHaveURL(appUrlPattern(step.nextPath));
    });
  }
});

test.describe('footer presence', () => {
  const PAGES = ['/', '/design', '/photography', '/video-editing', '/social', '/journey'];
  for (const path of PAGES) {
    test(`footer renders on ${path}`, async ({ page }) => {
      await page.goto(appUrl(path));
      await page.waitForLoadState('networkidle');
      const footer = page.locator('.micro-footer');
      await expect(footer).toBeVisible();
      await expect(footer).toContainText('SyDigitalStudios');
    });
  }
});
