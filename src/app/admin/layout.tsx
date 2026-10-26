import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { logoutAction } from "./actions";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/features", label: "Features" },
  { href: "/admin/builds", label: "Builds" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/subscribers", label: "Mailing list" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-brand-black text-brand-chrome">
      {authed && (
        <header className="border-b border-white/10 bg-brand-graphite">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="font-bebas text-2xl tracking-tight text-white">
                SUCHGRIME <span className="text-brand-steel">ADMIN</span>
              </Link>
              <nav className="hidden flex-wrap gap-4 md:flex">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-mono text-[10px] uppercase tracking-widest text-brand-steel hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="font-mono text-[10px] uppercase tracking-widest text-brand-steel hover:text-white">
                View site
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="font-mono text-[10px] uppercase tracking-widest text-brand-rust hover:text-white"
                >
                  Log out
                </button>
              </form>
            </div>
          </div>
          <nav className="flex gap-4 overflow-x-auto border-t border-white/5 px-4 py-3 md:hidden">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-brand-steel"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
      )}
      <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
    </div>
  );
}
