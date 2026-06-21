import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPosts } from "@/lib/blog/get-posts"
import { buildMetadata } from "@/lib/seo/metadata"
import { collectionPageSchema } from "@/lib/seo/schemas/application"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata = buildMetadata({
  title: "Blog",
  description: "Insights on web development, business automation, and performance from the SuchGrime team.",
  path: "/blog",
})

export const revalidate = 3600

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd
            data={collectionPageSchema(
              "Blog",
              "Insights on web development, business automation, and performance from the SuchGrime team.",
              "/blog",
            )}
          />
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
          <p className="text-label mb-2">Insights</p>
          <h1 className="font-display text-6xl tracking-wide md:text-8xl">FROM THE STUDIO</h1>
          <p className="mt-4 max-w-2xl text-muted">
            Web development, automation, and performance — straight from the build floor.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Card key={post.slug}>
                <CardHeader>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="accent">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="mt-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-parlor-accent">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <time dateTime={post.date} className="font-mono text-xs text-muted">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
