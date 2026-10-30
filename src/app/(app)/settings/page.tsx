import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FreeRoamToggle } from "@/components/FreeRoamToggle";
import { SettingsForm } from "@/components/SettingsForm";
import { isStripeConfigured } from "@/lib/stripe";
import { canUseFreeRoam, isTrialing, subscriptionLabel, PRICE_DISPLAY, BILLING_PERIOD } from "@/lib/subscription";
import { membershipControl } from "@/lib/presentation";
import { openBillingPortalAction, saveProfileSettingsAction } from "@/lib/actions";
import Link from "next/link";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/");
  const billingOn = isStripeConfigured();
  const freeRoamLocked = billingOn && !canUseFreeRoam(user);
  const membership = membershipControl(user);

  return (
    <div className="mx-auto max-w-3xl space-y-7 pb-8">
      <header className="border-b border-line pb-6"><h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Settings</h1><p className="mt-2 text-sm leading-7 text-ink-muted sm:text-base">Manage your profile and set a learning pace that works for you.</p></header>
      <SettingsForm initial={{ displayName: user.displayName, weeklyGoal: user.weeklyGoal, careerStage: user.careerStage, jobArea: user.jobArea, company: user.company, school: user.school }} email={user.email} action={saveProfileSettingsAction} />
      <section className="card p-5 sm:p-6" aria-labelledby="exploration-heading">
        <h2 id="exploration-heading" className="text-xl font-bold text-ink">Exploration mode</h2>
        <div className="mt-5 flex items-center justify-between gap-4"><div className="min-w-0"><p className="font-semibold text-ink">Free Roam</p><p className="mt-1 text-sm leading-6 text-ink-muted">Explore units without completing their prerequisites. Progress and quiz rules still apply.</p>{freeRoamLocked && <p className="mt-2 text-xs text-gold">{isTrialing(user) ? "Available after your trial converts to a paid plan." : "Available on a paid plan."}</p>}</div><FreeRoamToggle initial={user.freeRoam} locked={freeRoamLocked} /></div>
      </section>
      {billingOn && <section className="card p-5 sm:p-6" aria-labelledby="membership-heading">
        <h2 id="membership-heading" className="mb-4 text-xl font-bold text-ink">Membership</h2>
        <div className="flex flex-wrap items-center justify-between gap-4"><div className="min-w-0"><p className="font-semibold text-ink">{membership === "admin" ? "Administrator access" : "CapStack membership"}</p><p className="mt-1 text-sm leading-6 text-ink-muted">{membership === "admin" ? "Your administrator account has private access; no new subscription is required." : `${PRICE_DISPLAY}/${BILLING_PERIOD} · ${subscriptionLabel(user)}`}</p>{membership === "unavailable" && <p className="mt-2 text-xs text-ink-muted">Your access is active, but self-service billing is not linked to this account.</p>}</div>{membership === "manage" ? <form action={openBillingPortalAction}><button type="submit" className="btn-primary">Manage billing</button></form> : membership === "subscribe" ? <Link href="/subscribe" className="btn-primary">{user.subscriptionStatus ? "Review membership" : "View membership"}</Link> : null}</div>
      </section>}
      <section className="card p-5 sm:p-6" aria-labelledby="account-help-heading"><h2 id="account-help-heading" className="text-lg font-semibold text-ink">Account & administration</h2><p className="mt-2 text-sm leading-6 text-ink-muted">Account deletion is not available from this private-access version.</p><Link href="/admin/waitlist" className="btn-ghost mt-4">Waitlist administration</Link></section>
    </div>
  );
}
