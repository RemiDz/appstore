export interface AppData {
  id: string
  name: string
  tagline: string
  url: string
  element: string
  accentColor: string
  isPro?: boolean
  price?: string
}

export const apps: AppData[] = [
  {
    id: 'nestorium',
    name: 'Nestorium',
    tagline: 'Frequency Synthesis Platform',
    url: 'https://nestorlab.app',
    element: 'ether',
    accentColor: '#8B6FE8',
  },
  {
    id: 'binara',
    name: 'Binara',
    tagline: 'Tune Your Brainwaves',
    url: 'https://binara.app',
    element: 'water',
    accentColor: '#1E6F8C',
  },
  {
    id: 'overtone-singer',
    name: 'Overtone Singer',
    tagline: 'Real-Time Overtone Visualiser',
    url: 'https://overtonesinger.com',
    element: 'fire',
    accentColor: '#E8621A',
    isPro: true,
    price: '$6.99',
  },
  {
    id: 'sonarus',
    name: 'Sonarus',
    tagline: 'Vocal Biomarker Analysis',
    url: 'https://sonarus.app',
    element: 'air',
    accentColor: '#7ECBCE',
  },
  {
    id: 'lunar-practitioner',
    name: 'Lunar Practitioner',
    tagline: 'Moon-Guided Session Planner',
    url: 'https://lunata.app',
    element: 'ether',
    accentColor: '#8B6FE8',
  },
  {
    id: 'tidara',
    name: 'Tidara',
    tagline: 'Live Tidal Intelligence',
    url: 'https://tidara.app',
    element: 'water',
    accentColor: '#2E86AB',
  },
  {
    id: 'earth-pulse',
    name: 'Earth Pulse',
    tagline: 'Live Schumann Resonance Monitor',
    url: 'https://shumann.app',
    element: 'earth',
    accentColor: '#A0714F',
  },
]
