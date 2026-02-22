'use client'
import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { elements, pentagonAngles, type ElementName } from '@/lib/elements'
import { apps } from '@/lib/apps'
import { useGyroscope } from '@/hooks/useGyroscope'
import MandalaRing from './MandalaRing'
import ElementOrb from './ElementOrb'
import ElementReveal from './ElementReveal'

export default function ElementalMandala() {
  const [activeElement, setActiveElement] = useState<ElementName | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [centrePos, setCentrePos] = useState({ x: 0, y: 0 })
  const [radius, setRadius] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const gyro = useGyroscope()

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
    setIsMobile('ontouchstart' in window)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // iOS gyroscope permission — trigger on first touch
  useEffect(() => {
    const handler = async () => {
      if (typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
        try {
          await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission()
        } catch {
          // permission denied — gyro will stay at 0,0
        }
      }
    }
    window.addEventListener('touchstart', handler, { once: true })
    return () => window.removeEventListener('touchstart', handler)
  }, [])

  const handleClose = useCallback(() => setActiveElement(null), [])

  // Don't render until we have real dimensions
  if (centrePos.x === 0) return null

  // Parallax offset — mobile: gyroscope, desktop: mouse position
  const parallax = isMobile
    ? { x: gyro.x * 10, y: gyro.y * 10 }
    : {
        x: ((mousePos.x - centrePos.x) / (centrePos.x || 1)) * 15,
        y: ((mousePos.y - centrePos.y) / (centrePos.y || 1)) * 15,
      }

  // MandalaRing gets a smaller parallax multiplier (mid-layer)
  const ringParallax = { x: parallax.x * 0.5, y: parallax.y * 0.5 }

  // Calculate orb positions with parallax offset
  const orbData = (Object.entries(pentagonAngles) as [ElementName, number][]).map(
    ([name, angleDeg]) => {
      const rad = (angleDeg * Math.PI) / 180
      const x = centrePos.x + radius * Math.cos(rad) + parallax.x
      const y = centrePos.y + radius * Math.sin(rad) + parallax.y
      const dx = mousePos.x - x
      const dy = mousePos.y - y
      const dist = Math.sqrt(dx * dx + dy * dy)
      return { name, x, y, dist }
    }
  )

  return (
    <div className="fixed inset-0" style={{ zIndex: 2 }}>
      <MandalaRing parallaxOffset={ringParallax} />

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
