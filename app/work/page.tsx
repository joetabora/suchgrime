import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { GlassCard } from "@/components/marketing/glass-card"
import { SectionHeading } from "@/components/marketing/section-heading"
import { siteConfig } from "@/lib/site-config"
import { buildMetadata } from "@/lib/seo/metadata"
import { collectionPageSchema } from "@/lib/seo/schemas/application"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata = buildMetadata({
  title: "Work — Custom Software, Automation & Web Projects",
  description:
    "Portfolio of custom business applications, internal dashboards, automation systems, and high-performance websites built by SuchGrime.",
  path: "/work",
  keywords: [
    "custom software portfolio",
    "business automation projects",
    "internal dashboard examples",
    "web development portfolio",
    siteConfig.name,
  ],
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
              "Custom software, automation, and web projects by SuchGrime.",
              "/work",
            )}
          />
          <div className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]} />
            <SectionHeading
              label="Portfolio"
              title="Systems We've Built"
              description="Custom apps, internal dashboards, business websites, and automation — live demos and real capabilities."
              className="mt-8"
            />
          </div>

          <div className="mx-auto max-w-[1400px] border-x border-white/10 px-6 pb-16 md:px-12">
            <div className="grid gap-6 md:grid-cols-2">
              {liveProjects.map((project) => (
                <GlassCard key={project.slug} hover className="overflow-hidden p-0">
                  {project.image && (
                    <div className="relative aspect-[16/9] border-b border-white/10">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-tech">
                      {"kind" in project && project.kind === "app" ? "Custom Application" : "Business Website"}
                    </p>
                    <h2 className="mt-1 font-display text-2xl tracking-wide md:text-3xl">{project.title}</h2>
                    <p className="mt-3 text-muted">{project.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={project.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm text-tech hover:underline"
                    >
                      {"kind" in project && project.kind === "app" ? "Open live demo" : "View live demo"}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
