'use client'

import { useCallback, useEffect } from 'react'
import type { AppData } from '@/data/apps'

import EarthPulseIcon from './icons/EarthPulseIcon'
import LunarIcon from './icons/LunarIcon'
import SonarusIcon from './icons/SonarusIcon'
import OvertoneIcon from './icons/OvertoneIcon'
import NestoriumIcon from './icons/NestoriumIcon'
import TidaraIcon from './icons/TidaraIcon'
import BinaraIcon from './icons/BinaraIcon'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; color?: string }>> = {
  'earth-pulse': EarthPulseIcon,
  'lunar-practitioner': LunarIcon,
  'sonarus': SonarusIcon,
  'overtone-singer': OvertoneIcon,
  'nestorium': NestoriumIcon,
  'tidara': TidaraIcon,
  'binara': BinaraIcon,
}

const elementNames: Record<string, string> = {
  earth: 'Earth',
  water: 'Water',
  fire: 'Fire',
  air: 'Air',
  ether: 'Ether',
}

interface AppRevealProps {
  app: AppData | null
  onClose: () => void
}

export default function AppReveal({ app, onClose }: AppRevealProps) {
  const Icon = app ? iconMap[app.id] : null
  const gc = app?.accentColor ?? '#fff'
  const isOpen = app !== null

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const handleBackdropClick = useCallback(() => onClose(), [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] transition-all duration-300"
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        onClick={handleBackdropClick}
      />

      {/* Card */}
      <div
        className="absolute inset-0 flex items-center justify-center px-8 transition-transform duration-300"
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(12px)',
        }}
      >
        {app && (
          <div
            className="relative w-full max-w-[300px]"
            style={{
              background: 'rgba(10, 10, 30, 0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '32px 24px',
              boxShadow: `0 0 40px ${gc}12, 0 0 80px rgba(0, 0, 0, 0.5)`,
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute flex items-center justify-center cursor-pointer transition-colors duration-200"
              style={{
                top: '12px',
                right: '12px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '13px',
              }}
            >
              &times;
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: '72px',
                  height: '72px',
                  background: `radial-gradient(circle, ${gc}25 0%, transparent 70%)`,
                }}
              >
                {Icon && <Icon size={40} color={gc} />}
              </div>
            </div>

            {/* Name */}
            <h3
              className="text-center"
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: 'white',
                letterSpacing: '0.02em',
                marginBottom: '4px',
                textShadow: `0 0 20px ${gc}25`,
              }}
            >
              {app.name}
            </h3>

            {/* Tagline */}
            <p
              className="text-center"
              style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.4)',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              {app.tagline}
            </p>

            {/* Divider */}
            <div
              style={{
                width: '40px',
                height: '1px',
                background: `${gc}35`,
                margin: '0 auto 20px auto',
              }}
            />

            {/* Element + Pro badges */}
            <div className="flex justify-center flex-wrap gap-2 mb-6">
              <span
                className="inline-flex items-center"
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '5px 12px',
                  borderRadius: '100px',
                  background: `${gc}12`,
                  color: gc,
                  border: `1px solid ${gc}18`,
                }}
              >
                {elementNames[app.element] ?? app.element}
              </span>
              {app.isPro && (
                <span
                  className="inline-flex items-center"
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    padding: '5px 12px',
                    borderRadius: '100px',
                    background: `${gc}12`,
                    color: gc,
                    border: `1px solid ${gc}18`,
                  }}
                >
                  Pro &middot; {app.price}
                </span>
              )}
            </div>

            {/* Open App button */}
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center no-underline transition-all duration-200"
              style={{
                padding: '14px 24px',
                borderRadius: '14px',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                background: `${gc}15`,
                color: gc,
                border: `1px solid ${gc}22`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${gc}28`
                e.currentTarget.style.boxShadow = `0 0 20px ${gc}18`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${gc}15`
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Open App &rarr;
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
