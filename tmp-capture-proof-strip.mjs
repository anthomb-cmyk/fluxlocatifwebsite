import { chromium, devices } from 'playwright';
import fs from 'fs';

const outDir = '/tmp/fluxlocatif-mobile-shots';
fs.mkdirSync(outDir, { recursive: true });

async function mobileCapture() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
  const context = await browser.newContext({ ...devices['iPhone 14 Pro Max'] });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2200);

  const proof = page.locator('#proof-strip').first();
  await proof.waitFor({ state: 'visible', timeout: 20000 });
  await proof.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await proof.screenshot({ path: `${outDir}/05-proof-strip-mobile.png` });
  await page.screenshot({ path: `${outDir}/05b-proof-strip-mobile-viewport.png` });

  await browser.close();
}

async function desktopCapture() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
  const context = await browser.newContext({ viewport: { width: 1536, height: 960 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2200);

  const proof = page.locator('#proof-strip').first();
  await proof.waitFor({ state: 'visible', timeout: 20000 });
  await proof.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await proof.screenshot({ path: `${outDir}/06-proof-strip-desktop.png` });
  await page.screenshot({ path: `${outDir}/06b-proof-strip-desktop-viewport.png` });

  await browser.close();
}

await mobileCapture();
await desktopCapture();
console.log(outDir);
