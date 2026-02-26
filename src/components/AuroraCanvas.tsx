'use client'

import { useRef, useEffect } from 'react'

const blobs = [
  { x: 0.2, y: 0.15, r: 0.45, c1: [100, 40, 180], c2: [60, 20, 120], sp: 0.0008, ph: 0 },
  { x: 0.8, y: 0.3, r: 0.35, c1: [20, 120, 180], c2: [10, 80, 140], sp: 0.0006, ph: 1.5 },
  { x: 0.5, y: 0.65, r: 0.5, c1: [80, 30, 140], c2: [40, 15, 80], sp: 0.0005, ph: 3 },
  { x: 0.15, y: 0.75, r: 0.3, c1: [20, 100, 140], c2: [10, 60, 100], sp: 0.0007, ph: 4.5 },
  { x: 0.75, y: 0.8, r: 0.35, c1: [140, 60, 100], c2: [80, 30, 60], sp: 0.0009, ph: 2 },
  { x: 0.5, y: 0.2, r: 0.28, c1: [30, 80, 120], c2: [15, 50, 80], sp: 0.0004, ph: 5.5 },
]

const STAR_COUNT = 100

interface Star {
  x: number
  y: number
  r: number
  speed: number
  phase: number
}

export default function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    let animId: number

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.3 + Math.random() * 1.5,
      speed: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
    }))

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + 'px'
      canvas!.style.height = h + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    let t = 0

    function draw() {
      const w = canvas!.width / dpr
      const h = canvas!.height / dpr

      ctx!.fillStyle = '#080414'
      ctx!.fillRect(0, 0, w, h)

      for (const blob of blobs) {
        const ox = Math.sin(t * blob.sp + blob.ph) * 0.08
        const oy = Math.cos(t * blob.sp * 0.7 + blob.ph) * 0.06
        const cx = (blob.x + ox) * w
        const cy = (blob.y + oy) * h
        const radius = blob.r * Math.min(w, h)
        const opMod = 0.06 + Math.sin(t * blob.sp * 0.5 + blob.ph) * 0.04

        const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius)
        grad.addColorStop(0, `rgba(${blob.c1[0]},${blob.c1[1]},${blob.c1[2]},${opMod})`)
        grad.addColorStop(0.5, `rgba(${blob.c2[0]},${blob.c2[1]},${blob.c2[2]},${opMod * 0.5})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx!.fillStyle = grad
        ctx!.fillRect(0, 0, w, h)
      }

      for (const star of stars) {
        const opacity = 0.2 + Math.sin(t * 0.001 * star.speed + star.phase) * 0.2
        ctx!.beginPath()
        ctx!.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255,255,255,${Math.max(0, opacity)})`
        ctx!.fill()
      }

      t++
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0" style={{ zIndex: 0 }} />
}
