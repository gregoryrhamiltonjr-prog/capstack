import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { loginAction } from "@/lib/actions";
import { Wordmark } from "@/components/Logo";
import { AuthProviders } from "@/components/AuthProviders";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const currentUser = await getCurrentUser();
  if (currentUser?.isAdmin) redirect("/dashboard");
  const { error } = await searchParams;

  return (
    <div className="flex min-h-dvh items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex justify-center">
          <Wordmark size={30} />
        </Link>
        <div className="card p-6">
          <h1 className="text-xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-muted">Sign in with email, Google, or Apple.</p>

          {error === "1" && (
            <p className="mt-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">Wrong email or password.</p>
          )}
          {error === "oauth" && (
            <p className="mt-3 rounded-lg border border-info/30 bg-info/10 px-3 py-2 text-sm text-info">
              This email uses Google or Apple sign-in. Use that button below.
            </p>
          )}
          {error === "OAuthAccountNotLinked" && (
            <p className="mt-3 rounded-lg border border-warn/30 bg-warn/10 px-3 py-2 text-sm text-warn">
              That email is already registered. Sign in with the original method.
            </p>
          )}
          {(error === "access" || error === "AccessDenied") && (
            <p className="mt-3 rounded-lg border border-warn/30 bg-warn/10 px-3 py-2 text-sm text-warn">
              This account does not have private access.
            </p>
          )}

          <form action={loginAction} className="mt-5 space-y-4">
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
              <input id="password" name="password" type="password" required className="input" placeholder="••••••••" autoComplete="current-password" />
            </div>
            <button className="btn-primary w-full py-3">Log in with email</button>
          </form>

          <div className="mt-4">
            <AuthProviders mode="login" />
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-ink-faint">Private access. Accounts are provisioned by invitation only.</p>
      </div>
    </div>
  );
}
