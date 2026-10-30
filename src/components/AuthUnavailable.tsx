import Link from "next/link";
import { Wordmark } from "@/components/Logo";
import { Icon } from "@/components/ui";

export function AuthUnavailable({ preview }: { preview: boolean }) {
  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex justify-center"><Wordmark size={30} /></Link>
        <div className="card p-7 sm:p-8">
          <span className="mb-5 inline-flex rounded-xl bg-brand/10 p-3 text-brand-bright"><Icon name="lock" size={22} /></span>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-bright">{preview ? "Preview environment" : "Please try again shortly"}</p>
          <h1 className="text-2xl font-bold text-ink">{preview ? "Your live account is on the main site." : "Sign-in is temporarily unavailable."}</h1>
          <p className="mt-3 text-sm leading-7 text-ink-muted">{preview ? "This preview isn’t connected to an isolated sign-in environment yet. Your live account hasn’t changed. Continue on the main site to sign in securely." : "We can’t securely sign you in right now. Please try again later. Your account details haven’t changed."}</p>
          {preview ? <a href="https://learncapstack.com/login" className="btn-primary mt-6 w-full">Sign in on the live site<Icon name="arrowRight" size={16} /></a> : <Link href="/" className="btn-ghost mt-6 w-full">Back to CapStack</Link>}
        </div>
      </div>
    </div>
  );
}
