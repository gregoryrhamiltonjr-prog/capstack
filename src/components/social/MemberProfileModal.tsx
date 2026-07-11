"use client";

import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui";
import { levelProgress } from "@/lib/xp";
import { openDmAction, requestPartnerAction } from "@/lib/actions";
import { UserAvatar } from "@/components/UserAvatar";

export type MemberProfile = {
  id: string;
  displayName: string;
  avatarColor: string;
  avatarUrl?: string | null;
  careerStage: string;
  company: string | null;
  school: string | null;
  jobArea: string;
  xp: number;
  currentStreak: number;
  groupRole?: string;
};

export type PartnerButtonStatus = "none" | "pending" | "partner" | "incoming";

export function MemberProfileModal({
  profile,
  currentUserId,
  partnerStatus = "none",
  onClose,
  onPartnerStatusChange,
}: {
  profile: MemberProfile;
  currentUserId: string;
  partnerStatus?: PartnerButtonStatus;
  onClose: () => void;
  onPartnerStatusChange?: (userId: string, status: PartnerButtonStatus) => void;
}) {
  const isSelf = profile.id === currentUserId;
  const progress = levelProgress(profile.xp);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<PartnerButtonStatus>(partnerStatus);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setStatus(partnerStatus);
  }, [partnerStatus, profile.id]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const partnerLabel =
    status === "pending" ? "Pending" : status === "partner" ? "Partners" : status === "incoming" ? "Respond on Social" : "Partner";

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="member-profile-title">
      <button type="button" className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onClose} aria-label="Close profile" />
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl animate-fade-up">
        <div className="h-20 bg-gradient-to-r from-brand/25 via-info/15 to-transparent" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg border border-line bg-surface/80 p-1.5 text-ink-muted hover:text-ink"
          aria-label="Close"
        >
          <Icon name="x" size={14} />
        </button>

        <div className="px-5 pb-5">
          <div className="-mt-10 mb-3">
            <UserAvatar
              name={profile.displayName}
              color={profile.avatarColor}
              url={profile.avatarUrl}
              size={64}
              rounded="2xl"
              className="border-4 border-surface shadow-lg"
            />
          </div>

          <h2 id="member-profile-title" className="text-xl font-extrabold text-ink">
            {profile.displayName}
            {isSelf && <span className="ml-2 text-xs font-medium text-ink-faint">(you)</span>}
          </h2>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
            <span className="capitalize">{profile.careerStage.replace("_", " ")}</span>
            {profile.groupRole && (
              <>
                <span className="text-ink-faint">·</span>
                <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-bold capitalize text-brand">
                  {profile.groupRole}
                </span>
              </>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-line bg-canvas px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wide text-ink-faint">Rank</div>
              <div className="mt-0.5 text-sm font-bold text-brand">{progress.rank}</div>
            </div>
            <div className="rounded-xl border border-line bg-canvas px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wide text-ink-faint">XP</div>
              <div className="mt-0.5 text-sm font-bold text-ink tabnum">{profile.xp.toLocaleString()}</div>
            </div>
            <div className="rounded-xl border border-line bg-canvas px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wide text-ink-faint">Streak</div>
              <div className="mt-0.5 text-sm font-bold text-ink">{profile.currentStreak} days</div>
            </div>
            <div className="rounded-xl border border-line bg-canvas px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wide text-ink-faint">Level</div>
              <div className="mt-0.5 text-sm font-bold text-ink">L{progress.level}</div>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            {profile.company && (
              <div className="flex items-center gap-2 text-ink-muted">
                <Icon name="building" size={14} className="shrink-0 text-ink-faint" />
                <span className="truncate">{profile.company}</span>
              </div>
            )}
            {profile.school && (
              <div className="flex items-center gap-2 text-ink-muted">
                <Icon name="book" size={14} className="shrink-0 text-ink-faint" />
                <span className="truncate">{profile.school}</span>
              </div>
            )}
            {profile.jobArea && (
              <div className="flex items-center gap-2 text-ink-muted">
                <Icon name="briefcase" size={14} className="shrink-0 text-ink-faint" />
                <span className="truncate capitalize">{profile.jobArea.replace(/_/g, " ")}</span>
              </div>
            )}
          </div>

          {!isSelf && (
            <div className="mt-5 space-y-2">
              {error && (
                <div className="rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">{error}</div>
              )}
              <div className="flex gap-2">
                <form action={openDmAction} className="flex-1">
                  <input type="hidden" name="otherUserId" value={profile.id} />
                  <button type="submit" className="btn-primary w-full py-2 text-sm">
                    Message
                  </button>
                </form>
                {status === "none" ? (
                  <form
                    className="flex-1"
                    action={(fd) => {
                      setError(null);
                      startTransition(async () => {
                        const result = await requestPartnerAction(fd);
                        if (!result.ok) {
                          setError(result.error);
                          return;
                        }
                        if (result.status === "already_partners") {
                          setStatus("partner");
                          onPartnerStatusChange?.(profile.id, "partner");
                        } else {
                          setStatus("pending");
                          onPartnerStatusChange?.(profile.id, "pending");
                        }
                      });
                    }}
                  >
                    <input type="hidden" name="targetUserId" value={profile.id} />
                    <button type="submit" className="btn-ghost w-full py-2 text-sm" disabled={pending}>
                      {pending ? "Sending…" : "Partner"}
                    </button>
                  </form>
                ) : (
                  <button type="button" className="btn-ghost flex-1 py-2 text-sm opacity-70" disabled>
                    {partnerLabel}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
