'use client'

import { useState, useCallback, useEffect } from 'react'
import { apps, type AppNode } from '@/data/apps'
import { computeConnections } from '@/lib/utils'
import ConstellationNode from './ConstellationNode'
import ConnectionLines from './ConnectionLines'

const edges = computeConnections(apps)

interface ConstellationMapProps {
  onSelectApp?: (app: AppNode) => void
}

export default function ConstellationMap({ onSelectApp }: ConstellationMapProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  // Single render path: mobile-first flex column, md: absolute constellation
  return (
    <div className="relative flex flex-col items-center gap-2 pb-0 px-6 md:block md:pt-0 md:pb-0 md:px-0" style={{ minHeight: '500px' }}>
      <ConnectionLines edges={edges} />
      {apps.map((app) => (
        <div
          key={app.id}
          className={`relative md:absolute constellation-node transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          style={{
            '--node-x': `${app.position.x}%`,
            '--node-y': `${app.position.y}%`,
          } as React.CSSProperties}
        >
          <ConstellationNode
            app={app}
            isExpanded={expandedId === app.id}
            onToggle={handleToggle}
            onTap={onSelectApp}
          />
        </div>
      ))}
    </div>
  )
}
