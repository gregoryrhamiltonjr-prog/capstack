"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type PollProps = {
  id: string;
  question: string;
  options: string[];
  /** optional seed counts so bars feel alive before user votes */
  seed?: number[];
};

export function Poll({ id, question, options, seed }: PollProps) {
  const storageKey = `capstack-poll-${id}`;
  const [voted, setVoted] = useState<number | null>(null);
  const [counts, setCounts] = useState<number[]>(() => seed ?? options.map((_, i) => 12 + ((i * 7) % 18)));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { vote: number; counts: number[] };
      if (typeof parsed.vote === "number" && Array.isArray(parsed.counts)) {
        setVoted(parsed.vote);
        setCounts(parsed.counts);
      }
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  const total = useMemo(() => counts.reduce((a, b) => a + b, 0) || 1, [counts]);

  function vote(i: number) {
    if (voted !== null) return;
    const next = counts.map((c, idx) => (idx === i ? c + 1 : c));
    setCounts(next);
    setVoted(i);
    try {
      localStorage.setItem(storageKey, JSON.stringify({ vote: i, counts: next }));
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="my-5 rounded-xl border border-line/80 bg-surface/60 p-4">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-ink-faint">Quick check</div>
      <h4 className="mb-3 text-sm font-semibold text-ink">{question}</h4>
      <div className="space-y-2.5">
        {options.map((opt, i) => {
          const pct = Math.round((counts[i] / total) * 100);
          const selected = voted === i;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => vote(i)}
              disabled={voted !== null}
              className={`relative w-full overflow-hidden rounded-xl border px-3.5 py-3 text-left transition-colors ${
                selected
                  ? "border-brand/50 bg-brand/10"
                  : voted !== null
                    ? "border-line bg-surface-raised"
                    : "border-line bg-canvas hover:border-info/40"
              }`}
            >
              {voted !== null && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-info/15"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              )}
              <div className="relative z-10 flex items-center justify-between gap-3">
                <span className={`text-sm ${selected ? "font-bold text-brand-bright" : "text-ink"}`}>{opt}</span>
                {voted !== null && <span className="font-mono text-xs font-bold text-ink-muted">{pct}%</span>}
              </div>
            </button>
          );
        })}
      </div>
      {voted !== null && (
        <p className="mt-2 text-[11px] text-ink-faint">{total.toLocaleString()} responses</p>
      )}
    </div>
  );
}
