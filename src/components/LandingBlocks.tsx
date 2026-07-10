"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useScroll, useInView, animate, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Icon } from "@/components/ui";
import { MouseGlow, ScrubReveal } from "@/components/InteractiveWrappers";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================
// 0. SCROLL PROGRESS BAR (fixed top, brass)
// ==========================================
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-brand via-brand-bright to-gold-soft"
      style={{ scaleX }}
    />
  );
}

// ==========================================
// 1. HERO SECTION
// ==========================================
const HEADLINE_TOP = ["Climb", "the", "whole"];

export function HeroSection() {
  const reduce = useReducedMotion();
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const word = {
    hidden: { opacity: 0, y: reduce ? 0 : 28, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 220, damping: 24 } },
  };

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pb-20 pt-20">
      {/* Aurora background — layered drifting brand glows + faint grid */}
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 animate-aurora-drift rounded-full bg-brand/[0.13] blur-[120px]" />
        <div className="absolute right-[-10%] top-1/3 h-[380px] w-[380px] animate-aurora-drift rounded-full bg-info/[0.08] blur-[110px] [animation-delay:-6s]" />
        <div className="absolute bottom-[-15%] left-[-5%] h-[360px] w-[520px] animate-aurora-drift rounded-full bg-gold/[0.07] blur-[130px] [animation-delay:-12s]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-canvas" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div className="space-y-8">
          {/* Glowing pill badge */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright shadow-glow animate-glow-pulse"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-bright" />
            </span>
            Private beta — onboarding in waves
          </motion.div>

          {/* Word-staggered display headline with glowing gradient accent */}
          <motion.h1
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            {HEADLINE_TOP.map((w) => (
              <motion.span key={w} variants={word} className="mr-[0.22em] inline-block">
                {w}
              </motion.span>
            ))}
            <br />
            <motion.span variants={word} className="relative inline-block">
              {/* Bloom layer behind the gradient text */}
              <span aria-hidden className="text-glow-brand absolute inset-0 blur-2xl opacity-60 animate-glow-pulse select-none">
                capital stack.
              </span>
              <span className="text-glow-brand relative">capital stack.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="max-w-lg text-lg leading-relaxed text-ink-muted"
          >
            The elite platform taking you from zero to desk-ready across commercial real estate and high finance. Master complex models interactively.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <MagneticLink href="#waitlist" className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-bold text-[#1a1206] shadow-glow transition-colors hover:bg-brand-bright">
              Join the waitlist
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </MagneticLink>
            <Link href="#curriculum" className="btn-ghost rounded-full border border-line px-7 py-4 text-base font-bold hover:bg-surface">
              View curriculum
            </Link>
          </motion.div>
        </div>

        {/* Capital stack — clean layered bars, no overlap */}
        <div className="animate-float-in-right [animation-delay:250ms] relative flex w-full items-center justify-center py-8 lg:py-4">
          <Interactive3DStack />
        </div>
      </div>
    </section>
  );
}

/** Magnetic pill CTA — leans toward the cursor, springs back on leave. */
function MagneticLink({ href, className = "", children }: { href: string; className?: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a href={href} className={className} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.a>
  );
}

// ==========================================
// 1.2 MARQUEE TICKER — infinite topic strip
// ==========================================
const TICKER_TOPICS = [
  "Cap Rates", "DSCR Sizing", "Capital Stack", "CMBS Waterfalls", "LBO Modeling", "IRR & Equity Multiples",
  "Mezzanine Debt", "Rent Rolls", "NOI Bridges", "Syndication", "Pref Equity", "Amortization", "Value-Add", "Superday Prep",
];

export function MarqueeTicker() {
  const items = [...TICKER_TOPICS, ...TICKER_TOPICS]; // doubled for seamless -50% loop
  return (
    <section aria-label="Topics covered" className="relative overflow-hidden border-y border-line bg-surface/30 py-4">
      <div className="marquee-track flex w-max">
        <div className="flex shrink-0 animate-marquee items-center gap-3 pr-3">
          {items.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold text-ink-muted transition-colors hover:border-brand/50 hover:text-brand-bright"
            >
              <span className="h-1 w-1 rounded-full bg-brand/70" />
              {t}
            </span>
          ))}
        </div>
      </div>
      {/* Edge fades */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-canvas to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-canvas to-transparent" />
    </section>
  );
}

// ==========================================
// 1.3 COUNT-UP STAT STRIP
// ==========================================
export function CountUpStats({ stats }: { stats: [string, string][] }) {
  return (
    <section className="mt-16 border-y border-line bg-surface/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-10 text-center sm:grid-cols-4">
        {stats.map(([n, l]) => (
          <CountUpStat key={l} value={n} label={l} />
        ))}
      </div>
    </section>
  );
}

function CountUpStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const numeric = parseInt(value, 10);
  const [display, setDisplay] = useState(reduce || isNaN(numeric) ? value : "0");

  useEffect(() => {
    if (!inView || reduce || isNaN(numeric)) return;
    const controls = animate(0, numeric, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, numeric, reduce]);

  return (
    <div ref={ref}>
      <div className="text-4xl font-extrabold tabular-nums text-brand">{isNaN(numeric) ? value : display}</div>
      <div className="mt-1 text-xs text-ink-muted">{label}</div>
    </div>
  );
}

function Interactive3DStack() {
  const stackLayers = [
    { id: "common", label: "Common Equity", risk: "Highest risk", return: "15–20%+", color: "#F5B301", width: "100%" },
    { id: "pref", label: "Preferred Equity", risk: "Med–high", return: "10–15%", color: "#8B5CF6", width: "94%" },
    { id: "mezz", label: "Mezzanine Debt", risk: "Medium", return: "8–12%", color: "#2E8BE6", width: "88%" },
    { id: "senior", label: "Senior Debt", risk: "Lowest risk", return: "4–7%", color: "#6FA891", width: "82%" },
  ];

  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-[360px]">
      <div className="flex flex-col items-center gap-3">
        {stackLayers.map((layer) => {
          const isHovered = hovered === layer.id;
          const isMuted = hovered !== null && !isHovered;
          return (
            <motion.button
              key={layer.id}
              type="button"
              onMouseEnter={() => setHovered(layer.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(layer.id)}
              onBlur={() => setHovered(null)}
              className="relative w-full origin-center rounded-2xl border px-5 py-5 text-left outline-none transition-shadow"
              style={{
                width: layer.width,
                borderColor: layer.color,
                background: `linear-gradient(180deg, ${layer.color}22 0%, ${layer.color}0d 100%)`,
                boxShadow: isHovered
                  ? `0 12px 32px -12px ${layer.color}55, 0 0 0 1px ${layer.color}40`
                  : `0 4px 16px -8px ${layer.color}30`,
              }}
              animate={{
                y: isHovered ? -4 : 0,
                scale: isHovered ? 1.02 : 1,
                opacity: isMuted ? 0.45 : 1,
              }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: layer.color }}>
                    {layer.label}
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">{layer.risk}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black tabular-nums" style={{ color: layer.color }}>
                    {layer.return}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-ink-faint">target</div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
      <div className="pointer-events-none absolute -bottom-6 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-brand/15 blur-2xl" />
    </div>
  );
}


// ==========================================
// 1.5 DEEP DIVE BENTO GRID
// ==========================================
export function BentoGrid() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-3xl font-extrabold sm:text-4xl text-white">Engineered like a terminal.</h2>
        <p className="mt-4 text-ink-muted max-w-2xl mx-auto text-lg">Interactive tools that replace static spreadsheets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MouseGlow className="md:col-span-2 card-raised p-10 bg-surface">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 w-2/3">
            <Icon name="layers" size={32} className="text-brand mb-6" />
            <h3 className="text-2xl font-bold mb-3 text-white">CMBS Waterfall Builder</h3>
            <p className="text-ink-muted leading-relaxed">Drag and drop tranches to build a securitization waterfall. Watch how defaults cascade from the bottom up.</p>
          </div>
        </MouseGlow>

        <MouseGlow className="card-raised p-10 bg-surface">
          <Icon name="barChart" size={32} className="text-info mb-6" />
          <h3 className="text-xl font-bold mb-3 text-white">DSCR Sizing</h3>
          <p className="text-ink-muted text-sm leading-relaxed">Adjust NOI and cap rates to instantly see lender constraints on proceeds.</p>
        </MouseGlow>

        <MouseGlow className="card-raised p-10 bg-surface">
          <Icon name="trophy" size={32} className="text-gold mb-6" />
          <h3 className="text-xl font-bold mb-3 text-white">12-Rank Ladder</h3>
          <p className="text-ink-muted text-sm leading-relaxed">Start as a Prospect and grind your way to Rainmaker via models and quizzes.</p>
        </MouseGlow>

        <MouseGlow className="md:col-span-2 card-raised p-10 border-l-4 border-l-brand bg-surface">
          <h3 className="text-2xl font-bold mb-3 text-white">Zero Filler. All Signal.</h3>
          <p className="text-ink-muted leading-relaxed mb-6">Cut the academic fluff. Learn exactly what you need to answer technicals on desk calls and superdays.</p>
          <div className="flex gap-3">
            <div className="chip !bg-surface-raised border-line text-ink">Interview Ammo</div>
            <div className="chip !bg-surface-raised border-line text-ink">Desk Callouts</div>
          </div>
        </MouseGlow>
      </div>
    </section>
  );
}

// ==========================================
// 2. LEARN BY DOING (Scrollytelling)
// ==========================================
export function ScrollyTelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);

  const steps = [
    { title: "Sourcing", desc: "Identify underpriced assets using our proprietary screener. Learn to read an OM in minutes.", color: "#3B82F6" },
    { title: "Underwriting", desc: "Build institutional-grade cash flow models. Project rent rolls and precise expense ratios.", color: "#8B5CF6" },
    { title: "Capital Raising", desc: "Structure the capital stack. Syndicate equity, size senior debt, and inject mezzanine layers.", color: "#F5B301" },
    { title: "Closing", desc: "Finalize debt facilities and complete the acquisition to hit target returns.", color: "#10B981" },
  ];

  useEffect(() => {
    if (!containerRef.current || !buildingRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.step-card');
      const buildingLayers = gsap.utils.toArray<HTMLElement>('.building-layer');

      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0.1, x: -40, scale: 0.95 },
          {
            opacity: 1, x: 0, scale: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 60%",
              end: "bottom 40%",
              scrub: true,
              onEnter: () => gsap.to(buildingLayers[i], { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)" }),
              onLeaveBack: () => gsap.to(buildingLayers[i], { opacity: 0, y: 80, scale: 0.9, duration: 0.4 })
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 max-w-7xl mx-auto px-6 relative border-t border-line">
      <div className="text-center mb-24">
        <h2 className="text-4xl font-extrabold sm:text-5xl text-white">Master the Lifecycle</h2>
        <p className="mt-4 text-ink-muted text-lg">Scroll to see how a deal comes together.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-16 relative items-start">
        <div className="w-full md:w-1/2 space-y-[40vh] pt-[10vh] pb-[30vh]">
          {steps.map((step, i) => (
            <MouseGlow key={i} className="step-card card-raised p-10 border-l-4 shadow-2xl bg-surface" style={{ borderLeftColor: step.color }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: step.color }}>Phase 0{i+1}</div>
              <h3 className="text-3xl font-bold mb-4 text-white">{step.title}</h3>
              <p className="text-ink-muted text-lg leading-relaxed">{step.desc}</p>
            </MouseGlow>
          ))}
        </div>

        <div className="hidden md:block w-full md:w-1/2 sticky top-[15vh]">
          <div ref={buildingRef} className="h-[70vh] flex flex-col-reverse items-center justify-center perspective-1000 relative z-10">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className="building-layer relative w-80 h-28 -mt-10 rounded-xl border border-line bg-surface/90 flex items-center justify-center opacity-0 translate-y-20 shadow-xl"
                style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateZ(-45deg)" }}
              >
                <div className="absolute inset-0 border-t-4 border-l-4 rounded-xl opacity-60" style={{ borderColor: step.color, transform: "translateZ(0px)" }} />
                <div className="text-2xl font-black opacity-40" style={{ color: step.color, transform: "translateZ(1px)" }}>{step.title}</div>
              </div>
            ))}
            <div className="absolute bottom-[0%] w-[450px] h-[450px] border border-line/30 rounded-full" style={{ transform: "rotateX(60deg) rotateZ(-45deg)" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. FINANCIAL CALCULATOR
// ==========================================
export function FinancialCalculator() {
  const [interest, setInterest] = useState(6.5);
  const [ltv, setLtv] = useState(65);
  const [term, setTerm] = useState(5);

  const data = Array.from({ length: 11 }, (_, i) => {
    const year = i;
    const baseValue = 1000000;
    const loanAmount = baseValue * (ltv / 100);
    const equity = baseValue - loanAmount;
    const equityGrowth = equity * Math.pow(1 + (0.15 - (interest/100)*0.5), year);
    const debtPaydown = loanAmount - (loanAmount * (year / (term * 2)));

    return {
      year: `Yr ${year}`,
      Equity: Math.max(0, Math.round(equityGrowth)),
      Debt: Math.max(0, Math.round(debtPaydown)),
    };
  });

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 border-t border-line">
      <div className="card-raised p-10 sm:p-16 border border-line relative overflow-hidden bg-surface">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-4xl font-extrabold text-white mb-4">Interactive Modeling</h2>
              <p className="text-ink-muted text-lg leading-relaxed">Adjust leverage and capital cost to instantly visualize impacts on returns.</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-white">Interest Rate</label>
                  <span className="text-brand font-mono bg-brand/10 px-2 py-1 rounded">{interest.toFixed(1)}%</span>
                </div>
                <input type="range" min="2" max="12" step="0.1" value={interest} onChange={(e) => setInterest(parseFloat(e.target.value))} className="w-full accent-brand h-1.5 bg-surface-raised rounded-lg appearance-none cursor-pointer" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-white">Loan-to-Value (LTV)</label>
                  <span className="text-info font-mono bg-info/10 px-2 py-1 rounded">{ltv}%</span>
                </div>
                <input type="range" min="40" max="85" step="1" value={ltv} onChange={(e) => setLtv(parseInt(e.target.value))} className="w-full accent-info h-1.5 bg-surface-raised rounded-lg appearance-none cursor-pointer" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-white">Hold Period</label>
                  <span className="text-gold font-mono bg-gold/10 px-2 py-1 rounded">{term} Yrs</span>
                </div>
                <input type="range" min="1" max="10" step="1" value={term} onChange={(e) => setTerm(parseInt(e.target.value))} className="w-full accent-gold h-1.5 bg-surface-raised rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.slice(0, term + 1)} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C79A3A" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#C79A3A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#8A96AC" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#8A96AC" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} dx={-10} />
                <Tooltip contentStyle={{ backgroundColor: '#141B27', borderColor: '#33404F', borderRadius: '12px', padding: '12px' }} itemStyle={{ fontFamily: 'monospace', fontWeight: 'bold' }} labelStyle={{ color: '#93A0B4', marginBottom: '8px' }} formatter={(value: any) => `$${Number(value).toLocaleString()}`} />
                <Area type="monotone" dataKey="Debt" stackId="1" stroke="#3B82F6" fill="url(#colorDebt)" strokeWidth={3} animationDuration={500} />
                <Area type="monotone" dataKey="Equity" stackId="1" stroke="#C79A3A" fill="url(#colorEquity)" strokeWidth={3} animationDuration={500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}


// ==========================================
// 4. COURSE PREVIEW CARDS (3D Tilt)
// ==========================================
export function CoursePreviews() {
  const courses = [
    { title: "Debt & the Capital Stack", mentor: "MD @ Blackstone", realm: "CRE", color: "#C79A3A", icon: "building" },
    { title: "LBO Modeling", mentor: "VP @ KKR", realm: "High Finance", color: "#3B82F6", icon: "chart" },
    { title: "CMBS & Structured Finance", mentor: "Director @ Goldman", realm: "CRE", color: "#8B5CF6", icon: "layers" },
  ];

  return (
    <section id="mentors" className="mx-auto max-w-7xl px-6 pt-24 pb-8">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Elite Industry Mentors</h2>
        <p className="mt-4 text-lg text-ink-muted">Taught by professionals executing multi-billion dollar deals.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {courses.map((course, i) => (
          <TiltCard key={i} course={course} />
        ))}
      </div>
    </section>
  );
}

export function TiltCard({ course }: { course: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative card-raised p-8 h-80 cursor-pointer flex flex-col justify-between group overflow-hidden bg-surface border-line hover:border-transparent transition-colors"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${course.color}, transparent 70%)` }} />
      <div style={{ transform: "translateZ(30px)" }}>
        <div className="chip !bg-canvas border-line mb-4 inline-flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: course.color }} />
          <span className="font-bold">{course.realm || "Course"}</span>
        </div>
        <h3 className="text-2xl font-bold text-white leading-tight">{course.title}</h3>
      </div>
      <div style={{ transform: "translateZ(50px)" }} className="flex items-center gap-4 mt-8 bg-canvas/80 backdrop-blur p-4 rounded-xl border border-line/50 w-fit">
        <div className="w-10 h-10 rounded-full bg-surface-overlay border border-line flex items-center justify-center shrink-0">
          <Icon name="user" size={16} className="text-ink-muted" />
        </div>
        <div>
          <div className="text-xs text-ink-muted font-bold uppercase tracking-wider mb-0.5">Taught by</div>
          <div className="text-sm font-bold text-white">{course.mentor || "Industry Expert"}</div>
        </div>
      </div>
      <div className="absolute -bottom-10 -right-10 opacity-[0.03] text-white pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12" style={{ transform: "translateZ(-10px)" }}>
        <Icon name={course.icon || "star"} size={160} />
      </div>
    </motion.div>
  );
}

// ==========================================
// 5. TESTIMONIALS / SOCIAL PROOF
// ==========================================
export function Testimonials() {
  const reviews = [
    { quote: "Finally, a platform that actually explains how to model a waterfall instead of just giving me a broken Excel template.", role: "Acquisitions Analyst", firm: "Mega-fund PE" },
    { quote: "CapStack's interactive widgets made DSCR constraints click for me in 5 minutes. Better than my 3-week training program.", role: "Credit Associate", firm: "Top Tier Bank" },
    { quote: "The gamification actually works. I find myself logging in to keep my streak alive and learn one more debt concept.", role: "Investment Banking Analyst", firm: "Bulge Bracket" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 pt-8 pb-24">
      <div className="grid gap-8 md:grid-cols-3">
        {reviews.map((r, i) => (
          <MouseGlow key={i} className="card border-t-2 bg-surface p-8" style={{ borderTopColor: i === 0 ? "#C79A3A" : i === 1 ? "#3B82F6" : "#F5B301" }}>
            <div className="flex gap-1 text-brand mb-6">
              {[1,2,3,4,5].map(s => (
                <div key={s} className="text-brand drop-shadow-md">
                  <Icon name="star" size={16} />
                </div>
              ))}
            </div>
            <p className="text-lg text-white leading-relaxed mb-8">"{r.quote}"</p>
            <div>
              <div className="font-bold text-white">{r.role}</div>
              <div className="text-sm text-ink-muted">{r.firm}</div>
            </div>
          </MouseGlow>
        ))}
      </div>
    </section>
  );
}
