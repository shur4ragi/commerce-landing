import { useSite } from '../../hooks/useSite.js';
import { Reveal, Section } from '../ui';
import styles from './styles.module.css';

export default function About() {
  const { content } = useSite();
  const about = content.about;
  // factsStyle 'slice': os destaques viram mini fatias de banoffee (chantilly, banana, doce de leite e base).
  const slice = about.factsStyle === 'slice';

  return (
    <Section id={about.id} eyebrow={about.eyebrow} title={about.title} tone="accent">
      <div className={styles.grid}>
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
        {about.image && (
          <Reveal>
            <img src={about.image} alt={about.imageAlt} loading="lazy" />
          </Reveal>
        )}
      </div>
    </Section>
  );
}
