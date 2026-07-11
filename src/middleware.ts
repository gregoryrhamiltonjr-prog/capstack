import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CANONICAL_HOST } from "@/lib/site";

// Force the canonical custom domain in production so the *.vercel.app aliases
// never show in the address bar (and so auth/metadata host inference stays
// consistent). Preview deployments (VERCEL_ENV=preview) are left alone.
export function middleware(req: NextRequest) {
  if (process.env.VERCEL_ENV !== "production") return NextResponse.next();

  const host = req.headers.get("host");
  if (!host || host === CANONICAL_HOST) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.protocol = "https:";
  url.host = CANONICAL_HOST;
  url.port = "";
  return NextResponse.redirect(url, 308);
}

// Only redirect page navigations. Skip /api (webhooks, OAuth callbacks, mobile),
// Next internals, and static files.
export const config = {
  matcher: ["/((?!api/|_next/|.*\\..*).*)"],
};
