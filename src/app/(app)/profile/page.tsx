import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Icon } from "@/components/ui";
import { levelProgress } from "@/lib/xp";
import { MouseGlow, ScrubReveal } from "@/components/InteractiveWrappers";
import { ProfileAvatarUpload } from "@/components/ProfileAvatarUpload";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const progress = levelProgress(user.xp);

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-20">
      <ScrubReveal className="space-y-6">
        <MouseGlow className="card-raised overflow-hidden bg-surface">
          <div className="h-24 bg-gradient-to-r from-brand/20 via-info/15 to-transparent" />
          <div className="relative space-y-5 p-6 pt-0 sm:p-8 sm:pt-0">
            <div className="-mt-10">
              <ProfileAvatarUpload name={user.displayName} color={user.avatarColor} url={user.avatarUrl} />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{user.displayName}</h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
                <span className="flex items-center gap-1">
                  <Icon name="briefcase" size={13} /> {user.careerStage}
                </span>
                {user.company && (
                  <span className="flex items-center gap-1">
                    <Icon name="building" size={13} /> {user.company}
                  </span>
                )}
                {user.school && (
                  <span className="flex items-center gap-1">
                    <Icon name="book" size={13} /> {user.school}
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-4 border-t border-line pt-5 sm:grid-cols-3">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-ink-muted">Rank</div>
                <div className="text-lg font-bold text-brand">{progress.rank}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-ink-muted">Total XP</div>
                <div className="text-lg font-bold text-ink tabnum">{user.xp.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-ink-muted">Longest streak</div>
                <div className="text-lg font-bold text-ink tabnum">{user.longestStreak} days</div>
              </div>
            </div>
          </div>
        </MouseGlow>

        <div className="card p-6">
          <h2 className="mb-4 text-lg font-bold text-ink">Badges</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="card flex flex-col items-center border-brand/25 bg-surface-raised p-4 text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Icon name="check" size={20} />
              </div>
              <div className="text-sm font-bold">CRE Foundations</div>
              <div className="mt-0.5 text-xs text-ink-muted">In progress</div>
            </div>
            <div className="card flex flex-col items-center border-line bg-surface-raised p-4 text-center opacity-45">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-canvas text-ink-faint">
                <Icon name="lock" size={18} />
              </div>
              <div className="text-sm font-bold">Debt Markets</div>
              <div className="mt-0.5 text-xs text-ink-muted">Locked</div>
            </div>
            <div className="card flex flex-col items-center border-line bg-surface-raised p-4 text-center opacity-45">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-canvas text-ink-faint">
                <Icon name="lock" size={18} />
              </div>
              <div className="text-sm font-bold">LBO Modeling</div>
              <div className="mt-0.5 text-xs text-ink-muted">Locked</div>
            </div>
          </div>
        </div>
      </ScrubReveal>
    </div>
  );
}
