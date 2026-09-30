// Abre um destino externo (WhatsApp, iFood, Google, Maps) depois da tela de carregamento.
// Passada a espera, o clique já não conta como gesto do usuário e o navegador pode bloquear a
// nova aba (Safari/iOS e navegadores dentro de apps sempre bloqueiam). Se bloquear, segue na mesma aba.
export function openExternal(href) {
  const win = window.open(href, '_blank');
  if (win) {
    try {
      win.opener = null;
    } catch {
      // Sem acesso ao opener: a aba já abriu, nada a fazer.
    }
    return;
  }
  window.location.assign(href);
}
