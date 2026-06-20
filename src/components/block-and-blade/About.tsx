import { motion } from "framer-motion"
import { shop } from "../../data/shop"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
}

export function About() {
  return (
    <section id="about" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp}>
          <p className="text-label mb-3">// About</p>
          <h2 className="font-display text-5xl tracking-wide md:text-6xl">
            BUILT ON THE BLOCK
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg leading-relaxed text-muted"
          >
            {shop.about.story}
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {shop.about.stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-white/10 bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <p className="font-display text-4xl text-accent md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
