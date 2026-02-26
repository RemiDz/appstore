interface AppIconProps {
  id: string
  size?: number
  color?: string
}

export default function AppIcon({ id, size = 48, color = 'white' }: AppIconProps) {
  const sw = 2
  const common = { width: size, height: size, fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }

  switch (id) {
    case 'nestorium':
      return (
        <svg {...common} viewBox="0 0 48 48" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 8v16" />
          <path d="M28 8v16" />
          <path d="M20 24a4 4 0 0 0 8 0" />
          <line x1="24" y1="28" x2="24" y2="40" />
          <path d="M14 14a12 12 0 0 0 0 16" />
          <path d="M34 14a12 12 0 0 1 0 16" />
        </svg>
      )

    case 'binara':
      return (
        <svg {...common} viewBox="0 0 48 48" fill="none">
          {/* Lucide Brain icon scaled to 48x48 */}
          <g transform="translate(6, 4) scale(1.5)" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55">
            <path d="M12 18V5" />
            <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
            <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
            <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
            <path d="M18 18a4 4 0 0 0 2-7.464" />
            <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
            <path d="M6 18a4 4 0 0 1-2-7.464" />
            <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
          </g>
          {/* Horizontal brainwave cutting through */}
          <path
            d="M4 26 L12 26 L16 18 L20 32 L24 20 L28 30 L32 22 L36 26 L44 26"
            stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            opacity="0.85"
          />
        </svg>
      )

    case 'overtone-singer':
      return (
        <svg {...common} viewBox="0 0 48 48" fill="none">
          {/* Harmonic partials — spectrogram of overtone singing */}
          {/* Fundamental — strongest, widest */}
          <path d="M8 42 L40 42" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="1" />
          {/* 2nd harmonic */}
          <path d="M10 35 L38 35" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
          {/* 3rd harmonic */}
          <path d="M13 28 L35 28" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
          {/* 4th harmonic */}
          <path d="M16 22 L32 22" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.38" />
          {/* 5th harmonic */}
          <path d="M19 16 L29 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.24" />
          {/* 6th harmonic — faintest, shortest */}
          <path d="M21 11 L27 11" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.14" />
          {/* Subtle resonance glow */}
          <circle cx="24" cy="28" r="4" fill={color} opacity="0.06">
            <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.08;0.02;0.08" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>
      )

    case 'sonarus':
      return (
        <svg {...common} viewBox="0 0 48 48" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="24" r="5" />
          <path d="M25 18a8 8 0 0 1 0 12" />
          <path d="M30 14a14 14 0 0 1 0 20" />
          <path d="M35 10a20 20 0 0 1 0 28" opacity="0.5" />
        </svg>
      )

    case 'lunar':
      return (
        <svg {...common} viewBox="0 0 48 48" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M30 10a14 14 0 1 0 0 28 10 10 0 0 1 0-28z" />
          <circle cx="12" cy="38" r="1.5" fill={color} stroke="none" />
          <circle cx="18" cy="40" r="1.5" fill={color} stroke="none" opacity="0.6" />
          <circle cx="24" cy="41" r="1.5" fill={color} stroke="none" opacity="0.3" />
        </svg>
      )

    case 'tidara':
      return (
        <svg {...common} viewBox="0 0 48 48" stroke={color} strokeWidth={sw} strokeLinecap="round">
          <path d="M8,18 C12,12 16,12 20,18 C24,24 28,24 32,18 C36,12 40,12 44,18" />
          <path d="M6,26 C10,21 14,21 18,26 C22,31 26,31 30,26 C34,21 38,21 42,26" opacity="0.6" />
          <path d="M10,34 C13,30 16,30 19,34 C22,38 25,38 28,34 C31,30 34,30 37,34" opacity="0.35" />
          <circle cx="20" cy="18" r="2" fill={color} stroke="none" />
        </svg>
      )

    case 'earth-pulse':
      return (
        <svg {...common} viewBox="0 0 48 48" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="24" r="12" />
          <ellipse cx="24" cy="24" rx="12" ry="5" />
          <ellipse cx="24" cy="24" rx="5" ry="12" />
          <path d="M6 24 Q12 18, 18 24 Q24 30, 30 24 Q36 18, 42 24" strokeWidth="1.5" />
        </svg>
      )

    default:
      return null
  }
}
