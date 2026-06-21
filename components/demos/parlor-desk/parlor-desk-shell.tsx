"use client"

import { usePathname } from "next/navigation"
import { BookingStoreProvider } from "@/hooks/useBookingStore"
import { AppShell } from "@/components/demos/parlor-desk/AppShell"

export function ParlorDeskShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <BookingStoreProvider>
      <AppShell pathname={pathname}>{children}</AppShell>
    </BookingStoreProvider>
  )
}
