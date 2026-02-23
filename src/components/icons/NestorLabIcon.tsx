export default function NestorLabIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
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
      {/* Tuning fork */}
      <path d="M20 8v16" />
      <path d="M28 8v16" />
      <path d="M20 24a4 4 0 0 0 8 0" />
      <line x1="24" y1="28" x2="24" y2="40" />
      {/* Radiating arcs */}
      <path d="M14 14a12 12 0 0 0 0 16" />
      <path d="M34 14a12 12 0 0 1 0 16" />
    </svg>
  )
}
