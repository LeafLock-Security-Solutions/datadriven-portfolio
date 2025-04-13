import { useContext } from 'react';

import { ThemeContext } from './ThemeContext';

/**
 * Custom hook to access theme and setter from context.
 *
 * @returns {{ theme: string, setTheme: (value: string) => void }}
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
