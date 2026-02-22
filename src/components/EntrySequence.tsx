'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EntrySequence() {
  const [phase, setPhase] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Skip if already played this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('hw-entry-played')) {
      setDismissed(true)
      return
    }

    const timers = [
      setTimeout(() => setPhase(1), 500),    // Grid fades in
      setTimeout(() => setPhase(2), 1200),   // Label appears
      setTimeout(() => setPhase(3), 1800),   // Orbs bloom
      setTimeout(() => setPhase(4), 2800),   // Mandala ring
      setTimeout(() => setPhase(5), 3200),   // Instruction text
      setTimeout(() => {
        setDismissed(true)
        sessionStorage.setItem('hw-entry-played', '1')
      }, 4200),
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  if (dismissed) return null

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 10,
        background: '#05050F',
        pointerEvents: phase >= 3 ? 'none' : 'auto',
      }}
      animate={{
        opacity: phase >= 3 ? 0 : 1,
      }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      {/* Instruction text (phase 5) */}
      <AnimatePresence>
        {phase >= 5 && !dismissed && (
          <motion.p
            className="fixed font-display"
            style={{
              bottom: 60,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 14,
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(200,196,220, 0.25)',
              zIndex: 11,
              whiteSpace: 'nowrap',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            Choose your element
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
