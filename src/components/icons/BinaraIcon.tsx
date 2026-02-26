export default function BinaraIcon({ size = 48, className = '', color = 'white' }: { size?: number; className?: string; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left channel wave */}
      <path
        d="M8 24 C14 16, 18 16, 24 24"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Right channel wave */}
      <path
        d="M24 24 C30 32, 34 32, 40 24"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Left channel wave — inverted phase */}
      <path
        d="M8 24 C14 32, 18 32, 24 24"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Right channel wave — inverted phase */}
      <path
        d="M24 24 C30 16, 34 16, 40 24"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Centre convergence point — the "beat" */}
      <circle cx="24" cy="24" r="2.5" fill={color} opacity="0.7" />
      <circle cx="24" cy="24" r="1.2" fill={color} opacity="1" />
      {/* Headphone hint — subtle arcs at outer edges */}
      <path
        d="M6 20 C6 14, 10 10, 16 10"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M42 20 C42 14, 38 10, 32 10"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  )
}
