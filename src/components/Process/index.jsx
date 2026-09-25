import { useCallback, useRef, useState } from 'react';
import { useSite } from '../../hooks/useSite.js';
import { useScrollProgress } from '../../hooks/useScrollProgress.js';
import styles from './styles.module.css';

export default function Process() {
  const { content } = useSite();
  const process = content.process;
  const steps = process?.steps ?? [];
  const total = steps.length;

  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  // A seção fica presa na tela; o scroll revela um painel por etapa (a revelação em si é CSS via --p).
  const handleProgress = useCallback(
    (progress) => {
      setActive(Math.min(total - 1, Math.floor(progress * (total - 1) + 0.5)));
    },
    [total],
  );

  useScrollProgress(sectionRef, handleProgress);

  if (!total) return null;

  const step = steps[active];

  return (
    <section
      ref={sectionRef}
      className={styles.process}
      id={process.id}
      style={{ '--n': total }}
      aria-label={process.label}
    >
      <div className={styles.sticky}>
        {steps.map((item, index) => (
          <div key={item.title} className={styles.panel} style={{ '--i': index }}>
            <img src={item.image} alt={item.alt} loading="lazy" />
          </div>
        ))}
        <div className={styles.shade} aria-hidden="true" />

        <ol className={styles.markers} aria-hidden="true">
          {steps.map((item, index) => (
            <li key={item.title} className={index === active ? styles.markerActive : ''} />
          ))}
        </ol>

        <div className={styles.caption}>
          {process.label ? <p className={styles.label}>{process.label}</p> : null}
          <div key={active} className={styles.captionBody} aria-live="polite">
            <span className={styles.count}>
              {String(active + 1).padStart(2, '0')} <small>/ {String(total).padStart(2, '0')}</small>
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </div>

        <p className={styles.sentence}>
          {steps.map((item, index) => (
            <span key={item.title} className={index === active ? styles.wordActive : styles.word}>
              <em>{item.lead}</em> {item.word}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
