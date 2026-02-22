'use client'
import { motion } from 'framer-motion'
import type { ElementConfig } from '@/lib/elements'
import ElementSymbol from './ElementSymbol'
import ElementalAmbience from './ElementalAmbience'

interface ElementOrbProps {
  element: ElementConfig
  isActive: boolean
  isIdle: boolean
  mouseDistance: number
  onClick: () => void
}

export default function ElementOrb({
  element,
  isActive,
  isIdle,
  mouseDistance,
  onClick,
}: ElementOrbProps) {
  const isVeryNear = mouseDistance < 60

  // Proximity glow intensity: 0 (far) to 1 (touching)
  const glowIntensity = Math.max(0, 1 - mouseDistance / 120)

  return (
    <motion.div
      onClick={onClick}
      animate={{
        opacity: isIdle ? 0.2 : 1,
        scale: isIdle ? 0.85 : isVeryNear ? 1.12 : 1,
        filter: isIdle ? 'blur(1px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        width: 120,
        height: 120,
        cursor: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Outer glow layer — expands on proximity */}
      <div
        style={{
          position: 'absolute',
          inset: -20,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${element.glowColor} ${0.08 + glowIntensity * 0.12}) 0%, transparent 70%)`,
          filter: `blur(${16 + glowIntensity * 20}px)`,
          transition: 'all 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Rotating outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `1px solid ${element.glowColor} 0.15)`,
          boxShadow: `0 0 8px ${element.glowColor} 0.1)`,
        }}
      />

      {/* Counter-rotating inner ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 12,
          borderRadius: '50%',
          border: `1px solid ${element.glowColor} 0.2)`,
        }}
      />

      {/* Elemental ambience canvas — behind the symbol */}
      <ElementalAmbience element={element} size={80} />

      {/* Sacred geometry SVG symbol — breathing */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{
          duration: element.orbBehaviour.pulseSpeed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          filter: `drop-shadow(0 0 8px ${element.color}) drop-shadow(0 0 20px ${element.glowColor} 0.4))`,
          zIndex: 2,
          position: 'relative',
        }}
      >
        <ElementSymbol element={element} size={72} />
      </motion.div>

      {/* Element label */}
      <div
        style={{
          position: 'absolute',
          bottom: -24,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: element.color,
          opacity: 0.8,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {element.name}
      </div>

      {/* Particle wisps */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 2,
            height: 2,
            borderRadius: '50%',
            background: element.color,
            top: '50%',
            left: '50%',
            opacity: 0,
            animation: `particleRise ${1.5 + i * 0.4}s ease-out ${i * 0.3}s infinite`,
            transform: `translateX(${Math.cos((i * 60 * Math.PI) / 180) * 20}px)`,
          }}
        />
      ))}
    </motion.div>
  )
}
