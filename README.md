# Jarrod Starter

A Next.js starter template with a custom design system, ready to clone and build upon.

## Features

- **Next.js 16** with App Router
- **Tailwind CSS v4** with OKLCH color system
- **shadcn/ui** components (New York style)
- **Dark mode** via next-themes (dark by default)
- **Fonts:** Inter (sans) + JetBrains Mono (mono)
- **Custom components:** Aurora background, Rainbow button
- **TypeScript** configured

## Quick Start

```bash
# Clone this template
npx degit jarrodwatts/jarrod-starter my-app

# Install dependencies
cd my-app
pnpm install

# Start development server
pnpm dev
```

## Design System

### Colors

Uses OKLCH color space for perceptual uniformity. Key colors defined in `app/globals.css`:

- `--primary`, `--secondary`, `--muted`, `--accent`
- `--color-1` through `--color-5` for rainbow gradients
- `--chart-1` through `--chart-10` for data visualization

### Fonts

- **Sans:** Inter (`font-sans`)
- **Mono:** JetBrains Mono (`font-mono`)

### Components

Add shadcn components:

```bash
pnpm dlx shadcn@latest add button card input
```

Custom components included:

- `<AuroraBackground />` - Subtle gradient blur background
- `<RainbowButton />` - Animated gradient border button

## Project Structure

```
├── app/
│   ├── globals.css      # Theme & CSS variables
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Home page
├── components/
│   ├── theme-provider.tsx
│   └── ui/
│       ├── aurora-background.tsx
│       └── rainbow-button.tsx
├── lib/
│   └── utils.ts         # cn() helper
└── components.json      # shadcn config
```

## Customization

1. **Colors:** Edit CSS variables in `app/globals.css`
2. **Fonts:** Change imports in `app/layout.tsx`
3. **Theme:** Modify ThemeProvider props in `app/layout.tsx`

## License

MIT
