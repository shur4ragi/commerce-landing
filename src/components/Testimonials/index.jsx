import { usePendingAction } from '../../hooks/usePendingAction.js';
import { useSite } from '../../hooks/useSite.js';
import { ActionSkeleton, Reveal, Section } from '../ui';
import styles from './styles.module.css';
import { openExternal } from '../../utils/openExternal.js';

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
  const topics = testimonials.topics;
  const items = testimonials.items || [];
  const topCount = Math.max(1, ...(topics?.items || []).map((topic) => topic.count));
  const outbound = usePendingAction();

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
                <a
                  className={styles.ratingLink}
                  href={rating.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(event) => {
                    event.preventDefault();
                    outbound.run(`Abrindo as avaliações no ${rating.source || 'Google'}`, () => {
                      openExternal(rating.href);
                    });
                  }}
                >
                  {rating.linkLabel || `Ver no ${rating.source || 'Google'}`}
                </a>
              ) : null}
            </div>
          ) : null}

          {/* Temas mais citados nas avaliações (os marcadores do Google), com o número de menções. */}
          {topics?.items?.length ? (
            <div className={`${styles.card} ${styles.topicsCard}`}>
              <p className={styles.topicsTitle}>{topics.title || 'O que mais aparece nas avaliações'}</p>
              <ul className={styles.topics}>
                {topics.items.map((topic) => (
                  <li key={topic.label}>
                    <span className={styles.topicLabel}>{topic.label}</span>
                    <span className={styles.topicBar} aria-hidden="true">
                      <span style={{ width: `${(topic.count / topCount) * 100}%` }} />
                    </span>
                    <span className={styles.topicCount}>
                      {topic.count} {topic.count === 1 ? 'menção' : 'menções'}
                    </span>
                  </li>
                ))}
              </ul>
              {topics.note ? <p className={styles.topicsNote}>{topics.note}</p> : null}
            </div>
          ) : null}

          {items.map((item, index) => (
            <blockquote
              key={`${item.name || 'avaliacao'}-${index}`}
              // Nota + temas ocupam a primeira linha; com dois comentários, o último alarga para fechar a grade.
              className={`${styles.card} ${topics && items.length === 2 && index === 1 ? styles.wide : ''}`}
            >
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
      {outbound.pending ? <ActionSkeleton variant="google" scope="screen" label={outbound.label} /> : null}
    </Section>
  );
}
