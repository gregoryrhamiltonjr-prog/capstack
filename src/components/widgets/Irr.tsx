"use client";
import { useState } from "react";
import { Slider, Stat, WidgetShell } from "./controls";
import { fmtMoney } from "@/lib/util";
import { annualDebtService, amortSchedule, irr } from "@/lib/finance";

export default function Irr({
  equity = 12000000,
  hold = 5,
  exitCap = 5.5,
  rentGrowth = 3,
  noi = 2400000,
  loan = 27300000,
  rate = 5.8,
}: {
  equity?: number;
  hold?: number;
  exitCap?: number;
  rentGrowth?: number;
  noi?: number;
  loan?: number;
  rate?: number;
}) {
  const [h, setH] = useState(hold);
  const [ec, setEc] = useState(exitCap);
  const [g, setG] = useState(rentGrowth);

  const amortYears = 30;
  const ds = annualDebtService(loan, rate, amortYears);
  const sched = amortSchedule(loan, rate, amortYears, 0);

  // Build annual levered cash flows
  const flows: number[] = [-equity];
  let year1NoiGrown = noi;
  for (let y = 1; y <= h; y++) {
    const noiY = noi * Math.pow(1 + g / 100, y - 1);
    if (y === 1) year1NoiGrown = noiY;
    const cashFlow = noiY - ds;
    if (y < h) {
      flows.push(cashFlow);
    } else {
      // exit year: cash flow + net sale proceeds
      const exitNoi = noi * Math.pow(1 + g / 100, y); // forward NOI at sale
      const grossValue = exitNoi / (ec / 100);
      const saleCosts = grossValue * 0.02;
      const balAtExit = sched[Math.min(sched.length - 1, y * 12 - 1)].balance;
      const netProceeds = grossValue - saleCosts - balAtExit;
      flows.push(cashFlow + netProceeds);
    }
  }

  const totalReturned = flows.slice(1).reduce((a, x) => a + x, 0);
  const em = (totalReturned + 0) / equity; // multiple = distributions / equity
  const dealIrr = irr(flows);
  const coc = (year1NoiGrown - ds) / equity;

  return (
    <WidgetShell title="IRR & equity-multiple playground">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <Slider label="Hold period" value={h} min={2} max={10} step={1} onChange={setH} format={(v) => v + " yrs"} />
          <Slider label="Exit cap rate" value={ec} min={4} max={8} step={0.05} onChange={setEc} format={(v) => v.toFixed(2) + "%"} />
          <Slider label="Annual rent/NOI growth" value={g} min={-2} max={8} step={0.25} onChange={setG} format={(v) => v.toFixed(2) + "%"} />
          <p className="text-xs leading-5 text-ink-faint">Equity {fmtMoney(equity)} · loan {fmtMoney(loan)} @ {rate}% · going-in NOI {fmtMoney(noi)}. Push the exit cap up 25 bps and watch a year of rent growth vanish.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 self-start">
          <Stat label="Levered IRR" value={dealIrr === null ? "n/a" : (dealIrr * 100).toFixed(1) + "%"} tone={dealIrr && dealIrr > 0.12 ? "brand" : "danger"} />
          <Stat label="Equity multiple" value={em.toFixed(2) + "×"} tone="gold" />
          <Stat label="Yr-1 cash-on-cash" value={(coc * 100).toFixed(1) + "%"} />
          <Stat label="Total returned" value={fmtMoney(totalReturned)} />
        </div>
      </div>
    </WidgetShell>
  );
}
