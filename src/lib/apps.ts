export interface App {
  id: string
  name: string
  tagline: string
  description: string
  url: string
  accent: string
  accentRgb: string
  glow1: string
  glow2: string
  device: 'desktop' | 'mobile'
  flagship?: boolean
  isPro?: boolean
  price?: string
}

export const apps: App[] = [
  {
    id: 'nestorium',
    name: 'Nestorium',
    tagline: 'Frequency Synthesis Platform',
    description: 'Binaural beats, guided sound journeys, isochronal tones, and frequency synthesis. Your complete sound healing companion.',
    url: 'https://nestorlab.app',
    accent: '#A78BFA',
    accentRgb: '167,139,250',
    glow1: '#7C3AED',
    glow2: '#C4B5FD',
    device: 'desktop',
    flagship: true,
  },
  {
    id: 'binara',
    name: 'Binara',
    tagline: 'Tune Your Brainwaves',
    description: 'Pure binaural beats and brainwave entrainment. Choose your target state and let precise stereo frequencies guide your brain into resonance.',
    url: 'https://binara.app',
    accent: '#22D3EE',
    accentRgb: '34,211,238',
    glow1: '#06B6D4',
    glow2: '#67E8F9',
    device: 'mobile',
  },
  {
    id: 'overtone-singer',
    name: 'Overtone Singer',
    tagline: 'Real-Time Overtone Visualiser',
    description: 'Watch your harmonics illuminate as you sing. Professional recording with frequency isolation for overtone practitioners.',
    url: 'https://overtonesinger.com',
    accent: '#FB923C',
    accentRgb: '251,146,60',
    glow1: '#EA580C',
    glow2: '#FDBA74',
    device: 'mobile',
  },
  {
    id: 'sonarus',
    name: 'Sonarus',
    tagline: 'Vocal Biomarker Analysis',
    description: 'Discover your unique vocal frequency profile in 15 seconds. 10 voice biomarkers with personalised chakra scoring.',
    url: 'https://sonarus.app',
    accent: '#2DD4BF',
    accentRgb: '45,212,191',
    glow1: '#0D9488',
    glow2: '#5EEAD4',
    device: 'mobile',
  },
  {
    id: 'lunar',
    name: 'Lunata',
    tagline: 'Moon-Guided Session Planner',
    description: 'Moon intelligence for sound healing sessions and ceremony planning. Live lunar data with phase-specific guidance.',
    url: 'https://lunata.app',
    accent: '#C084FC',
    accentRgb: '192,132,252',
    glow1: '#9333EA',
    glow2: '#D8B4FE',
    device: 'mobile',
  },
  {
    id: 'tidara',
    name: 'Tidara',
    tagline: 'Live Tidal Intelligence',
    description: 'Real-time tidal data with wellness insights. Align your practice with the rhythms of the ocean.',
    url: 'https://tidara.app',
    accent: '#38BDF8',
    accentRgb: '56,189,248',
    glow1: '#0284C7',
    glow2: '#7DD3FC',
    device: 'mobile',
  },
  {
    id: 'earth-pulse',
    name: 'Earth Pulse',
    tagline: 'Live Schumann Resonance',
    description: 'Track how space weather affects your energy, sleep, and mood. Live NOAA data with real-time wellness guidance.',
    url: 'https://shumann.app',
    accent: '#FBBF24',
    accentRgb: '251,191,36',
    glow1: '#D97706',
    glow2: '#FDE68A',
    device: 'mobile',
  },
]
