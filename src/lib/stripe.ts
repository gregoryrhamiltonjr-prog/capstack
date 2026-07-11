import "server-only";
import Stripe from "stripe";
import { SITE_URL } from "@/lib/site";

// $12.99/month recurring price, created in the Stripe dashboard and referenced by ID.
export const PRICE_ID = process.env.STRIPE_PRICE_ID || "";
export const TRIAL_DAYS = 3;

/**
 * Billing is only enforced when Stripe is configured. In local dev with no keys
 * the app stays fully open so you can work without a Stripe account.
 */
export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && PRICE_ID);
}

let _stripe: Stripe | null = null;

/** Lazily construct the Stripe client. Throws if called without a secret key. */
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

/** Base URL for Checkout success/cancel redirects. */
export function appBaseUrl(): string {
  return (
    process.env.AUTH_URL ||
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL ? SITE_URL : "http://localhost:3000")
  ).replace(/\/$/, "");
}
