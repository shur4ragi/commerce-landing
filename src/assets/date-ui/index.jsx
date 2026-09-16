import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const WEEK_DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const parseBrazilianDate = (dateString) => {
    if (!dateString) return null;
    if (dateString instanceof Date) return dateString;

    const str = String(dateString).trim();
    const now = new Date();

    if (/^\d{4}$/.test(str)) {
        const year = Number(str);
        if (!isNaN(year)) return new Date(year, 0, 1);
    }

    if (/^\d{1,2}:\d{2}$/.test(str)) {
        const [hours, minutes] = str.split(':').map(Number);
        if (!isNaN(hours) && !isNaN(minutes)) {
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date;
        }
        return null;
    }

    const competenciaParts = str.split('/');
    if (competenciaParts.length === 2 && !isNaN(Number(competenciaParts[0])) && !isNaN(Number(competenciaParts[1]))) {
        const month = Number(competenciaParts[0]) - 1;
        const year = Number(competenciaParts[1]);
        if (month >= 0 && month <= 11 && !isNaN(year)) return new Date(year, month, 1);
        return null;
    }

    const [datePart, timePart] = str.split(' ');
    const dateParts = datePart.split('/').map(Number);

    let day = now.getDate(), month = now.getMonth(), year = now.getFullYear();

    if (dateParts.length === 1 && !isNaN(dateParts[0])) { day = dateParts[0]; }
    else if (dateParts.length === 2 && !isNaN(dateParts[0]) && !isNaN(dateParts[1])) { day = dateParts[0]; month = dateParts[1] - 1; }
    else if (dateParts.length === 3 && !isNaN(dateParts[0]) && !isNaN(dateParts[1]) && !isNaN(dateParts[2])) { day = dateParts[0]; month = dateParts[1] - 1; year = dateParts[2]; }

    const fullYear = year < 100 ? 2000 + year : year;
    const newDate = new Date(fullYear, month, day);

    if (timePart) {
        const [hours, minutes] = timePart.split(':').map(Number);
        if (!isNaN(hours) && !isNaN(minutes)) newDate.setHours(hours, minutes);
    }

    return isNaN(newDate.getTime()) ? null : newDate;
};

const getBrazilianDate = (date) => {
    if (!date) return '';
    if (typeof date === 'string') date = parseBrazilianDate(date);
    if (!(date instanceof Date) || isNaN(date)) return '';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return { day, month, year, hours, minutes };
};

const formatDateForDisplay = (value, type) => {
    if (!value) return '';
    const date = value instanceof Date ? value : parseBrazilianDate(value);
    if (!date || isNaN(date.getTime())) return '';

    const { day, month, year, hours, minutes } = getBrazilianDate(date);
    
    switch (type) {
        case 'data completa': return `${day}/${month}/${year}`;
        case 'mes e dia': return `${day}/${month}`;
        case 'apenas dia': return `${day}`;
        case 'competencia': return `${month}/${year}`;
        case 'data e hora': return `${day}/${month}/${year} ${hours}:${minutes}`;
        case 'apenas hora': return `${hours}:${minutes}`;
        case 'apenas ano': return `${year}`;
        default: return '';
    }
};

const DatePickerContent = forwardRef(({ type, value, onChange, onBlur, onClose, isRange = false, minDate, maxDate }, ref) => {
    const [currentDate, setCurrentDate] = useState(value ? parseBrazilianDate(value) || new Date() : new Date());
    const [view, setView] = useState('days');
    const [internalValue, setInternalValue] = useState(value ? parseBrazilianDate(value) : null);

    useEffect(() => {
        if (value) {
            const parsedDate = parseBrazilianDate(value);
            if (parsedDate && !isNaN(parsedDate.getTime())) {
                setInternalValue(parsedDate);
                if(!internalValue) {
                  setCurrentDate(parsedDate);
                }
            } else {
                setInternalValue(null);
            }
        } else {
            setInternalValue(null);
        }
    }, [value]);
    
    useEffect(() => {
        if (type === 'competencia') setView('months');
        else if (type === 'apenas ano') setView('years');
        else setView('days');
    }, [type]);

    const handleDayClick = (day, monthOffset = 0) => {
        const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, day);

        if (internalValue && (type === 'data e hora' || type === 'apenas hora')) {
            newSelectedDate.setHours(internalValue.getHours());
            newSelectedDate.setMinutes(internalValue.getMinutes());
        }
        
        onChange({ target: { value: formatDateForDisplay(newSelectedDate, type) } });

        if (['data completa', 'mes e dia', 'apenas dia'].includes(type) && !isRange) {
            console.log(isRange)
            onClose();
        } else if (monthOffset !== 0) {
            setCurrentDate(new Date(newSelectedDate.getFullYear(), newSelectedDate.getMonth(), 1));
        }
    };

    const handleMonthClick = (monthIndex) => {
        const newDate = new Date(currentDate.getFullYear(), monthIndex, 1);
        setCurrentDate(newDate);
        
        onChange({ target: { value: formatDateForDisplay(newDate, type) } });

        if (type === 'competencia' && !isRange) {
                console.log(isRange)
            onClose();
        } else {
            setView('days');
        }
    };


    const handleYearClick = (year) => {
        const newDate = new Date(year, currentDate.getMonth(), 1);
        setCurrentDate(newDate);

        onChange({ target: { value: formatDateForDisplay(newDate, type) } });

        if (type === 'apenas ano' && !isRange) {
                console.log(isRange)
            onClose();
        } else {
            setView('months');
        }
    };


    const handlePrev = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            if (view === 'years') {
                newDate.setFullYear(newDate.getFullYear() - 12);
            } else if (view === 'months') {
                newDate.setFullYear(newDate.getFullYear() - 1);
            } else {
                newDate.setMonth(newDate.getMonth() - 1);
            }
            return newDate;
        });
    };

    const handleNext = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            if (view === 'years') {
                newDate.setFullYear(newDate.getFullYear() + 12);
            } else if (view === 'months') {
                newDate.setFullYear(newDate.getFullYear() + 1);
            } else {
                newDate.setMonth(newDate.getMonth() + 1);
            }
            return newDate;
        });
    };

    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        const today = new Date();
        const days = [];

        for (let i = firstDayOfMonth; i > 0; i--) {
            const day = daysInPrevMonth - i + 1;
            days.push(
                <div 
                    key={`prev-${day}`} 
                    className={`${styles.day} ${styles.otherMonthDay}`}
                    onClick={() => handleDayClick(day, -1)}
                >
                    {day}
                </div>
            );
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
            const isSelected = internalValue && internalValue.getFullYear() === year && internalValue.getMonth() === month && internalValue.getDate() === day;
            
            const dateObj = new Date(year, month, day);
            dateObj.setHours(0, 0, 0, 0);

            let isDisabled = false;
            if (minDate) {
                const min = new Date(minDate);
                min.setHours(0, 0, 0, 0);
                if (dateObj < min) isDisabled = true;
            }
            if (maxDate) {
                const max = new Date(maxDate);
                max.setHours(0, 0, 0, 0);
                if (dateObj > max) isDisabled = true;
            }

            days.push(
                <div
                    key={day}
                    className={`${styles.day} ${isToday ? styles.today : ''} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''}`}
                    onClick={() => !isDisabled && handleDayClick(day, 0)}
                >
                    {day}
                </div>
            );
        }

        const totalCells = 42;
        const remainingCells = totalCells - days.length;
        for (let i = 1; i <= remainingCells; i++) {
            days.push(
                <div 
                    key={`next-${i}`} 
                    className={`${styles.day} ${styles.otherMonthDay}`}
                    onClick={() => handleDayClick(i, 1)}
                >
                    {i}
                </div>
            );
        }
        
        return days;
    };

    const renderMonths = () => {
        return MONTHS.map((month, index) => {
            const isSelected = internalValue && internalValue.getFullYear() === currentDate.getFullYear() && internalValue.getMonth() === index;
            return (
                <div
                    key={month}
                    className={`${styles.monthItem} ${isSelected ? styles.selected : ''}`}
                    onClick={() => handleMonthClick(index)}
                >
                    {month}
                </div>
            );
        });
    };

    const renderYears = () => {
        const currentYear = currentDate.getFullYear();
        const startYear = currentYear - (currentYear % 12);
        const years = [];
        for (let i = 0; i < 12; i++) {
            const year = startYear + i;
            const isSelected = internalValue && internalValue.getFullYear() === year;
            years.push(
                <div
                    key={year}
                    className={`${styles.yearItem} ${isSelected ? styles.selected : ''}`}
                    onClick={() => handleYearClick(year)}
                >
                    {year}
                </div>
            );
        }
        return years;
    };

    const renderHoursAndMinutes = () => {
        const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
        const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
        
        const handleSelectTime = (unit, selectedValue) => {
            let newDate;
            if (internalValue) {
                newDate = new Date(internalValue);
            } else {
                newDate = new Date(); 
                newDate.setHours(0, 0, 0, 0); 
            }
            
            if (unit === 'hour') {
                newDate.setHours(parseInt(selectedValue, 10));
            } else {
                newDate.setMinutes(parseInt(selectedValue, 10));
            }
            
            onChange({ target: { value: formatDateForDisplay(newDate, type) } });
            if (unit === 'minute' && selectedValue && type === 'apenas hora' && !isRange) {
                console.log(isRange)
                onClose();
            }
        };


        const selectedHour = internalValue ? getBrazilianDate(internalValue).hours : null;
        const selectedMinute = internalValue ? getBrazilianDate(internalValue).minutes : null;

        return (
            <div className={styles.timeSelector}>
                <div className={styles.timeColumn}>
                    <div className={styles.columnHeader}>Horas</div>
                    <div className={styles.timeItemList}>
                        {hours.map(h => (
                            <div 
                                key={h} 
                                className={`${styles.timeItem} ${selectedHour === h ? styles.selected : ''}`}
                                onClick={() => handleSelectTime('hour', h)}
                            >
                                {h}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.timeColumn}>
                    <div className={styles.columnHeader}>Minutos</div>
                    <div className={styles.timeItemList}>
                        {minutes.map(m => (
                            <div 
                                key={m} 
                                className={`${styles.timeItem} ${selectedMinute === m ? styles.selected : ''}`}
                                onClick={() => handleSelectTime('minute', m)}
                            >
                                {m}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const isDateType = ['data completa', 'mes e dia', 'apenas dia', 'competencia', 'data e hora'].includes(type);
    const isTimeType = ['apenas hora', 'data e hora'].includes(type);
    const isYearOnlyType = type === 'apenas ano';

    return (
        <div className={`${styles.datePickerContent} ${['data e hora'].includes(type) ? styles.timePickerContent : ''}`} ref={ref}>
            {isDateType && (
                <div className={styles.calendarContainer}>
                    <div className={styles.calendarHeader}>
                        <button onClick={handlePrev}>
                            <i className="fa-light fa-chevron-left" />
                        </button>
                        <span onClick={() => {
                            if (view === 'days') setView('months');
                            else if (view === 'months') setView('years');
                        }}>
                            {view === 'days' ? `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}` : 
                             view === 'months' ? currentDate.getFullYear() :
                             `${currentDate.getFullYear() - (currentDate.getFullYear() % 12)} - ${currentDate.getFullYear() - (currentDate.getFullYear() % 12) + 11}`}
                        </span>
                        <button onClick={handleNext}>
                             <i className="fa-light fa-chevron-right" />
                        </button>
                    </div>

                    {view === 'days' && (
                        <>
                            <div className={styles.weekDays}>
                                {WEEK_DAYS.map(day => <div key={day}>{day}</div>)}
                            </div>
                            <div className={styles.daysGrid}>
                                {renderDays()}
                            </div>
                        </>
                    )}
                    
                    {view === 'months' && <div className={styles.monthsGrid}>{renderMonths()}</div>}
                    {view === 'years' && <div className={styles.yearsGrid}>{renderYears()}</div>}
                </div>
            )}
            {['data e hora'].includes(type) && <div className={styles.dateDivider} />}
            {isTimeType && <div className={styles.timeInputContainer}>{renderHoursAndMinutes()}</div>}
            {isYearOnlyType && (
                <div className={styles.calendarContainer}>
                    <div className={styles.calendarHeader}>
                        <button onClick={handlePrev}><i className="fa-light fa-chevron-left" /></button>
                        <span>
                            {`${currentDate.getFullYear() - (currentDate.getFullYear() % 12)} - ${currentDate.getFullYear() - (currentDate.getFullYear() % 12) + 11}`}
                        </span>
                        <button onClick={handleNext}><i className="fa-light fa-chevron-right" /></button>
                    </div>
                    <div className={styles.yearsGrid}>{renderYears()}</div>
                </div>
            )}
        </div>
    );
});

const MASKS = {
    'data completa': '99/99/9999',
    'mes e dia': '99/99',
    'apenas dia': '99',
    'data e hora': '99/99/9999 99:99',
    'apenas hora': '99:99',
    'apenas ano': '9999',
    'competencia': '99/9999'
};

const applyMask = (value, pattern) => {
  const numericValue = value.replace(/\D/g, "");
  let maskedValue = "";
  let valueIndex = 0;
  for (let i = 0; i < pattern.length; i++) {
    if (valueIndex >= numericValue.length) break;
    const patternChar = pattern[i];
    const currentChar = numericValue[valueIndex];
    if (patternChar === "9") {
      maskedValue += currentChar;
      valueIndex++;
    } else {
      maskedValue += patternChar;
    }
  }
  return maskedValue;
};

const DatePicker = forwardRef(({
    type = 'data completa',
    value,
    onChange,
    onBlur,
    disabled = false,
    readOnly = false,
    icon = true,
    iconStyle = {},
    showClearIcon = true,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(formatDateForDisplay(value, type));
    const [optionsPositionStyle, setOptionsPositionStyle] = useState({});
    const [pendingBlur, setPendingBlur] = useState(false);

    const containerWrapperRef = useRef(null);
    const datePickerContentRef = useRef(null);
    const displayInputRef = useRef(null);

    const handleClose = useCallback(() => setIsOpen(false), []);
    const handleOpen = () => {
        if (!disabled && !readOnly) {
            setIsOpen(prev => !prev);
        }
    }

    useImperativeHandle(ref, () => ({
        value,
        formattedValue: formatDateForDisplay(value, type),
        focus: () => displayInputRef.current.focus(),
        blur: () => displayInputRef.current.blur(),
        getContainer: () => containerWrapperRef.current,
    }), [value, type]);

    const calculatePosition = useCallback(() => {
        if (displayInputRef.current && datePickerContentRef.current) {
            const displayRect = displayInputRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const datePickerHeight = 300; 
            const datePickerWidth = datePickerContentRef.current.offsetWidth;

            const spaceBelow = viewportHeight - displayRect.bottom;
            const spaceAbove = displayRect.top;
            const spaceRight = viewportWidth - displayRect.left;
            const spaceLeft = displayRect.right;

            let top, bottom, left;
            let newBoxShadow;
            
            if (spaceBelow >= datePickerHeight || spaceBelow > spaceAbove) {
                top = `${displayRect.bottom + 5}px`;
                bottom = 'auto';
                newBoxShadow = '2px 4px 8px rgba(0, 0, 0, 0.1)';
            } else {
                top = 'auto';
                bottom = `${viewportHeight - displayRect.top + 5}px`;
                newBoxShadow = '2px -4px 8px rgba(0, 0, 0, 0.1)';
            }

            if (spaceRight >= datePickerWidth) {
                left = `${displayRect.left}px`;
            } else if (spaceLeft >= datePickerWidth) {
                left = `${displayRect.right - datePickerWidth}px`;
            } else {
                left = `${(viewportWidth - datePickerWidth) / 2}px`;
            }

            setOptionsPositionStyle({
                top: top,
                bottom: bottom,
                left: left,
                border: '1px solid var(--cinza-claro)',
                boxShadow: newBoxShadow,
                boxSizing: 'border-box',
            });
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            const handleResizeAndScroll = () => {
                calculatePosition();
            };

            window.addEventListener('resize', handleResizeAndScroll);
            window.addEventListener('scroll', handleResizeAndScroll, true);
            calculatePosition();

            return () => {
                window.removeEventListener('resize', handleResizeAndScroll);
                window.removeEventListener('scroll', handleResizeAndScroll, true);
            };
        }
    }, [isOpen, calculatePosition]);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen &&
                containerWrapperRef.current &&
                !containerWrapperRef.current.contains(event.target) &&
                datePickerContentRef.current &&
                !datePickerContentRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (pendingBlur) {
            if (onBlur) {
                onBlur({ target: { value: inputValue } });
            }
            setPendingBlur(false);
        }
    }, [inputValue]);
    
    const handleInputBlur = (e) => {
        const currentValue = displayInputRef.current.value;
        const parsedDate = parseBrazilianDate(currentValue);

        if (parsedDate && !isNaN(parsedDate.getTime())) {
            const formatted = formatDateForDisplay(parsedDate, type);

            if (formatted !== value) {
                onChange({ target: { value: formatted } });
            }
            if (currentValue !== formatted) {
                setInputValue(formatted);
            } else {
                setInputValue(currentValue);
            }
        } else {
            if (value !== '') {
                onChange({ target: { value: '' } });
            }
            setInputValue('');
        }

        setPendingBlur(true);
    };

    useEffect(() => {
        setInputValue(formatDateForDisplay(value, type));
    }, [value, type]);

    const handleInputChange = (e) => {
        const pattern = MASKS[type];
        if (!pattern || type === 'competencia') {
            setInputValue(e.target.value);
            return;
        }

        const numericValue = e.target.value.replace(/\D/g, '');
        if (numericValue) {
            const maskedValue = applyMask(numericValue, pattern);
            setInputValue(maskedValue);
        } else {
            setInputValue('');
        }
    };

    const handleClear = (e) => {
        e.stopPropagation();
        if (onChange && !disabled && !readOnly) {
            onChange({ target: { value: '' } });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && !disabled && !readOnly) {
            onChange({ target: { value: '' } });
        }
    };

    const handleInputKeyDown = (e) => {
        if (!disabled && !readOnly && (e.key === 'Enter' || e.key === 'Tab')) {
            e.preventDefault();
            handleInputBlur(e);
            handleClose();
            displayInputRef.current.blur();
        }
    };

    const handleDatePickerClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            ref={containerWrapperRef}
            className={`${styles.customSelectContainer} ${isOpen ? styles.open : ''} ${disabled || readOnly ? styles.disabled : ''}`}
            tabIndex={disabled || readOnly ? -1 : 0}
            onKeyDown={handleKeyDown}
            onClick={handleDatePickerClick} 
            {...props}
        >
            <input
                type="text"
                disabled={disabled}
                readOnly={readOnly}
                ref={displayInputRef}
                className={styles.selectDisplay}
                onClick={handleOpen}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                placeholder={props.placeholder || "Digite a data"}
                id={props.identifier}
                style={props.style}
            />
            <div className={styles.iconsContainer}>
                {showClearIcon && inputValue && !disabled && !readOnly && (
                    <i
                        className={`fa-light fa-times ${styles.clearIcon}`}
                        onClick={handleClear}
                        role="button"
                    />
                )}
                {icon && (
                    <i 
                        className={`${icon === true ? 'fa-light fa-calendar-alt' : icon} ${styles.calendarIcon} ${disabled || readOnly ? styles.disabledIcon : ''}`} 
                        style={iconStyle} 
                        onClick={handleOpen}
                    />
                )}
            </div>
            
            {isOpen && !disabled && !readOnly && createPortal(
                <div
                    className={`${styles.optionsContainer} ${['data e hora', 'apenas hora'].includes(type) ? styles.timePickerOptions : styles.datePickerOptions}`}
                    style={optionsPositionStyle}
                    ref={datePickerContentRef}
                >
                    <DatePickerContent type={type} value={value} onChange={onChange} onBlur={onBlur} onClose={handleClose} minDate={props.minDate} maxDate={props.maxDate} />
                </div>,
                document.body
            )}
        </div>
    );
});

const DateRangePickerContent = forwardRef(({ type, valueStart, valueEnd, onPartialChange, onComplete, lockRangeStartToToday = false, minStartToToday = false }, ref) => {
    const [selection, setSelection] = useState({
        start: valueStart ? parseBrazilianDate(valueStart) : null,
        end: valueEnd ? parseBrazilianDate(valueEnd) : null,
    });

    const handleSelection = (date, part) => {
        if (part === "start") {
            if (lockRangeStartToToday) return;
            setSelection({ start: date, end: selection.end });
            onPartialChange({
                start: formatDateForDisplay(date, type),
                end: formatDateForDisplay(selection.end, type),
            });
        } else {
            let finalStart = selection.start;
            if (lockRangeStartToToday) {
                const t = parseBrazilianDate(formatDateForDisplay(new Date(), type));
                if (t) finalStart = t;
            }
            let finalEnd = date;
            if (
                ['data completa', 'data e hora', 'mes e dia', 'apenas dia'].includes(type) &&
                finalStart && finalEnd &&
                finalStart > finalEnd
            ) {
                [finalStart, finalEnd] = [finalEnd, finalStart];
            }
            setSelection({ start: finalStart, end: finalEnd });
            onComplete({
                start: formatDateForDisplay(finalStart, type),
                end: formatDateForDisplay(finalEnd, type),
            });
        }
    };

    return (
        <div className={styles.dateRangePickerContent} ref={ref}>
            <div className={lockRangeStartToToday ? styles.calendarColumnLocked : undefined}>
                <DatePickerContent
                    type={type}
                    value={selection.start}
                    onChange={(e) => handleSelection(parseBrazilianDate(e.target.value), "start")}
                    onClose={() => {}}
                    isRange={true}
                    minDate={minStartToToday ? new Date() : undefined}
                />
            </div>
            <div className={styles.dateDivider} />
            <DatePickerContent
                type={type}
                value={selection.end}
                onChange={(e) => handleSelection(parseBrazilianDate(e.target.value), "end")}
                onClose={() => {}}
                isRange={true}
            />
        </div>
    );
});

const DatePickerRange = forwardRef(({
    type = 'data completa',
    value = { start: '', end: '' },
    onChange,
    onBlur,
    disabled = false,
    readOnly = false,
    lockRangeStartToToday = false,
    minStartToToday = false,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState({
        start: formatDateForDisplay(value.start, type),
        end: formatDateForDisplay(value.end, type),
    });

    const containerWrapperRef = useRef(null);
    const datePickerContentRef = useRef(null);
    const startInputRef = useRef(null);
    const endInputRef = useRef(null);
    const [optionsPositionStyle, setOptionsPositionStyle] = useState({});

    useEffect(() => {
        if (!lockRangeStartToToday) return;
        const v = (value && typeof value === 'object') ? value : { start: '', end: '' };
        const todayStr = formatDateForDisplay(new Date(), type);
        const today0 = parseBrazilianDate(todayStr);
        if (!today0 || isNaN(today0.getTime())) return;
        today0.setHours(0, 0, 0, 0);
        let nextEnd = v.end || '';
        if (nextEnd) {
            const endD = parseBrazilianDate(nextEnd);
            if (endD && !isNaN(endD.getTime())) {
                endD.setHours(0, 0, 0, 0);
                if (endD < today0) nextEnd = todayStr;
            }
        }
        const nextStart = todayStr;
        if ((v.start || '') === nextStart && (v.end || '') === (nextEnd || '')) return;
        onChange({ target: { value: { start: nextStart, end: nextEnd || '' } } });
    }, [lockRangeStartToToday, type, value]);

    useEffect(() => {
        setInputValue({
            start: formatDateForDisplay(value.start, type),
            end: formatDateForDisplay(value.end, type)
        });
    }, [value, type]);

    useImperativeHandle(ref, () => ({
        value,
        focus: () => startInputRef.current?.focus(),
        blur: () => {
            startInputRef.current?.blur();
            endInputRef.current?.blur();
        },
        getContainer: () => containerWrapperRef.current,
        getPortalContainer: () => datePickerContentRef.current,
    }), [value]);

    const handleOpen = (e) => {
        e.stopPropagation();
        !disabled && !readOnly && setIsOpen(true);
    };

    const handleClose = useCallback(() => {
        setIsOpen(false);
        const currentStart = value.start || '';
        const currentEnd = value.end || '';

        if (isOpen) {
            if (currentStart && !currentEnd) {
                onChange({ target: { value: { start: currentStart, end: currentStart } } });
            } else if (!currentStart && currentEnd) {
                onChange({ target: { value: { start: currentEnd, end: currentEnd } } });
            }
        }
    }, [value, onChange, isOpen]);

    const handleComplete = (finalValue) => {
        onChange({ target: { value: finalValue } });
        setIsOpen(false);
    };

    const handlePartialChange = (partialValue) => {
        onChange({ target: { value: partialValue } });
    };

    const handleManualInputChange = (e, part) => {
        if (lockRangeStartToToday && part === 'start') return;
        const pattern = MASKS[type];
        let rawValue = e.target.value;
        let maskedValue = rawValue;

        if (pattern) {
             const numericValue = rawValue.replace(/\\D/g, '');
             maskedValue = applyMask(numericValue, pattern);
        }

        setInputValue(prev => ({ ...prev, [part]: maskedValue }));
    };

    const handleInputBlur = (e, part) => {
        const v = (value && typeof value === 'object') ? value : { start: '', end: '' };
        let finalValue = { start: v.start || '', end: v.end || '' };

        if (lockRangeStartToToday && part === 'start') {
            finalValue.start = formatDateForDisplay(new Date(), type);
            onChange({ target: { value: finalValue } });
            setInputValue(prev => ({ ...prev, start: finalValue.start }));
            if (onBlur) onBlur(e);
            return;
        }

        const currentInputValue = inputValue[part];
        let parsedDate = parseBrazilianDate(currentInputValue);

        if (parsedDate && !isNaN(parsedDate.getTime())) {
            if ((lockRangeStartToToday || (minStartToToday && part === 'start')) && part !== 'end') {
                const todayStr = formatDateForDisplay(new Date(), type);
                const today0 = parseBrazilianDate(todayStr);
                today0.setHours(0, 0, 0, 0);
                const pd = new Date(parsedDate);
                pd.setHours(0, 0, 0, 0);
                if (pd < today0) parsedDate = today0;
            }
            if (lockRangeStartToToday && part === 'end') {
                const todayStr = formatDateForDisplay(new Date(), type);
                const today0 = parseBrazilianDate(todayStr);
                today0.setHours(0, 0, 0, 0);
                const pd = new Date(parsedDate);
                pd.setHours(0, 0, 0, 0);
                if (pd < today0) parsedDate = today0;
            }
            finalValue[part] = formatDateForDisplay(parsedDate, type);
        } else {
            finalValue[part] = '';
        }
        onChange({ target: { value: finalValue } });

        if (onBlur) onBlur(e);
    };

    const calculatePosition = useCallback(() => {
        if (containerWrapperRef.current && datePickerContentRef.current) {
            const displayRect = containerWrapperRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const datePickerHeight = 300;
            const datePickerWidth = datePickerContentRef.current.offsetWidth;

            const spaceBelow = viewportHeight - displayRect.bottom;
            const spaceAbove = displayRect.top;
            const spaceRight = viewportWidth - displayRect.left;
            const spaceLeft = displayRect.right;

            let top, bottom, left;

            if (spaceBelow >= datePickerHeight || spaceBelow > spaceAbove) {
                top = `${displayRect.bottom + 5}px`;
                bottom = 'auto';
            } else {
                top = 'auto';
                bottom = `${viewportHeight - displayRect.top + 5}px`;
            }

            if (spaceRight >= datePickerWidth) {
                left = `${displayRect.left}px`;
            } else if (spaceLeft >= datePickerWidth) {
                left = `${displayRect.right - datePickerWidth}px`;
            } else {
                left = `${(viewportWidth - datePickerWidth) / 2}px`;
            }

            setOptionsPositionStyle({ top, bottom, left, border: '1px solid var(--cinza-claro)'});
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            const handleResizeAndScroll = () => calculatePosition();
            window.addEventListener('resize', handleResizeAndScroll);
            window.addEventListener('scroll', handleResizeAndScroll, true);
            calculatePosition();
            return () => {
                window.removeEventListener('resize', handleResizeAndScroll);
                window.removeEventListener('scroll', handleResizeAndScroll, true);
            };
        }
    }, [isOpen, calculatePosition]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen &&
                containerWrapperRef.current && !containerWrapperRef.current.contains(event.target) &&
                datePickerContentRef.current && !datePickerContentRef.current.contains(event.target)
            ) {
                handleClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, handleClose]);

    const startLocked = lockRangeStartToToday && !disabled;
    const startReadOnly = readOnly || startLocked;

    return (
        <div ref={containerWrapperRef} className={styles.dateRangeInputContainer} onClick={handleOpen}>
             <input
                type="text"
                ref={startInputRef}
                disabled={disabled}
                readOnly={startReadOnly}
                className={`${styles.selectDisplay} ${startLocked ? styles.rangeStartLocked : ''}`}
                value={inputValue.start}
                onChange={(e) => handleManualInputChange(e, 'start')}
                onBlur={(e) => handleInputBlur(e, 'start')}
                placeholder="Início"
                title={startLocked ? 'Data de início fixada em hoje' : undefined}
            />
            <span className={styles.dateRangeSeparator}>-</span>
             <input
                type="text"
                ref={endInputRef}
                disabled={disabled}
                readOnly={readOnly}
                className={styles.selectDisplay}
                value={inputValue.end}
                onChange={(e) => handleManualInputChange(e, 'end')}
                onBlur={(e) => handleInputBlur(e, 'end')}
                placeholder="Fim"
            />
            <div className={styles.iconsContainer}>
                <i className={`fa-light fa-calendar-alt ${styles.calendarIcon}`} />
            </div>

            {isOpen && createPortal(
                <div
                    className={styles.dateRangePickerContainer}
                    style={optionsPositionStyle}
                    onClick={(e) => e.stopPropagation()}
                >
                    <DateRangePickerContent
                        ref={datePickerContentRef}
                        type={type}
                        valueStart={value.start}
                        valueEnd={value.end}
                        onPartialChange={handlePartialChange}
                        onComplete={handleComplete}
                        lockRangeStartToToday={lockRangeStartToToday}
                        minStartToToday={minStartToToday}
                    />
                </div>,
                document.body
            )}
        </div>
    );
});

export { DatePicker, DatePickerRange };
export default DatePicker;
