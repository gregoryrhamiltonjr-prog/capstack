"use client";
import CapRate from "./CapRate";
import Dscr from "./Dscr";
import CapitalStack from "./CapitalStack";
import Amortization from "./Amortization";
import CmbsWaterfall from "./CmbsWaterfall";
import Irr from "./Irr";
import StatementLinker from "./StatementLinker";

const REGISTRY: Record<string, React.ComponentType<any>> = {
  "cap-rate": CapRate,
  dscr: Dscr,
  "capital-stack": CapitalStack,
  amortization: Amortization,
  "cmbs-waterfall": CmbsWaterfall,
  irr: Irr,
  "statement-linker": StatementLinker,
};

export function LessonWidget({ name, props }: { name: string; props?: Record<string, unknown> }) {
  const Comp = REGISTRY[name];
  if (!Comp) {
    return (
      <div className="my-4 rounded-xl border border-line bg-surface-raised p-4 text-sm text-ink-muted">
        <span className="font-semibold text-ink">{name}</span> — worked example.
      </div>
    );
  }
  return <Comp {...(props ?? {})} />;
}
