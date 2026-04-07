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
await page.waitForTimeout(2000);

const hero = page.locator('section#hero').first();
await hero.waitFor({ state: 'visible', timeout: 20000 });
await hero.scrollIntoViewIfNeeded();
await page.waitForTimeout(250);
await hero.screenshot({ path: outDir + '/01-hero-complet.png' });

const heroMockup = page.locator('section#hero .reveal-mockup').first();
await heroMockup.waitFor({ state: 'visible', timeout: 20000 });
await heroMockup.scrollIntoViewIfNeeded();
await page.waitForTimeout(250);
await heroMockup.screenshot({ path: outDir + '/02-hero-mockup.png' });

const frictions = page.locator('section').filter({ hasText: 'Les frictions que nous enlevons' }).first();
await frictions.waitFor({ state: 'visible', timeout: 20000 });
await frictions.scrollIntoViewIfNeeded();
await page.waitForTimeout(250);
await frictions.screenshot({ path: outDir + '/03-frictions.png' });

const benefits = page.locator('section#benefits').first();
await benefits.waitFor({ state: 'visible', timeout: 20000 });
await benefits.scrollIntoViewIfNeeded();
await page.waitForTimeout(250);
await benefits.screenshot({ path: outDir + '/04-benefits.png' });

const debug = await page.evaluate(() => ({
  hasHero: !!document.querySelector('section#hero'),
  hasMock: !!document.querySelector('section#hero .reveal-mockup'),
  hasBenefits: !!document.querySelector('section#benefits'),
  sectionCount: document.querySelectorAll('section').length,
}));

await browser.close();
console.log(JSON.stringify({ outDir, debug }, null, 2));
