# Design System

## Aesthetic

Black-and-white, border-heavy, monospace-accented. Inspired by Forma Engine and technical blueprints. Industrial/utilitarian feel with rare, intentional color usage.

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#000` (pure black) | Page background |
| Foreground | `#fff` (pure white) | Primary text, headings |
| `neutral-500` | `oklch(55.6% 0 0)` | Secondary text, labels, social icons |
| `neutral-600` | `oklch(43.9% 0 0)` | Tertiary text, tags, dates |
| `neutral-700` | `oklch(37.1% 0 0)` | Cross marks, decorative lines |
| `neutral-800` | `oklch(26.9% 0 0)` | All borders (sections, container, cards) |

No accent colors. No gradients. No rainbow. Color is reserved for at most one rare indicator element (e.g. a single green dot).

## Typography

| Element | Font | Size | Weight | Tracking | Color |
|---------|------|------|--------|----------|-------|
| Hero name | Geist Sans | `text-7xl`/`text-8xl`/`text-9xl` | `font-bold` | `tracking-tighter` | `text-white` |
| Section labels | Geist Mono | `text-xs` | default | `tracking-widest` | `text-neutral-500` |
| Body/descriptions | Geist Sans | `text-base` | default | default | `text-neutral-500` or `text-neutral-600` |
| Stats values | Geist Mono | `text-2xl` | `font-bold` | default | `text-white` |
| Stats labels | Geist Mono | `text-xs` | default | `tracking-widest` | `text-neutral-500` |
| Company names | Geist Sans | default | `font-semibold` | default | `text-white` |
| Role titles | Geist Sans | default | default | default | `text-neutral-500` |
| Dates | Geist Mono | `text-sm` | default | default | `text-neutral-500` |
| Tags | Geist Mono | `text-[11px]` | default | `tracking-wide` | `text-neutral-600` |
| Header logo | Geist Mono | `text-sm` | default | default | `text-neutral-500` |

**Rules:**
- Headings are uppercase
- Section labels are uppercase with `tracking-widest`
- Numbers and dates always use `font-mono`
- Monospace signals "technical" or "data" — use for labels, stats, dates, tags

## Layout

- **Vertical lines**: Absolute overlay `div` in `layout.tsx` — `pointer-events-none absolute inset-0 mx-auto max-w-5xl border-x border-neutral-800`. These span the full page height and stay at the container edges.
- **Horizontal lines**: Full-width `border-b border-neutral-800` on each `<section>` element. These span the entire viewport.
- **Content constraint**: Each section wraps its content in `<div className="mx-auto max-w-5xl px-6 ...">` to keep text/elements within the container.
- Text alignment: left-aligned (not centered), except footer

### Section Pattern
```tsx
<section className="border-b border-neutral-800">
  <div className="mx-auto max-w-5xl px-6 py-20">
    <SectionLabel>Label</SectionLabel>
    {/* content */}
  </div>
</section>
```
Add `relative` to the inner div only if it contains `CrossPair`.

## Borders

Borders are the primary structural element — not whitespace alone.

- All borders: `border-neutral-800` (1px, dark gray)
- Vertical container lines: absolute overlay with `border-x` on `max-w-5xl` (in `layout.tsx`)
- Horizontal section dividers: full-width `border-b` on `<section>` elements
- Stats bar: full-width `border-y`, inner `max-w-5xl` grid with `border-r` between cells
- Project grid: `border` on each card (shared grid borders)
- Experience items: `border-b` between rows

## Cross Marks

Decorative `+` marks at border intersections. Used **sparingly** at important visual transitions only.

**Component:** `components/cross-mark.tsx` — exports `CrossMark` and `CrossPair`
- `CrossMark`: 32px (`h-8 w-8`) absolutely-positioned cross made of two 1px lines (`bg-neutral-700`)
- `CrossPair`: places two `CrossMark` elements at the left and right edges of a section boundary
- Offset: `calc(1rem + 0.5px)` to center precisely on the 1px border intersection

**Current placements (2 pairs = 4 crosses total):**
1. Bottom of hero section
2. Bottom of projects section

**Rule:** Do NOT add crosses to every section. They are rare accents that mark the most important layout transitions.

## Components

### Data
- `data/resume.ts` — all content lives here as typed static data. Components import and render from this single source.

### Section Pattern
Every section follows this structure:
```tsx
<section className="border-b border-neutral-800">
  <div className="mx-auto max-w-5xl px-6 py-20">
    <SectionLabel>Label</SectionLabel>
    {/* content */}
  </div>
</section>
```
Add `relative` to the inner `div` only if it contains `CrossPair`.

### Component Inventory
| Component | Path | Client? | Purpose |
|-----------|------|---------|---------|
| `Header` | `components/header.tsx` | No | Monospace name left, social icons right, `border-b` |
| `SectionLabel` | `components/section-label.tsx` | No | `UPPERCASE MONOSPACE` section header |
| `SocialLinks` | `components/social-links.tsx` | No | SVG social icons with hover states |
| `ExperienceItem` | `components/experience-item.tsx` | No | Numbered row: company, role, dates |
| `ProjectCard` | `components/project-card.tsx` | No | Border card: title, description, tags, stars |
| `StatsBar` | `components/stats-bar.tsx` | Yes | Border-divided stat cells with `NumberTicker` |
| `CrossMark` / `CrossPair` | `components/cross-mark.tsx` | No | Decorative intersection marks |
| `NumberTicker` | `components/ui/number-ticker.tsx` | Yes | Animated count-up (Magic UI) |

### Hover States
- Links: `text-neutral-500 hover:text-white`
- Cards: `border-neutral-800 hover:border-neutral-600`
- Underlines: `hover:underline` on text links
- No transforms, no scale, no shadows

## Animations

Only `NumberTicker` on the stats bar. Everything else is static. The design speaks through typography and grid structure, not motion.

## Server Components

Everything is RSC by default. Only these need `"use client"`:
- `StatsBar` (uses `NumberTicker` which depends on `useInView` / `useSpring`)
- `ThemeProvider` (wraps `next-themes`)
