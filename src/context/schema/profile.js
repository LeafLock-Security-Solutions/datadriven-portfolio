import { z } from 'zod';

export const profileSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    title: z.string().optional(),
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'Profile cannot be empty',
  });
