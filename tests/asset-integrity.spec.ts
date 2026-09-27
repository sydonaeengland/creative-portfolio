import { test, expect, Page } from '@playwright/test';
import { appUrl } from './app-url.ts';

const PAGES = ['/', '/design', '/photography', '/video-editing', '/social'];

async function collectFailedMedia(page: Page, path: string) {
  const failed: string[] = [];
  page.on('response', (res) => {
    const url = res.url();
    const isMedia = /\.(png|jpe?g|webp|gif|svg|mp4|webm|mov)(\?.*)?$/i.test(url);
    if (isMedia && res.status() >= 400) {
      failed.push(`${res.status()} ${url}`);
    }
  });
  await page.goto(appUrl(path));
  await page.waitForLoadState('networkidle');
  return failed;
}

test.describe('media asset integrity', () => {
  for (const path of PAGES) {
    test(`no broken image/video requests on ${path}`, async ({ page }) => {
      const failed = await collectFailedMedia(page, path);
      expect(failed, `broken media on ${path}:\n${failed.join('\n')}`).toEqual([]);
    });
  }

  async function expectAllImagesLoaded(page: Page) {
    const imgs = page.locator('img');
    const count = await imgs.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const img = imgs.nth(i);
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(async () => img.evaluate((el: HTMLImageElement) => el.naturalWidth), {
          message: `image at index ${i} failed to load: ${await img.getAttribute('src')}`,
        })
        .toBeGreaterThan(0);
    }
  }

  test('every rendered <img> on the design page has a natural width > 0', async ({ page }) => {
    await page.goto(appUrl('/design'));
    await page.locator('.poster-card, .justified-card').first().waitFor();
    await expectAllImagesLoaded(page);
  });

  test('every rendered <img> on the photography album pages has a natural width > 0', async ({ page }) => {
    await page.goto(appUrl('/photography/detail-study'));
    await page.locator('.justified-card').first().waitFor();
    await expectAllImagesLoaded(page);
  });
});
