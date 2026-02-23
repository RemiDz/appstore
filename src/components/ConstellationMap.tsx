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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  // Desktop: absolute constellation layout
  if (!isMobile) {
    return (
      <div className="relative w-full" style={{ height: 'calc(100vh - 200px)', minHeight: '500px' }}>
        <ConnectionLines edges={edges} />
        {apps.map((app) => (
          <div
            key={app.id}
            className="absolute"
            style={{
              left: `${app.position.x}%`,
              top: `${app.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <ConstellationNode
              app={app}
              isExpanded={expandedId === app.id}
              isMobile={false}
              onToggle={handleToggle}
            />
          </div>
        ))}
      </div>
    )
  }

  // Mobile: vertical stack — tap opens page-level modal
  return (
    <div className="flex flex-col items-center gap-16 pt-24 pb-32 px-6">
      {apps.map((app) => (
        <ConstellationNode
          key={app.id}
          app={app}
          isExpanded={false}
          isMobile={true}
          onToggle={handleToggle}
          onTap={onSelectApp}
        />
      ))}
    </div>
  )
}
