'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { AppNode } from '@/data/apps'

interface NodeCardProps {
  app: AppNode
  isOpen: boolean
  position: 'below' | 'above'
  isMobile: boolean
  onClose: () => void
}

function CardContent({ app }: { app: AppNode }) {
  return (
    <div
      className="rounded-2xl border border-white/10 p-6"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      <p className="text-sm text-[#a0a0b8] leading-relaxed mb-5">
        {app.description}
      </p>

      {/* Element badge */}
      <div className="mb-4">
        <span
          className="inline-block text-xs px-3 py-1 rounded-full"
          style={{
            color: app.glowColor,
            background: `${app.glowColor}33`,
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
        className="block w-full md:w-auto text-center text-sm font-medium tracking-wide rounded-xl py-3 px-6 transition-colors"
        style={{
          color: app.glowColor,
          background: `${app.glowColor}26`,
          border: `1px solid ${app.glowColor}33`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `${app.glowColor}40`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = `${app.glowColor}26`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        Open App &rarr;
      </a>
    </div>
  )
}

export default function NodeCard({ app, isOpen, position, isMobile, onClose }: NodeCardProps) {
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mx-6 max-w-[320px]"
              style={{ width: 'calc(100vw - 48px)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <CardContent app={app} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // Desktop: absolute positioned relative to node
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
          <CardContent app={app} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
