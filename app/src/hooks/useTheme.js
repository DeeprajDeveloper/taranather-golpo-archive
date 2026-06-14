import { useCallback, useEffect, useState } from 'react';
import {
  applyTheme,
  getStoredTheme,
  getThemeAriaLabel,
  setStoredTheme,
  toggleTheme,
} from '../handlers/themeHandler';

export function useTheme() {
  const [theme, setTheme] = useState(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
    setStoredTheme(theme);
  }, [theme]);

  const onToggle = useCallback(() => {
    setTheme((current) => toggleTheme(current));
  }, []);

  return {
    theme,
    onToggle,
    ariaLabel: getThemeAriaLabel(theme),
  };
}
