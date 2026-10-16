import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useSite } from '../../hooks/useSite.js';
import { lockScroll } from '../../utils/scrollLock.js';
import paper from './PaperMenu.module.css';
import styles from './MenuSheet.module.css';

const FLY_MS = 750;
const SKELETON_MS = 700;
const EASE = 'cubic-bezier(0.22, 0.8, 0.2, 1)';

// Transformação que leva a folha (já no centro) até o retângulo de origem (o cardápio de papel
// da seção ou o botão "Ver todos"), para animar o caminho de volta ao centro.
function fromRect(sheet, origin, rotate) {
  const box = sheet.getBoundingClientRect();
  const dx = origin.left + origin.width / 2 - (box.left + box.width / 2);
  const dy = origin.top + origin.height / 2 - (box.top + box.height / 2);
  const scale = Math.max(origin.width / box.width, 0.08);
  return `translate(${dx}px, ${dy}px) scale(${scale}) rotate(${rotate}deg)`;
}

// "Ver todos": o cardápio de papel sai do fundo, voa para o centro e vira o modal. Primeiro um
// skeleton rápido (linhas pontilhadas piscando), depois o cardápio completo.
export default function MenuSheet({ open, origin, rotate = 7, groups, onClose, onSelect }) {
  const { config } = useSite();
  const logo = config.branding?.logo;
  const titleId = useId();
  const sheetRef = useRef(null);
  const closeRef = useRef(null);
  const [phase, setPhase] = useState('closed'); // closed | flying | loading | ready | leaving
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (open) setPhase('flying');
  }, [open]);

  // Ida: do retângulo de origem até o centro.
  useLayoutEffect(() => {
    if (phase !== 'flying') return undefined;
    const sheet = sheetRef.current;
    if (!sheet) return undefined;
    if (reduced || !origin) {
      setPhase('loading');
      return undefined;
    }
    const animation = sheet.animate(
      [
        { transform: fromRect(sheet, origin, rotate), opacity: 0.9 },
        { transform: 'translate(0, -12px) scale(1.02) rotate(-1deg)', opacity: 1, offset: 0.8 },
        { transform: 'none', opacity: 1 },
      ],
      { duration: FLY_MS, easing: EASE },
    );
    animation.onfinish = () => setPhase('loading');
    return () => animation.cancel();
  }, [phase, origin, rotate, reduced]);

  // Skeleton breve antes dos itens.
  useEffect(() => {
    if (phase !== 'loading') return undefined;
    const timer = window.setTimeout(() => setPhase('ready'), reduced ? 0 : SKELETON_MS);
    return () => window.clearTimeout(timer);
  }, [phase, reduced]);

  const close = useCallback(
    (after) => {
      const sheet = sheetRef.current;
      const finish = () => {
        setPhase('closed');
        onClose();
        after?.();
      };
      if (!sheet || reduced || !origin) {
        finish();
        return;
      }
      setPhase('leaving');
      const animation = sheet.animate(
        [{ transform: 'none', opacity: 1 }, { transform: fromRect(sheet, origin, rotate), opacity: 0.6 }],
        { duration: FLY_MS * 0.75, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards' },
      );
      animation.onfinish = finish;
    },
    [onClose, origin, rotate, reduced],
  );

  const visible = phase !== 'closed';

  useEffect(() => {
    if (!visible) return undefined;
    closeRef.current?.focus();
    const unlock = lockScroll();
    const onKey = (event) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      unlock();
      window.removeEventListener('keydown', onKey);
    };
  }, [visible, close]);

  if (!visible || typeof document === 'undefined') return null;

  return createPortal(
    <div className={`${styles.overlay} ${phase === 'leaving' ? styles.overlayOut : ''}`} onClick={() => close()}>
      <div
        ref={sheetRef}
        className={`${paper.paper} ${styles.sheet}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={() => close()} aria-label="Fechar cardápio">
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>

        <header className={`${paper.head} ${styles.head}`}>
          {logo ? <img src={logo} alt="" /> : null}
          <strong id={titleId}>Cardápio</strong>
          <span>{config.business.name} · Taubaté</span>
        </header>

        <div className={styles.body}>
          {phase === 'ready' ? (
            groups.map((group, groupIndex) => (
              <section key={group.category} className={`${paper.group} ${styles.group}`} style={{ '--g': groupIndex }}>
                <h4>{group.category}</h4>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button type="button" className={styles.item} onClick={() => close(() => onSelect(item))}>
                        {item.image ? <img src={item.image} alt="" loading="lazy" /> : <span className={styles.noPhoto} />}
                        <span className={styles.itemCopy}>
                          <span className={styles.itemTitle}>{item.title}</span>
                          {item.description ? <small>{item.description}</small> : null}
                        </span>
                        <i className={styles.leader} aria-hidden="true" />
                        <b>{item.price ? item.price.replace('R$ ', '') : ''}</b>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          ) : (
            <div className={styles.skeleton} aria-label="Abrindo o cardápio" role="status">
              {[0, 1, 2].map((group) => (
                <div key={group} className={styles.skGroup}>
                  <b className={styles.skTitle} />
                  {[0, 1, 2, 3].map((row) => (
                    <span key={row} className={styles.skRow} style={{ '--r': group * 4 + row }}>
                      <i />
                      <b />
                      <em />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className={paper.foot}>Não vamos te vender algo que a gente não comeria.</footer>
      </div>
    </div>,
    document.body,
  );
}

MenuSheet.propTypes = {
  open: PropTypes.bool,
  origin: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  rotate: PropTypes.number,
  groups: PropTypes.arrayOf(PropTypes.shape({ category: PropTypes.string, items: PropTypes.array })).isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
