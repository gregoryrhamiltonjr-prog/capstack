import { redirect } from "next/navigation";

// Public signup is disabled — the platform is private/admin-only.
export default function SignupPage() {
  redirect("/login");
}
