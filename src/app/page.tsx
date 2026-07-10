import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { Logo, Wordmark } from "@/components/Logo";
import { Icon } from "@/components/ui";
import { HeroSection, BentoGrid, ScrollyTelling, FinancialCalculator, CoursePreviews, Testimonials } from "@/components/LandingBlocks";
import { ComingSoon } from "@/components/ComingSoon";
import { ROADMAP } from "@/content/roadmap";
import { logoutAction } from "@/lib/actions";

const FEATURES = [
  { icon: "book", title: "Institutional-grade content", body: "300–800 words per concept in the flagship courses, with worked numbers, desk callouts, and interview ammo. Zero filler." },
  { icon: "chart", title: "Interactive by default", body: "Cap-rate sliders, DSCR loan-sizing, capital-stack builder, amortization, CMBS waterfall, IRR playground — feel the math move." },
  { icon: "trophy", title: "Gamified progression", body: "XP, a 12-rank ladder from Prospect to Rainmaker, daily streaks, quizzes with a tiered hint system, and four leaderboards." },
  { icon: "users", title: "A full social layer", body: "Profiles, school & company discovery, DMs, accountability partners, and groups. Learn like it's a group chat." },
];

const CRE_TRACKS = ROADMAP.filter((t) => t.realm === "cre");
const HF_TRACKS = ROADMAP.filter((t) => t.realm === "hf");
const LIVE_COUNT = ROADMAP.filter((t) => t.live).length;
const STATS = [
  [String(ROADMAP.length), "courses, two realms"],
  ["12", "ranks to Rainmaker"],
  ["6", "interactive widgets"],
  [String(LIVE_COUNT), "courses live now"],
];

export default async function Landing() {
  const currentUser = await getCurrentUser();
  return (
    <div className="min-h-dvh">
      {/* Nav */}
      <header className="animate-float-in mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Wordmark size={26} />
        <div className="flex items-center gap-2">
          {currentUser?.isAdmin ? (
            <Link href="/dashboard" className="btn-primary">Go to app</Link>
          ) : currentUser ? (
            <form action={logoutAction}>
              <button className="btn-ghost">Sign out</button>
            </form>
          ) : (
            <Link href="/login" className="btn-ghost">Log in</Link>
          )}
        </div>
      </header>

      {/* New Hero Section & Interactive Components */}
      <HeroSection />

      {/* Coming-soon waitlist — between the hero and Elite Industry Mentors */}
      <ComingSoon />

      <CoursePreviews />

      <Testimonials />

      <BentoGrid />

      <ScrollyTelling />

      <FinancialCalculator />

      {/* Stat strip */}
      <section className="border-y border-line bg-surface/40 mt-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-8 text-center sm:grid-cols-4">
          {STATS.map(([n, l]) => (
            <div key={l}>
              <div className="text-3xl font-extrabold text-brand">{n}</div>
              <div className="mt-1 text-xs text-ink-muted">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">Serious content. Addictive delivery.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon name={f.icon} size={20} />
              </div>
              <h3 className="font-semibold text-ink">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-ink-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum scope — driven by ROADMAP (source of truth). New courses appear here automatically. */}
      <section id="curriculum" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">The full curriculum</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-muted">
            {LIVE_COUNT} courses are live now — the rest are on the roadmap and unlock as they ship.
            <span className="mt-2 flex items-center justify-center gap-4 text-xs text-ink-faint">
              <span className="inline-flex items-center gap-1.5"><Icon name="check" size={13} className="text-brand" /> Live now</span>
              <span className="inline-flex items-center gap-1.5"><Icon name="clock" size={13} className="text-ink-faint" /> Coming soon</span>
            </span>
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            { label: "Realm · Commercial Real Estate", chip: "!border-brand/30 !text-brand-bright", tint: "text-brand", tracks: CRE_TRACKS },
            { label: "Realm · High Finance", chip: "!border-info/40 !text-info", tint: "text-info", tracks: HF_TRACKS },
          ].map((col) => (
            <div key={col.label} className="card p-6">
              <div className={`chip mb-5 ${col.chip}`}>{col.label}</div>
              <ul className="space-y-3.5 text-sm">
                {col.tracks.map((t) => (
                  <li key={t.code} className="flex items-start gap-2.5">
                    <Icon name={t.live ? "check" : "clock"} size={15} className={`mt-0.5 shrink-0 ${t.live ? col.tint : "text-ink-faint"}`} />
                    <span>
                      <span className="font-medium text-ink">{t.title}</span>
                      {t.live ? null : <span className="ml-2 rounded bg-surface px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-faint">Soon</span>}
                      <span className="mt-0.5 block text-xs leading-5 text-ink-muted">{t.tagline}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 pb-20 text-center">
        <div className="card-raised p-10">
          <Logo size={40} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold tracking-tight">Ready to make analyst by next Friday?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">CapStack is in private access. Join the waitlist above — we&apos;re onboarding new members in waves.</p>
          <Link href="/login" className="btn-primary mx-auto mt-6 w-fit px-6 py-3 text-base">Log in</Link>
        </div>
        <p className="mt-8 text-xs text-ink-faint">CapStack · Climb the whole capital stack.</p>
      </section>
    </div>
  );
}
