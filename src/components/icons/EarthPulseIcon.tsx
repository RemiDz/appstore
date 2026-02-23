export default function EarthPulseIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Globe circle */}
      <circle cx="24" cy="24" r="12" />
      {/* Equator line */}
      <ellipse cx="24" cy="24" rx="12" ry="5" />
      {/* Meridian */}
      <ellipse cx="24" cy="24" rx="5" ry="12" />
      {/* Sine wave running through */}
      <path d="M4 24 Q10 18, 16 24 Q22 30, 28 24 Q34 18, 40 24" strokeWidth={1.5} />
    </svg>
  )
}
