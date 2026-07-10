import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Icon } from "@/components/ui";
import { levelProgress } from "@/lib/xp";
import { ScrubReveal, Tilt3D, ParticleField, ParallaxLayer } from "@/components/InteractiveWrappers";
import { LeaderboardList, type LeaderboardUser } from "@/components/leaderboard/LeaderboardList";

export default async function LeaderboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const topUsers: LeaderboardUser[] = [
    { id: "fake-1", name: "Alex V.", school: "Wharton", role: "Analyst", firm: "Apollo", xp: 24500, avatarColor: "#3B82F6", currentStreak: 45, jobArea: "private_equity" },
    { id: "fake-2", name: "Sarah M.", school: "Harvard", role: "Associate", firm: "Blackstone", xp: 21200, avatarColor: "#10B981", currentStreak: 32, jobArea: "real_estate" },
    { id: "fake-3", name: "David K.", school: "Stern", role: "VP", firm: "Starwood", xp: 19800, avatarColor: "#F59E0B", currentStreak: 28, jobArea: "real_estate" },
    { id: "fake-4", name: "Jessica L.", school: "Stanford", role: "Analyst", firm: "KKR", xp: 15400, avatarColor: "#8B5CF6", currentStreak: 15, jobArea: "private_equity" },
    { id: user.id, name: user.displayName, school: user.school || "—", role: user.careerStage, firm: user.company || "—", xp: user.xp, isMe: true, avatarColor: user.avatarColor, currentStreak: user.currentStreak, jobArea: user.jobArea },
    { id: "fake-6", name: "Michael R.", school: "Booth", role: "Student", firm: "—", xp: 8200, avatarColor: "#EF4444", currentStreak: 5, jobArea: "investment_banking" },
    { id: "fake-7", name: "Emily W.", school: "Columbia", role: "Analyst", firm: "Goldman", xp: 7900, avatarColor: "#EC4899", currentStreak: 2, jobArea: "investment_banking" },
  ].sort((a, b) => b.xp - a.xp);

  const myRank = topUsers.findIndex((u) => u.isMe) + 1;
  const me = levelProgress(user.xp);

  return (
    <div className="mx-auto max-w-5xl pb-20 relative min-h-screen">
      {/* Cinematic Background Elements */}
      <ParticleField count={30} className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />

      {/* Content wrapper with Parallax */}
      <ParallaxLayer depth={10} className="relative z-10 space-y-10 pt-10">
        <header className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-ink">Leaderboard</h1>
          <p className="mt-2 text-lg text-ink-muted">How you rank against the street.</p>
        </div>
        <div className="flex gap-2">
          <span className="chip cursor-default !bg-brand/10 !border-brand/30 !text-brand">All time</span>
        </div>
      </header>

      <ScrubReveal className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tilt3D intensity={5}>
            <div className="card overflow-hidden bg-surface/80 backdrop-blur-md p-0 shadow-2xl border-white/5 border">
            {/* Ledger header — the deal-desk ranking */}
            <div className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-4 border-b border-line-strong px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
              <span className="text-center">#</span>
              <span>Member</span>
              <span className="text-right">Tier · XP</span>
            </div>
            <LeaderboardList topUsers={topUsers} currentUserId={user.id} />
          </div>
          </Tilt3D>
        </div>

        <div className="space-y-5">
          <Tilt3D intensity={8}>
            <div className="card bg-surface-raised/80 backdrop-blur-md p-5 border border-white/5">
              <h3 className="mb-4 font-bold text-ink">Your standing</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-line pb-3">
                  <span className="text-ink-muted">Global rank</span>
                  <span className="font-bold text-brand tabnum">#{myRank}</span>
                </div>
                <div className="flex justify-between border-b border-line pb-3">
                  <span className="text-ink-muted">Total XP</span>
                  <span className="font-bold text-ink tabnum">{user.xp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Current rank</span>
                  <span className="font-bold text-ink">{me.rank}</span>
                </div>
              </div>
            </div>
          </Tilt3D>
          <Tilt3D intensity={8}>
            <div className="card border-l-4 border-l-info bg-surface-raised/80 backdrop-blur-md p-5 border border-white/5">
              <h3 className="mb-1 font-bold text-ink">Climb quietly</h3>
              <p className="text-sm leading-relaxed text-ink-muted">
                XP comes from finishing lessons and clearing module quizzes. No gimmicks — just reps.
              </p>
            </div>
          </Tilt3D>
        </div>
      </ScrubReveal>
      </ParallaxLayer>
    </div>
  );
}
