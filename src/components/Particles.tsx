function seed(n: number) {
  const x = Math.sin(n) * 10000
  return x - Math.floor(x)
}

const COUNT = 35

const particles = Array.from({ length: COUNT }, (_, i) => {
  const s = i + 1
  return {
    x: seed(s) * 100,
    y: seed(s * 7 + 3) * 100,
    size: 1 + seed(s * 11 + 7) * 1.2,
    opacity: 0.08 + seed(s * 17 + 13) * 0.14,
    driftX: (seed(s * 23 + 2) - 0.5) * 30,
    driftY: (seed(s * 29 + 5) - 0.5) * 30,
    duration: 20 + seed(s * 31 + 11) * 25,
    pulseDelay: seed(s * 37 + 19) * 10,
  }
})

export default function Particles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            '--drift-x': `${p.driftX}px`,
            '--drift-y': `${p.driftY}px`,
            '--p-op': p.opacity,
            animation: `drift ${p.duration}s ease-in-out infinite, particlePulse ${8 + seed((i + 1) * 41) * 6}s ease-in-out ${p.pulseDelay}s infinite`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
