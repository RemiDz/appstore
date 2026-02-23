'use client'

import { useState, useEffect } from 'react'
import type { AppNode } from '@/data/apps'
import Starfield from '@/components/Starfield'
import SacredGeometry from '@/components/SacredGeometry'
import ConstellationMap from '@/components/ConstellationMap'
import NodeModal from '@/components/NodeModal'

export default function Home() {
  const [selectedApp, setSelectedApp] = useState<AppNode | null>(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedApp) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedApp])

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: '#0a0a1a' }}>
      {/* Background layers */}
      <Starfield />
      <SacredGeometry />

      {/* Nebula glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 45%, rgba(99, 60, 180, 0.08), transparent),
            radial-gradient(ellipse 40% 40% at 25% 35%, rgba(60, 80, 180, 0.05), transparent),
            radial-gradient(ellipse 35% 45% at 75% 60%, rgba(100, 40, 160, 0.04), transparent)
          `,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="pt-12 pb-4 text-center">
          <h1 className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">
            Harmonic Waves
          </h1>
          <p className="font-display text-sm italic text-white/20 mt-1">
            Tools for Sound Healers
          </p>
        </header>

        {/* Constellation */}
        <div className="flex-1">
          <ConstellationMap onSelectApp={setSelectedApp} />
        </div>

        {/* Footer */}
        <footer className="py-6 text-center">
          <p className="text-xs text-white/15">
            Created by Remigijus Dzingelevi&#269;ius
          </p>
        </footer>
      </div>

      {/* Mobile modal — rendered at page root, outside content flow */}
      <NodeModal app={selectedApp} onClose={() => setSelectedApp(null)} />
    </main>
  )
}
