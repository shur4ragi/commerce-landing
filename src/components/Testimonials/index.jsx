import { useSite } from '../../hooks/useSite.js';
import { Reveal, Section } from '../ui';
import styles from './styles.module.css';

// Estrelas com preenchimento proporcional (4,6 = 92% das cinco estrelas).
function Stars({ value = 5 }) {
  const rating = Math.min(Math.max(Number(String(value).replace(',', '.')) || 0, 0), 5);
  return (
    <span className={styles.stars} role="img" aria-label={`${value} de 5 estrelas`}>
      <span className={styles.starsOff} aria-hidden="true">★★★★★</span>
      <span className={styles.starsOn} aria-hidden="true" style={{ width: `${(rating / 5) * 100}%` }}>
        ★★★★★
      </span>
    </span>
  );
}

export default function Testimonials() {
  const { content } = useSite();
  const testimonials = content.testimonials;
  const rating = testimonials.rating;

  return (
    <Section
      id={testimonials.id}
      eyebrow={testimonials.eyebrow}
      title={testimonials.title}
    >
      <Reveal>
        <div className={styles.grid}>
          {/* Nota geral da plataforma de avaliações (ex.: Google), quando o cliente tiver. */}
          {rating ? (
            <div className={`${styles.card} ${styles.ratingCard}`}>
              <span className={styles.ratingValue}>{rating.value}</span>
              <Stars value={rating.value} />
              <p className={styles.ratingCount}>{rating.count}</p>
              {rating.href ? (
                <a className={styles.ratingLink} href={rating.href} target="_blank" rel="noreferrer noopener">
                  {rating.linkLabel || `Ver no ${rating.source || 'Google'}`}
                </a>
              ) : null}
            </div>
          ) : null}

          {testimonials.items.map((item, index) => (
            <blockquote key={`${item.name || 'avaliacao'}-${index}`} className={styles.card}>
              {item.stars ? <Stars value={item.stars} /> : null}
              <p>“{item.quote}”</p>
              <footer>
                <strong>{item.name || 'Avaliação no Google'}</strong>
                {item.role ? <span>{item.role}</span> : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
