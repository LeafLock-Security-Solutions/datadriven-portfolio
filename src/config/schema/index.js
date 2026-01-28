import { z } from 'zod';

import { loggerSchema } from './logger';
import { themeSchema } from './theme';

export const configSchema = z.object({
  logger: loggerSchema,
  theme: themeSchema,
});
