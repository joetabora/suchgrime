import { motion } from "framer-motion"
import { studio } from "../../data/studio"

export function Team() {
  return (
    <section id="artists" className="bg-bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-neon">
            The Crew
          </p>
          <h2 className="font-ink-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
            Artists
          </h2>
        </motion.div>

        <div className="space-y-0">
          {studio.team.map((member, i) => {
            const reversed = i % 2 === 1
            return (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`grid items-center gap-8 border-t border-white/10 py-12 md:grid-cols-2 md:gap-16 md:py-16 ${
                  reversed ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className={`relative ${reversed ? "md:[direction:ltr]" : ""}`}>
                  <span className="absolute -left-2 -top-4 font-ink-display text-8xl font-bold text-white/5 md:-left-4 md:text-9xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative aspect-[3/4] overflow-hidden md:aspect-[4/5]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                    />
                  </div>
                </div>

                <div className={reversed ? "md:[direction:ltr]" : ""}>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-accent">
                    {member.specialty}
                  </p>
                  <h3 className="mt-2 font-ink-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
                    {member.name}
                  </h3>
                  <p className="mt-4 max-w-md text-lg text-muted">{member.bio}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
