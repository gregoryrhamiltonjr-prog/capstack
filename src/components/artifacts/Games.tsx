"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fmtMoney } from "@/lib/util";

/** Cap-rate snap: guess the value given NOI + cap */
export function CapRateGuessGame() {
  const round = useMemo(() => {
    const noi = 1_200_000 + Math.floor(Math.random() * 8) * 150_000;
    const cap = 4.5 + Math.floor(Math.random() * 8) * 0.25;
    const value = Math.round(noi / (cap / 100));
    return { noi, cap, value };
  }, []);

  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"idle" | "win" | "close" | "miss">("idle");
  const [revealed, setRevealed] = useState(false);

  function check() {
    const g = parseFloat(guess.replace(/[^0-9.]/g, ""));
    if (!g) return;
    const err = Math.abs(g - round.value) / round.value;
    setRevealed(true);
    if (err < 0.02) setResult("win");
    else if (err < 0.08) setResult("close");
    else setResult("miss");
  }

  return (
    <div className="my-5 rounded-xl border border-line/80 bg-surface/60 p-4">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-ink-faint">Practice · Cap rate</div>
      <p className="mb-4 text-sm text-ink-muted">
        NOI is <span className="font-mono font-bold text-ink">{fmtMoney(round.noi)}</span> and the market cap is{" "}
        <span className="font-mono font-bold text-brand">{round.cap.toFixed(2)}%</span>. What&apos;s the value?
      </p>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          inputMode="numeric"
          placeholder="e.g. 24000000"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="input max-w-xs"
          disabled={revealed}
        />
        <button type="button" className="btn-primary" onClick={check} disabled={revealed}>
          Lock it in
        </button>
      </div>
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 rounded-xl border p-3 text-sm ${
              result === "win"
                ? "border-brand/40 bg-brand/10 text-brand-bright"
                : result === "close"
                  ? "border-gold/40 bg-gold/10 text-gold-soft"
                  : "border-danger/30 bg-danger/10 text-danger"
            }`}
          >
            {result === "win" && "Bullseye. Value = NOI ÷ cap rate."}
            {result === "close" && "Close — desk would accept that underwriting band."}
            {result === "miss" && "Miss. Remember: Value = NOI ÷ cap."}
            <div className="mt-1 font-mono text-ink">
              Answer: {fmtMoney(round.value)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Match the stack layer to its risk profile */
export function StackMatchGame() {
  const pairs = [
    { layer: "Senior Debt", risk: "Lowest risk · first paid" },
    { layer: "Mezzanine", risk: "Medium · equity pledge" },
    { layer: "Preferred Equity", risk: "Med-high · preferred return" },
    { layer: "Common Equity", risk: "Highest risk · residual" },
  ];
  const [shuffled] = useState(() => [...pairs.map((p) => p.risk)].sort(() => Math.random() - 0.5));
  const [pickedLayer, setPickedLayer] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, boolean>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const done = Object.keys(matched).length === pairs.length;

  function pickRisk(risk: string) {
    if (!pickedLayer || matched[pickedLayer]) return;
    const correct = pairs.find((p) => p.layer === pickedLayer)?.risk === risk;
    if (correct) {
      setMatched((m) => ({ ...m, [pickedLayer]: true }));
      setPickedLayer(null);
      setWrong(null);
    } else {
      setWrong(risk);
      setTimeout(() => setWrong(null), 500);
    }
  }

  return (
    <div className="my-5 rounded-xl border border-line/80 bg-surface/60 p-4">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-ink-faint">Practice · Stack match</div>
      <p className="mb-4 text-sm text-ink-muted">Tap a capital-stack layer, then match its risk profile.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          {pairs.map((p) => (
            <button
              key={p.layer}
              type="button"
              disabled={!!matched[p.layer]}
              onClick={() => setPickedLayer(p.layer)}
              className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                matched[p.layer]
                  ? "border-brand/40 bg-brand/10 text-brand-bright"
                  : pickedLayer === p.layer
                    ? "border-gold/50 bg-gold/10 text-gold-soft"
                    : "border-line bg-canvas text-ink hover:border-line-strong"
              }`}
            >
              {p.layer}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {shuffled.map((risk) => (
            <button
              key={risk}
              type="button"
              onClick={() => pickRisk(risk)}
              className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                wrong === risk
                  ? "border-danger bg-danger/15 text-danger"
                  : Object.values(matched).length && pairs.find((p) => p.risk === risk && matched[p.layer])
                    ? "border-brand/30 bg-brand/5 text-ink-muted"
                    : "border-line bg-canvas text-ink-muted hover:border-info/40 hover:text-ink"
              }`}
            >
              {risk}
            </button>
          ))}
        </div>
      </div>
      {done && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-xl border border-brand/30 bg-brand/10 p-3 text-sm font-bold text-brand-bright">
          Stack locked. You read risk like a credit committee.
        </motion.div>
      )}
    </div>
  );
}

/** Quick-fire DSCR: is the loan sized OK? */
export function DscrQuickfireGame() {
  const deal = useMemo(() => {
    const noi = 2_000_000 + Math.floor(Math.random() * 5) * 200_000;
    const dscrReq = 1.25;
    const rate = 0.055 + Math.floor(Math.random() * 4) * 0.005;
    // annual debt service if fully amortizing-ish: approx interest-only for simplicity in game
    const maxLoan = Math.floor(noi / dscrReq / rate);
    const proposed = Math.floor(maxLoan * (0.85 + Math.random() * 0.35));
    const actualDscr = noi / (proposed * rate);
    const ok = actualDscr >= dscrReq - 0.001;
    return { noi, dscrReq, rate, proposed, actualDscr, ok };
  }, []);

  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  return (
    <div className="my-5 rounded-xl border border-line/80 bg-surface/60 p-4">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-ink-faint">Practice · DSCR</div>
      <p className="mb-3 text-sm text-ink-muted">
        NOI <span className="font-mono text-ink">{fmtMoney(deal.noi)}</span> · rate{" "}
        <span className="font-mono text-ink">{(deal.rate * 100).toFixed(1)}%</span> (IO) · proposed loan{" "}
        <span className="font-mono text-ink">{fmtMoney(deal.proposed)}</span>. Lender needs {deal.dscrReq.toFixed(2)}x DSCR.
      </p>
      <p className="mb-4 text-sm font-semibold text-ink">Does this loan clear the DSCR test?</p>
      <div className="flex gap-2">
        <button
          type="button"
          className="btn-primary flex-1"
          disabled={answer !== null}
          onClick={() => setAnswer("yes")}
        >
          Clears
        </button>
        <button
          type="button"
          className="btn-ghost flex-1"
          disabled={answer !== null}
          onClick={() => setAnswer("no")}
        >
          Fails
        </button>
      </div>
      {answer && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 rounded-xl border p-3 text-sm ${
            (answer === "yes") === deal.ok ? "border-brand/40 bg-brand/10 text-brand-bright" : "border-danger/30 bg-danger/10 text-danger"
          }`}
        >
          {(answer === "yes") === deal.ok ? "Correct." : "Not quite."} Actual DSCR ≈{" "}
          <span className="font-mono font-bold">{deal.actualDscr.toFixed(2)}x</span> —{" "}
          {deal.ok ? "clears" : "fails"} the {deal.dscrReq.toFixed(2)}x gate.
        </motion.div>
      )}
    </div>
  );
}

/** Registry for content-driven game blocks */
export function LessonGame({ name }: { name: string }) {
  switch (name) {
    case "cap-rate-guess":
      return <CapRateGuessGame />;
    case "stack-match":
      return <StackMatchGame />;
    case "dscr-quickfire":
      return <DscrQuickfireGame />;
    default:
      return <CapRateGuessGame />;
  }
}
