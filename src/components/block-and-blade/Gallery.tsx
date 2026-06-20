import { motion } from "framer-motion"
import { shop } from "../../data/shop"

const spanClasses = {
  default: "row-span-1",
  tall: "row-span-2",
  wide: "col-span-1 sm:col-span-2 row-span-1",
} as const

export function Gallery() {
  return (
    <section id="gallery" className="bg-bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-label mb-3">// Gallery</p>
          <h2 className="font-display text-5xl tracking-wide md:text-6xl">
            THE WORK
          </h2>
        </motion.div>

        <div className="mt-12 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shop.gallery.map((item, i) => (
            <motion.figure
              key={item.caption}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`group relative overflow-hidden ${spanClasses[item.span]}`}
            >
              <img
                src={item.image}
                alt={item.caption}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-bg/90 via-bg/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-display text-xl tracking-wide">{item.caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
