import { test, expect } from '@playwright/test';

test.describe('design page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/design');
    await page.locator('.poster-card, .justified-card').first().waitFor();
  });

  test('renders each category group title', async ({ page }) => {
    for (const category of ['Sports Graphics', 'UWI Computing', 'ICHS', 'Lifestyle & Listings']) {
      await expect(page.locator('.poster-group-title', { hasText: category })).toBeVisible();
    }
  });

  test('opening a poster card shows the lightbox with an image', async ({ page }) => {
    await page.locator('.poster-card .frame').first().click();
    await expect(page.locator('.lightbox')).toBeVisible();
    await expect(page.locator('.lightbox-frame img')).toBeVisible();
  });

  test('lightbox closes on Escape', async ({ page }) => {
    await page.locator('.poster-card .frame').first().click();
    await expect(page.locator('.lightbox')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.lightbox')).toHaveCount(0);
  });

  test('next archive link goes to photography', async ({ page }) => {
    await page.locator('.next-archive').click();
    await expect(page).toHaveURL('/photography');
  });
});
