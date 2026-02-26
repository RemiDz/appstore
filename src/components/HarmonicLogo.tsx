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

    const TAU = Math.PI * 2

    const draw = () => {
      if (!running) return
      const time = frameRef.current++ * 0.006
      ctx.clearRect(0, 0, s, s)

      // ═══ COSMIC BREATH — entire logo inhales/exhales ═══
      const breath = 0.92 + Math.sin(time * 0.3) * 0.08

      // ═══ CHROMATIC AURA — three rotating colour blobs ═══
      for (let i = 0; i < 3; i++) {
        const angle = time * 0.15 + i * (TAU / 3)
        const ax = cx + Math.cos(angle) * s * 0.06
        const ay = cy + Math.sin(angle) * s * 0.06
        const hue1 = (time * 8 + i * 40) % 360
        const aGrd = ctx.createRadialGradient(ax, ay, 0, ax, ay, s * 0.5)
        aGrd.addColorStop(0, `hsla(${hue1}, 60%, 55%, 0.08)`)
        aGrd.addColorStop(0.4, `hsla(${hue1 + 30}, 50%, 40%, 0.03)`)
        aGrd.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = aGrd
        ctx.fillRect(0, 0, s, s)
      }

      // ═══ EMANATION RINGS — colour-shifting expanding ripples ═══
      for (let i = 0; i < 6; i++) {
        const phase = time * (0.3 + i * 0.08) + i * 1.05
        const ringR = s * 0.08 + ((phase % TAU) / TAU) * s * 0.42
        const life = 1 - ringR / (s * 0.5)
        if (life <= 0) continue
        ctx.beginPath()
        ctx.arc(cx, cy, ringR * breath, 0, TAU)
        const hue = (200 + i * 25 + time * 10) % 360
        ctx.strokeStyle = `hsla(${hue}, 55%, 65%, ${life * 0.18})`
        ctx.lineWidth = 0.6 + life * 0.8
        ctx.stroke()
      }

      // ═══ MULTI-DIMENSIONAL SEED OF LIFE ═══
      const geoR = s * 0.14 * breath

      for (let layer = 0; layer < 3; layer++) {
        ctx.save()
        ctx.translate(cx, cy)

        const rotSpeed = [0.02, -0.015, 0.025][layer]
        const tiltPhase = time * [0.12, -0.09, 0.07][layer]
        const tiltAmount = [0.15, 0.2, 0.12][layer]
        const layerScale = [1, 0.78, 1.22][layer]
        const layerAlpha = [0.22, 0.12, 0.08][layer]

        ctx.rotate(time * rotSpeed)
        const perspY = 1 - Math.abs(Math.sin(tiltPhase)) * tiltAmount
        ctx.scale(layerScale, layerScale * perspY)

        const pulse = 0.85 + Math.sin(time * (0.4 + layer * 0.15)) * 0.15
        const hueShift = layer * 30 + time * 5

        // Centre circle
        ctx.beginPath()
        ctx.arc(0, 0, geoR, 0, TAU)
        ctx.strokeStyle = `hsla(${260 + hueShift}, 55%, 70%, ${layerAlpha * pulse})`
        ctx.lineWidth = 0.8
        ctx.stroke()

        // 6 petal circles
        for (let i = 0; i < 6; i++) {
          const pAngle = (i * 60) * Math.PI / 180
          const gx = geoR * Math.cos(pAngle)
          const gy = geoR * Math.sin(pAngle)
          const petalPulse = 0.8 + Math.sin(time * 0.6 + i * 1.05 + layer * 2) * 0.2
          ctx.beginPath()
          ctx.arc(gx, gy, geoR, 0, TAU)
          ctx.strokeStyle = `hsla(${260 + hueShift + i * 8}, 50%, 65%, ${layerAlpha * petalPulse * 0.7})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }

        // Outer boundary
        ctx.beginPath()
        ctx.arc(0, 0, geoR * 2, 0, TAU)
        ctx.strokeStyle = `hsla(${270 + hueShift}, 45%, 60%, ${layerAlpha * 0.35})`
        ctx.lineWidth = 0.5
        ctx.stroke()

        ctx.restore()
      }

      // ═══ METATRON'S CUBE HINTS — faint connecting lines ═══
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(time * 0.01)
      const metaR = geoR * 2.2
      for (let i = 0; i < 6; i++) {
        const a1 = (i * 60) * Math.PI / 180
        const a2 = ((i + 2) * 60) * Math.PI / 180
        ctx.beginPath()
        ctx.moveTo(metaR * Math.cos(a1), metaR * Math.sin(a1))
        ctx.lineTo(metaR * Math.cos(a2), metaR * Math.sin(a2))
        ctx.strokeStyle = `rgba(167,139,250,${0.04 + Math.sin(time * 0.5 + i) * 0.02})`
        ctx.lineWidth = 0.4
        ctx.stroke()
      }
      ctx.restore()

      // ═══ FREQUENCY WAVES — four layered waves ═══
      const waveWidth = s * 0.42

      // Sub-bass undertone (wide, slow, subtle)
      ctx.save()
      ctx.beginPath()
      for (let x = -waveWidth; x <= waveWidth; x += 1) {
        const norm = x / waveWidth
        const env = Math.pow(1 - norm * norm, 1.5)
        const py = cy + Math.sin(norm * 4 + time * 0.8) * env * s * 0.03
        if (x === -waveWidth) ctx.moveTo(cx + x, py); else ctx.lineTo(cx + x, py)
      }
      ctx.strokeStyle = 'rgba(100, 60, 200, 0.12)'
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctx.stroke()
      ctx.restore()

      // Main harmonic wave — colour-shifting gradient
      ctx.save()
      ctx.beginPath()
      for (let x = -waveWidth; x <= waveWidth; x += 0.8) {
        const norm = x / waveWidth
        const env = Math.pow(1 - norm * norm, 1.2)
        const f1 = Math.sin(norm * 14 + time * 2.8) * env
        const f2 = Math.sin(norm * 9 - time * 2.0) * env * 0.35
        const f3 = Math.sin(norm * 21 + time * 3.5) * env * 0.15
        const py = cy + (f1 + f2 + f3) * s * 0.048
        if (x === -waveWidth) ctx.moveTo(cx + x, py); else ctx.lineTo(cx + x, py)
      }
      const wHue1 = (180 + Math.sin(time * 0.3) * 30) % 360
      const wHue2 = (270 + Math.sin(time * 0.4) * 20) % 360
      const wGrd = ctx.createLinearGradient(cx - waveWidth, 0, cx + waveWidth, 0)
      wGrd.addColorStop(0, `hsla(${wHue1}, 70%, 60%, 0)`)
      wGrd.addColorStop(0.15, `hsla(${wHue1}, 70%, 60%, 0.6)`)
      wGrd.addColorStop(0.5, `hsla(${wHue2}, 60%, 65%, 0.9)`)
      wGrd.addColorStop(0.85, `hsla(${wHue1}, 70%, 60%, 0.6)`)
      wGrd.addColorStop(1, `hsla(${wHue1}, 70%, 60%, 0)`)
      ctx.strokeStyle = wGrd
      ctx.lineWidth = 2.2
      ctx.lineCap = 'round'
      ctx.stroke()
      ctx.restore()

      // Ghost wave — counter-phase
      ctx.save()
      ctx.beginPath()
      for (let x = -waveWidth; x <= waveWidth; x += 1) {
        const norm = x / waveWidth
        const env = Math.pow(1 - norm * norm, 1.3)
        const f1 = Math.sin(norm * 14 + time * 2.8 + 1.5) * env
        const f2 = Math.sin(norm * 9 - time * 2.0 + 1.0) * env * 0.35
        const py = cy + (f1 + f2) * s * 0.038
        if (x === -waveWidth) ctx.moveTo(cx + x, py); else ctx.lineTo(cx + x, py)
      }
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.2)'
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.restore()

      // Third echo — barely visible
      ctx.save()
      ctx.beginPath()
      for (let x = -waveWidth; x <= waveWidth; x += 1.5) {
        const norm = x / waveWidth
        const env = Math.pow(1 - norm * norm, 1.5)
        const py = cy + Math.sin(norm * 14 + time * 2.8 + 3.0) * env * s * 0.028
        if (x === -waveWidth) ctx.moveTo(cx + x, py); else ctx.lineTo(cx + x, py)
      }
      ctx.strokeStyle = 'rgba(120, 200, 255, 0.08)'
      ctx.lineWidth = 0.8
      ctx.stroke()
      ctx.restore()

      // ═══ FREQUENCY NODES — sparkle at zero crossings ═══
      for (let i = -3; i <= 3; i++) {
        if (i === 0) continue
        const nodeX = cx + i * (waveWidth * 0.28)
        const cross = Math.abs(Math.sin(i / 2 * 14 + time * 2.8))
        if (cross < 0.12) {
          const nodeA = (1 - cross / 0.12) * 0.7
          const nHue = (190 + i * 15 + time * 10) % 360
          const nodeGrd = ctx.createRadialGradient(nodeX, cy, 0, nodeX, cy, 5)
          nodeGrd.addColorStop(0, `hsla(${nHue}, 80%, 75%, ${nodeA})`)
          nodeGrd.addColorStop(1, `hsla(${nHue}, 80%, 75%, 0)`)
          ctx.fillStyle = nodeGrd
          ctx.fillRect(nodeX - 5, cy - 5, 10, 10)
        }
      }

      // ═══ ENERGY CORE — lens flare + multi-layer pulse ═══
      const corePulse = 0.6 + Math.sin(time * 1.4) * 0.25 + Math.sin(time * 3.1) * 0.15

      // Deep aura
      const aura1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.14)
      aura1.addColorStop(0, `rgba(180, 150, 255, ${0.2 * corePulse})`)
      aura1.addColorStop(0.4, `rgba(120, 80, 230, ${0.06 * corePulse})`)
      aura1.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = aura1
      ctx.fillRect(cx - s * 0.14, cy - s * 0.14, s * 0.28, s * 0.28)

      // Hot core
      const core1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.04)
      core1.addColorStop(0, `rgba(255,255,255,${0.98 * corePulse})`)
      core1.addColorStop(0.2, `rgba(220,200,255,${0.7 * corePulse})`)
      core1.addColorStop(0.5, `rgba(167,139,250,${0.3 * corePulse})`)
      core1.addColorStop(1, 'rgba(167,139,250,0)')
      ctx.fillStyle = core1
      ctx.beginPath()
      ctx.arc(cx, cy, s * 0.04, 0, TAU)
      ctx.fill()

      // Horizontal lens flare
      const flareLen = s * 0.06 * corePulse
      const flareH = ctx.createLinearGradient(cx - flareLen, cy, cx + flareLen, cy)
      flareH.addColorStop(0, 'rgba(200,180,255,0)')
      flareH.addColorStop(0.4, `rgba(200,180,255,${0.25 * corePulse})`)
      flareH.addColorStop(0.5, `rgba(255,255,255,${0.4 * corePulse})`)
      flareH.addColorStop(0.6, `rgba(200,180,255,${0.25 * corePulse})`)
      flareH.addColorStop(1, 'rgba(200,180,255,0)')
      ctx.fillStyle = flareH
      ctx.fillRect(cx - flareLen, cy - 1, flareLen * 2, 2)

      // Vertical lens flare
      const flareV = ctx.createLinearGradient(cx, cy - flareLen * 0.7, cx, cy + flareLen * 0.7)
      flareV.addColorStop(0, 'rgba(180,200,255,0)')
      flareV.addColorStop(0.4, `rgba(180,200,255,${0.15 * corePulse})`)
      flareV.addColorStop(0.5, `rgba(255,255,255,${0.25 * corePulse})`)
      flareV.addColorStop(0.6, `rgba(180,200,255,${0.15 * corePulse})`)
      flareV.addColorStop(1, 'rgba(180,200,255,0)')
      ctx.fillStyle = flareV
      ctx.fillRect(cx - 0.8, cy - flareLen * 0.7, 1.6, flareLen * 1.4)

      // ═══ ORBITING PARTICLES — two rings, opposite directions ═══
      ctx.save()
      ctx.translate(cx, cy)
      // Inner ring — fast, colour-shifting
      for (let i = 0; i < 10; i++) {
        const orbitR = geoR * 1.6
        const oAngle = time * 0.25 + i * (TAU / 10)
        const wobble = Math.sin(time * 2 + i * 1.3) * 3
        const px = (orbitR + wobble) * Math.cos(oAngle)
        const py = (orbitR + wobble) * Math.sin(oAngle) * (0.9 + Math.sin(time * 0.1) * 0.1)
        const pSize = 0.8 + Math.sin(time * 2 + i) * 0.4
        const pHue = (250 + i * 12 + time * 8) % 360
        ctx.beginPath()
        ctx.arc(px, py, pSize, 0, TAU)
        ctx.fillStyle = `hsla(${pHue}, 60%, 70%, ${0.3 + Math.sin(time * 1.5 + i * 0.6) * 0.2})`
        ctx.fill()
      }
      // Outer ring — slow, opposite direction
      for (let i = 0; i < 6; i++) {
        const orbitR = geoR * 2.5
        const oAngle = -time * 0.1 + i * (TAU / 6)
        ctx.beginPath()
        ctx.arc(orbitR * Math.cos(oAngle), orbitR * Math.sin(oAngle), 0.8, 0, TAU)
        ctx.fillStyle = `rgba(120,180,255,${0.12 + Math.sin(time * 0.8 + i * 1.2) * 0.08})`
        ctx.fill()
      }
      ctx.restore()

      // ═══ DIMENSIONAL SHIMMER — slow scan line ═══
      const scanY = cy + Math.sin(time * 0.4) * s * 0.35
      const scanGrd = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15)
      scanGrd.addColorStop(0, 'rgba(167,139,250,0)')
      scanGrd.addColorStop(0.5, `rgba(167,139,250,${0.03 + Math.sin(time) * 0.01})`)
      scanGrd.addColorStop(1, 'rgba(167,139,250,0)')
      ctx.fillStyle = scanGrd
      ctx.fillRect(cx - s * 0.4, scanY - 15, s * 0.8, 30)

      requestAnimationFrame(draw)
    }
    draw()
    return () => { running = false }
  }, [size])

  return <canvas ref={canvasRef} style={{ display: 'block' }} aria-hidden="true" />
}
