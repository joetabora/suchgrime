import { motion } from "framer-motion"
import { parlor } from "../../data/parlor"

export function ParlorServices() {
  return (
    <section id="services" className="poster-section bg-bg">
      <div className="border-b border-white/10 px-6 py-12 md:px-12">
        <p className="text-label mb-2">Capabilities</p>
        <h2 className="font-display text-6xl tracking-wide md:text-8xl">WHAT WE BUILD</h2>
      </div>

      <div className="mx-auto max-w-[1400px] border-x border-white/10">
        {parlor.serviceGroups.map((group) => (
          <div key={group.title}>
            <div className="border-b border-parlor-accent/50 bg-parlor-accent/10 px-6 py-4 md:px-8">
              <h3 className="font-display text-2xl tracking-wide text-parlor-accent md:text-3xl">
                {group.title.toUpperCase()}
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="border-b border-r border-white/10 p-6 md:p-8"
                >
                  <h4 className="font-display text-2xl tracking-wide">{item.name.toUpperCase()}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
