import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { isStripeConfigured } from "@/lib/stripe";
import { hasAccess, subscriptionLabel, PRICE_DISPLAY, BILLING_PERIOD, TRIAL_DAYS } from "@/lib/subscription";
import { startCheckoutAction, logoutAction } from "@/lib/actions";
import { Icon } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { SubmitButton } from "@/components/SubmitButton";

export default async function SubscribePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/");
  // Already subscribed → into the app.
  if (isStripeConfigured() && hasAccess(user)) redirect("/dashboard");

  const configured = isStripeConfigured();
  const reactivating = Boolean(user.subscriptionStatus); // had a subscription before

  const perks = [
    "Full CRE + High Finance curriculum",
    "Interactive lessons, quizzes, and 3D models",
    "XP, streaks, ranks, and leaderboards",
    "Study groups, DMs, and accountability partners",
    "Free Roam mode — unlock any module (paid members only)",
  ];

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="flex items-center justify-between border-b border-line px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <Logo size={26} /> Cap<span className="-ml-2 text-brand">Stack</span>
        </Link>
        <form action={logoutAction}>
          <button className="text-sm text-ink-muted transition-colors hover:text-ink">Sign out</button>
        </form>
      </header>

      <main className="mx-auto max-w-lg px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink">
            {reactivating ? "Reactivate your membership" : "Start your free trial"}
          </h1>
          <p className="mt-3 text-lg text-ink-muted">
            {reactivating
              ? "Your subscription is no longer active. Resubscribe to regain full access."
              : `Get ${TRIAL_DAYS} days free, then ${PRICE_DISPLAY}/${BILLING_PERIOD}. Cancel anytime.`}
          </p>
          {reactivating && (
            <p className="mt-2 text-sm text-ink-faint">Current status: {subscriptionLabel(user)}</p>
          )}
        </div>

        <div className="card-raised bg-surface p-8">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-ink">{PRICE_DISPLAY}</span>
            <span className="text-ink-muted">/ {BILLING_PERIOD}</span>
          </div>
          {!reactivating && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-sm font-semibold text-brand-bright">
              <Icon name="zap" size={14} /> {TRIAL_DAYS}-day free trial
            </div>
          )}

          <ul className="mt-6 space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-ink">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          {configured ? (
            <form action={startCheckoutAction} className="mt-8">
              <SubmitButton
                className="btn-primary w-full py-3 text-base shadow-glow"
                pendingLabel="Redirecting to checkout…"
              >
                {reactivating ? "Resubscribe" : `Start ${TRIAL_DAYS}-day free trial`}
              </SubmitButton>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-faint">
                <Icon name="lock" size={12} /> Secured by Stripe · cancel anytime
              </p>
            </form>
          ) : (
            <div className="mt-8 rounded-lg border border-line bg-surface-raised p-4 text-sm text-ink-muted">
              Billing is not configured yet. Set <code className="text-ink">STRIPE_SECRET_KEY</code> and{" "}
              <code className="text-ink">STRIPE_PRICE_ID</code> to enable checkout.
            </div>
          )}

          <p className="mt-4 text-center text-xs text-ink-faint">
            {reactivating
              ? `${PRICE_DISPLAY}/${BILLING_PERIOD}. Cancel anytime.`
              : `You won't be charged until your ${TRIAL_DAYS}-day trial ends. Cancel anytime before then and pay nothing.`}
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Free Roam mode activates once your trial converts to a paid plan.
        </p>
      </main>
    </div>
  );
}
