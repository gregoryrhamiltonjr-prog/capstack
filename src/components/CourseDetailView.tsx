import Link from "next/link";
import { Icon } from "@/components/ui";
import type { TrackState } from "@/lib/progress";

// Course breakdown: unit rail + unit cards. Chapters sit in a normal grid
// (never CSS multi-columns, which fragment cards and reflow on hover).
export function CourseDetailView({ track, completedLessonIds }: { track: TrackState; completedLessonIds: ReadonlySet<string> }) {
  const chapterCount = track.modules.reduce((n, m) => n + m.chapters.length, 0);
  const realmChip = track.realm === "cre" ? "!border-brand/30 !text-brand" : "!border-info/40 !text-info";

  return (
    <div className="w-full pb-12">
      <div className="mb-4">
        <Link href="/map" className="inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
          <Icon name="chevronRight" size={14} className="rotate-180" /> All courses
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden lg:sticky lg:top-6 lg:block lg:h-fit" aria-label="Course units">
          <div className="card mb-4 flex items-start gap-3 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon name="book" size={20} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold leading-snug text-ink">{track.title}</div>
              <div className="mt-1 text-xs text-ink-muted">
                {track.modules.length} units · {chapterCount} chapters
              </div>
            </div>
          </div>
          <nav className="space-y-0.5">
            {track.modules.map((mod, i) => (
              <a
                key={mod.id}
                href={`#unit-${mod.code}`}
                className="flex items-start gap-3 rounded-lg border-l-2 border-transparent px-3 py-2.5 transition-colors hover:border-brand hover:bg-surface"
              >
                <span className="mt-0.5 shrink-0 text-xs font-semibold text-ink-muted">{i + 1}</span>
                <span className="flex min-w-0 items-center gap-2">
                  <span className="text-sm leading-snug text-ink">{mod.title}</span>
                  {mod.complete ? (
                    <><Icon name="check" size={13} className="shrink-0 text-brand" /><span className="sr-only">(complete)</span></>
                  ) : !mod.unlocked ? (
                    <><Icon name="lock" size={12} className="shrink-0 text-ink-muted" /><span className="sr-only">(locked)</span></>
                  ) : null}
                </span>
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <header className="mb-8 border-b border-line pb-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`chip ${realmChip}`}>{track.realm === "cre" ? "Commercial Real Estate" : "High Finance"}</span>
              {track.flagship && <span className="chip !border-gold/30 !bg-gold/10 !text-gold">Flagship</span>}
              <span className="chip">{track.tier}</span>
            </div>
            <h1 className="break-words text-3xl font-bold tracking-tight text-ink sm:text-4xl">{track.title}</h1>
            <p className="mt-2 max-w-2xl text-base text-ink-muted sm:text-lg">{track.tagline}</p>
            <p className="mt-2 text-sm text-ink-muted lg:hidden">
              {track.modules.length} units · {chapterCount} chapters
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div
                className="h-2 w-40 overflow-hidden rounded-full bg-surface-raised"
                role="progressbar"
                aria-label="Course progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={track.progressPct}
              >
                <div className="h-full rounded-full bg-brand" style={{ width: `${track.progressPct}%` }} />
              </div>
              <span className="text-sm font-semibold text-brand">{track.progressPct}% complete</span>
            </div>
          </header>

          <div className="space-y-6">
            {track.modules.map((mod, i) => (
              <section
                key={mod.id}
                id={`unit-${mod.code}`}
                aria-labelledby={`unit-title-${mod.code}`}
                className="scroll-mt-6 rounded-2xl border border-line bg-surface/40 p-5 sm:p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">Unit {i + 1}</div>
                    <h2 id={`unit-title-${mod.code}`} className="mt-1 text-xl font-bold text-ink sm:text-2xl">{mod.title}</h2>
                    {mod.description && <p className="mt-1.5 max-w-2xl text-sm text-ink-muted">{mod.description}</p>}
                  </div>
                  {mod.complete ? (
                    <span className="chip shrink-0 !border-brand/30 !text-brand">Complete</span>
                  ) : !mod.unlocked ? (
                    <span className="chip shrink-0"><Icon name="lock" size={12} /> Locked</span>
                  ) : null}
                </div>

                <div data-course-chapter-grid="true" className="grid items-stretch gap-4 md:grid-cols-2 min-[1800px]:grid-cols-3 min-[2400px]:grid-cols-4">
                  {mod.chapters.map((chap) => {
                    const isPassed = chap.status === "passed" || chap.status === "tested_out";
                    return (
                      <div key={chap.id} className="flex min-w-0 flex-col rounded-xl border border-line/70 bg-canvas/30 p-4">
                        {chap.viewable ? (
                          <Link
                            href={`/learn/${chap.code}`}
                            className="mb-2.5 flex items-start gap-2 text-[15px] font-bold leading-snug text-ink hover:text-brand"
                          >
                            <span>{chap.title}</span>
                            {isPassed && <><Icon name="check" size={14} className="mt-0.5 shrink-0 text-brand" /><span className="sr-only">(passed)</span></>}
                          </Link>
                        ) : (
                          <div className="mb-2.5 flex items-start gap-2 text-[15px] font-bold leading-snug text-ink-muted">
                            <span>{chap.title}</span>
                            <Icon name="lock" size={13} className="mt-0.5 shrink-0" /><span className="sr-only">(locked)</span>
                          </div>
                        )}
                        <ul className="space-y-0.5">
                          {chap.lessons.map((lesson, lessonIndex) => {
                            const done = isPassed || completedLessonIds.has(lesson.id);
                            return (
                              <li key={lesson.id}>
                                {chap.viewable ? (
                                  <Link
                                    href={`/learn/${chap.code}?lesson=${lessonIndex}`}
                                    className="flex items-start gap-2.5 rounded-md px-1.5 py-1.5 text-sm text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                                  >
                                    <Icon name={done ? "check" : "play"} size={13} className={`mt-1 shrink-0 ${done ? "text-brand" : "text-info"}`} />
                                    <span>{lesson.title}</span>
                                    {done && <span className="sr-only">(completed)</span>}
                                  </Link>
                                ) : (
                                  <div className="flex items-start gap-2.5 px-1.5 py-1.5 text-sm text-ink-muted">
                                    <Icon name="lock" size={12} className="mt-1 shrink-0" />
                                    <span>{lesson.title}</span>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                          <li>
                            {chap.quizUnlocked ? (
                              <Link
                                href={`/learn/${chap.code}?tab=quiz`}
                                className="flex items-center gap-2.5 rounded-md px-1.5 py-1.5 text-sm text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                              >
                                <Icon name="trophy" size={13} className="shrink-0 text-gold" />
                                <span>Quiz · {chap.questionCount} questions</span>
                              </Link>
                            ) : (
                              <div className="flex items-center gap-2.5 px-1.5 py-1.5 text-sm text-ink-muted">
                                <Icon name="lock" size={12} className="shrink-0" />
                                <span>Quiz · {chap.questionCount} questions <span className="text-xs">(pass earlier chapters to unlock)</span></span>
                              </div>
                            )}
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
