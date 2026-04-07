import { chromium, devices } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});
const context = await browser.newContext({ ...devices['iPhone 14 Pro Max'] });
const page = await context.newPage();

page.on('console', (msg) => {
  console.log('CONSOLE', msg.type(), msg.text());
});
page.on('pageerror', (err) => {
  console.log('PAGEERROR', err.message);
});
page.on('requestfailed', (req) => {
  console.log('REQFAIL', req.url(), req.failure()?.errorText);
});

await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(6000);

const text = await page.evaluate(() => document.body.innerText);
console.log('BODY', text.slice(0, 300));
await browser.close();
