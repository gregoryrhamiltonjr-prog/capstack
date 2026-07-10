import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { loginAction } from "@/lib/actions";
import { Wordmark } from "@/components/Logo";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await getCurrentUser()) redirect("/dashboard");
  const { error } = await searchParams;
  return (
    <div className="flex min-h-dvh items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex justify-center"><Wordmark size={30} /></Link>
        <div className="card p-6">
          <h1 className="text-xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-muted">Keep the streak alive.</p>
          {error && <p className="mt-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">Wrong email or password.</p>}
          <form action={loginAction} className="mt-5 space-y-4">
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required className="input" placeholder="demo@capstack.app" defaultValue="demo@capstack.app" autoComplete="email" />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required className="input" placeholder="••••••••" defaultValue="climbthestack" autoComplete="current-password" />
            </div>
            <button className="btn-primary w-full py-3">Log in</button>
          </form>
          <p className="mt-4 text-center text-xs text-ink-faint">Demo: demo@capstack.app / climbthestack</p>
        </div>
        <p className="mt-4 text-center text-sm text-ink-muted">
          No account? <Link href="/signup" className="font-semibold text-brand hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
