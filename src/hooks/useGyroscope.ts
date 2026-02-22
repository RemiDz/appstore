'use client'
import { useState, useEffect } from 'react'

interface GyroscopeData {
  x: number    // tilt left/right — range approx -30 to 30
  y: number    // tilt forward/back — range approx -30 to 30
}

export function useGyroscope(): GyroscopeData {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.DeviceOrientationEvent) return

    let cleanup: (() => void) | undefined

    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission()
          if (permission !== 'granted') return
        } catch {
          return
        }
      }

      const handler = (e: DeviceOrientationEvent) => {
        // gamma = left/right tilt (-90 to 90)
        // beta  = forward/back tilt (-180 to 180)
        const x = Math.max(-30, Math.min(30, e.gamma || 0))
        const y = Math.max(-30, Math.min(30, (e.beta || 0) - 45)) // offset 45° for natural hold
        setTilt(prev => ({
          x: prev.x + (x - prev.x) * 0.08,  // smooth lerp
          y: prev.y + (y - prev.y) * 0.08,
        }))
      }

      window.addEventListener('deviceorientation', handler)
      cleanup = () => window.removeEventListener('deviceorientation', handler)
    }

    requestPermission()

    return () => cleanup?.()
  }, [])

  return tilt
}
