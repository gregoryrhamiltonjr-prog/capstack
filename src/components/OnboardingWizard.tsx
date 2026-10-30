"use client";
import { useState, useTransition } from "react";
import { CAREER_STAGES, JOB_AREAS, GUIDED_PATHS } from "@/lib/types";
import { saveOnboarding } from "@/lib/actions";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/ui";
import { cn } from "@/lib/util";

type Placement = { q: string; choices: string[]; correct: number };
const PLACEMENT: Record<string, Placement[]> = {
  cre: [
    { q: "Cap rate equals…", choices: ["Value / NOI", "NOI / Value", "Debt / Equity", "Rent × 12"], correct: 1 },
    { q: "A 5.0% cap rate is equivalent to what multiple?", choices: ["5×", "15×", "20×", "50×"], correct: 2 },
    { q: "DSCR is…", choices: ["NCF / debt service", "LTV × value", "NOI / price", "Rent / vacancy"], correct: 0 },
    { q: "Which is excluded from NOI?", choices: ["Property taxes", "Insurance", "Debt service", "Payroll"], correct: 2 },
    { q: "Non-recourse debt limits the lender's remedy to…", choices: ["The borrower's salary", "The property (absent carve-outs)", "Nothing", "The broker"], correct: 1 },
  ],
  hf: [
    { q: "EBITDA adds back which to EBIT?", choices: ["Interest", "Taxes", "Depreciation & amortization", "Revenue"], correct: 2 },
    { q: "Unlevered free cash flow gives you…", choices: ["Equity value", "Enterprise value when discounted at WACC", "Net income", "Revenue"], correct: 1 },
    { q: "The balance sheet identity is…", choices: ["Assets = Liabilities + Equity", "Assets = Revenue − Costs", "Equity = Debt", "Cash = Profit"], correct: 0 },
    { q: "IRR is most sensitive to…", choices: ["Company logo", "The timing of cash flows", "Tax rate only", "Share count"], correct: 1 },
    { q: "Investment grade ends at which rating?", choices: ["AAA", "BB+", "BBB-/Baa3", "CCC"], correct: 2 },
  ],
};

export function OnboardingWizard({ defaults }: { defaults: { stage: string; area: string; goal: number; realm: string; path: string; school: string; company: string } }) {
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState(defaults.stage);
  const [area, setArea] = useState(defaults.area);
  const [goal, setGoal] = useState(defaults.goal);
  const [realm, setRealm] = useState(defaults.realm);
  const [path, setPath] = useState(defaults.path);
  const [school, setSchool] = useState(defaults.school);
  const [company, setCompany] = useState(defaults.company);
  const [takePlacement, setTakePlacement] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [pending, start] = useTransition();

  const steps = ["Your seat", "Focus", "Weekly goal", "Placement"];
  const placementQs = PLACEMENT[realm] ?? PLACEMENT.cre;

  function finish(placementPassed: boolean) {
    start(() =>
      saveOnboarding({
        careerStage: stage,
        jobArea: area,
        weeklyGoal: goal,
        startingRealm: realm,
        guidedPath: path,
        school,
        company,
        placementPassed,
        placementTrackId: realm === "cre" ? "T1" : "HF-1",
      })
    );
  }

  const score = answers.filter((a, i) => a === placementQs[i]?.correct).length;

  return (
    <div className="mx-auto w-full max-w-xl px-5 py-8">
      <div className="mb-6 flex items-center justify-center gap-2"><Logo size={28} /> <span className="text-lg font-bold">CapStack</span></div>
      {/* Step indicator */}
      <div className="mb-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div className={cn("h-1.5 rounded-full", i <= step ? "bg-brand" : "bg-surface-overlay")} />
            <div className={cn("mt-1 text-[10px]", i === step ? "text-brand-bright" : "text-ink-faint")}>{s}</div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        {step === 0 && (
          <div>
            <h2 className="text-lg font-bold">Where do you sit?</h2>
            <p className="mt-1 text-sm text-ink-muted">Content adapts to your stage — you can change it anytime.</p>
            <div className="mt-4 space-y-2">
              {CAREER_STAGES.map((s) => (
                <button key={s.id} type="button" aria-pressed={stage === s.id} onClick={() => setStage(s.id)} className={cn("w-full rounded-xl border p-3 text-left transition-colors", stage === s.id ? "border-brand bg-brand/10" : "border-line hover:bg-surface-raised")}>
                  <div className="text-sm font-semibold text-ink">{s.label}</div>
                  <div className="text-xs text-ink-muted">{s.blurb}</div>
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="onboarding-school">School (optional)</label>
                <input id="onboarding-school" className="input" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="UNC Kenan-Flagler" />
              </div>
              <div>
                <label className="label" htmlFor="onboarding-company">Company (optional)</label>
                <input id="onboarding-company" className="input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Wells Fargo" />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold">What's your focus?</h2>
            <p className="mt-1 text-sm text-ink-muted">We tune examples and your recommended path to this.</p>
            <label className="label mt-4" htmlFor="onboarding-area">Job area</label>
            <select id="onboarding-area" className="input" value={area} onChange={(e) => setArea(e.target.value)}>
              {JOB_AREAS.map((j) => <option key={j.id} value={j.id}>{j.label}</option>)}
            </select>
            <p className="label mt-4" id="onboarding-realm">Start in which realm?</p>
            <div role="group" aria-labelledby="onboarding-realm" className="grid grid-cols-2 gap-3">
              {[{ id: "cre", label: "Commercial Real Estate" }, { id: "hf", label: "High Finance" }].map((r) => (
                <button key={r.id} type="button" aria-pressed={realm === r.id} onClick={() => setRealm(r.id)} className={cn("rounded-xl border p-3 text-sm font-semibold transition-colors", realm === r.id ? "border-brand bg-brand/10 text-brand-bright" : "border-line text-ink-muted hover:bg-surface-raised")}>{r.label}</button>
              ))}
            </div>
            <p className="label mt-4" id="onboarding-path">Guided path</p>
            <div role="group" aria-labelledby="onboarding-path" className="space-y-2">
              {GUIDED_PATHS.filter((p) => (realm === "hf" ? p.id === "hf_core" || p.id === "full_curriculum" : p.id !== "hf_core")).map((p) => (
                <button key={p.id} type="button" aria-pressed={path === p.id} onClick={() => setPath(p.id)} className={cn("w-full rounded-xl border p-3 text-left transition-colors", path === p.id ? "border-brand bg-brand/10" : "border-line hover:bg-surface-raised")}>
                  <div className="text-sm font-semibold text-ink">{p.label}</div>
                  <div className="text-xs text-ink-muted">{p.blurb}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-bold">Set a weekly goal</h2>
            <p className="mt-1 text-sm text-ink-muted">Lessons completed per week. Drives your progress ring.</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[3, 5, 10].map((g) => (
                <button key={g} type="button" aria-pressed={goal === g} onClick={() => setGoal(g)} className={cn("rounded-xl border p-5 text-center transition-colors", goal === g ? "border-brand bg-brand/10" : "border-line hover:bg-surface-raised")}>
                  <div className="text-2xl font-extrabold text-brand">{g}</div>
                  <div className="text-xs text-ink-muted">{g === 3 ? "Casual" : g === 5 ? "Committed" : "Rainmaker"}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-bold">Optional placement</h2>
            <p className="mt-1 text-sm text-ink-muted">Know the basics? Test out of the intro module (counts complete, awards no XP).</p>
            {takePlacement === null && (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={() => setTakePlacement(true)} className="btn-ghost py-4">Take 5-question placement</button>
                <button onClick={() => finish(false)} disabled={pending} className="btn-primary py-4">Skip — start at lesson 1</button>
              </div>
            )}
            {takePlacement && answers.length < placementQs.length && (
              <div className="mt-5">
                <div className="mb-2 text-xs text-ink-faint">Question {answers.length + 1} of {placementQs.length}</div>
                <div className="text-sm font-semibold text-ink">{placementQs[answers.length].q}</div>
                <div className="mt-3 space-y-2">
                  {placementQs[answers.length].choices.map((c, i) => (
                    <button key={i} onClick={() => setAnswers([...answers, i])} className="w-full rounded-xl border border-line p-3 text-left text-sm hover:border-brand/50 hover:bg-surface-raised">{c}</button>
                  ))}
                </div>
              </div>
            )}
            {takePlacement && answers.length === placementQs.length && (
              <div className="mt-5 text-center">
                <div className={cn("text-3xl font-extrabold", score >= 4 ? "text-brand" : "text-warn")}>{score}/{placementQs.length}</div>
                <p className="mt-1 text-sm text-ink-muted">{score >= 4 ? "Passed — you'll test out of the intro module." : "Not quite — you'll start at lesson 1 to build the base."}</p>
                <button onClick={() => finish(score >= 4)} disabled={pending} className="btn-primary mx-auto mt-4 px-6 py-3">
                  {pending ? "Setting up…" : "Enter CapStack"} <Icon name="arrowRight" size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Nav */}
        {step < 3 && (
          <div className="mt-6 flex items-center justify-between">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="btn-ghost disabled:opacity-30">Back</button>
            <button onClick={() => setStep((s) => s + 1)} className="btn-primary">Continue <Icon name="arrowRight" size={16} /></button>
          </div>
        )}
      </div>
    </div>
  );
}
