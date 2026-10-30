"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Icon, RankBadge, Streak } from "./ui";
import { logoutAction } from "@/lib/actions";
import { cn } from "@/lib/util";
import { UserAvatar } from "./UserAvatar";
import { isNavigationActive } from "@/lib/navigation";

const ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "chart" },
  { href: "/map", label: "Course Map", icon: "map" },
  { href: "/leaderboard", label: "Leaderboard", icon: "trophy" },
  { href: "/social", label: "Social", icon: "users" },
  { href: "/profile", label: "Profile", icon: "target" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

export function AppNav({ xp, streak, name, avatarColor, avatarUrl }: {
  xp: number; streak: number; name: string; avatarColor: string; avatarUrl?: string | null;
}) {
  const path = usePathname();
  return (
    <>
      <aside className="sticky top-0 hidden h-dvh w-60 flex-none flex-col border-r border-line bg-surface/60 px-3 py-4 lg:flex">
        <Link href="/" className="mb-6 flex items-center gap-2 px-2 text-lg font-bold tracking-tight"><Logo size={26} /> Cap<span className="-ml-2 text-brand">Stack</span></Link>
        <nav aria-label="Main navigation" className="flex flex-col gap-1">
          {ITEMS.map((item) => {
            const active = isNavigationActive(path, item.href);
            return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-brand/10 text-brand-bright" : "text-ink-muted hover:bg-surface-raised hover:text-ink")}><Icon name={item.icon} size={18} />{item.label}</Link>;
          })}
        </nav>
        <div className="mt-auto space-y-3 px-1">
          <Link href="/profile" className="flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors hover:bg-surface-raised">
            <UserAvatar name={name} color={avatarColor} url={avatarUrl} size={32} />
            <div className="min-w-0"><div className="truncate text-sm font-semibold text-ink">{name}</div><div className="text-[11px] text-ink-muted">View profile</div></div>
          </Link>
          <div className="flex items-center justify-between"><RankBadge xp={xp} size="sm" /><Streak days={streak} size="sm" /></div>
          <form action={logoutAction}><button className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink"><Icon name="logout" size={16} /> Sign out</button></form>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-line bg-canvas/95 px-4 py-2 backdrop-blur lg:hidden">
        <Link href="/" className="flex items-center gap-2 font-bold"><Logo size={22} /> Cap<span className="-ml-1.5 text-brand">Stack</span></Link>
        <div className="flex items-center gap-2"><Streak days={streak} size="sm" /><span className="hidden sm:inline-flex"><RankBadge xp={xp} size="sm" /></span><Link href="/settings" aria-label="Settings" aria-current={isNavigationActive(path, "/settings") ? "page" : undefined} className="flex h-11 w-11 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink"><Icon name="settings" size={20} /></Link></div>
      </header>

      <nav aria-label="Mobile navigation" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }} className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-line bg-canvas/95 px-2 pt-1.5 backdrop-blur lg:hidden">
        {ITEMS.slice(0, 5).map((item) => {
          const active = isNavigationActive(path, item.href);
          return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={cn("flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1 text-[10px] font-medium", active ? "text-brand-bright" : "text-ink-muted")}><Icon name={item.icon} size={20} />{item.label}</Link>;
        })}
      </nav>
    </>
  );
}
