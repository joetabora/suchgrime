'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-neutral-900 text-white py-16 overflow-hidden">
      {/* Industrial grunge texture overlay */}
      <div className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'300\' height=\'300\' viewBox=\'0 0 300 300\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'grungeFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.2\' numOctaves=\'6\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23grungeFilter)\'/%3E%3C/svg%3E")',
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bebas tracking-wider mb-4 text-white">
              SuchGrime
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Professional web design and SEO services. Milwaukee-built for businesses that demand measurable results.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Milwaukee, Wisconsin</li>
              <li>
                <a href="mailto:suchgrime@guerrillasocialclub.com" className="hover:text-white transition-colors">
                  suchgrime@guerrillasocialclub.com
                </a>
              </li>
              <li>
                <a href="tel:+14144396211" className="hover:text-white transition-colors">
                  (414) 439-6211
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-neutral-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-neutral-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 space-y-4 md:space-y-0">
            <p>© 2025 SuchGrime. All rights reserved.</p>
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Milwaukee, Wisconsin
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
