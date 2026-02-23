import type { AppNode } from '@/data/apps'

export interface Edge {
  from: string
  to: string
  fromPos: { x: number; y: number }
  toPos: { x: number; y: number }
}

export function computeConnections(nodes: AppNode[]): Edge[] {
  const edges: Edge[] = []
  const seen = new Set<string>()

  for (const node of nodes) {
    const distances = nodes
      .filter((n) => n.id !== node.id)
      .map((n) => ({
        node: n,
        dist: Math.hypot(n.position.x - node.position.x, n.position.y - node.position.y),
      }))
      .sort((a, b) => a.dist - b.dist)

    const nearest = distances.slice(0, 2)

    for (const { node: neighbor } of nearest) {
      const key = [node.id, neighbor.id].sort().join('-')
      if (!seen.has(key)) {
        seen.add(key)
        edges.push({
          from: node.id,
          to: neighbor.id,
          fromPos: node.position,
          toPos: neighbor.position,
        })
      }
    }
  }

  return edges
}
