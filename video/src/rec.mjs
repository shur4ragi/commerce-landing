// Records real-time screencast frames (with timestamps) from Chromium via CDP.
import { chromium } from 'playwright';
import { installFontRoutes } from './netcache.mjs';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';

export const SLOW = 4;
const SHIM = `(() => {
  const N = ${SLOW};
  const rNow = performance.now.bind(performance), rDate = Date.now, t0 = rNow(), d0 = rDate();
  performance.now = () => t0 + (rNow() - t0) / N;
  Date.now = () => d0 + (rDate() - d0) / N;
  const RD = Date; 
  window.Date = class extends RD { constructor(...a) { if (a.length) super(...a); else super(Date.now()); } static now() { return d0 + (rDate() - d0) / N; } };
  const rRaf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => rRaf(() => cb(performance.now()));
  const rST = window.setTimeout.bind(window), rSI = window.setInterval.bind(window);
  window.setTimeout = (f, d = 0, ...a) => rST(f, d * N, ...a);
  window.setInterval = (f, d = 0, ...a) => rSI(f, d * N, ...a);
})();`;
export async function record(name, { width, height, dpr = 1, mobile = false, script, headless = true }) {
  const out = new URL(`./rec/${name}/`, import.meta.url).pathname;
  rmSync(out, { recursive: true, force: true }); mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless });
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: dpr, isMobile: mobile, hasTouch: mobile });
  await installFontRoutes(ctx);
  await ctx.addInitScript(SHIM);
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Animation.enable');
  await cdp.send('Animation.setPlaybackRate', { playbackRate: 1 / SLOW });
  page.on('load', () => cdp.send('Animation.setPlaybackRate', { playbackRate: 1 / SLOW }).catch(() => {}));
  // Waits are expressed in virtual (video) milliseconds.
  const _wait = page.waitForTimeout.bind(page);
  page.waitForTimeout = (ms) => _wait(ms * SLOW);
  const frames = [];
  let recording = false;
  cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
    cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
    if (!recording) return;
    const i = frames.length;
    writeFileSync(`${out}/f${String(i).padStart(5, '0')}.jpg`, Buffer.from(data, 'base64'));
    frames.push({ i, t: metadata.timestamp / SLOW });
  });
  const start = async () => {
    await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: width * dpr, maxHeight: height * dpr, everyNthFrame: 1 });
    recording = true;
  };
  const marks = {};
  const mark = (k) => { marks[k] = Date.now() / 1000 / SLOW; };
  await script(page, { start, mark });
  recording = false;
  await cdp.send('Page.stopScreencast');
  await browser.close();
  writeFileSync(`${out}/index.json`, JSON.stringify({ frames, marks }));
  const dur = frames.at(-1).t - frames[0].t;
  console.log(name, frames.length, 'frames', dur.toFixed(2), 's', (frames.length / dur).toFixed(1), 'fps');
}

// Smooth, eased scroll driven by rAF inside the page.
export async function smoothScroll(page, to, ms) {
  await page.evaluate(([to, ms]) => new Promise((res) => {
    const from = window.scrollY, t0 = performance.now();
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
    const step = (now) => {
      const t = Math.min((now - t0) / ms, 1);
      window.scrollTo(0, from + (to - from) * ease(t));
      t < 1 ? requestAnimationFrame(step) : res();
    };
    requestAnimationFrame(step);
  }), [to, ms]);
}
