import { chromium, devices } from 'playwright';

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage'] });
const context = await browser.newContext({ ...devices['iPhone 14 Pro Max'] });
const page = await context.newPage();
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.screenshot({ path: '/tmp/localhost-3000-fixed.png' });
await browser.close();
console.log('/tmp/localhost-3000-fixed.png');
