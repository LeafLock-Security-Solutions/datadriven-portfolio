import { z } from 'zod';

export const sourceConfigSchema = z.object({
  path: z
    .string()
    .min(1, 'Path to source.json is required')
    .refine(val => val.startsWith('/'), {
      message:
        'Path must begin with a "/" (e.g., /data/source.json) and must be located inside the ' +
        'public/ directory of the project.',
    })
    .refine(val => val.toLowerCase().endsWith('.json'), {
      message: 'Path must point to a .json file (e.g., /data/source.json).',
    }),
});
