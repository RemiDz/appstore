const R = 40
const CX = 50
const CY = 50

const circles = [
  { cx: CX, cy: CY },
  ...Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 * Math.PI) / 180
    return {
      cx: CX + R * Math.cos(angle),
      cy: CY + R * Math.sin(angle),
    }
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
        className="opacity-[0.04] md:opacity-[0.06]"
        style={{
          width: '140vw',
          height: '140vw',
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
            strokeWidth={0.3}
          />
        ))}
      </svg>
    </div>
  )
}
