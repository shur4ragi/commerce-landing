/**
 * CoffeePourSVG - SVG animado do bule derramando café na xícara
 * Exporta um SVG que será animado via CSS e JavaScript
 * Estilo flat design, cores do Aurora Café
 */

export function CoffeeSVG({ pourProgress = 0 }) {
  // pourProgress: 0 (vazio) a 1 (cheio com espuma)
  const cupFillHeight = Math.min(pourProgress * 100, 85); // Até 85% de preenchimento
  const foamHeight = Math.max(pourProgress * 100 - 85, 0); // Espuma acima de 85%

  return (
    <svg
      viewBox="0 0 400 500"
      className="coffee-svg"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Bule derramando café na xícara"
      role="img"
    >
      {/* Definições de padrões e gradientes */}
      <defs>
        <linearGradient id="coffeeFillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B6F47" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6B5A3F" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="50%" stopColor="#F5F5F5" stopOpacity="1" />
          <stop offset="100%" stopColor="#E8E8E8" stopOpacity="1" />
        </linearGradient>

        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.15" />
        </filter>

        <pattern id="foamPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="2" fill="#D4A574" opacity="0.3" />
        </pattern>
      </defs>

      {/* Sombra de solo */}
      <ellipse cx="200" cy="460" rx="120" ry="15" fill="#2c1a12" opacity="0.08" />

      {/* XÍCARA - Fundo branco com borda */}
      <g id="cup">
        {/* Corpo da xícara */}
        <path
          d="M 120 200 L 110 380 Q 110 410 140 410 L 260 410 Q 290 410 290 380 L 280 200 Z"
          fill="url(#cupGradient)"
          stroke="#D9D9D9"
          strokeWidth="1.5"
          filter="url(#shadow)"
        />

        {/* Alça da xícara */}
        <path
          d="M 285 240 Q 330 240 330 310 Q 330 380 285 380"
          fill="none"
          stroke="url(#cupGradient)"
          strokeWidth="18"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* Brilho na alça */}
        <path
          d="M 286 248 Q 318 248 318 310 Q 318 370 286 370"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Café dentro da xícara - Clipped by cup shape */}
        <defs>
          <clipPath id="cupClip">
            <path d="M 120 200 L 110 380 Q 110 410 140 410 L 260 410 Q 290 410 290 380 L 280 200 Z" />
          </clipPath>
        </defs>

        {/* Preenchimento de café */}
        <g clipPath="url(#cupClip)">
          {/* Café */}
          <rect
            x="115"
            y={200 + (210 - (210 * cupFillHeight) / 100)}
            width="165"
            height={210 * (cupFillHeight / 100)}
            fill="url(#coffeeFillGradient)"
            opacity="0.95"
          />

          {/* Espuma/Crema */}
          {foamHeight > 0 && (
            <>
              <rect
                x="115"
                y={200 + (210 - (210 * cupFillHeight) / 100) - 15}
                width="165"
                height="20"
                fill="#D4A574"
                opacity="0.6"
              />
              <use
                href="#foamPattern"
                x="115"
                y={200 + (210 - (210 * cupFillHeight) / 100) - 15}
                width="165"
                height="20"
              />
            </>
          )}
        </g>

        {/* Brilho na xícara */}
        <ellipse cx="135" cy="220" rx="20" ry="30" fill="#FFFFFF" opacity="0.4" />
      </g>

      {/* BULE - Fica acima/ao lado da xícara */}
      <g id="kettle">
        {/* Base do bule */}
        <ellipse cx="280" cy="180" rx="50" ry="55" fill="#D4652F" opacity="0.9" />

        {/* Corpo arredondado do bule */}
        <circle cx="280" cy="150" r="45" fill="#E67E3C" opacity="0.9" />

        {/* Destaque/reflexo no bule */}
        <ellipse cx="260" cy="130" rx="18" ry="25" fill="#F29856" opacity="0.6" />

        {/* Alça do bule */}
        <path
          d="M 295 95 Q 330 85 335 140"
          fill="none"
          stroke="#D4652F"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Bico do bule (spout) */}
        <g>
          {/* Tubo do bico */}
          <path
            d="M 235 170 Q 200 180 160 200"
            fill="none"
            stroke="#B8512C"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Dica do bico */}
          <circle cx="155" cy="205" r="8" fill="#B8512C" opacity="0.9" />
        </g>

        {/* Tampinha do bule */}
        <ellipse cx="280" cy="85" rx="20" ry="15" fill="#B8512C" opacity="0.95" />
        <rect x="270" y="75" width="20" height="10" fill="#8B4323" opacity="0.9" />
      </g>

      {/* GOTAS DE CAFÉ - Animadas quando derramando */}
      <g id="drips" opacity={Math.min(pourProgress, 1)}>
        {/* Gota 1 */}
        {pourProgress > 0.2 && (
          <circle
            cx={160 + pourProgress * 10}
            cy={200 + pourProgress * 40}
            r={3 - pourProgress * 1}
            fill="#8B6F47"
            opacity={1 - pourProgress * 0.5}
          />
        )}

        {/* Gota 2 */}
        {pourProgress > 0.4 && (
          <circle
            cx={170 + (pourProgress - 0.4) * 15}
            cy={210 + (pourProgress - 0.4) * 50}
            r={3 - (pourProgress - 0.4) * 1}
            fill="#8B6F47"
            opacity={1 - (pourProgress - 0.4) * 0.5}
          />
        )}

        {/* Gota 3 */}
        {pourProgress > 0.6 && (
          <circle
            cx={150 + (pourProgress - 0.6) * 20}
            cy={205 + (pourProgress - 0.6) * 45}
            r={3 - (pourProgress - 0.6) * 1}
            fill="#8B6F47"
            opacity={1 - (pourProgress - 0.6) * 0.5}
          />
        )}
      </g>

      {/* Texto - Respeitando prefers-reduced-motion */}
      <text
        x="200"
        y="450"
        textAnchor="middle"
        fontSize="14"
        fill="#8a7464"
        opacity="0.6"
        fontFamily="system-ui"
      >
        {Math.round(pourProgress * 100)}%
      </text>
    </svg>
  );
}

export default CoffeeSVG;
