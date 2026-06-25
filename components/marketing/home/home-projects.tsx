"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { staggerDelay } from "@/components/marketing/motion"

export function HomeProjects() {
  return (
    <section id="work" className="poster-section border-b border-white/10 bg-bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label={siteConfig.homeSections.projects.label}
            title={siteConfig.homeSections.projects.title}
            description={siteConfig.homeSections.projects.description}
          />
          <Link href="/case-studies" className="shrink-0 font-display text-lg tracking-wider text-parlor-accent hover:text-parlor-accent/80">
            View all case studies →
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {siteConfig.featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={staggerDelay(i)}
            >
              <Link href={project.href} className="group block h-full">
                <GlassCard hover className="h-full overflow-hidden p-0">
                  {"image" in project && project.image && (
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-label">{project.category}</p>
                        <h3 className="mt-1 font-display text-2xl tracking-wide text-text md:text-3xl">
                          {project.title}
                        </h3>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-parlor-accent" />
                    </div>
                    <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <span className="border border-white/15 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
