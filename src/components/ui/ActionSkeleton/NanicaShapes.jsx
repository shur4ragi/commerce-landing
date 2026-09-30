import PropTypes from 'prop-types';
import base from './styles.module.css';
import styles from './nanica.module.css';

// Skeletons com a identidade da Nanica (branding.skeleton: 'nanica'): banana do logo,
// fatia de Banoffee montada em camadas e a caixinha de fatia com rodelas de banana.

function Bone({ className = '' }) {
  return <span className={`${base.bone} ${className}`} />;
}

Bone.propTypes = { className: PropTypes.string };

const BANANA_SHADE = 'M44.6 17.5c7.4 5.8 10.6 15.2 9.2 25.2-1.4 9.7-8.3 17.4-17.2 19.9-1.6.4-2.2-1.4-.9-2.2 6.4-4.3 10.5-11 11.6-18.7 1.1-7.6-.4-15.3-4.8-21.6-.8-1.2.9-3.5 2.1-2.6z';
const BANANA_LIGHT = 'M42.3 20c4.2 6.1 5.7 13.8 4.6 21.4-1.1 7.7-5.2 14.4-11.6 18.7-.8.5-.6 1.5.2 1.6-3.4.4-3.4-1.7-2.3-2.6 4.7-4.4 7.5-10.4 8.1-17.2.6-6.9-.4-14-3.6-20 .9-.7 3.5-2.8 4.6-1.9z';
const BANANA_STEM = 'M42.4 11.8c1.3-.6 3 .1 3.2 1.5l.7 5.3c-1 .6-2.7.7-3.7.2l-1.7-5c-.3-.8.4-1.7 1.5-2z';

function Banana({ className = '' }) {
  return (
    <svg className={className} viewBox="30 8 30 58" aria-hidden="true">
      <path d={BANANA_SHADE} fill="#F5A51C" />
      <path d={BANANA_LIGHT} fill="#FDD511" />
      <path d={BANANA_STEM} fill="#5A2A0B" />
      <circle cx="35.6" cy="61.2" r="1.9" fill="#5A2A0B" />
    </svg>
  );
}

Banana.propTypes = { className: PropTypes.string };

// Três rodelas de banana pulando no lugar dos pontinhos de carregamento.
function BananaCoins() {
  return (
    <span className={styles.coins}>
      <span />
      <span />
      <span />
    </span>
  );
}

function Hints({ hints }) {
  return (
    <span className={base.hints}>
      {hints.map((hint, index) => (
        <span key={hint} style={{ '--i': index }}>
          {hint}
        </span>
      ))}
    </span>
  );
}

Hints.propTypes = { hints: PropTypes.arrayOf(PropTypes.string).isRequired };

// Cardápio: a fatia de Banoffee se monta em camadas (base, doce de leite, banana, chantilly e cacau).
export function NanicaCatalog() {
  return (
    <span className={base.catalog} aria-hidden="true">
      <svg className={styles.slice} viewBox="0 0 220 150">
        <ellipse className={styles.plate} cx="110" cy="136" rx="100" ry="10" />
        <g className={styles.layerCrust}>
          <path d="M22 118h176v10a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4z" fill="#D9A55B" />
          <path d="M22 118h176v4H22z" fill="#C88E42" />
        </g>
        <rect className={styles.layerCaramel} x="22" y="92" width="176" height="26" fill="#9A4F17" />
        <g className={styles.layerBanana}>
          <rect x="22" y="76" width="176" height="16" fill="#F6E7B0" />
          {[40, 72, 104, 136, 168].map((cx, index) => (
            <g key={cx} style={{ '--i': index }} className={styles.coin}>
              <circle cx={cx} cy="84" r="11" fill="#FBEFC4" stroke="#EBD58A" strokeWidth="2" />
              <circle cx={cx} cy="84" r="2.2" fill="#C9A85B" />
            </g>
          ))}
        </g>
        <path
          className={styles.layerCream}
          d="M22 76V52c10-6 18 2 28-3s18 4 28-1 18 3 28-1 18 4 28 0 18 3 28-1 18 3 30 1v29z"
          fill="#FFFDF6"
          stroke="#F1E6CF"
          strokeWidth="1.5"
        />
        <g className={styles.cocoa} fill="#7A3A12">
          {[[40, 56], [58, 60], [77, 53], [96, 59], [118, 55], [139, 60], [160, 54], [182, 58], [68, 64], [150, 65]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" />
          ))}
        </g>
      </svg>

      <BananaCoins />
      <Hints hints={['Montando a base', 'Espalhando o doce de leite', 'Fatiando as bananas']} />

      <span className={base.menuPreview}>
        {[0, 1, 2].map((card) => (
          <span key={card} className={base.catalogCard}>
            <Bone className={base.catalogPhoto} />
            <Bone className={base.line} />
            <Bone className={base.lineShort} />
          </span>
        ))}
      </span>
    </span>
  );
}

// Pedido: a caixinha de fatia da Nanica (com rodelas de banana na lateral) chega pulando.
export function NanicaCart() {
  return (
    <span className={base.cart} aria-hidden="true">
      <svg className={styles.box} viewBox="0 0 160 96">
        <path className={styles.boxShadow} d="M30 90h100" />
        <g className={styles.boxBody}>
          <path d="M16 36 128 14l18 22v42H16z" fill="#FFFDF6" stroke="#622803" strokeWidth="3" strokeLinejoin="round" />
          <path d="M16 36h130" stroke="#622803" strokeWidth="3" />
          <rect x="16" y="64" width="130" height="14" fill="#FBB217" stroke="#622803" strokeWidth="3" />
          {[34, 60, 86, 112].map((cx) => (
            <g key={cx}>
              <path d={`M${cx - 11} 64a11 11 0 0 1 22 0z`} fill="#FDDB86" stroke="#622803" strokeWidth="2.5" />
              <circle cx={cx} cy="59" r="1.8" fill="#9A4513" />
            </g>
          ))}
        </g>
      </svg>
      {[0, 1].map((row) => (
        <span key={row} className={base.cartRow}>
          <Bone className={base.thumb} />
          <span className={base.cartCopy}>
            <Bone className={base.line} />
            <Bone className={base.lineShort} />
          </span>
          <Bone className={base.price} />
        </span>
      ))}
      <Bone className={base.total} />
    </span>
  );
}

// Menu do celular: a banana do logo balança acima dos links.
export function NanicaMenu({ wordmark }) {
  return (
    <span className={base.menu} aria-hidden="true">
      {wordmark ? (
        <img className={styles.wordmark} src={wordmark} alt="" />
      ) : (
        <Banana className={styles.menuBanana} />
      )}
      {[0, 1, 2, 3, 4].map((row) => (
        <Bone key={row} className={base.menuLink} />
      ))}
      <Bone className={base.menuCta} />
    </span>
  );
}

NanicaMenu.propTypes = { wordmark: PropTypes.string };

// Como chegar: a banana cai como pino no mapa e a rota se desenha até ela.
export function NanicaRoute() {
  return (
    <span className={`${base.route} ${styles.route}`} aria-hidden="true">
      <Bone className={`${base.map} ${styles.map}`} />
      <svg className={styles.routeLine} viewBox="0 0 420 180" preserveAspectRatio="none">
        <path d="M60 150C120 150 110 96 170 100s70 30 30-6" />
      </svg>
      <span className={styles.pinShadow} />
      <Banana className={styles.pin} />
    </span>
  );
}
