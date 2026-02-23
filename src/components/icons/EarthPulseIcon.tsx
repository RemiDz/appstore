export default function EarthPulseIcon({ size = 48, className = '', color = 'white' }: { size?: number; className?: string; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="24" cy="24" r="12" />
      <ellipse cx="24" cy="24" rx="12" ry="5" />
      <ellipse cx="24" cy="24" rx="5" ry="12" />
      <path d="M4 24 Q10 18, 16 24 Q22 30, 28 24 Q34 18, 40 24" strokeWidth={1.5} />
    </svg>
  )
}
