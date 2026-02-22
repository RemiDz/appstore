'use client'
import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  baseOpacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

interface Nebula {
  x: number
  y: number
  radius: number
  color: string
  phaseX: number
  phaseY: number
  speedX: number
  speedY: number
}

export default function CosmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const geometryCacheRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let stars: Star[] = []
    let nebulae: Nebula[] = []
    let W = 0
    let H = 0

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas!.width = W
      canvas!.height = H
      seedStars()
      seedNebulae()
      drawGeometryCache()
    }

    function seedStars() {
      stars = []
      // Regular stars
      for (let i = 0; i < 300; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          radius: 0.2 + Math.random() * 1.4,
          baseOpacity: 0.05 + Math.random() * 0.55,
          twinkleSpeed: 0.3 + Math.random() * 1.5,
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
      // Brighter stars with glow
      for (let i = 0; i < 6; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          radius: 2 + Math.random() * 1,
          baseOpacity: 0.4 + Math.random() * 0.2,
          twinkleSpeed: 0.2 + Math.random() * 0.5,
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    function seedNebulae() {
      nebulae = [
        {
          x: W * 0.3, y: H * 0.4, radius: Math.max(W, H) * 0.3,
          color: 'rgba(10, 10, 46,', phaseX: 0, phaseY: 0.5,
          speedX: 0.08, speedY: 0.05,
        },
        {
          x: W * 0.7, y: H * 0.6, radius: Math.max(W, H) * 0.25,
          color: 'rgba(80, 50, 160,', phaseX: 1.5, phaseY: 2.0,
          speedX: 0.06, speedY: 0.04,
        },
        {
          x: W * 0.5, y: H * 0.3, radius: Math.max(W, H) * 0.28,
          color: 'rgba(20, 50, 80,', phaseX: 3.0, phaseY: 1.0,
          speedX: 0.04, speedY: 0.07,
        },
      ]
    }

    function drawGeometryCache() {
      const offscreen = document.createElement('canvas')
      offscreen.width = W
      offscreen.height = H
      const gc = offscreen.getContext('2d')
      if (!gc) return
      geometryCacheRef.current = offscreen

      const cx = W / 2
      const cy = H / 2
      const baseR = Math.min(W, H) * 0.42

      gc.strokeStyle = 'rgba(200, 196, 220, 0.025)'
      gc.lineWidth = 0.5

      // Flower of Life: centre circle
      gc.beginPath()
      gc.arc(cx, cy, baseR / 3, 0, Math.PI * 2)
      gc.stroke()

      // 6 surrounding circles
      const r = baseR / 3
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6
        const px = cx + r * Math.cos(angle)
        const py = cy + r * Math.sin(angle)
        gc.beginPath()
        gc.arc(px, py, r, 0, Math.PI * 2)
        gc.stroke()
      }

      // Outer 12 circles
      const r2 = r * 2
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI * 2) / 12
        const px = cx + r2 * Math.cos(angle)
        const py = cy + r2 * Math.sin(angle)
        gc.beginPath()
        gc.arc(px, py, r, 0, Math.PI * 2)
        gc.stroke()
      }

      // Circumscribed hexagon
      gc.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6
        const px = cx + r * Math.cos(angle)
        const py = cy + r * Math.sin(angle)
        if (i === 0) gc.moveTo(px, py)
        else gc.lineTo(px, py)
      }
      gc.closePath()
      gc.stroke()

      // Outer circle
      gc.beginPath()
      gc.arc(cx, cy, baseR, 0, Math.PI * 2)
      gc.stroke()
    }

    function drawNebula(time: number) {
      if (!ctx) return
      for (const n of nebulae) {
        const t = time * 0.001
        const nx = n.x + Math.sin(t * n.speedX + n.phaseX) * 40
        const ny = n.y + Math.cos(t * n.speedY + n.phaseY) * 30

        const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.radius)
        gradient.addColorStop(0, `${n.color} 0.06)`)
        gradient.addColorStop(1, `${n.color} 0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, W, H)
      }
    }

    function drawStars(time: number) {
      if (!ctx) return
      for (const star of stars) {
        const twinkle = Math.sin(time * 0.001 * star.twinkleSpeed + star.twinkleOffset)
        const opacity = star.baseOpacity + twinkle * 0.2

        if (star.radius > 1.8) {
          // Glow for brighter stars
          const glow = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 4
          )
          glow.addColorStop(0, `rgba(240, 238, 248, ${opacity * 0.6})`)
          glow.addColorStop(0.3, `rgba(240, 238, 248, ${opacity * 0.15})`)
          glow.addColorStop(1, 'rgba(240, 238, 248, 0)')
          ctx.fillStyle = glow
          ctx.fillRect(
            star.x - star.radius * 4,
            star.y - star.radius * 4,
            star.radius * 8,
            star.radius * 8
          )
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240, 238, 248, ${Math.max(0, opacity)})`
        ctx.fill()
      }
    }

    function draw(time: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      drawNebula(time)
      if (geometryCacheRef.current) {
        ctx.drawImage(geometryCacheRef.current, 0, 0)
      }
      drawStars(time)
      animationId = requestAnimationFrame(draw)
    }

    resize()
    animationId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
