import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CapStack — Climb the whole capital stack",
  description:
    "The high-finance learning platform. Commercial real estate and the broader world of high finance — institutional-grade content, gamified. Wall Street meets Duolingo.",
  applicationName: "CapStack",
  authors: [{ name: "CapStack" }],
  keywords: ["commercial real estate", "high finance", "agency lending", "DUS", "CMBS", "learning"],
};

export const viewport: Viewport = {
  themeColor: "#0a0e16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
