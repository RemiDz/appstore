const R = 20
const CX = 50
const CY = 50

const circles = [
  // Centre
  { cx: CX, cy: CY },
  // Ring 1 — 6 circles at distance R
  ...Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 * Math.PI) / 180
    return { cx: CX + R * Math.cos(a), cy: CY + R * Math.sin(a) }
  }),
  // Ring 2 — 6 circles at distance R*sqrt(3), 30° offset
  ...Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 + 30) * Math.PI) / 180
    const r2 = R * Math.sqrt(3)
    return { cx: CX + r2 * Math.cos(a), cy: CY + r2 * Math.sin(a) }
  }),
  // Ring 3 — 6 circles at distance 2R
  ...Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 * Math.PI) / 180
    return { cx: CX + 2 * R * Math.cos(a), cy: CY + 2 * R * Math.sin(a) }
  }),
]

export default function SacredGeometry() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <svg
        viewBox="-10 -10 120 120"
        className="opacity-[0.025] md:opacity-[0.035]"
        style={{
          width: '150vw',
          height: '150vw',
          maxWidth: 'none',
          animation: 'geometryRotate 120s linear infinite',
          willChange: 'transform',
        }}
      >
        {circles.map((c, i) => (
          <circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={R}
            fill="none"
            stroke="white"
            strokeWidth={0.25}
          />
        ))}
      </svg>
    </div>
  )
}
