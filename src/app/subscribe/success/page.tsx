import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isStripeConfigured } from "@/lib/stripe";
import { syncFromCheckoutSession } from "@/lib/billing";

/**
 * Post-Checkout return. Syncs the subscription straight from the session so the
 * user's status is set before they reach a gated page (avoids a webhook race),
 * then sends them into the app.
 */
export default async function SubscribeSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/");

  const { session_id } = await searchParams;
  if (isStripeConfigured() && session_id) {
    try {
      await syncFromCheckoutSession(session_id);
    } catch {
      // If sync fails here the webhook will still reconcile — fall through.
    }
  }

  redirect(user.onboarded ? "/dashboard?welcome=1" : "/onboarding?welcome=1");
}
