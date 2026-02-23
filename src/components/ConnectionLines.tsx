import type { Edge } from '@/lib/utils'

interface ConnectionLinesProps {
  edges: Edge[]
}

export default function ConnectionLines({ edges }: ConnectionLinesProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full hidden md:block pointer-events-none"
      preserveAspectRatio="none"
      style={{ zIndex: 0 }}
    >
      {edges.map((edge) => {
        const mx = (edge.fromPos.x + edge.toPos.x) / 2
        const my = (edge.fromPos.y + edge.toPos.y) / 2
        // Offset control point perpendicular to the line for a slight curve
        const dx = edge.toPos.x - edge.fromPos.x
        const dy = edge.toPos.y - edge.fromPos.y
        const len = Math.hypot(dx, dy)
        const offsetX = len > 0 ? (-dy / len) * 3 : 0
        const offsetY = len > 0 ? (dx / len) * 3 : 0

        return (
          <path
            key={`${edge.from}-${edge.to}`}
            d={`M ${edge.fromPos.x} ${edge.fromPos.y} Q ${mx + offsetX} ${my + offsetY}, ${edge.toPos.x} ${edge.toPos.y}`}
            fill="none"
            stroke="white"
            strokeOpacity={0.08}
            strokeWidth={0.15}
            strokeDasharray="0.8 0.6"
            style={{ animation: 'dashFlow 4s linear infinite' }}
          />
        )
      })}
    </svg>
  )
}
