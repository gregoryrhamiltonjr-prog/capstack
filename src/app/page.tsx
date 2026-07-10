import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Logo, Wordmark } from "@/components/Logo";
import { Icon } from "@/components/ui";
import { HeroSection, BentoGrid, ScrollyTelling, FinancialCalculator, CoursePreviews, Testimonials } from "@/components/LandingBlocks";

const FEATURES = [
  { icon: "book", title: "Institutional-grade content", body: "300–800 words per concept on the flagship tracks, with worked numbers, desk callouts, and interview ammo. Zero filler." },
  { icon: "chart", title: "Interactive by default", body: "Cap-rate sliders, DSCR loan-sizing, capital-stack builder, amortization, CMBS waterfall, IRR playground — feel the math move." },
  { icon: "trophy", title: "Gamified progression", body: "XP, a 12-rank ladder from Prospect to Rainmaker, daily streaks, quizzes with a tiered hint system, and four leaderboards." },
  { icon: "users", title: "A full social layer", body: "Profiles, school & company discovery, DMs, accountability partners, and groups. Learn like it's a group chat." },
];

const CRE = ["CRE Foundations", "Debt & the Capital Stack", "Agency Lending & GSEs — flagship", "CMBS & Structured Finance", "Development", "Real Estate PE", "Brokerage", "Macro & History", "Capstones & Career"];
const HF = ["Finance & Accounting Bedrock", "Investment Banking", "ECM", "DCM & Bond Math", "LevFin & Private Credit", "Sales & Trading", "Fund Finance", "PE & Alternatives", "HF / AM / WM", "Career Navigation"];

export default async function Landing() {
  if (await getCurrentUser()) redirect("/dashboard");
  return (
    <div className="min-h-dvh">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Wordmark size={26} />
        <div className="flex items-center gap-2">
          <Link href="/login" className="btn-ghost">Log in</Link>
          <Link href="/signup" className="btn-primary">Get started</Link>
        </div>
      </header>

      {/* New Hero Section & Interactive Components */}
      <HeroSection />

      <CoursePreviews />

      <Testimonials />

      <BentoGrid />

      <ScrollyTelling />

      <FinancialCalculator />

      {/* Stat strip */}
      <section className="border-y border-line bg-surface/40 mt-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-8 text-center sm:grid-cols-4">
          {[["19", "tracks, two realms"], ["12", "ranks to Rainmaker"], ["6", "interactive widgets"], ["100%", "authored, zero stubs"]].map(([n, l]) => (
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

      {/* Curriculum scope */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card p-6">
            <div className="chip mb-4 !border-brand/30 !text-brand-bright">Realm · Commercial Real Estate</div>
            <ul className="space-y-2 text-sm text-ink-muted">
              {CRE.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon name="check" size={15} className="text-brand" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <div className="chip mb-4 !border-info/40 !text-info">Realm · High Finance</div>
            <ul className="space-y-2 text-sm text-ink-muted">
              {HF.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon name="check" size={15} className="text-info" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 pb-20 text-center">
        <div className="card-raised p-10">
          <Logo size={40} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold tracking-tight">Ready to make analyst by Friday?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">Free to start. Pick your track, set a weekly goal, keep the streak alive.</p>
          <Link href="/signup" className="btn-primary mx-auto mt-6 w-fit px-6 py-3 text-base">Create your account</Link>
        </div>
        <p className="mt-8 text-xs text-ink-faint">CapStack · Climb the whole capital stack.</p>
      </section>
    </div>
  );
}
