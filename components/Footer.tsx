'use client'

export default function Footer() {
  return (
    <footer className="border-t border-grime-charcoal py-12 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold font-distressed distressed-text mb-4 text-grime-green">
              SUCH GRIME
            </h3>
            <p className="text-gray-400 text-sm">
              Raw design. Ruthless SEO. Milwaukee-built for small businesses that want to win.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 Milwaukee, WI</li>
              <li>📧 hello@suchgrime.com</li>
              <li>📞 (414) 555-GRIME</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-grime-green hover:text-grime-green/80 transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-grime-green hover:text-grime-green/80 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-grime-green hover:text-grime-green/80 transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-grime-charcoal pt-8 text-center text-sm text-gray-500">
          <p>© 2025 SuchGrime – Built to outrank the rest.</p>
        </div>
      </div>
    </footer>
  )
}
