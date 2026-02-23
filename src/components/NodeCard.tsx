'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { AppNode } from '@/data/apps'

interface NodeCardProps {
  app: AppNode
  isOpen: boolean
  position: 'below' | 'above'
}

export default function NodeCard({ app, isOpen, position }: NodeCardProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: position === 'below' ? -8 : 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: position === 'below' ? -8 : 8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute left-1/2 -translate-x-1/2 w-[300px] z-50
            ${position === 'below' ? 'top-full mt-3' : 'bottom-full mb-3'}`}
        >
          <div
            className="rounded-2xl border p-6"
            style={{
              background: 'rgba(15, 15, 30, 0.9)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderColor: `${app.glowColor}30`,
            }}
          >
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              {app.description}
            </p>

            <div className="mb-4">
              <span
                className="inline-block text-xs px-3 py-1 rounded-full"
                style={{
                  color: app.glowColor,
                  background: `${app.glowColor}20`,
                }}
              >
                {app.element}
              </span>
            </div>

            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm font-medium tracking-wide rounded-xl py-3 px-6 transition-colors"
              style={{
                color: app.glowColor,
                background: `${app.glowColor}18`,
                border: `1px solid ${app.glowColor}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${app.glowColor}30`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${app.glowColor}18`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              Open App &rarr;
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
