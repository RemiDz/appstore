export type ElementName = 'Earth' | 'Water' | 'Fire' | 'Air' | 'Ether'

export interface OrbBehaviour {
  pulseSpeed: number
  pulseScale: number
  wobble: boolean
  wobbleAmount: number
  wobbleSpeed: number
}

export interface ParticleStyle {
  count: number
  size: [number, number]
  speed: [number, number]
  life: [number, number]
  shape: 'dot' | 'spark' | 'ring' | 'dust'
}

export interface ElementConfig {
  name: ElementName
  symbol: string
  color: string
  glowColor: string
  darkColor: string
  description: string
  orbBehaviour: OrbBehaviour
  particleStyle: ParticleStyle
}

export const elements: Record<ElementName, ElementConfig> = {
  Earth: {
    name: 'Earth',
    symbol: '\u25C9',
    color: '#A0714F',
    glowColor: 'rgba(160, 113, 79,',
    darkColor: '#5C3D24',
    description: 'Grounding \u00B7 Resonance \u00B7 Body',
    orbBehaviour: {
      pulseSpeed: 4.0,
      pulseScale: 1.06,
      wobble: true,
      wobbleAmount: 3,
      wobbleSpeed: 7,
    },
    particleStyle: {
      count: 12,
      size: [1, 2.5],
      speed: [0.2, 0.6],
      life: [2, 5],
      shape: 'dust',
    },
  },
  Water: {
    name: 'Water',
    symbol: '\u25C8',
    color: '#3A9BC1',
    glowColor: 'rgba(58, 155, 193,',
    darkColor: '#1A5A78',
    description: 'Flow \u00B7 Depth \u00B7 Journey',
    orbBehaviour: {
      pulseSpeed: 3.0,
      pulseScale: 1.10,
      wobble: true,
      wobbleAmount: 5,
      wobbleSpeed: 4,
    },
    particleStyle: {
      count: 20,
      size: [0.5, 2],
      speed: [0.4, 1.0],
      life: [1.5, 4],
      shape: 'ring',
    },
  },
  Fire: {
    name: 'Fire',
    symbol: '\u25C6',
    color: '#E8621A',
    glowColor: 'rgba(232, 98, 26,',
    darkColor: '#8B2E05',
    description: 'Transformation \u00B7 Voice \u00B7 Power',
    orbBehaviour: {
      pulseSpeed: 1.8,
      pulseScale: 1.12,
      wobble: true,
      wobbleAmount: 4,
      wobbleSpeed: 2,
    },
    particleStyle: {
      count: 30,
      size: [0.5, 3],
      speed: [1.0, 3.0],
      life: [0.5, 2],
      shape: 'spark',
    },
  },
  Air: {
    name: 'Air',
    symbol: '\u25C7',
    color: '#7ECBCE',
    glowColor: 'rgba(126, 203, 206,',
    darkColor: '#3A8A8E',
    description: 'Breath \u00B7 Clarity \u00B7 Frequency',
    orbBehaviour: {
      pulseSpeed: 5.0,
      pulseScale: 1.15,
      wobble: true,
      wobbleAmount: 8,
      wobbleSpeed: 6,
    },
    particleStyle: {
      count: 25,
      size: [0.3, 1.5],
      speed: [0.8, 2.0],
      life: [2, 6],
      shape: 'dust',
    },
  },
  Ether: {
    name: 'Ether',
    symbol: '\u2726',
    color: '#8B6FE8',
    glowColor: 'rgba(139, 111, 232,',
    darkColor: '#4A2FA0',
    description: 'Cosmos \u00B7 Moon \u00B7 Beyond',
    orbBehaviour: {
      pulseSpeed: 6.0,
      pulseScale: 1.08,
      wobble: false,
      wobbleAmount: 0,
      wobbleSpeed: 0,
    },
    particleStyle: {
      count: 35,
      size: [0.3, 2],
      speed: [0.1, 0.5],
      life: [3, 8],
      shape: 'ring',
    },
  },
}

export const pentagonAngles: Record<ElementName, number> = {
  Ether: 270,
  Fire:  342,
  Earth: 54,
  Water: 126,
  Air:   198,
}
