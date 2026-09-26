// Fake, video-friendly cursor rendered inside the page + helpers to move/click with it.
export const CURSOR_JS = `(() => {
  if (window.__cur) return;
  const c = document.createElement('div');
  c.id = '__cur';
  c.innerHTML = '<svg width="34" height="34" viewBox="0 0 24 24"><path d="M4 2.5l15 8.2-6.6 1.6-3.1 6.2z" fill="#1c120d" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg><span></span>';
  Object.assign(c.style, { position: 'fixed', left: '0', top: '0', zIndex: 2147483647, pointerEvents: 'none', transform: 'translate(-100px,-100px)', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.35))' });
  const r = c.querySelector('span');
  Object.assign(r.style, { position: 'absolute', left: '-22px', top: '-22px', width: '44px', height: '44px', borderRadius: '50%', border: '3px solid #D4652F', opacity: '0', transform: 'scale(.3)' });
  document.documentElement.appendChild(c);
  let x = -100, y = -100;
  window.__cur = {
    set(nx, ny) { x = nx; y = ny; c.style.transform = 'translate(' + (x - 5) + 'px,' + (y - 3) + 'px)'; },
    move(tx, ty, ms) { return new Promise((res) => { const fx = x, fy = y, t0 = performance.now();
      const e = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
      const s = (now) => { const t = Math.min((now - t0) / ms, 1), k = e(t); const arc = Math.sin(t * Math.PI) * 40;
        window.__cur.set(fx + (tx - fx) * k, fy + (ty - fy) * k - arc * 0.4); t < 1 ? requestAnimationFrame(s) : res(); };
      requestAnimationFrame(s); }); },
    pulse() { r.animate([{ opacity: 0.9, transform: 'scale(.3)' }, { opacity: 0, transform: 'scale(1.4)' }], { duration: 520, easing: 'ease-out' }); },
  };
})();`;

export async function ensureCursor(page, x = 960, y = 700) {
  await page.evaluate(CURSOR_JS);
  await page.evaluate(([x, y]) => window.__cur.set(x, y), [x, y]);
}
export async function center(page, sel) {
  const loc = page.locator(sel).first();
  const b = await loc.boundingBox();
  return [b.x + b.width / 2, b.y + b.height / 2];
}
export async function moveTo(page, sel, ms = 900) {
  const [x, y] = await center(page, sel);
  await page.evaluate(([x, y, ms]) => window.__cur.move(x, y, ms), [x, y, ms]);
  await page.mouse.move(x, y);
  return [x, y];
}
export async function clickSel(page, sel, { ms = 900, dbl = false, after = 350 } = {}) {
  const [x, y] = await moveTo(page, sel, ms);
  await page.waitForTimeout(120);
  await page.evaluate(() => window.__cur.pulse());
  if (dbl) await page.mouse.dblclick(x, y); else await page.mouse.click(x, y);
  await page.waitForTimeout(after);
}
