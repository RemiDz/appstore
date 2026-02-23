export default function SonarusIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
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
      {/* Stylised mouth / voice source */}
      <ellipse cx="14" cy="24" rx="6" ry="8" />
      {/* Wave arcs emanating outward */}
      <path d="M22 16a10 10 0 0 1 0 16" />
      <path d="M28 12a16 16 0 0 1 0 24" />
      <path d="M34 8a22 22 0 0 1 0 32" />
    </svg>
  )
}
