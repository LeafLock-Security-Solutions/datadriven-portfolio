import { z } from 'zod';

import { envConfigSchema } from './schema/env';
import { profileSchema } from './schema/profile';

const copyrightSchema = z.object({
  name: z.string().min(1, 'Copyright name is required'),
  url: z.string().url().optional(),
});

export const stateSchema = z.object({
  copyright: copyrightSchema,
});

/**
 * Schema for the full AppStateContext value.
 * Defines everything the context provides to consumers.
 */
export const appStateContextSchema = z.object({
  copyright: copyrightSchema,
  envConfig: envConfigSchema,
  isLoading: z.boolean(),
  profile: profileSchema.nullable(),
});
