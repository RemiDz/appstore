'use client'
import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { elements, pentagonAngles, type ElementName } from '@/lib/elements'
import { apps } from '@/lib/apps'
import MandalaRing from './MandalaRing'
import ElementOrb from './ElementOrb'
import ElementReveal from './ElementReveal'

export default function ElementalMandala() {
  const [activeElement, setActiveElement] = useState<ElementName | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [centrePos, setCentrePos] = useState({ x: 0, y: 0 })
  const [radius, setRadius] = useState(0)

  // Track mouse
  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  // Centre point + radius — must init on mount and update on resize
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      setCentrePos({ x: w / 2, y: h / 2 })
      setRadius(Math.min(w, h) * 0.28)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleClose = useCallback(() => setActiveElement(null), [])

  // Don't render until we have real dimensions
  if (centrePos.x === 0) return null

  // Calculate orb positions
  const orbData = (Object.entries(pentagonAngles) as [ElementName, number][]).map(
    ([name, angleDeg]) => {
      const rad = (angleDeg * Math.PI) / 180
      const x = centrePos.x + radius * Math.cos(rad)
      const y = centrePos.y + radius * Math.sin(rad)
      const dx = mousePos.x - x
      const dy = mousePos.y - y
      const dist = Math.sqrt(dx * dx + dy * dy)
      return { name, x, y, dist }
    }
  )

  return (
    <div className="fixed inset-0" style={{ zIndex: 2 }}>
      <MandalaRing />

      {orbData.map(({ name, x, y, dist }) => (
        <div
          key={name}
          style={{
            position: 'fixed',
            left: x,
            top: y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <ElementOrb
            element={elements[name]}
            isActive={activeElement === name}
            isIdle={activeElement !== null && activeElement !== name}
            mouseDistance={dist}
            onClick={() =>
              setActiveElement(activeElement === name ? null : name)
            }
          />
        </div>
      ))}

      {/* Element reveal overlay */}
      <AnimatePresence>
        {activeElement && (
          <ElementReveal
            key={activeElement}
            app={apps.find((a) => a.element === activeElement)!}
            element={elements[activeElement]}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
