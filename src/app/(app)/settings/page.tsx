import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MouseGlow, ScrubReveal } from "@/components/InteractiveWrappers";
import { FreeRoamToggle } from "@/components/FreeRoamToggle";
import { isStripeConfigured } from "@/lib/stripe";
import { canUseFreeRoam, hasAccess, isTrialing, subscriptionLabel, PRICE_DISPLAY, BILLING_PERIOD } from "@/lib/subscription";
import { openBillingPortalAction } from "@/lib/actions";
import Link from "next/link";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const billingOn = isStripeConfigured();
  const freeRoamLocked = billingOn && !canUseFreeRoam(user);

  return (
    <div className="mx-auto max-w-3xl space-y-10 pb-20">
      <header className="border-b border-line pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink">Settings</h1>
        <p className="mt-2 text-lg text-ink-muted">Manage your account and preferences.</p>
      </header>

      <ScrubReveal className="space-y-8">
        <MouseGlow className="card bg-surface p-6">
          <h2 className="mb-6 text-xl font-bold text-ink">Account Details</h2>
          <div className="max-w-md space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-muted">Display Name</label>
              <input
                type="text"
                defaultValue={user.displayName}
                className="w-full rounded-lg border border-line bg-surface-raised px-4 py-2 text-ink focus:border-brand focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-muted">Email Address</label>
              <input
                type="email"
                defaultValue={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-line bg-canvas px-4 py-2 text-ink-muted"
              />
            </div>
            <div className="pt-2">
              <button type="button" className="btn-primary px-6 py-2 text-sm shadow-glow">
                Save Changes
              </button>
            </div>
          </div>
        </MouseGlow>

        <MouseGlow className="card bg-surface p-6">
          <h2 className="mb-6 text-xl font-bold text-ink">Learning Preferences</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
              <div className="min-w-0">
                <div className="font-bold text-ink">Free Roam Mode</div>
                <div className="mt-1 text-sm text-ink-muted">
                  Unlock all units without passing prerequisites so you can open any module.
                </div>
                {freeRoamLocked && (
                  <div className="mt-1 text-xs font-medium text-gold">
                    {isTrialing(user)
                      ? "Available once your free trial converts to a paid plan."
                      : "Available on the paid plan."}
                  </div>
                )}
              </div>
              <FreeRoamToggle initial={user.freeRoam} locked={freeRoamLocked} />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-bold text-ink">Weekly Goal</div>
                <div className="mt-1 text-sm text-ink-muted">Target number of lessons to complete per week.</div>
              </div>
              <select
                defaultValue={user.weeklyGoal}
                className="rounded-lg border border-line bg-surface-raised px-4 py-2 text-ink outline-none focus:border-brand"
              >
                <option value="1">1 Lesson / Week (Casual)</option>
                <option value="5">5 Lessons / Week (Regular)</option>
                <option value="10">10 Lessons / Week (Intense)</option>
              </select>
            </div>
          </div>
        </MouseGlow>

        {billingOn && (
          <MouseGlow className="card bg-surface p-6">
            <h2 className="mb-6 text-xl font-bold text-ink">Membership</h2>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-bold text-ink">CapStack Membership</div>
                <div className="mt-1 text-sm text-ink-muted">
                  {PRICE_DISPLAY}/{BILLING_PERIOD} · Status:{" "}
                  <span className="font-semibold text-ink">{subscriptionLabel(user)}</span>
                </div>
              </div>
              {hasAccess(user) && user.stripeCustomerId ? (
                <form action={openBillingPortalAction}>
                  <button type="submit" className="btn-primary px-6 py-2 text-sm">
                    Manage billing
                  </button>
                </form>
              ) : (
                <Link href="/subscribe" className="btn-primary px-6 py-2 text-sm">
                  {user.subscriptionStatus ? "Reactivate" : "Subscribe"}
                </Link>
              )}
            </div>
          </MouseGlow>
        )}

        <MouseGlow className="card border border-danger/20 bg-surface p-6">
          <h2 className="mb-4 text-xl font-bold text-danger">Danger Zone</h2>
          <p className="mb-6 text-sm text-ink-muted">Once you delete your account, there is no going back. Please be certain.</p>
          <button
            type="button"
            className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-2 font-bold text-danger transition-colors hover:bg-danger/20"
          >
            Delete Account
          </button>
        </MouseGlow>
      </ScrubReveal>
    </div>
  );
}
