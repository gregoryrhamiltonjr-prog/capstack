"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { submitQuizResult } from "@/lib/actions";
import { parseJSON } from "@/lib/util";
import { isAnswerReady, PASS_PCT } from "@/lib/quiz";
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

type QuestionData = {
  choices?: string[];
  correct?: number;
  answer?: number;
  tolerance?: number;
  unit?: string;
  prefix?: string;
  items?: string[];
  narrative?: string;
};

type SaveState =
  | { status: "idle" | "saving" }
  | { status: "saved"; xpEarned: number }
  | { status: "error" };

export function ChapterQuiz({
  chapterId,
  questions,
  bestScorePct = 0,
  courseHref,
  next = null,
  onReviewLessons,
}: {
  chapterId: string;
  questions: QuizQ[];
  bestScorePct?: number;
  courseHref: string;
  next?: { code: string; title: string } | null;
  onReviewLessons?: () => void;
}) {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [finished, setFinished] = useState(false);
  const [scorePct, setScorePct] = useState(0);
  const [save, setSave] = useState<SaveState>({ status: "idle" });
  const [lastResults, setLastResults] = useState<{ questionId: string; correct: boolean; hintTier: number }[]>([]);
  const [, startTransition] = useTransition();
  const questionRef = useRef<HTMLParagraphElement>(null);

  const q = questions[idx];
  const a: AnswerState = q ? answers[q.id] ?? { hintTier: 0, submitted: false } : { hintTier: 0, submitted: false };
  const data = useMemo(() => (q ? parseJSON(q.data, {} as QuestionData) : ({} as QuestionData)), [q]);
  const hints = useMemo(() => (q ? parseJSON(q.hints, [] as string[]).filter(Boolean) : []), [q]);
  const progressPct = questions.length ? Math.round(((idx + (a.submitted ? 1 : 0)) / questions.length) * 100) : 0;
  const ready = q ? isAnswerReady(q.type, a) : false;

  function update(partial: Partial<AnswerState>) {
    if (!q) return;
    setAnswers((prev) => ({
      ...prev,
      [q.id]: { ...(prev[q.id] ?? { hintTier: 0, submitted: false }), ...partial },
    }));
  }

  function grade(): boolean {
    if (!q) return false;
    if (q.type === "mc" || q.type === "scenario") return a.choice === data.correct;
    if (q.type === "numeric") {
      const num = parseFloat(String(a.numeric ?? "").replace(/[^0-9.-]/g, ""));
      return Number.isFinite(num) && Math.abs(num - (data.answer ?? NaN)) <= (data.tolerance ?? 0);
    }
    if (q.type === "ordering") {
      const order = a.order ?? (data.items ?? []).map((_, i) => i);
      return order.every((v, i) => v === i);
    }
    return false;
  }

  function submitCurrent() {
    if (!q || a.submitted || !ready) return;
    update({ submitted: true, correct: grade() });
  }

  function revealHint() {
    if (!q || a.submitted || a.hintTier >= hints.length) return;
    update({ hintTier: a.hintTier + 1 });
  }

  function persist(results: { questionId: string; correct: boolean; hintTier: number }[]) {
    setSave({ status: "saving" });
    startTransition(async () => {
      try {
        const result = await submitQuizResult({ chapterId, servedIds: questions.map((qq) => qq.id), results });
        setSave({ status: "saved", xpEarned: result.xpEarned });
        // Passing can unlock the next chapter; refresh server-computed navigation.
        router.refresh();
      } catch {
        setSave({ status: "error" });
      }
    });
  }

  function nextQuestion() {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
      requestAnimationFrame(() => questionRef.current?.focus());
      return;
    }
    const results = questions.map((qq) => {
      const st = answers[qq.id];
      return { questionId: qq.id, correct: !!st?.submitted && !!st.correct, hintTier: st?.hintTier ?? 0 };
    });
    const correctCount = results.filter((r) => r.correct).length;
    setScorePct(Math.round((correctCount / Math.max(1, questions.length)) * 100));
    setLastResults(results);
    setFinished(true);
    persist(results);
  }

  function restart() {
    setFinished(false);
    setIdx(0);
    setAnswers({});
    setSave({ status: "idle" });
  }

  if (!questions.length || !q) {
    return <div className="rounded-2xl border border-line bg-surface p-6 text-sm text-ink-muted">No graded quiz for this chapter yet.</div>;
  }

  if (finished) {
    const passed = scorePct >= PASS_PCT;
    return (
      <section className="rounded-2xl border border-line bg-surface p-6 text-center sm:p-8" aria-labelledby="quiz-result-title">
        <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 ${passed ? "border-brand bg-brand/15 text-brand" : "border-warn bg-warn/10 text-warn"}`}>
          <Icon name={passed ? "trophy" : "target"} size={32} />
        </div>
        <h2 id="quiz-result-title" className="text-2xl font-bold text-ink">{passed ? "Chapter cleared" : "Almost there"}</h2>
        <p className="mt-2 text-ink-muted">
          You scored <span className="font-mono font-bold text-ink">{scorePct}%</span>
          {bestScorePct > 0 && <> · best <span className="font-mono">{Math.max(bestScorePct, scorePct)}%</span></>}
          {!passed && <> · {PASS_PCT}% passes</>}
        </p>
        <p className="mt-1 min-h-5 text-sm text-ink-muted" role="status" aria-live="polite">
          {save.status === "saving" && "Saving your result…"}
          {save.status === "saved" && (save.xpEarned > 0 ? `Saved · +${save.xpEarned} XP` : passed ? "Saved · XP is awarded on your first pass only." : "Saved. Review the lessons and retry anytime.")}
        </p>
        {save.status === "error" && (
          <p role="alert" className="mx-auto mt-2 max-w-md text-sm text-danger">
            Your result wasn’t saved.{" "}
            <button type="button" className="font-semibold underline" onClick={() => persist(lastResults)}>
              Try saving again
            </button>
          </p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {passed && next ? (
            <Link href={`/learn/${next.code}`} className="btn-primary">
              Next chapter: {next.title} <Icon name="arrowRight" size={14} />
            </Link>
          ) : !passed ? (
            <button type="button" className="btn-primary" onClick={restart}>
              Retry quiz
            </button>
          ) : null}
          {!passed && onReviewLessons && (
            <button type="button" className="btn-ghost" onClick={onReviewLessons}>
              Review lessons
            </button>
          )}
          {passed && (
            <button type="button" className="btn-ghost" onClick={restart}>
              Retake quiz
            </button>
          )}
          <Link href={courseHref} className="btn-ghost">
            Back to course
          </Link>
        </div>
      </section>
    );
  }

  const order = a.order ?? (data.items ? data.items.map((_, i) => i) : []);

  function moveOrder(from: number, dir: -1 | 1) {
    const to = from + dir;
    if (to < 0 || to >= order.length) return;
    const nextOrder = [...order];
    [nextOrder[from], nextOrder[to]] = [nextOrder[to], nextOrder[from]];
    update({ order: nextOrder });
  }

  const choiceGroupLabel = `quiz-prompt-${q.id}`;

  return (
    <section id="chapter-quiz" className="space-y-4" aria-labelledby="quiz-heading">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-ink-muted">Chapter quiz</div>
          <h2 id="quiz-heading" className="text-lg font-bold text-ink">
            Question {idx + 1} of {questions.length}
          </h2>
        </div>
        <div className="text-right text-xs text-ink-muted">
          Pass at {PASS_PCT}%
          <div
            className="mt-1 h-1.5 w-28 overflow-hidden rounded-full bg-surface-raised"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPct}
          >
            <div className="h-full bg-brand transition-all" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>

      <form
        className="rounded-2xl border border-line bg-surface p-5 sm:p-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (a.submitted) nextQuestion();
          else submitCurrent();
        }}
      >
        {q.type === "scenario" && data.narrative && (
          <div className="mb-4 rounded-xl border border-line bg-canvas p-3 text-sm leading-6 text-ink-muted">{data.narrative}</div>
        )}
        <p id={choiceGroupLabel} ref={questionRef} tabIndex={-1} className="text-base font-semibold leading-7 text-ink focus:outline-none">
          {q.prompt}
        </p>

        <div className="mt-5 space-y-2">
          {(q.type === "mc" || q.type === "scenario") && (
            <div role="radiogroup" aria-labelledby={choiceGroupLabel} className="space-y-2">
              {(data.choices ?? []).map((choice, i) => {
                const selected = a.choice === i;
                const show = a.submitted;
                const isCorrect = i === data.correct;
                return (
                  <button
                    key={i}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={a.submitted}
                    onClick={() => update({ choice: i })}
                    className={`flex w-full items-start gap-2 rounded-xl border px-4 py-3 text-left text-sm transition-colors disabled:cursor-default ${
                      show && isCorrect
                        ? "border-brand/50 bg-brand/10 text-brand-bright"
                        : show && selected && !isCorrect
                          ? "border-danger/40 bg-danger/10 text-danger"
                          : selected
                            ? "border-info/60 bg-info/10 text-ink"
                            : "border-line bg-canvas text-ink-muted hover:border-line-strong hover:text-ink"
                    }`}
                  >
                    <span aria-hidden="true" className="mt-px font-mono text-xs text-ink-muted">{String.fromCharCode(65 + i)}.</span>
                    <span className="min-w-0 flex-1">{choice}</span>
                    {show && isCorrect && <span className="shrink-0 text-xs font-semibold">Correct answer</span>}
                    {show && selected && !isCorrect && <span className="shrink-0 text-xs font-semibold">Your answer</span>}
                  </button>
                );
              })}
            </div>
          )}

          {q.type === "numeric" && (
            <div>
              <label htmlFor={`numeric-${q.id}`} className="label">Your answer{data.unit ? ` (${data.unit})` : ""}</label>
              <div className="flex flex-wrap items-center gap-2">
                {data.prefix && <span className="text-ink-muted">{data.prefix}</span>}
                <input
                  id={`numeric-${q.id}`}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  className="input max-w-xs"
                  value={a.numeric ?? ""}
                  disabled={a.submitted}
                  onChange={(e) => update({ numeric: e.target.value })}
                />
                {data.unit && <span className="text-ink-muted">{data.unit}</span>}
              </div>
            </div>
          )}

          {q.type === "ordering" && data.items && (
            <ol className="space-y-2" aria-labelledby={choiceGroupLabel}>
              {order.map((itemIdx, pos) => (
                <li key={itemIdx} className="flex items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2">
                  <span aria-hidden="true" className="w-6 font-mono text-xs text-ink-muted">{pos + 1}</span>
                  <span className="flex-1 text-sm text-ink">{data.items![itemIdx]}</span>
                  {!a.submitted && (
                    <div className="flex gap-1">
                      <button
                        type="button"
                        className="btn-ghost !min-h-9 !px-2.5 !py-1 text-xs"
                        disabled={pos === 0}
                        onClick={() => moveOrder(pos, -1)}
                        aria-label={`Move “${data.items![itemIdx]}” up`}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        className="btn-ghost !min-h-9 !px-2.5 !py-1 text-xs"
                        disabled={pos === order.length - 1}
                        onClick={() => moveOrder(pos, 1)}
                        aria-label={`Move “${data.items![itemIdx]}” down`}
                      >
                        ↓
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>

        {a.hintTier > 0 && !a.submitted && (
          <div className="mt-4 rounded-xl border border-gold/25 bg-gold/5 p-3 text-sm text-gold-soft" aria-live="polite">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wide">
              Hint {a.hintTier} of {hints.length}
            </div>
            {hints[a.hintTier - 1]}
          </div>
        )}

        <div aria-live="polite">
          {a.submitted && (
            <div className={`mt-4 rounded-xl border p-3 text-sm ${a.correct ? "border-brand/30 bg-brand/10 text-brand-bright" : "border-danger/25 bg-danger/10 text-danger"}`}>
              <div className="mb-1 font-bold">{a.correct ? "Correct" : "Not quite"}</div>
              <div className="text-ink/90">{q.explanation}</div>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {!a.submitted ? (
            <>
              <button type="submit" className="btn-primary" disabled={!ready}>
                Check answer
              </button>
              {hints.length > 0 && (
                <button type="button" className="btn-ghost" onClick={revealHint} disabled={a.hintTier >= hints.length}>
                  {a.hintTier >= hints.length ? "No more hints" : `Hint (${a.hintTier}/${hints.length})`}
                </button>
              )}
              {!ready && <span className="text-xs text-ink-muted">{q.type === "numeric" ? "Enter a number to check it." : "Choose an answer to check it."}</span>}
            </>
          ) : (
            <button type="submit" className="btn-primary">
              {idx < questions.length - 1 ? "Next question" : "Finish quiz"}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
