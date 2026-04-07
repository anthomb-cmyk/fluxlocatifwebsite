import { chromium, devices } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});
const context = await browser.newContext({ ...devices['iPhone 14 Pro Max'] });
const page = await context.newPage();
await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3000);

const info = await page.evaluate(() => ({
  url: location.href,
  ready: document.readyState,
  title: document.title,
  sectionCount: document.querySelectorAll('section').length,
  heroById: !!document.getElementById('hero'),
  first500Text: document.body.innerText.slice(0, 500),
  bodyClass: document.body.className,
}));

console.log(JSON.stringify(info, null, 2));
const html = await page.content();
console.log('HTML_START');
console.log(html.slice(0, 1200));
console.log('HTML_END');
await page.screenshot({ path: '/tmp/fluxlocatif-mobile-shots/00-debug-fullpage.png', fullPage: true });
await browser.close();
