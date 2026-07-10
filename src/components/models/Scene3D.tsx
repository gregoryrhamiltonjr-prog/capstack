"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MouseGlow } from "@/components/InteractiveWrappers";

type Layer = { id: string; label: string; sub?: string; color: string; h: number };

/** Interactive 3D capital stack — used in lessons, map, dashboard, widgets */
export function CapitalStack3D({
  layers,
  title = "Capital Stack",
  className = "",
}: {
  layers?: Layer[];
  title?: string;
  className?: string;
}) {
  const defaultLayers: Layer[] = [
    { id: "eq", label: "Common Equity", sub: "First loss · 15–20%+", color: "#F5B301", h: 72 },
    { id: "pref", label: "Preferred Equity", sub: "Mezz-like · 10–15%", color: "#8B5CF6", h: 56 },
    { id: "mezz", label: "Mezzanine Debt", sub: "Second lien · 8–12%", color: "#3B82F6", h: 48 },
    { id: "sr", label: "Senior Debt", sub: "First lien · 4–7%", color: "#6FA891", h: 64 },
  ];
  const stack = layers ?? defaultLayers;
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <MouseGlow className={`rounded-2xl border border-line/80 bg-surface/80 p-4 ${className}`}>
      <div className="mb-3 text-[11px] font-medium uppercase tracking-wider text-ink-faint">{title}</div>
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-2.5">
        {stack.map((layer) => {
          const isH = hovered === layer.id;
          const muted = hovered !== null && !isH;
          return (
            <motion.div
              key={layer.id}
              onMouseEnter={() => setHovered(layer.id)}
              onMouseLeave={() => setHovered(null)}
              className="w-full cursor-pointer rounded-xl border px-3 py-3"
              style={{
                minHeight: Math.max(48, layer.h * 0.7),
                borderColor: layer.color,
                background: `linear-gradient(180deg, ${layer.color}20 0%, ${layer.color}0a 100%)`,
                boxShadow: isH ? `0 10px 24px -10px ${layer.color}50` : undefined,
              }}
              animate={{ y: isH ? -3 : 0, scale: isH ? 1.015 : 1, opacity: muted ? 0.4 : 1 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center" style={{ color: layer.color }}>
                <div className="text-[11px] font-bold uppercase tracking-wider">{layer.label}</div>
                {layer.sub && <div className="mt-0.5 text-[10px] opacity-75">{layer.sub}</div>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </MouseGlow>
  );
}

/** Isometric office / deal building that “builds” floor by floor */
export function Building3D({
  floors = 5,
  activeFloor = 3,
  labels,
  title = "Asset Structure",
  className = "",
}: {
  floors?: number;
  activeFloor?: number;
  labels?: string[];
  title?: string;
  className?: string;
}) {
  const defaultLabels = ["Lobby / Ops", "Cash Flow", "Debt Service", "Equity Returns", "Exit / Cap Rate"];
  const names = labels ?? defaultLabels;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-120, 120], [8, -8]);
  const rotateY = useTransform(x, [-120, 120], [-10, 10]);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <MouseGlow className={`rounded-2xl border border-line/80 bg-surface/80 p-4 ${className}`}>
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-ink-faint">{title}</div>
      <motion.div
        className="relative mx-auto flex h-[320px] items-end justify-center"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left - r.width / 2);
          y.set(e.clientY - r.top - r.height / 2);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        <div className="relative flex flex-col-reverse items-center" style={{ transform: "rotateX(58deg) rotateZ(-42deg)", transformStyle: "preserve-3d" }}>
          {Array.from({ length: floors }).map((_, i) => {
            const on = i < activeFloor || hover === i;
            const label = names[i % names.length];
            const colors = ["#6FA891", "#3B82F6", "#8B5CF6", "#F5B301", "#EF4444"];
            const c = colors[i % colors.length];
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="relative mb-1 flex h-14 w-44 cursor-pointer items-center justify-center rounded-md border border-line/80"
                style={{
                  background: on ? `${c}22` : "rgba(22,31,48,0.9)",
                  boxShadow: on ? `0 0 20px ${c}33` : undefined,
                  transform: `translateZ(${i * 2}px)`,
                }}
                animate={{ scale: hover === i ? 1.05 : 1, x: hover === i ? 6 : 0 }}
              >
                <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: on ? c : "#8A96AC" }}>
                  {label}
                </span>
                <div className="absolute inset-y-2 left-2 w-1.5 rounded-sm opacity-40" style={{ background: c }} />
                <div className="absolute inset-y-2 right-2 w-1.5 rounded-sm opacity-40" style={{ background: c }} />
              </motion.div>
            );
          })}
        </div>
        <div className="pointer-events-none absolute bottom-2 h-24 w-56 rounded-full bg-info/10 blur-2xl" />
      </motion.div>
    </MouseGlow>
  );
}

/** CMBS / bond waterfall cascade as 3D trays */
export function Waterfall3D({
  tranches,
  title = "CMBS Waterfall",
  className = "",
}: {
  tranches?: { name: string; color: string; support: number }[];
  title?: string;
  className?: string;
}) {
  const defaults = [
    { name: "AAA", color: "#6FA891", support: 30 },
    { name: "AA", color: "#8FBCAE", support: 22 },
    { name: "A", color: "#3B82F6", support: 15 },
    { name: "BBB-", color: "#8B5CF6", support: 8 },
    { name: "B-piece", color: "#F5B301", support: 0 },
  ];
  const t = tranches ?? defaults;
  const [loss, setLoss] = useState(0);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <MouseGlow className={`rounded-2xl border border-line/80 bg-surface/80 p-4 ${className}`}>
      <div className="mb-3 text-[11px] font-medium uppercase tracking-wider text-ink-faint">{title}</div>
      <label className="mb-4 block">
        <div className="mb-1 flex justify-between text-xs text-ink-muted">
          <span>Pool loss</span>
          <span className="font-mono text-danger">{loss}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={40}
          value={loss}
          onChange={(e) => setLoss(parseInt(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-raised accent-danger"
        />
      </label>
      <div className="space-y-2" style={{ perspective: 800 }}>
        {t.map((tr, i) => {
          // Losses hit bottom-up: B-piece first
          const reverseIndex = t.length - 1 - i;
          const thickness = Math.max(12, 100 - tr.support * 2);
          // simplified hit: if loss exceeds cumulative support from bottom
          const bottomSupport = t.slice(i + 1).reduce((s, x) => s + Math.max(2, (100 - x.support) / t.length), 0);
          const hit = loss > bottomSupport * 0.4;
          const wiped = loss > bottomSupport * 0.4 + thickness * 0.15;
          return (
            <motion.div
              key={tr.name}
              onMouseEnter={() => setHover(tr.name)}
              onMouseLeave={() => setHover(null)}
              className="relative flex h-12 items-center justify-between rounded-xl border px-4"
              style={{
                borderColor: wiped ? "#EF4444" : tr.color,
                background: wiped ? "rgba(239,68,68,0.12)" : `${tr.color}14`,
                transform: `translateZ(${(t.length - i) * 8}px) rotateX(${hover === tr.name ? 0 : 6}deg)`,
                opacity: wiped ? 0.55 : 1,
              }}
              animate={{ x: hit && !wiped ? [0, 2, -2, 0] : 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full" style={{ background: wiped ? "#EF4444" : tr.color }} />
                <span className="text-sm font-bold text-ink">{tr.name}</span>
              </div>
              <div className="text-xs text-ink-muted">
                {wiped ? "WIPED" : hit ? "IMPAIRED" : `${tr.support}% CE`}
              </div>
            </motion.div>
          );
        })}
      </div>
    </MouseGlow>
  );
}

/** Rank tower for dashboard / profile */
export function RankTower3D({
  level,
  rank,
  className = "",
}: {
  level: number;
  rank: string;
  className?: string;
}) {
  const ranks = [
    "Prospect",
    "Summer Intern",
    "Analyst",
    "Senior Analyst",
    "Associate",
    "Senior Associate",
    "VP",
    "Senior VP",
    "Director",
    "Managing Director",
    "Partner",
    "Rainmaker",
  ];
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [6, -6]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  return (
    <div className={`rounded-2xl border border-line/80 bg-surface/80 p-4 ${className}`}>
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-ink-faint">Rank ladder</div>
      <motion.div
        className="relative mx-auto flex h-[280px] flex-col-reverse items-center justify-start gap-1 overflow-hidden py-2"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left - r.width / 2);
          y.set(e.clientY - r.top - r.height / 2);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        {ranks.map((r, i) => {
          const unlocked = i + 1 <= level;
          const current = i + 1 === level;
          const prestige = i + 1 >= 10;
          const color = prestige ? "#F5B301" : unlocked ? "#C79A3A" : "#33404F";
          return (
            <motion.div
              key={r}
              className="flex w-full max-w-[200px] items-center justify-between rounded-lg border px-2 py-1.5 text-[10px]"
              style={{
                borderColor: current ? color : `${color}55`,
                background: unlocked ? `${color}18` : "transparent",
                boxShadow: current ? `0 0 16px ${color}40` : undefined,
              }}
              animate={{ scale: current ? 1.06 : 1, opacity: unlocked ? 1 : 0.35 }}
            >
              <span className="font-bold" style={{ color }}>
                L{i + 1}
              </span>
              <span className={unlocked ? "text-ink" : "text-ink-faint"}>{r}</span>
            </motion.div>
          );
        })}
      </motion.div>
      <div className="mt-2 text-center text-sm font-bold text-brand">{rank}</div>
    </div>
  );
}

/** Pick a contextual 3D scene from chapter/module codes or keywords */
export function ContextualScene3D({
  code,
  title,
  className = "",
}: {
  code: string;
  title?: string;
  className?: string;
}) {
  const c = code.toUpperCase();
  if (c.includes("CMBS") || c.includes("T4") || c.includes("WATERFALL") || c.includes("M4.1")) {
    return <Waterfall3D title={title ?? "Securitization Waterfall"} className={className} />;
  }
  if (c.includes("STACK") || c.includes("T2") || c.includes("DEBT") || c.includes("M2.1") || c.includes("T2.M1")) {
    return <CapitalStack3D title={title ?? "Deal Capital Stack"} className={className} />;
  }
  if (c.includes("HF") || c.includes("ACCOUNT") || c.includes("IB") || c.includes("LBO")) {
    return (
      <Building3D
        title={title ?? "Statement Floors"}
        labels={["Revenue", "EBITDA", "Interest", "Taxes", "Net Income"]}
        activeFloor={4}
        className={className}
      />
    );
  }
  if (c.includes("T3") || c.includes("AGENCY") || c.includes("DUS") || c.includes("GSE")) {
    return (
      <Building3D
        title={title ?? "Agency Loan Lifecycle"}
        labels={["Origination", "Underwrite", "Closing", "Servicing", "Payoff / REO"]}
        activeFloor={3}
        className={className}
      />
    );
  }
  return <Building3D title={title ?? "CRE Deal Building"} activeFloor={3} className={className} />;
}
