import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "SuchGrime — Web Development & Business Automation"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0c0c",
          color: "#f5f5f0",
          padding: 64,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 28, letterSpacing: 8, color: "#c8ff00", textTransform: "uppercase" }}>
            SuchGrime
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1, letterSpacing: 2, maxWidth: 900 }}>
            PREMIUM WEB CRAFT & AUTOMATION
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#a3a3a3", maxWidth: 800 }}>
          Next.js sites, programmatic SEO, and business automation for brands that refuse to blend in.
        </div>
      </div>
    ),
    { ...size },
  )
}
