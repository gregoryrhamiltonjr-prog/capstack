"use client";
import { useState } from "react";
import { Slider, Stat, WidgetShell } from "./controls";
import { fmtMoney, fmtNum } from "@/lib/util";

export default function CapRate({ noi = 1844364, capRate = 5.25, units = 200 }: { noi?: number; capRate?: number; units?: number }) {
  const [n, setN] = useState(noi);
  const [c, setC] = useState(capRate);
  const value = n / (c / 100);
  const perUnit = value / units;
  return (
    <WidgetShell title="Cap-rate sensitivity">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-4">
          <Slider label="Net Operating Income" value={n} min={500000} max={5000000} step={10000} onChange={setN} format={(v) => fmtMoney(v)} />
          <Slider label="Cap rate" value={c} min={3.5} max={9} step={0.05} onChange={setC} format={(v) => v.toFixed(2) + "%"} />
          <p className="text-xs leading-5 text-ink-faint">
            Value = NOI ÷ cap rate. Notice how much harder value swings at low cap rates — 25 bps is worth far more at a 4-cap than an 8-cap.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 self-start">
          <Stat label="Value" value={fmtMoney(value)} tone="brand" />
          <Stat label="Implied multiple" value={(1 / (c / 100)).toFixed(1) + "×"} />
          <Stat label="Price / unit" value={"$" + fmtNum(perUnit)} />
          <Stat label="+25 bps → value" value={fmtMoney(n / ((c + 0.25) / 100))} hint={"= " + fmtMoney(n / ((c + 0.25) / 100) - value) + " vs. now"} tone="danger" />
        </div>
      </div>
    </WidgetShell>
  );
}
