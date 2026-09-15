import { useSite } from '../../hooks/useSite.js';
import { Reveal, Section } from '../ui';
import styles from './styles.module.css';

export default function Highlights() {
  const { content } = useSite();
  const highlights = content.highlights;

  return (
    <Section
      id={highlights.id}
      eyebrow={highlights.eyebrow}
      title={highlights.title}
      tone="inverse"
    >
      <Reveal>
        <ol className={styles.list}>
          {highlights.items.map((item, index) => (
            <li key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
