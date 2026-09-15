import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
const InputField = ({ width, gap, label, required, children, fieldStyle = {} }) => {
  const fieldStyles = useMemo(() => ({
    ...(width && { maxWidth: `calc(${width}% - ${gap !== undefined ? gap : 0.5}rem)` }),
    ...fieldStyle,
  }), [width, gap, fieldStyle]);

  return (
    <div className={styles.inputField} style={fieldStyles}>
      {label !== false && (
        <label className={styles.inputLabel}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
    </div>
  );
};

InputField.propTypes = {
  width: PropTypes.number,
  gap: PropTypes.number,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  required: PropTypes.bool,
  children: PropTypes.node,
  fieldStyle: PropTypes.object,
};

export const InputPadrao = ({
  type = 'text',
  value,
  onChange,
  inputRef,
  placeholder,
  required,
  identifier,
  className,
  disabled,
  rows = 4,
  ...props
}) => {
  const classNames = `${styles.inputPadrao} ${className || ''}`.trim();

  if (type === 'textarea') {
    return (
      <textarea
        id={identifier}
        ref={inputRef}
        className={classNames}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        {...props}
      />
    );
  }

  return (
    <input
      id={identifier}
      ref={inputRef}
      className={classNames}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      {...props}
    />
  );
};

InputPadrao.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  identifier: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
};

export const UseInputPadrao = ({
  label,
  identifier,
  required,
  width,
  gap,
  type = 'text',
  value,
  onChange,
  inputRef,
  fieldStyle = {},
  ...props
}) => (
  <InputField label={label} identifier={identifier} required={required} width={width} gap={gap} fieldStyle={fieldStyle}>
    <InputPadrao
      type={type}
      value={value}
      onChange={onChange}
      identifier={identifier}
      inputRef={inputRef}
      required={required}
      {...props}
    />
  </InputField>
);

UseInputPadrao.propTypes = {
  label: PropTypes.string,
  identifier: PropTypes.string,
  required: PropTypes.bool,
  width: PropTypes.number,
  gap: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  fieldStyle: PropTypes.object,
};

export { InputField };
