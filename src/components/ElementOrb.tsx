'use client'
import { useMemo } from 'react'
import type { ElementConfig } from '@/lib/elements'

interface ElementOrbProps {
  element: ElementConfig
  isActive: boolean
  isIdle: boolean
  mouseDistance: number
  onClick: () => void
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export default function ElementOrb({
  element,
  isActive,
  isIdle,
  mouseDistance,
  onClick,
}: ElementOrbProps) {
  const { orbBehaviour, particleStyle, color, glowColor, darkColor, symbol, name } = element

  // Proximity factor: 1.0 when far, up to 1.6 when touching
  const proximity = Math.max(0, Math.min(1, 1 - mouseDistance / 300))
  const glowScale = 1 + proximity * 0.6
  const orbScale = isActive ? 1.0 : 1 + proximity * 0.15

  // Generate particles with stable random values
  const particles = useMemo(() => {
    return Array.from({ length: particleStyle.count }, (_, i) => ({
      id: i,
      size: randomBetween(particleStyle.size[0], particleStyle.size[1]),
      life: randomBetween(particleStyle.life[0], particleStyle.life[1]),
      delay: Math.random() * 3,
      offsetX: (Math.random() - 0.5) * 40,
      drift: (Math.random() - 0.5) * 20,
    }))
  }, [particleStyle])

  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        opacity: isIdle ? 0.25 : 1,
        filter: isIdle ? 'blur(1px)' : 'none',
        transform: isIdle ? 'scale(0.9)' : 'scale(1)',
        transition: 'opacity 0.8s ease, filter 0.8s ease, transform 0.8s ease',
      }}
    >
      {/* Container for orb + particles */}
      <div
        className="relative"
        style={{
          width: 160,
          height: 160,
          cursor: 'none',
        }}
        onClick={onClick}
      >
        {/* Layer 1: Deep glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0.15) 0%, transparent 70%)`,
            filter: 'blur(20px)',
            transform: `scale(${glowScale})`,
            transition: 'transform 0.4s ease-out',
            animation: `glowPulse ${orbBehaviour.pulseSpeed}s ease-in-out infinite`,
            ['--glow-color' as string]: `${glowColor} 0.3)`,
          }}
        />

        {/* Layer 2: Orb body */}
        <div
          className="absolute rounded-full"
          style={{
            width: 80,
            height: 80,
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${orbScale})`,
            background: `radial-gradient(circle at 35% 35%,
              ${glowColor} 0.9) 0%,
              rgba(${hexToRgb(darkColor)}, 0.7) 40%,
              rgba(${hexToRgb(darkColor)}, 0.3) 70%,
              transparent 100%
            )`,
            boxShadow: `
              0 0 20px ${glowColor} 0.5),
              0 0 60px ${glowColor} 0.2),
              inset 0 0 20px rgba(255,255,255,0.05)
            `,
            animation: `breathe ${orbBehaviour.pulseSpeed}s ease-in-out infinite${
              orbBehaviour.wobble
                ? `, orbFloat ${orbBehaviour.wobbleSpeed}s ease-in-out infinite`
                : ''
            }`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
            zIndex: 3,
          }}
        />

        {/* Layer 3: Inner shimmer ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 90,
            height: 90,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: `1px solid ${glowColor} 0.3)`,
            boxShadow: `0 0 8px ${glowColor} 0.2)`,
            animation: `ringRotateReverse ${orbBehaviour.pulseSpeed * 8}s linear infinite`,
            zIndex: 2,
          }}
        />

        {/* Layer 4: Element symbol */}
        <div
          className="absolute font-mono pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 18,
            color: 'rgba(255,255,255,0.9)',
            textShadow: `0 0 12px ${glowColor} 0.8)`,
            zIndex: 4,
          }}
        >
          {symbol}
        </div>

        {/* Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              background:
                particleStyle.shape === 'ring'
                  ? 'transparent'
                  : `${glowColor} 0.7)`,
              border:
                particleStyle.shape === 'ring'
                  ? `1px solid ${glowColor} 0.5)`
                  : 'none',
              top: '50%',
              left: `calc(50% + ${p.offsetX}px)`,
              animation: `particleRise ${p.life}s ease-out ${p.delay}s infinite`,
              zIndex: 1,
            }}
          />
        ))}
      </div>

      {/* Layer 5: Element label */}
      <span
        className="font-mono mt-2"
        style={{
          fontSize: 9,
          textTransform: 'uppercase',
          letterSpacing: '0.25em',
          color: `${glowColor} 0.8)`,
          opacity: proximity > 0.1 || isActive ? 1 : 0.5,
          transition: 'opacity 0.4s ease',
        }}
      >
        {name}
      </span>
    </div>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
