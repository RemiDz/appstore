import type { ElementName } from './elements'

export interface App {
  id: string
  name: string
  tagline: string
  description: string
  element: ElementName
  features: string[]
  pricing: 'free' | 'pro'
  price?: string
  url: string
}

export const apps: App[] = [
  {
    id: 'earth-pulse',
    name: 'Earth Pulse',
    tagline: 'Tune into the planet\'s heartbeat',
    description: 'Track how space weather, geomagnetic activity, and Schumann resonance affect your energy, sleep, and mood. Live NOAA data with real-time wellness guidance for sound healing practitioners.',
    element: 'Earth',
    features: ['Live NOAA Data', 'Schumann Resonance', 'Wellness Engine', 'Aurora Alerts'],
    pricing: 'free',
    url: 'https://shumann.app',
  },
  {
    id: 'nestorlab',
    name: 'NestorLab',
    tagline: 'Flow into frequency',
    description: 'Binaural beats, guided sound journeys, isochronal tones, and frequency synthesis. A complete sound healing companion that runs entirely in your browser \u2014 no install, no accounts.',
    element: 'Water',
    features: ['Binaural Beats', 'Guided Journeys', 'Frequency Wheel', 'Ambient Soundscapes'],
    pricing: 'free',
    url: 'https://nestorlab.app',
  },
  {
    id: 'overtone-singer',
    name: 'Overtone Singer',
    tagline: 'See your voice come alive',
    description: 'Real-time vocal frequency analyser for overtone singers and sound healing practitioners. Watch your harmonics illuminate as you sing, with professional recording and frequency isolation.',
    element: 'Fire',
    features: ['Live Spectrogram', 'Harmonic Overlay', 'Video Recording', 'Frequency Isolation'],
    pricing: 'pro',
    price: '$6.99',
    url: 'https://overtonesinger.com',
  },
  {
    id: 'harmonic-intake',
    name: 'Harmonic Intake',
    tagline: 'Your voice holds the map',
    description: 'Discover your unique vocal frequency profile in 15 seconds. Real-time analysis of 10 voice biomarkers with personalised chakra scoring and sound healing guidance.',
    element: 'Air',
    features: ['10 Voice Biomarkers', 'Chakra Scoring', 'Healing Tones', 'Shareable Reports'],
    pricing: 'free',
    url: 'https://sonarus.app',
  },
  {
    id: 'lunar-practitioner',
    name: 'Lunar Practitioner',
    tagline: 'Let the moon guide your practice',
    description: 'Moon intelligence for sound healing sessions and ceremony planning. Live lunar data, phase-specific session guidance, and astrological context for practitioners who work with cosmic rhythms.',
    element: 'Ether',
    features: ['Live Lunar Calendar', 'Phase Guidance', 'Ceremony Planning', 'Astrological Context'],
    pricing: 'free',
    url: 'https://lunata.app',
  },
]
