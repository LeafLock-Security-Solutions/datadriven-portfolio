import { config } from '@/config/validate';
import { createContext } from 'react';

/**
 * Theme context provides `theme` and `setTheme` for global access.
 * Default: theme = 'light', setTheme = no-op
 */
export const ThemeContext = createContext({
  setTheme: () => {},
  theme: config.theme.defaultMode,
});
