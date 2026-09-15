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
};

export function applyTheme(theme = {}, branding = {}) {
  const root = document.documentElement;

  Object.entries(THEME_MAP).forEach(([key, cssVar]) => {
    if (theme[key]) {
      root.style.setProperty(cssVar, theme[key]);
    }
  });

  if (theme.primaryColor) {
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme.primaryColor);
  }

  if (branding.favicon) {
    document.querySelector('link[rel="icon"]')
      ?.setAttribute('href', branding.favicon);
  }
}
