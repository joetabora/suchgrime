import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { studio } from "../../data/studio"

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="services" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-neon">
              Pricing
            </p>
            <h2 className="font-ink-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
              Services
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            Starting rates — final quote after consult. No flash, no walk-in
            small talk.
          </p>
        </motion.div>

        <div className="border-t border-white/10">
          {studio.services.map((service, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="border-b border-white/10"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center gap-6 py-6 text-left transition-colors hover:bg-white/[0.02] md:gap-10 md:py-8"
                  aria-expanded={isOpen}
                >
                  <span className="w-10 shrink-0 font-mono text-sm text-ink-neon md:w-14 md:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-ink-display text-2xl font-semibold uppercase tracking-wide md:text-4xl">
                    {service.name}
                  </span>
                  <span className="hidden font-ink-display text-xl text-ink-accent md:block">
                    {service.priceLabel}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 pb-8 pl-16 md:flex-row md:items-center md:justify-between md:pl-[4.5rem] md:pr-10">
                        <p className="max-w-xl text-muted">{service.description}</p>
                        <div className="flex gap-8 font-mono text-xs uppercase tracking-widest">
                          <span className="text-ink-accent md:hidden">
                            {service.priceLabel}
                          </span>
                          <span className="text-muted">{service.duration}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
