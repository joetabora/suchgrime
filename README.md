# SuchGrime Web Parlor

Urban web design studio site with live portfolio demos — built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion.

## Routes

| Route | Description |
|-------|-------------|
| `/` | SuchGrime Web Parlor agency homepage |
| `/work/block-and-blade` | Block & Blade Barbershop live demo |
| `/work/deadset-ink` | Deadset Ink tattoo parlor live demo |
| `/work/parlor-desk` | Parlor Desk booking admin app demo (dashboard, appointments, clients) |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── data/
│   ├── parlor.ts              # Agency content, services, work items
│   ├── shop.ts                # Block & Blade barber demo content
│   ├── studio.ts              # Deadset Ink tattoo demo content
│   └── booking-desk.ts        # Parlor Desk types, seed data, services
├── hooks/
│   └── useBookingStore.tsx    # localStorage CRUD + client derivation
├── pages/
│   ├── AgencyHomePage.tsx     # Agency homepage
│   ├── BlockAndBladePage.tsx  # Barber demo page
│   ├── DeadsetInkPage.tsx     # Tattoo demo page
│   └── ParlorDeskPage.tsx     # Booking admin app demo
├── components/
│   ├── DemoBanner.tsx         # Shared back-to-parlor strip
│   ├── parlor/                # Agency site components
│   ├── parlor-desk/           # Booking admin app components
│   ├── block-and-blade/       # Barber demo components
│   └── deadset-ink/           # Tattoo demo components
└── layouts/
    └── SiteLayout.tsx         # Shared layout (noise, motion, a11y)
```

## Parlor Desk persistence

The booking admin demo stores appointments in `localStorage` under the key `parlor-desk-appointments`. On first visit, seed data is loaded automatically. Add, edit, cancel, and delete operations persist across page refreshes.

## Deployment

This is a client-side SPA. For production hosting, configure SPA fallback so all routes serve `index.html`:

- **Netlify:** `public/_redirects` is included
- **Vercel:** `vercel.json` is included

## Customization

- Agency copy and services: [`src/data/parlor.ts`](src/data/parlor.ts)
- Barber demo content: [`src/data/shop.ts`](src/data/shop.ts)
- Tattoo demo content: [`src/data/studio.ts`](src/data/studio.ts)
- Booking admin demo: [`src/data/booking-desk.ts`](src/data/booking-desk.ts)
