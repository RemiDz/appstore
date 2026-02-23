const R = 40 // radius for outer circles
const CX = 50
const CY = 50

// Flower of Life: centre circle + 6 surrounding circles
const circles = [
  { cx: CX, cy: CY }, // Centre
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
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <svg
        viewBox="-10 -10 120 120"
        className="w-[600px] h-[600px] max-w-[90vw] max-h-[90vh]"
        style={{
          opacity: 0.04,
          animation: 'geometryRotate 120s linear infinite',
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
