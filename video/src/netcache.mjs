// Serves Google Fonts through curl (which honours the agent proxy) with a disk cache.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
const DIR = new URL('./netcache/', import.meta.url).pathname; mkdirSync(DIR, { recursive: true });
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';
export function fetchCached(url) {
  const f = DIR + createHash('md5').update(url).digest('hex');
  if (!existsSync(f)) writeFileSync(f, execFileSync('curl', ['-sSL', '-A', UA, url], { maxBuffer: 1 << 26 }));
  return readFileSync(f);
}
export async function installFontRoutes(ctx) {
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, (route) => {
    const url = route.request().url();
    const body = fetchCached(url);
    const ct = url.includes('googleapis') ? 'text/css' : 'font/woff2';
    route.fulfill({ status: 200, body, headers: { 'content-type': ct, 'access-control-allow-origin': '*' } });
  });
}
