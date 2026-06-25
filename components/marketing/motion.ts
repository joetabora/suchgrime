export const springGentle = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
  mass: 0.8,
}

export const springSnappy = {
  type: "spring" as const,
  stiffness: 200,
  damping: 24,
  mass: 0.6,
}

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: springGentle,
}

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: springGentle,
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: springGentle,
}

export const slideInLeft = {
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: springGentle,
}

export function staggerDelay(index: number, base = 0.06) {
  return { ...springGentle, delay: index * base }
}

export const inkDraw = {
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
}
