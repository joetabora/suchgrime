export type PseoCollectionId =
  | "locations"
  | "industries"
  | "services"
  | "case-studies"
  | "software"
  | "resources"
  | "blog"
  | "glossary"

export interface PseoFaq {
  q: string
  a: string
}

export interface PseoPage {
  slug: string
  title: string
  description: string
  headline?: string
  intro: string
  body?: string
  features?: string[]
  faqs?: PseoFaq[]
  tags?: string[]
  keywords?: string[]
  href?: string
  image?: string
  date?: string
  published?: boolean
  /** Parent entity slug for matrix pages (e.g. location slug) */
  parentSlug?: string
  /** Related service slug for matrix pages */
  serviceSlug?: string
  /** Marks programmatic combination pages */
  isMatrix?: boolean
  /** CMS updated timestamp for sitemap lastmod */
  lastModified?: string
  /** Geo coordinates for location pages */
  geo?: { latitude: number; longitude: number }
}

export interface PseoCollectionConfig {
  id: PseoCollectionId
  label: string
  singularLabel: string
  path: string
  indexTitle: string
  indexDescription: string
  schemaType: "Service" | "Article" | "SoftwareApplication" | "CreativeWork" | "WebPage" | "LocalBusiness"
  /** Generate location/industry × service matrix pages */
  matrixWithServices?: boolean
  priority: number
  changeFrequency: "weekly" | "monthly" | "yearly"
}

export interface PseoMatrixPage extends PseoPage {
  isMatrix: true
  parentSlug: string
  serviceSlug: string
  parentCollection: PseoCollectionId
}

export interface ResolvedPseoPage {
  page: PseoPage
  collection: PseoCollectionConfig
  breadcrumbs: { name: string; path: string }[]
  canonicalPath: string
}
