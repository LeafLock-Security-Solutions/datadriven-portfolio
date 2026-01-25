import { useDynamicFavicon } from '@/hooks/useDynamicFavicon';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { ThemeSelector } from '../ThemeSelector';

/**
 * Main layout wrapper component.
 * Handles dynamic favicon based on theme and renders ThemeSelector.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Content to render within the layout
 * @returns {JSX.Element} The rendered layout
 */
export function Layout({ children }) {
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');

  // Track theme's primary color for dynamic favicon
  useEffect(() => {
    /**
     * Updates primary color from CSS variable.
     */
    function updateColor() {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();
      if (color) setPrimaryColor(color);
    }

    updateColor();

    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributeFilter: ['class'],
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  // Set dynamic favicon based on theme color
  useDynamicFavicon(primaryColor);

  const mainClasses = [
    'min-h-screen',
    'bg-[var(--color-bg)] text-[var(--color-text)]',
    'transition-colors duration-300',
  ].join(' ');

  return (
    <>
      <ThemeSelector />
      <main className={mainClasses}>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
