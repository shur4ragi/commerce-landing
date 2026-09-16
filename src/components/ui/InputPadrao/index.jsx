import styles from './styles.module.css';
import { useState, useRef, useMemo, useEffect } from "react";
import Select from '../../../assets/select-ui';
import DatePicker, { DatePickerRange } from '../../../assets/date-ui';
import Tooltip from '../TooltipPadrao';

const applyMask = (value, pattern) => {
  const patterns = pattern.split("|").map(p => p.trim());
  const numericValue = value.replace(/\D/g, "");
  const selectedPattern = patterns.find(p => {
    const countDigits = (p.match(/9/g) || []).length;
    return numericValue.length <= countDigits;
  }) || patterns[patterns.length - 1];
  let maskedValue = "";
  let valueIndex = 0;
  for (let i = 0; i < selectedPattern.length; i++) {
    if (valueIndex >= numericValue.length) break;
    const patternChar = selectedPattern[i];
    const currentChar = numericValue[valueIndex];
    if (patternChar === "9" && /\d/.test(currentChar)) {
      maskedValue += currentChar;
      valueIndex++;
    } else if (patternChar === "A" && /[a-zA-Z]/.test(currentChar)) {
      maskedValue += currentChar;
      valueIndex++;
    } else if (patternChar !== "9" && patternChar !== "A") {
      maskedValue += patternChar;
    }
  }
  return maskedValue;
};

const UseInputMask = (pattern = null, type = "text", initialValue = "", onChange) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const input = (e && e.target) ? e.target.value : e;
    let finalValue = input;

    if (type === "both") {
      const hasLetter = /[a-zA-Z]/.test(input);
      if (!hasLetter && pattern) {
        const rawValue = input.replace(/\D/g, "");
        finalValue = applyMask(rawValue, pattern);
      }
    } else if (type === "number") {
      const rawValue = input.replace(/\D/g, "");
      finalValue = pattern ? applyMask(rawValue, pattern) : rawValue;
    }

    setValue(finalValue);
    if (onChange) {

      if (typeof finalValue === 'object') {
        onChange(finalValue);
      } else {
        onChange({ target: { value: finalValue } });
      }
    }
  };
  return [value, handleChange, inputRef];
};

const formatMoney = (value, showSymbolInline = true) => {
  if (value === null || value === undefined) return "";
  let numeric = String(value).replace(/\D/g, "");

  if (numeric.length > 1 && numeric.startsWith("0")) {
    numeric = String(Number(numeric));
  }

  while (numeric.length < 3) {
    numeric = "0" + numeric;
  }

  const cents = numeric.slice(-2);
  let integer = numeric.slice(0, -2) || "0";
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return showSymbolInline ? `R$ ${integer},${cents}` : `${integer},${cents}`;
};

const formatPercentage = (value, showSymbolInline = true) => {
  if (value === null || value === undefined) return "";
  let numeric = String(value).replace(/\D/g, "");

  if (numeric.length > 1 && numeric.startsWith("0")) {
    numeric = String(Number(numeric));
  }

  while (numeric.length < 3) {
    numeric = "0" + numeric;
  }

  const cents = numeric.slice(-2);
  let integer = numeric.slice(0, -2) || "0";
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return showSymbolInline ? `${integer},${cents}%` : `${integer},${cents}`;
};

const UseMoneyPercentageMask = (type = "money", initialValue = "", showSymbolInline = true, onChange) => {
  const [value, setValue] = useState(() => {
    if (type === 'money') return formatMoney(String(initialValue), showSymbolInline);
    if (type === 'percentage') return formatPercentage(String(initialValue), showSymbolInline);
    return initialValue;
  });
  const inputRef = useRef(null);

  useEffect(() => {
    const formatted = type === 'percentage'
      ? formatPercentage(String(initialValue), showSymbolInline)
      : formatMoney(String(initialValue), showSymbolInline);
    if (formatted !== value) {
      setValue(formatted);
    }
  }, [initialValue, type, showSymbolInline]);

  const handleChange = (e) => {
    const raw = e.target.value;
    let formattedValue = raw;

    if (type === "money") {
      formattedValue = formatMoney(raw, showSymbolInline);
    } else if (type === "percentage") {
      if (showSymbolInline && value.endsWith('%') && raw === value.slice(0, -1)) {
        let numeric = value.replace(/\D/g, "");
        numeric = numeric.slice(0, -1);
        formattedValue = formatPercentage(numeric, showSymbolInline);
      } else {
        formattedValue = formatPercentage(raw, showSymbolInline);
      }
    }

    setValue(formattedValue);
    if (onChange) {
      onChange({
        target: {
          value: formattedValue
        }
      });
    }
  };

  return [value, handleChange, inputRef];
};


const InputField = ({ width, gap, label, required, children, fieldStyle = {} }) => {
  const fieldStyles = useMemo(() => ({
    ...(width && { maxWidth: `calc(${width}% - ${gap !== undefined ? gap : 0.5}rem)` }),
    ...fieldStyle
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

const InputButton = ({ item, buttonStyle, className }) => {
  const button = (
    <button className={`${styles.inputButton} ${className}`} style={buttonStyle} onClick={item.onClick} disabled={item.disabled ? item.disabled : false}>
      {item.text && <span>{item.text}</span>}
      {item.icon && <i className={item.icon} />}
    </button>
  );
  return item.tooltip ? <Tooltip text={item.tooltip}>{button}</Tooltip> : button;
};

const InputPadrao = ({
  type = "text",
  icon,
  value,
  onChange,
  inputRef,
  placeholder,
  required,
  identifier,
  className,
  contentStyle = {},
  fieldStyle = {},
  inputStyle = {},
  iconStyle = {},
  options = [],
  upperCase,
  lowerCase,
  readOnly,
  disabled,
  defaultSelect = true,
  searchable,
  onBlur,
  multiple,
  showClearIcon,
  inputButtonLeft,
  inputButtonRight,
  passwordIcon = true,
  iconRotate = true,
  onPaste,
  onKeyDown,
  onClickIcon = null,
  exClass,
  showSymbolInline,   // ← adicionar aqui
  symbolInlineRight,  // ← adicionar aqui
  rangeType,
  rangeLockStartToToday,
  rangeMinStartToToday,
  ...props
}) => {
  const [inputVisible, setInputVisible] = useState(false);

  const defaultIcons = useMemo(() => ({
    text: "",
    email: "fa-light fa-envelope",
    password: "fa-light fa-lock",
    number: "fa-light fa-hashtag",
    tel: "fa-light fa-phone",
    date: "fa-light fa-calendar-days",
    'datetime-local': "fa-light fa-calendar-days",
    time: "fa-light fa-clock",
    select: "fa-light fa-chevron-down",
    search: "fa-light fa-search",
    file: "fa-light fa-file"
  }), []);

  const getIcon = () => icon || defaultIcons[type] || defaultIcons.text;
  const iconStyles = useMemo(() => ({
    ...(icon && { cursor: onClickIcon ? 'pointer' : 'default' }),
    ...(icon && { userSelect: onClickIcon ? 'all' : 'none' }),
    ...(icon && { pointerEvents: onClickIcon ? 'all' : 'none' }),
    ...iconStyle
  }), [iconStyle]);


  const inputStyles = useMemo(() => ({
    ...(upperCase && { textTransform: 'uppercase' }),
    ...(lowerCase && { textTransform: 'lowercase' }),
    ...(['text', 'date', 'number', 'money', 'percentage'].includes(type) && { width: '100%' }),
    ...(inputButtonRight && { borderTopRightRadius: 0, borderBottomRightRadius: 0 }),
    ...(inputButtonLeft && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
    ...inputStyle
  }), [upperCase, lowerCase, type, icon, inputStyle]);

  const handleKeyDown = (e) => {
    if (type === 'number' && (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-')) {
      e.preventDefault();
    }

    // Se apertar Enter e houver botão à direita com onClick, executa automaticamente
    if (e.key === 'Enter' && inputButtonRight && inputButtonRight.length > 0) {
      const firstButton = inputButtonRight[0];
      if (firstButton.onClick && !firstButton.disabled) {
        e.preventDefault();
        firstButton.onClick(e);
      }
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const commonProps = {
    placeholder,
    required,
    id: identifier,
    ref: inputRef,
    readOnly,
    disabled,
    style: inputStyles,
    onBlur,
    onPaste,
    onKeyDown: handleKeyDown,
    autoComplete: props.autoComplete,
    ...(type === "file" && { multiple }),
    ...props,
  };

  const renderInput = () => {
    switch (type) {
      case "select":
        return <Select {...commonProps} inputStyle={inputStyles} value={value} onChange={onChange} identifier={identifier} options={options} defaultSelect={defaultSelect} icon={getIcon()} iconStyle={iconStyle} searchable={searchable} multiple={multiple} inputButtonLeft={inputButtonLeft} inputButtonRight={inputButtonRight} iconRotate={iconRotate} />;
      case "date":
      case "data completa":
      case "mes e dia":
      case "apenas dia":
      case "competencia":
      case "data e hora":
      case "apenas hora":
      case "apenas ano":
        return <DatePicker {...commonProps} value={value} onChange={onChange} type={type === 'date' ? 'data completa' : type} icon={icon} iconStyle={iconStyles} showClearIcon={showClearIcon} />;
      case "date-range":
        return (
          <DatePickerRange
            {...commonProps}
            value={value}
            onChange={onChange}
            type={rangeType || 'data completa'}
            lockRangeStartToToday={rangeLockStartToToday}
            minStartToToday={rangeMinStartToToday}
          />
        );
      case "password":
        return (
          <>
            <input {...commonProps} value={value} onChange={onChange} className={(className || styles.inputPadrao) + " " + (exClass || '')} type={inputVisible ? "text" : "password"} />
            <div className={styles.iconsContainer}>
              {passwordIcon && <i className={`fa-light fa-${inputVisible ? "eye-slash" : "eye"} ${styles.eyeIcon}`} onClick={() => setInputVisible(!inputVisible)} />}
              {icon !== false && <i className={getIcon()} style={iconStyles} />}
            </div>
          </>
        );
      case 'textarea':
        const textareaStyle = {
          lineBreak: "anywhere",
          padding: '0.5rem 1rem',
          height: 'auto',
          minHeight: '100px',
          overflow: 'hidden',
          lineHeight: '1rem',
          fieldSizing: 'content',
        };
        return <textarea {...commonProps} value={value} onChange={onChange} className={(className || styles.inputPadrao) + " " + (exClass || '')} style={{ ...commonProps.style, ...textareaStyle }} />;
      case 'file':
        return (
          <>
            <input {...commonProps} onChange={onChange} className={(className || styles.inputPadrao) + " " + (exClass || '')} type="file" />
            {icon !== false && <i className={getIcon()} style={iconStyles} />}
          </>
        );
      case "money":
      case "percentage":
        const showSymbolInline = props.showSymbolInline ?? true;
        const applyInlineClass = props.showSymbolInline === true;

        const [maskedValue, handleMaskedChange, maskedRef] = UseMoneyPercentageMask(type, value, showSymbolInline, onChange);

        return (
          <>
            <input
              {...commonProps}
              value={maskedValue}
              onChange={handleMaskedChange}
              ref={maskedRef}
              className={`${className || styles.inputPadrao} ${!applyInlineClass ? (props.symbolInlineRight ? styles.symbolInlineRight : styles.symbolInlineLeft) : ''} `}
              type="text"
            />
            {!showSymbolInline && (
              <div className={`${styles.inputSuffixContainer} ${props.symbolInlineRight ? styles.symbolInlineRight : styles.symbolInlineLeft}`}>
                <span className={styles.inputSuffix}>
                  {type === "money" ? "R$" : "%"}
                </span>
              </div>
            )}
          </>
        );
      default:
        return (
          <>
            <input {...commonProps} value={value} onChange={onChange} className={(className || styles.inputPadrao) + " " + (exClass || '')} type={type} />
            {icon !== false && <i className={getIcon()} style={iconStyles} onClick={onClickIcon} />}
          </>
        );
    }
  };

  return (
    <div className={styles.inputPadraoContent} style={contentStyle}>
      {inputButtonLeft?.map((item, index) => <InputButton key={index} item={item} buttonStyle={item.style} className={`${index === 0 ? styles.firstButton : ''} ${styles.inputButtonLeft} ${item.className}`} />)}
      <div className={styles.inputPadraoField} style={fieldStyle}>
        {renderInput()}
      </div>
      {inputButtonRight?.map((item, index) => <InputButton key={index} item={item} buttonStyle={item.style} className={`${index === inputButtonRight.length - 1 ? styles.lastButton : ''} ${styles.inputButtonRight} ${item.className}`} />)}
    </div>
  );
};

const UseInputPadrao = ({ label, identifier, required, width, gap, type = "text", value, onChange, inputRef, subtitle, subtitleIcon, fieldStyle = {}, ...props }) => (
  <InputField {...{ label, identifier, required, width, gap, fieldStyle }}>
    <InputPadrao {...{ type, value, onChange, identifier, inputRef, ...props }} />
    {subtitle &&
      <span className={styles.subtitle}>
        {subtitleIcon ? <i className={subtitleIcon} /> : null}
        {subtitle}
      </span>
    }
  </InputField>
);

export { UseInputPadrao, InputField, InputPadrao, UseInputMask, DatePickerRange, applyMask };