import { chromium } from 'playwright';
import { installFontRoutes } from './netcache.mjs';
import { spawn } from 'node:child_process';
const mode = process.argv[2];
const VERT = process.env.VERTICAL === '1';
const [VW, VH] = VERT ? [1080, 1920] : [1920, 1080];
const b = await chromium.launch({ args: ['--disable-gpu-vsync'] });
const ctx = await b.newContext({ viewport: { width: VW, height: VH } });
await installFontRoutes(ctx);
const page = await ctx.newPage();
page.on('console', (m) => console.log('[page]', m.text()));
page.on('pageerror', (e) => console.log('[err]', e.message));
await page.goto(`http://localhost:8765/comp.html${VERT ? '#v' : ''}`);
await page.evaluate(() => window.ready);
const dur = await page.evaluate(() => window.DURATION);
if (mode === 'stills') {
  const times = process.argv.slice(3).map(Number);
  for (const t of times) { await page.evaluate(([t]) => window.render(t, 0), [t]); await page.screenshot({ path: `stills/${VERT ? 'v' : 't'}${t.toFixed(2)}.jpg`, type: 'jpeg', quality: 85 }); }
} else {
  const fps = 30, n = Math.round(dur * fps);
  const from = Number(process.argv[3] || 0), to = Number(process.argv[4] || n);
  const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-tune', 'film', process.argv[5] || 'video_noaudio.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = from; f < to; f++) {
    await page.evaluate(([t, f]) => window.render(t, f), [f / fps, f]);
    const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (f % 150 === 0) console.log('frame', f, '/', to, ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  ff.stdin.end(); await new Promise((r) => ff.on('close', r));
}
await b.close();
