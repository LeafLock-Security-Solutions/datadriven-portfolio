import { config } from '@/config/validate';

import { useTheme } from '../../theme/useTheme';
import { Dropdown } from '../ui/dropdown';
import { PaletteIcon } from '../ui/icons';
import { Tooltip } from '../ui/Tooltip';
import { ThemeOption } from './ThemeOption';

const { availableThemes } = config.theme;

/**
 * Floating theme selector with dropdown menu.
 * Positioned at top-right corner, allows users to switch between available themes.
 *
 * @returns {JSX.Element} The rendered theme selector
 */
export function ThemeSelector() {
  const { setTheme, theme } = useTheme();

  const buttonClasses = [
    'flex size-10 items-center justify-center rounded-full',
    'bg-primary text-white shadow-lg',
    'transition-transform hover:scale-105',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  ].join(' ');

  const menuClasses = [
    'w-48 origin-top-right',
    'rounded-lg p-2 shadow-2xl',
    'border-2 border-[var(--color-primary)]',
    'bg-[var(--color-bg)] text-[var(--color-text)]',
    'space-y-2',
  ].join(' ');

  const triggerButton = (
    <Tooltip content="Change theme" position="left">
      <button aria-label="Select theme" className={buttonClasses} type="button">
        <PaletteIcon className="size-5" />
      </button>
    </Tooltip>
  );

  return (
    <div className="fixed right-4 top-4 z-50">
      <Dropdown
        ariaLabel="Available themes"
        menuClassName={menuClasses}
        position="bottom-right"
        trigger={triggerButton}
      >
        {({ close }) =>
          availableThemes.map(themeName => (
            <ThemeOption
              isSelected={theme === themeName}
              key={themeName}
              onClick={() => {
                setTheme(themeName);
                close();
              }}
              themeName={themeName}
            />
          ))
        }
      </Dropdown>
    </div>
  );
}
