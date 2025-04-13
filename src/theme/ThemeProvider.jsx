import { config } from '@/config/Validate';
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
    if (stored && availableThemes.includes(stored)) return stored;

    if (defaultMode === 'system') {
      return getSystemTheme();
    }
    return defaultMode;
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.remove(...availableThemes);
    document.documentElement.classList.add(theme);
    localStorage.setItem(LOCAL_STORAGE_KEY, theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ setTheme, theme }}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
