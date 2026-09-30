import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useSite } from '../../../hooks/useSite.js';
import { NanicaCart, NanicaCatalog, NanicaMenu, NanicaRoute } from './NanicaShapes.jsx';
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

// Avaliações do Google: marca "G", nota com estrelas e cards de comentários carregando.
function GoogleShape() {
  return (
    <span className={styles.google} aria-hidden="true">
      <svg className={styles.googleLogo} viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
      <span className={styles.googleRating}>
        <Shimmer className={styles.googleScore} />
        <span className={styles.googleStars}>★★★★★</span>
      </span>
      {[0, 1, 2].map((row) => (
        <span key={row} className={styles.googleReview}>
          <Shimmer className={styles.googleAvatar} />
          <span className={styles.googleReviewCopy}>
            <Shimmer className={styles.lineShort} />
            <span className={styles.googleStarsSmall}>★★★★★</span>
            <Shimmer className={styles.line} />
            <Shimmer className={styles.lineShort} />
          </span>
        </span>
      ))}
    </span>
  );
}

// iFood: marca da plataforma, cabeçalho da loja e itens do cardápio carregando.
function IfoodShape() {
  return (
    <span className={styles.ifood} aria-hidden="true">
      <span className={styles.ifoodBrand}>iFood</span>
      <span className={styles.ifoodStore}>
        <Shimmer className={styles.ifoodStoreLogo} />
        <span className={styles.ifoodStoreCopy}>
          <Shimmer className={styles.line} />
          <Shimmer className={styles.lineShort} />
        </span>
      </span>
      {[0, 1, 2].map((row) => (
        <span key={row} className={styles.ifoodItem}>
          <span className={styles.ifoodItemCopy}>
            <Shimmer className={styles.line} />
            <Shimmer className={styles.lineShort} />
            <Shimmer className={styles.ifoodPrice} />
          </span>
          <Shimmer className={styles.ifoodThumb} />
        </span>
      ))}
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

// Skeletons com a identidade de uma marca (config.branding.skeleton). Os de destino externo
// (WhatsApp, Google, iFood) continuam com a marca da plataforma.
const BRAND_SHAPES = {
  nanica: { cart: NanicaCart, menu: NanicaMenu, catalog: NanicaCatalog, route: NanicaRoute },
};

const SHAPES = {
  cart: CartShape,
  menu: MenuShape,
  catalog: CatalogShape,
  whatsapp: WhatsappShape,
  route: RouteShape,
  google: GoogleShape,
  ifood: IfoodShape,
};

export default function ActionSkeleton({ label, variant = 'menu', scope = 'panel' }) {
  const { config } = useSite();
  const branded = BRAND_SHAPES[config?.branding?.skeleton]?.[variant];
  const Shape = branded || SHAPES[variant] || MenuShape;
  const body = (
    <div
      className={`${scope === 'screen' ? styles.screen : styles.panel} ${styles[`${variant}Variant`] || ''}`}
      style={scope === 'screen' ? revealOrigin() : undefined}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Shape wordmark={config?.branding?.wordmark} />
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
  variant: PropTypes.oneOf(['cart', 'menu', 'catalog', 'whatsapp', 'route', 'google', 'ifood']),
  scope: PropTypes.oneOf(['panel', 'screen']),
};
