import { test, expect } from '@playwright/test';

test.describe('home page', () => {
  test('hero and about section render', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.handoff-headline')).toBeVisible();
    await expect(page.locator('.handoff-copy')).toContainText('design, photography, video');
  });

  test('all medium preview sections render', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // JourneyPreview, DesignPreview, PhotographyPreview, VideographyPreview, SocialPreview
    await expect(page.locator('#journey-preview')).toBeAttached();
  });

  test('contact section has working mailto and instagram links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const mailLink = page.locator('.contact-cta[href^="mailto:"]');
    await expect(mailLink).toHaveAttribute('href', 'mailto:sydigitalstudios@gmail.com');

    const igLink = page.locator('.contact-cta[href*="instagram.com"]');
    await expect(igLink).toHaveAttribute('href', 'https://instagram.com/sydigitalstudios');
    await expect(igLink).toHaveAttribute('target', '_blank');
    await expect(igLink).toHaveAttribute('rel', /noopener/);
  });

  test('footer renders on home page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.micro-footer')).toContainText('SyDigitalStudios');
    await expect(page.locator('.micro-footer')).toContainText('Kingston, Jamaica');
  });

  test('"where it started" anchor scrolls to journey preview', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('.handoff-arrow-cta').click();
    await expect(page).toHaveURL(/#journey-preview$/);
  });
});
