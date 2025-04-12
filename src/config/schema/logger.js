import { z } from 'zod';

export const loggerSchema = z.object({
  level: z.object({
    development: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'silent']),
    production: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'silent']),
  }),
  tag: z.string().min(3, 'Logger tag must not be empty'),
});
