function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const STAR_COUNT = 80

const stars = Array.from({ length: STAR_COUNT }, (_, i) => {
  const seed = i + 1
  const x = seededRandom(seed) * 100
  const y = seededRandom(seed * 7 + 3) * 100
  const tier = i % 3 // 0 = small, 1 = medium, 2 = large
  const size = [1, 1.5, 2][tier]
  const delay = seededRandom(seed * 13 + 5) * 8
  const duration = 3 + seededRandom(seed * 19 + 11) * 5

  return { x, y, size, delay, duration }
})

export default function Starfield() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            opacity: 0.15,
          }}
        />
      ))}
    </div>
  )
}
