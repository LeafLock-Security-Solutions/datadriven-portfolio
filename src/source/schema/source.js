import { z } from 'zod';

export const jsonPathSchema = z
  .string()
  .min(1, 'jsonPath is required')
  .refine(
    val =>
      (val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://')) &&
      !val.startsWith('file://'),
    {
      message: [
        'Invalid jsonPath. Use one of the following:',
        '• A path starting with `/`, e.g. `/data/profile.json`',
        '  (must be placed inside the `public/` directory of this project)',
        '• A full URL like `https://example.com/profile.json`',
        '',
        '⚠️ Note: Do NOT use `file://` paths or system file paths like `C:/...`.',
        'These will not work in the browser.',
      ].join('\n'),
    },
  )
  .refine(val => val.endsWith('.json'), {
    message: 'jsonPath must point to a `.json` file.',
  });

export const sourceSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  jsonPath: jsonPathSchema,
  lastName: z.string().optional(),
  phone: z
    .string()
    .regex(/^\+?[0-9\- ]{7,20}$/, 'Invalid phone number format')
    .optional(),
  showContactOnError: z.boolean().optional().default(false),
});
