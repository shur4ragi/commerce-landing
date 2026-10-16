import { useEffect, useRef } from 'react';
import { useSite } from '../../hooks/useSite.js';
import { Reveal, Section } from '../ui';
import styles from './styles.module.css';

// Colagem de fotos presas com fita: entram girando quando aparecem e se endireitam no hover.
function Collage({ items }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.in = '';
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.collage}>
      {items.slice(0, 3).map((item, index) => (
        <figure key={item.caption || index} className={`${styles.photo} ${styles[`photo${index}`]}`}>
          <img src={item.image} alt={item.alt} loading="lazy" />
          {item.caption ? <figcaption>{item.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

export default function About() {
  const { content } = useSite();
  const about = content.about;
  // factsStyle 'slice': os destaques viram mini fatias de banoffee (chantilly, banana, doce de leite e base).
  const slice = about.factsStyle === 'slice';
  const collage = about.collage?.length ? about.collage : null;

  return (
    <Section id={about.id} eyebrow={about.eyebrow} title={about.title} tone="accent">
      <div className={`${styles.grid} ${collage ? styles.gridCollage : ''}`}>
        <Reveal>
          <p className={styles.text}>{about.text}</p>
          <ul className={`${styles.facts} ${slice ? styles.slices : ''}`}>
            {about.facts.map((item) => (
              <li key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                {slice ? <i className={styles.layers} aria-hidden="true" /> : null}
              </li>
            ))}
          </ul>
        </Reveal>
        {collage ? <Collage items={collage} /> : null}
        {!collage && about.image && (
          <Reveal>
            <img src={about.image} alt={about.imageAlt} loading="lazy" />
          </Reveal>
        )}
      </div>
    </Section>
  );
}
