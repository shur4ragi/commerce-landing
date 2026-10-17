import { useId } from 'react';
import PropTypes from 'prop-types';

// Grão de café em SVG (com volume): usado no fundo do hero, no Instagram e na explosão do saquinho.
export default function CoffeeBean({ className = '', style, tone = 'roast' }) {
  const id = useId();
  const colors = {
    roast: ['#8A4A26', '#4A2312', '#2A130A'],
    light: ['#A8643A', '#6A3519', '#3A1B0C'],
  }[tone];

  return (
    <svg className={className} style={style} viewBox="0 0 60 80" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-body`} cx="35%" cy="28%" r="80%">
          <stop offset="0" stopColor={colors[0]} />
          <stop offset="0.55" stopColor={colors[1]} />
          <stop offset="1" stopColor={colors[2]} />
        </radialGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="30" cy="40" rx="26" ry="36" fill={`url(#${id}-body)`} />
      <path
        d="M31 6c-9 10-9 20-2 30 7 11 7 24-2 38"
        fill="none"
        stroke={colors[2]}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path d="M33 8c-6 9-6 18 0 27" fill="none" stroke="#C98A55" strokeOpacity="0.35" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="18" cy="24" rx="7" ry="12" fill={`url(#${id}-shine)`} transform="rotate(18 18 24)" />
    </svg>
  );
}

CoffeeBean.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  tone: PropTypes.oneOf(['roast', 'light']),
};
