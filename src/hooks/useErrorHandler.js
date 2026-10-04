import { useCallback } from 'react';

/**
 * Hook para capturar e lidar com erros assincronos
 * @returns {Object} objeto com métodos para tratar erros
 */
export function useErrorHandler() {
  const handleError = useCallback((error, context = '') => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const fullMessage = context ? `${context}: ${errorMessage}` : errorMessage;

    console.error('[useErrorHandler]', fullMessage);

    // Dispatch custom event that ErrorBoundary could listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('appError', {
        detail: { error, message: fullMessage, context },
      }));
    }

    return fullMessage;
  }, []);

  const throwAsync = useCallback((error, context = '') => {
    const fullMessage = handleError(error, context);
    throw new Error(fullMessage);
  }, [handleError]);

  return {
    handleError,
    throwAsync,
  };
}

/**
 * Hook para registrar um listener de erros globais
 * @param {Function} callback função chamada quando erro ocorre
 */
export function useErrorListener(callback) {
  if (typeof window === 'undefined') return;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  import('react').then(({ useEffect }) => {
    useEffect(() => {
      const handleAppError = (event) => {
        callback(event.detail);
      };

      window.addEventListener('appError', handleAppError);
      return () => window.removeEventListener('appError', handleAppError);
    }, [callback]);
  });
}

export default useErrorHandler;
