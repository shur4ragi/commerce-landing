// Trava de rolagem compartilhada (menu, painéis, carrinho, mapa, simulação).
// Cada componente pede a trava e recebe a função que a solta; a página só volta a rolar quando
// todas foram soltas, em qualquer ordem. Guardar e devolver o overflow "anterior" em cada
// componente quebrava quando eles se sobrepunham (ex.: sair da simulação com o carrinho aberto).
import { pauseSmoothScroll, resumeSmoothScroll } from './smoothScroll.js';

let locks = 0;
let original = '';
let saved = null;

export function lockScroll() {
  if (locks === 0) {
    original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // O html reserva o espaço da barra (scrollbar-gutter: stable), que aparecia como uma faixa
    // ao lado de painéis e modais fixos. Durante a trava a faixa some e o body compensa a largura.
    const root = document.documentElement;
    const gutter = window.innerWidth - root.clientWidth;
    saved = {
      gutter: root.style.scrollbarGutter,
      overflow: root.style.overflow,
      padding: document.body.style.paddingRight,
    };
    root.style.scrollbarGutter = 'auto';
    root.style.overflow = 'hidden';
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
    // A rolagem suave (quando ligada) também para, senão a roda continuaria movendo a página.
    pauseSmoothScroll('lock');
  }
  locks += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) {
      document.body.style.overflow = original;
      if (saved) {
        const root = document.documentElement;
        root.style.scrollbarGutter = saved.gutter;
        root.style.overflow = saved.overflow;
        document.body.style.paddingRight = saved.padding;
        saved = null;
      }
      resumeSmoothScroll('lock');
    }
  };
}
