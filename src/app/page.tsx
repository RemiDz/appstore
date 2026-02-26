'use client'

import { useState, useEffect } from 'react'
import type { AppData } from '@/data/apps'
import SacredGeometry from '@/components/SacredGeometry'
import Particles from '@/components/Particles'
import AppOrbit from '@/components/AppOrbit'
import AppReveal from '@/components/AppReveal'

export default function Home() {
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null)

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (selectedApp) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedApp])

  return (
    <main
      className="relative overflow-hidden flex flex-col"
      style={{
        background: 'radial-gradient(ellipse at 30% 20%, rgba(15, 10, 40, 1) 0%, rgba(5, 5, 15, 1) 70%)',
        height: '100dvh',
        maxHeight: '100dvh',
      }}
    >
      {/* Background layers */}
      <SacredGeometry />
      <Particles />

      {/* Nebula glow — slowly drifting */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          animation: 'nebulaDrift 40s ease-in-out infinite',
        }}
      >
        <div
          className="absolute"
          style={{
            width: '60%',
            height: '60%',
            top: '10%',
            left: '15%',
            background: 'radial-gradient(ellipse, rgba(80, 40, 120, 0.08), transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '50%',
            height: '50%',
            top: '40%',
            left: '55%',
            background: 'radial-gradient(ellipse, rgba(20, 40, 80, 0.06), transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '45%',
            height: '45%',
            top: '55%',
            left: '5%',
            background: 'radial-gradient(ellipse, rgba(20, 60, 80, 0.05), transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Content — single screen, no scroll */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header
          className="text-center flex-shrink-0"
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)', paddingBottom: '4px' }}
        >
          <h1
            className="entry-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 400,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '6px',
            }}
          >
            Harmonic Waves
          </h1>
          <p
            className="entry-subtitle"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#C9A96E',
              opacity: 0.6,
              marginBottom: '8px',
            }}
          >
            Tools for Sound Healers
          </p>
          <div
            className="flex items-center justify-center gap-3 entry-divider"
          >
            <div className="w-10 h-px" style={{ background: 'rgba(255, 255, 255, 0.1)' }} />
            <span style={{ color: 'rgba(255, 255, 255, 0.15)', fontSize: '10px' }}>&#9830;</span>
            <div className="w-10 h-px" style={{ background: 'rgba(255, 255, 255, 0.1)' }} />
          </div>
        </header>

        {/* App Orbit */}
        <AppOrbit onSelectApp={setSelectedApp} />

        {/* Footer */}
        <footer
          className="flex-shrink-0 text-center entry-footer"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)', paddingTop: '4px' }}
        >
          <p style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.2)' }}>
            Created by Remigijus Dzingelevi&#269;ius
          </p>
          <p
            style={{
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.12)',
            }}
          >
            Sound Healer &amp; Developer
          </p>
        </footer>
      </div>

      {/* Mobile overlay */}
      <AppReveal app={selectedApp} onClose={() => setSelectedApp(null)} />
    </main>
  )
}
