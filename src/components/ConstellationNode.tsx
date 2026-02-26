'use client'

import { useCallback } from 'react'
import type { AppNode } from '@/data/apps'
import NodeCard from './NodeCard'

import EarthPulseIcon from './icons/EarthPulseIcon'
import LunarIcon from './icons/LunarIcon'
import SonarusIcon from './icons/SonarusIcon'
import OvertoneIcon from './icons/OvertoneIcon'
import NestoriumIcon from './icons/NestoriumIcon'
import TidaraIcon from './icons/TidaraIcon'
import BinaraIcon from './icons/BinaraIcon'

const elementEmoji: Record<string, string> = {
  Earth: '\u{1F30D}',
  Water: '\u{1F30A}',
  Fire: '\u{1F525}',
  Air: '\u{1F32C}\uFE0F',
  Ether: '\u2728',
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; color?: string }>> = {
  'earth-pulse': EarthPulseIcon,
  'lunar-practitioner': LunarIcon,
  'sonarus': SonarusIcon,
  'overtone-singer': OvertoneIcon,
  'nestorlab': NestoriumIcon,
  'tidara': TidaraIcon,
  'binara': BinaraIcon,
}

const floatDurations: Record<string, number> = {
  'earth-pulse': 5,
  'lunar-practitioner': 6,
  'sonarus': 4.5,
  'overtone-singer': 5.5,
  'nestorlab': 7,
  'tidara': 5.8,
  'binara': 6.2,
}

const glowDelays: Record<string, number> = {
  'earth-pulse': 0,
  'lunar-practitioner': 0.8,
  'sonarus': 1.6,
  'overtone-singer': 2.4,
  'nestorlab': 3.2,
  'tidara': 4.0,
  'binara': 4.8,
}

interface ConstellationNodeProps {
  app: AppNode
  isExpanded: boolean
  onToggle: (id: string) => void
  onTap?: (app: AppNode) => void
}

export default function ConstellationNode({ app, isExpanded, onToggle, onTap }: ConstellationNodeProps) {
  const Icon = iconMap[app.id]
  const floatDuration = floatDurations[app.id] ?? 5
  const glowDelay = glowDelays[app.id] ?? 0
  const cardPosition = app.position.y > 60 ? 'above' as const : 'below' as const

  const handleClick = useCallback(() => {
    // On mobile (<768px), open page-level modal; on desktop, toggle inline card
    if (window.innerWidth < 768 && onTap) {
      onTap(app)
    } else {
      onToggle(app.id)
    }
  }, [app, onTap, onToggle])

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer group"
      style={{ animation: `float ${floatDuration}s ease-in-out infinite` }}
      onClick={handleClick}
    >
      {/* Glow ring */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '90px',
          height: '90px',
          background: `radial-gradient(circle, ${app.glowColor}33 0%, transparent 70%)`,
          animation: `glowPulse 4s ease-in-out ${glowDelay}s infinite`,
          top: '0',
          left: '50%',
          marginTop: '-27px',
          willChange: 'transform, opacity',
        }}
      />

      {/* Icon */}
      <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {Icon && <Icon size={36} color={app.glowColor} />}
      </div>

      {/* Name */}
      <span
        className="mt-1 text-sm font-medium text-white relative z-10"
        style={{ textShadow: `0 0 20px ${app.glowColor}40` }}
      >
        {app.name}
      </span>

      {/* Tagline */}
      <span className="text-xs text-[#a0a0b8] relative z-10 text-center max-w-[180px]">
        {app.tagline}
      </span>

      {/* Element label */}
      <span
        className="relative z-10 mt-1"
        style={{
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: app.glowColor,
          opacity: 0.4,
        }}
      >
        {elementEmoji[app.element] ?? ''} {app.element}
      </span>

      {/* Pro badge (only for paid apps) */}
      {app.pricing === 'pro' && app.priceLabel && (
        <span
          className="relative z-10 mt-1"
          style={{
            fontSize: '10px',
            letterSpacing: '0.1em',
            padding: '2px 8px',
            borderRadius: '9999px',
            background: `${app.glowColor}20`,
            color: app.glowColor,
          }}
        >
          {app.priceLabel}
        </span>
      )}

      {/* Open cue */}
      <span
        className="relative z-10 mt-1 transition-opacity duration-200 group-hover:opacity-60"
        style={{ fontSize: '11px', color: 'white', opacity: 0.25 }}
      >
        Open &rarr;
      </span>

      {/* Desktop-only inline card (hidden on mobile via CSS) */}
      <div className="hidden md:block">
        <NodeCard app={app} isOpen={isExpanded} position={cardPosition} />
      </div>
    </div>
  )
}
