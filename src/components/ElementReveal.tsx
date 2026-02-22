'use client'
import { useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'
import type { App } from '@/lib/apps'
import type { ElementConfig } from '@/lib/elements'

interface ElementRevealProps {
  app: App
  element: ElementConfig
  onClose: () => void
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const panelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 8,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

export default function ElementReveal({ app, element, onClose }: ElementRevealProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0"
      style={{ zIndex: 100, cursor: 'auto' }}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(5,5,15, 0.85)',
          backdropFilter: 'blur(12px)',
        }}
        onClick={onClose}
      />

      {/* Panel centering wrapper — fixed + flex so Framer Motion transforms don't conflict */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 101,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            maxWidth: 'min(520px, 90vw)',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            pointerEvents: 'auto',
            background: `linear-gradient(135deg,
              rgba(240,238,248, 0.03) 0%,
              rgba(200,196,220, 0.06) 50%,
              rgba(240,238,248, 0.02) 100%
            )`,
            backdropFilter: 'blur(24px) saturate(1.3)',
            border: `1px solid ${element.glowColor} 0.2)`,
            borderRadius: 24,
            boxShadow: `
              0 0 0 1px ${element.glowColor} 0.05) inset,
              0 0 80px ${element.glowColor} 0.12),
              0 32px 80px rgba(0,0,0, 0.7)
            `,
            padding: 40,
          }}
          onClick={(e) => e.stopPropagation()}
        >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute font-mono"
          style={{
            top: 16,
            right: 20,
            fontSize: 11,
            color: 'rgba(200,196,220, 0.35)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(200,196,220, 0.8)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(200,196,220, 0.35)')}
        >
          &#10005;
        </button>

        {/* Element symbol */}
        <div className="text-center">
          <span
            className="font-mono inline-block"
            style={{
              fontSize: 48,
              color: element.color,
              textShadow: `0 0 30px ${element.glowColor} 0.8), 0 0 60px ${element.glowColor} 0.4)`,
              animation: 'breathe 4s ease-in-out infinite',
            }}
          >
            {element.symbol}
          </span>
        </div>

        {/* Accent top line */}
        <div
          style={{
            height: 1,
            background: `linear-gradient(90deg, transparent, ${element.glowColor} 0.6) 30%, ${element.glowColor} 0.6) 70%, transparent)`,
            marginTop: 16,
            marginBottom: 24,
          }}
        />

        {/* App name */}
        <h2
          className="font-display text-center"
          style={{
            fontSize: 42,
            fontWeight: 300,
            letterSpacing: '0.04em',
            color: 'var(--selenite-white)',
          }}
        >
          {app.name}
        </h2>

        {/* Tagline */}
        <p
          className="text-center mt-2"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 14,
            color: 'rgba(200,196,220, 0.55)',
            letterSpacing: '0.08em',
            fontStyle: 'italic',
          }}
        >
          {app.tagline}
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(200,196,220, 0.12), transparent)',
            margin: '20px 0',
          }}
        />

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'rgba(200,196,220, 0.7)',
            lineHeight: 1.7,
          }}
        >
          {app.description}
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 mt-5">
          {app.features.map((feature) => (
            <span
              key={feature}
              className="font-mono"
              style={{
                fontSize: 9,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                background: `${element.glowColor} 0.08)`,
                border: `1px solid ${element.glowColor} 0.15)`,
                color: `${element.glowColor} 0.9)`,
                borderRadius: 4,
                padding: '4px 10px',
              }}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Bottom row — pricing left, Enter button right */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 28,
          paddingTop: 20,
          borderTop: '1px solid rgba(200,196,220, 0.08)',
        }}>
          {/* Pricing */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: app.pricing === 'pro' ? '#E8C97A' : 'rgba(200,196,220,0.4)',
          }}>
            {app.pricing === 'pro' ? `Pro · ${app.price}` : 'Free'}
          </div>

          {/* Enter button */}
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: `linear-gradient(135deg, ${element.color}33, ${element.color}14)`,
              border: `1px solid ${element.color}59`,
              color: element.color,
              borderRadius: 12,
              padding: '11px 24px',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.12em',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${element.color}4D`
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            Enter →
          </a>
        </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
