// Pure subscription/access helpers. No server-only imports so these can be used
// anywhere (server components, actions, client-safe display logic).

export const PRICE_DISPLAY = "$12.99";
export const BILLING_PERIOD = "month";
export const TRIAL_DAYS = 3;

// Minimal shape needed to decide access — matches the User fields we mirror from Stripe.
export type BillingUser = {
  subscriptionStatus?: string | null;
  trialEndsAt?: Date | string | null;
  currentPeriodEnd?: Date | string | null;
  cancelAtPeriodEnd?: boolean | null;
};

// Statuses that grant access to the app. past_due kept in a short dunning grace.
const ACCESS_STATUSES = new Set(["trialing", "active", "past_due"]);

export function isTrialing(user: BillingUser): boolean {
  return user.subscriptionStatus === "trialing";
}

/** Trial or paid subscription in good standing → full app access. */
export function hasAccess(user: BillingUser): boolean {
  return ACCESS_STATUSES.has(user.subscriptionStatus ?? "");
}

/** Free roam is a paid feature — available once the trial converts to a paid plan. */
export function canUseFreeRoam(user: BillingUser): boolean {
  return hasAccess(user) && !isTrialing(user);
}

/** Effective free roam for gating: the stored flag AND paid access. */
export function effectiveFreeRoam(user: BillingUser & { freeRoam?: boolean }): boolean {
  return Boolean(user.freeRoam) && canUseFreeRoam(user);
}

export function trialDaysLeft(user: BillingUser): number | null {
  if (!isTrialing(user) || !user.trialEndsAt) return null;
  const end = new Date(user.trialEndsAt).getTime();
  const ms = end - Date.now();
  if (ms <= 0) return 0;
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function subscriptionLabel(user: BillingUser): string {
  switch (user.subscriptionStatus) {
    case "trialing": {
      const d = trialDaysLeft(user);
      return d === null ? "Free trial" : `Free trial · ${d} day${d === 1 ? "" : "s"} left`;
    }
    case "active":
      return user.cancelAtPeriodEnd ? "Active · cancels at period end" : "Active";
    case "past_due":
      return "Payment past due";
    case "canceled":
      return "Canceled";
    case "unpaid":
      return "Unpaid";
    case "incomplete":
    case "incomplete_expired":
      return "Payment incomplete";
    case "paused":
      return "Paused";
    default:
      return "No active subscription";
  }
}
