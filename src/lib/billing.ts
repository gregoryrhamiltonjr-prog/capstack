import "server-only";
import type Stripe from "stripe";
import { db } from "./db";
import { getStripe, PRICE_ID, TRIAL_DAYS, appBaseUrl } from "./stripe";

/** Get or create the Stripe customer for a user and persist the id. */
export async function ensureStripeCustomer(userId: string): Promise<string> {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");
  if (user.stripeCustomerId) return user.stripeCustomerId;

  const stripe = getStripe();
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.displayName || user.name || undefined,
    metadata: { userId: user.id },
  });
  await db.user.update({ where: { id: user.id }, data: { stripeCustomerId: customer.id } });
  return customer.id;
}

/** Write a Stripe subscription's state onto the owning user. */
export async function syncSubscriptionToUser(sub: Stripe.Subscription): Promise<void> {
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const user = await db.user.findUnique({ where: { stripeCustomerId: customerId } });
  if (!user) return;

  const item = sub.items.data[0];
  const priceId = item?.price?.id ?? null;
  // Stripe v18 moved current_period_end onto the subscription item; fall back to
  // the legacy top-level field for older API versions.
  const periodEnd =
    (item as { current_period_end?: number } | undefined)?.current_period_end ??
    (sub as unknown as { current_period_end?: number }).current_period_end ??
    null;

  await db.user.update({
    where: { id: user.id },
    data: {
      stripeSubscriptionId: sub.id,
      subscriptionStatus: sub.status,
      subscriptionPriceId: priceId,
      trialEndsAt: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
      currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
  });
}

/** Create a Checkout session for the $12.99/mo plan with a 3-day trial. Returns the redirect URL. */
export async function createCheckoutUrl(userId: string): Promise<string> {
  const stripe = getStripe();
  const customerId = await ensureStripeCustomer(userId);
  const base = appBaseUrl();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    client_reference_id: userId,
    line_items: [{ price: PRICE_ID, quantity: 1 }],
    subscription_data: { trial_period_days: TRIAL_DAYS },
    // Card required upfront so the trial auto-converts to a paid plan.
    payment_method_collection: "always",
    allow_promotion_codes: true,
    success_url: `${base}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/subscribe`,
  });

  if (!session.url) throw new Error("Stripe did not return a checkout URL");
  return session.url;
}

/**
 * Sync straight from a completed Checkout session (used on the success return so
 * the user's status is set before they hit a gated page — no webhook race).
 */
export async function syncFromCheckoutSession(sessionId: string): Promise<void> {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["subscription"] });
  const sub = session.subscription;
  if (sub && typeof sub !== "string") {
    await syncSubscriptionToUser(sub);
  }
}

/** Create a Stripe Billing Portal session so users can manage/cancel. Returns the URL. */
export async function createPortalUrl(userId: string): Promise<string> {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user?.stripeCustomerId) throw new Error("No Stripe customer for user");
  const stripe = getStripe();
  const portal = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${appBaseUrl()}/settings`,
  });
  return portal.url;
}
