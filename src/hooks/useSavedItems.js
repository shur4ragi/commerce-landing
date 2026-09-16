import { useCallback, useEffect, useState } from 'react';

const STORAGE_PREFIX = 'commerce-landing:saved-products';

function readIds(key) {
  if (typeof window === 'undefined') return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || '[]');
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function writeIds(key, ids) {
  try {
    window.localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    // ignore quota / private mode
  }
}

export function useSavedItems(clientId = 'default') {
  const key = `${STORAGE_PREFIX}:${clientId}`;
  const [ids, setIds] = useState(() => readIds(key));

  useEffect(() => {
    setIds(readIds(key));
  }, [key]);

  const has = useCallback((id) => ids.includes(id), [ids]);

  const toggle = useCallback((id) => {
    if (!id) return;

    setIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      writeIds(key, next);
      return next;
    });
  }, [key]);

  return { ids, has, toggle, count: ids.length };
}
