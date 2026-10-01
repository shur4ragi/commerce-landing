// A simulação de pedido (tour guiado) fica só na versão de PC: abaixo de 768px o botão
// some (CSS) e a simulação não abre nem continua aberta (JS).
export const SIMULATION_MOBILE_QUERY = '(max-width: 767px)';

export function isSimulationAllowed() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return true;
  return !window.matchMedia(SIMULATION_MOBILE_QUERY).matches;
}
