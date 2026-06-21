import { notFound } from "next/navigation"
import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { Badge } from "@/components/ui/badge"
import { MdxContent } from "@/components/blog/mdx-content"
import { getAllSlugs, getPostBySlug } from "@/lib/blog/get-posts"
import { buildMetadata } from "@/lib/seo/metadata"
import { articleSchema } from "@/lib/seo/schemas/article"
import { JsonLd } from "@/components/seo/json-ld"

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    ogImage: post.image,
    ogType: "article",
    publishedTime: post.date,
    authors: [post.author],
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-3xl border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd data={articleSchema(post)} />
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${slug}` },
            ]}
          />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-wide md:text-6xl">{post.title}</h1>
          <p className="mt-4 text-muted">{post.description}</p>
          <p className="mt-2 font-mono text-xs text-muted">
            {post.author} ·{" "}
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>

          <article className="mt-12">
            <MdxContent source={post.content} />
          </article>

          <Link href="/blog" className="mt-12 inline-block text-parlor-accent hover:underline">
            ← Back to blog
          </Link>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
