# Color and Branding Guidelines

This document outlines the project's color system, theming approach, and visual branding guidelines.

---

## Theme Modes

The portfolio supports five theme modes. Users can switch between themes, and the owner can set any as the default.

| Theme      | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| `light`    | Clean, bright appearance with white background              |
| `dark`     | Dark navy background, easy on the eyes                      |
| `colorful` | Warm, vibrant palette with amber and cream tones            |
| `verdant`  | Nature-inspired greens, forest aesthetic                    |
| `system`   | Automatically follows the user's OS preference (light/dark) |

### Setting the Default Theme

Configure the default theme in `src/config/config.json`:

```json
{
  "theme": {
    "defaultMode": "colorful",
    "availableThemes": ["light", "dark", "colorful", "verdant", "system"]
  }
}
```

---

## Color Palettes

### Light Theme

| Variable            | Purpose                  | HEX       |
| ------------------- | ------------------------ | --------- |
| `--color-primary`   | Primary actions, buttons | `#3b82f6` |
| `--color-secondary` | Secondary elements       | `#a855f7` |
| `--color-accent`    | Highlights, accents      | `#14b8a6` |
| `--color-bg`        | Page background          | `#ffffff` |
| `--color-text`      | Body text                | `#000000` |

### Dark Theme

| Variable            | Purpose                  | HEX       |
| ------------------- | ------------------------ | --------- |
| `--color-primary`   | Primary actions, buttons | `#1e293b` |
| `--color-secondary` | Secondary elements       | `#64748b` |
| `--color-accent`    | Highlights, accents      | `#22d3ee` |
| `--color-bg`        | Page background          | `#0f172a` |
| `--color-text`      | Body text                | `#ffffff` |

### Colorful Theme

| Variable            | Purpose                  | HEX       |
| ------------------- | ------------------------ | --------- |
| `--color-primary`   | Primary actions, buttons | `#f59e0b` |
| `--color-secondary` | Secondary elements       | `#ef4444` |
| `--color-accent`    | Highlights, accents      | `#10b981` |
| `--color-bg`        | Page background          | `#fef3c7` |
| `--color-text`      | Body text                | `#1f2937` |

### Verdant Theme

| Variable            | Purpose                  | HEX       |
| ------------------- | ------------------------ | --------- |
| `--color-primary`   | Primary actions, buttons | `#255f38` |
| `--color-secondary` | Secondary elements       | `#1f7d53` |
| `--color-accent`    | Highlights, accents      | `#27391c` |
| `--color-bg`        | Page background          | `#18230f` |
| `--color-text`      | Body text                | `#ffffff` |

---

## CSS Custom Properties

Colors are defined as CSS custom properties in `src/index.css`:

```css
:root,
.light {
  --color-primary: #3b82f6;
  --color-secondary: #a855f7;
  --color-accent: #14b8a6;
  --color-bg: #ffffff;
  --color-text: #000000;
}

.dark {
  --color-primary: #1e293b;
  /* ... */
}
```

Theme classes (`.light`, `.dark`, `.colorful`, `.verdant`) are applied to the root element by the ThemeProvider.

---

## Tailwind CSS Integration

Colors are extended in `tailwind.config.js` to use CSS variables:

```js
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      accent: 'var(--color-accent)',
    },
  },
}
```

Use these in your components:

```jsx
<button className="bg-primary">Primary Button</button>
<span className="text-secondary">Secondary text</span>
<div className="border-accent">Accented border</div>
```

---

## Usage Guidelines

### Color Purposes

| Color          | Use For                                                        |
| -------------- | -------------------------------------------------------------- |
| **Primary**    | Main buttons, primary actions, key UI elements                 |
| **Secondary**  | Secondary buttons, less prominent actions, supporting elements |
| **Accent**     | Highlights, borders, icons, decorative elements                |
| **Background** | Page and container backgrounds                                 |
| **Text**       | Body text, headings, readable content                          |

### Button Text Colors

When using primary/secondary/accent as button backgrounds, use the correct text color for accessibility:

| Theme    | Primary    | Secondary  | Accent     |
| -------- | ---------- | ---------- | ---------- |
| Light    | Black text | Black text | Black text |
| Dark     | White text | White text | Black text |
| Colorful | Black text | Black text | Black text |
| Verdant  | White text | White text | White text |

### What to Avoid

- Do not use primary/secondary/accent colors as text directly on the page background
- These colors are intended for UI elements (buttons, borders, icons), not body text
- Always use `--color-text` for readable content

---

## Accessibility

### Text Contrast (WCAG AA Compliant)

All themes pass WCAG AA standards for text on background:

| Theme    | Background | Text      | Contrast Ratio |
| -------- | ---------- | --------- | -------------- |
| Light    | `#ffffff`  | `#000000` | 21:1           |
| Dark     | `#0f172a`  | `#ffffff` | 17.9:1         |
| Colorful | `#fef3c7`  | `#1f2937` | 13.2:1         |
| Verdant  | `#18230f`  | `#ffffff` | 16.3:1         |

### Guidelines

- Always ensure 4.5:1 contrast ratio for normal text
- Large text (18px+ bold or 24px+ regular) requires 3:1 minimum
- Test color combinations using tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## File Reference

| File                          | Purpose                            |
| ----------------------------- | ---------------------------------- |
| `src/index.css`               | CSS custom property definitions    |
| `tailwind.config.js`          | Tailwind color extensions          |
| `src/config/config.json`      | Default theme and available themes |
| `src/theme/ThemeProvider.jsx` | Theme state management             |
| `src/theme/useTheme.js`       | Hook to access/change theme        |
