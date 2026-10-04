import { useEffect, useRef, useState } from 'react';
import CoffeeSVG from './CoffeePourSVG';
import styles from './scrollAnimatedCoffee.module.css';

/**
 * ScrollAnimatedCoffee - Componente com animação scroll-driven
 *
 * A animação do bule derramando café é acionada pelo scroll do usuário:
 * - 0% scroll: bule vazio
 * - Conforme scroll: café "cai" na xícara
 * - 100% scroll: xícara cheia com espuma
 *
 * Performance:
 * - Usa requestAnimationFrame para suavidade
 * - transform3d + will-change para GPU acceleration
 * - Respeita prefers-reduced-motion para acessibilidade
 * - Graceful fallback sem JavaScript
 *
 * @returns {JSX.Element}
 */
function ScrollAnimatedCoffee() {
  const [pourProgress, setPourProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Detecta se usuário prefere redução de movimento (acessibilidade)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Monitora scroll e atualiza progresso de derramamento
  useEffect(() => {
    if (prefersReducedMotion) {
      // Se prefere redução de movimento, vai direto ao 100%
      setPourProgress(1);
      return;
    }

    const handleScroll = () => {
      // Cancela frame anterior se ainda pendente
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Schedule nova animação
      animationFrameRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;

        // Calcula quando o container entra na viewport e sai
        // Usa a posição relativa para calcular progresso
        const windowHeight = window.innerHeight;

        // Quando o topo do container atinge o topo da viewport = 0%
        // Quando o fundo do container atinge o fundo da viewport = 100%
        // Essa proporção determina o progresso do derramamento

        // Distância do topo da viewport até o topo do container
        const distanceFromTop = windowHeight - containerTop;

        // Total de pixels que o container pode "scroll through" (container height + viewport height)
        const totalScrollDistance = containerHeight + windowHeight;

        // Progresso normalizado (0 a 1)
        let progress = distanceFromTop / totalScrollDistance;

        // Limita entre 0 e 1
        progress = Math.max(0, Math.min(progress, 1));

        setPourProgress(progress);
      });
    };

    // Escuta eventos de scroll com throttle via requestAnimationFrame
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Calcula progresso inicial
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion]);

  // Se prefere redução de movimento, mostra espuma máxima
  const displayProgress = prefersReducedMotion ? 1 : pourProgress;

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.svgWrapper}>
        <CoffeeSVG pourProgress={displayProgress} />
      </div>

      {/* Fallback para quando JavaScript está desabilitado */}
      <noscript>
        <div className={styles.noScriptMessage}>
          <p>Ative JavaScript para ver a animação do café sendo derramado conforme você faz scroll.</p>
        </div>
      </noscript>
    </div>
  );
}

export default ScrollAnimatedCoffee;
