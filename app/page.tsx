import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Stats from '@/components/Stats'
import WhatDescribesYou from '@/components/WhatDescribesYou'
import WorkShowcase from '@/components/WorkShowcase'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Stats />
      <WhatDescribesYou />
      <WorkShowcase />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
