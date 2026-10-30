import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { AppNav } from "@/components/AppNav";
import { WelcomeConfetti } from "@/components/WelcomeConfetti";
import { isStripeConfigured } from "@/lib/stripe";
import { hasAccess, isTrialing, trialDaysLeft } from "@/lib/subscription";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  // Admin-only lockdown — the entire app is private; only admins get in.
  if (!user.isAdmin) redirect("/");
  if (!user.onboarded) redirect("/onboarding");
  // Subscription gate — enforced only when Stripe is configured (admins bypass).
  if (isStripeConfigured() && !user.isAdmin && !hasAccess(user)) redirect("/subscribe");

  const trialing = isStripeConfigured() && !user.isAdmin && isTrialing(user);
  const daysLeft = trialing ? trialDaysLeft(user) : null;

  return (
    <div className="mx-auto min-h-dvh max-w-[1400px] lg:flex">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <WelcomeConfetti />
      <AppNav xp={user.xp} streak={user.currentStreak} name={user.displayName} avatarColor={user.avatarColor} avatarUrl={user.avatarUrl} />
      <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 scroll-mt-20 px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-6 sm:px-7 lg:pb-10 lg:pt-9">
        {trialing && (
          <Link
            href="/settings"
            className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-brand/30 bg-brand/10 px-4 py-2.5 text-sm text-brand-bright transition-colors hover:bg-brand/15"
          >
            <span>
              Free trial{daysLeft !== null ? ` · ${daysLeft} day${daysLeft === 1 ? "" : "s"} left` : ""}.
              Free Roam mode unlocks when your plan goes paid.
            </span>
            <span className="shrink-0 font-semibold underline">Manage</span>
          </Link>
        )}
        {children}
      </main>
    </div>
  );
}
