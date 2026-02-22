'use client'

export default function HubLabel() {
  return (
    <div
      className="fixed left-0 right-0 text-center pointer-events-none"
      style={{ top: 32, zIndex: 3 }}
    >
      <p
        className="font-mono"
        style={{
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.35em',
          color: 'rgba(200,196,220, 0.3)',
        }}
      >
        Harmonic Waves
      </p>
      <p
        className="font-display mt-1"
        style={{
          fontSize: 14,
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'rgba(200,196,220, 0.2)',
        }}
      >
        Tools for Sound Healers
      </p>
    </div>
  )
}
