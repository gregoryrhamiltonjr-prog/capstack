import { getCurrentUser } from "@/lib/auth";
import { getCourseState } from "@/lib/progress";
import { effectiveFreeRoam } from "@/lib/subscription";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { MouseGlow, ScrubReveal, Tilt3D, ParallaxLayer, ScrubStagger } from "@/components/InteractiveWrappers";

export default async function MapPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const tracks = await getCourseState(user.id, effectiveFreeRoam(user));
  const cre = tracks.filter((t) => t.realm === "cre").length;
  const hf = tracks.filter((t) => t.realm === "hf").length;

  return (
    <div className="mx-auto max-w-5xl space-y-10 pb-20">
      <header className="border-b border-line pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink">Courses</h1>
        <p className="mt-2 text-lg text-ink-muted">Your path from foundations to desk-ready — courses, units, and modules in order.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="chip !border-brand/30 !text-brand-bright">{cre} CRE courses</span>
          <span className="chip !border-info/40 !text-info">{hf} High Finance courses</span>
        </div>
      </header>

      <ParallaxLayer depth={5}>
      <ScrubReveal className="space-y-12">
        {tracks.map((track) => (
          <div key={track.id} className="relative">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-3">
                  {track.complete ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-canvas shadow-glow">
                      <Icon name="check" size={14} />
                    </div>
                  ) : track.unlocked ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand text-brand">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-brand" />
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-line text-ink-faint">
                      <Icon name="lock" size={12} />
                    </div>
                  )}
                  <Link href={`/course/${track.code}`} className="text-2xl font-bold text-ink transition-colors hover:text-brand">
                    {track.title}
                  </Link>
                  {track.flagship && <span className="chip !border-gold/30 !bg-gold/10 !text-gold">Flagship</span>}
                  <span className={`chip ${track.realm === "cre" ? "!border-brand/30 !text-brand" : "!border-info/40 !text-info"}`}>
                    {track.realm === "cre" ? "CRE" : "HF"}
                  </span>
                </div>
                <p className="ml-9 text-sm text-ink-muted">
                  {track.tagline} · {track.tier} · {track.estHours}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-3xl font-black text-brand tabnum">{track.progressPct}%</div>
                <div className="text-xs uppercase tracking-wider text-ink-muted">Completed</div>
                <Link href={`/course/${track.code}`} className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline">
                  Open course <Icon name="chevronRight" size={12} />
                </Link>
              </div>
            </div>

            <ScrubStagger className={`ml-9 grid gap-4 md:grid-cols-2 ${!track.unlocked ? "pointer-events-none opacity-40" : ""}`}>
              {track.modules.map((mod) => (
                <div key={mod.id} data-stagger-item className="h-full">
                <Tilt3D intensity={3} className="h-full">
                <MouseGlow
                  className={`card-raised h-full border-l-4 bg-surface p-5 ${
                    mod.complete ? "border-l-brand" : mod.unlocked ? "border-l-info" : "border-l-line"
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold leading-tight text-ink">
                      {mod.title}
                    </h3>
                    {!mod.unlocked && <Icon name="lock" size={16} className="shrink-0 text-ink-faint" />}
                    {mod.complete && <Icon name="check" size={16} className="shrink-0 text-brand" />}
                  </div>
                  <p className="mb-4 text-sm text-ink-muted">{mod.description}</p>

                  <div className="space-y-1 border-t border-line/50 pt-3">
                    {mod.chapters.map((chap) => {
                      const isPassed = chap.status === "passed" || chap.status === "tested_out";
                      const isAvail = chap.status === "available" || chap.status === "in_progress";

                      return (
                        <Link
                          key={chap.id}
                          href={chap.viewable ? `/learn/${chap.code}` : "#"}
                          className={`group flex items-center justify-between rounded-lg px-2 py-2 transition-colors ${
                            chap.viewable ? "cursor-pointer hover:bg-surface-raised" : "cursor-not-allowed opacity-50"
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <Icon
                              name={isPassed ? "check" : isAvail ? "play" : "lock"}
                              size={14}
                              className={isPassed ? "text-brand" : isAvail ? "text-info" : "text-ink-faint"}
                            />
                            <span className={`truncate text-sm ${isAvail ? "font-semibold text-ink" : isPassed ? "text-ink" : "text-ink-muted"}`}>
                              {chap.title}
                            </span>
                          </div>
                          <div className="ml-2 flex shrink-0 items-center gap-2 text-xs text-ink-muted">
                            <span className="hidden sm:inline">{chap.lessonCount} lessons</span>
                            {chap.viewable && (
                              <Icon name="chevronRight" size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </MouseGlow>
                </Tilt3D>
                </div>
              ))}
            </ScrubStagger>
          </div>
        ))}
      </ScrubReveal>
      </ParallaxLayer>
    </div>
  );
}
