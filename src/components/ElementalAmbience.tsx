'use client'
import { useEffect, useRef } from 'react'
import type { ElementConfig } from '@/lib/elements'

interface ElementalAmbienceProps {
  element: ElementConfig
  size?: number
}

export default function ElementalAmbience({ element, size = 80 }: ElementalAmbienceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = size
    canvas.height = size
    const cx = size / 2
    const cy = size / 2
    let animId: number

    // Parse element color to RGB for canvas use
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return { r, g, b }
    }
    const rgb = hexToRgb(element.color)

    switch (element.name) {

      // ── WATER: ripple rings expanding from centre ──────────────────
      case 'Water': {
        const rings: { r: number; opacity: number }[] = [
          { r: 0, opacity: 0.6 },
          { r: 15, opacity: 0.4 },
          { r: 30, opacity: 0.2 },
        ]
        const draw = () => {
          ctx.clearRect(0, 0, size, size)
          rings.forEach(ring => {
            ring.r += 0.25
            ring.opacity -= 0.003
            if (ring.r > cx || ring.opacity <= 0) {
              ring.r = 0
              ring.opacity = 0.5
            }
            ctx.beginPath()
            ctx.arc(cx, cy, ring.r, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${ring.opacity})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          })
          animId = requestAnimationFrame(draw)
        }
        draw()
        break
      }

      // ── FIRE: rising sparks ────────────────────────────────────────
      case 'Fire': {
        const sparks = Array.from({ length: 18 }, () => ({
          x: cx + (Math.random() - 0.5) * 20,
          y: cy + Math.random() * 15,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -(0.5 + Math.random() * 1.2),
          life: Math.random(),
          maxLife: 0.6 + Math.random() * 0.4,
          size: 0.5 + Math.random() * 1.5,
        }))
        const draw = () => {
          ctx.clearRect(0, 0, size, size)
          sparks.forEach(s => {
            s.x += s.vx
            s.y += s.vy
            s.life -= 0.012
            if (s.life <= 0) {
              s.x = cx + (Math.random() - 0.5) * 24
              s.y = cy + 10 + Math.random() * 10
              s.vy = -(0.5 + Math.random() * 1.2)
              s.vx = (Math.random() - 0.5) * 0.6
              s.life = s.maxLife
            }
            const opacity = (s.life / s.maxLife) * 0.8
            // colour shifts from white-orange at base to deep red at tip
            const heat = s.life / s.maxLife
            const r2 = Math.round(rgb.r * heat + 255 * (1 - heat))
            const g2 = Math.round(rgb.g * heat * 0.5)
            const b2 = 0
            ctx.beginPath()
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${r2}, ${g2}, ${b2}, ${opacity})`
            ctx.fill()
          })
          animId = requestAnimationFrame(draw)
        }
        draw()
        break
      }

      // ── AIR: drifting wisps / shimmer ─────────────────────────────
      case 'Air': {
        const wisps = Array.from({ length: 24 }, () => ({
          x: Math.random() * size,
          y: Math.random() * size,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4,
          size: 0.4 + Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
        }))
        const draw = (t: number) => {
          ctx.clearRect(0, 0, size, size)
          wisps.forEach(w => {
            w.x += w.vx + Math.sin(t * 0.001 + w.phase) * 0.3
            w.y += w.vy + Math.cos(t * 0.0008 + w.phase) * 0.2
            if (w.x < 0) w.x = size
            if (w.x > size) w.x = 0
            if (w.y < 0) w.y = size
            if (w.y > size) w.y = 0
            const op = (Math.sin(t * 0.002 + w.phase) * 0.15 + 0.2)
            ctx.beginPath()
            ctx.arc(w.x, w.y, w.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${op})`
            ctx.fill()
          })
          animId = requestAnimationFrame(() => draw(t + 16))
        }
        draw(0)
        break
      }

      // ── EARTH: slow pulsing ground energy, orbiting dots ──────────
      case 'Earth': {
        const dots = Array.from({ length: 8 }, (_, i) => ({
          angle: (i / 8) * Math.PI * 2,
          r: 22 + Math.sin(i) * 5,
          size: 0.8 + Math.random() * 1.2,
          speed: 0.003 + Math.random() * 0.002,
        }))
        const draw = (t: number) => {
          ctx.clearRect(0, 0, size, size)
          // Slow pulsing inner glow
          const pulse = Math.sin(t * 0.001) * 0.5 + 0.5
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 25)
          grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.06 + pulse * 0.06})`)
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.fillRect(0, 0, size, size)
          // Orbiting dots
          dots.forEach(dot => {
            dot.angle += dot.speed
            const x = cx + dot.r * Math.cos(dot.angle)
            const y = cy + dot.r * Math.sin(dot.angle)
            ctx.beginPath()
            ctx.arc(x, y, dot.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`
            ctx.fill()
          })
          animId = requestAnimationFrame(() => draw(t + 16))
        }
        draw(0)
        break
      }

      // ── ETHER: slow cosmic rays / stardust ────────────────────────
      case 'Ether': {
        const stars = Array.from({ length: 30 }, () => ({
          x: Math.random() * size,
          y: Math.random() * size,
          phase: Math.random() * Math.PI * 2,
          size: 0.3 + Math.random() * 1,
          speed: 0.001 + Math.random() * 0.002,
        }))
        // 4 slow rotating rays from centre
        const rays = [0, 45, 90, 135].map(a => ({ angle: a * Math.PI / 180 }))
        const draw = (t: number) => {
          ctx.clearRect(0, 0, size, size)
          // Rotating rays
          rays.forEach(ray => {
            ray.angle += 0.002
            const grad = ctx.createLinearGradient(
              cx, cy,
              cx + Math.cos(ray.angle) * cx,
              cy + Math.sin(ray.angle) * cy,
            )
            grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`)
            grad.addColorStop(1, 'transparent')
            ctx.beginPath()
            ctx.moveTo(cx, cy)
            ctx.lineTo(cx + Math.cos(ray.angle) * cx * 1.5, cy + Math.sin(ray.angle) * cy * 1.5)
            ctx.strokeStyle = grad
            ctx.lineWidth = 1.5
            ctx.stroke()
          })
          // Twinkling stars
          stars.forEach(s => {
            const op = Math.sin(t * s.speed + s.phase) * 0.3 + 0.3
            ctx.beginPath()
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${op})`
            ctx.fill()
          })
          animId = requestAnimationFrame(() => draw(t + 16))
        }
        draw(0)
        break
      }
    }

    return () => cancelAnimationFrame(animId)
  }, [element, size])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        opacity: 0.7,
      }}
    />
  )
}
