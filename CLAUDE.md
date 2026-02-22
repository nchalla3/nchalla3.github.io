# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Next.js 16** (App Router, static export) + **TypeScript**
- **Framer Motion** for animations
- **Tailwind CSS v4** for styling
- Deployed to **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`)

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Build static export to out/
npm run lint     # Run ESLint
```

`npm run build` must pass before pushing — it generates the `out/` directory that GitHub Actions deploys.

## Architecture

Single-page portfolio at `src/app/page.tsx` composing section components in order: Navbar → Hero → About → Experience → Projects → Contact → Footer.

**Content lives in one place:** `src/lib/data.ts` — edit skills, experience, and projects there. No changes needed to components for content updates.

**Component layout:**
```
src/
├── app/
│   ├── layout.tsx          # Metadata, fonts, global dark theme
│   ├── page.tsx            # Section composition
│   └── globals.css         # CSS vars: --accent (#2dd4bf), --surface, scrollbar styles
├── components/
│   ├── Navbar.tsx          # Sticky nav with scroll-hide, mobile hamburger menu
│   ├── Footer.tsx
│   ├── ui/
│   │   └── SectionHeading.tsx   # Numbered heading used by all sections
│   └── sections/
│       ├── Hero.tsx        # Animated stagger intro, grid background
│       ├── About.tsx       # Bio + animated skill badges
│       ├── Experience.tsx  # Tabbed job history with AnimatePresence
│       ├── Projects.tsx    # Card grid with hover glow
│       └── Contact.tsx     # CTA + social links
└── lib/
    └── data.ts             # All site content (skills, experience, projects, social links)
```

## GitHub Pages Deployment

GitHub Actions builds on push to `main` and deploys `out/` to the `gh-pages` branch using the Pages API. The workflow adds `.nojekyll` to prevent Jekyll processing.

Before the first deploy, enable GitHub Pages in repo Settings → Pages → Source: **GitHub Actions**.

## Key Patterns

- All section components use `"use client"` and Framer Motion's `viewport: { once: true }` for scroll-triggered animations
- Theme color `--accent` (#2dd4bf teal) is defined as a CSS variable in `globals.css` and used as `text-[var(--accent)]` throughout
- Framer Motion `Variants` must be typed with `import { type Variants } from "framer-motion"` — plain string `ease` values cause TypeScript errors with this version
