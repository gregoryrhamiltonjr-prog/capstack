import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { levelProgress } from "@/lib/xp";
import { db } from "@/lib/db";
import { LeaderboardList, type LeaderboardUser } from "@/components/leaderboard/LeaderboardList";

export default async function LeaderboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/");

  // Private access currently admits provisioned admins only. Do not present
  // hard-coded examples or inaccessible demo accounts as real competition.
  const members = await db.user.findMany({
    where: { onboarded: true, isAdmin: true },
    select: { id: true, displayName: true, school: true, careerStage: true, company: true, xp: true, avatarColor: true, currentStreak: true, jobArea: true },
    orderBy: [{ xp: "desc" }, { id: "asc" }],
    take: 100,
  });
  const topUsers: LeaderboardUser[] = members.map((member) => ({ id: member.id, name: member.displayName, school: member.school ?? "", role: member.careerStage, firm: member.company ?? "", xp: member.xp, avatarColor: member.avatarColor, currentStreak: member.currentStreak, jobArea: member.jobArea, isMe: member.id === user.id }));
  const index = topUsers.findIndex((member) => member.id === user.id);
  const rank = levelProgress(user.xp);

  return (
    <div className="mx-auto max-w-5xl space-y-7 pb-8">
      <header className="border-b border-line pb-6"><h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Leaderboard</h1><p className="mt-2 text-sm leading-7 text-ink-muted sm:text-base">Real progress from the private-access cohort. Ranked by all-time XP.</p><span className="chip mt-3">Top 100 · All time</span></header>
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="min-w-0 overflow-hidden rounded-2xl border border-line bg-surface" aria-label="Cohort leaderboard"><div className="grid grid-cols-[1.5rem_minmax(0,1fr)_auto] gap-2 border-b border-line px-3 py-3 text-[10px] font-semibold uppercase tracking-wider text-ink-muted sm:grid-cols-[2.25rem_minmax(0,1fr)_auto] sm:gap-4 sm:px-4"><span className="text-center">#</span><span>Member</span><span className="text-right">XP</span></div><LeaderboardList topUsers={topUsers} currentUserId={user.id} /></section>
        <aside className="space-y-5"><section className="card p-5"><h2 className="mb-4 font-semibold text-ink">Your standing</h2><dl className="space-y-3 text-sm"><div className="flex justify-between gap-3 border-b border-line pb-3"><dt className="text-ink-muted">Cohort rank</dt><dd className="font-semibold text-brand-bright">{index >= 0 ? `#${index + 1}` : "Outside top 100"}</dd></div><div className="flex justify-between gap-3 border-b border-line pb-3"><dt className="text-ink-muted">Total XP</dt><dd className="font-semibold text-ink tabnum">{user.xp.toLocaleString()}</dd></div><div className="flex justify-between gap-3"><dt className="text-ink-muted">Current rank</dt><dd className="font-semibold text-ink">{rank.rank}</dd></div></dl></section><section className="card p-5"><h2 className="font-semibold text-ink">Build your momentum</h2><p className="mt-2 text-sm leading-6 text-ink-muted">Finish lessons and pass chapter quizzes to earn XP. Rankings update as learners progress.</p></section></aside>
      </div>
    </div>
  );
}
