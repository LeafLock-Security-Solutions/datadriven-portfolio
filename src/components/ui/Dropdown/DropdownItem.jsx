import PropTypes from 'prop-types';

/**
 * Individual item within a dropdown menu.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Item content
 * @param {string} props.className - Additional classes
 * @param {boolean} props.isSelected - Whether item is currently selected
 * @param {Function} props.onClick - Click handler
 * @param {Function} props.onKeyDown - Keyboard handler
 * @returns {JSX.Element} The rendered dropdown item
 */
export function DropdownItem({ children, className = '', isSelected = false, onClick, onKeyDown }) {
  return (
    <div
      aria-selected={isSelected}
      className={className}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="option"
      tabIndex={0}
    >
      {children}
    </div>
  );
}

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
};
