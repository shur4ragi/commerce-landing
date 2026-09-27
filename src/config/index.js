import auroraCafe from './clients/aurora-cafe.js';
import frydaCafe from './clients/fryda-cafe.js';

const clients = {
  'aurora-cafe': auroraCafe,
  'fryda-cafe': frydaCafe,
};

export function getActiveClient() {
  const clientId = import.meta.env.VITE_CLIENT_ID || 'aurora-cafe';
  const client = clients[clientId];

  if (!client) {
    console.warn(`[commerce-landing] Cliente "${clientId}" não encontrado. Usando aurora-cafe.`);
    return clients['aurora-cafe'];
  }

  return client;
}

export function listClients() {
  return Object.keys(clients);
}
