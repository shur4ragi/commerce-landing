import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Rolagem suave com inércia (features.smoothScroll): a roda do mouse anda macia e um pouco mais
// devagar, para as animações de entrada e as seções presas na rolagem aparecerem por inteiro.
// No toque o celular continua nativo. Sem a rolagem suave ligada, as funções daqui caem no
// comportamento nativo do navegador.
let lenis = null;
let frame = 0;
// Motivos para pausar (trava de rolagem, tela de carregamento...): só volta quando todos saem.
const holds = new Set();

const headerHeight = () =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 0;

const sync = () => {
  if (!lenis) return;
  if (holds.size) lenis.stop();
  else lenis.start();
};

export function pauseSmoothScroll(reason) {
  holds.add(reason);
  sync();
}

export function resumeSmoothScroll(reason) {
  holds.delete(reason);
  sync();
}

// Rola até um elemento. block 'start' desconta o header fixo; 'center' centraliza na tela.
export function scrollToTarget(target, { block = 'start', immediate = false } = {}) {
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const top =
    block === 'center'
      ? rect.top + window.scrollY - (window.innerHeight - rect.height) / 2
      : rect.top + window.scrollY - headerHeight();

  if (lenis && !holds.size) {
    lenis.scrollTo(Math.max(top, 0), { immediate, duration: 1.4 });
    return;
  }
  window.scrollTo({ top: Math.max(top, 0), behavior: immediate ? 'instant' : 'smooth' });
}

// Links internos (href="#...") que nenhum componente tratou passam pela rolagem suave.
function onAnchorClick(event) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
  const link = event.target.closest?.('a[href^="#"]');
  const id = link?.getAttribute('href').slice(1);
  const target = id ? document.getElementById(id) : null;
  if (!target) return;
  event.preventDefault();
  scrollToTarget(target);
  window.history.replaceState(null, '', `#${id}`);
}

export function startSmoothScroll() {
  if (lenis) return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  lenis = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 0.9,
    smoothWheel: true,
    syncTouch: false,
    // Áreas com rolagem própria (carrossel, feed do celular, modais) continuam nativas.
    allowNestedScroll: true,
  });

  const raf = (time) => {
    lenis?.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);

  // A tela de carregamento (html[data-entrance="loading"]) trava a página: pausa enquanto durar.
  const root = document.documentElement;
  const watchEntrance = () => {
    if (root.dataset.entrance === 'loading') pauseSmoothScroll('entrance');
    else resumeSmoothScroll('entrance');
  };
  const observer = new MutationObserver(watchEntrance);
  observer.observe(root, { attributes: true, attributeFilter: ['data-entrance'] });
  watchEntrance();
  sync();

  document.addEventListener('click', onAnchorClick);

  return () => {
    document.removeEventListener('click', onAnchorClick);
    observer.disconnect();
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
    holds.delete('entrance');
  };
}
