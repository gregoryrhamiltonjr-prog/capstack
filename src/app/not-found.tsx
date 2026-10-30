import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-16">
      <div className="card w-full max-w-md p-8 text-center">
        <Logo size={36} className="mx-auto mb-5" />
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Page not found</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">We couldn’t find that page</h1>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          The link may be out of date, or the chapter may have moved. Your progress is safe.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/map" className="btn-primary">
            Go to the course map
          </Link>
          <Link href="/" className="btn-ghost">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
