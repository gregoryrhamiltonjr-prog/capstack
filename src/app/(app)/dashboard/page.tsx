import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCourseState, findNextChapter } from "@/lib/progress";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { levelProgress } from "@/lib/xp";
import { MouseGlow, ScrubReveal, Magnetic } from "@/components/InteractiveWrappers";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const tracks = await getCourseState(user.id, user.freeRoam);
  const next = findNextChapter(tracks);
  const progress = levelProgress(user.xp);

  const recentActivity = [
    { day: "Mon", xp: 120 },
    { day: "Tue", xp: 340 },
    { day: "Wed", xp: 0 },
    { day: "Thu", xp: 210 },
    { day: "Fri", xp: 450 },
    { day: "Sat", xp: 80 },
    { day: "Sun", xp: 500 },
  ];
  const maxActivity = Math.max(...recentActivity.map((a) => a.xp), 1);
  const unlockedTracks = tracks.filter((t) => t.unlocked).length;
  const completedChapters = tracks.reduce(
    (n, t) => n + t.modules.reduce((m, mod) => m + mod.chapters.filter((c) => c.status === "passed" || c.status === "tested_out").length, 0),
    0
  );

  return (
    <div className="mx-auto max-w-5xl space-y-10 pb-20">
      <header className="flex flex-col justify-between gap-6 border-b border-line pb-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-ink">Dashboard</h1>
          <p className="mt-2 text-lg text-ink-muted">
            Welcome back, <span className="font-semibold text-ink">{user.displayName.split(" ")[0]}</span>.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="card flex items-center gap-3 border-brand/30 bg-brand/5 px-4 py-2">
            <Icon name="zap" size={18} className="text-brand-bright" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wide text-brand">Streak</div>
              <div className="text-lg font-black leading-none text-ink">{user.currentStreak}d</div>
            </div>
          </div>
          <div className="card flex items-center gap-3 border-gold/30 bg-gold/5 px-4 py-2">
            <Icon name="trophy" size={18} className="text-gold" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wide text-gold">Rank</div>
              <div className="text-lg font-black leading-none text-ink">{progress.rank}</div>
            </div>
          </div>
        </div>
      </header>

      <ScrubReveal className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {next ? (
            <MouseGlow className="card-raised border-l-4 border-l-info p-7">
              <div className="mb-2 flex items-center gap-2 text-info">
                <Icon name="target" size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Up next</span>
              </div>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">{next.chapter.title}</h2>
              <p className="mt-2 text-ink-muted">{next.chapter.objective}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link href={`/learn/${next.chapter.code}`} className="btn-primary px-6 py-2.5">
                    Continue learning
                  </Link>
                </Magnetic>
                <span className="flex items-center gap-1.5 text-sm text-ink-muted">
                  <Icon name="clock" size={14} /> ~15 min
                </span>
              </div>
            </MouseGlow>
          ) : (
            <MouseGlow className="card-raised border-l-4 border-l-brand p-7">
              <h2 className="text-2xl font-bold text-ink">You&apos;re all caught up</h2>
              <p className="mt-2 text-ink-muted">Browse the curriculum map for the next track.</p>
              <Link href="/map" className="btn-primary mt-6 inline-flex">
                View course map
              </Link>
            </MouseGlow>
          )}

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Tracks unlocked", value: unlockedTracks },
              { label: "Chapters passed", value: completedChapters },
              { label: "Total XP", value: user.xp.toLocaleString() },
            ].map((s) => (
              <div key={s.label} className="card bg-surface p-4">
                <div className="text-2xl font-black text-ink tabnum">{s.value}</div>
                <div className="mt-0.5 text-xs text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="card bg-surface p-6">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-ink-muted">Weekly XP</h3>
            <div className="flex h-36 items-end justify-between gap-2">
              {recentActivity.map((day, i) => {
                const heightPct = (day.xp / maxActivity) * 100;
                return (
                  <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                    <div className="relative flex h-full w-full items-end overflow-hidden rounded-t-md bg-surface-raised">
                      <div className="w-full rounded-t-md bg-brand/80 transition-all duration-500 group-hover:bg-brand" style={{ height: `${heightPct}%` }} />
                    </div>
                    <div className="text-[10px] uppercase text-ink-faint">{day.day}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card bg-surface-raised p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold text-ink">Rank progress</h3>
              <span className="text-sm font-bold text-brand tabnum">{user.xp.toLocaleString()} XP</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface">
              <div className="h-full rounded-full bg-gradient-to-r from-info to-brand" style={{ width: `${progress.pct}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs text-ink-muted">
              <span>{progress.rank}</span>
              <span>{progress.nextRank ?? "Max"}</span>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="mb-3 font-bold text-ink">Weekly goal</h3>
            <p className="text-sm text-ink-muted">
              Target: <span className="font-semibold text-ink">{user.weeklyGoal} lessons</span>
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-raised">
              <div className="h-full w-[70%] rounded-full bg-brand" />
            </div>
            <p className="mt-2 text-xs font-medium text-brand">On track</p>
          </div>

          <div className="card border-line p-5">
            <h3 className="mb-2 font-bold text-ink">How XP works</h3>
            <p className="text-sm leading-relaxed text-ink-muted">
              Complete lessons and pass chapter quizzes (70%+) to climb the ladder. Streaks add a small daily bonus.
            </p>
          </div>
        </div>
      </ScrubReveal>
    </div>
  );
}
