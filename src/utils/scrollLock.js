// Trava de rolagem compartilhada (menu, painéis, carrinho, mapa, simulação).
// Cada componente pede a trava e recebe a função que a solta; a página só volta a rolar quando
// todas foram soltas, em qualquer ordem. Guardar e devolver o overflow "anterior" em cada
// componente quebrava quando eles se sobrepunham (ex.: sair da simulação com o carrinho aberto).
let locks = 0;
let original = '';

export function lockScroll() {
  if (locks === 0) {
    original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  locks += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) document.body.style.overflow = original;
  };
}
