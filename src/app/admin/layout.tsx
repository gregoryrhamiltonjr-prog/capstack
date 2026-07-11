import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/ui";
import { logoutAction } from "@/lib/actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/");

  return (
    <div className="mx-auto flex min-h-dvh max-w-[1400px]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-60 flex-none flex-col border-r border-line bg-surface/60 px-3 py-4 lg:flex">
        <Link href="/admin/waitlist" className="mb-6 flex items-center gap-2 px-2 text-lg font-bold tracking-tight text-brand">
          <Icon name="shield" size={26} className="text-brand" /> Admin
        </Link>
        <nav className="flex flex-col gap-1">
          <Link href="/admin/waitlist" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors bg-brand/10 text-brand-bright">
            <Icon name="users" size={18} />
            Waitlist
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-ink-muted hover:bg-surface-raised hover:text-ink">
            <Icon name="log-out" size={18} />
            Back to App
          </Link>
        </nav>
        <div className="mt-auto space-y-3 px-1">
          <form action={logoutAction}>
            <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-faint transition-colors hover:bg-surface-raised hover:text-ink">
              <Icon name="logout" size={16} /> Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-canvas/90 px-4 py-2.5 backdrop-blur lg:hidden">
        <Link href="/admin/waitlist" className="flex items-center gap-2 font-bold text-brand">
          <Icon name="shield" size={22} className="text-brand" /> Admin
        </Link>
        <Link href="/dashboard" className="text-sm font-medium text-ink-muted">Back to App</Link>
      </header>

      <main className="min-w-0 flex-1 px-4 pb-24 pt-5 sm:px-6 lg:pb-8 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
