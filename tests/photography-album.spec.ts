import { test, expect } from '@playwright/test';

test.describe('photography index', () => {
  test('renders an album card for every category', async ({ page }) => {
    await page.goto('/photography');
    await page.waitForLoadState('networkidle');

    const cards = page.locator('.album-card');
    await expect(cards).toHaveCount(4); // Match Day, Portraits, Tournament Weekend, Detail Study
  });

  test('clicking an album card navigates to its slugged route', async ({ page }) => {
    await page.goto('/photography');
    await page.waitForLoadState('networkidle');

    await page.locator('.album-card-link', { hasText: 'Match Day' }).click();
    await expect(page).toHaveURL('/photography/match-day');
    await expect(page.locator('.album-header-title')).toHaveText('Match Day');
  });
});

test.describe('photography album (detail study - small set)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/photography/detail-study');
    await page.locator('.justified-card').first().waitFor();
  });

  test('shows correct photo count and back link', async ({ page }) => {
    await expect(page.locator('.album-header-title')).toHaveText('Detail Study');
    await expect(page.locator('.album-header-count')).toHaveText('2 photos');
    await expect(page.locator('.album-back')).toBeVisible();
  });

  test('back link returns to photography index', async ({ page }) => {
    await page.locator('.album-back').click();
    await expect(page).toHaveURL('/photography');
  });

  test('opening a photo shows the lightbox', async ({ page }) => {
    await page.locator('.justified-card .frame').first().click();
    await expect(page.locator('.lightbox')).toBeVisible();
    await expect(page.locator('.lightbox-frame img')).toBeVisible();
  });

  test('lightbox next/prev cycles between photos', async ({ page }) => {
    await page.locator('.justified-card .frame').first().click();
    const img = page.locator('.lightbox-frame img');
    const firstSrc = await img.getAttribute('src');

    await page.locator('.lightbox-next').click();
    await expect(img).not.toHaveAttribute('src', firstSrc || '');

    await page.locator('.lightbox-prev').click();
    await expect(img).toHaveAttribute('src', firstSrc || '');
  });

  test('lightbox closes on close button', async ({ page }) => {
    await page.locator('.justified-card .frame').first().click();
    await expect(page.locator('.lightbox')).toBeVisible();
    await page.locator('.lightbox-close').click();
    await expect(page.locator('.lightbox')).toHaveCount(0);
  });

  test('lightbox closes on Escape key', async ({ page }) => {
    await page.locator('.justified-card .frame').first().click();
    await expect(page.locator('.lightbox')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.lightbox')).toHaveCount(0);
  });

  test('lightbox navigates with arrow keys', async ({ page }) => {
    await page.locator('.justified-card .frame').first().click();
    const img = page.locator('.lightbox-frame img');
    const firstSrc = await img.getAttribute('src');

    await page.keyboard.press('ArrowRight');
    await expect(img).not.toHaveAttribute('src', firstSrc || '');

    await page.keyboard.press('ArrowLeft');
    await expect(img).toHaveAttribute('src', firstSrc || '');
  });
});

test('unknown album slug redirects to photography index', async ({ page }) => {
  await page.goto('/photography/not-a-real-category');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL('/photography');
});
