"use client";

/**
 * Cinematic landing primitives — motionsites-class "grandiose" motion:
 * preloader curtain, pinned scroll-scrubbed 3D hero, giant outline marquees,
 * horizontal course rail, oversized kinetic stats.
 * Every piece respects prefers-reduced-motion (static fallback, nothing hidden).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { animate, useInView, useReducedMotion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INTRO_KEY = "cs-intro-seen";

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ==========================================
// SCROLL RESET — always open at the top on load/reload
// Safari restores the prior scroll position on reload, which drops you
// mid-page with the pinned ScrollTrigger scenes out of sync. Take manual
// control and force the top, beating the browser's late restoration.
// ==========================================
export function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(raf);
  }, []);
  return null;
}

// ==========================================
// 0. PRELOADER — counter + curtain reveal (first visit per session)
// ==========================================
export function Preloader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced() || sessionStorage.getItem(INTRO_KEY)) return;
    sessionStorage.setItem(INTRO_KEY, "1");
    setShow(true);
    document.documentElement.style.overflow = "hidden";

    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        setShow(false);
      },
    });
    tl.to(counter, {
      v: 100,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.v)),
    })
      .to(".preloader-brand", { opacity: 0, y: -16, duration: 0.25 }, "+=0.1")
      .to(overlayRef.current, { yPercent: -100, duration: 0.7, ease: "power4.inOut" });

    return () => {
      document.documentElement.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (!show) return null;
  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas">
      <div className="preloader-brand flex flex-col items-center gap-6">
        <div className="text-glow-brand text-3xl font-black tracking-tight">CapStack</div>
        <div className="h-px w-48 overflow-hidden bg-line">
          <div className="h-full bg-gradient-to-r from-brand to-gold-soft transition-[width] duration-100" style={{ width: `${count}%` }} />
        </div>
        <div className="font-mono text-sm tabular-nums text-ink-faint">{count}%</div>
      </div>
    </div>
  );
}

// ==========================================
// 1. GOLD-DUST PARTICLE FIELD (canvas)
// ==========================================
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, running = false, onScreen = true, last = 0;
    const N = window.innerWidth < 640 ? 36 : 70;
    const parts = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.00022,
      vy: -0.00012 - Math.random() * 0.00028,
      tw: Math.random() * Math.PI * 2,
      ts: 0.4 + Math.random() * 1.2,
    }));

    function resize() {
      if (!canvas) return;
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function tick(now: number) {
      const dt = Math.min(now - last, 50); last = now;
      ctx!.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx * dt; p.y += p.vy * dt; p.tw += 0.0016 * p.ts * dt;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;
        const a = 0.14 + 0.3 * (0.5 + 0.5 * Math.sin(p.tw));
        ctx!.beginPath();
        ctx!.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(224, 184, 86, ${a})`;
        ctx!.fill();
      }
      if (running) raf = requestAnimationFrame(tick);
    }

    // Only animate while the hero is on-screen and the tab is visible — a
    // constantly-running canvas loop otherwise janks scrolling across the page.
    function start() {
      if (running || !onScreen || document.hidden) return;
      running = true; last = performance.now(); raf = requestAnimationFrame(tick);
    }
    function stop() { running = false; cancelAnimationFrame(raf); }

    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; onScreen ? start() : stop(); }, { threshold: 0 });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => { stop(); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}

// ==========================================
// 2. CINEMATIC HERO — pinned, scroll-scrubbed 3D tower + kinetic type
// ==========================================
const TOWER = [
  { id: "common", label: "Common Equity", ret: "15–20%+", color: "#F5B301" },
  { id: "pref", label: "Preferred Equity", ret: "10–15%", color: "#8B5CF6" },
  { id: "mezz", label: "Mezzanine Debt", ret: "8–12%", color: "#2E8BE6" },
  { id: "senior", label: "Senior Debt", ret: "4–7%", color: "#6FA891" },
];

const LINE_1 = "CLIMB THE WHOLE";
const LINE_2 = "CAPITAL STACK.";

function KineticLine({ text, className = "", glow = false }: { text: string; className?: string; glow?: boolean }) {
  return (
    <span aria-hidden="true" className={`block whitespace-nowrap ${className}`}>
      {text.split("").map((ch, i) => (
        <span key={i} className="char-mask">
          <span className={`hero-char ${glow ? "text-glow-brand" : ""}`}>{ch === " " ? " " : ch}</span>
        </span>
      ))}
    </span>
  );
}

export function CinematicHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current, scene = sceneRef.current;
    if (!wrap || !scene) return;

    if (prefersReduced()) {
      gsap.set(".tower-label", { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // — Entrance: chars rise via CSS (see .char-mask > span); tower floats in —
      // The headline reveal is intentionally CSS-only so a GSAP context revert
      // can never strand the letters off-screen.
      const introDelay = 0.2;
      gsap.from(".hero-tower", { opacity: 0, y: 120, duration: 1.2, ease: "power3.out", delay: introDelay + 0.3 });
      gsap.from(".hero-sub, .hero-cta", { opacity: 0, y: 24, duration: 0.8, stagger: 0.12, delay: introDelay + 0.5 });

      // — Levitation bob on the tower —
      gsap.to(".hero-tower-inner", { y: -14, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // — Scroll cinema: pin the scene, scrub the story —
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "+=110%",
          scrub: 0.4,
          pin: scene,
          anticipatePin: 1,
        },
      });

      // Phase 1 — chrome exits fast, headline recedes, tower centers on stage.
      // Headline holds full opacity through the first sliver of scroll (0.06) so
      // it's always solid at the top instead of mid-fade under the scrub lag.
      tl.to(".hero-sub, .hero-cta, .hero-badge, .hero-scrollcue", { opacity: 0, y: -40, duration: 0.1, ease: "none" }, 0)
        .to(".hero-headline", { scale: 0.8, yPercent: -30, opacity: 0, duration: 0.3, ease: "none" }, 0.06)
        .to(".hero-tower", { scale: 1.28, yPercent: -30, duration: 0.45, ease: "none" }, 0.05);

      // Phase 2 — the stack fans apart cleanly, staying centered
      tl.to(".tower-slab", {
        y: (i: number) => (i - 1.5) * 58,
        duration: 0.4,
        ease: "power2.inOut",
        stagger: 0.03,
      }, 0.28);

      // Phase 3 — scene yields to the page
      tl.to(scene, { opacity: 0, scale: 0.97, duration: 0.18, ease: "none" }, 0.82);

      // — Mouse parallax on depth layers —
      const px = gsap.quickTo(".hero-parallax-far", "x", { duration: 0.9, ease: "power3" });
      const py = gsap.quickTo(".hero-parallax-far", "y", { duration: 0.9, ease: "power3" });
      const tx = gsap.quickTo(".hero-tower", "x", { duration: 0.7, ease: "power3" });
      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        px(nx * -30); py(ny * -20); tx(nx * 24);
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <div ref={sceneRef} className="relative flex h-[100svh] flex-col items-center justify-center overflow-hidden pt-16">
        {/* Depth layers */}
        <div aria-hidden className="hero-parallax-far absolute inset-[-4%]">
          <div className="hero-grid absolute inset-0" />
          <div className="absolute -top-32 left-1/2 h-[520px] w-[780px] -translate-x-1/2 animate-aurora-drift rounded-full bg-brand/[0.14] blur-[130px]" />
          <div className="absolute right-[-8%] top-1/3 h-[400px] w-[400px] animate-aurora-drift rounded-full bg-info/[0.09] blur-[120px] [animation-delay:-6s]" />
          <div className="absolute bottom-[-12%] left-[-6%] h-[380px] w-[560px] animate-aurora-drift rounded-full bg-gold/[0.08] blur-[140px] [animation-delay:-12s]" />
        </div>
        <ParticleField />

        <div className="relative z-10 flex w-full max-w-[1500px] flex-col items-center px-5 text-center">
          <div className="hero-badge mb-[min(2rem,3svh)] inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright shadow-glow animate-glow-pulse">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-bright" />
            </span>
            Private beta — onboarding in waves
          </div>

          {/* Viewport-filling kinetic headline */}
          <h1 className="hero-headline font-black leading-[0.98] tracking-tight text-white" style={{ fontSize: "clamp(2.4rem, min(8.2vw, 11svh), 8.5rem)" }}>
            <span className="sr-only">{`${LINE_1} ${LINE_2}`.toLowerCase().replace(/^./, (c) => c.toUpperCase())}</span>
            <KineticLine text={LINE_1} />
            <KineticLine text={LINE_2} glow />
          </h1>

          <p className="hero-sub mx-auto mt-[min(1.75rem,3svh)] max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Zero to desk-ready across commercial real estate and high finance — models you can feel, not just read.
          </p>

          <div className="hero-cta mt-[min(2rem,3svh)] flex flex-wrap items-center justify-center gap-4">
            <a href="#waitlist" className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-bold text-[#1a1206] shadow-glow transition-colors hover:bg-brand-bright">
              Join the waitlist
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a href="#curriculum" className="btn-ghost rounded-full border border-line px-7 py-4 text-base font-bold hover:bg-surface">
              View curriculum
            </a>
          </div>

          {/* 3D tower — assembles below the type, explodes on scroll */}
          <div className="hero-tower relative mt-[min(3.5rem,4svh)] h-[min(240px,24svh)] w-full max-w-[420px] [perspective:1200px] sm:h-[min(280px,24svh)]">
            <div className="hero-tower-inner absolute inset-0" style={{ transform: "rotateX(52deg) rotateZ(-42deg)", transformStyle: "preserve-3d" }}>
              {TOWER.map((t, i) => (
                <div
                  key={t.id}
                  className="tower-slab absolute left-1/2 top-1/2 h-24 w-72 -translate-x-1/2 -translate-y-1/2 rounded-2xl border sm:w-80"
                  style={{
                    borderColor: t.color,
                    background: `linear-gradient(135deg, ${t.color}2e 0%, ${t.color}10 100%)`,
                    boxShadow: `0 0 40px -8px ${t.color}66, inset 0 0 24px -12px ${t.color}88`,
                    transform: `translate(-50%, -50%) translateZ(${(3 - i) * 44}px)`,
                  }}
                >
                  <div className="flex h-full items-center justify-between px-5" style={{ transform: "translateZ(1px)" }}>
                    <span className="text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: t.color }}>{t.label}</span>
                    <span className="font-mono text-sm font-bold" style={{ color: t.color }}>{t.ret}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute -bottom-10 left-1/2 h-20 w-3/4 -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />
          </div>
        </div>

        {/* Scroll cue */}
        <div aria-hidden className="hero-scrollcue absolute bottom-6 left-1/2 z-10 -translate-x-1/2 [@media(max-height:820px)]:hidden">
          <div className="flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-ink-faint">
            Scroll
            <span className="relative h-10 w-px overflow-hidden bg-line">
              <span className="scroll-cue-dot absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent via-brand to-transparent" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. GIANT OUTLINE MARQUEE — two counter-scrolling rows of 7vw type
// ==========================================
const ROW_A = ["CAP RATES", "DSCR", "LBO MODELING", "CMBS", "IRR", "MEZZANINE"];
const ROW_B = ["RENT ROLLS", "NOI", "PREF EQUITY", "SYNDICATION", "WATERFALLS", "SUPERDAYS"];

function OutlineRow({ words, reverse = false, duration = 38 }: { words: string[]; reverse?: boolean; duration?: number }) {
  const items = [...words, ...words];
  return (
    <div className="flex w-max" style={{ animation: `marquee ${duration}s linear infinite ${reverse ? "reverse" : "normal"}` }}>
      {items.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="text-outline text-outline-hover shrink-0 cursor-default px-6 font-black uppercase leading-none transition-colors duration-300"
          style={{ fontSize: "clamp(3rem, 7vw, 7.5rem)" }}
        >
          {w}
          <span className="text-glow-brand px-6 text-[0.35em] align-middle">✦</span>
        </span>
      ))}
    </div>
  );
}

export function OutlineMarquee() {
  return (
    <section aria-label="Topics covered" className="relative space-y-4 overflow-hidden border-y border-line/60 py-10">
      <OutlineRow words={ROW_A} duration={42} />
      <OutlineRow words={ROW_B} reverse duration={54} />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-canvas to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-canvas to-transparent" />
    </section>
  );
}

// ==========================================
// 4. HORIZONTAL COURSE RAIL — pinned, scrubbed sideways
// ==========================================
const RAIL_COURSES = [
  { title: "Debt & the Capital Stack", realm: "CRE", color: "#C79A3A", icon: "🏛", blurb: "Senior to common — who gets paid, in what order, and why the middle is where careers are made." },
  { title: "LBO Modeling", realm: "High Finance", color: "#3B82F6", icon: "📈", blurb: "Sources & uses, debt schedules, returns bridges. The model every PE interview assumes you know." },
  { title: "CMBS & Structured Finance", realm: "CRE", color: "#8B5CF6", icon: "🧱", blurb: "Tranching, subordination, and how defaults cascade bottom-up through a securitization." },
  { title: "DSCR & Loan Sizing", realm: "CRE", color: "#6FA891", icon: "🏦", blurb: "NOI ÷ debt service — the constraint that actually sizes every senior loan on the street." },
  { title: "IRR Playground", realm: "Both realms", color: "#F5B301", icon: "⚡", blurb: "Feel how timing, leverage, and exit caps bend the return profile in real time." },
];

export function HorizontalCourseRail() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current, rail = railRef.current;
    if (!wrap || !rail || prefersReduced()) return;

    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const getX = () => -(rail.scrollWidth - window.innerWidth + 96);
      gsap.to(rail, {
        x: getX,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${rail.scrollWidth - window.innerWidth + 400}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={wrapRef} id="courses" className="relative scroll-mt-16 overflow-hidden">
      <div className="flex h-[100svh] flex-col justify-center">
        <div className="mx-auto mb-10 w-full max-w-7xl px-6">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand">The library</div>
          <h2 className="mt-3 font-black leading-none text-white" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
            Courses built like <span className="text-glow-brand">desk training.</span>
          </h2>
        </div>
        <div ref={railRef} className="flex w-max gap-6 px-12 max-md:w-full max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-6">
          {RAIL_COURSES.map((c) => (
            <article
              key={c.title}
              className="group relative flex h-[380px] w-[420px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface p-8 max-md:w-[85vw]"
              style={{ boxShadow: `0 20px 60px -30px ${c.color}40` }}
            >
              <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40" style={{ background: c.color }} />
              <div className="relative">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3 py-1 text-xs font-bold" style={{ color: c.color }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                  {c.realm}
                </div>
                <div className="text-5xl">{c.icon}</div>
                <h3 className="mt-4 text-3xl font-black leading-tight text-white">{c.title}</h3>
              </div>
              <p className="relative text-sm leading-relaxed text-ink-muted">{c.blurb}</p>
            </article>
          ))}
          {/* End card — CTA */}
          <a
            href="#waitlist"
            className="group relative flex h-[380px] w-[420px] shrink-0 snap-center flex-col items-center justify-center gap-4 rounded-3xl border border-brand/40 bg-brand/[0.06] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-brand/[0.1] max-md:w-[85vw]"
          >
            <div className="text-glow-brand font-black leading-none" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              + more<br />every wave
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-[#1a1206] shadow-glow transition-transform group-hover:scale-105">
              Join the waitlist →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. GIANT KINETIC STATS — numbers the size of the viewport
// ==========================================
export function GiantStats({ stats }: { stats: [string, string][] }) {
  return (
    <section className="border-y border-line/60 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([n, l], i) => (
          <GiantStat key={l} value={n} label={l} index={i} />
        ))}
      </div>
    </section>
  );
}

function GiantStat({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const numeric = parseInt(value, 10);
  const [display, setDisplay] = useState(reduce || isNaN(numeric) ? value : "0");

  useEffect(() => {
    if (!inView || reduce || isNaN(numeric)) return;
    const controls = animate(0, numeric, {
      duration: 1.6,
      delay: index * 0.12,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, numeric, reduce, index]);

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div
        className="text-glow-brand font-black leading-none tabular-nums transition-transform duration-700"
        style={{ fontSize: "clamp(4.5rem, 9vw, 8.5rem)", transform: inView ? "translateY(0)" : "translateY(24px)", opacity: inView ? 1 : 0 }}
      >
        {isNaN(numeric) ? value : display}
      </div>
      <div className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">{label}</div>
    </div>
  );
}
