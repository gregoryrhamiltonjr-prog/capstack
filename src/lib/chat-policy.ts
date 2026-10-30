/** Legacy or malformed DM channels must never bypass participant checks. */
export function canAccessDirectMessage(name: string | null | undefined, userId: string): boolean {
  if (!name || !userId) return false;
  const parts = name.split(":");
  return parts.length === 3 && parts[0] === "dm" && Boolean(parts[1]) && Boolean(parts[2]) && parts[1] !== parts[2] && (parts[1] === userId || parts[2] === userId);
}

export function formatChatTime(value: Date | string): string {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "Time unavailable";
  return `${date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "UTC" })} UTC`;
}
