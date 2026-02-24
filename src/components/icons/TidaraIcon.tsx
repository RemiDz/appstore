export default function TidaraIcon({ size = 48, className = '', color = 'white' }: { size?: number; className?: string; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
    >
      {/* Top wave (larger, representing high tide) */}
      <path d="M8,18 C12,12 16,12 20,18 C24,24 28,24 32,18 C36,12 40,12 44,18" />
      {/* Middle wave */}
      <path d="M6,26 C10,21 14,21 18,26 C22,31 26,31 30,26 C34,21 38,21 42,26" opacity={0.6} />
      {/* Bottom wave (smaller, representing low tide) */}
      <path d="M10,34 C13,30 16,30 19,34 C22,38 25,38 28,34 C31,30 34,30 37,34" opacity={0.35} />
      {/* NOW dot on top wave peak */}
      <circle cx="20" cy="18" r="2" fill={color} stroke="none" />
    </svg>
  )
}
