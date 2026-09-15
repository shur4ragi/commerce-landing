import { useSite } from '../../hooks/useSite.js';
import { Reveal, Section } from '../ui';
import styles from './styles.module.css';

export default function Testimonials() {
  const { content } = useSite();
  const testimonials = content.testimonials;

  return (
    <Section
      id={testimonials.id}
      eyebrow={testimonials.eyebrow}
      title={testimonials.title}
    >
      <Reveal>
        <div className={styles.grid}>
          {testimonials.items.map((item) => (
            <blockquote key={item.name} className={styles.card}>
              <p>“{item.quote}”</p>
              <footer>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
