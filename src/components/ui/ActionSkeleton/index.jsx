import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

// Último toque/clique na página: a tela cheia se abre em círculo a partir desse ponto.
let lastPointer = null;
if (typeof document !== 'undefined') {
  document.addEventListener(
    'pointerdown',
    (event) => {
      lastPointer = { x: event.clientX, y: event.clientY, at: Date.now() };
    },
    { capture: true, passive: true },
  );
}

function revealOrigin() {
  if (lastPointer && Date.now() - lastPointer.at < 1500) {
    return { '--ox': `${lastPointer.x}px`, '--oy': `${lastPointer.y}px` };
  }
  return undefined;
}

function Shimmer({ className }) {
  return <span className={`${styles.bone} ${className}`} />;
}

function CartShape() {
  return (
    <span className={styles.cart} aria-hidden="true">
      {[0, 1, 2].map((row) => (
        <span key={row} className={styles.cartRow}>
          <Shimmer className={styles.thumb} />
          <span className={styles.cartCopy}>
            <Shimmer className={styles.line} />
            <Shimmer className={styles.lineShort} />
          </span>
          <Shimmer className={styles.price} />
        </span>
      ))}
      <Shimmer className={styles.total} />
    </span>
  );
}

function MenuShape() {
  return (
    <span className={styles.menu} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((row) => (
        <Shimmer key={row} className={styles.menuLink} />
      ))}
      <Shimmer className={styles.menuCta} />
    </span>
  );
}

const CATALOG_HINTS = ['Moendo os grãos', 'Aquecendo a água', 'Servindo o cardápio'];

// Xícara enchendo de café, com vapor subindo; abaixo, grãos pulando e uma prévia dos cards.
function CatalogShape() {
  return (
    <span className={styles.catalog} aria-hidden="true">
      <svg className={styles.cup} viewBox="0 0 140 130">
        <defs>
          <clipPath id="skeleton-cup-inside">
            <path d="M30 52h72v10c0 22-16 38-36 38S30 84 30 62z" />
          </clipPath>
        </defs>
        <g className={styles.steam} fill="none" strokeWidth="4" strokeLinecap="round">
          <path d="M52 40c-7-8 7-14 0-22s7-14 0-20" />
          <path d="M66 42c-7-8 7-14 0-22s7-14 0-20" />
          <path d="M80 40c-7-8 7-14 0-22s7-14 0-20" />
        </g>
        <ellipse className={styles.saucer} cx="66" cy="112" rx="50" ry="8" />
        <path className={styles.handle} d="M100 60c14-2 20 6 18 15s-10 14-22 12" fill="none" strokeWidth="6" />
        <path className={styles.cupBody} d="M26 48h80v14c0 26-18 44-40 44S26 88 26 62z" />
        <g clipPath="url(#skeleton-cup-inside)">
          <rect className={styles.coffee} x="26" y="52" width="80" height="60" />
          <rect className={styles.crema} x="26" y="52" width="80" height="5" />
        </g>
      </svg>

      <span className={styles.beans}>
        <span />
        <span />
        <span />
      </span>

      <span className={styles.hints}>
        {CATALOG_HINTS.map((hint, index) => (
          <span key={hint} style={{ '--i': index }}>
            {hint}
          </span>
        ))}
      </span>

      <span className={styles.menuPreview}>
        {[0, 1, 2].map((card) => (
          <span key={card} className={styles.catalogCard}>
            <Shimmer className={styles.catalogPhoto} />
            <Shimmer className={styles.line} />
            <Shimmer className={styles.lineShort} />
          </span>
        ))}
      </span>
    </span>
  );
}

function WhatsappShape() {
  return (
    <span className={styles.chat} aria-hidden="true">
      <i className={`fa-brands fa-whatsapp ${styles.chatIcon}`} />
      <span className={styles.chatHead}>
        <Shimmer className={styles.avatar} />
        <Shimmer className={styles.line} />
      </span>
      <Shimmer className={styles.bubbleIn} />
      <Shimmer className={styles.bubbleOut} />
      <Shimmer className={styles.bubbleIn} />
    </span>
  );
}

function RouteShape() {
  return (
    <span className={styles.route} aria-hidden="true">
      <Shimmer className={styles.map} />
      <span className={styles.pin} />
      <span className={styles.routePath} />
    </span>
  );
}

const SHAPES = {
  cart: CartShape,
  menu: MenuShape,
  catalog: CatalogShape,
  whatsapp: WhatsappShape,
  route: RouteShape,
};

export default function ActionSkeleton({ label, variant = 'menu', scope = 'panel' }) {
  const Shape = SHAPES[variant] || MenuShape;
  const body = (
    <div
      className={`${scope === 'screen' ? styles.screen : styles.panel} ${styles[`${variant}Variant`] || ''}`}
      style={scope === 'screen' ? revealOrigin() : undefined}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Shape />
      <p className={styles.caption}>{label}</p>
    </div>
  );

  if (scope === 'screen') {
    if (typeof document === 'undefined') return null;
    return createPortal(body, document.body);
  }

  return body;
}

ActionSkeleton.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['cart', 'menu', 'catalog', 'whatsapp', 'route']),
  scope: PropTypes.oneOf(['panel', 'screen']),
};
