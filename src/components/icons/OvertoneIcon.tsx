export default function OvertoneIcon({ size = 48, className = '', color = 'white' }: { size?: number; className?: string; color?: string }) {
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
      <line x1="12" y1="8" x2="12" y2="40" />
      <line x1="20" y1="14" x2="20" y2="40" />
      <line x1="28" y1="18" x2="28" y2="40" />
      <line x1="36" y1="22" x2="36" y2="40" />
      <line x1="8" y1="40" x2="40" y2="40" strokeWidth={1} opacity={0.4} />
    </svg>
  )
}
