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
        <div className="lg:col-span-2">
          <div className="card overflow-hidden bg-surface p-0">
            {/* Ledger header — the deal-desk ranking */}
            <div className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-4 border-b border-line-strong px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
              <span className="text-center">#</span>
              <span>Member</span>
              <span className="text-right">Tier · XP</span>
            </div>
            <div className="divide-y divide-line">
              {topUsers.map((u, i) => {
                const rankInfo = levelProgress(u.xp);
                const isTop3 = i < 3;
                return (
                  <MouseGlow
                    key={i}
                    className={`relative grid grid-cols-[2.25rem_1fr_auto] items-center gap-4 px-4 py-3.5 transition-colors ${u.isMe ? "bg-brand/[0.06]" : "hover:bg-surface-raised/60"}`}
                  >
                    {u.isMe && <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-brand" />}
                    <div className={`text-center font-mono text-base font-bold tabnum ${isTop3 ? "text-gold" : "text-ink-faint"}`}>{i + 1}</div>
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface-raised text-sm font-bold text-ink-muted">
                        {u.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 font-bold text-ink">
                          <span className="truncate">{u.name}</span>
                          {u.isMe && <span className="chip !border-none !bg-brand/20 !px-2 !py-0.5 !text-[10px] !text-brand">You</span>}
                          {isTop3 && <Icon name="trophy" size={13} className="shrink-0 text-gold" />}
                        </div>
                        <div className="mt-0.5 truncate text-xs text-ink-muted">
                          {u.role} @ {u.firm} · {u.school}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold" style={{ color: rankInfo.prestige ? "#F5B301" : "#C79A3A" }}>
                        {rankInfo.rank}
                      </div>
                      <div className="font-mono text-xs text-ink-muted tabnum">{u.xp.toLocaleString()} XP</div>
                    </div>
                  </MouseGlow>
                );
              })}
            </div>
          </div>
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
