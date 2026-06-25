"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { CMS_COLLECTIONS, CMS_COLLECTION_LABELS } from "@/lib/cms/collections"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AdminShellProps {
  children: React.ReactNode
  title: string
  action?: React.ReactNode
}

export function AdminShell({ children, title, action }: AdminShellProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/cms/auth/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="suchgrime-parlor flex min-h-screen bg-bg text-text">
      <aside className="fixed inset-y-0 left-0 z-40 w-60 border-r border-white/10 bg-bg">
        <div className="border-b border-white/10 px-4 py-5">
          <p className="font-display text-lg tracking-wider">SUCHGRIME CMS</p>
          <p className="mt-1 font-mono text-xs text-muted">Content dashboard</p>
        </div>
        <nav className="p-3">
          <Link
            href="/admin/bookings"
            className={cn(
              "mb-1 block rounded px-3 py-2 text-sm transition-colors",
              pathname === "/admin/bookings"
                ? "bg-parlor-accent/20 text-parlor-accent"
                : "text-muted hover:bg-white/5 hover:text-text",
            )}
          >
            Strategy Call Bookings
          </Link>
          {CMS_COLLECTIONS.map((collection) => {
            const href = `/admin/${collection}`
            const active = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link
                key={collection}
                href={href}
                className={cn(
                  "mb-1 block rounded px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-parlor-accent/20 text-parlor-accent"
                    : "text-muted hover:bg-white/5 hover:text-text",
                )}
              >
                {CMS_COLLECTION_LABELS[collection]}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-3">
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </aside>

      <div className="ml-60 flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-bg/95 px-6 py-4 backdrop-blur">
          <h1 className="font-display text-2xl tracking-wide">{title}</h1>
          {action}
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
