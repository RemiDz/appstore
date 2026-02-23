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
          className={`absolute left-1/2 -translate-x-1/2 w-[280px] z-30
            ${position === 'below' ? 'top-full mt-3' : 'bottom-full mb-3'}
            md:block`}
          style={{ position: 'absolute' }}
        >
          <div
            className="rounded-xl border border-white/10 p-5"
            style={{
              background: 'rgba(13, 15, 30, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <p className="text-sm text-[#a0a0b8] leading-relaxed mb-4">
              {app.description}
            </p>

            <div className="flex items-center justify-between">
              <span
                className="text-xs px-2.5 py-1 rounded-full border border-white/10"
                style={{ color: app.glowColor }}
              >
                {app.element}
              </span>

              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white hover:text-white/80 transition-colors"
              >
                Open App &rarr;
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
