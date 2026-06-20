import { SiteLayout } from "../layouts/SiteLayout"
import { DemoBanner } from "../components/DemoBanner"
import { AppShell } from "../components/parlor-desk/AppShell"
import { BookingStoreProvider } from "../hooks/useBookingStore"

export function ParlorDeskPage() {
  return (
    <SiteLayout>
      <div className="parlor-desk">
        <DemoBanner variant="app" />
        <BookingStoreProvider>
          <AppShell />
        </BookingStoreProvider>
      </div>
    </SiteLayout>
  )
}
