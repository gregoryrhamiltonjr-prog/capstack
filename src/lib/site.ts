/** Canonical site URL. Override with NEXT_PUBLIC_SITE_URL; defaults to the custom domain. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://learncapstack.com").replace(/\/$/, "");

/** Canonical host (no protocol), e.g. "learncapstack.com". */
export const CANONICAL_HOST = new URL(SITE_URL).host;
