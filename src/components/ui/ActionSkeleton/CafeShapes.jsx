import PropTypes from 'prop-types';
import base from './styles.module.css';
import styles from './cafe.module.css';

// Skeleton do "Como chegar" das cafeterias (branding.skeleton: 'cafe'): mesmo desenho da Nanica
// (rota tracejada animada até o ícone da marca), terminando numa xícara de café fumegante.
// As cores vêm das variáveis da marca (--color-primary, --color-accent, --color-secondary...).

function CoffeeCup({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g className={styles.steam}>
        <path d="M24 17c-3-3.5 3-5.5 0-10" />
        <path d="M31.5 17c-3-3.5 3-5.5 0-10" />
        <path d="M39 17c-3-3.5 3-5.5 0-10" />
      </g>
      <ellipse className={styles.saucer} cx="32" cy="55" rx="23" ry="4.5" />
      <path className={styles.handle} d="M47 29h3.2a6.3 6.3 0 0 1 0 12.6H46" />
      <path className={styles.cupBody} d="M15 23h33v11a16.5 16.5 0 0 1-16.5 16.5h0A16.5 16.5 0 0 1 15 34z" />
      <path className={styles.cupBand} d="M15.6 33h31.8" />
      <ellipse className={styles.coffee} cx="31.5" cy="23" rx="16.5" ry="3.4" />
    </svg>
  );
}

CoffeeCup.propTypes = { className: PropTypes.string };

export function CafeRoute() {
  return (
    <span className={`${base.route} ${styles.route}`} aria-hidden="true">
      <span className={`${base.bone} ${base.map} ${styles.map}`} />
      <svg className={styles.streets} viewBox="0 0 420 180" preserveAspectRatio="none">
        <path d="M0 52C90 44 170 70 420 38" />
        <path d="M0 128C120 118 250 150 420 120" />
        <path d="M118 0C126 60 104 120 132 180" />
        <path d="M318 0C300 70 336 120 314 180" />
      </svg>
      <svg className={styles.routeLine} viewBox="0 0 420 180" preserveAspectRatio="none">
        <path d="M54 146C104 150 116 104 176 114S236 146 262 106" />
      </svg>
      <span className={styles.origin} />
      <span className={styles.cupShadow} />
      <CoffeeCup className={styles.cup} />
    </span>
  );
}
