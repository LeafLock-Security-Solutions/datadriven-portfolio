import PropTypes from 'prop-types';

/**
 * Icon configuration with path data and styling options.
 */
const ICONS = {
  check: {
    path: 'M5 13l4 4L19 7',
    strokeWidth: 2.5,
  },
  favicon: {
    fill: true,
    path: `
      M 0.5,4 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0
      M 12.5,4 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0
      M 24.5,4 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0
      M 0.5,16 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0
      M 12.5,16 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0
      M 24.5,16 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0
      M 0.5,28 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0
      M 12.5,28 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0
      M 24.5,28 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0
    `.trim(),
    viewBox: '0 0 32 32',
  },
  palette: {
    path: `
      M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4z
      m0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343
      M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485
      M7 17h.01
    `.trim(),
  },
  refresh: {
    path: `
      M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9
      m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15
    `.trim(),
  },
};

/**
 * Factory function to create icon components.
 *
 * @param {object} config - Icon configuration
 * @param {string} config.path - SVG path data
 * @param {string} config.viewBox - SVG viewBox (default: '0 0 24 24')
 * @param {boolean} config.fill - Use fill instead of stroke (default: false)
 * @param {number} config.strokeWidth - Stroke width (default: 2)
 * @returns {Function} React component
 */
function createIcon(config) {
  const { fill = false, path, strokeWidth = 2, viewBox = '0 0 24 24' } = config;

  /**
   * Icon component.
   *
   * @param {object} props - Component props
   * @param {string} props.className - CSS classes for styling
   * @param {string} props.color - Direct color value (for static rendering)
   * @returns {JSX.Element} The rendered icon
   */
  function Icon({ className = '', color }) {
    return (
      <svg
        className={className}
        fill={fill ? color || 'currentColor' : 'none'}
        stroke={fill ? 'none' : color || 'currentColor'}
        strokeWidth={fill ? 0 : strokeWidth}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  Icon.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
  };

  return Icon;
}

export const CheckIcon = createIcon(ICONS.check);
export const FaviconIcon = createIcon(ICONS.favicon);
export const PaletteIcon = createIcon(ICONS.palette);
export const RefreshIcon = createIcon(ICONS.refresh);
