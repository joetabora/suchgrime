"use client"
import { motion } from "framer-motion"
import { shop } from "@/lib/demos/shop"

export function Team() {
  return (
    <section id="team" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-label mb-3">{"// The Crew"}</p>
          <h2 className="font-display text-5xl tracking-wide md:text-6xl">
            MASTER BARBER
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shop.team.map((member, i) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group overflow-hidden border border-white/5 bg-surface"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl tracking-wide">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{member.specialty}</p>
                <p className="mt-2 text-sm text-muted">{member.bio}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
