import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "SuchGrime — Custom Software, AI Automation & Business Systems"
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
          <div style={{ fontSize: 28, letterSpacing: 8, color: "#38bdf8", textTransform: "uppercase" }}>
            SuchGrime
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: 1, maxWidth: 1000 }}>
            CUSTOM SOFTWARE & BUSINESS SYSTEMS
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#a3a3a3", maxWidth: 900 }}>
          Custom apps, AI automation, internal dashboards, and high-performance websites — built in Wisconsin for real-world businesses.
        </div>
      </div>
    ),
    { ...size },
  )
}
