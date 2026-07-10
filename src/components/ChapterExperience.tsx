"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { LessonRenderer } from "./LessonRenderer";
import { ChapterQuiz, type QuizQ } from "./artifacts/ChapterQuiz";
import { MouseGlow, Magnetic } from "./InteractiveWrappers";
import { Icon } from "./ui";
import { parseJSON } from "@/lib/util";
import { recordLessonComplete } from "@/lib/actions";
import type { Block } from "@/lib/types";

type Lesson = {
  id: string;
  title: string;
  readMinutes: number;
  blocks: string;
  orderIndex: number;
};

type GlossaryItem = { term: string; definition: string };

export function ChapterExperience({
  chapterId,
  chapterCode,
  title,
  objective,
  lessons,
  questions,
  glossary,
  bestScorePct = 0,
  nextCode,
  prevCode,
}: {
  chapterId: string;
  chapterCode: string;
  title: string;
  objective: string;
  lessons: Lesson[];
  questions: QuizQ[];
  glossary: GlossaryItem[];
  bestScorePct?: number;
  nextCode?: string | null;
  prevCode?: string | null;
}) {
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [tab, setTab] = useState<"lessons" | "quiz">("lessons");
  const [pending, startTransition] = useTransition();

  const lesson = lessons[activeLesson];
  const blocks = useMemo(() => (lesson ? (parseJSON(lesson.blocks, []) as Block[]) : []), [lesson]);

  function markComplete() {
    if (!lesson || completed[lesson.id]) return;
    startTransition(async () => {
      await recordLessonComplete(lesson.id, chapterId, 0, true);
      setCompleted((c) => ({ ...c, [lesson.id]: true }));
    });
  }

  const doneCount = Object.keys(completed).length;

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-24">
      <header className="border-b border-line pb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Link href="/map" className="chip !border-line hover:border-brand/40">
            <Icon name="map" size={12} /> Course map
          </Link>
          <span className="chip !border-brand/30 !text-brand-bright">{chapterCode}</span>
          {bestScorePct > 0 && <span className="chip !border-gold/30 !text-gold">Best {bestScorePct}%</span>}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">{objective}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setTab("lessons")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              tab === "lessons" ? "bg-brand text-[#04150e]" : "border border-line text-ink-muted hover:bg-surface-raised hover:text-ink"
            }`}
          >
            Lessons
          </button>
          {questions.length > 0 && (
            <button
              type="button"
              onClick={() => setTab("quiz")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                tab === "quiz" ? "bg-brand text-[#04150e]" : "border border-line text-ink-muted hover:bg-surface-raised hover:text-ink"
              }`}
            >
              Chapter quiz
            </button>
          )}
          <span className="ml-auto hidden text-sm text-ink-faint sm:inline">
            {lessons.length} lessons · {doneCount} done this session
            {questions.length > 0 && ` · ${questions.length} quiz items`}
          </span>
        </div>
      </header>

      {tab === "lessons" && (
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-6 space-y-1.5">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-ink-faint">Lessons</div>
              {lessons.map((l, i) => {
                const active = i === activeLesson;
                const done = !!completed[l.id];
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setActiveLesson(i)}
                    className={`w-full rounded-xl border px-3 py-2.5 text-left transition-colors ${
                      active ? "border-brand/35 bg-brand/10" : "border-transparent bg-transparent hover:bg-surface-raised"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          done ? "bg-brand text-[#04150e]" : active ? "bg-info/20 text-info" : "bg-surface-raised text-ink-faint"
                        }`}
                      >
                        {done ? "✓" : i + 1}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-sm leading-snug ${active ? "font-semibold text-ink" : "text-ink-muted"}`}>{l.title}</div>
                        <div className="mt-0.5 text-[11px] text-ink-faint">~{l.readMinutes} min</div>
                      </div>
                    </div>
                  </button>
                );
              })}

              {questions.length > 0 && (
                <Magnetic className="pt-3">
                  <button type="button" className="btn-primary w-full text-sm" onClick={() => setTab("quiz")}>
                    Take chapter quiz
                  </button>
                </Magnetic>
              )}
            </div>
          </aside>

          <div className="space-y-6 lg:col-span-8 xl:col-span-9">
            {lesson && (
              <MouseGlow className="card-raised p-6 sm:p-8">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-brand">
                      Lesson {activeLesson + 1} of {lessons.length}
                    </div>
                    <h2 className="mt-1 text-xl font-bold text-ink sm:text-2xl">{lesson.title}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={markComplete}
                    disabled={pending || completed[lesson.id]}
                    className={completed[lesson.id] ? "btn-ghost !border-brand/40 !text-brand text-sm" : "btn-primary text-sm"}
                  >
                    {completed[lesson.id] ? "Completed" : pending ? "Saving…" : "Mark complete"}
                  </button>
                </div>

                <LessonRenderer blocks={blocks} chapterCode={chapterCode} />

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                  <button
                    type="button"
                    className="btn-ghost text-sm"
                    disabled={activeLesson === 0}
                    onClick={() => setActiveLesson((i) => Math.max(0, i - 1))}
                  >
                    Previous
                  </button>
                  {activeLesson < lessons.length - 1 ? (
                    <button type="button" className="btn-primary text-sm" onClick={() => setActiveLesson((i) => i + 1)}>
                      Next lesson <Icon name="arrowRight" size={14} />
                    </button>
                  ) : questions.length > 0 ? (
                    <button type="button" className="btn-primary text-sm" onClick={() => setTab("quiz")}>
                      Chapter quiz <Icon name="arrowRight" size={14} />
                    </button>
                  ) : (
                    <Link href="/map" className="btn-primary text-sm">
                      Back to map
                    </Link>
                  )}
                </div>
              </MouseGlow>
            )}

            {glossary.length > 0 && (
              <div className="card p-5">
                <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-ink-faint">Glossary</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {glossary.map((g) => (
                    <div key={g.term} className="rounded-lg border border-line/70 bg-canvas/50 px-3 py-2.5">
                      <div className="text-sm font-semibold text-ink">{g.term}</div>
                      <div className="mt-0.5 text-xs leading-5 text-ink-muted">{g.definition}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "quiz" && questions.length > 0 && (
        <ChapterQuiz chapterId={chapterId} chapterCode={chapterCode} questions={questions} bestScorePct={bestScorePct} />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        {prevCode ? (
          <Link href={`/learn/${prevCode}`} className="btn-ghost text-sm">
            ← Previous chapter
          </Link>
        ) : (
          <span />
        )}
        {nextCode ? (
          <Link href={`/learn/${nextCode}`} className="btn-ghost text-sm">
            Next chapter →
          </Link>
        ) : (
          <Link href="/map" className="btn-ghost text-sm">
            Back to map
          </Link>
        )}
      </div>
    </div>
  );
}
