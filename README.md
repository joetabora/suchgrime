# SuchGrime

Premium web development and business automation agency site — built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, MDX blog, and Neon PostgreSQL.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Agency homepage (brutalist poster layout) |
| `/services` | Service overview |
| `/services/[slug]` | Service detail pages with FAQ + schema |
| `/work` | Portfolio index |
| `/work/block-and-blade` | Barber marketing demo |
| `/work/deadset-ink` | Tattoo parlor demo |
| `/work/parlor-desk` | Booking admin app demo |
| `/blog` | MDX blog listing |
| `/blog/[slug]` | Blog articles |
| `/contact` | Contact form (persists to Postgres) |
| `/sitemap.xml` | Dynamic XML sitemap |
| `/robots.txt` | Crawler rules |
| `/feed.xml` | RSS 2.0 feed |

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon Postgres connection string |
| `NEXT_PUBLIC_SITE_URL` | Production URL (e.g. `https://suchgrime.com`) |

Contact form submissions save to Postgres when `DATABASE_URL` is set. Without it, the API still returns success (graceful dev mode).

## Database

```bash
npm run db:generate   # Generate migrations from schema
npm run db:migrate    # Apply migrations
npm run db:studio     # Open Drizzle Studio
```

Schema: `lib/db/schema.ts` — `contact_inquiries`, `newsletter_subscribers`

## Build

```bash
npm run build
npm run start
```

## Project structure

```
app/                  # Next.js App Router pages
components/
  agency/             # Homepage brutalist UI
  demos/              # Portfolio demo apps
  seo/                # JSON-LD, breadcrumbs
  ui/                 # shadcn/ui components
content/blog/         # MDX blog posts
lib/
  site-config.ts      # Agency content
  seo/                # Metadata + schema builders
  blog/               # MDX post loader
  db/                 # Drizzle + Neon
hooks/                # Client hooks (booking store)
public/               # Static assets
```

## SEO features

- `generateMetadata` with canonical URLs and Open Graph tags
- JSON-LD: Organization, WebSite, LocalBusiness, Service, Article, SoftwareApplication, BreadcrumbList
- Dynamic XML sitemap and RSS feed
- Static generation for blog and service pages

## Deployment

Deploy to Vercel with `DATABASE_URL` and `NEXT_PUBLIC_SITE_URL` set. Next.js handles routing — no SPA fallback needed.

## Customization

- Agency copy: [`lib/site-config.ts`](lib/site-config.ts)
- Blog posts: [`content/blog/`](content/blog/)
- Demo content: [`lib/demos/`](lib/demos/)
