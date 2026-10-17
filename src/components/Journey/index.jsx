import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSite } from '../../hooks/useSite.js';
import { useScrollProgress } from '../../hooks/useScrollProgress.js';
import { lockScroll } from '../../utils/scrollLock.js';
import { CoffeeBean, Emphasis } from '../ui';
import styles from './styles.module.css';

// Estrada no viewBox 1200×240: o saquinho percorre o traço conforme a rolagem. Os cartões
// ficam fora desse quadro (em cima ou embaixo), ligados à parada por um pontilhado.
const ROAD = 'M30 170C170 50 300 45 380 115S560 225 690 140 870 30 990 100 1110 190 1170 130';
const VIEW_W = 1200;
const VIEW_H = 240;
// Onde cada etapa fica na estrada (fração do comprimento).
const STOPS = [0.07, 0.36, 0.65, 0.95];

const clamp01 = (value) => Math.min(Math.max(value, 0), 1);

const ICONS = {
  phone: (
    <path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 15h2M9 7h6M9 10.5h4" />
  ),
  oven: (
    <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Zm0 4h16M7 6h.01M10 6h.01M8 13h8v4H8Z" />
  ),
  bag: <path d="M6 8h12l-1 12H7Zm3 0V6a3 3 0 0 1 6 0v2m-6 4h.01M15 12h.01" />,
  home: <path d="M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-5h4v5" />,
};

function StepIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {ICONS[name] ?? ICONS.bag}
      </g>
    </svg>
  );
}

// Saquinho kraft com o selo da casa (o "entregador" da estrada).
function Bag() {
  return (
    <svg viewBox="0 0 64 72" aria-hidden="true" focusable="false">
      <path d="M10 18h44l-3 50H13Z" fill="#C8955F" />
      <path d="M10 18h44l-1 8H11Z" fill="#B07C48" />
      <path d="M22 18v-5a10 10 0 0 1 20 0v5" fill="none" stroke="#5A2E18" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="44" r="11" fill="#FBF5EC" stroke="#B5412F" strokeWidth="3" />
      <path d="M27 44c3 4 7 4 10 0" fill="none" stroke="#5A2E18" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export default function Journey() {
  const { content } = useSite();
  const journey = content.journey;
  const steps = journey?.steps ?? [];

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const pathRef = useRef(null);
  const travelerRef = useRef(null);
  const geometry = useRef({ length: 0 });
  const [stops, setStops] = useState([]);
  const [reached, setReached] = useState(0);
  const [done, setDone] = useState(false);
  // Cartão ampliado na frente da tela (-1 = nenhum).
  const [zoom, setZoom] = useState(-1);
  const closeRef = useRef(null);
  const lastCard = useRef(null);

  // Mede a estrada uma vez: posição de cada parada em % do quadro.
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    geometry.current.length = length;
    setStops(
      STOPS.slice(0, steps.length).map((fraction) => {
        const point = path.getPointAtLength(fraction * length);
        return { x: (point.x / VIEW_W) * 100, y: (point.y / VIEW_H) * 100 };
      }),
    );
  }, [steps.length]);

  const handleProgress = useCallback(
    (p) => {
      const path = pathRef.current;
      const traveler = travelerRef.current;
      const stage = stageRef.current;
      const { length } = geometry.current;
      if (!path || !traveler || !stage || !length) return;

      const drawn = clamp01((p - 0.04) / 0.86);
      const at = drawn * length;
      const point = path.getPointAtLength(at);
      const ahead = path.getPointAtLength(Math.min(at + 4, length));
      const angle = (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI;

      stage.style.setProperty('--drawn', drawn.toFixed(4));
      stage.style.setProperty('--p', p.toFixed(4));
      traveler.style.left = `${(point.x / VIEW_W) * 100}%`;
      traveler.style.top = `${(point.y / VIEW_H) * 100}%`;
      traveler.style.setProperty('--tilt', `${Math.max(Math.min(angle, 28), -28) * 0.6}deg`);

      setReached(STOPS.slice(0, steps.length).filter((stop) => drawn >= stop - 0.015).length);
      setDone(drawn >= 0.99);
    },
    [steps.length],
  );

  useScrollProgress(sectionRef, handleProgress);

  // Se a seção já saiu (ou ainda não chegou) da tela, primeiro rola de volta até a etapa clicada,
  // com o palco preso, e só então abre o cartão. Evita o cartão aparecer cortado fora da seção.
  const zoomTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(zoomTimer.current), []);

  const openZoom = (index) => {
    const section = sectionRef.current;
    if (!section) return;
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 0;
    const rect = section.getBoundingClientRect();
    const pinned = rect.top <= header + 2 && rect.bottom >= window.innerHeight - 2;
    if (pinned) {
      setZoom(index);
      return;
    }
    const distance = section.offsetHeight - (window.innerHeight - header);
    const progress = Math.min(0.04 + (STOPS[index] ?? 1) * 0.86 + 0.01, 1);
    const top = rect.top + window.scrollY - header + Math.max(distance, 0) * progress;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    window.clearTimeout(zoomTimer.current);
    zoomTimer.current = window.setTimeout(() => setZoom(index), reduce ? 0 : 650);
  };

  useEffect(() => {
    if (zoom < 0) {
      lastCard.current?.focus?.();
      return undefined;
    }
    closeRef.current?.focus();
    const unlock = lockScroll();
    const total = steps.length;
    const onKey = (event) => {
      if (event.key === 'Escape') setZoom(-1);
      if (event.key === 'ArrowRight') setZoom((index) => (index + 1) % total);
      if (event.key === 'ArrowLeft') setZoom((index) => (index - 1 + total) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      unlock();
      window.removeEventListener('keydown', onKey);
    };
  }, [zoom, steps.length]);

  if (!journey || !steps.length) return null;

  const active = Math.max(reached - 1, 0);

  return (
    <section
      ref={sectionRef}
      className={styles.journey}
      id={journey.id}
      data-own-height=""
      aria-labelledby={`${journey.id}-title`}
    >
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.stains} aria-hidden="true" />
        <CoffeeBean className={`${styles.deco} ${styles.decoA}`} />
        <CoffeeBean className={`${styles.deco} ${styles.decoB}`} tone="light" />

        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{journey.eyebrow}</p>
            <h2 id={`${journey.id}-title`}>
              <Emphasis>{journey.title}</Emphasis>
            </h2>
          </div>
          <p className={styles.counter} aria-hidden="true">
            <span key={active}>{String(active + 1).padStart(2, '0')}</span>
            <small>/ {String(steps.length).padStart(2, '0')}</small>
          </p>
        </header>

        <div className={styles.map}>
          <svg className={styles.road} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-hidden="true">
            <path className={styles.roadBase} d={ROAD} />
            <path className={styles.roadDash} d={ROAD} />
            <path ref={pathRef} className={styles.roadDone} d={ROAD} pathLength="1" />
          </svg>

          {stops.map((stop, index) => (
            <span
              key={`tick-${index}`}
              className={`${styles.tick} ${index % 2 ? styles.tickDown : styles.tickUp} ${index < reached ? styles.tickOn : ''}`}
              style={{ left: `${stop.x}%`, '--y': `${stop.y}%` }}
              aria-hidden="true"
            />
          ))}

          {stops.map((stop, index) => (
            <span
              key={index}
              className={`${styles.node} ${index < reached ? styles.nodeOn : ''}`}
              style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
              aria-hidden="true"
            >
              <StepIcon name={steps[index].icon} />
            </span>
          ))}

          <span ref={travelerRef} className={styles.traveler} aria-hidden="true">
            <span className={styles.travelerBody}>
              <Bag />
            </span>
            <span className={styles.puff} />
          </span>

          <ol className={styles.cards}>
            {steps.map((step, index) => {
              const stop = stops[index];
              const shown = index < reached;
              return (
                <li
                  key={step.title}
                  className={`${styles.card} ${index % 2 ? styles.cardBelow : styles.cardAbove} ${
                    shown ? styles.cardOn : ''
                  } ${index === active ? styles.cardActive : ''}`}
                  style={stop ? { '--x': `${stop.x}%`, '--y': `${stop.y}%` } : undefined}
                  aria-hidden={!shown}
                >
                  <button
                    type="button"
                    className={styles.cardButton}
                    tabIndex={shown ? 0 : -1}
                    onClick={(event) => {
                      lastCard.current = event.currentTarget;
                      openZoom(index);
                    }}
                    aria-label={`Ampliar etapa ${index + 1}: ${step.title}`}
                  >
                    <img src={step.image} alt={step.alt} loading="lazy" />
                    <span className={styles.cardCopy}>
                      <span className={styles.step}>{String(index + 1).padStart(2, '0')}</span>
                      <strong className={styles.cardTitle}>{step.title}</strong>
                      <span className={styles.cardText}>{step.text}</span>
                    </span>
                    <i className={`fa-solid fa-expand ${styles.expand}`} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ol>

          {stops.length ? (
            <span
              className={`${styles.stamp} ${done ? styles.stampOn : ''}`}
              style={{ left: `${stops[stops.length - 1].x}%`, top: `${stops[stops.length - 1].y}%` }}
              aria-hidden={!done}
            >
              {journey.done}
            </span>
          ) : null}
        </div>

        {zoom >= 0 && typeof document !== 'undefined'
          ? createPortal(
              <div
                className={styles.zoom}
                role="dialog"
                aria-modal="true"
                aria-label={steps[zoom].title}
                onClick={() => setZoom(-1)}
              >
                <article key={zoom} className={styles.zoomCard} onClick={(event) => event.stopPropagation()}>
                  <img src={steps[zoom].image} alt={steps[zoom].alt} />
                  <div className={styles.zoomCopy}>
                    <span className={styles.zoomStep}>
                      {String(zoom + 1).padStart(2, '0')} <small>/ {String(steps.length).padStart(2, '0')}</small>
                    </span>
                    <h3>{steps[zoom].title}</h3>
                    <p>{steps[zoom].text}</p>
                    <div className={styles.zoomNav}>
                      <button type="button" onClick={() => setZoom((zoom - 1 + steps.length) % steps.length)} aria-label="Etapa anterior">
                        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
                      </button>
                      <button type="button" onClick={() => setZoom((zoom + 1) % steps.length)} aria-label="Próxima etapa">
                        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <button ref={closeRef} type="button" className={styles.zoomClose} onClick={() => setZoom(-1)} aria-label="Fechar">
                    <i className="fa-solid fa-xmark" aria-hidden="true" />
                  </button>
                </article>
              </div>,
              document.body,
            )
          : null}

        <p className={styles.hint} aria-hidden="true">
          {journey.hint}
          <span />
        </p>
      </div>
    </section>
  );
}
