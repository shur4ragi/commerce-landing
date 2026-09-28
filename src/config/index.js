import auroraCafe from './clients/aurora-cafe.js';
import frydaCafe from './clients/fryda-cafe.js';

const clients = {
  'aurora-cafe': auroraCafe,
  'fryda-cafe': frydaCafe,
};

// Cliente padrão desta branch; VITE_CLIENT_ID continua podendo trocar.
const DEFAULT_CLIENT = 'fryda-cafe';

export function getActiveClient() {
  const clientId = import.meta.env.VITE_CLIENT_ID || DEFAULT_CLIENT;
  const client = clients[clientId];

  if (!client) {
    console.warn(`[commerce-landing] Cliente "${clientId}" não encontrado. Usando ${DEFAULT_CLIENT}.`);
    return clients[DEFAULT_CLIENT];
  }

  return client;
}

export function listClients() {
  return Object.keys(clients);
}
