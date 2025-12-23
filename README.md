# SuchGrime.com

Raw design. Ruthless SEO. Milwaukee-built for small businesses that want to win.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (custom grunge utilities)
- **Framer Motion** (animations & transitions)
- **React 18**

## Features

- 🎨 Raw grunge meets modern brutalism aesthetic
- 🌑 Dark mode with neon accents (toxic green, blood red, electric purple)
- ⚡ Lightning-fast performance
- 📱 Fully responsive design
- ♿ Accessible & SEO-optimized
- 🎭 Glitch effects, grain overlays, and scroll-triggered animations
- 🎯 Smooth anchor links and parallax effects

## Getting Started

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata & fonts
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles & grunge effects
│   ├── portfolio/
│   │   └── page.tsx        # Portfolio page
│   └── contact/
│       └── page.tsx        # Contact page
├── components/
│   ├── Navigation.tsx      # Fixed navigation with mobile menu
│   ├── Hero.tsx            # Hero section with parallax
│   ├── About.tsx           # About/Manifesto section
│   ├── Services.tsx        # Services grid with glitch effects
│   ├── Portfolio.tsx       # Portfolio preview section
│   ├── Testimonials.tsx    # Client testimonials
│   ├── Pricing.tsx         # Pricing tiers
│   └── Footer.tsx          # Footer with contact info
├── tailwind.config.ts       # Tailwind config with custom colors
├── next.config.js          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## Design System

### Colors

- **Black**: `#000000` (background)
- **Charcoal**: `#111111` (cards)
- **Toxic Green**: `#00ff41` (primary accent)
- **Blood Red**: `#ff0044` (secondary accent)
- **Electric Purple**: `#a800ff` (tertiary accent)

### Typography

- **Headlines**: Creepster / Uncial Antiqua (distressed fonts)
- **Body**: Inter (clean sans-serif)

### Effects

- Grain overlay (animated noise filter)
- Glitch effects on hover
- Distressed text shadows
- Brutalist borders with hover states
- Paper tear dividers
- Neon glow effects

## Customization

### Update Colors

Edit `tailwind.config.ts` to modify the color palette:

```typescript
colors: {
  grime: {
    black: '#000000',
    charcoal: '#111111',
    green: '#00ff41',
    red: '#ff0044',
    purple: '#a800ff',
  },
}
```

### Modify Animations

Adjust animation timings and effects in:
- `tailwind.config.ts` (keyframes)
- `app/globals.css` (CSS animations)
- Component files (Framer Motion props)

## SEO & Performance

- ✅ Proper meta tags and Open Graph
- ✅ Schema.org structured data (LocalBusiness)
- ✅ Semantic HTML structure
- ✅ Optimized images (Next/Image ready)
- ✅ Fast page loads with Next.js optimizations

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

Build the project and deploy the `out` directory:

```bash
npm run build
```

## License

© 2025 SuchGrime – Built to outrank the rest.
