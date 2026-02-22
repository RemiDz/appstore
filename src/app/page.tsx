'use client'
import CosmicCanvas from '@/components/CosmicCanvas'
import ElementalMandala from '@/components/ElementalMandala'
import CursorTrail from '@/components/CursorTrail'
import EntrySequence from '@/components/EntrySequence'
import HubLabel from '@/components/HubLabel'

export default function Home() {
  return (
    <main className="fixed inset-0 overflow-hidden" style={{ background: '#05050F' }}>
      {/* z-index 0: star field + sacred geometry */}
      <CosmicCanvas />

      {/* z-index 1: atmospheric nebula overlays */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,12,45,0.5), transparent),
            radial-gradient(ellipse 40% 40% at 20% 30%, rgba(20,15,55,0.2), transparent),
            radial-gradient(ellipse 35% 45% at 80% 70%, rgba(15,18,50,0.15), transparent)
          `,
          zIndex: 1,
        }}
      />

      {/* z-index 2: mandala + orbs */}
      <ElementalMandala />

      {/* z-index 3: UI labels */}
      <HubLabel />

      {/* z-index 10: entry sequence overlay */}
      <EntrySequence />

      {/* z-index 9999: custom cursor */}
      <CursorTrail />
    </main>
  )
}
