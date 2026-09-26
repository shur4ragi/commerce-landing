import { record } from './rec.mjs';
await record('intro', { width: 1920, height: 1080, script: async (page, { start, mark }) => {
  await page.goto('about:blank');
  await start();
  await page.goto('http://localhost:4173/', { waitUntil: 'commit' });
  mark('nav');
  await page.waitForTimeout(13500);
}});
