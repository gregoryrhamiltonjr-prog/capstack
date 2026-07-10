import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { Logo, Wordmark } from "@/components/Logo";
import { Icon } from "@/components/ui";
import { BentoGrid, ScrollyTelling, FinancialCalculator, Testimonials, ScrollProgress } from "@/components/LandingBlocks";
import { Preloader, CinematicHero, OutlineMarquee, HorizontalCourseRail, GiantStats } from "@/components/LandingCinema";
import { ScrubReveal } from "@/components/InteractiveWrappers";
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
const STATS: [string, string][] = [
  [String(ROADMAP.length), "courses, two realms"],
  ["12", "ranks to Rainmaker"],
  ["6", "interactive widgets"],
  [String(LIVE_COUNT), "courses live now"],
];

const NAV_LINKS = [
  { href: "#courses", label: "Courses" },
  { href: "#curriculum", label: "Curriculum" },
  { href: "#waitlist", label: "Waitlist" },
];

export default async function Landing() {
  const currentUser = await getCurrentUser();
  return (
    <div className="min-h-dvh">
      <Preloader />
      <ScrollProgress />

      {/* Nav */}
      <header className="animate-float-in sticky top-0 z-40 border-b border-line/60 bg-canvas/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <Wordmark size={26} />
          <nav aria-label="Landing sections" className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-ink-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </nav>
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
        </div>
      </header>

      {/* Cinematic pinned hero — 3D tower explodes on scroll */}
      <CinematicHero />

      {/* Giant counter-scrolling outline marquee */}
      <OutlineMarquee />

      {/* Coming-soon waitlist — hero CTA scrolls here */}
      <ComingSoon />

      {/* Horizontal-scroll course rail (pinned) */}
      <HorizontalCourseRail />

      <ScrubReveal>
        <Testimonials />
      </ScrubReveal>

      <ScrubReveal>
        <BentoGrid />
      </ScrubReveal>

      <ScrollyTelling />

      <ScrubReveal>
        <FinancialCalculator />
      </ScrubReveal>

      {/* Viewport-scale kinetic stats */}
      <GiantStats stats={STATS} />

      {/* Features */}
      <ScrubReveal>
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">Serious content. Addictive delivery.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="card group p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                  <Icon name={f.icon} size={20} />
                </div>
                <h3 className="font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrubReveal>

      {/* Curriculum scope — driven by ROADMAP (source of truth). New courses appear here automatically. */}
      <ScrubReveal>
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
              <div key={col.label} className="card p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-glow">
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
      </ScrubReveal>

      {/* CTA */}
      <ScrubReveal>
        <section className="mx-auto max-w-3xl px-5 pb-20 text-center">
          <div className="card-raised relative overflow-hidden p-10">
            <div aria-hidden className="absolute -top-24 left-1/2 h-64 w-96 -translate-x-1/2 animate-glow-pulse rounded-full bg-brand/10 blur-3xl" />
            <div className="relative">
              <Logo size={40} className="mx-auto mb-4" />
              <h2 className="text-2xl font-bold tracking-tight">Ready to make analyst by next Friday?</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">CapStack is in private access — we&apos;re onboarding new members in waves.</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a href="#waitlist" className="btn-primary rounded-full px-6 py-3 text-base shadow-glow">Join the waitlist</a>
                <Link href="/login" className="btn-ghost rounded-full px-6 py-3 text-base">Log in</Link>
              </div>
            </div>
          </div>
        </section>
      </ScrubReveal>

      {/* Footer */}
      <footer className="border-t border-line bg-surface/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row">
          <div className="flex items-center gap-3">
            <Logo size={24} />
            <div>
              <div className="text-sm font-bold text-ink">CapStack</div>
              <div className="text-xs text-ink-faint">Climb the whole capital stack.</div>
            </div>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-ink">{l.label}</a>
            ))}
            <Link href="/login" className="transition-colors hover:text-ink">Log in</Link>
          </nav>
          <p className="text-xs text-ink-faint">© {new Date().getFullYear()} CapStack</p>
        </div>
      </footer>
    </div>
  );
}
