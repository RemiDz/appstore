# ADD "INSTALL APP" BUTTON TO HUB

> **Prompt for Claude Code** — Run from the `store.app` project root.
> Read the codebase first. This adds a small install button to the page. No layout restructuring.

---

## Overview

Add a button that lets users save harmonicwaves.app to their phone home screen. There are two different flows depending on the platform:

- **Android / Chrome / Edge:** The browser has a native `beforeinstallprompt` API — we intercept it and trigger it from our button
- **iOS Safari:** No install API exists — we show a guided instruction overlay telling the user to tap Share → Add to Home Screen

The button should feel premium and match the existing UI. It should NOT appear if the app is already installed (running in standalone mode).

---

## Prerequisites

This requires the PWA manifest and icons from the previous `CREATE_APP_ICON.md` prompt. Make sure `public/manifest.json` and the icon files exist before implementing this. If they don't exist yet, create them first following that prompt.

---

## Implementation

### 1. Create `src/components/InstallButton.tsx`

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallButton() {
  const [installable, setInstallable] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true;
    setIsStandalone(standalone);
    if (standalone) return;

    // Detect iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);
    if (ios) {
      setInstallable(true);
      return;
    }

    // Android / Chrome — listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (deferredPrompt.current) {
      await deferredPrompt.current.prompt();
      const result = await deferredPrompt.current.userChoice;
      if (result.outcome === 'accepted') {
        setInstallable(false);
      }
      deferredPrompt.current = null;
    }
  };

  // Don't render if already installed or not installable
  if (isStandalone || !installable) return null;

  return (
    <>
      {/* Install Button */}
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
          e.currentTarget.style.background = 'rgba(167, 139, 250, 0.18)';
          e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.4)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(167, 139, 250, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.25)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
        }}
      >
        {/* Download/install icon */}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4.5 7.5L8 11l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Install App
      </button>

      {/* iOS Guide Overlay */}
      {showIOSGuide && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            animation: 'fadeIn 0.3s ease-out',
          }}
          onClick={() => setShowIOSGuide(false)}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
          `}</style>

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
              padding: '32px 28px 40px',
              borderRadius: '28px 28px 0 0',
              background: 'rgba(20, 16, 40, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: 'none',
              animation: 'slideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both',
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
                {/* Share icon illustration */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  gap: 6, marginTop: 8,
                  padding: '5px 12px', borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3v10" stroke="rgba(56,189,248,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M6 7l4-4 4 4" stroke="rgba(56,189,248,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 12v4a2 2 0 002 2h8a2 2 0 002-2v-4" stroke="rgba(56,189,248,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
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
                  Scroll down and tap "Add to Home Screen"
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 300, lineHeight: 1.4 }}>
                  Look for the icon with a + symbol
                </div>
                {/* Add to home screen icon illustration */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  gap: 6, marginTop: 8,
                  padding: '5px 12px', borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="3" width="14" height="14" rx="3" stroke="rgba(56,189,248,0.8)" strokeWidth="1.5"/>
                    <path d="M10 7v6M7 10h6" stroke="rgba(56,189,248,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
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
                  Tap "Add" — done!
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
  );
}
```

---

### 2. Place the Button in the Page

Add the `InstallButton` component **between the header divider and the flagship card**. Wrap it in a centred container:

```tsx
import InstallButton from '@/components/InstallButton';

// Inside the page, after the header and before the flagship:

<div style={{
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
  marginTop: 'clamp(8px, 2vh, 14px)',
}}>
  <InstallButton />
</div>
```

The button auto-hides when:
- The app is already installed (running in standalone mode)
- The browser doesn't support installation (desktop browsers without PWA support)

So it only shows when it's actually useful.

---

### 3. Important Behaviour Notes

**Android / Chrome:**
- The `beforeinstallprompt` event fires automatically when PWA criteria are met (manifest + HTTPS + service worker)
- We intercept it, store the event, and trigger it when the user clicks our button
- After installation, the button disappears

**iOS Safari:**
- No install API exists — Apple doesn't allow it
- Our button opens a beautiful step-by-step guide overlay
- The guide matches the app's overlay design (bottom sheet, frosted glass, same animation)
- Steps show actual Safari UI icons so users recognise them

**Already installed:**
- `display-mode: standalone` media query detects this
- iOS also has `navigator.standalone`
- Button simply doesn't render

---

### 4. Optional: Service Worker for Full PWA

For the install prompt to work on Chrome/Android, the site technically needs a service worker. Add a minimal one:

Create `public/sw.js`:
```js
// Minimal service worker for PWA install support
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
```

Register it in `src/app/layout.tsx` or a client component:
```tsx
useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}, []);
```

This is the minimum viable service worker — it doesn't cache anything, just enables the PWA install prompt.

---

## Testing Checklist

- [ ] Button appears on iPhone Safari with "Install App" text
- [ ] Tapping on iOS opens the guided instruction overlay
- [ ] iOS guide shows correct Share icon and steps
- [ ] Tapping outside or ✕ closes the iOS guide
- [ ] On Android Chrome, button triggers native install prompt
- [ ] After installing, button disappears on next visit
- [ ] Button does NOT appear when app is already in standalone mode
- [ ] Button styling matches the hub's aesthetic (purple tint, glass feel)
- [ ] Button doesn't break the single-screen layout (no scrolling introduced)
- [ ] `next build` passes
