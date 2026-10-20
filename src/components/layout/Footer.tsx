import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/10 pt-16 pb-8 md:pt-24 md:pb-12 mt-auto">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col items-start">
            <Link href="/" className="mb-6 flex flex-col items-start">
              <span className="font-bebas text-5xl md:text-7xl leading-none tracking-tight text-white">
                SUCH<span className="text-brand-steel">GRIME</span>
              </span>
            </Link>
            <p className="font-inter text-brand-steel max-w-sm mb-8 text-sm leading-relaxed">
              Documenting the people, the builds, and the grime. Milwaukee's premier independent custom motorcycle publication and community hub.
            </p>
            <div className="font-mono text-xs text-brand-steel uppercase tracking-widest flex flex-col gap-1">
              <span>Milwaukee, Wisconsin</span>
              <span>Built in the Midwest</span>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[10px] text-brand-steel uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Explore</h4>
            <Link href="/features" className="font-inter text-sm text-brand-chrome hover:text-white transition-colors">Features</Link>
            <Link href="/builds" className="font-inter text-sm text-brand-chrome hover:text-white transition-colors">Garage Builds</Link>
            <Link href="/people" className="font-inter text-sm text-brand-chrome hover:text-white transition-colors">The People</Link>
            <Link href="/events" className="font-inter text-sm text-brand-chrome hover:text-white transition-colors">Local Events</Link>
            <Link href="/shop" className="font-inter text-sm text-brand-rust hover:text-white transition-colors">Supply / Shop</Link>
          </div>

          {/* Links Col 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[10px] text-brand-steel uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Connect</h4>
            <Link href="/about" className="font-inter text-sm text-brand-chrome hover:text-white transition-colors">About Us</Link>
            <Link href="/submit" className="font-inter text-sm text-brand-chrome hover:text-white transition-colors flex items-center gap-1 group">
              Submit a Bike <ArrowUpRight size={14} className="text-brand-steel group-hover:text-white transition-colors" />
            </Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-inter text-sm text-brand-chrome hover:text-white transition-colors flex items-center gap-1 group">
              Instagram <ArrowUpRight size={14} className="text-brand-steel group-hover:text-white transition-colors" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="font-inter text-sm text-brand-chrome hover:text-white transition-colors flex items-center gap-1 group">
              YouTube <ArrowUpRight size={14} className="text-brand-steel group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-brand-steel font-mono text-[10px] tracking-widest uppercase">
          <p>© 2026 SUCHGRIME. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
