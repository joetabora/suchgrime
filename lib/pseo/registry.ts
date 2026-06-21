import type { PseoCollectionConfig, PseoCollectionId, PseoPage } from "./types"
import { locations } from "./content/locations"
import { industries } from "./content/industries"
import { services as staticServices } from "./content/services"
import { caseStudies } from "./content/case-studies"
import { softwareProducts } from "./content/software"
import { resources } from "./content/resources"
import { glossaryTerms } from "./content/glossary"
import { buildMatrixPages } from "./matrix"
import {
  countPublishedEntries,
  getPublishedBlogPosts,
  getPublishedPseoPages,
} from "@/lib/cms/content"
import { entryToPseoPage } from "@/lib/cms/mapper"
import { getAllPostsFromFiles } from "@/lib/blog/get-posts"

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
  glossary: {
    id: "glossary",
    label: "Glossary",
    singularLabel: "Term",
    path: "/glossary",
    indexTitle: "Web & SEO Glossary",
    indexDescription: "Definitions for programmatic SEO, Core Web Vitals, automation, and modern web development.",
    schemaType: "Article",
    priority: 0.6,
    changeFrequency: "monthly",
  },
}

const staticBasePages: Record<Exclude<PseoCollectionId, "blog">, PseoPage[]> = {
  locations,
  industries,
  services: staticServices,
  "case-studies": caseStudies,
  software: softwareProducts,
  resources,
  glossary: glossaryTerms,
}

function blogFromFiles(): PseoPage[] {
  return getAllPostsFromFiles().map((post) => ({
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

function getStaticBasePages(collection: Exclude<PseoCollectionId, "blog">): PseoPage[] {
  return staticBasePages[collection].filter((p) => p.published !== false)
}

async function getBasePages(collection: Exclude<PseoCollectionId, "blog">): Promise<PseoPage[]> {
  const dbCount = await countPublishedEntries(collection)
  if (dbCount > 0) {
    return getPublishedPseoPages(collection)
  }
  return getStaticBasePages(collection)
}

async function getBlogPages(): Promise<PseoPage[]> {
  const dbCount = await countPublishedEntries("blog")
  if (dbCount > 0) {
    const posts = await getPublishedBlogPosts()
    return posts.map((post) => ({
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
  return blogFromFiles()
}

export function getCollectionConfig(id: PseoCollectionId): PseoCollectionConfig {
  return pseoCollections[id]
}

export async function getAllPagesForCollection(collection: PseoCollectionId): Promise<PseoPage[]> {
  if (collection === "blog") return getBlogPages()

  const pages = await getBasePages(collection)
  const config = pseoCollections[collection]

  if (config.matrixWithServices) {
    const servicePages = await getBasePages("services")
    return [...pages, ...buildMatrixPages(collection, pages, servicePages)]
  }

  return pages
}

export async function getPageBySlug(
  collection: PseoCollectionId,
  slug: string,
): Promise<PseoPage | undefined> {
  const pages = await getAllPagesForCollection(collection)
  return pages.find((p) => p.slug === slug)
}

export async function getMatrixPage(
  parentCollection: "locations" | "industries",
  parentSlug: string,
  serviceSlug: string,
): Promise<PseoPage | undefined> {
  const pages = await getAllPagesForCollection(parentCollection)
  return pages.find(
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

export { entryToPseoPage }
