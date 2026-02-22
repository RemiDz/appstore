'use client'
import { useEffect, useState } from 'react'

interface TrailPoint {
  x: number
  y: number
  id: number
}

export default function CursorTrail() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if ('ontouchstart' in window) {
      setIsTouch(true)
      return
    }

    let id = 0
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setTrail((prev) => [
        { x: e.clientX, y: e.clientY, id: id++ },
        ...prev.slice(0, 6),
      ])
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Primary cursor dot */}
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'rgba(200,196,220,0.9)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 8px rgba(200,196,220,0.5)',
        }}
      />

      {/* Trail particles */}
      {trail.map((point, i) => (
        <div
          key={point.id}
          style={{
            position: 'fixed',
            left: point.x,
            top: point.y,
            width: Math.max(1, 4 - i * 0.4),
            height: Math.max(1, 4 - i * 0.4),
            borderRadius: '50%',
            background: `rgba(200,196,220, ${Math.max(0, 0.4 - i * 0.05)})`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        />
      ))}
    </>
  )
}
