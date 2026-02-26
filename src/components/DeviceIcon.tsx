interface DeviceIconProps {
  type: 'desktop' | 'mobile'
  size?: number
  color?: string
}

export default function DeviceIcon({ type, size = 14, color = 'currentColor' }: DeviceIconProps) {
  if (type === 'desktop') {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="8" rx="1.5" stroke={color} strokeWidth="1.2" />
        <path d="M5 13h6" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M8 10v3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="4" y="1" width="8" height="14" rx="2" stroke={color} strokeWidth="1.2" />
      <path d="M7 12.5h2" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
