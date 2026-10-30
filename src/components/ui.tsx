import { cn } from "@/lib/util";
import { levelProgress } from "@/lib/xp";

// ---------- Icons (inline SVG, stroke-consistent, no emoji) ----------
const paths: Record<string, string> = {
  flame: "M12 2c1 3-1 4-2 6s0 4 2 4 2-3 1-5c2 1 4 3 4 6a5 5 0 0 1-10 0c0-3 2-5 3-6 1-2 2-3 2-5Z",
  trophy: "M6 4h12v3a6 6 0 0 1-12 0V4Zm12 1h3v2a3 3 0 0 1-3 3M6 5H3v2a3 3 0 0 0 3 3m6 5v4m-3 3h6",
  check: "M4 12l5 5L20 6",
  lock: "M6 10V8a6 6 0 0 1 12 0v2m-13 0h14v10H5V10Z",
  chevronRight: "M9 6l6 6-6 6",
  chevronDown: "M6 9l6 6 6-6",
  users: "M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm11 9v-1a4 4 0 0 0-3-3.8M16 4.2a3.5 3.5 0 0 1 0 6.8",
  chart: "M4 20V10m5 10V4m5 16v-7m5 7V8",
  barChart: "M4 20V10m5 10V4m5 16v-7m5 7V8",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Zm2 13h13",
  target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-4a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  spark: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z",
  arrowRight: "M5 12h14m-6-6l6 6-6 6",
  x: "M6 6l12 12M18 6L6 18",
  chat: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5.2A8 8 0 1 1 21 12Z",
  messageSquare: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  map: "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.3l2-1.6-2-3.4-2.4 1a7.3 7.3 0 0 0-2.2-1.3L14 2h-4l-.5 2.5A7.3 7.3 0 0 0 7.3 5.8l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.6l-2 1.6 2 3.4 2.4-1a7.3 7.3 0 0 0 2.2 1.3L10 22h4l.5-2.5a7.3 7.3 0 0 0 2.2-1.3l2.4 1 2-3.4-2-1.6c.1-.4.1-.9.1-1.3Z",
  fire: "M12 2c1 3-1 4-2 6s0 4 2 4 2-3 1-5c2 1 4 3 4 6a5 5 0 0 1-10 0c0-3 2-5 3-6 1-2 2-3 2-5Z",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7l1-8Z",
  zap: "M13 2L4 14h7l-1 8 9-12h-7l1-8Z",
  calendar: "M4 8h16M7 3v3m10-3v3M5 5h14v16H5V5Z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-14v5l3 2",
  compass: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm3.5-13.5l-2 5-5 2 2-5 5-2Z",
  logout: "M15 12H4m0 0l4-4m-4 4l4 4m5-11h5v14h-5",
  play: "M8 5v14l11-7L8 5Z",
  pause: "M7 4h3v16H7V4Zm7 0h3v16h-3V4Z",
  stop: "M6 6h12v12H6V6Z",
  volume: "M11 5 6 9H3v6h3l5 4V5Zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14",
  plus: "M12 5v14M5 12h14",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.3-4.3",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  briefcase: "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm5 4h8",
  building: "M4 21V5a1 1 0 0 1 1-1h8v17M13 21h7V9h-7M8 8h2M8 12h2M8 16h2M16 12h2M16 16h2",
  star: "M12 3l2.5 6.5L21 11l-5 4.2L17.5 22 12 18.5 6.5 22 8 15.2 3 11l6.5-1.5L12 3Z",
  layers: "M12 3l9 5-9 5-9-5 9-5Zm0 10 9 5-9 5-9-5 9-5Z",
  game: "M6 10h12a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4Zm2 3v2m8-2v2m-5-1h2",
};

export function Icon({ name, size = 18, className, strokeWidth = 1.9 }: { name: keyof typeof paths | string; size?: number; className?: string; strokeWidth?: number }) {
  const d = paths[name] ?? paths.spark;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

// ---------- Rank badge ----------
export function RankBadge({ xp, showXp = false, size = "md" }: { xp: number; showXp?: boolean; size?: "sm" | "md" }) {
  const { rank, level, prestige } = levelProgress(xp);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        prestige
          ? "border-gold/40 bg-gold/10 text-gold-soft shadow-goldglow"
          : "border-brand/30 bg-brand/10 text-brand-bright"
      )}
    >
      <Icon name={prestige ? "trophy" : "chart"} size={size === "sm" ? 12 : 14} />
      L{level} · {rank}
      {showXp && <span className="text-ink-faint">· {xp.toLocaleString()} XP</span>}
    </span>
  );
}

// ---------- Progress ring ----------
export function ProgressRing({ pct, size = 64, stroke = 7, children, color = "#10B981", track = "#223047" }: { pct: number; size?: number; stroke?: number; children?: React.ReactNode; color?: string; track?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (Math.min(100, Math.max(0, pct)) / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} style={{ transition: "stroke-dashoffset 0.6s ease" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

// ---------- XP bar ----------
export function XpBar({ xp }: { xp: number }) {
  const lp = levelProgress(xp);
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-semibold text-ink">{lp.rank}</span>
        <span className="text-ink-faint tabnum">
          {lp.nextRank ? `${lp.xpToNext.toLocaleString()} XP to ${lp.nextRank}` : "Max rank"}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface-overlay">
        <div className={cn("h-full rounded-full", lp.prestige ? "bg-gold" : "bg-brand")} style={{ width: `${lp.pct}%` }} />
      </div>
    </div>
  );
}

// ---------- Streak flame ----------
export function Streak({ days, size = "md" }: { days: number; size?: "sm" | "md" }) {
  const hot = days >= 7;
  return (
    <span className={cn("inline-flex items-center gap-1 font-bold tabnum", hot ? "text-warn" : "text-ink-muted", size === "sm" ? "text-xs" : "text-sm")}>
      <Icon name="fire" size={size === "sm" ? 14 : 16} className={hot ? "text-warn" : "text-ink-faint"} />
      {days}
    </span>
  );
}

// ---------- Section heading ----------
export function SectionTitle({ icon, title, action }: { icon?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
        {icon && <Icon name={icon} size={15} className="text-brand" />}
        {title}
      </h2>
      {action}
    </div>
  );
}

export function RealmPill({ realm }: { realm: "cre" | "hf" }) {
  return (
    <span className={cn("chip", realm === "cre" ? "!border-brand/30 !text-brand-bright" : "!border-info/40 !text-info")}>
      {realm === "cre" ? "CRE" : "High Finance"}
    </span>
  );
}
