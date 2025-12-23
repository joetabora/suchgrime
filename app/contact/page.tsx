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
    alert('Thanks! We&apos;ll get back to you ASAP.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="pt-20 bg-white">
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold mb-6 text-primary">
              Let&apos;s Work Together
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Ready to transform your digital presence? Get your free site audit and let&apos;s discuss your project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="p-8 bg-neutral-50 border border-neutral-200 mb-6">
                <h2 className="text-2xl font-display font-bold mb-6 text-primary">Get in Touch</h2>
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-medium text-neutral-500 mb-1">Location</div>
                    <div className="text-neutral-700">Milwaukee, Wisconsin</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-500 mb-1">Email</div>
                    <a href="mailto:hello@suchgrime.com" className="text-neutral-700 hover:text-primary transition-colors">
                      hello@suchgrime.com
                    </a>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-500 mb-1">Phone</div>
                    <a href="tel:+14145554743" className="text-neutral-700 hover:text-primary transition-colors">
                      (414) 555-GRIME
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-neutral-50 border border-neutral-200">
                <h3 className="text-xl font-display font-bold mb-4 text-primary">What to Expect</h3>
                <ul className="space-y-4 text-neutral-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free site audit within 48 hours</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom proposal tailored to your business</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Transparent communication throughout the process</span>
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
              <form onSubmit={handleSubmit} className="p-8 bg-neutral-50 border border-neutral-200 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-neutral-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-neutral-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2 text-neutral-700">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-neutral-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium mb-2 text-neutral-700">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-primary focus:outline-none transition-colors"
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
                  <label htmlFor="budget" className="block text-sm font-medium mb-2 text-neutral-700">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="2k-4k">$2k - $4k</option>
                    <option value="4k-7k">$4k - $7k</option>
                    <option value="7k-15k">$7k - $15k</option>
                    <option value="15k+">$15k+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-neutral-700">
                    Tell us about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary text-white font-medium text-base hover:bg-neutral-900 transition-all duration-300"
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
