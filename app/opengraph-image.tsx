import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Camtinel, Cameroon's offline AI cybersecurity assistant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(60% 60% at 30% 0%, rgba(0,165,80,0.35) 0%, rgba(252,209,22,0.15) 40%, transparent 80%), #05070E",
          color: "#E9ECF3",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #00A550, #FCD116, #CE1126)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.4 }}>
            Camtinel
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 960,
            }}
          >
            Offline AI cybersecurity for Cameroon.
          </div>
          <div style={{ fontSize: 28, color: "#8B94A8", maxWidth: 900 }}>
            Detects phishing, Mobile Money fraud and impersonation attacks, without leaving your device.
          </div>
        </div>

        <div style={{ display: "flex", gap: 24, color: "#8B94A8", fontSize: 20 }}>
          <span>Android beta · v1.2</span>
          <span>Works offline</span>
          <span>Built in Cameroon</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
