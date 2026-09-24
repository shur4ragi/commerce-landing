import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getActiveClient } from '../config';
import { applyTheme } from '../theme/applyTheme.js';
import { applySeo } from '../utils/seo.js';
import { buildWhatsappUrl } from '../utils/whatsapp.js';
import { validateClientConfig } from '../lib/clientValidator.js';
import { SiteContext } from './SiteContext.js';
import OrderProvider from './OrderProvider.jsx';

export default function AppProviders({ children }) {
  const client = useMemo(() => getActiveClient(), []);
  const [configError, setConfigError] = useState(null);

  const value = useMemo(() => ({
    clientId: client.id,
    config: client.config,
    content: client.content,
    sections: client.sections,
    navigation: client.config.navigation || [],
    whatsappUrl: buildWhatsappUrl(
      client.config.business.whatsapp,
      client.config.business.whatsappMessage,
    ),
  }), [client]);

  useEffect(() => {
    // Validate client configuration
    const validation = validateClientConfig(client);
    if (!validation.success) {
      const errorMessage = validation.errors
        .map((err) => `${err.path}: ${err.message}`)
        .join('; ');
      setConfigError(errorMessage);
      console.error('[AppProviders] Config validation failed:', validation.errors);
      return;
    }

    // Apply theme and SEO only if config is valid
    applyTheme(client.config.theme, client.config.branding);
    applySeo(client.config.seo, client.config.business, client.config.branding);
  }, [client]);

  if (configError) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
      >
        <div style={{
          maxWidth: '600px',
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #d32f2f',
        }}
        >
          <h1 style={{ color: '#d32f2f', marginTop: 0 }}>
            Erro na Configuração
          </h1>
          <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            A configuração do cliente está inválida. Entre em contato com o suporte:
          </p>
          <pre style={{
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '0.875rem',
            color: '#333',
          }}
          >
            {configError}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Recarregar Página
          </button>
        </div>
      </div>
    );
  }

  return (
    <SiteContext.Provider value={value}>
      <OrderProvider>
        {children}
      </OrderProvider>
    </SiteContext.Provider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
