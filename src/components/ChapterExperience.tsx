"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { LessonRenderer } from "./LessonRenderer";
import { LessonAudio } from "./LessonAudio";
import { lessonSpeechText } from "@/lib/lesson-audio";
import { ChapterQuiz, type QuizQ } from "./artifacts/ChapterQuiz";
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
type ChapterLink = { code: string; title: string };

export function ChapterExperience({
  chapterId,
  chapterCode,
  title,
  objective,
  lessons,
  questions,
  glossary,
  bestScorePct = 0,
  quizUnlocked,
  course,
  prev = null,
  next = null,
  initialCompletedIds = [],
  initialLesson = 0,
  initialTab = "lessons",
}: {
  chapterId: string;
  chapterCode: string;
  title: string;
  objective: string;
  lessons: Lesson[];
  questions: QuizQ[];
  glossary: GlossaryItem[];
  bestScorePct?: number;
  quizUnlocked: boolean;
  course: { code: string; title: string };
  prev?: ChapterLink | null;
  next?: ChapterLink | null;
  initialCompletedIds?: string[];
  initialLesson?: number;
  initialTab?: "lessons" | "quiz";
}) {
  const clampedInitial = Math.min(Math.max(initialLesson, 0), Math.max(lessons.length - 1, 0));
  const [activeLesson, setActiveLesson] = useState(clampedInitial);
  const [completed, setCompleted] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(initialCompletedIds.map((id) => [id, true])),
  );
  const [saveError, setSaveError] = useState<string | null>(null);
  const hasQuiz = questions.length > 0;
  const [tab, setTab] = useState<"lessons" | "quiz">(initialTab === "quiz" && hasQuiz && quizUnlocked ? "quiz" : "lessons");
  const [pending, startTransition] = useTransition();
  const topRef = useRef<HTMLDivElement>(null);
  const lessonHeadingRef = useRef<HTMLHeadingElement>(null);

  const lesson = lessons[activeLesson];
  const blocks = useMemo(() => (lesson ? (parseJSON(lesson.blocks, []) as Block[]) : []), [lesson]);
  const speechText = useMemo(() => lesson ? lessonSpeechText(lesson.title, blocks) : "", [lesson, blocks]);
  const doneCount = lessons.filter((l) => completed[l.id]).length;
  const courseHref = `/course/${course.code}`;

  // Keep the address bar in step with what is on screen, so reload/share/back work.
  function syncUrl(nextTab: "lessons" | "quiz", lessonIndex: number) {
    const url = new URL(window.location.href);
    url.searchParams.delete("tab");
    url.searchParams.delete("lesson");
    if (nextTab === "quiz") url.searchParams.set("tab", "quiz");
    else if (lessonIndex > 0) url.searchParams.set("lesson", String(lessonIndex));
    window.history.replaceState(window.history.state, "", url);
  }

  // A lesson or tab change starts reading from the top, not mid-page.
  function revealTop(focusLesson: boolean) {
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: "start" });
      if (focusLesson) lessonHeadingRef.current?.focus({ preventScroll: true });
    });
  }

  function goToLesson(index: number) {
    const target = Math.min(Math.max(index, 0), lessons.length - 1);
    setActiveLesson(target);
    setTab("lessons");
    setSaveError(null);
    syncUrl("lessons", target);
    revealTop(true);
  }

  function openQuiz() {
    setTab("quiz");
    syncUrl("quiz", activeLesson);
    revealTop(false);
  }

  function markComplete() {
    if (!lesson || completed[lesson.id]) return;
    setSaveError(null);
    startTransition(async () => {
      try {
        await recordLessonComplete(lesson.id, chapterId, 0, quizUnlocked);
        setCompleted((c) => ({ ...c, [lesson.id]: true }));
      } catch {
        setSaveError("We couldn’t save this lesson. Check your connection and try again.");
      }
    });
  }

  const tabClass = (active: boolean) =>
    `min-h-11 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
      active ? "bg-brand text-[#1a1206]" : "border border-line text-ink-muted hover:bg-surface-raised hover:text-ink"
    }`;

  return (
    <div ref={topRef} className="mx-auto max-w-5xl 2xl:max-w-6xl scroll-mt-6 space-y-8 pb-12">
      <header className="border-b border-line pb-6">
        <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-2">
          <Link href={courseHref} className="chip min-h-8 max-w-full !border-line hover:border-brand/40">
            <Icon name="chevronRight" size={12} className="shrink-0 rotate-180" />
            <span className="truncate">{course.title}</span>
          </Link>
          <span className="chip !border-brand/30 !text-brand-bright">{chapterCode}</span>
          {bestScorePct > 0 && <span className="chip !border-gold/30 !text-gold">Best quiz score {bestScorePct}%</span>}
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">{objective}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Chapter sections" className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={tab === "lessons"} onClick={() => goToLesson(activeLesson)} className={tabClass(tab === "lessons")}>
              Lessons
            </button>
            {hasQuiz && quizUnlocked && (
              <button type="button" aria-pressed={tab === "quiz"} onClick={openQuiz} className={tabClass(tab === "quiz")}>
                Chapter quiz
              </button>
            )}
          </div>
          <span className="text-sm text-ink-muted sm:ml-auto">
            {doneCount} of {lessons.length} lessons complete
            {hasQuiz && ` · ${questions.length}-question quiz`}
          </span>
        </div>
        {hasQuiz && !quizUnlocked && (
          <p className="mt-4 flex items-start gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-6 text-ink-muted">
            <Icon name="lock" size={14} className="mt-1 shrink-0" />
            <span>
              You’re reading ahead in Free Roam. This chapter’s quiz unlocks once you pass the chapters before it, so
              lessons here are saved as read but don’t earn XP yet.
            </span>
          </p>
        )}
      </header>

      {tab === "lessons" && (
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4 xl:col-span-3">
            <nav aria-label="Lessons in this chapter" className="space-y-1.5 lg:sticky lg:top-6">
              <h2 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-ink-muted">Lessons</h2>
              {lessons.map((l, i) => {
                const active = i === activeLesson;
                const done = !!completed[l.id];
                return (
                  <button
                    key={l.id}
                    type="button"
                    aria-current={active ? "step" : undefined}
                    onClick={() => goToLesson(i)}
                    className={`w-full rounded-xl border px-3 py-2.5 text-left transition-colors ${
                      active ? "border-brand/35 bg-brand/10" : "border-transparent bg-transparent hover:bg-surface-raised"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        aria-hidden="true"
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          done ? "bg-brand text-[#1a1206]" : active ? "bg-info/20 text-info" : "bg-surface-raised text-ink-muted"
                        }`}
                      >
                        {done ? "✓" : i + 1}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-sm leading-snug ${active ? "font-semibold text-ink" : "text-ink-muted"}`}>{l.title}</div>
                        <div className="mt-0.5 text-[11px] text-ink-muted">
                          ~{l.readMinutes} min{done && <span> · Completed</span>}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}

              {hasQuiz && quizUnlocked && (
                <div className="pt-3">
                  <button type="button" className="btn-primary w-full text-sm" onClick={openQuiz}>
                    Take chapter quiz
                  </button>
                </div>
              )}
            </nav>
          </aside>

          <div className="min-w-0 space-y-6 lg:col-span-8 xl:col-span-9">
            {lesson && (
              <article className="card-raised p-5 sm:p-8" aria-labelledby="lesson-title">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-brand">
                      Lesson {activeLesson + 1} of {lessons.length}
                    </div>
                    <h2 id="lesson-title" ref={lessonHeadingRef} tabIndex={-1} className="mt-1 text-xl font-bold text-ink focus:outline-none sm:text-2xl">
                      {lesson.title}
                    </h2>
                  </div>
                  {completed[lesson.id] && (
                    <span className="chip !border-brand/40 !text-brand">
                      <Icon name="check" size={12} /> Completed
                    </span>
                  )}
                </div>
                <LessonAudio key={lesson.id} title={lesson.title} text={speechText} />
                <LessonRenderer key={lesson.id} blocks={blocks} chapterCode={chapterCode} />

                <div className="mt-8 border-t border-line pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      className="btn-ghost text-sm"
                      disabled={activeLesson === 0}
                      onClick={() => goToLesson(activeLesson - 1)}
                    >
                      Previous lesson
                    </button>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={markComplete}
                        disabled={pending || !!completed[lesson.id]}
                        className={completed[lesson.id] ? "btn-ghost !border-brand/40 !text-brand text-sm" : "btn-ghost text-sm"}
                      >
                        {completed[lesson.id] ? (
                          <>
                            <Icon name="check" size={14} /> Completed
                          </>
                        ) : pending ? (
                          "Saving…"
                        ) : (
                          "Mark complete"
                        )}
                      </button>
                      {activeLesson < lessons.length - 1 ? (
                        <button type="button" className="btn-primary text-sm" onClick={() => goToLesson(activeLesson + 1)}>
                          Next lesson <Icon name="arrowRight" size={14} />
                        </button>
                      ) : hasQuiz && quizUnlocked ? (
                        <button type="button" className="btn-primary text-sm" onClick={openQuiz}>
                          Chapter quiz <Icon name="arrowRight" size={14} />
                        </button>
                      ) : next ? (
                        <Link href={`/learn/${next.code}`} className="btn-primary text-sm">
                          Next chapter <Icon name="arrowRight" size={14} />
                        </Link>
                      ) : (
                        <Link href={courseHref} className="btn-primary text-sm">
                          Back to course
                        </Link>
                      )}
                    </div>
                  </div>
                  <p role="alert" className="mt-3 text-sm text-danger empty:hidden">{saveError}</p>
                </div>
              </article>
            )}

            {glossary.length > 0 && (
              <section className="card p-5" aria-labelledby="glossary-heading">
                <h2 id="glossary-heading" className="mb-3 text-[11px] font-bold uppercase tracking-widest text-ink-muted">Glossary</h2>
                <dl className="grid gap-2 sm:grid-cols-2">
                  {glossary.map((g) => (
                    <div key={g.term} className="rounded-lg border border-line/70 bg-canvas/50 px-3 py-2.5">
                      <dt className="text-sm font-semibold text-ink">{g.term}</dt>
                      <dd className="mt-0.5 text-xs leading-5 text-ink-muted">{g.definition}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>
        </div>
      )}

      {tab === "quiz" && hasQuiz && quizUnlocked && (
        <ChapterQuiz
          chapterId={chapterId}
          questions={questions}
          bestScorePct={bestScorePct}
          courseHref={courseHref}
          next={next}
          onReviewLessons={() => goToLesson(0)}
        />
      )}

      <nav aria-label="Chapters" className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        {prev ? (
          <Link href={`/learn/${prev.code}`} className="btn-ghost max-w-full text-sm">
            <span aria-hidden="true">←</span> <span className="truncate">Previous: {prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/${next.code}`} className="btn-ghost max-w-full text-sm">
            <span className="truncate">Next: {next.title}</span> <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <Link href={courseHref} className="btn-ghost text-sm">
            Back to course
          </Link>
        )}
      </nav>
    </div>
  );
}
