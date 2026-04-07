import { chromium, devices } from 'playwright';
import fs from 'fs';

const outDir = '/tmp/fluxlocatif-mobile-shots';
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});
const context = await browser.newContext({ ...devices['iPhone 14 Pro Max'] });
const page = await context.newPage();
await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded' });

await page.locator('h1:has-text("Louez avec moins d’effort.")').first().waitFor({ state: 'visible', timeout: 30000 });
await page.waitForTimeout(2200);

const captureViewportAt = async (selector, outFile) => {
  const loc = page.locator(selector).first();
  await loc.waitFor({ state: 'visible', timeout: 20000 });
  await loc.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${outDir}/${outFile}` });
};

await captureViewportAt('section#hero', '01-hero-complet-viewport.png');

const heroMock = page.locator('section#hero .reveal-mockup').first();
await heroMock.waitFor({ state: 'visible', timeout: 20000 });
await heroMock.scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await heroMock.screenshot({ path: `${outDir}/02-hero-mockup-only.png` });
await page.screenshot({ path: `${outDir}/02b-hero-mockup-viewport.png` });

await captureViewportAt('section:has-text("Les frictions que nous enlevons")', '03-frictions-viewport.png');
await captureViewportAt('section#benefits', '04-benefits-viewport.png');

await browser.close();
console.log(outDir);
