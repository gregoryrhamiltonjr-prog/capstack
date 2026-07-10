"use client";
import { useState } from "react";
import { Slider, WidgetShell } from "./controls";
import { fmtMoney } from "@/lib/util";
import { cn } from "@/lib/util";

type Tranche = { name: string; support: number };

export default function CmbsWaterfall({
  poolSize = 1000000000,
  tranches = [
    { name: "AAA", support: 30 },
    { name: "AA", support: 22 },
    { name: "A", support: 15 },
    { name: "BBB-", support: 8 },
    { name: "Unrated (B-piece)", support: 0 },
  ],
}: {
  poolSize?: number;
  tranches?: Tranche[];
}) {
  const [lossPct, setLossPct] = useState(6);
  const loss = (lossPct / 100) * poolSize;

  // Build tranche bands from support levels (bottom-up). Band size = support[i-1] - support[i] going down.
  const sorted = [...tranches].sort((a, b) => b.support - a.support); // AAA first
  // thickness: for AAA (top, support 30) → occupies from 30% to 100% = 70% thick.
  const bands = sorted.map((t, i) => {
    const top = i === 0 ? 100 : sorted[i - 1].support;
    const bottom = t.support;
    return { ...t, thickness: top - bottom, bottom };
  });

  // Losses fill from the bottom (0%) upward. A tranche occupying [bottom, bottom+thickness] of value.
  let remaining = loss;
  const lossPctOfPool = lossPct;
  const withLoss = [...bands].reverse().map((b) => {
    // this band covers value from b.bottom% to (b.bottom+thickness)%
    const bandSizeDollars = (b.thickness / 100) * poolSize;
    const absorbed = Math.min(remaining, bandSizeDollars);
    remaining -= absorbed;
    const impaired = absorbed > 0;
    const wipedOut = absorbed >= bandSizeDollars - 1;
    return { ...b, absorbed, bandSizeDollars, impaired, wipedOut };
  });
  // reverse back to top-first for display
  const display = [...withLoss].reverse();

  return (
    <WidgetShell title="CMBS waterfall stepper">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3 self-start">
          <Slider label="Pool loss" value={lossPct} min={0} max={40} step={0.5} onChange={setLossPct} format={(v) => v + "% (" + fmtMoney((v / 100) * poolSize) + ")"} />
          <p className="text-xs leading-5 text-ink-faint">
            Losses apply <strong className="text-ink">reverse-sequential</strong> — bottom-up. Watch the B-piece absorb first; investment-grade bonds only take losses once everything below is wiped out.
          </p>
          <div className="rounded-xl border border-line bg-canvas px-3 py-2">
            <div className="text-[11px] uppercase tracking-wide text-ink-faint">Total pool loss</div>
            <div className="text-lg font-bold text-danger tabnum">
              {fmtMoney(loss)} · {lossPctOfPool}%
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          {display.map((b) => (
            <div
              key={b.name}
              className={cn(
                "flex items-center justify-between rounded-lg border px-3 py-2 text-xs transition-colors",
                b.wipedOut ? "border-danger/50 bg-danger/15" : b.impaired ? "border-warn/50 bg-warn/10" : "border-brand/25 bg-brand/5"
              )}
            >
              <div>
                <span className="font-semibold text-ink">{b.name}</span>
                <span className="ml-2 text-ink-faint">{b.support}% CS · {fmtMoney(b.bandSizeDollars)}</span>
              </div>
              <span className={cn("font-semibold tabnum", b.wipedOut ? "text-danger" : b.impaired ? "text-warn" : "text-brand-bright")}>
                {b.wipedOut ? "WIPED OUT" : b.impaired ? `−${fmtMoney(b.absorbed)}` : "intact"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </WidgetShell>
  );
}
