import { useState } from 'react';
import { useSite } from '../../hooks/useSite.js';
import LocationMap from '../LocationMap';
import { scrollToTarget } from '../../utils/smoothScroll.js';
import { CoffeeBean } from '../ui';
import styles from './styles.module.css';

// Grãos em volta do card: posição (% da tela), tamanho e giro (ficam parados, só balançam de leve).
const BEANS = [
  { x: 1, y: 14, size: 84, rotate: -28 },
  { x: -1, y: 86, size: 130, rotate: 24 },
  { x: 86, y: 6, size: 70, rotate: 40, blur: true },
  { x: 90, y: 74, size: 120, rotate: -18 },
  { x: 46, y: 92, size: 64, rotate: 70, blur: true },
  { x: 70, y: -2, size: 54, rotate: -60, blur: true },
];

// Grãos que "caem" na frente da logo, dentro do card.
const CARD_BEANS = [
  { x: 6, y: 58, size: 86, rotate: -22 },
  { x: 80, y: 18, size: 64, rotate: 34 },
  { x: 74, y: 78, size: 76, rotate: -48 },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Adesivo de xícara com vapor (traço branco em volta, como um sticker).
function CupSticker() {
  return (
    <svg className={styles.cup} viewBox="0 0 120 110" aria-hidden="true" focusable="false">
      <g className={styles.steam} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <path d="M44 30c-6-7 6-11 0-19" />
        <path d="M60 28c-6-7 6-11 0-19" />
        <path d="M76 30c-6-7 6-11 0-19" />
      </g>
      <g stroke="#fff" strokeWidth="10" strokeLinejoin="round" fill="#fff">
        <path d="M24 42h72l-7 40c-1 7-7 12-14 12H45c-7 0-13-5-14-12Z" />
        <path d="M94 50c12 0 16 6 15 12s-7 11-17 10" fill="none" />
        <ellipse cx="60" cy="98" rx="46" ry="7" />
      </g>
      <g stroke="#2E1D15" strokeWidth="4" strokeLinejoin="round">
        <path d="M24 42h72l-7 40c-1 7-7 12-14 12H45c-7 0-13-5-14-12Z" fill="#FBF5EC" />
        <path d="M94 50c12 0 16 6 15 12s-7 11-17 10" fill="none" />
        <ellipse cx="60" cy="98" rx="46" ry="7" fill="#FBF5EC" />
        <path d="M28 50h64" />
        <path d="M30 58c10 5 20-3 30 2s20-3 30 2" fill="none" strokeWidth="3" />
      </g>
    </svg>
  );
}

// Mancha de café/caramelo escorrendo atrás do selo da logo.
function Splash() {
  return (
    <svg className={styles.splash} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <path
        d="M205 38c46 4 66 38 98 46s58 26 56 72-34 52-30 92 30 70-6 96-60-6-92 8-46 44-86 22-22-58-52-80-74-30-70-78 44-50 54-84 18-58 56-70 46-6 72-4Z"
        fill="currentColor"
      />
      <path className={styles.drip} d="M118 300c-4 30-2 50 6 54s10-22 6-54Z" fill="currentColor" />
      <path className={`${styles.drip} ${styles.dripB}`} d="M262 330c-3 24 0 40 7 42s9-18 4-42Z" fill="currentColor" />
      <ellipse cx="160" cy="120" rx="44" ry="18" fill="#fff" opacity="0.18" transform="rotate(-24 160 120)" />
    </svg>
  );
}

export default function CardHero() {
  const { config, content } = useSite();
  const hero = content.cardHero;
  const business = config.business;
  const logo = config.branding?.logo;
  const [mapOpen, setMapOpen] = useState(false);

  if (!hero) return null;

  const goTo = (event, href) => {
    if (!href?.startsWith('#')) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    scrollToTarget(target);
    window.history.replaceState(null, '', href);
  };

  const ring = `${hero.badgeText} · `;
  const photo = hero.visual === 'photo' ? hero.photo : null;

  return (
    <section className={styles.hero} id={hero.id} aria-label={business.name} data-own-height="">
      <div className={styles.beans} aria-hidden="true">
        {BEANS.map((bean, index) => (
          <span
            key={index}
            className={`${styles.bean} ${bean.blur ? styles.beanBlur : ''}`}
            style={{
              '--x': `${bean.x}%`,
              '--y': `${bean.y}%`,
              '--size': `${bean.size}px`,
              '--r': `${bean.rotate}deg`,
              '--i': index,
            }}
          >
            <CoffeeBean />
          </span>
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.body}>
          <div className={styles.copy}>
            <LocationMap
              latitude={business.coordinates?.lat}
              longitude={business.coordinates?.lng}
              name={business.name}
              address={business.address}
              buttonLabel={hero.eyebrow}
              className={styles.place}
              open={mapOpen}
              onOpenChange={setMapOpen}
            >
              <span className={styles.placeLabel}>
                <i className="fa-solid fa-location-dot" aria-hidden="true" /> {hero.eyebrow}
              </span>
            </LocationMap>

            <h1 className={styles.lettering}>
              <span className={styles.sticker}>{hero.sticker}</span>
              <span className={styles.big} aria-label={hero.title}>
                {[...hero.title].map((char, index) => (
                  <span key={index} aria-hidden="true" style={{ '--i': index }}>
                    {char === ' ' ? ' ' : char}
                  </span>
                ))}
              </span>
              <span className={styles.tagRow}>
                <span className={styles.tag}>{hero.tag}</span>
                <CupSticker />
              </span>
            </h1>

            <div className={styles.story}>
              <h2>{hero.storyTitle}</h2>
              <p>{hero.story}</p>
            </div>

            <div className={styles.actions}>
              <a className={styles.primary} href={hero.primaryCta.href} onClick={(event) => goTo(event, hero.primaryCta.href)}>
                {hero.primaryCta.label}
                <span className={styles.ctaDot}><ArrowIcon /></span>
              </a>
              {hero.secondaryCta ? (
                <button type="button" className={styles.ghost} onClick={() => setMapOpen(true)}>
                  {hero.secondaryCta.label}
                </button>
              ) : null}
            </div>
          </div>

          <div className={`${styles.visual} ${photo ? styles.visualPhoto : ''}`} aria-hidden="true">
            {photo ? (
              // visual 'photo': foto em arco com moldura, e o selo da logo pequeno no canto.
              <figure className={styles.arch}>
                <img src={photo} alt="" draggable="false" />
                {hero.photoCaption ? <figcaption>{hero.photoCaption}</figcaption> : null}
              </figure>
            ) : (
              <Splash />
            )}
            <div className={styles.badge}>
              <svg className={styles.ring} viewBox="0 0 300 300">
                <defs>
                  <path id="card-hero-ring" d="M150 150m-128 0a128 128 0 1 1 256 0a128 128 0 1 1-256 0" />
                </defs>
                <text>
                  <textPath href="#card-hero-ring" textLength="800">{ring}</textPath>
                </text>
              </svg>
              <div className={styles.seal}>{logo ? <img src={logo} alt="" draggable="false" /> : null}</div>
            </div>
            {CARD_BEANS.map((bean, index) => (
              <span
                key={index}
                className={styles.cardBean}
                style={{ '--x': `${bean.x}%`, '--y': `${bean.y}%`, '--size': `${bean.size}px`, '--r': `${bean.rotate}deg`, '--i': index }}
              >
                <CoffeeBean tone="light" />
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
