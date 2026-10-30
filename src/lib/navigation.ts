export function isNavigationActive(path: string | null, href: string): boolean {
  if (!path) return false;
  if (path === href || path.startsWith(`${href}/`)) return true;
  return href === "/map" && (path.startsWith("/learn/") || path.startsWith("/course/"));
}
