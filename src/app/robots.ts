import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Private-beta robots: index the marketing surface only; keep app/auth out of crawlers. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login"],
        disallow: [
          "/dashboard",
          "/map",
          "/learn",
          "/course",
          "/social",
          "/profile",
          "/settings",
          "/leaderboard",
          "/admin",
          "/onboarding",
          "/subscribe",
          "/api/",
          "/auth/",
          "/signup",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
