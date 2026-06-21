import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo/metadata"
import type { PseoCollectionId } from "@/lib/pseo/types"
import {
  getAllPagesForCollection,
  getCollectionConfig,
  getPageBySlug,
} from "@/lib/pseo/registry"
import { resolveMatrixPage, resolvePage } from "@/lib/pseo/resolve"
import { getMatrixStaticParams } from "@/lib/pseo/matrix"
import { ProgramIndex } from "@/components/pseo/program-index"
import { ProgramDetail } from "@/components/pseo/program-detail"

type SlugParams = { params: Promise<{ slug: string }> }
type MatrixParams = { params: Promise<{ slug: string; serviceSlug: string }> }

export function createPseoIndexPage(collectionId: PseoCollectionId) {
  const collection = getCollectionConfig(collectionId)
  const pages = getAllPagesForCollection(collectionId)

  return function PseoIndexPage() {
    return <ProgramIndex collection={collection} pages={pages} />
  }
}

export function createPseoIndexMetadata(collectionId: PseoCollectionId): Metadata {
  const collection = getCollectionConfig(collectionId)
  return buildMetadata({
    title: collection.indexTitle,
    description: collection.indexDescription,
    path: collection.path,
  })
}

export function createPseoDetailPage(collectionId: PseoCollectionId) {
  return async function PseoDetailPage({ params }: SlugParams) {
    const { slug } = await params
    if (slug.includes("/")) notFound()
    const resolved = resolvePage(collectionId, slug)
    if (!resolved) notFound()
    return <ProgramDetail resolved={resolved} />
  }
}

export function createPseoDetailMetadata(collectionId: PseoCollectionId) {
  return async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
    const { slug } = await params
    const page = getPageBySlug(collectionId, slug)
    if (!page) return {}
    const collection = getCollectionConfig(collectionId)
    return buildMetadata({
      title: page.title,
      description: page.description,
      path: `${collection.path}/${slug}`,
      keywords: page.keywords,
      ogType: collection.schemaType === "Article" ? "article" : "website",
      publishedTime: page.date,
    })
  }
}

export function createPseoDetailStaticParams(collectionId: PseoCollectionId) {
  return function generateStaticParams() {
    return getAllPagesForCollection(collectionId)
      .filter((p) => !p.isMatrix)
      .map((p) => ({ slug: p.slug }))
  }
}

export function createPseoMatrixPage(parentCollection: "locations" | "industries") {
  return async function PseoMatrixPage({ params }: MatrixParams) {
    const { slug, serviceSlug } = await params
    const resolved = resolveMatrixPage(parentCollection, slug, serviceSlug)
    if (!resolved) notFound()
    return <ProgramDetail resolved={resolved} />
  }
}

export function createPseoMatrixMetadata(parentCollection: "locations" | "industries") {
  return async function generateMetadata({ params }: MatrixParams): Promise<Metadata> {
    const { slug, serviceSlug } = await params
    const resolved = resolveMatrixPage(parentCollection, slug, serviceSlug)
    if (!resolved) return {}
    return buildMetadata({
      title: resolved.page.title,
      description: resolved.page.description,
      path: resolved.canonicalPath,
      keywords: resolved.page.keywords,
    })
  }
}

export function createPseoMatrixStaticParams(parentCollection: "locations" | "industries") {
  return function generateStaticParams() {
    return getMatrixStaticParams(parentCollection)
  }
}
