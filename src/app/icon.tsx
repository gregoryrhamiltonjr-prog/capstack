import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** CapStack stacked-bar mark (matches Logo.tsx). */
export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
          <div style={{ width: 10, height: 4, borderRadius: 1, background: "#F5B301" }} />
          <div style={{ width: 16, height: 4, borderRadius: 1, background: "#2E8BE6" }} />
          <div style={{ width: 20, height: 4, borderRadius: 1, background: "#1FB07E" }} />
          <div style={{ width: 24, height: 4, borderRadius: 1, background: "#10B981" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
