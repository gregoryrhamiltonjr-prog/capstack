import Link from "next/link";
import { Icon } from "@/components/ui";
import { levelProgress } from "@/lib/xp";
import { weeklyGoalProgress, type ActivityDay } from "@/lib/dashboard";

export type DashboardViewProps = {
  name: string;
  xp: number;
  streak: number;
  weeklyGoal: number;
  lessonsThisWeek: number;
  unlockedCourses: number;
  completedChapters: number;
  totalChapters: number;
  activity: ActivityDay[];
  weekLabel: string;
  next: { title: string; objective: string; code: string; course: string; lessons: number } | null;
};

function Meter({ label, pct, detail }: { label: string; pct: number; detail: string }) {
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-valuetext={detail} className="h-2 overflow-hidden rounded-full bg-white/5">
      <div className="h-full rounded-full bg-gradient-to-r from-brand to-gold-soft" style={{ width: `${pct}%` }} />
    </div>
  );
}

// Server-rendered by design: essential content never waits for scroll, pointer
// effects, animation initialization, or hydration to become visible.
export function DashboardView(props: DashboardViewProps) {
  const { next, activity } = props;
  const firstName = props.name.trim().split(/\s+/)[0] || "Learner";
  const rank = levelProgress(props.xp);
  const goal = weeklyGoalProgress(props.lessonsThisWeek, props.weeklyGoal);
  const activityTotal = activity.reduce((sum, day) => sum + day.xp, 0);
  const maxActivity = Math.max(1, ...activity.map((day) => day.xp));
  const activeDays = activity.filter((day) => day.xp > 0).length;
  const stats = [
    { label: "Lessons this week", value: goal.completed.toLocaleString(), detail: `of ${goal.target} in your goal`, icon: "book" },
    { label: "Courses unlocked", value: props.unlockedCourses.toLocaleString(), detail: "ready to explore", icon: "layers" },
    { label: "Chapters cleared", value: props.completedChapters.toLocaleString(), detail: `of ${props.totalChapters.toLocaleString()} chapters`, icon: "check" },
    { label: "Total XP", value: props.xp.toLocaleString(), detail: `Level ${rank.level} · ${rank.rank}`, icon: "bolt" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-7 pb-4 sm:space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright"><span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" /> Your learning desk</p>
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Welcome back, {firstName}.</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">Build your edge. One concept, one model, one step up the stack.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm text-brand-bright">
          <Icon name="flame" size={17} /><span className="font-semibold tabnum">{props.streak}-day streak</span>
        </div>
      </header>

      <section aria-labelledby="focus-heading" className="relative isolate overflow-hidden rounded-3xl border border-brand/25 bg-surface p-6 shadow-card sm:p-8 lg:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(199,154,58,0.15),transparent_65%)]" />
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_190px]">
          <div>
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-bright"><Icon name="compass" size={16} /> {next ? "Your next move" : "A milestone worth taking in"}</p>
            {next && <p className="mb-2 text-xs font-medium text-ink-muted">{next.course}</p>}
            <h2 id="focus-heading" className="max-w-2xl text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">{next?.title ?? "You’re all caught up."}</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-ink-muted sm:text-base">{next?.objective ?? "Revisit a favorite concept or explore the course map. Keep your foundation sharp while new courses take shape."}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href={next ? `/learn/${next.code}` : "/map"} className="btn-primary min-h-12 px-6">{next ? "Continue learning" : "Explore course map"}<Icon name="arrowRight" size={17} /></Link>
              {next && <span className="flex items-center gap-1.5 text-xs text-ink-muted"><Icon name="book" size={15} />{next.lessons} {next.lessons === 1 ? "lesson" : "lessons"} in this chapter</span>}
            </div>
          </div>
          <div className="hidden rounded-2xl border border-white/5 bg-canvas/50 p-5 md:block">
            <div className="mb-5 flex items-center justify-between"><span className="text-xs uppercase tracking-wider text-ink-muted">Your rank</span><Icon name="trophy" className="text-brand" size={18} /></div>
            <p className="text-4xl font-bold tracking-tight text-ink tabnum"><span className="mr-1 text-sm font-medium text-ink-muted">LVL</span>{rank.level.toString().padStart(2, "0")}</p>
            <p className="mt-1 text-sm font-semibold text-brand-bright">{rank.rank}</p>
            <div className="mt-5"><Meter label="Rank progress" pct={rank.pct} detail={rank.nextRank ? `${rank.xpToNext} XP to ${rank.nextRank}` : "Maximum rank reached"} /></div>
            <p className="mt-3 text-xs leading-5 text-ink-muted">{rank.nextRank ? `${rank.xpToNext.toLocaleString()} XP to ${rank.nextRank}` : "Top of the stack."}</p>
          </div>
        </div>
      </section>

      <section aria-label="Learning overview" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-line bg-surface/70 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-2"><p className="text-xs font-medium text-ink-muted">{stat.label}</p><Icon name={stat.icon} size={16} className="shrink-0 text-brand/80" /></div>
            <p className="text-3xl font-bold tracking-tight text-ink tabnum">{stat.value}</p>
            <p className="mt-1.5 text-[11px] leading-5 text-ink-muted">{stat.detail}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <section aria-labelledby="activity-heading" className="rounded-2xl border border-line bg-surface/70 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><h2 id="activity-heading" className="font-semibold text-ink">Momentum</h2><p className="mt-1 text-xs text-ink-muted">Last 7 days · UTC</p></div>
            <p className="text-right text-xl font-bold text-ink tabnum">{activityTotal.toLocaleString()} <span className="text-xs font-medium text-brand-bright">XP</span></p>
          </div>
          <ul aria-label="Daily XP activity" className="mt-6 grid grid-cols-7 gap-2 sm:gap-4">
            {activity.map((day) => (
              <li key={day.key} className="min-w-0 text-center">
                <span className="sr-only">{day.key}: {day.xp} XP{day.today ? ", today" : ""}.</span>
                <div aria-hidden="true" className="flex h-28 flex-col justify-end gap-1.5 sm:h-32">
                  <span className="text-[10px] font-medium text-ink-muted tabnum">{day.xp.toLocaleString()}</span>
                  <div className="flex h-24 items-end rounded-md bg-white/[0.03]">
                    <div className={day.today ? "w-full rounded-md bg-gradient-to-t from-brand/70 to-gold-soft" : "w-full rounded-md bg-brand/35"} style={{ height: `${Math.max(0, (day.xp / maxActivity) * 100)}%` }} />
                  </div>
                </div>
                <p aria-hidden="true" className={`mt-3 text-[10px] font-medium ${day.today ? "text-brand-bright" : "text-ink-muted"}`}>{day.label}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-line pt-4 text-xs leading-5 text-ink-muted">{activeDays === 0 ? "A fresh start. Finish your first lesson to bring this chart to life." : `${activeDays} active ${activeDays === 1 ? "day" : "days"} in the last week. Small sessions build a strong foundation.`}</p>
        </section>

        <div className="space-y-5">
          <section aria-labelledby="goal-heading" className="rounded-2xl border border-line bg-surface/70 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3"><h2 id="goal-heading" className="font-semibold text-ink">Weekly commitment</h2><Link href="/settings" aria-label="Edit weekly learning goal" className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"><Icon name="settings" size={16} /></Link></div>
            <p className="text-xs text-ink-muted">{props.weekLabel} · UTC</p>
            <p className="mb-4 mt-5 text-3xl font-bold text-ink tabnum">{goal.completed}<span className="ml-1 text-base font-medium text-ink-muted">/ {goal.target} lessons</span></p>
            <Meter label="Weekly lesson goal" pct={goal.pct} detail={`${goal.completed} of ${goal.target} lessons completed`} />
            <p className="mt-3 text-xs leading-5 text-ink-muted">{goal.reached ? "Goal reached. Every extra lesson is a bonus." : `${goal.remaining} more ${goal.remaining === 1 ? "lesson" : "lessons"} to reach your goal. You set the pace.`}</p>
          </section>
          <Link href="/map" className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-5 transition-colors hover:border-brand/40 hover:bg-surface-raised">
            <span className="rounded-xl bg-brand/10 p-3 text-brand-bright"><Icon name="map" size={22} /></span>
            <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-ink">See the bigger picture</span><span className="mt-1 block text-xs leading-5 text-ink-muted">Explore CRE and high finance.</span></span><Icon name="arrowRight" size={17} className="shrink-0 text-ink-muted transition-transform motion-safe:group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
