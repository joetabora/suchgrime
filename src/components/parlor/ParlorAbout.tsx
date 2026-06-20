import { motion } from "framer-motion"
import { parlor } from "../../data/parlor"

export function ParlorAbout() {
  return (
    <section id="about" className="poster-section bg-bg-elevated">
      <div className="mx-auto max-w-[1400px] border-x border-white/10">
        <div className="border-b border-white/10 p-6 md:p-12">
          <p className="text-label mb-2">About</p>
          <blockquote className="font-display text-4xl leading-[0.95] tracking-wide md:text-6xl lg:text-7xl">
            WE BUILD SITES WITH{" "}
            <span className="text-parlor-accent">SOUL AND GRIT.</span>
          </blockquote>
        </div>

        <div className="grid lg:grid-cols-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-white/10 p-6 text-lg leading-relaxed text-muted md:p-12 lg:border-b-0 lg:border-r"
          >
            {parlor.about.story}
          </motion.p>

          <div className="grid grid-cols-2 lg:grid-cols-1">
            {parlor.about.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`flex flex-col justify-center border-white/10 p-6 md:p-8 ${
                  i % 2 === 0 ? "border-r lg:border-r-0 lg:border-b" : "border-b"
                } ${i < 2 ? "border-b" : ""}`}
              >
                <p className="font-display text-4xl text-parlor-accent md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
