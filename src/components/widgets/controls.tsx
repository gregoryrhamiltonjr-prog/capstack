"use client";
import { cn } from "@/lib/util";

export function Slider({ label, value, min, max, step = 1, onChange, format }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; format?: (v: number) => string }) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-ink-muted">{label}</span>
        <span className="font-semibold text-brand-bright tabnum">{format ? format(value) : value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-overlay accent-brand"
        aria-label={label}
      />
    </label>
  );
}

export function Stat({ label, value, tone = "default", hint }: { label: string; value: string; tone?: "default" | "brand" | "gold" | "danger"; hint?: string }) {
  return (
    <div className="rounded-xl border border-line bg-canvas px-3 py-2.5">
      <div className="text-[11px] uppercase tracking-wide text-ink-faint">{label}</div>
      <div
        className={cn(
          "mt-0.5 text-lg font-bold tabnum",
          tone === "brand" && "text-brand-bright",
          tone === "gold" && "text-gold-soft",
          tone === "danger" && "text-danger",
          tone === "default" && "text-ink"
        )}
      >
        {value}
      </div>
      {hint && <div className="mt-0.5 text-[11px] text-ink-faint">{hint}</div>}
    </div>
  );
}

export function WidgetShell({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-2xl border border-brand/20 bg-surface-raised p-4 shadow-[0_0_0_1px_rgba(16,185,129,0.05)]">
      {title && (
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
          Interactive · {title}
        </div>
      )}
      {children}
    </div>
  );
}
