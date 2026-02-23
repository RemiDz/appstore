export default function OvertoneIcon({ size = 48, className = '', color = 'white' }: { size?: number; className?: string; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      {/* Simplified head profile — half circle facing right */}
      <path
        d="M16 7 C10 7 7 12 7 18 C7 24 10 29 16 29 L16 27 C16 25.5 17 24 18 23 L19 22"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Nose bump */}
      <path
        d="M16 16 L18 17.5 L17 19"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Open mouth */}
      <ellipse cx="19.5" cy="22" rx="1.3" ry="2" stroke={color} strokeWidth={1.4} />
      {/* Three sound wave arcs */}
      <path d="M23 19.5 C24.5 20.8 24.5 23.5 23 25" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M26 17.5 C28.5 19.8 28.5 25 26 27" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M29 15.5 C32.5 18.5 32.5 26.5 29 29" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  )
}
