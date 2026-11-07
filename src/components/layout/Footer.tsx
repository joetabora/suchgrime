import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";

const SOCIALS = ["Instagram", "YouTube", "TikTok"];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-4 py-16 md:px-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="font-bebas text-6xl leading-none tracking-[0.03em] md:text-8xl">SUCHGRIME</p>
          <p className="mt-4 max-w-md font-display text-sm uppercase leading-relaxed tracking-[0.08em] text-secondary">
            Milwaukee choppers, traditional flash, and the grease between them.
          </p>
          <div className="mt-8 max-w-md">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              Get the drop first
            </p>
            <NewsletterForm tone="dark" />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10 lg:items-end lg:text-right">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-secondary">
              Out of the garage
            </p>
            <ul className="mt-4 space-y-2">
              {SOCIALS.map((name) => (
                <li key={name}>
                  <span className="font-display text-sm uppercase tracking-[0.16em] text-chrome">
                    {name}
                    <span className="ml-2 font-mono text-[10px] tracking-[0.14em] text-secondary">
                      Soon
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bebas text-3xl leading-none tracking-wide">Milwaukee</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
              Wisconsin
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 px-4 py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-secondary md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} SuchGrime. Built in Milwaukee.</p>
          <Link href="/about" className="hover:text-primary">
            Ride ugly. Die pretty.
          </Link>
        </div>
      </div>
    </footer>
  );
}
