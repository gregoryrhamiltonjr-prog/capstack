import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0f17",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          <div style={{ width: 48, height: 22, borderRadius: 6, background: "#F5B301" }} />
          <div style={{ width: 78, height: 22, borderRadius: 6, background: "#2E8BE6" }} />
          <div style={{ width: 108, height: 22, borderRadius: 6, background: "#1FB07E" }} />
          <div style={{ width: 130, height: 22, borderRadius: 6, background: "#10B981" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
