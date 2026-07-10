import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Icon } from "@/components/ui";
import { levelProgress } from "@/lib/xp";
import { MouseGlow, ScrubReveal } from "@/components/InteractiveWrappers";

export default async function LeaderboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const topUsers = [
    { name: "Alex V.", school: "Wharton", role: "Analyst", firm: "Apollo", xp: 24500 },
    { name: "Sarah M.", school: "Harvard", role: "Associate", firm: "Blackstone", xp: 21200 },
    { name: "David K.", school: "Stern", role: "VP", firm: "Starwood", xp: 19800 },
    { name: "Jessica L.", school: "Stanford", role: "Analyst", firm: "KKR", xp: 15400 },
    { name: user.displayName, school: user.school || "—", role: user.careerStage, firm: user.company || "—", xp: user.xp, isMe: true },
    { name: "Michael R.", school: "Booth", role: "Student", firm: "—", xp: 8200 },
    { name: "Emily W.", school: "Columbia", role: "Analyst", firm: "Goldman", xp: 7900 },
  ].sort((a, b) => b.xp - a.xp);

  const myRank = topUsers.findIndex((u) => u.isMe) + 1;
  const me = levelProgress(user.xp);

  return (
    <div className="mx-auto max-w-5xl space-y-10 pb-20">
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
        <div className="space-y-3 lg:col-span-2">
          {topUsers.map((u, i) => {
            const rankInfo = levelProgress(u.xp);
            const isTop3 = i < 3;
            return (
              <MouseGlow
                key={i}
                className={`card flex items-center justify-between p-4 ${u.isMe ? "border-brand/40 bg-brand/5" : "bg-surface"}`}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className={`w-8 text-center text-lg font-black ${isTop3 ? "text-gold" : "text-ink-muted"}`}>#{i + 1}</div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface-raised text-sm font-bold text-ink-muted">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-bold text-ink">
                        {u.name}
                        {u.isMe && <span className="chip !border-none !bg-brand/20 !px-2 !py-0.5 !text-[10px] !text-brand">You</span>}
                        {isTop3 && <Icon name="trophy" size={13} className="text-gold" />}
                      </div>
                      <div className="mt-0.5 text-xs text-ink-muted">
                        {u.role} @ {u.firm} · {u.school}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden text-right sm:block">
                  <div className="text-sm font-bold" style={{ color: rankInfo.prestige ? "#F5B301" : "#39FF14" }}>
                    {rankInfo.rank}
                  </div>
                  <div className="text-xs text-ink-muted tabnum">{u.xp.toLocaleString()} XP</div>
                </div>
              </MouseGlow>
            );
          })}
        </div>

        <div className="space-y-5">
          <div className="card bg-surface-raised p-5">
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
          <div className="card border-l-4 border-l-info p-5">
            <h3 className="mb-1 font-bold text-ink">Climb quietly</h3>
            <p className="text-sm leading-relaxed text-ink-muted">
              XP comes from finishing lessons and clearing chapter quizzes. No gimmicks — just reps.
            </p>
          </div>
        </div>
      </ScrubReveal>
    </div>
  );
}
