import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  onClick,
  className = '',
  target,
  rel,
  ...props
}) {
  const classNames = `${styles.button} ${styles[variant]} ${className}`.trim();
  const safeRel = target === '_blank' ? (rel || 'noreferrer noopener') : rel;

  if (href) {
    return (
      <a className={classNames} href={href} target={target} rel={safeRel} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classNames} type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'ghost', 'whatsapp']),
  href: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
};
