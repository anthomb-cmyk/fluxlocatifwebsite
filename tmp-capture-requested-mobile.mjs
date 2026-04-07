import { chromium, devices } from 'playwright';
import fs from 'fs';

const outDir = '/tmp/fluxlocatif-mobile-requested';
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});
const context = await browser.newContext({ ...devices['iPhone 14 Pro Max'] });
const page = await context.newPage();
await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2400);

await page.locator('section#hero').first().waitFor({ state: 'visible', timeout: 30000 });
await page.screenshot({ path: `${outDir}/01-hero-complet.png`, fullPage: false });

const mockup = page.locator('section#hero .reveal-mockup').first();
await mockup.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await mockup.screenshot({ path: `${outDir}/02-hero-mockup-seul.png` });

const proof = page.locator('#proof-strip').first();
await proof.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: `${outDir}/03-reperes-mobile.png`, fullPage: false });

const benefits = page.locator('section#benefits').first();
await benefits.scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await page.screenshot({ path: `${outDir}/04-benefices-mobile.png`, fullPage: false });

await browser.close();
console.log(outDir);
