'use client'

import { useEffect, useRef } from 'react'

export default function HarmonicLogo({ size = 180 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const s = size

    c.width = s * dpr
    c.height = s * dpr
    c.style.width = s + 'px'
    c.style.height = s + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const cx = s / 2
    const cy = s / 2
    let running = true

    const draw = () => {
      if (!running) return
      const t = frameRef.current++
      const time = t * 0.008
      ctx.clearRect(0, 0, s, s)

      const ambGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.48)
      const ambPulse = 0.7 + Math.sin(time * 0.4) * 0.3
      ambGrd.addColorStop(0, `rgba(120,60,220,${0.12 * ambPulse})`)
      ambGrd.addColorStop(0.4, `rgba(60,30,160,${0.06 * ambPulse})`)
      ambGrd.addColorStop(0.7, `rgba(20,100,180,${0.03 * ambPulse})`)
      ambGrd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = ambGrd
      ctx.fillRect(0, 0, s, s)

      for (let i = 0; i < 4; i++) {
        const phase = time * 0.5 + i * 1.57
        const ringR = s * 0.15 + ((phase % 6.28) / 6.28) * s * 0.32
        const ringAlpha = Math.max(0, 0.18 - (ringR / (s * 0.47)) * 0.18)
        ctx.beginPath()
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(167,139,250,${ringAlpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(time * 0.03)
      const geoR = s * 0.14
      const geoPulse = 0.8 + Math.sin(time * 0.6) * 0.2

      ctx.beginPath()
      ctx.arc(0, 0, geoR, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(167,139,250,${0.18 * geoPulse})`
      ctx.lineWidth = 1
      ctx.stroke()

      for (let i = 0; i < 6; i++) {
        const angle = (i * 60) * Math.PI / 180
        const gx = geoR * Math.cos(angle)
        const gy = geoR * Math.sin(angle)
        ctx.beginPath()
        ctx.arc(gx, gy, geoR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(167,139,250,${0.12 + Math.sin(time * 0.8 + i * 1.05) * 0.06})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      ctx.beginPath()
      ctx.arc(0, 0, geoR * 2, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(167,139,250,${0.07 * geoPulse})`
      ctx.lineWidth = 0.6
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(0, 0, geoR * 2.6, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(120,140,250,${0.04 * geoPulse})`
      ctx.lineWidth = 0.5
      ctx.stroke()

      ctx.restore()

      const waveWidth = s * 0.38

      ctx.save()
      ctx.beginPath()
      for (let x = -waveWidth; x <= waveWidth; x += 1) {
        const norm = x / waveWidth
        const envelope = 1 - norm * norm
        const freq1 = Math.sin(norm * 12 + time * 2.5) * envelope
        const freq2 = Math.sin(norm * 8 - time * 1.8) * envelope * 0.4
        const py = cy + (freq1 + freq2) * s * 0.045
        if (x === -waveWidth) ctx.moveTo(cx + x, py)
        else ctx.lineTo(cx + x, py)
      }
      const waveGrd = ctx.createLinearGradient(cx - waveWidth, 0, cx + waveWidth, 0)
      waveGrd.addColorStop(0, 'rgba(34,211,238,0)')
      waveGrd.addColorStop(0.2, 'rgba(34,211,238,0.6)')
      waveGrd.addColorStop(0.5, 'rgba(167,139,250,0.85)')
      waveGrd.addColorStop(0.8, 'rgba(34,211,238,0.6)')
      waveGrd.addColorStop(1, 'rgba(34,211,238,0)')
      ctx.strokeStyle = waveGrd
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.stroke()
      ctx.restore()

      ctx.save()
      ctx.beginPath()
      for (let x = -waveWidth; x <= waveWidth; x += 1) {
        const norm = x / waveWidth
        const envelope = 1 - norm * norm
        const freq1 = Math.sin(norm * 12 + time * 2.5 + 1.2) * envelope
        const freq2 = Math.sin(norm * 8 - time * 1.8 + 0.8) * envelope * 0.4
        const py = cy + (freq1 + freq2) * s * 0.035
        if (x === -waveWidth) ctx.moveTo(cx + x, py)
        else ctx.lineTo(cx + x, py)
      }
      const wave2Grd = ctx.createLinearGradient(cx - waveWidth, 0, cx + waveWidth, 0)
      wave2Grd.addColorStop(0, 'rgba(192,132,252,0)')
      wave2Grd.addColorStop(0.3, 'rgba(192,132,252,0.2)')
      wave2Grd.addColorStop(0.5, 'rgba(167,139,250,0.3)')
      wave2Grd.addColorStop(0.7, 'rgba(192,132,252,0.2)')
      wave2Grd.addColorStop(1, 'rgba(192,132,252,0)')
      ctx.strokeStyle = wave2Grd
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.restore()

      const corePulse = 0.7 + Math.sin(time * 1.2) * 0.3

      const haloGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.08)
      haloGrd.addColorStop(0, `rgba(200,170,255,${0.35 * corePulse})`)
      haloGrd.addColorStop(0.5, `rgba(140,100,240,${0.12 * corePulse})`)
      haloGrd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = haloGrd
      ctx.fillRect(cx - s * 0.08, cy - s * 0.08, s * 0.16, s * 0.16)

      const coreGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.025)
      coreGrd.addColorStop(0, `rgba(255,255,255,${0.95 * corePulse})`)
      coreGrd.addColorStop(0.4, `rgba(200,180,255,${0.6 * corePulse})`)
      coreGrd.addColorStop(1, 'rgba(167,139,250,0)')
      ctx.fillStyle = coreGrd
      ctx.beginPath()
      ctx.arc(cx, cy, s * 0.025, 0, Math.PI * 2)
      ctx.fill()

      for (let i = 0; i < 5; i++) {
        const nodeX = cx + (i - 2) * (waveWidth * 0.38)
        const nodePhase = (i - 2) / 2 * 12 + time * 2.5
        const nodeCross = Math.abs(Math.sin(nodePhase))
        if (nodeCross < 0.15) {
          const nodeAlpha = (1 - nodeCross / 0.15) * 0.6
          const nodeGrd = ctx.createRadialGradient(nodeX, cy, 0, nodeX, cy, 4)
          nodeGrd.addColorStop(0, `rgba(34,211,238,${nodeAlpha})`)
          nodeGrd.addColorStop(1, 'rgba(34,211,238,0)')
          ctx.fillStyle = nodeGrd
          ctx.fillRect(nodeX - 4, cy - 4, 8, 8)
        }
      }

      ctx.save()
      ctx.translate(cx, cy)
      for (let i = 0; i < 8; i++) {
        const orbitR = s * 0.14 * 2 + s * 0.02
        const orbitAngle = time * 0.15 + i * (Math.PI * 2 / 8)
        const px = orbitR * Math.cos(orbitAngle)
        const py = orbitR * Math.sin(orbitAngle)
        ctx.beginPath()
        ctx.arc(px, py, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167,139,250,${0.3 + Math.sin(time + i * 0.8) * 0.2})`
        ctx.fill()
      }
      ctx.restore()

      requestAnimationFrame(draw)
    }
    draw()
    return () => { running = false }
  }, [size])

  return <canvas ref={canvasRef} style={{ display: 'block' }} aria-hidden="true" />
}
