import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// Prévia de link (Open Graph) por cliente: lê src/config/clients/<id>.meta.json
// e grava as tags no index.html no build, onde o WhatsApp/Instagram enxergam.
// Cliente sem .meta.json mantém o index.html como está.
function clientMeta(mode) {
  const env = loadEnv(mode, process.cwd(), '');
  const indexSrc = fs.readFileSync(path.resolve('src/config/index.js'), 'utf8');
  const fallback = indexSrc.match(/DEFAULT_CLIENT\s*=\s*['"]([^'"]+)['"]/)?.[1];
  const clientId = env.VITE_CLIENT_ID || fallback;
  const file = clientId && path.resolve(`src/config/clients/${clientId}.meta.json`);
  if (!file || !fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function ogPlugin(mode) {
  return {
    name: 'client-og-meta',
    transformIndexHtml(html) {
      const m = clientMeta(mode);
      if (!m) return html;
      const base = m.siteUrl.replace(/\/$/, '');
      const abs = (p) => (/^https?:/.test(p) ? p : `${base}${p}`);
      const image = abs(m.image);
      const tags = [
        `<title>${esc(m.title)}</title>`,
        `<meta name="description" content="${esc(m.description)}" />`,
        m.themeColor && `<meta name="theme-color" content="${esc(m.themeColor)}" />`,
        `<link rel="canonical" href="${esc(base)}/" />`,
        `<link rel="icon" type="image/png" sizes="64x64" href="${esc(m.icon)}" />`,
        `<link rel="apple-touch-icon" sizes="180x180" href="${esc(m.appleTouchIcon)}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:locale" content="pt_BR" />`,
        `<meta property="og:site_name" content="${esc(m.siteName)}" />`,
        `<meta property="og:url" content="${esc(base)}/" />`,
        `<meta property="og:title" content="${esc(m.title)}" />`,
        `<meta property="og:description" content="${esc(m.description)}" />`,
        `<meta property="og:image" content="${esc(image)}" />`,
        `<meta property="og:image:secure_url" content="${esc(image)}" />`,
        `<meta property="og:image:type" content="image/png" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="${esc(m.imageAlt)}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(m.title)}" />`,
        `<meta name="twitter:description" content="${esc(m.description)}" />`,
        `<meta name="twitter:image" content="${esc(image)}" />`,
        `<meta name="twitter:image:alt" content="${esc(m.imageAlt)}" />`,
      ].filter(Boolean);
      const stripped = html
        .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
        .replace(/\s*<meta\s+(?:name|property)="(?:description|theme-color|og:[^"]*|twitter:[^"]*)"[^>]*>/gi, '')
        .replace(/\s*<link\s+rel="(?:icon|apple-touch-icon|canonical)"[^>]*>/gi, '');
      return stripped.replace(/(<meta name="viewport"[^>]*>)/i, `$1\n    ${tags.join('\n    ')}`);
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), ogPlugin(mode)],
}));
