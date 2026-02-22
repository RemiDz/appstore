'use client'
import { motion } from 'framer-motion'
import { pentagonAngles, type ElementName } from '@/lib/elements'

interface MandalaRingProps {
  parallaxOffset?: { x: number; y: number }
}

export default function MandalaRing({ parallaxOffset = { x: 0, y: 0 } }: MandalaRingProps) {
  const svgSize = 400
  const cx = svgSize / 2
  const cy = svgSize / 2
  const outerR = 190
  const middleR = 170
  const pentR = 130

  // Pentagon vertices
  const pentPoints = (Object.entries(pentagonAngles) as [ElementName, number][]).map(
    ([, angleDeg]) => {
      const rad = (angleDeg * Math.PI) / 180
      return {
        x: cx + pentR * Math.cos(rad),
        y: cy + pentR * Math.sin(rad),
      }
    }
  )

  // 12 tick marks
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 12
    const x1 = cx + (outerR - 5) * Math.cos(angle)
    const y1 = cy + (outerR - 5) * Math.sin(angle)
    const x2 = cx + outerR * Math.cos(angle)
    const y2 = cy + outerR * Math.sin(angle)
    return { x1, y1, x2, y2 }
  })

  // Full pentagram — connect every vertex to every other (all 10 edges)
  const pentagramLines: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (let i = 0; i < pentPoints.length; i++) {
    for (let j = i + 1; j < pentPoints.length; j++) {
      pentagramLines.push({
        x1: pentPoints[i].x,
        y1: pentPoints[i].y,
        x2: pentPoints[j].x,
        y2: pentPoints[j].y,
      })
    }
  }

  // Pentagon path for faint fill
  const pentagonPath = pentPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ') + ' Z'

  return (
    <div
      className="pointer-events-none"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginLeft: 'calc(-1 * min(40vw, 40vh))',
        marginTop: 'calc(-1 * min(40vw, 40vh))',
        width: 'min(80vw, 80vh)',
        height: 'min(80vw, 80vh)',
        zIndex: 1,
        transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Main rotating SVG — slow 120s rotation via Framer Motion */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        style={{ transformOrigin: '50% 50%', position: 'absolute', inset: 0 }}
      >
        {/* Outer ring */}
        <circle
          cx={cx} cy={cy} r={outerR}
          fill="none"
          stroke="rgba(200,196,220, 0.06)"
          strokeWidth="1"
        />
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke="rgba(200,196,220, 0.08)"
            strokeWidth="1"
          />
        ))}

        {/* Inner ring */}
        <circle
          cx={cx} cy={cy} r={middleR}
          fill="none"
          stroke="rgba(200,196,220, 0.04)"
          strokeWidth="1"
        />

        {/* Faint pentagon fill */}
        <path
          d={pentagonPath}
          fill="rgba(200,196,220, 0.01)"
          stroke="none"
        />
        {/* Full pentagram connecting lines */}
        {pentagramLines.map((l, i) => (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(200,196,220, 0.06)"
            strokeWidth="0.4"
            strokeDasharray="3 12"
          />
        ))}
      </motion.svg>
    </div>
  )
}
