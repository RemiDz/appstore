export default function OvertoneIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
    >
      {/* Fundamental — tallest */}
      <line x1="12" y1="8" x2="12" y2="40" />
      {/* 2nd harmonic */}
      <line x1="20" y1="14" x2="20" y2="40" />
      {/* 3rd harmonic */}
      <line x1="28" y1="18" x2="28" y2="40" />
      {/* 4th harmonic */}
      <line x1="36" y1="22" x2="36" y2="40" />
      {/* Baseline */}
      <line x1="8" y1="40" x2="40" y2="40" strokeWidth={1} opacity={0.4} />
    </svg>
  )
}
