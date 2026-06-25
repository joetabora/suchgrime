"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"

export function HomeProjects() {
  return (
    <section id="work" className="border-b border-white/10 bg-bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] border-x border-white/10 px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label={siteConfig.homeSections.projects.label}
            title={siteConfig.homeSections.projects.title}
            description={siteConfig.homeSections.projects.description}
          />
          <Link
            href="/case-studies"
            className="shrink-0 text-sm text-tech hover:underline"
          >
            View all case studies →
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {siteConfig.featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={project.href} className="group block h-full">
                <GlassCard hover className="h-full overflow-hidden p-0">
                  {"image" in project && project.image && (
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" aria-hidden="true" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-tech">
                          {project.category}
                        </p>
                        <h3 className="mt-1 font-display text-2xl tracking-wide md:text-3xl">
                          {project.title}
                        </h3>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tech" />
                    </div>
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
