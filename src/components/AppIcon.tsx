import { UserSound } from '@phosphor-icons/react'

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
      return <UserSound size={size * 0.8} color={color} weight="light" />

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

    case 'astrara':
      return (
        <svg {...common} viewBox="0 0 48 48" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          {/* Ring behind planet */}
          <path d="M10 27 Q24 34 38 27" opacity="0.4" />
          {/* Planet body */}
          <circle cx="24" cy="24" r="8" />
          {/* Ring in front of planet */}
          <path d="M10 27 Q24 20 38 27" />
          {/* Star sparkle top-right */}
          <line x1="36" y1="10" x2="36" y2="15" />
          <line x1="33.5" y1="12.5" x2="38.5" y2="12.5" />
          {/* Star sparkle bottom-left */}
          <line x1="11" y1="33" x2="11" y2="37" />
          <line x1="9" y1="35" x2="13" y2="35" />
          {/* Small dot star */}
          <circle cx="38" cy="32" r="1" fill={color} stroke="none" />
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

    case 'airas':
      return (
        <svg {...common} viewBox="0 0 48 48" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          {/* Left lung */}
          <path d="M20 14c-2 0-4 2-5 5-2 4-3 8-3 12a4 4 0 0 0 4 4h2a2 2 0 0 0 2-2V14z" />
          {/* Right lung */}
          <path d="M28 14c2 0 4 2 5 5 2 4 3 8 3 12a4 4 0 0 1-4 4h-2a2 2 0 0 1-2-2V14z" />
          {/* Trachea */}
          <path d="M24 8v6" />
          {/* Bronchi */}
          <path d="M24 14l-4 4" />
          <path d="M24 14l4 4" />
        </svg>
      )

    default:
      return null
  }
}
