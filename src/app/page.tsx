'use client'

import { useState, useEffect, useRef } from 'react'
import { apps } from '@/lib/apps'
import type { App } from '@/lib/apps'
import AuroraCanvas from '@/components/AuroraCanvas'
import FlagshipCard from '@/components/FlagshipCard'
import AppCard from '@/components/AppCard'
import AppOverlay from '@/components/AppOverlay'
import InstallButton from '@/components/InstallButton'
import HarmonicLogo from '@/components/HarmonicLogo'

export default function Home() {
  const [phase, setPhase] = useState(0)
  const [selectedApp, setSelectedApp] = useState<App | null>(null)
  const [logoSize, setLogoSize] = useState(180)
  const logoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const measure = () => {
      if (!logoContainerRef.current) return
      const h = logoContainerRef.current.clientHeight
      const w = logoContainerRef.current.clientWidth
      const s = Math.floor(Math.min(h, w) * 0.95)
      setLogoSize(Math.max(140, s))
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(measure)
    })
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100)
    const t2 = setTimeout(() => setPhase(2), 700)
    const t3 = setTimeout(() => setPhase(3), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (selectedApp) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedApp])

  const flagship = apps.find(a => a.flagship)!
  const gridApps = apps.filter(a => !a.flagship)

  return (
    <main
      className="relative overflow-hidden flex flex-col"
      style={{
        height: '100dvh',
        maxHeight: '100dvh',
      }}
    >
      {/* Aurora background */}
      <AuroraCanvas />

      {/* Content — single screen, no scroll */}
      <div
        className="relative z-10 flex flex-col h-full"
        style={{ padding: '0 20px' }}
      >
        {/* Header */}
        <header
          className="text-center flex-shrink-0"
          style={{
            paddingTop: 'calc(env(safe-area-inset-top, 0px) + 3.5vh)',
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h1
            style={{
              fontSize: '18px',
              fontWeight: 300,
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #e0d4ff, #fff, #c4e0ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '6px',
            }}
          >
            Harmonic Waves
          </h1>
          <p
            style={{
              fontSize: '13px',
              fontStyle: 'italic',
              fontWeight: 300,
              background: 'linear-gradient(90deg, #c9a96e, #e8d5a8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '6px',
            }}
          >
            Tools for Sound Healers
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '10px' }}>&#9671;</span>
            <div className="w-10 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>
        </header>

        {/* Animated logo — fills all remaining space */}
        <div
          ref={logoContainerRef}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            minHeight: 0,
            opacity: 0,
            animation: 'logoEntry 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards',
          }}
        >
          <HarmonicLogo size={logoSize} />
        </div>

        {/* App Area */}
        <div className="flex flex-col flex-shrink-0" style={{ gap: '2.5vh' }}>
          {/* Flagship card */}
          <FlagshipCard
            app={flagship}
            onClick={() => setSelectedApp(flagship)}
            visible={phase >= 2}
          />

          {/* 3×2 Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
            }}
          >
            {gridApps.map((app, i) => (
              <AppCard
                key={app.id}
                app={app}
                onClick={() => setSelectedApp(app)}
                visible={phase >= 2}
                delay={100 * i}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Install button */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          marginTop: 'clamp(8px, 2vh, 14px)',
          opacity: phase >= 1 ? 1 : 0,
          transition: 'opacity 0.6s ease 0.3s',
        }}>
          <InstallButton />
        </div>

        {/* Footer */}
        <footer
          className="flex-shrink-0 text-center"
          style={{
            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2vh)',
            paddingTop: '1vh',
            opacity: phase >= 3 ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>
            Created by Remigijus Dzingelevi&#269;ius
          </p>
          <p
            style={{
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.12)',
            }}
          >
            Sound Healer &amp; Developer
          </p>
        </footer>
      </div>

      {/* Overlay */}
      <AppOverlay app={selectedApp} onClose={() => setSelectedApp(null)} />
    </main>
  )
}
