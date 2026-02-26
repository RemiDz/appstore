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
        <svg {...common} viewBox="0 0 48 48">
          {/* Brainwave zigzag pulse */}
          <path
            d="M24 4 L24 14 L18 20 L30 28 L24 34 L24 44"
            stroke={color}
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Emanation ring */}
          <circle cx="24" cy="24" r="6" fill="none" stroke={color} strokeWidth="0.8">
            <animate attributeName="r" values="6;12;6" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Centre pulse */}
          <circle cx="24" cy="24" fill={color}>
            <animate attributeName="r" values="2.5;4;2.5" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Endpoint dots */}
          <circle cx="24" cy="4" r="2" fill={color} opacity="0.5" />
          <circle cx="24" cy="44" r="2" fill={color} opacity="0.5" />
        </svg>
      )

    case 'overtone-singer':
      return (
        <svg {...common} viewBox="0 0 48 48" fill="none">
          {/* Face profile — single stroke, facing right */}
          <path
            d="M22 8 C22 8, 16 10, 16 16 C16 20, 18 22, 20 23 L18 25 C18 25, 16 27, 17 29 L20 31 C20 31, 18 36, 18 40"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Mouth opening — small gap showing singing */}
          <path
            d="M20 25.5 L23 24.5"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Harmonic waves from mouth */}
          <path d="M26 22 Q30 25, 26 28" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
          <path d="M30 19 Q36 25, 30 31" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
          <path d="M34 16 Q42 25, 34 34" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
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
