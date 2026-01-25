import { config } from '@/config/validate';
import log from '@/utils/logger';

import { sourceSchema } from './schema/source';

const path = config.source.path;

/**
 * Loads and validates the source.json file.
 *
 * @returns {Promise<object|null>} The validated source data, or null if loading fails
 */
export async function loadSource() {
  try {
    const response = await fetch(path);
    const json = await response.json();

    const result = sourceSchema.safeParse(json);
    if (!result.success) {
      log.error('[Source] Validation failed:\n', result.error.format());
      return null;
    }

    log.info('[Source] source.json loaded and validated.');
    return result.data;
  } catch (err) {
    log.error('[Source] Failed to load source.json:', err);
    return null;
  }
}
