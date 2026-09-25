import { useEffect, useRef } from 'react';

// Grava em `--p` (0 → 1) quanto de uma seção alta já foi percorrido enquanto ela está presa na tela.
// 0 = topo da seção encostou no topo da viewport; 1 = fim da seção encostou no fim da viewport.
// O "topo" desconta o header fixo (--header-height), igual ao `top` dos elementos sticky.
// O CSS usa `--p` para animar; `onProgress` recebe o mesmo valor quando o JS precisa reagir.
export function useScrollProgress(ref, onProgress) {
  const callback = useRef(onProgress);

  useEffect(() => {
    callback.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let frame = 0;
    let offsetTop = 0;

    const measure = () => {
      const header = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
      offsetTop = parseFloat(header) || 0;
    };

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const distance = node.offsetHeight - (window.innerHeight - offsetTop);
      const passed = offsetTop - rect.top;
      const progress = distance > 0 ? Math.min(Math.max(passed / distance, 0), 1) : 0;
      node.style.setProperty('--p', progress.toFixed(4));
      callback.current?.(progress);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const handleResize = () => {
      measure();
      schedule();
    };

    measure();
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);
}
