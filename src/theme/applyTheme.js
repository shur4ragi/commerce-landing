const THEME_MAP = {
  primaryColor: '--color-primary',
  secondaryColor: '--color-secondary',
  accentColor: '--color-accent',
  textColor: '--color-text',
  backgroundColor: '--color-background',
  surfaceColor: '--color-surface',
  mutedColor: '--color-muted',
  lineColor: '--color-line',
  fontPrimary: '--font-primary',
  fontDisplay: '--font-display',
  fontSerif: '--font-serif',
};

export function applyTheme(theme = {}, branding = {}) {
  const root = document.documentElement;

  Object.entries(THEME_MAP).forEach(([key, cssVar]) => {
    if (theme[key]) {
      root.style.setProperty(cssVar, theme[key]);
    }
  });

  // Folha de fontes do cliente (ex.: Google Fonts), injetada uma única vez.
  if (theme.fontStylesheet && !document.querySelector('link[data-theme-fonts]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = theme.fontStylesheet;
    link.dataset.themeFonts = '';
    document.head.appendChild(link);
  }

  if (theme.primaryColor) {
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme.primaryColor);
  }

  if (branding.favicon) {
    document.querySelector('link[rel="icon"]')
      ?.setAttribute('href', branding.favicon);
  }
}
