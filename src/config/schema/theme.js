import { z } from 'zod';

// Enum of supported themes
const themeModeEnum = z.enum(['light', 'dark', 'colorful', 'verdant', 'system']);

// Main schema export
export const themeSchema = z.object({
  availableThemes: z.array(themeModeEnum).nonempty(),
  defaultMode: themeModeEnum,
});
