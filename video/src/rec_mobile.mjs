import { record, smoothScroll } from './rec.mjs';
await record('mobile', { width: 390, height: 844, dpr: 2.5, mobile: true, script: async (page, { start, mark }) => {
  await page.goto('about:blank');
  await start();
  await page.goto('http://localhost:4173/', { waitUntil: 'commit' });
  await page.waitForTimeout(7500);
  const seg = async (k, to, ms, hold) => { mark(k); await smoothScroll(page, to, ms); await page.waitForTimeout(hold); };
  await seg('hero', 867 - 56, 1500, 900);
  await seg('about', 1464 - 56, 1300, 700);
  await seg('statement', 2031 + 500, 1800, 700);
  await seg('process', 3739 + 400, 2400, 400);
  await seg('products', 6856 - 56, 2200, 1000);
  await seg('gallery', 7339 - 56, 1200, 1500);
  mark('end');
}});
