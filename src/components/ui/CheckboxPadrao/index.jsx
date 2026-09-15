import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function CheckboxPadrao({ id, checked, onChange, label, required = false }) {
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.checkboxInput}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          required={required}
        />
        <span className={styles.box} aria-hidden="true" />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}

CheckboxPadrao.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  required: PropTypes.bool,
};
