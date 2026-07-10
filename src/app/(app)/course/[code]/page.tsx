import { getCurrentUser } from "@/lib/auth";
import { getCourseState } from "@/lib/progress";
import { effectiveFreeRoam } from "@/lib/subscription";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/ui";

// Khan-Academy-style course breakdown: a sticky Unit rail + Unit cards whose
// chapters are lesson-group headings, with individual lessons listed under each.
export default async function CoursePage({ params }: { params: Promise<{ code: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const { code } = await params;

  const tracks = await getCourseState(user.id, effectiveFreeRoam(user));
  const track = tracks.find((t) => t.code.toLowerCase() === decodeURIComponent(code).toLowerCase());
  if (!track) notFound();

  const unitCount = track.modules.length;
  const chapterCount = track.modules.reduce((n, m) => n + m.chapters.length, 0);
  const realmChip = track.realm === "cre" ? "!border-brand/30 !text-brand" : "!border-info/40 !text-info";

  return (
    <div className="mx-auto max-w-6xl pb-24">
      <div className="mb-4">
        <Link href="/map" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
          <Icon name="chevronRight" size={14} className="rotate-180" /> All courses
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* ── Unit rail (sticky) ── */}
        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <div className="card mb-4 flex items-center gap-3 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon name="book" size={20} />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-ink">{track.title}</div>
              <div className="text-xs uppercase tracking-wide text-ink-muted">
                {unitCount} units · {chapterCount} modules
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
                <span className="mt-0.5 shrink-0 text-xs font-semibold text-ink-faint">{i + 1}</span>
                <span className="flex min-w-0 items-center gap-2">
                  <span className="text-sm leading-snug text-ink">{mod.title}</span>
                  {mod.complete ? (
                    <Icon name="check" size={13} className="shrink-0 text-brand" />
                  ) : !mod.unlocked ? (
                    <Icon name="lock" size={12} className="shrink-0 text-ink-faint" />
                  ) : null}
                </span>
              </a>
            ))}
          </nav>
        </aside>

        {/* ── Main: course title + unit cards ── */}
        <div className="min-w-0">
          <header className="mb-8 border-b border-line pb-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`chip ${realmChip}`}>{track.realm === "cre" ? "Commercial Real Estate" : "High Finance"}</span>
              {track.flagship && <span className="chip !border-gold/30 !bg-gold/10 !text-gold">Flagship</span>}
              <span className="chip">{track.tier}</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-ink">{track.title}</h1>
            <p className="mt-2 max-w-2xl text-lg text-ink-muted">{track.tagline}</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 w-40 overflow-hidden rounded-full bg-surface-raised">
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
                className={`scroll-mt-6 rounded-2xl border border-line bg-surface/40 p-6 ${!mod.unlocked ? "opacity-60" : ""}`}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-ink-faint">Unit {i + 1}</div>
                    <h2 className="mt-1 text-2xl font-bold text-ink">{mod.title}</h2>
                    {mod.description && <p className="mt-1.5 max-w-2xl text-sm text-ink-muted">{mod.description}</p>}
                  </div>
                  {mod.complete ? (
                    <span className="chip !border-brand/30 !text-brand">Complete</span>
                  ) : !mod.unlocked ? (
                    <Icon name="lock" size={18} className="mt-1 shrink-0 text-ink-faint" />
                  ) : null}
                </div>

                {/* lesson-group columns (chapters), each with its lessons */}
                <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                  {mod.chapters.map((chap) => {
                    const isPassed = chap.status === "passed" || chap.status === "tested_out";
                    return (
                      <div key={chap.id}>
                        {chap.viewable ? (
                          <Link
                            href={`/learn/${chap.code}`}
                            className="group mb-2.5 flex items-center gap-2 text-[15px] font-bold text-ink hover:text-brand"
                          >
                            <span>{chap.title}</span>
                            {isPassed && <Icon name="check" size={14} className="text-brand" />}
                          </Link>
                        ) : (
                          <div className="mb-2.5 flex items-center gap-2 text-[15px] font-bold text-ink-muted">
                            <span>{chap.title}</span>
                            <Icon name="lock" size={13} className="text-ink-faint" />
                          </div>
                        )}
                        <ul className="space-y-0.5">
                          {chap.lessons.map((lesson) => (
                            <li key={lesson.id}>
                              {chap.viewable ? (
                                <Link
                                  href={`/learn/${chap.code}?lesson=${lesson.orderIndex}`}
                                  className="group flex items-center gap-2.5 rounded-md px-1.5 py-1.5 text-sm text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                                >
                                  <Icon
                                    name={isPassed ? "check" : "play"}
                                    size={13}
                                    className={`shrink-0 ${isPassed ? "text-brand" : "text-info"}`}
                                  />
                                  <span className="truncate">{lesson.title}</span>
                                </Link>
                              ) : (
                                <div className="flex items-center gap-2.5 px-1.5 py-1.5 text-sm text-ink-faint">
                                  <Icon name="lock" size={12} className="shrink-0" />
                                  <span className="truncate">{lesson.title}</span>
                                </div>
                              )}
                            </li>
                          ))}
                          {/* the graded quiz that closes the chapter */}
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
                              <div className="flex items-center gap-2.5 px-1.5 py-1.5 text-sm text-ink-faint">
                                <Icon name="lock" size={12} className="shrink-0" />
                                <span>Quiz · {chap.questionCount} questions</span>
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
