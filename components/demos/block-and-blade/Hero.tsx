"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowDown, MapPin } from "lucide-react"
import { shop } from "@/lib/demos/shop"

export function Hero() {
  return (
    <section className="relative min-h-screen clip-diagonal bg-bg pt-32">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="sticker mb-6">Walk-ins Welcome</span>
          <p className="text-label mb-4">{shop.tagline}</p>
          <h1 className="font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl md:text-7xl lg:text-8xl">
            {shop.heroHeadline}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted">{shop.heroSubtext}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#services"
              className="inline-flex min-h-11 items-center bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wider text-bg transition-colors hover:bg-accent-hover"
            >
              View Services
            </a>
            <a
              href="#visit"
              className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-colors hover:border-accent hover:text-accent"
            >
              <MapPin className="h-4 w-4" />
              Walk In Today
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-[70vh]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-gold/10" />
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=1000&fit=crop&grayscale"
            alt="Barber at work in urban shop"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 border-l-4 border-accent pl-4">
            <p className="font-display text-2xl tracking-wide">EST. 2018</p>
            <p className="text-sm text-muted">Metro City · Westside Ave</p>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-accent"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="h-6 w-6 motion-safe:animate-bounce" />
      </a>
    </section>
  )
}
