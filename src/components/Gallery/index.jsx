import { useSite } from '../../hooks/useSite.js';
import { Reveal, Section } from '../ui';
import styles from './styles.module.css';

export default function Gallery() {
  const { content } = useSite();
  const gallery = content.gallery;

  return (
    <Section id={gallery.id} eyebrow={gallery.eyebrow} title={gallery.title}>
      <Reveal>
        <div className={styles.grid}>
          {gallery.items.map((item) => (
            <figure key={item.title} className={styles.item}>
              <img src={item.image} alt={item.alt || item.title} loading="lazy" />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
