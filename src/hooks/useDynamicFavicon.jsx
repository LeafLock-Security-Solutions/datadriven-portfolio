import { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { FaviconIcon } from '../components/ui/icons';

/**
 * Hook to dynamically set the favicon based on theme color.
 * Updates the favicon when the color changes.
 *
 * @param {string} color - The fill color for the favicon
 */
export function useDynamicFavicon(color) {
  useEffect(() => {
    if (!color) return;

    // Convert React element to SVG string
    const svgString = renderToStaticMarkup(<FaviconIcon color={color} />);

    // Create a data URL (more stable than blob URL)
    const dataUrl = `data:image/svg+xml,${encodeURIComponent(svgString)}`;

    // Find or create the favicon link element
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    // Set the new favicon
    link.type = 'image/svg+xml';
    link.href = dataUrl;
  }, [color]);
}
