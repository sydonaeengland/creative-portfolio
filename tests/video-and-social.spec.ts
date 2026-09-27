import { test, expect } from '@playwright/test';

test.describe('video editing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/video-editing');
    await page.waitForLoadState('networkidle');
  });

  test('renders each video group title', async ({ page }) => {
    for (const category of ['Jamaica Day', 'Airbnb', 'Clothing Brand', 'Sports']) {
      await expect(page.locator('.video-group-title', { hasText: category })).toBeVisible();
    }
  });

  test('video cards are present and playable elements exist', async ({ page }) => {
    const videos = page.locator('.video-justified-gallery video');
    await expect(videos.first()).toBeAttached();
    const count = await videos.count();
    expect(count).toBeGreaterThan(0);
  });

  test('next archive link goes to social', async ({ page }) => {
    await page.locator('.next-archive').click();
    await expect(page).toHaveURL('/social');
  });
});

test.describe('social page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/social');
    await page.waitForLoadState('networkidle');
  });

  test('renders stat values', async ({ page }) => {
    await expect(page.locator('.social-stat-label', { hasText: 'Accounts Managed' })).toBeVisible();
    await expect(page.locator('.social-stat-label', { hasText: 'Posts Designed' })).toBeVisible();
    await expect(page.locator('.social-stat-label', { hasText: 'Events Covered Live' })).toBeVisible();
  });

  test('phone carousel renders images', async ({ page }) => {
    const carouselImgs = page.locator('.social-phone img');
    await expect(carouselImgs.first()).toBeVisible();
  });

  test('next archive link cycles back to home', async ({ page }) => {
    await page.locator('.next-archive').click();
    await expect(page).toHaveURL('/');
  });
});
