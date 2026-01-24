import PropTypes from 'prop-types';

/**
 * Favicon/branding icon - 3x3 grid of circles.
 *
 * @param {object} props - Component props
 * @param {string} props.className - CSS classes for styling
 * @param {string} props.color - Direct color value (for static rendering like favicons)
 * @returns {JSX.Element} The rendered icon
 */
export function FaviconIcon({ className = '', color }) {
  return (
    <svg
      className={className}
      fill={color || 'currentColor'}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="3.5" />
      <circle cx="16" cy="4" r="3.5" />
      <circle cx="28" cy="4" r="3.5" />
      <circle cx="4" cy="16" r="3.5" />
      <circle cx="16" cy="16" r="3.5" />
      <circle cx="28" cy="16" r="3.5" />
      <circle cx="4" cy="28" r="3.5" />
      <circle cx="16" cy="28" r="3.5" />
      <circle cx="28" cy="28" r="3.5" />
    </svg>
  );
}

FaviconIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};
