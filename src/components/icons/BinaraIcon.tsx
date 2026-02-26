export default function BinaraIcon({ size = 48, className = '', color = 'white' }: { size?: number; className?: string; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="binara-grad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Circular boundary */}
      <circle cx="32" cy="32" r="29" stroke={color} strokeWidth="1.2" opacity="0.2" />

      {/* Wave 1 */}
      <path
        d="M12 32 C18 20, 26 20, 32 32 C38 44, 46 44, 52 32"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Wave 2 — phase shifted */}
      <path
        d="M12 32 C18 44, 26 44, 32 32 C38 20, 46 20, 52 32"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Centre convergence glow */}
      <circle cx="32" cy="32" r="4" fill={color} opacity="0.25" />
      <circle cx="32" cy="32" r="2" fill={color} opacity="0.7" />
    </svg>
  )
}
