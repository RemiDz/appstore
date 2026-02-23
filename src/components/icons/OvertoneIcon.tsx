export default function OvertoneIcon({ size = 48, className = '', color = 'white' }: { size?: number; className?: string; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      {/* Circular head */}
      <circle cx="14" cy="18" r="9" stroke={color} strokeWidth={1.8} />
      {/* Open mouth — small circle on right side of head */}
      <circle cx="21.5" cy="21" r="2" stroke={color} strokeWidth={1.5} />
      {/* Sound wave arcs from mouth */}
      <path d="M25 18C26.5 19.5 26.5 23 25 24.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M28 16C30.5 18.5 30.5 24 28 26.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M31 14C34.5 17.5 34.5 25.5 31 28.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  )
}
