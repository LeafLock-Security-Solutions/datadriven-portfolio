import { config } from '@/config/validate';
import log from '@/utils/logger';

import { sourceSchema } from './schema/source';

let source = null;

const path = config.source.path;

try {
  const response = await fetch(path);
  const json = await response.json();

  const result = sourceSchema.safeParse(json);
  if (!result.success) {
    log.error('[Source] ❌ Validation failed:\n', result.error.format());
    throw new Error('[Source] Invalid source.json file');
  }

  source = result.data;
  log.info('[Source] ✅ source.json loaded and validated.');
} catch (err) {
  log.error('[Source] ❌ Failed to load source.json:', err);
}

export { source };
