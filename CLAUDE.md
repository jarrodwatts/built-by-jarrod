# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm start        # Start production server
```

## Tech Stack

- **Next.js 16** with App Router (React 19, RSC enabled)
- **Tailwind CSS v4** with OKLCH color system
- **shadcn/ui** (New York style, `components.json` configured)
- **next-themes** for dark mode (dark by default)
- **motion** (Framer Motion) for animations

## Architecture

### Path Aliases
`@/*` maps to project root (configured in `tsconfig.json`)

### Component Locations
- `components/ui/` - shadcn and custom UI primitives (aurora-background, rainbow-button, shine-border, sparkles-text)
- `components/` - Feature components (header, project-card, theme-provider)
- `lib/utils.ts` - `cn()` helper for class merging

### Styling
Theme colors defined in `app/globals.css` using CSS variables:
- Semantic tokens: `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`
- Rainbow gradients: `--color-1` through `--color-5`
- Chart colors: `--chart-1` through `--chart-10`
- Light/dark variants via `.dark` class selector

### Adding shadcn Components
```bash
pnpm dlx shadcn@latest add <component-name>
```

Magic UI registry also configured: `@magicui` prefix available

### Client Components
Only `components/theme-provider.tsx` requires `"use client"` directive. Page components are Server Components by default.
