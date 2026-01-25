import PropTypes from 'prop-types';

/**
 * Icon configuration with path data and styling options.
 */
const ICONS = {
  check: {
    path: 'M5 13l4 4L19 7',
    strokeWidth: 2.5,
  },
  cloudOff: {
    path: `
      M22.61 16.95A5 5 0 0018 10h-1.26a8 8 0 00-7.05-6M5 5a8 8 0 004 15h9a5 5 0 001.7-.3
      M1 1l22 22
    `.trim(),
  },
  envelope: {
    path: `
      M3 8l7.89 5.26a2 2 0 002.22 0L21 8
      M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z
    `.trim(),
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
  phone: {
    path: `
      M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21
      l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502
      l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z
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
export const CloudOffIcon = createIcon(ICONS.cloudOff);
export const EnvelopeIcon = createIcon(ICONS.envelope);
export const FaviconIcon = createIcon(ICONS.favicon);
export const PaletteIcon = createIcon(ICONS.palette);
export const PhoneIcon = createIcon(ICONS.phone);
export const RefreshIcon = createIcon(ICONS.refresh);
