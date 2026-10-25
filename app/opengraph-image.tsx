import { ImageResponse } from "next/og";
import { site } from "@/config/site";
export const alt = "Une 4L et le charme de la Provence pour votre mariage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#fffdf8",
        color: "#243f50",
        padding: "70px",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 27, letterSpacing: 2 }}>
        {site.name.toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 86,
          fontFamily: "serif",
          lineHeight: 1.05,
        }}
      >
        Votre mariage en Provence,
        <br />à bord d’une 4L.
      </div>
      <div style={{ display: "flex", fontSize: 24 }}>
        Voitures anciennes avec chauffeur · Provence
      </div>
    </div>,
    size,
  );
}
