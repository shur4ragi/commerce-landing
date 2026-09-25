// Ao recarregar (F5, refresh) ou voltar para a página, ela reabre do topo: sem restaurar a
// posição de rolagem nem pular para a âncora da URL, para os efeitos de entrada rodarem de novo.
// Um link novo com âncora (ex.: /#contato) continua abrindo na seção indicada.
export function resetScrollOnReload() {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  const [navigation] = performance.getEntriesByType('navigation');

  if (navigation && navigation.type !== 'navigate') {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    toTop();
  }

  // Página restaurada do cache de voltar/avançar do navegador.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) toTop();
  });
}
