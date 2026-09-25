import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_MS = 2000;

export function usePendingAction(ms = DEFAULT_MS) {
  const [label, setLabel] = useState('');
  const timerRef = useRef(0);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const run = useCallback((nextLabel, action) => {
    window.clearTimeout(timerRef.current);
    setLabel(nextLabel);
    timerRef.current = window.setTimeout(() => {
      setLabel('');
      action();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    window.clearTimeout(timerRef.current);
    setLabel('');
  }, []);

  return { pending: Boolean(label), label, run, clear };
}
