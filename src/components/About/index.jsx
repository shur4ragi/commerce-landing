import { useSite } from '../../hooks/useSite.js';
import { Reveal, Section } from '../ui';
import styles from './styles.module.css';

export default function About() {
  const { content } = useSite();
  const about = content.about;

  return (
    <Section id={about.id} eyebrow={about.eyebrow} title={about.title} tone="accent">
      <div className={styles.grid}>
        <Reveal>
          <p className={styles.text}>{about.text}</p>
          <ul className={styles.facts}>
            {about.facts.map((item) => (
              <li key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
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
