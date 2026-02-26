'use client'

import type { App } from '@/lib/apps'
import AppIcon from './AppIcon'

interface AppCardProps {
  app: App
  onClick: () => void
  visible: boolean
  delay: number
  index: number
}

export default function AppCard({ app, onClick, visible, delay, index }: AppCardProps) {
  return (
    <button
      onClick={onClick}
      className="hw-card hw-grid-card"
      style={{
        '--glow1': app.glow1,
        '--glow2': app.glow2,
        '--accent': app.accent,
        '--accent-rgb': app.accentRgb,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.65) translateY(30px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
      } as React.CSSProperties}
    >
      {/* Icon with glow */}
      <div style={{ position: 'relative', marginBottom: '8px' }}>
        <div
          className="hw-icon-glow"
          style={{
            position: 'absolute',
            inset: '-16px',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${app.accentRgb}, 0.30) 0%, transparent 70%)`,
            animation: 'iconGlow 3.5s ease-in-out infinite',
            animationDelay: `${index * 0.5}s`,
          }}
        />
        <AppIcon id={app.id} size={36} color={app.accent} />
      </div>

      {/* Name */}
      <div
        className="hw-card-name"
        style={{
          fontSize: '12px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.88)',
          lineHeight: 1.2,
          transition: 'color 0.25s ease',
        }}
      >
        {app.name}
      </div>

      {/* Pro badge */}
      {app.isPro && (
        <div
          style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: app.accent,
            background: `linear-gradient(135deg, rgba(${app.accentRgb}, 0.2), rgba(${app.accentRgb}, 0.1))`,
            border: `1px solid rgba(${app.accentRgb}, 0.25)`,
            padding: '3px 10px',
            borderRadius: '20px',
            lineHeight: 1.3,
          }}
        >
          Pro
        </div>
      )}
    </button>
  )
}
