function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    if (value) element.setAttribute(key, value);
  });
}

export function applySeo(seo = {}, business = {}, branding = {}) {
  const title = seo.title || business.name || 'Commerce Landing';
  const description = seo.description || business.description || '';
  const ogTitle = seo.ogTitle || title;
  const ogDescription = seo.ogDescription || description;
  const ogImage = seo.ogImage || branding.ogImage || '/og-cover.svg';
  const canonical = seo.canonical || window.location.origin;

  document.title = title;

  upsertMeta('meta[name="description"]', { name: 'description', content: description });
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: ogTitle });
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: ogDescription });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage });
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
  upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: seo.locale || 'pt_BR' });
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: ogTitle });
  upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: seo.themeColor || '' });

  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', canonical);

  if (branding.favicon) {
    const icon = document.head.querySelector('link[rel="icon"]');
    if (icon) icon.setAttribute('href', branding.favicon);
  }
}
