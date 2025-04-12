import rawConfig from './config.json';
import { configSchema } from './schema/index';

const result = configSchema.safeParse(rawConfig);
if (!result.success) {
  const formatted = JSON.stringify(result.error.format(), null, 2);
  throw new Error(`[Config] Invalid config.json:\n${formatted}`);
}

export const config = result.data;
