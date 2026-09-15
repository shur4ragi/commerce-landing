import { useContext } from 'react';
import { SiteContext } from '../providers/SiteContext.js';

export function useSite() {
  const context = useContext(SiteContext);

  if (!context) {
    throw new Error('useSite deve ser usado dentro de AppProviders');
  }

  return context;
}
