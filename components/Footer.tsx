'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-display font-bold mb-4 text-primary">
              SuchGrime
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Professional web design and SEO services. Milwaukee-built for businesses that demand measurable results.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-primary">Contact</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>Milwaukee, Wisconsin</li>
              <li>
                <a href="mailto:suchgrime@guerrillasocialclub.com" className="hover:text-primary transition-colors">
                  suchgrime@guerrillasocialclub.com
                </a>
              </li>
              <li>
                <a href="tel:+14144396211" className="hover:text-primary transition-colors">
                  (414) 439-6211
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-primary">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-neutral-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-neutral-600 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-200 pt-8 text-center text-sm text-neutral-500">
          <p>© 2025 SuchGrime. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
