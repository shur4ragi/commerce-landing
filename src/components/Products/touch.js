// Celular/toque: um toque só já abre o item (no PC continua o clique duplo).
export const isTouchMenu = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 767px), (hover: none) and (pointer: coarse)').matches;
