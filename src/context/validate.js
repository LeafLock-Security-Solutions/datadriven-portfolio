import log from '@/utils/logger';

import { stateSchema } from './schema';
import { envConfigSchema } from './schema/env';
import { profileSchema } from './schema/profile';
import rawState from './state.json';

// Validate state.json at module load time
const stateResult = stateSchema.safeParse(rawState);

if (!stateResult.success) {
  const formatted = JSON.stringify(stateResult.error.format(), null, 2);
  log.error('[State] Validation failed:\n', formatted);
  throw new Error(`[State] Invalid state.json:\n${formatted}`);
}

log.debug('[State] state.json loaded and validated.');

export const appState = stateResult.data;

// Validate DDP_* env variables at module load time (fails build if invalid)
const rawEnvConfig = {
  email: import.meta.env.DDP_EMAIL || undefined,
  firstName: import.meta.env.DDP_FIRST_NAME || '',
  lastName: import.meta.env.DDP_LAST_NAME || '',
  phone:
    import.meta.env.DDP_PHONE_COUNTRY_CODE && import.meta.env.DDP_PHONE_NUMBER
      ? {
          countryCode: import.meta.env.DDP_PHONE_COUNTRY_CODE,
          number: import.meta.env.DDP_PHONE_NUMBER,
        }
      : undefined,
  profilePath: import.meta.env.DDP_PROFILE_PATH || '',
  showContactOnError: import.meta.env.DDP_SHOW_CONTACT_ON_ERROR === 'true',
};

const envResult = envConfigSchema.safeParse(rawEnvConfig);

if (!envResult.success) {
  const formatted = JSON.stringify(envResult.error.format(), null, 2);
  log.error('[EnvConfig] Validation failed:\n', formatted);
  throw new Error(`[EnvConfig] Missing or invalid DDP_* environment variables:\n${formatted}`);
}

log.debug('[EnvConfig] Environment config loaded and validated.');

export const envConfig = envResult.data;

/**
 * Loads and validates the profile from the given path.
 *
 * @param {string} profilePath - The path to the profile JSON file
 * @returns {Promise<object|null>} The validated profile data, or null if loading fails
 */
export async function loadProfile(profilePath) {
  if (!profilePath) {
    log.error('[Profile] No profilePath provided');
    return null;
  }

  try {
    const response = await fetch(profilePath);
    const json = await response.json();

    // Check for empty object
    if (Object.keys(json).length === 0) {
      log.error('[Profile] Profile data is empty');
      return null;
    }

    const profileResult = profileSchema.safeParse(json);
    if (!profileResult.success) {
      log.error('[Profile] Validation failed:\n', profileResult.error.format());
      return null;
    }

    log.info(`[Profile] Loaded and validated: ${profilePath}`);
    return profileResult.data;
  } catch (err) {
    log.error('[Profile] Failed to load profile:', err);
    return null;
  }
}
