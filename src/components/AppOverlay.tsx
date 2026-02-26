'use client'

import { useEffect, useState } from 'react'
import type { App } from '@/lib/apps'
import AppIcon from './AppIcon'

interface AppOverlayProps {
  app: App | null
  onClose: () => void
}

export default function AppOverlay({ app, onClose }: AppOverlayProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (app) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShow(true))
      })
    } else {
      setShow(false)
    }
  }, [app])

  function handleClose() {
    setShow(false)
    setTimeout(onClose, 400)
  }

  if (!app) return null

  return (
    <div className="fixed inset-0" style={{ zIndex: 100 }}>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(8,4,20,0.8)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          opacity: show ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(20,16,40,0.92)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          borderRadius: '28px 28px 0 0',
          padding: '16px 24px calc(env(safe-area-inset-bottom, 0px) + 24px)',
          transform: show ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div
            style={{
              width: '36px',
              height: '4px',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.2)',
            }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          {/* Icon with glow */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                inset: '-16px',
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(${app.accentRgb}, 0.3) 0%, transparent 70%)`,
              }}
            />
            <AppIcon id={app.id} size={56} color={app.accent} />
          </div>

          {/* Name + badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px', fontWeight: 500, color: '#fff' }}>{app.name}</span>
            {app.isPro && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: app.accent,
                  background: `rgba(${app.accentRgb}, 0.15)`,
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}
              >
                Pro {app.price}
              </span>
            )}
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.6)',
              textAlign: 'center',
              lineHeight: 1.6,
              maxWidth: '320px',
            }}
          >
            {app.description}
          </p>

          {/* CTA button */}
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              maxWidth: '320px',
              textAlign: 'center',
              padding: '14px 0',
              borderRadius: '14px',
              background: `linear-gradient(135deg, ${app.glow1}, ${app.accent})`,
              boxShadow: `0 4px 24px rgba(${app.accentRgb}, 0.3)`,
              color: '#fff',
              fontSize: '15px',
              fontWeight: 500,
              textDecoration: 'none',
              marginTop: '4px',
            }}
          >
            Open App →
          </a>
        </div>
      </div>
    </div>
  )
}
