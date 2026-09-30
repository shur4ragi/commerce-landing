import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

// Altura do desenho das gotas no SVG (viewBox); na tela ele é esticado conforme escorre.
const DRIP_VIEW_H = 240;
const BAND = 18; // faixa contínua no topo da borda, antes das gotas
const FALL_MS = 2400; // duração da queda da cobertura
const START_AT = 0.6; // começa quando o topo da seção passa de 60% da altura da tela

// Gerador pseudoaleatório fixo: as gotas saem sempre iguais para a mesma largura.
function seeded(seed) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

// Borda de calda derretendo: faixa no topo e gotas com pescoço fino e ponta arredondada.
function dripPath(width) {
  const random = seeded(Math.round(width) || 1);
  const drips = [];
  let x = 10 + random() * 30;
  while (x < width - 30) {
    const w = 30 + random() * 52;
    const length = 50 + random() * (DRIP_VIEW_H - BAND - 60);
    drips.push({ c: x + w / 2, w, length });
    x += w + 16 + random() * 70;
  }

  const b = BAND;
  let d = `M0 0H${width}V${b}`;
  // Percorre a borda da direita para a esquerda.
  let cursor = width;
  [...drips].reverse().forEach(({ c, w, length }) => {
    const x0 = c - w / 2;
    const x1 = c + w / 2;
    const r = w * 0.32;
    const n = w * 0.2;
    const cy = b + length - r;
    const wave = b + 2 + random() * 5;
    d += `Q${(cursor + x1) / 2} ${wave} ${x1} ${b}`;
    d += `C${x1 - w * 0.22} ${b} ${c + n} ${b + length * 0.15} ${c + n} ${b + length * 0.45}`;
    d += `C${c + n} ${b + length * 0.6} ${c + r} ${cy - r * 0.8} ${c + r} ${cy}`;
    d += `A${r} ${r} 0 0 1 ${c - r} ${cy}`;
    d += `C${c - r} ${cy - r * 0.8} ${c - n} ${b + length * 0.6} ${c - n} ${b + length * 0.45}`;
    d += `C${c - n} ${b + length * 0.15} ${x0 + w * 0.22} ${b} ${x0} ${b}`;
    cursor = x0;
  });
  d += `Q${cursor / 2} ${b + 4} 0 ${b}Z`;
  return d;
}

function dripUrl(width) {
  const w = Math.max(320, Math.round(width));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${DRIP_VIEW_H}" preserveAspectRatio="none"><path d="${dripPath(w)}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// Transição de "cobertura derretendo": quando a seção entra na tela, ela aparece de cima para baixo
// com uma borda de gotas que se alongam; uma camada caramelo acompanha a borda por baixo.
// Revela uma vez só: depois de aberta, a seção fica sem máscara.
export default function DripReveal({ children }) {
  const rootRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setRevealed(true);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || revealed) return undefined;

    let frame = 0;
    let loop = 0;
    let progress = 0;
    let startedAt = 0;
    let width = 0;

    const apply = (rect) => {
      if (progress >= 1) {
        setRevealed(true);
        return;
      }
      // Gotas curtas no começo, que se alongam enquanto a cobertura escorre.
      const dripH = 70 + progress * 190;
      const fill = progress * (rect.height + dripH) - dripH;
      root.style.setProperty('--fill', `${fill}px`);
      root.style.setProperty('--fill-solid', `${Math.max(0, fill)}px`);
      root.style.setProperty('--drip-h', `${dripH}px`);
    };

    // A queda roda no tempo (FALL_MS) assim que o topo da seção entra na tela; a rolagem
    // só adianta, para ninguém que rola rápido ficar olhando para o cardápio escondido.
    const update = (now = performance.now()) => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.width !== width) {
        width = rect.width;
        root.style.setProperty('--drip-url', dripUrl(width));
      }
      if (!startedAt && rect.top < vh * START_AT) startedAt = now;
      const t = startedAt ? Math.min(1, (now - startedAt) / FALL_MS) : 0;
      const byTime = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const byScroll = Math.min(1, Math.max(0, (vh * 0.35 - rect.top) / (vh * 0.6)));
      progress = Math.max(progress, byTime, byScroll);
      apply(rect);
      if (startedAt && progress < 1 && !loop) {
        loop = requestAnimationFrame((time) => {
          loop = 0;
          update(time);
        });
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(loop);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [revealed]);

  return (
    <div ref={rootRef} className={`${styles.drip} ${revealed ? styles.revealed : ''}`}>
      <div className={styles.rim} aria-hidden="true" />
      <div className={styles.front}>{children}</div>
    </div>
  );
}

DripReveal.propTypes = {
  children: PropTypes.node,
};
