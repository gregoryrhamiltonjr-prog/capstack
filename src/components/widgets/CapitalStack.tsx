"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Slider, Stat, WidgetShell } from "./controls";
import { fmtMoney } from "@/lib/util";

export default function CapitalStack({ totalValue = 50000000 }: { totalValue?: number }) {
  const [seniorPct, setSeniorPct] = useState(65);
  const [mezzPct, setMezzPct] = useState(15);
  const [seniorCost, setSeniorCost] = useState(6.0);
  const [mezzCost, setMezzCost] = useState(11.0);
  const [equityCost, setEquityCost] = useState(15.0);
  const [hovered, setHovered] = useState<string | null>(null);

  const equityPct = Math.max(0, 100 - seniorPct - mezzPct);
  const blended = (seniorPct * seniorCost + mezzPct * mezzCost + equityPct * equityCost) / 100;

  const layers = [
    { id: "eq", name: "Common equity", pct: equityPct, cost: equityCost, color: "#F5B301", note: "last paid · first loss" },
    { id: "mezz", name: "Mezzanine", pct: mezzPct, cost: mezzCost, color: "#8B5CF6", note: "equity pledge" },
    { id: "sr", name: "Senior debt", pct: seniorPct, cost: seniorCost, color: "#39FF14", note: "first lien · first paid" },
  ];

  return (
    <WidgetShell title="Capital-stack builder">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <Slider label="Senior debt share" value={seniorPct} min={0} max={85} step={1} onChange={setSeniorPct} format={(v) => v + "%"} />
          <Slider label="Mezzanine share" value={mezzPct} min={0} max={35} step={1} onChange={setMezzPct} format={(v) => v + "%"} />
          <div className="grid grid-cols-3 gap-2">
            <Slider label="Sr cost" value={seniorCost} min={4} max={9} step={0.1} onChange={setSeniorCost} format={(v) => v.toFixed(1) + "%"} />
            <Slider label="Mezz cost" value={mezzCost} min={8} max={16} step={0.1} onChange={setMezzCost} format={(v) => v.toFixed(1) + "%"} />
            <Slider label="Eq cost" value={equityCost} min={10} max={25} step={0.1} onChange={setEquityCost} format={(v) => v.toFixed(1) + "%"} />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Stat label="Blended cost of capital" value={blended.toFixed(2) + "%"} tone="brand" hint="deal must beat this" />
            <Stat label="Equity check" value={fmtMoney((equityPct / 100) * totalValue)} tone="gold" />
          </div>
        </div>

        <div className="flex min-h-[240px] flex-col justify-center gap-2 py-2">
          {layers.map((l) => {
            const isH = hovered === l.id;
            const muted = hovered !== null && !isH;
            const h = Math.max(44, l.pct * 1.8);
            return (
              <motion.div
                key={l.id}
                onMouseEnter={() => setHovered(l.id)}
                onMouseLeave={() => setHovered(null)}
                className="flex w-full cursor-default items-center justify-between rounded-xl border px-3"
                style={{
                  height: h,
                  borderColor: l.color,
                  background: `linear-gradient(90deg, ${l.color}22 0%, ${l.color}0a 100%)`,
                }}
                animate={{ opacity: muted ? 0.4 : 1, scale: isH ? 1.01 : 1 }}
                transition={{ type: "spring", stiffness: 360, damping: 28 }}
              >
                <div>
                  <div className="text-xs font-bold" style={{ color: l.color }}>
                    {l.name}
                  </div>
                  <div className="text-[10px] text-ink-faint">{l.note}</div>
                </div>
                <div className="text-right text-xs text-ink-muted tabnum">
                  <div className="font-semibold text-ink">
                    {l.pct.toFixed(0)}% · {l.cost.toFixed(1)}%
                  </div>
                  <div>{fmtMoney((l.pct / 100) * totalValue)}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </WidgetShell>
  );
}
