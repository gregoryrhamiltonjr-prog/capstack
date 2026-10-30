import Link from "next/link";
import { Icon } from "@/components/ui";
import type { TrackState } from "@/lib/progress";

/**
 * Learning content must stay in normal document flow. In particular, do not
 * combine CSS multicolumn fragmentation with 3D transforms/scroll opacity:
 * hovering one unit must never clip, hide or move a neighboring unit.
 */
export function CourseMapView({ tracks }: { tracks: TrackState[] }) {
  const cre = tracks.filter((track) => track.realm === "cre").length;
  const hf = tracks.filter((track) => track.realm === "hf").length;

  return (
    <div className="mx-auto max-w-5xl space-y-9 pb-8">
      <header className="border-b border-line pb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-bright">Your curriculum</p>
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Courses</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-ink-muted sm:text-base">Your path from foundations to desk-ready — courses, units, and chapters in order.</p>
        <div className="mt-4 flex flex-wrap gap-2"><span className="chip !border-brand/30 !text-brand-bright">{cre} CRE courses</span><span className="chip !border-info/40 !text-info">{hf} High Finance courses</span></div>
      </header>

      <div className="space-y-12">
        {tracks.map((track) => (
          <section key={track.id} aria-labelledby={`course-${track.id}`}>
            <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1 basis-64">
                <div className="mb-2 flex flex-wrap items-center gap-2.5">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${track.unlocked || track.complete ? "border-brand/40 bg-brand/10 text-brand-bright" : "border-line text-ink-muted"}`}><Icon name={track.complete ? "check" : track.unlocked ? "book" : "lock"} size={14} /></span>
                  <span className={`chip ${track.realm === "cre" ? "!border-brand/30 !text-brand-bright" : "!border-info/40 !text-info"}`}>{track.realm === "cre" ? "CRE" : "High Finance"}</span>
                  {track.flagship && <span className="chip !border-gold/30 !text-gold">Flagship</span>}
                  {!track.unlocked && <span className="text-xs text-ink-muted">Prerequisites required</span>}
                </div>
                <h2 id={`course-${track.id}`} className="text-2xl font-bold tracking-tight text-ink"><Link href={`/course/${track.code}`} className="rounded-sm transition-colors hover:text-brand-bright">{track.title}</Link></h2>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{track.tagline} · {track.tier} · {track.estHours}</p>
              </div>
              <div className="shrink-0 text-right"><p className="text-2xl font-bold text-brand-bright tabnum">{track.progressPct}% <span className="text-xs font-medium text-ink-muted">complete</span></p><Link href={`/course/${track.code}`} className="mt-2 inline-flex min-h-11 items-center gap-1 rounded-lg text-xs font-semibold text-brand-bright hover:underline">Open course<Icon name="chevronRight" size={13} /></Link></div>
            </header>

            <div data-course-unit-grid className="grid items-start gap-4 md:grid-cols-2">
              {track.modules.map((unit) => (
                <section key={unit.id} aria-labelledby={`unit-${unit.id}`} className={`min-w-0 rounded-2xl border border-l-[3px] border-line bg-surface p-5 transition-colors hover:border-brand/40 ${unit.complete ? "border-l-brand" : unit.unlocked ? "border-l-info" : "border-l-line"}`}>
                  <div className="mb-2 flex items-start justify-between gap-3"><h3 id={`unit-${unit.id}`} className="text-lg font-semibold leading-tight text-ink">{unit.title}</h3>{(!unit.unlocked || unit.complete) && <Icon name={unit.complete ? "check" : "lock"} size={16} className={`shrink-0 ${unit.complete ? "text-brand" : "text-ink-muted"}`} />}</div>
                  <p className="mb-4 text-sm leading-6 text-ink-muted">{unit.description}</p>
                  <ul className="space-y-1 border-t border-line pt-3">
                    {unit.chapters.map((chapter) => {
                      const passed = chapter.status === "passed" || chapter.status === "tested_out";
                      const available = chapter.status === "available" || chapter.status === "in_progress";
                      const content = <><span className="flex min-w-0 items-start gap-2.5"><Icon name={passed ? "check" : chapter.viewable ? "play" : "lock"} size={14} className={`mt-0.5 shrink-0 ${passed ? "text-brand" : available ? "text-info" : "text-ink-muted"}`} /><span className="text-sm leading-5">{chapter.title}</span></span><span className="ml-2 flex shrink-0 items-center gap-1.5 text-xs text-ink-muted"><span>{chapter.lessonCount}<span className="hidden sm:inline"> {chapter.lessonCount === 1 ? "lesson" : "lessons"}</span></span>{chapter.viewable && <Icon name="chevronRight" size={13} />}</span></>;
                      return <li key={chapter.id}>{chapter.viewable ? <Link href={`/learn/${chapter.code}`} className="flex min-h-11 items-center justify-between rounded-lg px-2 py-2 text-ink transition-colors hover:bg-surface-raised hover:text-brand-bright">{content}</Link> : <span aria-disabled="true" className="flex min-h-11 items-center justify-between rounded-lg px-2 py-2 text-ink-muted">{content}</span>}</li>;
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
