import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

export function createOgImage(title: string, subtitle: string) {
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
          <div
            style={{
              fontSize: 28,
              letterSpacing: 8,
              color: "#38bdf8",
              textTransform: "uppercase",
            }}
          >
            SuchGrime
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: 1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#a3a3a3", maxWidth: 900 }}>{subtitle}</div>
      </div>
    ),
    { ...ogSize },
  )
}
