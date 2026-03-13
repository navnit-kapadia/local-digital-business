import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Local Digital Business — Websites & AI Assistants for Small Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 60%, #0d2447 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Badge */}
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "100px",
            padding: "8px 20px",
            fontSize: 18,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 32,
            display: "flex",
          }}
        >
          For solopreneurs and small businesses in Australia
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.05,
            marginBottom: 24,
            display: "flex",
          }}
        >
          Get Found.&nbsp;
          <span style={{ color: "#f59e0b" }}>Get Booked.</span>
        </div>

        {/* Subheading */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 700,
            lineHeight: 1.4,
            marginBottom: 52,
            display: "flex",
          }}
        >
          Websites &amp; Smart AI Assistants. Live in 5 days. Fixed pricing.
        </div>

        {/* Domain */}
        <div
          style={{
            fontSize: 22,
            color: "#f59e0b",
            display: "flex",
          }}
        >
          localdigitalbusiness.com.au
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
