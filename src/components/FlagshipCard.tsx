'use client'

import type { App } from '@/lib/apps'
import AppIcon from './AppIcon'

interface FlagshipCardProps {
  app: App
  onClick: () => void
  visible: boolean
}

export default function FlagshipCard({ app, onClick, visible }: FlagshipCardProps) {
  return (
    <button
      onClick={onClick}
      className="hw-card hw-flagship"
      style={{
        '--glow1': app.glow1,
        '--glow2': app.glow2,
        '--accent': app.accent,
        '--accent-rgb': app.accentRgb,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(16px)',
        transition: 'opacity 0.7s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
      } as React.CSSProperties}
    >
      {/* Icon with pulsing glow */}
      <div className="hw-icon-wrap" style={{ position: 'relative' }}>
        <div
          className="hw-icon-glow"
          style={{
            position: 'absolute',
            inset: '-24px',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${app.accentRgb}, 0.40) 0%, transparent 70%)`,
            animation: 'iconGlow 3.5s ease-in-out infinite',
          }}
        />
        <AppIcon id={app.id} size={44} color={app.accent} />
      </div>

      {/* Text */}
      <div style={{ textAlign: 'left', marginLeft: '14px', flex: 1 }}>
        <div style={{ fontSize: '16px', fontWeight: 500, color: '#fff', lineHeight: 1.2 }}>
          {app.name}
        </div>
        <div style={{ fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
          {app.tagline}
        </div>
      </div>
    </button>
  )
}
