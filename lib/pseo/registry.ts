import type { PseoCollectionConfig, PseoCollectionId, PseoPage } from "./types"
import { locations } from "./content/locations"
import { industries } from "./content/industries"
import { services } from "./content/services"
import { caseStudies } from "./content/case-studies"
import { softwareProducts } from "./content/software"
import { resources } from "./content/resources"
import { getAllPosts } from "@/lib/blog/get-posts"
import { buildMatrixPages } from "./matrix"

export const pseoCollections: Record<PseoCollectionId, PseoCollectionConfig> = {
  locations: {
    id: "locations",
    label: "Locations",
    singularLabel: "Location",
    path: "/locations",
    indexTitle: "Locations We Serve",
    indexDescription: "Web development and business automation for cities across the United States.",
    schemaType: "LocalBusiness",
    matrixWithServices: true,
    priority: 0.75,
    changeFrequency: "monthly",
  },
  industries: {
    id: "industries",
    label: "Industries",
    singularLabel: "Industry",
    path: "/industries",
    indexTitle: "Industries We Serve",
    indexDescription: "Custom websites and automation for healthcare, legal, home services, and more.",
    schemaType: "WebPage",
    matrixWithServices: true,
    priority: 0.75,
    changeFrequency: "monthly",
  },
  services: {
    id: "services",
    label: "Services",
    singularLabel: "Service",
    path: "/services",
    indexTitle: "Services",
    indexDescription: "Web development, business automation, and e-commerce solutions from SuchGrime.",
    schemaType: "Service",
    priority: 0.85,
    changeFrequency: "monthly",
  },
  "case-studies": {
    id: "case-studies",
    label: "Case Studies",
    singularLabel: "Case Study",
    path: "/case-studies",
    indexTitle: "Case Studies",
    indexDescription: "Portfolio case studies — marketing sites and internal apps built by SuchGrime.",
    schemaType: "CreativeWork",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  software: {
    id: "software",
    label: "Software",
    singularLabel: "Product",
    path: "/software",
    indexTitle: "Software Products",
    indexDescription: "Internal tools and software concepts built by SuchGrime.",
    schemaType: "SoftwareApplication",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  resources: {
    id: "resources",
    label: "Resources",
    singularLabel: "Resource",
    path: "/resources",
    indexTitle: "Resources",
    indexDescription: "Guides, playbooks, and frameworks for web development, SEO, and automation.",
    schemaType: "Article",
    priority: 0.65,
    changeFrequency: "monthly",
  },
  blog: {
    id: "blog",
    label: "Blog",
    singularLabel: "Article",
    path: "/blog",
    indexTitle: "Blog",
    indexDescription: "Insights on web development, business automation, and performance.",
    schemaType: "Article",
    priority: 0.7,
    changeFrequency: "weekly",
  },
}

const basePages: Record<Exclude<PseoCollectionId, "blog">, PseoPage[]> = {
  locations,
  industries,
  services,
  "case-studies": caseStudies,
  software: softwareProducts,
  resources,
}

function blogAsPseoPages(): PseoPage[] {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    intro: post.description,
    tags: post.tags,
    date: post.date,
    published: post.published,
    image: post.image,
  }))
}

export function getCollectionConfig(id: PseoCollectionId): PseoCollectionConfig {
  return pseoCollections[id]
}

export function getBasePages(collection: Exclude<PseoCollectionId, "blog">): PseoPage[] {
  return basePages[collection].filter((p) => p.published !== false)
}

export function getAllPagesForCollection(collection: PseoCollectionId): PseoPage[] {
  if (collection === "blog") return blogAsPseoPages()
  const pages = getBasePages(collection)
  const config = pseoCollections[collection]
  if (config.matrixWithServices) {
    return [...pages, ...buildMatrixPages(collection, pages, services)]
  }
  return pages
}

export function getPageBySlug(collection: PseoCollectionId, slug: string): PseoPage | undefined {
  return getAllPagesForCollection(collection).find((p) => p.slug === slug)
}

export function getMatrixPage(
  parentCollection: "locations" | "industries",
  parentSlug: string,
  serviceSlug: string,
): PseoPage | undefined {
  return getAllPagesForCollection(parentCollection).find(
    (p) => p.isMatrix && p.parentSlug === parentSlug && p.serviceSlug === serviceSlug,
  )
}

export function getAllCollectionIds(): PseoCollectionId[] {
  return Object.keys(pseoCollections) as PseoCollectionId[]
}

export function getMatrixParentCollections(): Array<"locations" | "industries"> {
  return (["locations", "industries"] as const).filter(
    (id) => pseoCollections[id].matrixWithServices,
  )
}
