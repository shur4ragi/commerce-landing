import { useCallback, useEffect, useRef, useState } from 'react';
import { useSite } from '../../hooks/useSite.js';
import { lockScroll } from '../../utils/scrollLock.js';
import { CoffeeBean, Emphasis } from '../ui';
import styles from './styles.module.css';

// "Estamos no Instagram" (mesma ideia da Aflora): chamada e destaques à esquerda e um celular
// inclinado em 3D com o perfil. Quando a seção aparece, o celular sobe girando, a tela mostra o
// skeleton do Instagram e depois o perfil; o feed rola sozinho e cada post abre ampliado.
function InstagramIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  );
}

// Xícara passando café: o skeleton do post ampliado enquanto a foto carrega.
function BrewingCup() {
  return (
    <svg className={styles.brewCup} viewBox="0 0 80 80" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path className={styles.brewSteam} d="M30 20c-4-5 4-8 0-13M42 20c-4-5 4-8 0-13" />
        <path d="M16 30h44l-4 26a10 10 0 0 1-10 8H30a10 10 0 0 1-10-8Z" />
        <path d="M60 36c8 0 10 4 9 8s-5 7-11 6" />
      </g>
      <clipPath id="brew-fill">
        <path d="M17 31h42l-4 25a9 9 0 0 1-9 7H30a9 9 0 0 1-9-7Z" />
      </clipPath>
      <rect className={styles.brewLevel} x="10" y="30" width="60" height="40" clipPath="url(#brew-fill)" />
    </svg>
  );
}

export default function Instagram() {
  const { content, config } = useSite();
  const insta = content.instagram;
  const posts = insta?.posts ?? [];
  const total = posts.length;
  const url = config.social?.instagram || `https://www.instagram.com/${insta?.handle}/`;
  const logo = config.branding?.logo;

  const sectionRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocus = useRef(null);
  const touch = useRef(null);
  const [live, setLive] = useState(false);
  const [open, setOpen] = useState(-1);
  const [loaded, setLoaded] = useState(false);

  const go = useCallback((delta) => {
    setLoaded(false);
    setOpen((index) => (index + delta + total) % total);
  }, [total]);

  // Entrada: liga a seção quando ela aparece e troca o skeleton pelo perfil logo depois.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        section.dataset.in = '';
        timer = window.setTimeout(() => setLive(true), 1400);
      },
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (open < 0) {
      lastFocus.current?.focus?.();
      return undefined;
    }
    closeRef.current?.focus();
    const unlock = lockScroll();
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(-1);
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      unlock();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, go]);

  if (!insta || !total) return null;

  const openPost = (event, index) => {
    lastFocus.current = event.currentTarget;
    setLoaded(false);
    setOpen(index);
  };

  // Lista duplicada para o feed rolar em loop; a cópia não recebe foco.
  const tiles = (copy) =>
    posts.map((post, index) => (
      <button
        key={`${copy}-${index}`}
        type="button"
        className={styles.tile}
        onClick={(event) => openPost(event, index)}
        aria-label={`Ampliar post: ${post.alt}`}
        tabIndex={copy ? -1 : 0}
        aria-hidden={copy ? true : undefined}
      >
        <img src={post.image} alt="" loading="lazy" decoding="async" />
      </button>
    ));

  const post = posts[open];
  const profile = insta.profile;

  return (
    <section ref={sectionRef} id={insta.id} className={styles.section} aria-labelledby={`${insta.id}-title`}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <InstagramIcon className={styles.eyeIcon} /> {insta.eyebrow}
          </p>
          <h2 id={`${insta.id}-title`}>
            <Emphasis>{insta.title}</Emphasis>
          </h2>
          <p className={styles.lead}>{insta.text}</p>

          <ul className={styles.highlights}>
            {insta.highlights.map((item, index) => (
              <li key={item.title} style={{ '--i': index }}>
                <span className={styles.ring}>
                  <img src={item.image} alt="" loading="lazy" />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.text}</small>
                </span>
              </li>
            ))}
          </ul>

          <a className={styles.cta} href={url} target="_blank" rel="noopener noreferrer">
            <InstagramIcon /> {insta.cta}
          </a>
        </div>

        <div className={styles.stage}>
          <CoffeeBean className={`${styles.float} ${styles.f1}`} />
          <CoffeeBean className={`${styles.float} ${styles.f2}`} tone="light" />
          <CoffeeBean className={`${styles.float} ${styles.f3}`} />
          <span className={`${styles.deco} ${styles.d1}`} aria-hidden="true" />
          <span className={`${styles.deco} ${styles.d2}`} aria-hidden="true" />

          <div className={styles.phoneWrap}>
            <div className={styles.phone} data-live={live || undefined}>
              <div className={styles.screen}>
                <div className={styles.status} aria-hidden="true">
                  <span>9:41</span>
                  <span className={styles.island} />
                  <span className={styles.signal}><i /><i /><i /><b /></span>
                </div>

                <div className={styles.igBar}>
                  <span className={styles.user}>{insta.handle}</span>
                  <span className={styles.barIcons} aria-hidden="true"><i className={styles.plus} /><i className={styles.menu} /></span>
                </div>

                <div className={styles.profile}>
                  <span className={styles.avatarRing}>
                    <span className={styles.avatar}>{logo ? <img src={logo} alt="" /> : null}</span>
                  </span>
                  <dl className={styles.stats}>
                    <div><dt>{profile.followers}</dt><dd>seguidores</dd></div>
                  </dl>
                </div>
                <div className={styles.bio}>
                  <strong>{profile.name}</strong>
                  {profile.bio.map((line) => <span key={line}>{line}</span>)}
                </div>
                <div className={styles.actions}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className={styles.follow}>Seguir</a>
                  <a href={url} target="_blank" rel="noopener noreferrer" className={styles.message}>Mensagem</a>
                </div>
                <ul className={styles.stories}>
                  {insta.highlights.map((item) => (
                    <li key={item.title}>
                      <span><img src={item.image} alt="" loading="lazy" /></span>
                      {item.title}
                    </li>
                  ))}
                </ul>
                <div className={styles.tabs} aria-hidden="true"><i className={styles.tabOn} /><i /><i /></div>

                <div className={styles.feedView}>
                  <div className={styles.feedTrack}>
                    <div className={styles.feedGrid}>{tiles(0)}</div>
                    <div className={styles.feedGrid}>{tiles(1)}</div>
                  </div>
                </div>

                <div className={styles.skel} aria-hidden="true">
                  <div className={styles.skRow}><i className={styles.skCircle} /><b /><b /></div>
                  <b className={styles.skLine} style={{ width: '40%' }} />
                  <b className={styles.skLine} style={{ width: '86%' }} />
                  <b className={styles.skLine} style={{ width: '70%' }} />
                  <div className={styles.skBtns}><b /><b /></div>
                  <div className={styles.skStories}><i /><i /><i /></div>
                  <div className={styles.skGrid}>
                    {Array.from({ length: 9 }, (_, index) => (
                      <i key={index} style={{ '--i': index }}><CoffeeBean /></i>
                    ))}
                  </div>
                </div>
                <span className={styles.home} aria-hidden="true" />
              </div>
            </div>
            <span className={styles.shadow} aria-hidden="true" />

            {insta.chips.map((chip, index) => (
              <span key={chip} className={`${styles.chip} ${index ? styles.c2 : styles.c1}`} aria-hidden="true">
                <InstagramIcon /> {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {post ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={post.alt}
          onClick={() => setOpen(-1)}
          onTouchStart={(event) => {
            touch.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touch.current == null) return;
            const dx = event.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <figure className={styles.figure} onClick={(event) => event.stopPropagation()}>
            <div key={open} className={`${styles.big} ${loaded ? styles.bigLoaded : ''}`}>
              <div className={styles.lbSkel} aria-hidden="true">
                <BrewingCup />
                <span>passando o café…</span>
              </div>
              <img src={post.image} alt={post.alt} onLoad={() => window.setTimeout(() => setLoaded(true), 450)} />
            </div>
            <figcaption>
              <span>{post.alt}</span>
              <span className={styles.count}>{open + 1} / {total}</span>
            </figcaption>
          </figure>
          <button ref={closeRef} type="button" className={`${styles.ctrl} ${styles.close}`} onClick={() => setOpen(-1)} aria-label="Fechar">
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
          <button type="button" className={`${styles.ctrl} ${styles.prev}`} onClick={(event) => { event.stopPropagation(); go(-1); }} aria-label="Anterior">
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>
          <button type="button" className={`${styles.ctrl} ${styles.next}`} onClick={(event) => { event.stopPropagation(); go(1); }} aria-label="Próxima">
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
