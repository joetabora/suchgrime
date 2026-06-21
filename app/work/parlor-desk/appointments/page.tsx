import { SiteShell } from "@/components/layout/site-shell"
import { DemoBanner } from "@/components/demo-banner"
import { ParlorDeskShell } from "@/components/demos/parlor-desk/parlor-desk-shell"
import { AppointmentsView } from "@/components/demos/parlor-desk/views/AppointmentsView"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata = buildMetadata({
  title: "Parlor Desk — Appointments",
  description: "Manage appointments in the Parlor Desk booking admin demo.",
  path: "/work/parlor-desk/appointments",
  noIndex: true,
})

export default function AppointmentsPage() {
  return (
    <SiteShell>
      <div className="parlor-desk">
        <DemoBanner variant="app" />
        <ParlorDeskShell>
          <AppointmentsView />
        </ParlorDeskShell>
      </div>
    </SiteShell>
  )
}
