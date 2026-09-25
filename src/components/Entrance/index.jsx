import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSite } from '../../hooks/useSite.js';
import styles from './styles.module.css';

const MIN_MS = 1100;
const MAX_WAIT_MS = 3000;
const LEAVE_MS = 850;
const REVEAL_MS = 2600;

// Abertura exibida a cada carregamento da página. Enquanto roda, marca <html data-entrance>:
//  - "loading": cortina na tela, rolagem travada, header e carrossel escondidos;
//  - "reveal": a cortina sobe e header/carrossel/texto fazem a entrada (CSS de cada componente).
export default function Entrance() {
  const { config } = useSite();
  const [phase, setPhase] = useState('loading');
  const [progress, setProgress] = useState(0);
  const target = useRef(0);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('gone');
      return undefined;
    }
    root.dataset.entrance = 'loading';
    return () => {
      delete root.dataset.entrance;
    };
  }, []);

  // O contador anda sozinho até ~86% e só completa quando a página terminou de carregar.
  useEffect(() => {
    if (phase !== 'loading') return undefined;

    const start = performance.now();
    let value = 0;
    let frame;

    const finish = () => {
      target.current = 100;
    };
    target.current = 86;
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    const fallback = window.setTimeout(finish, MAX_WAIT_MS);

    const tick = (now) => {
      value += (target.current - value) * 0.07;
      if (target.current === 100 && value > 99.4) value = 100;
      setProgress(value);

      if (value === 100 && now - start >= MIN_MS) {
        setPhase('leaving');
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      window.removeEventListener('load', finish);
    };
  }, [phase]);

  // Os dois timers dependem só do início da saída; trocar de fase não pode cancelá-los.
  const timers = useRef([]);

  useEffect(() => {
    if (phase !== 'leaving') return;
    const root = document.documentElement;
    root.dataset.entrance = 'reveal';
    timers.current.push(
      window.setTimeout(() => setPhase('gone'), LEAVE_MS),
      window.setTimeout(() => delete root.dataset.entrance, REVEAL_MS),
    );
  }, [phase]);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  if (phase === 'gone') return null;

  const name = config.business.name;

  return (
    <div
      className={`${styles.entrance} ${phase === 'leaving' ? styles.leaving : ''}`}
      role="status"
      aria-label={`Carregando ${name}`}
      onClick={() => {
        target.current = 100;
      }}
    >
      <div className={styles.brand}>
        {config.branding.logo ? <img className={styles.logo} src={config.branding.logo} alt="" /> : null}
        <p className={styles.name} aria-hidden="true">
          {[...name].map((char, index) => (
            <span key={index} style={{ '--i': index }}>
              {char === ' ' ? '\u00a0' : char}
            </span>
          ))}
        </p>
        {config.business.description ? (
          <p className={styles.tagline}>{config.business.description}</p>
        ) : null}
      </div>

      <div className={styles.meter} aria-hidden="true">
        <span className={styles.count}>{Math.round(progress)}%</span>
        <span className={styles.line}>
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </span>
      </div>
    </div>
  );
}
