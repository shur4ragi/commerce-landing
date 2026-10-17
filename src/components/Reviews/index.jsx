import { useEffect, useRef } from 'react';
import { usePendingAction } from '../../hooks/usePendingAction.js';
import { useSite } from '../../hooks/useSite.js';
import { openExternal } from '../../utils/openExternal.js';
import { ActionSkeleton, Emphasis } from '../ui';
import styles from './styles.module.css';

// "Motivos para voltar" + avaliações do Google numa seção só: à esquerda os motivos e o
// minicard do perfil no Google (nota, estrelas, total e botão); à direita os comentários.
const AVATAR_COLORS = ['#B5412F', '#5A3B2C', '#B8692F', '#4E7A3A'];

function GoogleLogo({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.8 6.1C12.4 13.6 17.7 9.5 24 9.5Z" />
      <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.4c-.5 2.9-2.2 5.3-4.6 7l7.5 5.8c4.4-4.1 6.8-10 6.8-17.2Z" />
      <path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.7-3-.7-4.6s.3-3.2.7-4.6l-7.8-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.8-6.1Z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.8 6.1C6.6 42.6 14.6 48 24 48Z" />
    </svg>
  );
}

// Estrelas com preenchimento proporcional (4,6 = 92% das cinco).
function Stars({ value = 5, className = '' }) {
  const rating = Math.min(Math.max(Number(String(value).replace(',', '.')) || 0, 0), 5);
  return (
    <span className={`${styles.stars} ${className}`} role="img" aria-label={`${value} de 5 estrelas`}>
      <span className={styles.starsOff} aria-hidden="true">★★★★★</span>
      <span className={styles.starsOn} aria-hidden="true" style={{ width: `${(rating / 5) * 100}%` }}>★★★★★</span>
    </span>
  );
}

const ICONS = ['fa-solid fa-utensils', 'fa-solid fa-palette', 'fa-solid fa-square-parking', 'fa-solid fa-motorcycle'];

export default function Reviews() {
  const { content, config } = useSite();
  const logo = config.branding?.logo;
  const reasons = content.highlights;
  const reviews = content.testimonials;
  const rating = reviews?.rating;
  const items = (reviews?.items ?? []).slice(0, 3);
  const sectionRef = useRef(null);
  const outbound = usePendingAction();

  useEffect(() => {
    const node = sectionRef.current;
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

  if (!reviews) return null;

  const openGoogle = (event) => {
    event.preventDefault();
    outbound.run(`Abrindo as avaliações no ${rating.source || 'Google'}`, () => openExternal(rating.href));
  };

  return (
    <section ref={sectionRef} id={reviews.id} className={styles.section} aria-labelledby={`${reviews.id}-title`}>
      {logo ? <img className={styles.watermark} src={logo} alt="" aria-hidden="true" /> : null}
      <div className={styles.grid}>
        <div className={styles.side}>
          <p className={styles.eyebrow}>{reasons?.eyebrow || reviews.eyebrow}</p>
          <h2 id={`${reviews.id}-title`}>
            <Emphasis>{reasons?.title || reviews.title}</Emphasis>
          </h2>

          {reasons?.items?.length ? (
            <ul className={styles.reasons}>
              {reasons.items.map((item, index) => (
                <li key={item.title} style={{ '--i': index }}>
                  <span className={styles.reasonIcon}>
                    <i className={ICONS[index % ICONS.length]} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

        </div>

        <div className={`${styles.reviews} ${items.length === 2 ? styles.reviewsPair : ''}`}>
          <p className={styles.reviewsLabel}>
            <span>{reviews.title?.replaceAll('*', '')}</span>
            <small>{reviews.eyebrow}</small>
          </p>
            {rating ? (
              <div className={styles.google}>
                <div className={styles.googleHead}>
                  <GoogleLogo className={styles.googleLogo} />
                  <span>
                    <strong>Avaliações no {rating.source || 'Google'}</strong>
                    <small>{rating.place || config.business.name}</small>
                  </span>
                </div>
                <div className={styles.googleScore}>
                  <span className={styles.googleValue}>{rating.value}</span>
                  <span>
                    <Stars value={rating.value} className={styles.googleStars} />
                    <small>{rating.count}</small>
                  </span>
                </div>
                {rating.href ? (
                  <div className={styles.googleActions}>
                    <a className={styles.googlePrimary} href={rating.href} target="_blank" rel="noreferrer noopener" onClick={openGoogle}>
                      {rating.linkLabel || 'Ver no Google'}
                      <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                    </a>
                    {rating.reviewHref ? (
                      <a className={styles.googleGhost} href={rating.reviewHref} target="_blank" rel="noreferrer noopener">
                        {rating.reviewLabel || 'Deixar avaliação'}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          {items.map((item, index) => {
            const name = item.name || 'Cliente';
            return (
              <blockquote key={`${name}-${index}`} className={styles.review} style={{ '--i': index }}>
                <header>
                  <span className={styles.avatar} style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}>
                    {name.charAt(0)}
                  </span>
                  <span className={styles.who}>
                    <strong>{name}</strong>
                    <small>{item.role || 'Avaliação no Google'}</small>
                  </span>
                  <GoogleLogo className={styles.reviewLogo} />
                </header>
                <Stars value={item.stars || 5} />
                <p>“{item.quote}”</p>
              </blockquote>
            );
          })}
        </div>
      </div>
      {outbound.pending ? <ActionSkeleton variant="google" scope="screen" label={outbound.label} /> : null}
    </section>
  );
}
