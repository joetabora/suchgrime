'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        message: '',
      })
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display text-neutral-900 mb-6 tracking-wide">
              LET&apos;S TALK
            </h2>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
              Ready to transform your digital presence? Get your free site audit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="p-8 bg-neutral-50 border border-neutral-200 mb-6">
                <h3 className="text-2xl font-display text-neutral-900 mb-6 tracking-wide">GET IN TOUCH</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-medium text-neutral-500 mb-1">Location</div>
                    <div className="text-neutral-700">Milwaukee, Wisconsin</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-500 mb-1">Email</div>
                    <a href="mailto:suchgrime@guerrillasocialclub.com" className="text-neutral-700 hover:text-neutral-900 transition-colors">
                      suchgrime@guerrillasocialclub.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-neutral-50 border border-neutral-200">
                <h3 className="text-xl font-display text-neutral-900 mb-4 tracking-wide">WHAT TO EXPECT</h3>
                <ul className="space-y-4 text-neutral-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-neutral-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free site audit within 48 hours</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-neutral-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom proposal tailored to your business</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-neutral-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Transparent communication throughout</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {isSubmitted ? (
                <div className="p-8 bg-neutral-50 border border-neutral-200 text-center">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-2xl font-display text-neutral-900 mb-2 tracking-wide">THANKS!</h3>
                  <p className="text-neutral-600">We&apos;ll get back to you within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 bg-neutral-50 border border-neutral-200 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors"
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
                        className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors"
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
                        className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium mb-2 text-neutral-700">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors"
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
                        className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors"
                      >
                        <option value="">Select...</option>
                        <option value="2k-4k">$2k - $4k</option>
                        <option value="4k-7k">$4k - $7k</option>
                        <option value="7k-15k">$7k - $15k</option>
                        <option value="15k+">$15k+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-neutral-700">
                      Tell us about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-neutral-300 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Get Free Site Audit'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

