import { useRef, useState } from 'react';

export const applyMask = (value, pattern) => {
  const patterns = pattern.split('|').map((item) => item.trim());
  const numericValue = value.replace(/\D/g, '');
  const selectedPattern = patterns.find((item) => {
    const countDigits = (item.match(/9/g) || []).length;
    return numericValue.length <= countDigits;
  }) || patterns[patterns.length - 1];

  let maskedValue = '';
  let valueIndex = 0;

  for (let i = 0; i < selectedPattern.length; i += 1) {
    if (valueIndex >= numericValue.length) break;
    const patternChar = selectedPattern[i];
    const currentChar = numericValue[valueIndex];

    if (patternChar === '9' && /\d/.test(currentChar)) {
      maskedValue += currentChar;
      valueIndex += 1;
    } else if (patternChar !== '9') {
      maskedValue += patternChar;
    }
  }

  return maskedValue;
};

export const useInputMask = (pattern = null, type = 'text', initialValue = '', onChange) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const input = event?.target ? event.target.value : event;
    let finalValue = input;

    if (type === 'number' && pattern) {
      finalValue = applyMask(input.replace(/\D/g, ''), pattern);
    }

    setValue(finalValue);
    onChange?.({ target: { value: finalValue } });
  };

  return [value, handleChange, inputRef];
};

export const UseInputMask = useInputMask;
