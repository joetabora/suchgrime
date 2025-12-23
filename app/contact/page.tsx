'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thanks! We\'ll get back to you ASAP.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="pt-20">
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-distressed distressed-text mb-6 text-grime-green neon-glow-green">
              Let's Build Something Badass
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to dominate Google? Get your free site audit and let's talk.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="brutal-border p-8 bg-grime-charcoal mb-6">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-grime-green mb-1">Location</div>
                    <div className="text-gray-300">Milwaukee, Wisconsin</div>
                  </div>
                  <div>
                    <div className="text-sm text-grime-green mb-1">Email</div>
                    <a href="mailto:hello@suchgrime.com" className="text-gray-300 hover:text-grime-green transition-colors">
                      hello@suchgrime.com
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-grime-green mb-1">Phone</div>
                    <a href="tel:+14145554743" className="text-gray-300 hover:text-grime-green transition-colors">
                      (414) 555-GRIME
                    </a>
                  </div>
                </div>
              </div>

              <div className="brutal-border p-8 bg-grime-charcoal">
                <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-grime-green mr-2">✓</span>
                    <span>Free site audit within 48 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-grime-green mr-2">✓</span>
                    <span>Custom proposal tailored to your business</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-grime-green mr-2">✓</span>
                    <span>No BS. Straight talk about what works.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="brutal-border p-8 bg-grime-charcoal space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-grime-black border-2 border-grime-charcoal text-white focus:border-grime-green focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-grime-black border-2 border-grime-charcoal text-white focus:border-grime-green focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-bold mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-grime-black border-2 border-grime-charcoal text-white focus:border-grime-green focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-grime-black border-2 border-grime-charcoal text-white focus:border-grime-green focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-bold mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-grime-black border-2 border-grime-charcoal text-white focus:border-grime-green focus:outline-none transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="refresh">Website Refresh</option>
                    <option value="redesign">Full Redesign</option>
                    <option value="ecommerce">E-commerce Build</option>
                    <option value="seo">SEO Only</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-bold mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-grime-black border-2 border-grime-charcoal text-white focus:border-grime-green focus:outline-none transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="2k-4k">$2k - $4k</option>
                    <option value="4k-7k">$4k - $7k</option>
                    <option value="7k-15k">$7k - $15k</option>
                    <option value="15k+">$15k+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-grime-black border-2 border-grime-charcoal text-white focus:border-grime-green focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-grime-green text-grime-black font-bold text-lg hover:bg-grime-green/80 transition-all brutal-border"
                >
                  Get Free Site Audit
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
