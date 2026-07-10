"use client";
import { useState } from "react";
import { Slider, Stat, WidgetShell } from "./controls";
import { fmtMoney } from "@/lib/util";
import { annualDebtService, loanConstant } from "@/lib/finance";

export default function Dscr({ noi = 2400000, rate = 5.8, amortYears = 30, value = 40000000 }: { noi?: number; rate?: number; amortYears?: number; value?: number }) {
  const [n, setN] = useState(noi);
  const [r, setR] = useState(rate);
  const [v, setV] = useState(value);
  const maxLtv = 0.75;
  const minDscr = 1.25;
  const minDy = 0.08;

  const k = loanConstant(r, amortYears);
  const ltvLoan = maxLtv * v;
  const dscrLoan = n / minDscr / k;
  const dyLoan = n / minDy;
  const sized = Math.min(ltvLoan, dscrLoan, dyLoan);
  const binding = sized === dscrLoan ? "DSCR" : sized === ltvLoan ? "LTV" : "Debt yield";

  const ds = annualDebtService(sized, r, amortYears);
  const dscr = n / ds;
  const dy = n / sized;
  const ltv = sized / v;

  return (
    <WidgetShell title="DSCR & loan sizing">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3.5">
          <Slider label="Net cash flow (NCF)" value={n} min={800000} max={5000000} step={20000} onChange={setN} format={fmtMoney} />
          <Slider label="Coupon" value={r} min={3} max={9} step={0.05} onChange={setR} format={(x) => x.toFixed(2) + "%"} />
          <Slider label="Value" value={v} min={10000000} max={90000000} step={500000} onChange={setV} format={fmtMoney} />
          <p className="text-xs leading-5 text-ink-faint">Constraints: 75% LTV · 1.25× DSCR · 8% debt yield. The lender lends the smallest.</p>
        </div>
        <div className="space-y-2 self-start">
          <div className="grid grid-cols-3 gap-2">
            <Stat label="LTV test" value={fmtMoney(ltvLoan)} tone={binding === "LTV" ? "brand" : "default"} />
            <Stat label="DSCR test" value={fmtMoney(dscrLoan)} tone={binding === "DSCR" ? "brand" : "default"} />
            <Stat label="Debt-yield test" value={fmtMoney(dyLoan)} tone={binding === "Debt yield" ? "brand" : "default"} />
          </div>
          <div className="rounded-xl border border-brand/30 bg-brand/10 px-3 py-2.5">
            <div className="text-[11px] uppercase tracking-wide text-brand">Loan sized to {binding}</div>
            <div className="text-2xl font-bold text-brand-bright tabnum">{fmtMoney(sized)}</div>
            <div className="mt-1 flex gap-4 text-xs text-ink-muted tabnum">
              <span>{(ltv * 100).toFixed(1)}% LTV</span>
              <span>{dscr.toFixed(2)}× DSCR</span>
              <span>{(dy * 100).toFixed(2)}% DY</span>
            </div>
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}
