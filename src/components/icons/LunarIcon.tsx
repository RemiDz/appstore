export default function LunarIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
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
      {/* Crescent moon */}
      <path d="M30 10a14 14 0 1 0 0 28 10 10 0 0 1 0-28z" />
      {/* Phase dots */}
      <circle cx="10" cy="38" r="1.5" fill="white" stroke="none" />
      <circle cx="16" cy="40" r="1.5" fill="white" stroke="none" opacity={0.6} />
      <circle cx="22" cy="41" r="1.5" fill="white" stroke="none" opacity={0.3} />
    </svg>
  )
}
