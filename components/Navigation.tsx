'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle smooth scrolling for hash links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a hash link
    if (href.startsWith('#')) {
      e.preventDefault()
      
      // If we're not on the homepage, navigate there first
      if (!isHomePage) {
        window.location.href = '/' + href
        return
      }
      
      // Smooth scroll to the section
      const element = document.querySelector(href)
      if (element) {
        const offset = 80 // Account for fixed nav height
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        })
      }
      
      setIsMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { href: '#work', label: 'Work' },
    { href: '#services', label: 'Services' },
    { href: '#influencer', label: 'Influencer' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-3xl font-display text-neutral-900 tracking-wider relative group">
            SUCHGRIME
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neutral-900 group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={isHomePage ? link.href : '/' + link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors relative group cursor-pointer"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neutral-900 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href={isHomePage ? '#contact' : '/#contact'}
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-6 py-2.5 bg-neutral-900 text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors text-sm cursor-pointer"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-neutral-900 p-2 relative w-10 h-10"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute left-2 top-3.5 w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`absolute left-2 top-5 w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-2 top-6.5 w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-neutral-100"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={isHomePage ? link.href : '/' + link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block text-lg font-medium text-neutral-700 hover:text-neutral-900 transition-colors py-2 cursor-pointer"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href={isHomePage ? '#contact' : '/#contact'}
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="block mt-4 px-6 py-3 bg-neutral-900 text-white font-semibold text-center rounded-full cursor-pointer"
                >
                  Let&apos;s Talk
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
