"use client";

import { useActionState } from "react";
import { Icon } from "@/components/ui";
import { joinWaitlist } from "@/lib/actions";

type WaitlistResult = { ok: boolean; message: string };
const INITIAL: WaitlistResult = { ok: false, message: "" };

/**
 * "Coming soon" waitlist band pinned to the very top of the landing page.
 * Anyone (no account) can drop an email to join the waitlist.
 */
export function ComingSoon() {
  const [state, formAction, pending] = useActionState(joinWaitlist, INITIAL);

  return (
    <section id="waitlist" className="relative scroll-mt-24 border-y border-brand/20 bg-gradient-to-b from-brand/10 to-transparent">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-7 text-center sm:flex-row sm:justify-between sm:gap-8 sm:text-left">
        <div className="space-y-1.5">
          <span className="chip !border-brand/40 !text-brand-bright">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Coming soon
          </span>
          <h2 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
            New realms, live cohorts &amp; desk simulators are on the way.
          </h2>
          <p className="text-sm text-ink-muted">
            Join the waitlist for early access and founding-member pricing.
          </p>
        </div>

        {state.ok ? (
          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-equity/40 bg-equity/10 px-4 py-3 text-sm font-medium text-equity">
            <Icon name="check" size={16} /> {state.message}
          </div>
        ) : (
          <form action={formAction} className="w-full shrink-0 sm:w-auto">
            {/* Honeypot — hidden from users, filled by many bots */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                name="email"
                required
                placeholder="you@email.com"
                aria-label="Email address"
                autoComplete="email"
                className="input sm:w-64"
              />
              <button
                type="submit"
                disabled={pending}
                aria-busy={pending}
                className="btn-primary shrink-0 px-5"
              >
                {pending ? "Joining…" : "Join waitlist"}
              </button>
            </div>
            {state.message && (
              <p role="alert" className="mt-2 text-left text-xs text-danger">{state.message}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
