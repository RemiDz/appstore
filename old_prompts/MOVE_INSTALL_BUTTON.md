# MOVE INSTALL APP BUTTON BELOW APPS

> **Prompt for Claude Code** — Run from the `store.app` project root.
> Read the codebase first. **One change only — move the Install App button.**

---

## What to Do

The "Install App" button is currently positioned above the logo, between the header and the animated logo. Move it to **below the app grid, above the footer**.

Find the `InstallButton` component (or the install button markup) and relocate it so the page order is:

```
Header (title + subtitle + divider)
Animated Logo
Flagship card (Nestorium)
App grid (6 cards)
→ Install App button ← move it HERE
Footer (Created by Remi...)
```

---

## Rules

- **DO NOT** change the button's styling, functionality, or component code
- **DO NOT** change anything else on the page
- Just move the button element from its current position to between the app grid and the footer
