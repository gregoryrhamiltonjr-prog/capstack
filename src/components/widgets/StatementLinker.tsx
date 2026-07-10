"use client";
import { WidgetShell } from "./controls";

// The "$10 of depreciation" three-statement walk-through. Not one of the six interactive
// widgets, so per CapStack policy it renders as a correct, static worked model.
export default function StatementLinker({ depreciation = 10, taxRate = 35 }: { depreciation?: number; taxRate?: number }) {
  const d = depreciation;
  const tax = d * (taxRate / 100);
  const ni = -(d - tax);
  const cash = ni + d;
  const rows: { label: string; is?: string; cfs?: string; bs?: string }[] = [
    { label: "Pre-tax income", is: `−$${d.toFixed(2)}` },
    { label: `Taxes (@ ${taxRate}%)`, is: `+$${tax.toFixed(2)}` },
    { label: "Net income", is: `−$${(d - tax).toFixed(2)}`, cfs: `−$${(d - tax).toFixed(2)}` },
    { label: "Add back: D&A (non-cash)", cfs: `+$${d.toFixed(2)}` },
    { label: "Change in cash", cfs: `+$${cash.toFixed(2)}` },
    { label: "PP&E", bs: `−$${d.toFixed(2)}` },
    { label: "Cash", bs: `+$${cash.toFixed(2)}` },
    { label: "Retained earnings", bs: `−$${(d - tax).toFixed(2)}` },
  ];
  return (
    <WidgetShell title="The $10 depreciation walk-through (static model)">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-ink-faint">
              <th className="py-1.5 pr-3 font-semibold">Line</th>
              <th className="py-1.5 pr-3 font-semibold">Income statement</th>
              <th className="py-1.5 pr-3 font-semibold">Cash flow</th>
              <th className="py-1.5 font-semibold">Balance sheet</th>
            </tr>
          </thead>
          <tbody className="tabnum">
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-line/60">
                <td className="py-1.5 pr-3 text-ink-muted">{r.label}</td>
                <td className="py-1.5 pr-3 text-ink">{r.is ?? ""}</td>
                <td className="py-1.5 pr-3 text-brand-bright">{r.cfs ?? ""}</td>
                <td className="py-1.5 text-gold-soft">{r.bs ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs leading-5 text-ink-faint">
        Assets change −${(d - tax).toFixed(2)} (PP&E −${d.toFixed(2)}, cash +${cash.toFixed(2)}); equity changes −${(d - tax).toFixed(2)}. Assets = Liabilities + Equity still holds. The +${cash.toFixed(2)} is the depreciation tax shield.
      </p>
    </WidgetShell>
  );
}
