import { useEffect, useRef, useState } from 'react';
import { useSite } from '../../hooks/useSite.js';
import { Button, Emphasis } from '../ui';
import styles from './styles.module.css';

const COLUMNS = 6;
const PER_COLUMN = 10;
// Duração de uma volta por coluna (s): velocidades diferentes evitam que as colunas andem "em bloco".
const DURATIONS = [58, 46, 64, 50, 60, 44];
const CTA_STYLES = ['cover', 'banoffee'];

function buildColumns(images) {
  if (!images.length) return [];
  return Array.from({ length: COLUMNS }, (_, column) =>
    Array.from({ length: PER_COLUMN }, (_, row) => images[(column * 3 + row) % images.length]),
  );
}

export default function Statement() {
  const { content } = useSite();
  const statement = content.statement;
  const stageRef = useRef(null);
  const [running, setRunning] = useState(false);

  // As cascatas só se movem enquanto a seção está na tela.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  if (!statement) return null;

  const columns = buildColumns(statement.images ?? []);

  return (
    <section className={styles.statement} id={statement.id} aria-labelledby={`${statement.id}-title`}>
      <div ref={stageRef} className={`${styles.stage} ${running ? styles.running : ''}`}>
        <div className={styles.columns} aria-hidden="true">
          {columns.map((images, column) => (
            <div
              key={column}
              className={`${styles.column} ${column % 2 ? styles.down : ''}`}
              style={{ '--duration': `${DURATIONS[column % DURATIONS.length]}s` }}
            >
              {/* A lista vai duplicada: ao chegar na metade, a animação recomeça sem emenda visível. */}
              <div className={styles.track}>
                {[...images, ...images].map((image, index) => (
                  <img key={index} src={image} alt="" loading="lazy" draggable="false" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.fade} aria-hidden="true" />

        {/* Título e texto de apoio juntos, no centro da tela, com as cascatas passando por trás. */}
        <div className={styles.content}>
          <h2 id={`${statement.id}-title`} className={styles.title}>
            <Emphasis>{statement.title}</Emphasis>
          </h2>

          <div className={styles.body}>
            {statement.eyebrow ? <p className={styles.eyebrow}>{statement.eyebrow}</p> : null}
            {statement.lead ? <p className={styles.lead}>{statement.lead}</p> : null}
            {statement.text ? <p className={styles.text}>{statement.text}</p> : null}
            {statement.cta ? (
              <Button
                href={statement.cta.href}
                variant="ghost"
                // style: 'cover' (cobertura no hover) ou 'banoffee' (cobertura + fatia em camadas).
                className={CTA_STYLES.includes(statement.cta.style) ? styles[statement.cta.style] : ''}
              >
                {statement.cta.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
