"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Icon, RankBadge, Streak } from "./ui";
import { logoutAction } from "@/lib/actions";
import { cn } from "@/lib/util";
import { UserAvatar } from "./UserAvatar";
import { Magnetic } from "@/components/InteractiveWrappers";

const ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "chart" },
  { href: "/map", label: "Course Map", icon: "map" },
  { href: "/leaderboard", label: "Leaderboard", icon: "trophy" },
  { href: "/social", label: "Social", icon: "users" },
  { href: "/profile", label: "Profile", icon: "target" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

export function AppNav({
  xp,
  streak,
  name,
  avatarColor,
  avatarUrl,
}: {
  xp: number;
  streak: number;
  name: string;
  avatarColor: string;
  avatarUrl?: string | null;
}) {
  const path = usePathname();
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-60 flex-none flex-col border-r border-line bg-surface/60 px-3 py-4 lg:flex">
        <Link href="/" className="mb-6 flex items-center gap-2 px-2 text-lg font-bold tracking-tight">
          <Logo size={26} /> Cap<span className="-ml-2 text-brand">Stack</span>
        </Link>
        <nav className="flex flex-col gap-1">
          {ITEMS.map((it) => {
            const active = path === it.href || path.startsWith(it.href + "/");
            return (
              <Link key={it.href} href={it.href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-brand/10 text-brand-bright" : "text-ink-muted hover:bg-surface-raised hover:text-ink")}>
                <Icon name={it.icon} size={18} />
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto space-y-3 px-1">
          <Magnetic strength={0.1}>
            <Link href="/profile" className="flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors hover:bg-surface-raised">
              <UserAvatar name={name} color={avatarColor} url={avatarUrl} size={32} />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-ink">{name}</div>
                <div className="text-[11px] text-ink-faint">View profile</div>
              </div>
            </Link>
          </Magnetic>
          <div className="flex items-center justify-between">
            <RankBadge xp={xp} size="sm" />
            <Streak days={streak} size="sm" />
          </div>
          <form action={logoutAction}>
            <Magnetic strength={0.2}>
              <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-faint transition-colors hover:bg-surface-raised hover:text-ink">
                <Icon name="logout" size={16} /> Sign out
              </button>
            </Magnetic>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-canvas/90 px-4 py-2.5 backdrop-blur lg:hidden">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Logo size={22} /> Cap<span className="-ml-1.5 text-brand">Stack</span>
        </Link>
        <div className="flex items-center gap-3">
          <Streak days={streak} size="sm" />
          <RankBadge xp={xp} size="sm" />
        </div>
      </header>

      {/* Mobile bottom nav (max 5) */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-line bg-canvas/95 px-2 py-1.5 backdrop-blur lg:hidden">
        {ITEMS.slice(0, 5).map((it) => {
          const active = path === it.href || path.startsWith(it.href + "/");
          return (
            <Link key={it.href} href={it.href} className={cn("flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1 text-[10px] font-medium", active ? "text-brand-bright" : "text-ink-faint")}>
              <Icon name={it.icon} size={20} />
              {it.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
