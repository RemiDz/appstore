'use client'

import { useCallback } from 'react'
import type { AppNode } from '@/data/apps'
import NodeCard from './NodeCard'

import EarthPulseIcon from './icons/EarthPulseIcon'
import LunarIcon from './icons/LunarIcon'
import SonarusIcon from './icons/SonarusIcon'
import OvertoneIcon from './icons/OvertoneIcon'
import NestorLabIcon from './icons/NestorLabIcon'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'earth-pulse': EarthPulseIcon,
  'lunar-practitioner': LunarIcon,
  'sonarus': SonarusIcon,
  'overtone-singer': OvertoneIcon,
  'nestorlab': NestorLabIcon,
}

// Staggered float durations per node for organic feel
const floatDurations: Record<string, number> = {
  'earth-pulse': 6,
  'lunar-practitioner': 7,
  'sonarus': 5.5,
  'overtone-singer': 8,
  'nestorlab': 6.5,
}

interface ConstellationNodeProps {
  app: AppNode
  isExpanded: boolean
  onToggle: (id: string) => void
}

export default function ConstellationNode({ app, isExpanded, onToggle }: ConstellationNodeProps) {
  const Icon = iconMap[app.id]
  const floatDuration = floatDurations[app.id] ?? 6
  const cardPosition = app.position.y > 60 ? 'above' as const : 'below' as const

  const handleClick = useCallback(() => {
    onToggle(app.id)
  }, [app.id, onToggle])

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer group"
      style={{ animation: `float ${floatDuration}s ease-in-out infinite` }}
      onClick={handleClick}
    >
      {/* Glow ring */}
      <div
        className="absolute w-20 h-20 rounded-full"
        style={{
          background: `radial-gradient(circle, ${app.glowColor}33, transparent 70%)`,
          animation: 'glowPulse 4s ease-in-out infinite',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          marginTop: '-10px',
        }}
      />

      {/* Icon */}
      <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {Icon && <Icon size={48} />}
      </div>

      {/* Name */}
      <span className="mt-2 text-sm font-medium text-white relative z-10">
        {app.name}
      </span>

      {/* Tagline */}
      <span className="text-xs text-[#a0a0b8] relative z-10 text-center max-w-[180px]">
        {app.tagline}
      </span>

      {/* Expanded card */}
      <NodeCard app={app} isOpen={isExpanded} position={cardPosition} />
    </div>
  )
}
