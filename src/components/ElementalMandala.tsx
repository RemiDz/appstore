'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { elements, pentagonAngles, type ElementName } from '@/lib/elements'
import { apps } from '@/lib/apps'
import MandalaRing from './MandalaRing'
import ElementOrb from './ElementOrb'
import ElementReveal from './ElementReveal'

export default function ElementalMandala() {
  const [activeElement, setActiveElement] = useState<ElementName | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 })

  // Track mouse
  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  // Track dimensions
  useEffect(() => {
    const update = () => {
      setDimensions({ w: window.innerWidth, h: window.innerHeight })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const cx = dimensions.w / 2
  const cy = dimensions.h / 2
  const radius = Math.min(dimensions.w, dimensions.h) * 0.28

  const handleClose = useCallback(() => setActiveElement(null), [])

  // Calculate orb positions
  const orbData = (Object.entries(pentagonAngles) as [ElementName, number][]).map(
    ([name, angleDeg]) => {
      const rad = (angleDeg * Math.PI) / 180
      const x = cx + radius * Math.cos(rad)
      const y = cy + radius * Math.sin(rad)
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
            position: 'absolute',
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
