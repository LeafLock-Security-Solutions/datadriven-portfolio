import { z } from 'zod';

// Shared color hex validator
const colorHex = z.string().regex(/^#(?:[0-9A-F]{6}|[0-9A-F]{3})$/i, {
  message: 'Must be a valid hex color code',
});

// Enum of supported themes
const themeModeEnum = z.enum(['light', 'dark', 'system', 'colorful']);

// Shared theme color palette shape
const themeColorSchema = z.object({
  accent: colorHex,
  primary: colorHex,
  secondary: colorHex,
});

// Main schema export
export const themeSchema = z.object({
  availableThemes: z.array(themeModeEnum).nonempty(),
  colors: z.object({
    colorful: themeColorSchema,
    dark: themeColorSchema,
    light: themeColorSchema,
  }),
  defaultMode: themeModeEnum,
});
