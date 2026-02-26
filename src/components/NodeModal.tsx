'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { AppNode } from '@/data/apps'

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
  'nestorlab': NestoriumIcon,
  'tidara': TidaraIcon,
  'binara': BinaraIcon,
}

const elementEmoji: Record<string, string> = {
  Earth: '\u{1F30D}',
  Water: '\u{1F30A}',
  Fire: '\u{1F525}',
  Air: '\u{1F32C}\uFE0F',
  Ether: '\u2728',
}

interface NodeModalProps {
  app: AppNode | null
  onClose: () => void
}

export default function NodeModal({ app, onClose }: NodeModalProps) {
  const Icon = app ? iconMap[app.id] : null
  const gc = app?.glowColor ?? '#fff'

  return (
    <AnimatePresence>
      {app && (
        <>
          {/* Dark backdrop — tap to close */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Centred card */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-[101] flex items-center justify-center px-6 pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div
              className="pointer-events-auto w-full max-w-[320px] relative"
              style={{
                background: 'rgba(10, 10, 30, 0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '32px 24px',
                boxShadow: `0 0 40px ${gc}15, 0 0 80px rgba(0, 0, 0, 0.5)`,
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute flex items-center justify-center cursor-pointer transition-all duration-200"
                style={{
                  top: '12px',
                  right: '12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '14px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'
                }}
              >
                &times;
              </button>

              {/* Icon with glow */}
              <div className="flex justify-center" style={{ marginBottom: '20px' }}>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: `radial-gradient(circle, ${gc}30 0%, transparent 70%)`,
                    animation: 'glowPulse 3s ease-in-out infinite',
                  }}
                >
                  {Icon && <Icon size={40} color={gc} />}
                </div>
              </div>

              {/* App name */}
              <h3
                className="text-center"
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'white',
                  letterSpacing: '0.02em',
                  marginBottom: '4px',
                  textShadow: `0 0 20px ${gc}30`,
                }}
              >
                {app.name}
              </h3>

              {/* Tagline */}
              <p
                className="text-center"
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
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
                  background: `${gc}40`,
                  margin: '0 auto 20px auto',
                }}
              />

              {/* Description */}
              <p
                className="text-center"
                style={{
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '24px',
                }}
              >
                {app.description}
              </p>

              {/* Element badge */}
              <div className="flex justify-center" style={{ marginBottom: '24px' }}>
                <span
                  className="inline-flex items-center"
                  style={{
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    background: `${gc}15`,
                    color: gc,
                    border: `1px solid ${gc}20`,
                  }}
                >
                  {elementEmoji[app.element] ?? ''} {app.element}
                </span>
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
                  border: `1px solid ${gc}25`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${gc}28`
                  e.currentTarget.style.boxShadow = `0 0 20px ${gc}20`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${gc}15`
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Open App &rarr;
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
