'use client'
import { pentagonAngles, type ElementName } from '@/lib/elements'

export default function MandalaRing() {
  const size = 'min(90vw, 90vh)'
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

  // Pentagram (connecting non-adjacent vertices: 0→2→4→1→3→0)
  const pentagramOrder = [0, 2, 4, 1, 3]
  const pentagramPath = pentagramOrder
    .map((idx, i) => {
      const p = pentPoints[idx]
      return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    })
    .join(' ') + ' Z'

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        width: size,
        height: size,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
      }}
    >
      {/* Outer ring — slowly rotates */}
      <svg
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="absolute inset-0 w-full h-full"
        style={{ animation: 'ringRotate 120s linear infinite' }}
      >
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
      </svg>

      {/* Inner ring — counter-rotates */}
      <svg
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="absolute inset-0 w-full h-full"
        style={{ animation: 'ringRotateReverse 80s linear infinite' }}
      >
        <circle
          cx={cx} cy={cy} r={middleR}
          fill="none"
          stroke="rgba(200,196,220, 0.04)"
          strokeWidth="1"
        />
        {/* Pentagram lines */}
        <path
          d={pentagramPath}
          fill="none"
          stroke="rgba(200,196,220, 0.05)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
      </svg>
    </div>
  )
}
