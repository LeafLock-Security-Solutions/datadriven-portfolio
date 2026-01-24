import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * Tooltip component that shows on hover.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Element to wrap with tooltip
 * @param {string} props.content - Tooltip text content
 * @param {string} props.position - Tooltip position: 'top' | 'bottom' | 'left' | 'right'
 * @param {string} props.className - Additional classes for the wrapper
 * @returns {JSX.Element} The rendered tooltip wrapper
 */
export function Tooltip({ children, className = '', content, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  };

  const arrowClasses = {
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-current border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-current border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-current border-l-transparent',
    top: 'top-full left-1/2 -translate-x-1/2 border-t-current border-b-transparent',
  };

  const tooltipPosition = positionClasses[position] || positionClasses.top;
  const arrowPosition = arrowClasses[position] || arrowClasses.top;

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && content && (
        <div className={`absolute z-50 ${tooltipPosition} pointer-events-none`} role="tooltip">
          <div
            className={[
              'whitespace-nowrap rounded px-2 py-1 text-xs font-medium',
              'bg-gray-900 text-white',
              'shadow-lg',
            ].join(' ')}
          >
            {content}
          </div>
          <div className={`absolute size-0 border-4 border-transparent ${arrowPosition}`} />
        </div>
      )}
    </div>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  content: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};
