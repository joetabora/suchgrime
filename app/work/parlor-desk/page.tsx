import { SiteShell } from "@/components/layout/site-shell"
import { DemoBanner } from "@/components/demo-banner"
import { ParlorDeskShell } from "@/components/demos/parlor-desk/parlor-desk-shell"
import { DashboardView } from "@/components/demos/parlor-desk/views/DashboardView"
import { buildMetadata } from "@/lib/seo/metadata"
import { softwareApplicationSchema } from "@/lib/seo/schemas/application"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata = buildMetadata({
  title: "Parlor Desk — Booking Admin",
  description: "Live app demo — internal booking admin for service businesses.",
  path: "/work/parlor-desk",
  noIndex: true,
})

export default function ParlorDeskPage() {
  return (
    <SiteShell>
      <div className="parlor-desk">
        <DemoBanner variant="app" />
        <JsonLd data={softwareApplicationSchema()} />
        <ParlorDeskShell>
          <DashboardView />
        </ParlorDeskShell>
      </div>
    </SiteShell>
  )
}
