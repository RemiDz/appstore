'use client'

import { apps, type AppData } from '@/data/apps'
import AppNode from './AppNode'

const CENTER_ID = 'nestorium'
const RING_ORDER = ['binara', 'overtone-singer', 'sonarus', 'lunar-practitioner', 'tidara', 'earth-pulse']

interface AppOrbitProps {
  onSelectApp?: (app: AppData) => void
}

export default function AppOrbit({ onSelectApp }: AppOrbitProps) {
  const centerApp = apps.find((a) => a.id === CENTER_ID)!
  const ringApps = RING_ORDER.map((id) => apps.find((a) => a.id === id)!)

  // Expanded orbital — fills ~85-90% of screen width, ~60-65% of height
  const rx = 40
  const ry = 34
  const ringPositions = ringApps.map((_, i) => {
    const angle = ((i * 60 - 90) * Math.PI) / 180
    return {
      left: 50 + rx * Math.cos(angle),
      top: 50 + ry * Math.sin(angle),
    }
  })

  return (
    <div className="relative flex-1 w-full" style={{ minHeight: 0 }}>
      {/* Centre node — flagship */}
      <div
        className="absolute z-10"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <AppNode app={centerApp} index={0} isCenter onTap={onSelectApp} />
      </div>

      {/* Ring nodes */}
      {ringApps.map((app, i) => (
        <div
          key={app.id}
          className="absolute z-10"
          style={{
            left: `${ringPositions[i].left}%`,
            top: `${ringPositions[i].top}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <AppNode app={app} index={i + 1} onTap={onSelectApp} />
        </div>
      ))}
    </div>
  )
}
