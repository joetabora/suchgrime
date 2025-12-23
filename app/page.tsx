import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Stats from '@/components/Stats'
import WhatDescribesYou from '@/components/WhatDescribesYou'
import WorkShowcase from '@/components/WorkShowcase'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Stats />
      <WhatDescribesYou />
      <WorkShowcase />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
