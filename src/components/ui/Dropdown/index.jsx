import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Reusable dropdown component with keyboard navigation and accessibility.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.trigger - Element that triggers the dropdown
 * @param {React.ReactNode} props.children - Dropdown menu content
 * @param {string} props.className - Additional classes for the container
 * @param {string} props.menuClassName - Additional classes for the menu
 * @param {string} props.position - Menu position: 'bottom-right' | 'bottom-left'
 * @param {string} props.ariaLabel - Accessible label for the menu
 * @returns {JSX.Element} The rendered dropdown
 */
export function Dropdown({
  ariaLabel = 'Menu',
  children,
  className = '',
  menuClassName = '',
  position = 'bottom-right',
  trigger,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  /**
   * Closes the dropdown.
   */
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Toggles the dropdown open/closed.
   */
  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    /**
     * Handles clicks outside the dropdown to close it.
     *
     * @param {MouseEvent} event - The mouse event
     */
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        close();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [close, isOpen]);

  /**
   * Handles keyboard navigation on the trigger.
   *
   * @param {KeyboardEvent} event - The keyboard event
   */
  function handleTriggerKeyDown(event) {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        toggle();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        close();
        break;
    }
  }

  const positionClasses = {
    'bottom-left': 'left-0',
    'bottom-right': 'right-0',
  };

  const menuPositionClass = positionClasses[position] || positionClasses['bottom-right'];

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={toggle}
        onKeyDown={handleTriggerKeyDown}
        role="button"
        tabIndex={0}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          aria-label={ariaLabel}
          className={`absolute mt-2 ${menuPositionClass} ${menuClassName}`}
          role="listbox"
        >
          {typeof children === 'function' ? children({ close }) : children}
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  className: PropTypes.string,
  menuClassName: PropTypes.string,
  position: PropTypes.oneOf(['bottom-left', 'bottom-right']),
  trigger: PropTypes.node.isRequired,
};
