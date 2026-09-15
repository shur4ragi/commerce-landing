import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function Container({ children, className = '' }) {
  return <div className={`${styles.container} ${className}`.trim()}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
