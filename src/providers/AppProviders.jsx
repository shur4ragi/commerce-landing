import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getActiveClient } from '../config';
import { applyTheme } from '../theme/applyTheme.js';
import { applySeo } from '../utils/seo.js';
import { buildWhatsappUrl } from '../utils/whatsapp.js';
import { SiteContext } from './SiteContext.js';

export default function AppProviders({ children }) {
  const client = useMemo(() => getActiveClient(), []);

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
    applyTheme(client.config.theme, client.config.branding);
    applySeo(client.config.seo, client.config.business, client.config.branding);
  }, [client]);

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
