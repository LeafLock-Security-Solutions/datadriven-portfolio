import { AppStateContext } from '@/context/AppStateContext';
import log from '@/utils/logger';
import { useContext } from 'react';

/**
 * Hook to access the app state context.
 *
 * @returns {object} The app state context value
 */
export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }

  log.info('[useAppState] Context accessed', { context });
  return context;
}
