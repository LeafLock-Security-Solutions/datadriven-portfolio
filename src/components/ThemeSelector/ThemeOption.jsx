import PropTypes from 'prop-types';

import { CheckIcon, RefreshIcon } from '../ui/icons';

/**
 * Individual theme option showing the theme name and color swatches.
 * Each option is styled with that theme's colors as a preview.
 *
 * @param {object} props - Component props
 * @param {boolean} props.isSelected - Whether this theme is currently active
 * @param {Function} props.onClick - Click handler
 * @param {string} props.themeName - Name of the theme
 * @returns {JSX.Element} The rendered theme option
 */
export function ThemeOption({ isSelected, onClick, themeName }) {
  const displayName = themeName.charAt(0).toUpperCase() + themeName.slice(1);
  const isSystem = themeName === 'system';

  const baseClasses = [
    'flex cursor-pointer items-center gap-3 rounded-md px-3 py-2',
    'transition-all',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
  ].join(' ');

  // Theme-specific classes: bg, text, border, and selected state
  const themeClasses = [
    'bg-[var(--color-bg)] text-[var(--color-text)]',
    'focus:ring-[var(--color-primary)]',
    isSelected
      ? 'ring-2 ring-[var(--color-primary)]'
      : 'border-2 border-[var(--color-secondary)] hover:border-[var(--color-primary)]',
  ].join(' ');

  return (
    <div
      aria-selected={isSelected}
      className={`${themeName} ${baseClasses} ${themeClasses}`}
      onClick={onClick}
      role="option"
      tabIndex={0}
    >
      {isSystem ? (
        <div className="flex h-6 w-14 items-center justify-center">
          <RefreshIcon className="size-5 text-[var(--color-text)]" />
        </div>
      ) : (
        <div className="flex gap-1">
          <span className="h-6 w-4 rounded-sm bg-primary" />
          <span className="h-6 w-4 rounded-sm bg-secondary" />
          <span className="h-6 w-4 rounded-sm bg-accent" />
        </div>
      )}

      <span className="flex-1 text-sm font-medium">{displayName}</span>

      {isSelected && <CheckIcon className="size-4 text-[var(--color-text)]" />}
    </div>
  );
}

ThemeOption.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  themeName: PropTypes.string.isRequired,
};
