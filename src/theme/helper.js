/**
 * Detects the system's preferred theme using media queries.
 *
 * @returns {'light' | 'dark'} The system's preferred theme.
 */
export function getSystemTheme() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}
