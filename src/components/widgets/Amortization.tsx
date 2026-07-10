"use client";
import { useState } from "react";
import { Slider, Stat, WidgetShell } from "./controls";
import { fmtMoney } from "@/lib/util";
import { amortSchedule, annualDebtService } from "@/lib/finance";

export default function Amortization({ loan = 27300000, rate = 5.8, amortYears = 30, ioMonths = 0 }: { loan?: number; rate?: number; amortYears?: number; ioMonths?: number }) {
  const [L, setL] = useState(loan);
  const [r, setR] = useState(rate);
  const [io, setIo] = useState(ioMonths);

  const sched = amortSchedule(L, r, amortYears, io);
  const ds = annualDebtService(L, r, amortYears);
  const yearEnds = sched.filter((row) => row.month % 12 === 0);
  const totalInterest = sched.reduce((a, x) => a + x.interest, 0);

  // sparkline of balance over the term
  const w = 320;
  const h = 90;
  const maxBal = L;
  const pts = yearEnds
    .map((row, i) => {
      const x = (i / (yearEnds.length - 1)) * w;
      const y = h - (row.balance / maxBal) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  // first-year principal vs interest split
  const y1 = sched.slice(0, 12);
  const y1Int = y1.reduce((a, x) => a + x.interest, 0);
  const y1Prin = y1.reduce((a, x) => a + x.principal, 0);
  const y1Total = y1Int + y1Prin || 1;

  return (
    <WidgetShell title="Amortization visualizer">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <Slider label="Loan amount" value={L} min={5000000} max={60000000} step={500000} onChange={setL} format={fmtMoney} />
          <Slider label="Coupon" value={r} min={3} max={9} step={0.05} onChange={setR} format={(v) => v.toFixed(2) + "%"} />
          <Slider label="Interest-only months" value={io} min={0} max={120} step={12} onChange={setIo} format={(v) => v + " mo"} />
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Annual debt service" value={fmtMoney(ds)} />
            <Stat label="Total interest (life)" value={fmtMoney(totalInterest)} tone="danger" />
          </div>
        </div>
        <div className="space-y-3 self-start">
          <div>
            <div className="mb-1 text-[11px] uppercase tracking-wide text-ink-faint">Balance over {amortYears} yrs</div>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
              <polyline points={`0,${h} ${pts} ${w},${h}`} fill="rgba(199,154,58,0.10)" stroke="none" />
              <polyline points={pts} fill="none" stroke="#10B981" strokeWidth={2} />
            </svg>
          </div>
          <div>
            <div className="mb-1 text-[11px] uppercase tracking-wide text-ink-faint">Year-1 payment split</div>
            <div className="flex h-6 overflow-hidden rounded-lg border border-line text-[10px] font-semibold">
              <div className="flex items-center justify-center bg-danger/30 text-danger" style={{ width: `${(y1Int / y1Total) * 100}%` }}>
                Interest {Math.round((y1Int / y1Total) * 100)}%
              </div>
              <div className="flex items-center justify-center bg-brand/30 text-brand-bright" style={{ width: `${(y1Prin / y1Total) * 100}%` }}>
                {io >= 12 ? "IO — $0 principal" : `Principal ${Math.round((y1Prin / y1Total) * 100)}%`}
              </div>
            </div>
            <p className="mt-1.5 text-xs leading-5 text-ink-faint">Early payments are mostly interest. An IO period pays zero principal — lowering the payment and raising DSCR.</p>
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}
