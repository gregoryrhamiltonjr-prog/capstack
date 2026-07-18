import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CapStack — Climb the whole capital stack",
  description:
    "The high-finance learning platform. Commercial real estate and the broader world of high finance — institutional-grade content, gamified. Wall Street meets Duolingo.",
  applicationName: "CapStack",
  authors: [{ name: "CapStack" }],
  keywords: ["commercial real estate", "high finance", "agency lending", "DUS", "CMBS", "learning"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CapStack",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0f17",
  width: "device-width",
  initialScale: 1,
  // Allow pinch-zoom for accessibility (WCAG).
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">{children}</body>
    </html>
  );
}
