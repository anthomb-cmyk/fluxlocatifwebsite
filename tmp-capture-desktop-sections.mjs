import { chromium } from 'playwright';
import fs from 'fs';

const outDir = '/tmp/fluxlocatif-mobile-shots';
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
const context = await browser.newContext({ viewport: { width: 1536, height: 960 } });
const page = await context.newPage();
await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded' });
await page.locator('h1:has-text("Louez avec moins d’effort.")').first().waitFor({ state: 'visible', timeout: 30000 });
await page.waitForTimeout(1600);

const cap = async (selector, file, full = false) => {
  const loc = page.locator(selector).first();
  await loc.waitFor({ state: 'visible', timeout: 20000 });
  await loc.scrollIntoViewIfNeeded();
  await page.waitForTimeout(450);
  if (full) {
    await page.screenshot({ path: `${outDir}/${file}` });
  } else {
    await loc.screenshot({ path: `${outDir}/${file}` });
  }
};

await cap('section#hero', '11-hero-complet-desktop.png');
await cap('section#hero .reveal-mockup', '12-hero-mockup-desktop.png');
await cap('#proof-strip', '13-proof-strip-desktop.png');
await cap('section:has-text("Les frictions que nous enlevons")', '14-frictions-desktop.png');
await cap('section#benefits', '15-benefits-desktop.png');
await browser.close();
console.log(outDir);
