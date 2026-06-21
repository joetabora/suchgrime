# Programmatic SEO Engine

Scalable, template-driven SEO for thousands of pages without duplicating route code.

## Architecture

```
lib/pseo/
├── types.ts           # PseoPage, PseoCollectionConfig
├── registry.ts        # Central content registry + aggregation
├── matrix.ts          # location/industry × service combinations
├── resolve.ts         # URL → page data + breadcrumbs
├── factory.tsx        # Next.js page/metadata/staticParams factories
├── schema.ts          # JSON-LD per collection type
├── sitemap.ts         # All pSEO URLs for sitemap.xml
└── content/           # Add rows here to scale (or import JSON/CSV)
    ├── locations.ts
    ├── industries.ts
    ├── services.ts
    ├── case-studies.ts
    ├── software.ts
    └── resources.ts

components/pseo/
├── program-index.tsx  # Reusable index template
└── program-detail.tsx # Reusable detail template
```

## Collections

| Collection    | Route              | Matrix pages              |
|---------------|--------------------|---------------------------|
| Locations     | `/locations/[slug]` | `/locations/[slug]/[serviceSlug]` |
| Industries    | `/industries/[slug]` | `/industries/[slug]/[serviceSlug]` |
| Services      | `/services/[slug]` | —                         |
| Case studies  | `/case-studies/[slug]` | —                     |
| Software      | `/software/[slug]` | —                         |
| Resources     | `/resources/[slug]` | —                        |
| Blog          | `/blog/[slug]`     | MDX (separate pipeline)   |

## Scaling to thousands of pages

1. **Add entities** — append objects to `lib/pseo/content/locations.ts` (or load from JSON/API at build time).
2. **Matrix auto-expands** — each location × each service = new page with unique title, intro, FAQs.
3. **No new routes** — `factory.tsx` generates all Next.js pages from collection ID.
4. **Sitemap auto-updates** — `getAllPseoSitemapEntries()` includes every page.

Example: 100 cities × 3 services = 300 matrix pages + 100 location pages from one template.

## Adding a new collection

1. Add ID to `PseoCollectionId` in `types.ts`
2. Add config in `registry.ts` + content file
3. Create two route files using factory exports:

```tsx
// app/my-collection/page.tsx
export const metadata = createPseoIndexMetadata("my-collection")
export default createPseoIndexPage("my-collection")

// app/my-collection/[slug]/page.tsx
export const generateStaticParams = createPseoDetailStaticParams("my-collection")
export const generateMetadata = createPseoDetailMetadata("my-collection")
export default createPseoDetailPage("my-collection")
```

## Bulk import pattern

Replace static arrays with build-time loaders:

```ts
// lib/pseo/content/locations.ts
import locationsJson from "./data/locations.json"
export const locations: PseoPage[] = locationsJson
```

Run `npm run build` — Next.js SSG generates all static params automatically.
