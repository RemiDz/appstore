'use client'

import { useCallback } from 'react'
import type { AppData } from '@/data/apps'

import EarthPulseIcon from './icons/EarthPulseIcon'
import LunarIcon from './icons/LunarIcon'
import SonarusIcon from './icons/SonarusIcon'
import OvertoneIcon from './icons/OvertoneIcon'
import NestoriumIcon from './icons/NestoriumIcon'
import TidaraIcon from './icons/TidaraIcon'
import BinaraIcon from './icons/BinaraIcon'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; color?: string }>> = {
  'earth-pulse': EarthPulseIcon,
  'lunar-practitioner': LunarIcon,
  'sonarus': SonarusIcon,
  'overtone-singer': OvertoneIcon,
  'nestorium': NestoriumIcon,
  'tidara': TidaraIcon,
  'binara': BinaraIcon,
}

interface AppNodeProps {
  app: AppData
  index: number
  isCenter?: boolean
  onTap?: (app: AppData) => void
}

export default function AppNode({ app, index, isCenter, onTap }: AppNodeProps) {
  const Icon = iconMap[app.id]
  const iconSize = isCenter ? 34 : 28
  const nameSize = isCenter ? '13px' : '11px'
  const delay = 1.0 + index * 0.1

  const handleClick = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      window.open(app.url, '_blank', 'noopener,noreferrer')
    } else if (onTap) {
      onTap(app)
    }
  }, [app, onTap])

  return (
    <div
      className="flex flex-col items-center cursor-pointer group"
      style={{
        animation: `nodeAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`,
      }}
      onClick={handleClick}
    >
      {/* Glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: isCenter ? '80px' : '64px',
          height: isCenter ? '80px' : '64px',
          background: `radial-gradient(circle, ${app.accentColor}30 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          marginTop: isCenter ? '-10px' : '-8px',
          animation: `glowPulse 4s ease-in-out ${index * 0.6}s infinite`,
          willChange: 'transform, opacity',
        }}
      />

      {/* Icon */}
      <div className="relative z-10 transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
        {Icon && <Icon size={iconSize} color={app.accentColor} />}
      </div>

      {/* Name */}
      <span
        className="relative z-10 mt-1 font-medium text-white text-center leading-tight"
        style={{
          fontSize: nameSize,
          textShadow: `0 0 16px ${app.accentColor}30`,
          maxWidth: '80px',
        }}
      >
        {app.name}
      </span>

      {/* Desktop tooltip — tagline on hover */}
      <div
        className="hidden md:block absolute z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          top: '100%',
          marginTop: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          className="px-3 py-1.5 rounded-lg text-center"
          style={{
            background: 'rgba(10, 10, 30, 0.9)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${app.accentColor}25`,
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          {app.tagline}
        </div>
      </div>
    </div>
  )
}
