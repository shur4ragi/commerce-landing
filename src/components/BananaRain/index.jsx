import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSite } from '../../hooks/useSite.js';
import { Button, Emphasis } from '../ui';
import styles from './styles.module.css';

// Linha do tempo da abertura (ms desde a montagem).
const FADE_AT = 1900; // as letras começam a sumir
const OPEN_AT = 2500; // a vinheta abre
const READY_AT = 4500; // mensagem no lugar; a partir daqui só a chuva segue nas pilastras
const HEADER_REVEAL_MS = 2600;

// Banana do logo (viewBox 80×80), centralizada em (45, 40).
const BANANA_SHADE = 'M44.6 17.5c7.4 5.8 10.6 15.2 9.2 25.2-1.4 9.7-8.3 17.4-17.2 19.9-1.6.4-2.2-1.4-.9-2.2 6.4-4.3 10.5-11 11.6-18.7 1.1-7.6-.4-15.3-4.8-21.6-.8-1.2.9-3.5 2.1-2.6z';
const BANANA_LIGHT = 'M42.3 20c4.2 6.1 5.7 13.8 4.6 21.4-1.1 7.7-5.2 14.4-11.6 18.7-.8.5-.6 1.5.2 1.6-3.4.4-3.4-1.7-2.3-2.6 4.7-4.4 7.5-10.4 8.1-17.2.6-6.9-.4-14-3.6-20 .9-.7 3.5-2.8 4.6-1.9z';
const BANANA_STEM = 'M42.4 11.8c1.3-.6 3 .1 3.2 1.5l.7 5.3c-1 .6-2.7.7-3.7.2l-1.7-5c-.3-.8.4-1.7 1.5-2z';

function BananaGlyph() {
  return (
    <svg viewBox="30 8 30 58" aria-hidden="true">
      <path d={BANANA_SHADE} fill="#F5A51C" />
      <path d={BANANA_LIGHT} fill="#FDD511" />
      <path d={BANANA_STEM} fill="#5A2A0B" />
      <circle cx="35.6" cy="61.2" r="1.9" fill="#5A2A0B" />
    </svg>
  );
}

// Largura de cada pilastra lateral, em px, a partir da largura da tela.
function pillarWidth(width) {
  if (width < 640) return Math.max(30, Math.round(width * 0.09));
  return Math.min(170, Math.max(56, Math.round(width * 0.1)));
}

function startRain(canvas, section, { reduced, openedRef }) {
  const ctx = canvas.getContext('2d');
  const paths = [
    [new Path2D(BANANA_SHADE), '#F5A51C'],
    [new Path2D(BANANA_LIGHT), '#FDD511'],
    [new Path2D(BANANA_STEM), '#5A2A0B'],
  ];
  const tip = new Path2D();
  tip.arc(35.6, 61.2, 1.9, 0, Math.PI * 2);

  let width = 0;
  let height = 0;
  let pillar = 0;
  let bananas = [];
  let frame = 0;
  let last = 0;
  let visible = true;

  const spawnX = (size) => {
    if (!openedRef.current) return Math.random() * width;
    const side = Math.random() < 0.5;
    const x = size * 0.25 + Math.random() * Math.max(pillar - size * 0.5, 1);
    return side ? x : width - x;
  };

  const make = (initial) => {
    const small = width < 640;
    let size = (small ? 30 : 46) + Math.random() * (small ? 26 : 56);
    if (openedRef.current) size = Math.min(size, pillar * 0.8);
    return {
      size,
      x: spawnX(size),
      // Na montagem as bananas começam acima da tela, e a chuva "começa" de verdade.
      y: initial ? -Math.random() * height * 1.1 - size : -size * 1.5,
      vy: (small ? 110 : 140) + size * (small ? 2.6 : 3) + Math.random() * 70,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 1.8,
      sway: Math.random() * Math.PI * 2,
      alpha: Math.min(1, 0.7 + (size / 100) * 0.3),
    };
  };

  const resize = () => {
    const rect = section.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    pillar = pillarWidth(width);
    section.style.setProperty('--pillar', `${pillar}px`);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(width < 640 ? 42 : 80, Math.round((width * height) / (width < 640 ? 7000 : 15000)));
    bananas = Array.from({ length: count }, () => make(true));
    if (reduced) {
      bananas.forEach((banana) => {
        banana.y = Math.random() * height;
        banana.x = spawnX(banana.size);
      });
      draw(0);
    }
  };

  const drawBanana = (banana) => {
    const scale = banana.size / 52;
    ctx.save();
    ctx.globalAlpha = banana.alpha;
    ctx.translate(banana.x + Math.sin(banana.sway) * 6, banana.y);
    ctx.rotate(banana.rot);
    ctx.scale(scale, scale);
    ctx.translate(-45, -38);
    paths.forEach(([path, color]) => {
      ctx.fillStyle = color;
      ctx.fill(path);
    });
    ctx.fill(tip);
    ctx.restore();
  };

  function draw(dt) {
    ctx.clearRect(0, 0, width, height);
    bananas.forEach((banana) => {
      banana.y += banana.vy * dt;
      banana.rot += banana.vr * dt;
      banana.sway += dt * 1.6;
      if (banana.y > height + banana.size) Object.assign(banana, make(false));
      drawBanana(banana);
    });
  }

  const tick = (now) => {
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    draw(dt);
    frame = visible ? requestAnimationFrame(tick) : 0;
  };

  resize();
  window.addEventListener('resize', resize);

  // Pausa a chuva quando a abertura sai da tela.
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !frame && !reduced) {
      last = 0;
      frame = requestAnimationFrame(tick);
    }
  });
  observer.observe(section);
  if (!reduced) frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener('resize', resize);
  };
}

// Abertura em vinheta: chuva de bananas com a marca no meio; as letras somem, o centro abre
// num painel pastel com a mensagem, e a chuva continua em duas pilastras laterais.
export default function BananaRain() {
  const { content } = useSite();
  const rain = content.rain;
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const openedRef = useRef(false);
  const [phase, setPhase] = useState('word');

  const skip = () => {
    if (phase === 'word' || phase === 'fade') setPhase('open');
  };

  // Enquanto a palavra está na tela, o header fica escondido e a rolagem travada
  // (mesmo contrato do componente Entrance: <html data-entrance>).
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      openedRef.current = true;
      setPhase('ready');
      return undefined;
    }
    root.dataset.entrance = 'loading';
    return () => {
      delete root.dataset.entrance;
    };
  }, []);

  useEffect(() => {
    if (phase === 'ready') return undefined;
    const timers = [];
    if (phase === 'word') timers.push(window.setTimeout(() => setPhase('fade'), FADE_AT));
    if (phase === 'word' || phase === 'fade') {
      timers.push(window.setTimeout(() => setPhase('open'), phase === 'word' ? OPEN_AT : OPEN_AT - FADE_AT));
    }
    if (phase === 'open') {
      openedRef.current = true;
      const root = document.documentElement;
      root.dataset.entrance = 'reveal';
      timers.push(
        window.setTimeout(() => setPhase('ready'), READY_AT - OPEN_AT),
        window.setTimeout(() => delete root.dataset.entrance, HEADER_REVEAL_MS),
      );
    }
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [phase]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return startRain(canvasRef.current, sectionRef.current, { reduced, openedRef });
  }, []);

  if (!rain) return null;

  const letters = [...(rain.word || '')];

  return (
    <section
      ref={sectionRef}
      id={rain.id || 'apresentacao'}
      className={styles.rain}
      data-phase={phase}
      style={{ '--panel': rain.panelColor, '--word-font': rain.wordFont }}
      onClick={skip}
      aria-label={rain.ariaLabel}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <p className={styles.word} aria-hidden="true">
        {letters.map((char, index) => (
          <span key={index} className={styles.letter} style={{ '--i': index }}>
            {index === rain.bananaIndex ? <BananaGlyph /> : char}
          </span>
        ))}
      </p>

      <div className={styles.panel}>
        <div className={styles.copy}>
          {rain.logo ? <img className={styles.logo} src={rain.logo} alt={rain.logoAlt || ''} /> : null}
          {rain.eyebrow ? <p className={styles.eyebrow}>{rain.eyebrow}</p> : null}
          <h1 className={styles.title}>
            <Emphasis>{rain.title}</Emphasis>
          </h1>
          {rain.text ? <p className={styles.text}>{rain.text}</p> : null}
          <div className={styles.actions}>
            {rain.primaryCta ? <Button href={rain.primaryCta.href}>{rain.primaryCta.label}</Button> : null}
            {rain.secondaryCta ? (
              <Button href={rain.secondaryCta.href} variant="ghost">
                {rain.secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
