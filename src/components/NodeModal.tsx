'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { AppNode } from '@/data/apps'

import EarthPulseIcon from './icons/EarthPulseIcon'
import LunarIcon from './icons/LunarIcon'
import SonarusIcon from './icons/SonarusIcon'
import OvertoneIcon from './icons/OvertoneIcon'
import NestorLabIcon from './icons/NestorLabIcon'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; color?: string }>> = {
  'earth-pulse': EarthPulseIcon,
  'lunar-practitioner': LunarIcon,
  'sonarus': SonarusIcon,
  'overtone-singer': OvertoneIcon,
  'nestorlab': NestorLabIcon,
}

interface NodeModalProps {
  app: AppNode | null
  onClose: () => void
}

export default function NodeModal({ app, onClose }: NodeModalProps) {
  const Icon = app ? iconMap[app.id] : null

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
              className="pointer-events-auto w-full max-w-[320px] rounded-2xl border p-6"
              style={{
                background: 'rgba(15, 15, 30, 0.9)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderColor: `${app.glowColor}30`,
              }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${app.glowColor}25 0%, transparent 70%)`,
                  }}
                >
                  {Icon && <Icon size={40} color={app.glowColor} />}
                </div>
              </div>

              {/* App name */}
              <h3 className="text-white text-lg font-medium text-center mb-1">
                {app.name}
              </h3>

              {/* Tagline */}
              <p className="text-white/50 text-sm text-center mb-4">
                {app.tagline}
              </p>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                {app.description}
              </p>

              {/* Element badge */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${app.glowColor}20`,
                    color: app.glowColor,
                  }}
                >
                  {app.element}
                </span>
              </div>

              {/* Open App button */}
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 px-6 rounded-xl text-sm font-medium tracking-wide transition-all duration-200"
                style={{
                  backgroundColor: `${app.glowColor}18`,
                  color: app.glowColor,
                  border: `1px solid ${app.glowColor}30`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${app.glowColor}30`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${app.glowColor}18`
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
