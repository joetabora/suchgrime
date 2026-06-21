"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function ParlorWork() {
  const liveProjects = siteConfig.work.filter((p) => p.live)
  const comingSoon = siteConfig.work.filter((p) => !p.live)

  return (
    <section id="work" className="poster-section bg-bg">
      <div className="border-b border-white/10 px-6 py-12 md:px-12">
        <p className="text-label mb-2">Portfolio</p>
        <h2 className="font-display text-6xl tracking-wide md:text-8xl">FROM THE STUDIO</h2>
      </div>

      {liveProjects.map((project, i) => (
        <motion.article
          key={project.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="border-b border-white/10"
        >
          <div className="mx-auto max-w-[1400px] border-x border-white/10">
            <div className="flex items-end justify-between gap-4 border-b border-white/10 p-6 md:p-8">
              <div className="flex items-end gap-4 md:gap-8">
                <span className="font-display text-7xl leading-none text-parlor-accent md:text-9xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  {"kind" in project && project.kind === "app" && (
                    <span className="mb-2 inline-block border border-desk-accent/40 bg-desk-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-desk-accent">
                      Internal App
                    </span>
                  )}
                  <h3 className="font-display text-4xl tracking-wide md:text-6xl">
                    {project.title.toUpperCase()}
                  </h3>
                </div>
              </div>
              <div className="hidden flex-wrap gap-2 md:flex">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative aspect-[21/9] overflow-hidden border-b border-white/10">
              {"kind" in project && project.kind === "app" ? (
                <div className="flex h-full bg-desk-sidebar">
                  <div className="w-1/4 border-r border-white/10 p-4">
                    <div className="mb-4 h-3 w-20 rounded bg-desk-accent/40" />
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded bg-white/10" />
                      <div className="h-2 w-3/4 rounded bg-desk-accent/30" />
                      <div className="h-2 w-full rounded bg-white/10" />
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="mb-4 flex gap-2">
                      <div className="h-8 w-24 rounded bg-white/10" />
                      <div className="h-8 w-24 rounded bg-white/10" />
                      <div className="h-8 w-24 rounded bg-white/10" />
                      <div className="h-8 w-24 rounded bg-desk-accent/30" />
                    </div>
                    <div className="space-y-2 rounded border border-white/10 bg-surface p-3">
                      {[1, 2, 3, 4].map((row) => (
                        <div key={row} className="flex gap-3">
                          <div className="h-2 flex-1 rounded bg-white/10" />
                          <div className="h-2 w-16 rounded bg-white/10" />
                          <div className="h-2 w-12 rounded bg-desk-success/30" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                />
              )}
            </div>

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
        </motion.article>
      ))}

      {comingSoon.length > 0 && (
        <div className="mx-auto max-w-[1400px] border-x border-white/10 p-6 md:p-8">
          <p className="text-label mb-6">Coming Soon</p>
          <div className="grid gap-0 border border-dashed border-white/15 sm:grid-cols-2">
            {comingSoon.map((project, i) => (
              <div
                key={project.slug}
                className={`flex items-center justify-between p-6 opacity-40 ${
                  i % 2 === 0 ? "sm:border-r sm:border-dashed sm:border-white/15" : ""
                } ${i < comingSoon.length - (comingSoon.length % 2 === 0 ? 2 : 1) ? "border-b border-dashed border-white/15 sm:border-b" : ""}`}
              >
                <span className="font-display text-2xl tracking-wide">{project.title.toUpperCase()}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest">Soon</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
