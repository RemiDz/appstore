# CENTRE LOGO — FIX VERTICAL POSITION

> **Prompt for Claude Code** — Run from the `store.app` project root.
> **One change only — adjust logo vertical position.**

---

## The Problem

The animated logo appears vertically off-centre. It looks too close to the header and too far from the apps. This is because the header block is taller than it looks — it includes:

1. "HARMONIC WAVES" title
2. "Tools for Sound Healers" subtitle
3. The ────── ◇ ────── divider line

The logo needs to be centred between the **bottom of the divider** (the last header element) and the **top of the Nestorium flagship card** (the first app element).

Currently the logo has too little space above it (after the divider) and too much space below it (before the Nestorium card) — or the margins are simply not accounting for the full header height.

---

## The Fix

Find the logo container in the page. Increase its `marginTop` (to push it further from the header) and decrease its `marginBottom` (to bring it closer to the apps) until the gap above and below the logo looks visually equal.

As a rough guide:
- Add more top margin to the logo container (try adding 8–16px more than current)
- Reduce bottom margin by the same amount
- Or use negative margins on the logo canvas itself to eat into existing spacing

The goal: if you put a ruler on the screen, the distance from the divider diamond to the top of the logo canvas should equal the distance from the bottom of the logo canvas to the top of the Nestorium card.

---

## Rules

- **ONLY** adjust the logo container's margins or padding
- **DO NOT** change the header, apps, logo component, or anything else
