import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { signupAction } from "@/lib/actions";
import { Wordmark } from "@/components/Logo";
import { AuthProviders } from "@/components/AuthProviders";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await getCurrentUser()) redirect("/dashboard");
  const { error } = await searchParams;

  return (
    <div className="flex min-h-dvh items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex justify-center">
          <Wordmark size={30} />
        </Link>
        <div className="card p-6">
          <h1 className="text-xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-ink-muted">Email, Google, or Apple — your profile, your progress.</p>

          {error === "exists" && (
            <p className="mt-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">That email is already registered.</p>
          )}
          {error === "1" && (
            <p className="mt-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">Check your details (password ≥ 6 chars).</p>
          )}
          {error === "oauth" && (
            <p className="mt-3 rounded-lg border border-info/30 bg-info/10 px-3 py-2 text-sm text-info">
              This email already uses Google or Apple. Log in with that instead.
            </p>
          )}

          <form action={signupAction} className="mt-5 space-y-4">
            <div>
              <label className="label" htmlFor="name">
                Display name
              </label>
              <input id="name" name="name" className="input" placeholder="Jordan Analyst" autoComplete="name" />
            </div>
            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <input id="email" name="email" type="email" required className="input" placeholder="you@company.com" autoComplete="email" />
            </div>
            <div>
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="input"
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
            </div>
            <button className="btn-primary w-full py-3">Create account with email</button>
          </form>

          <div className="mt-4">
            <AuthProviders mode="signup" />
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-ink-muted">
          Have an account?{" "}
          <Link href="/login" className="font-semibold text-brand hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
