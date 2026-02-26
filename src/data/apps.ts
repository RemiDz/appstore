export interface AppNode {
  id: string
  name: string
  tagline: string
  description: string
  url: string
  element: string
  glowColor: string
  position: { x: number; y: number }
}

// Order: top-of-mobile-scroll first → bottom last
export const apps: AppNode[] = [
  {
    id: 'nestorlab',
    name: 'Nestorium',
    tagline: 'Frequency Synthesis Platform',
    description:
      'Your complete frequency toolkit. Generate binaural beats, isochronal tones, solfeggio frequencies, and custom harmonic blends. A comprehensive synthesis platform for sound healing professionals.',
    url: 'https://nestorlab.app',
    element: 'Ether',
    glowColor: '#c084fc',
    position: { x: 78, y: 62 },
  },
  {
    id: 'binara',
    name: 'Binara',
    tagline: 'Tune Your Brainwaves',
    description:
      'Pure binaural beats and brainwave entrainment. Choose your target state — focus, sleep, meditation, creativity — and let precise stereo frequencies guide your brain into resonance. Headphones required.',
    url: 'https://binara.app',
    element: 'Ether',
    glowColor: '#a78bfa',
    position: { x: 75, y: 46 },
  },
  {
    id: 'overtone-singer',
    name: 'Overtone Singer',
    tagline: 'Real-Time Overtone Visualiser',
    description:
      'See your overtones as you sing them. A real-time frequency analyser designed specifically for overtone singing, showing fundamental and harmonic partials with precision visual feedback.',
    url: 'https://overtonesinger.com',
    element: 'Air',
    glowColor: '#22d3ee',
    position: { x: 72, y: 30 },
  },
  {
    id: 'sonarus',
    name: 'Sonarus',
    tagline: 'Vocal Biomarker Analysis',
    description:
      'Discover what your voice reveals. Analyse vocal frequency patterns, detect harmonic signatures, and explore the biomarker data hidden in the human voice for deeper practitioner insight.',
    url: 'https://sonarus.app',
    element: 'Fire',
    glowColor: '#f97316',
    position: { x: 28, y: 30 },
  },
  {
    id: 'lunar-practitioner',
    name: 'Lunar Practitioner',
    tagline: 'Moon-Guided Session Planner',
    description:
      'Plan your sound healing sessions with lunar intelligence. Real-time moon phase tracking, zodiac transits, and personalised guidance for aligning your practice with the lunar cycle.',
    url: 'https://lunata.app',
    element: 'Water',
    glowColor: '#818cf8',
    position: { x: 22, y: 62 },
  },
  {
    id: 'tidara',
    name: 'Tidara',
    tagline: 'Live Tidal Intelligence',
    description:
      'Track ocean tides with precision intelligence. Real-time tidal data, lunar-driven forecasts, and coastal insights for surfers, sailors, and sea lovers aligned with the rhythm of the waters.',
    url: 'https://tidara.app',
    element: 'Water',
    glowColor: '#4fc3f7',
    position: { x: 50, y: 82 },
  },
  {
    id: 'earth-pulse',
    name: 'Earth Pulse',
    tagline: 'Live Schumann Resonance Monitor',
    description:
      'Track Earth\u2019s electromagnetic heartbeat in real time. Monitor Schumann resonance amplitude, explore how planetary frequencies influence brainwave states, and align your practice with Earth\u2019s natural rhythms.',
    url: 'https://shumann.app',
    element: 'Earth',
    glowColor: '#4ade80',
    position: { x: 50, y: 95 },
  },
]
