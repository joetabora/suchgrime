'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const blogPosts = [
  {
    title: 'How to Rank #1 in Milwaukee Local Search',
    excerpt: 'Master local SEO strategies that actually work for Milwaukee businesses. Dominate your competition.',
    category: 'SEO Strategy',
    readTime: '8 min read',
  },
  {
    title: 'Why Your Outdated Site is Costing You Leads',
    excerpt: 'The hidden costs of maintaining an old website. Learn when it&apos;s time for a refresh.',
    category: 'Web Design',
    readTime: '6 min read',
  },
  {
    title: 'AI in Web Design: The Future is Here',
    excerpt: 'How AI tools like Cursor are revolutionizing web development speed and quality.',
    category: 'Technology',
    readTime: '10 min read',
  },
]

export default function BlogTeaser() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate subscription
    setIsSubmitted(true)
    setEmail('')
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="blog" className="py-24 sm:py-32 relative bg-white overflow-hidden">
      {/* Distressed texture background */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="max-w-4xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6"
            >
              <div className="text-xs font-bold text-neutral-900 uppercase tracking-[0.2em] mb-3">
                ## Insights from the Trenches
              </div>
              <div className="h-0.5 w-32 bg-neutral-900" />
            </motion.div>
            
            <motion.p 
              className="text-xl text-neutral-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Real talk about web design, SEO, and digital growth. No BS, just practical insights.
            </motion.p>
          </div>

          {/* Blog Post Teasers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative bg-neutral-50 border-2 border-neutral-200 p-6 hover:border-neutral-900 transition-all duration-300"
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-1 h-full bg-neutral-900 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
                
                <div className="relative">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-neutral-900 text-white mb-3">
                      {post.category}
                    </span>
                    <div className="text-xs text-neutral-500 uppercase tracking-wider">
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold mb-3 text-primary group-hover:translate-x-1 transition-transform duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="inline-flex items-center text-xs font-bold text-primary uppercase tracking-wider opacity-50">
                    Coming Soon
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="p-8 bg-neutral-900 text-white relative overflow-hidden">
              {/* Grain overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                }}
              />
              
              <div className="relative">
                <h3 className="text-2xl font-display font-bold mb-3">
                  Get Updates
                </h3>
                <p className="text-neutral-300 mb-6">
                  Subscribe for practical insights on web design, SEO, and growing your business online.
                </p>
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-4 py-3 bg-white text-neutral-900 border-2 border-neutral-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 bg-white text-neutral-900 font-bold uppercase tracking-wider hover:bg-neutral-100 transition-colors border-2 border-white"
                  >
                    Subscribe
                  </button>
                </form>

                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-sm text-white"
                  >
                    ✓ Thanks! We&apos;ll keep you updated.
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

