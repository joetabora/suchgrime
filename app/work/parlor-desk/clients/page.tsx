import { SiteShell } from "@/components/layout/site-shell"
import { DemoBanner } from "@/components/demo-banner"
import { ParlorDeskShell } from "@/components/demos/parlor-desk/parlor-desk-shell"
import { ClientsView } from "@/components/demos/parlor-desk/views/ClientsView"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata = buildMetadata({
  title: "Parlor Desk — Clients",
  description: "Client list in the Parlor Desk booking admin demo.",
  path: "/work/parlor-desk/clients",
  noIndex: true,
})

export default function ClientsPage() {
  return (
    <SiteShell>
      <div className="parlor-desk">
        <DemoBanner variant="app" />
        <ParlorDeskShell>
          <ClientsView />
        </ParlorDeskShell>
      </div>
    </SiteShell>
  )
}
