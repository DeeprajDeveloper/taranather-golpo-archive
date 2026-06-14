const THEME_STORAGE_KEY = 'tt-theme';
const DEFAULT_THEME = 'dark';

export const FAVICON_PATHS = {
  dark: '/favicon_dark.png',
  light: '/favicon_light.png',
};

export function getStoredTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  return localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
}

export function setStoredTheme(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  applyFavicon(theme);
}

export function getFaviconPath(theme) {
  return FAVICON_PATHS[theme] || FAVICON_PATHS.dark;
}

export function applyFavicon(theme) {
  const href = getFaviconPath(theme);
  let link = document.querySelector('link[rel="icon"]');

  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  link.type = 'image/png';
  link.href = href;
}

export function toggleTheme(currentTheme) {
  return currentTheme === 'dark' ? 'light' : 'dark';
}

export function getThemeAriaLabel(theme) {
  return theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
}

export function initTheme() {
  const theme = getStoredTheme();
  applyTheme(theme);
  return theme;
}
