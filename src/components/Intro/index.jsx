import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSite } from '../../hooks/useSite.js';
import { Emphasis } from '../ui';
import styles from './styles.module.css';

const AUTOPLAY_MS = 2500;
const TURN_MS = 1000;
const DRAIN_MS = 1150;

// Órbita vista de cima: raio lateral em % da largura do card e altura do fundo em % da altura.
const ORBIT_X = 98;
const ORBIT_Y = 92;

const mod = (value, total) => ((value % total) + total) % total;
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Posição de um card no anel: ângulo 0 é a frente (nítido), 180° é o fundo (mais borrado).
function orbit(angle) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const near = (1 + cos) / 2;
  const scale = 0.5 + 0.5 * near;
  const x = sin * ORBIT_X;

  return {
    x,
    y: ((cos - 1) / 2) * ORBIT_Y,
    scale,
    blur: (1 - near) ** 0.8 * 14,
    dim: 0.3 + 0.7 * near,
    turn: sin * -18,
    z: Math.round(near * 100),
    pullX: -x / scale,
    delay: (1 - near) * 260,
  };
}

export default function Intro() {
  const { content } = useSite();
  const intro = content.intro;
  const slides = intro?.slides ?? [];
  const total = slides.length;

  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const rotation = useRef(0);

  // `turn` é cumulativo (nunca volta para 0), então o anel sempre gira pelo caminho curto.
  const [turn, setTurn] = useState(0);
  const [leaving, setLeaving] = useState(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [draining, setDraining] = useState(false);

  const active = total ? mod(-turn, total) : 0;

  const place = useCallback(
    (value) => {
      rotation.current = value;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const p = orbit(((index + value) / total) * Math.PI * 2);
        card.style.setProperty('--x', `${p.x}%`);
        card.style.setProperty('--y', `${p.y}%`);
        card.style.setProperty('--scale', p.scale);
        card.style.setProperty('--blur', `${p.blur}px`);
        card.style.setProperty('--dim', p.dim);
        card.style.setProperty('--turn', `${p.turn}deg`);
        card.style.setProperty('--pull-x', `${p.pullX}%`);
        card.style.setProperty('--delay', `${p.delay}ms`);
        card.style.zIndex = p.z;
      });
    },
    [total],
  );

  useLayoutEffect(() => {
    place(rotation.current);
  }, [place]);

  useEffect(() => {
    const from = rotation.current;
    if (from === turn) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduceMotion ? 0 : TURN_MS;
    const start = performance.now();
    let frame;

    const step = (now) => {
      const t = duration ? Math.min((now - start) / duration, 1) : 1;
      place(from + (turn - from) * easeInOut(t));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [place, turn]);

  const rotateBy = useCallback(
    (delta) => {
      if (!delta) return;
      setLeaving(active);
      setTurn((current) => current + delta);
    },
    [active],
  );

  const goTo = (index) => {
    let delta = mod(-index - turn, total);
    if (delta > total / 2) delta -= total;
    rotateBy(delta);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        // Ao voltar para o topo depois do "ralo", o carrossel reaparece intacto.
        if (!entry.isIntersecting) setDraining(false);
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Autoplay: a barra do indicador ativo enche em AUTOPLAY_MS e, ao terminar, o anel gira
  // (da esquerda para a direita). Pausar a barra pausa a troca, sem perder o tempo já corrido.
  const autoplay = total > 1 && !paused && visible && !draining;

  const handleDrain = () => {
    if (draining) return;
    const section = sectionRef.current;
    const target =
      (intro.cta?.target && document.querySelector(intro.cta.target)) || section?.nextElementSibling;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      target?.scrollIntoView({ behavior: 'auto' });
      return;
    }

    setDraining(true);
    // A página começa a descer enquanto as fotos ainda estão sendo sugadas.
    window.setTimeout(() => target?.scrollIntoView({ behavior: 'smooth' }), DRAIN_MS * 0.5);
  };

  // No mobile, arrastar para o lado gira o anel no mesmo sentido do dedo.
  const touchStart = useRef(null);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || draining) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    rotateBy(dx > 0 ? 1 : -1);
  };

  const handleKey = (event) => {
    if (event.key === 'ArrowRight') rotateBy(1);
    if (event.key === 'ArrowLeft') rotateBy(-1);
  };

  if (!intro || !total) return null;

  const current = slides[active];
  const previous = leaving !== null ? slides[leaving] : null;

  return (
    <section
      ref={sectionRef}
      className={`${styles.intro} ${draining ? styles.draining : ''}`}
      id="apresentacao"
      aria-label={intro.brand}
      aria-roledescription="carrossel"
    >
      <div className={styles.inner}>
        <div
          className={styles.stage}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={(event) => setPaused(event.target.matches(':focus-visible'))}
          onBlur={() => setPaused(false)}
          onKeyDown={handleKey}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.ring}>
            {slides.map((slide, index) => {
              const isActive = index === active;
              return (
                <button
                  key={slide.title}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  type="button"
                  className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                  onClick={() => goTo(index)}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${index + 1} de ${total}: ${slide.title}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className={styles.cardInner}>
                    <img src={slide.image} alt={slide.alt} draggable="false" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.copy}>
          {intro.eyebrow ? <p className={styles.eyebrow}>{intro.eyebrow}</p> : null}

          <div className={styles.textSlot} aria-live="polite">
            {previous ? (
              <div
                key={`out-${leaving}-${turn}`}
                className={`${styles.text} ${styles.textOut}`}
                aria-hidden="true"
                onAnimationEnd={() => setLeaving(null)}
              >
                <span className={styles.count}>{String(leaving + 1).padStart(2, '0')}</span>
                <h2><Emphasis>{previous.title}</Emphasis></h2>
                <p>{previous.text}</p>
              </div>
            ) : null}
            <div key={`in-${turn}`} className={`${styles.text} ${styles.textIn}`}>
              <span className={styles.count}>
                {String(active + 1).padStart(2, '0')}
                <small> / {String(total).padStart(2, '0')}</small>
              </span>
              <h2><Emphasis>{current.title}</Emphasis></h2>
              <p>{current.text}</p>
            </div>
          </div>

          <div className={styles.dots} role="tablist" aria-label="Escolher foto">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={slide.title}
                className={index === active ? styles.dotActive : ''}
                onClick={() => goTo(index)}
              >
                {index === active && total > 1 ? (
                  <span
                    key={turn}
                    className={styles.dotFill}
                    style={{
                      animationDuration: `${AUTOPLAY_MS}ms`,
                      animationPlayState: autoplay ? 'running' : 'paused',
                    }}
                    onAnimationEnd={() => rotateBy(1)}
                  />
                ) : null}
              </button>
            ))}
          </div>

          {intro.cta ? (
            <button type="button" className={styles.cta} onClick={handleDrain} disabled={draining}>
              {intro.cta.label}
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 4v14m0 0-6-6m6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
