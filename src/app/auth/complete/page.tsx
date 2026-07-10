import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

/** Post-OAuth landing — send new users to onboarding, returning users to dashboard */
export default async function AuthCompletePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/");
  redirect(user.onboarded ? "/dashboard" : "/onboarding");
}
