import { test, expect } from '@playwright/test';
import { appUrl, appUrlPattern } from './app-url.ts';

const SECTIONS = [
  { short: 'HOME', path: '/' },
  { short: 'DESIGN', path: '/design' },
  { short: 'PHOTO', path: '/photography' },
  { short: 'VIDEOGRAPHY', path: '/video-editing' },
  { short: 'SOCIAL MEDIA', path: '/social' },
];

test.describe('page loads', () => {
  for (const section of SECTIONS) {
    test(`${section.path} loads without console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', (err) => errors.push(err.message));

      const response = await page.goto(appUrl(section.path));
      expect(response?.status()).toBeLessThan(400);
      await page.waitForLoadState('networkidle');

      expect(errors, `console errors on ${section.path}:\n${errors.join('\n')}`).toEqual([]);
    });
  }
});

test.describe('primary navigation', () => {
  for (const section of SECTIONS) {
    test(`nav link navigates to ${section.short}`, async ({ page }) => {
      await page.goto(appUrl('/'));
      await page.waitForLoadState('networkidle');

      await page.locator('.site-nav .nav-list a', { hasText: section.short }).click();
      await expect(page).toHaveURL(appUrlPattern(section.path));
    });
  }

  test('nav mark links back to home', async ({ page }) => {
    await page.goto(appUrl('/design'));
    await page.waitForLoadState('networkidle');
    await page.locator('.nav-mark').click();
    await expect(page).toHaveURL(appUrlPattern('/'));
  });

  test('mobile menu opens and navigates', async ({ page }) => {
    await page.setViewportSize({ width: 480, height: 800 });
    await page.goto(appUrl('/'));
    await page.waitForLoadState('networkidle');

    await page.locator('.nav-toggle').click();
    await expect(page.locator('.mobile-menu')).toBeVisible();

    await page.locator('.mobile-menu-list a', { hasText: 'Design' }).click();
    await expect(page).toHaveURL(appUrlPattern('/design'));
  });
});
