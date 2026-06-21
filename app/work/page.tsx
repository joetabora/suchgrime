import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { siteConfig } from "@/lib/site-config"
import { buildMetadata } from "@/lib/seo/metadata"
import { collectionPageSchema } from "@/lib/seo/schemas/application"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata = buildMetadata({
  title: "Work",
  description: "Portfolio of web development and business automation projects by SuchGrime.",
  path: "/work",
})

export default function WorkPage() {
  const liveProjects = siteConfig.work.filter((p) => p.live)

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main">
          <JsonLd
            data={collectionPageSchema(
              "Portfolio",
              "Web development and automation projects by SuchGrime.",
              "/work",
            )}
          />
          <div className="border-b border-white/10 px-6 py-12 md:px-12">
            <div className="mx-auto max-w-[1400px]">
              <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]} />
              <p className="text-label mb-2">Portfolio</p>
              <h1 className="font-display text-6xl tracking-wide md:text-8xl">FROM THE STUDIO</h1>
            </div>
          </div>

          {liveProjects.map((project, i) => (
            <article key={project.slug} className="border-b border-white/10">
              <div className="mx-auto max-w-[1400px] border-x border-white/10">
                <div className="flex items-end gap-4 border-b border-white/10 p-6 md:p-8">
                  <span className="font-display text-7xl leading-none text-parlor-accent md:text-9xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-4xl tracking-wide md:text-6xl">{project.title.toUpperCase()}</h2>
                </div>
                {project.image && (
                  <div className="relative aspect-[21/9] border-b border-white/10">
                    <Image src={project.image} alt={project.title} fill className="object-cover" sizes="1400px" />
                  </div>
                )}
                <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
                  <p className="max-w-2xl text-muted">{project.description}</p>
                  <Link
                    href={project.href}
                    className="inline-flex shrink-0 items-center gap-2 bg-parlor-accent px-8 py-4 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80"
                  >
                    {"kind" in project && project.kind === "app" ? "OPEN APP" : "LIVE DEMO"}
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
