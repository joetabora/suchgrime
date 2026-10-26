import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All goods" },
      { href: "/shop?category=tees", label: "Tees" },
      { href: "/shop?category=headwear", label: "Headwear" },
      { href: "/shop?category=accessories", label: "Accessories" },
      { href: "/shop?category=parts", label: "Parts" },
    ],
  },
  {
    title: "Media",
    links: [
      { href: "/features", label: "Features" },
      { href: "/builds", label: "The Garage" },
      { href: "/events", label: "Events" },
      { href: "/people", label: "People" },
    ],
  },
  {
    title: "SuchGrime",
    links: [
      { href: "/about", label: "About" },
      { href: "/submit", label: "Submit a bike" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="mx-auto max-w-screen-2xl px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <p className="font-goth text-6xl text-paper">SuchGrime</p>
            <p className="mt-3 max-w-sm text-sm text-paper/70">
              Old iron, flash sheets, and things that go bump in the garage. Built in Milwaukee.
            </p>
            <div className="mt-8">
              <p className="label mb-3 text-mustard">Get the drops first</p>
              <NewsletterForm tone="dark" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="label mb-4 text-mustard">{col.title}</h2>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-paper/80 hover:text-paper">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-paper/15 pt-6 text-xs text-paper/50 md:flex-row">
          <p>© 2026 SuchGrime. Milwaukee, Wisconsin.</p>
          <p className="label text-[0.65rem]">Ride ugly ✦ Die pretty</p>
        </div>
      </div>
    </footer>
  );
}
