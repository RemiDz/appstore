'use client'

import { useState, useEffect, useRef } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallButton() {
  const [installable, setInstallable] = useState(false)
  const [showIOSGuide, setShowIOSGuide] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true
    setIsStandalone(standalone)
    if (standalone) return

    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(ios)
    if (ios) {
      setInstallable(true)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      deferredPrompt.current = e as BeforeInstallPromptEvent
      setInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true)
      return
    }

    if (deferredPrompt.current) {
      await deferredPrompt.current.prompt()
      const result = await deferredPrompt.current.userChoice
      if (result.outcome === 'accepted') {
        setInstallable(false)
      }
      deferredPrompt.current = null
    }
  }

  if (isStandalone || !installable) return null

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Install Harmonic Waves app"
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          padding: '8px 18px',
          borderRadius: 24,
          background: 'rgba(167, 139, 250, 0.1)',
          border: '1px solid rgba(167, 139, 250, 0.25)',
          color: 'rgba(255, 255, 255, 0.75)',
          fontSize: 11,
          fontFamily: 'inherit',
          fontWeight: 400,
          letterSpacing: '0.06em',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          WebkitTapHighlightColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(167, 139, 250, 0.18)'
          e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.4)'
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(167, 139, 250, 0.1)'
          e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.25)'
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4.5 7.5L8 11l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Install App
      </button>

      {showIOSGuide && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            animation: 'fadeIn 0.3s ease-out',
          }}
          onClick={() => setShowIOSGuide(false)}
        >
          {/* Backdrop */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(8, 4, 20, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }} />

          {/* Guide sheet */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative', zIndex: 1,
              width: '100%', maxWidth: 400,
              padding: '32px 28px calc(env(safe-area-inset-bottom, 0px) + 32px)',
              borderRadius: '28px 28px 0 0',
              background: 'rgba(20, 16, 40, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: 'none',
              transform: 'translateY(0)',
              animation: 'iosSlideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowIOSGuide(false)}
              style={{
                position: 'absolute', top: 14, right: 16,
                width: 34, height: 34, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.4)', fontSize: 14,
                cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >✕</button>

            {/* Handle */}
            <div style={{
              width: 40, height: 4, borderRadius: 2,
              background: 'rgba(255,255,255,0.15)',
              margin: '0 auto 24px',
            }} />

            <h3 style={{
              fontSize: 18, fontWeight: 400,
              letterSpacing: '0.03em', marginBottom: 20,
              textAlign: 'center',
            }}>
              Add to Home Screen
            </h3>

            {/* Step 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'rgba(167, 139, 250, 0.12)',
                border: '1px solid rgba(167, 139, 250, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: 13, fontWeight: 500,
                color: '#A78BFA',
              }}>1</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 400, marginBottom: 4 }}>
                  Tap the Share button
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 300, lineHeight: 1.4 }}>
                  The square icon with an arrow pointing up — in the bottom toolbar of Safari
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  gap: 6, marginTop: 8,
                  padding: '5px 12px', borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3v10" stroke="rgba(56,189,248,0.8)" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M6 7l4-4 4 4" stroke="rgba(56,189,248,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 12v4a2 2 0 002 2h8a2 2 0 002-2v-4" stroke="rgba(56,189,248,0.8)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Share</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'rgba(167, 139, 250, 0.12)',
                border: '1px solid rgba(167, 139, 250, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: 13, fontWeight: 500,
                color: '#A78BFA',
              }}>2</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 400, marginBottom: 4 }}>
                  Scroll down and tap &quot;Add to Home Screen&quot;
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 300, lineHeight: 1.4 }}>
                  Look for the icon with a + symbol
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  gap: 6, marginTop: 8,
                  padding: '5px 12px', borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="3" width="14" height="14" rx="3" stroke="rgba(56,189,248,0.8)" strokeWidth="1.5" />
                    <path d="M10 7v6M7 10h6" stroke="rgba(56,189,248,0.8)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Add to Home Screen</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'rgba(167, 139, 250, 0.12)',
                border: '1px solid rgba(167, 139, 250, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: 13, fontWeight: 500,
                color: '#A78BFA',
              }}>3</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 400 }}>
                  Tap &quot;Add&quot; — done!
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 300, marginTop: 4, lineHeight: 1.4 }}>
                  Harmonic Waves will appear on your home screen as a standalone app
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
