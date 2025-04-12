import { z } from 'zod';

import { loggerSchema } from './logger';
import { sourceConfigSchema } from './source';
import { themeSchema } from './theme';

export const configSchema = z.object({
  logger: loggerSchema,
  source: sourceConfigSchema,
  theme: themeSchema,
});
