import log from '@/utils/logger';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { AppStateContext } from './AppStateContext';
import { appStateContextSchema } from './schema';
import { appState, envConfig, loadProfile } from './validate';

/**
 * Provider component that loads and provides the app state.
 * Handles loading profile data asynchronously.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} The provider component
 */
export function AppStateProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /**
     * Loads profile data from the configured path.
     */
    async function loadData() {
      log.debug('[AppStateProvider] Loading profile...');

      const profileData = await loadProfile(envConfig.profilePath);
      setProfile(profileData);

      setIsLoading(false);
      log.debug('[AppStateProvider] Profile loading complete', {
        hasProfile: Boolean(profileData),
      });
    }

    loadData();
  }, []);

  const rawValue = {
    ...appState,
    envConfig,
    isLoading,
    profile,
  };

  const result = appStateContextSchema.safeParse(rawValue);
  if (!result.success) {
    const formatted = JSON.stringify(result.error.format(), null, 2);
    log.error('[AppStateProvider] Context validation failed:\n', formatted);
    throw new Error(`[AppStateProvider] Invalid context value:\n${formatted}`);
  }

  return <AppStateContext.Provider value={result.data}>{children}</AppStateContext.Provider>;
}

AppStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
