import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background:
            "radial-gradient(ellipse at 30% 20%, #1a1410 0%, #0a0a0a 60%, #050505 100%)",
          color: "#f5f0e8",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, transparent 0%, #c9a96e 50%, transparent 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 8,
            color: "#c9a96e",
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "flex" }}>Modern American Dining</span>
          <span style={{ display: "flex", color: "#3a3a3a" }}>·</span>
          <span style={{ display: "flex" }}>New York</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: -2,
              color: "#f5f0e8",
            }}
          >
            Harbor Table
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.4,
              maxWidth: 880,
              color: "#a8a8a8",
              fontFamily: "sans-serif",
            }}
          >
            {siteConfig.shortDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#6b6b6b",
            fontFamily: "sans-serif",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>Reservations · Seasonal Menu</div>
          <div style={{ display: "flex", color: "#c9a96e" }}>
            harbortable.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
