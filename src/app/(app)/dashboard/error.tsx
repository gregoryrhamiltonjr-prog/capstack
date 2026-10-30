"use client";

import Link from "next/link";
import { Icon } from "@/components/ui";

export default function DashboardError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div role="alert" className="mx-auto max-w-xl rounded-3xl border border-line bg-surface p-8 text-center sm:mt-12">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand-bright"><Icon name="compass" size={24} /></span>
      <h1 className="mt-5 text-2xl font-bold text-ink">Your desk needs a moment.</h1>
      <p className="mt-3 text-sm leading-6 text-ink-muted">We couldn’t load your dashboard. Try again, or head to the course map to keep learning.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={reset} className="btn-primary">Try again</button><Link href="/map" className="btn-ghost">Course map</Link></div>
    </div>
  );
}
