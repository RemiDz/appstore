'use client'
import type { ElementConfig } from '@/lib/elements'

interface ElementSymbolProps {
  element: ElementConfig
  size?: number
}

export default function ElementSymbol({ element, size = 72 }: ElementSymbolProps) {
  const color = element.color
  const s = size

  switch (element.name) {
    case 'Earth':
      return (
        <svg viewBox="0 0 100 100" width={s} height={s}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3"/>
          <rect x="22" y="22" width="56" height="56" fill="none" stroke={color} strokeWidth="1.2" opacity="0.7" rx="2"/>
          <rect x="30" y="30" width="40" height="40" fill="none" stroke={color} strokeWidth="1" opacity="0.5" transform="rotate(45 50 50)" rx="1"/>
          <circle cx="50" cy="50" r="3" fill={color} opacity="0.9"/>
          <circle cx="50" cy="20" r="1.5" fill={color} opacity="0.5"/>
          <circle cx="80" cy="50" r="1.5" fill={color} opacity="0.5"/>
          <circle cx="50" cy="80" r="1.5" fill={color} opacity="0.5"/>
          <circle cx="20" cy="50" r="1.5" fill={color} opacity="0.5"/>
        </svg>
      )

    case 'Water':
      return (
        <svg viewBox="0 0 100 100" width={s} height={s}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3"/>
          <circle cx="50" cy="50" r="36" fill="none" stroke={color} strokeWidth="0.4" opacity="0.2"/>
          <circle cx="50" cy="50" r="27" fill="none" stroke={color} strokeWidth="0.4" opacity="0.2"/>
          <polygon points="50,72 24,28 76,28" fill="none" stroke={color} strokeWidth="1.5" opacity="0.85" strokeLinejoin="round"/>
          <polygon points="50,60 33,36 67,36" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" strokeLinejoin="round"/>
          <circle cx="50" cy="50" r="2.5" fill={color} opacity="0.9"/>
        </svg>
      )

    case 'Fire':
      return (
        <svg viewBox="0 0 100 100" width={s} height={s}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3"/>
          <polygon points="50,20 76,72 24,72" fill="none" stroke={color} strokeWidth="1.5" opacity="0.9" strokeLinejoin="round"/>
          <line x1="34" y1="58" x2="66" y2="58" stroke={color} strokeWidth="1.2" opacity="0.6"/>
          <polygon points="50,34 64,60 36,60" fill="none" stroke={color} strokeWidth="0.7" opacity="0.35" strokeLinejoin="round"/>
          <circle cx="50" cy="20" r="2.5" fill={color} opacity="0.9"/>
          <circle cx="50" cy="52" r="2" fill={color} opacity="0.6"/>
        </svg>
      )

    case 'Air':
      return (
        <svg viewBox="0 0 100 100" width={s} height={s}>
          <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3"/>
          <polygon points="50,18 76,64 24,64" fill="none" stroke={color} strokeWidth="1.2" opacity="0.75" strokeLinejoin="round"/>
          <polygon points="50,82 24,36 76,36" fill="none" stroke={color} strokeWidth="1.2" opacity="0.75" strokeLinejoin="round"/>
          <circle cx="50" cy="50" r="7" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5"/>
          <circle cx="50" cy="50" r="2.5" fill={color} opacity="0.9"/>
        </svg>
      )

    case 'Ether': {
      const spokes = [0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        return {
          x1: 50 + 20 * Math.cos(rad),
          y1: 50 + 20 * Math.sin(rad),
          x2: 50 + 42 * Math.cos(rad),
          y2: 50 + 42 * Math.sin(rad),
        }
      })
      return (
        <svg viewBox="0 0 100 100" width={s} height={s}>
          <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
          <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3"/>
          <circle cx="50" cy="50" r="18" fill="none" stroke={color} strokeWidth="0.5" opacity="0.35"/>
          {spokes.map((sp, i) => (
            <line key={i} x1={sp.x1} y1={sp.y1} x2={sp.x2} y2={sp.y2}
              stroke={color} strokeWidth="0.5" opacity="0.25"/>
          ))}
          <circle cx="50" cy="50" r="8" fill="none" stroke={color} strokeWidth="0.8" opacity="0.6"/>
          <circle cx="50" cy="50" r="4" fill={color} opacity="1"/>
        </svg>
      )
    }

    default:
      return null
  }
}
