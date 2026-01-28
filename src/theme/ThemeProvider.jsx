import { config } from '@/config/validate';
import log from '@/utils/logger';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { getSystemTheme } from './helper';
import { ThemeContext } from './ThemeContext';

const LOCAL_STORAGE_KEY = 'user-preferred-theme';
const { availableThemes, defaultMode } = config.theme;

/**
 * Provides theme context to the application based on:
 * - config default
 * - user's previous selection (from localStorage)
 * - or system preference.
 *
 * It updates the <html> class and persists choice across sessions.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export function ThemeProvider({ children }) {
  const getInitialTheme = () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored && availableThemes.includes(stored)) {
      log.debug('[Theme] Loaded from localStorage:', stored);
      return stored;
    }

    if (defaultMode === 'system') {
      const systemTheme = getSystemTheme();
      log.debug('[Theme] Using system preference:', systemTheme);
      return systemTheme;
    }
    log.debug('[Theme] Using default:', defaultMode);
    return defaultMode;
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const handleSetTheme = newTheme => {
    log.info('[Theme] Changed to:', newTheme);
    setTheme(newTheme);
  };

  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;

  useEffect(() => {
    document.documentElement.classList.remove(...availableThemes);
    document.documentElement.classList.add(resolvedTheme);
    localStorage.setItem(LOCAL_STORAGE_KEY, theme);
  }, [resolvedTheme, theme]);

  // Listen for system preference changes when "system" is selected
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    /**
     * Handles system theme change.
     */
    function handleChange() {
      const newTheme = getSystemTheme();
      document.documentElement.classList.remove(...availableThemes);
      document.documentElement.classList.add(newTheme);
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ setTheme: handleSetTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
