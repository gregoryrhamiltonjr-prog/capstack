"use client";

import { useMemo, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitQuizResult } from "@/lib/actions";
import { parseJSON } from "@/lib/util";
import { MouseGlow, Magnetic } from "@/components/InteractiveWrappers";
import { Icon } from "@/components/ui";

export type QuizQ = {
  id: string;
  type: string;
  prompt: string;
  data: string;
  explanation: string;
  hints: string;
  points: number;
  orderIndex: number;
};

type AnswerState = {
  choice?: number;
  numeric?: string;
  order?: number[];
  hintTier: number;
  submitted: boolean;
  correct?: boolean;
};

export function ChapterQuiz({
  chapterId,
  chapterCode,
  questions,
  bestScorePct = 0,
}: {
  chapterId: string;
  chapterCode: string;
  questions: QuizQ[];
  bestScorePct?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [finished, setFinished] = useState(false);
  const [scorePct, setScorePct] = useState(0);
  const [xpNote, setXpNote] = useState("");
  const [pending, startTransition] = useTransition();

  const q = questions[idx];
  const a = q ? answers[q.id] ?? { hintTier: 0, submitted: false } : null;

  const progressPct = questions.length ? Math.round(((idx + (a?.submitted ? 1 : 0)) / questions.length) * 100) : 0;

  const data = useMemo(() => (q ? parseJSON(q.data, {} as Record<string, unknown>) : {}), [q]);
  const hints = useMemo(() => (q ? parseJSON(q.hints, [] as string[]) : []), [q]);

  function update(partial: Partial<AnswerState>) {
    if (!q) return;
    setAnswers((prev) => ({
      ...prev,
      [q.id]: { ...(prev[q.id] ?? { hintTier: 0, submitted: false }), ...partial },
    }));
  }

  function gradeCurrent(): boolean {
    if (!q) return false;
    const d = parseJSON(q.data, {} as Record<string, unknown>);
    const state = answers[q.id] ?? { hintTier: 0, submitted: false };

    if (q.type === "mc" || q.type === "scenario") {
      return state.choice === (d as { correct: number }).correct;
    }
    if (q.type === "numeric") {
      const num = parseFloat(String(state.numeric ?? "").replace(/[^0-9.-]/g, ""));
      const { answer, tolerance } = d as { answer: number; tolerance: number };
      return Number.isFinite(num) && Math.abs(num - answer) <= tolerance;
    }
    if (q.type === "ordering") {
      const items = (d as { items: string[] }).items;
      const order = state.order ?? items.map((_, i) => i);
      return order.every((v, i) => v === i);
    }
    return false;
  }

  function submitCurrent() {
    if (!q || a?.submitted) return;
    const correct = gradeCurrent();
    update({ submitted: true, correct });
  }

  function useHint() {
    if (!q || !a || a.submitted || a.hintTier >= 3) return;
    update({ hintTier: a.hintTier + 1 });
  }

  function next() {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
      return;
    }
    // finish
    const results = questions.map((qq) => {
      const st = answers[qq.id] ?? { hintTier: 0, submitted: false, correct: false };
      // re-grade if they somehow skipped
      let correct = !!st.correct;
      if (!st.submitted) {
        // treat unanswered as wrong
        correct = false;
      }
      return { questionId: qq.id, correct, hintTier: st.hintTier };
    });
    // ensure last question graded
    if (q && a && !a.submitted) {
      const c = gradeCurrent();
      results[idx] = { questionId: q.id, correct: c, hintTier: a.hintTier };
      update({ submitted: true, correct: c });
    }

    const correctCount = results.filter((r) => r.correct).length;
    const pct = Math.round((correctCount / Math.max(1, questions.length)) * 100);
    setScorePct(pct);
    setFinished(true);

    startTransition(async () => {
      await submitQuizResult({
        chapterId,
        servedIds: questions.map((qq) => qq.id),
        results,
      });
      setXpNote(pct >= 70 ? "Module passed · XP awarded on first pass." : "Need 70% to pass — retry anytime.");
    });
  }

  if (!questions.length) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 text-sm text-ink-muted">
        No graded quiz for this module yet.
      </div>
    );
  }

  if (finished) {
    const passed = scorePct >= 70;
    return (
      <MouseGlow className="rounded-2xl border border-line bg-surface p-8 text-center">
        <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 ${passed ? "border-brand bg-brand/15 text-brand" : "border-warn bg-warn/10 text-warn"}`}>
          <Icon name={passed ? "trophy" : "target"} size={32} />
        </div>
        <h3 className="text-2xl font-extrabold text-ink">{passed ? "Module cleared" : "Almost there"}</h3>
        <p className="mt-2 text-ink-muted">
          You scored <span className="font-mono font-bold text-ink">{scorePct}%</span>
          {bestScorePct > 0 && (
            <>
              {" "}
              · best ever <span className="font-mono">{Math.max(bestScorePct, scorePct)}%</span>
            </>
          )}
        </p>
        <p className="mt-1 text-sm text-ink-faint">{xpNote || (pending ? "Saving…" : "")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setFinished(false);
              setIdx(0);
              setAnswers({});
              setXpNote("");
            }}
          >
            Retry quiz
          </button>
          <a href="/map" className="btn-ghost">
            Back to map
          </a>
        </div>
      </MouseGlow>
    );
  }

  const d = data as {
    choices?: string[];
    correct?: number;
    answer?: number;
    tolerance?: number;
    unit?: string;
    prefix?: string;
    items?: string[];
    narrative?: string;
  };

  const order = a?.order ?? (d.items ? d.items.map((_, i) => i) : []);

  function moveOrder(from: number, dir: -1 | 1) {
    const to = from + dir;
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    [next[from], next[to]] = [next[to], next[from]];
    update({ order: next });
  }

  return (
    <div id="chapter-quiz" className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-ink-faint">Module quiz</div>
          <h3 className="text-lg font-bold text-ink">
            Question {idx + 1} of {questions.length}
          </h3>
        </div>
        <div className="text-right text-xs text-ink-muted">
          Pass at 70%
          <div className="mt-1 h-1.5 w-28 overflow-hidden rounded-full bg-surface-raised">
            <div className="h-full bg-brand transition-all" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>

      <MouseGlow className="rounded-2xl border border-line bg-surface p-6">
        {q.type === "scenario" && d.narrative && (
          <div className="mb-4 rounded-xl border border-line bg-canvas p-3 text-sm leading-6 text-ink-muted">{d.narrative}</div>
        )}
        <p className="text-base font-semibold leading-7 text-ink">{q.prompt}</p>

        <div className="mt-5 space-y-2">
          {(q.type === "mc" || q.type === "scenario") &&
            (d.choices ?? []).map((choice, i) => {
              const selected = a?.choice === i;
              const show = a?.submitted;
              const isCorrect = i === d.correct;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={a?.submitted}
                  onClick={() => update({ choice: i })}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    show && isCorrect
                      ? "border-brand/50 bg-brand/10 text-brand-bright"
                      : show && selected && !isCorrect
                        ? "border-danger/40 bg-danger/10 text-danger"
                        : selected
                          ? "border-info/50 bg-info/10 text-ink"
                          : "border-line bg-canvas text-ink-muted hover:border-line-strong hover:text-ink"
                  }`}
                >
                  <span className="mr-2 font-mono text-xs text-ink-faint">{String.fromCharCode(65 + i)}.</span>
                  {choice}
                </button>
              );
            })}

          {q.type === "numeric" && (
            <div className="flex flex-wrap items-center gap-2">
              {d.prefix && <span className="text-ink-muted">{d.prefix}</span>}
              <input
                type="text"
                inputMode="decimal"
                className="input max-w-xs"
                placeholder="Your answer"
                value={a?.numeric ?? ""}
                disabled={a?.submitted}
                onChange={(e) => update({ numeric: e.target.value })}
              />
              {d.unit && <span className="text-ink-muted">{d.unit}</span>}
            </div>
          )}

          {q.type === "ordering" && d.items && (
            <div className="space-y-2">
              {order.map((itemIdx, pos) => (
                <div key={`${itemIdx}-${pos}`} className="flex items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2">
                  <span className="w-6 font-mono text-xs text-ink-faint">{pos + 1}</span>
                  <span className="flex-1 text-sm text-ink">{d.items![itemIdx]}</span>
                  {!a?.submitted && (
                    <div className="flex gap-1">
                      <button type="button" className="btn-ghost !px-2 !py-1 text-xs" onClick={() => moveOrder(pos, -1)} aria-label="Move up">
                        ↑
                      </button>
                      <button type="button" className="btn-ghost !px-2 !py-1 text-xs" onClick={() => moveOrder(pos, 1)} aria-label="Move down">
                        ↓
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {a && a.hintTier > 0 && !a.submitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 rounded-xl border border-gold/25 bg-gold/5 p-3 text-sm text-gold-soft"
            >
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wide">Hint tier {a.hintTier}/3</div>
              {hints[a.hintTier - 1]}
            </motion.div>
          )}
        </AnimatePresence>

        {a?.submitted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 rounded-xl border p-3 text-sm ${a.correct ? "border-brand/30 bg-brand/10 text-brand-bright" : "border-danger/25 bg-danger/10 text-danger"}`}
          >
            <div className="mb-1 font-bold">{a.correct ? "Correct" : "Not quite"}</div>
            <div className="text-ink/90">{q.explanation}</div>
          </motion.div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {!a?.submitted && (
            <>
              <Magnetic>
                <button type="button" className="btn-primary" onClick={submitCurrent}>
                  Check answer
                </button>
              </Magnetic>
              <button type="button" className="btn-ghost" onClick={useHint} disabled={(a?.hintTier ?? 0) >= 3}>
                Hint ({a?.hintTier ?? 0}/3)
              </button>
            </>
          )}
          {a?.submitted && (
            <Magnetic>
              <button type="button" className="btn-primary" onClick={next} disabled={pending}>
                {idx < questions.length - 1 ? "Next question" : "Finish quiz"}
              </button>
            </Magnetic>
          )}
        </div>
      </MouseGlow>
    </div>
  );
}
