"use client";

import { useState } from "react";
import { Icon } from "@/components/ui";
import { levelProgress } from "@/lib/xp";
import { MouseGlow, ScrubStagger } from "@/components/InteractiveWrappers";
import { MemberProfileModal, type MemberProfile } from "@/components/social/MemberProfileModal";

export type LeaderboardUser = {
  id: string;
  name: string;
  school: string;
  role: string;
  firm: string;
  xp: number;
  isMe?: boolean;
  avatarColor: string;
  currentStreak: number;
  jobArea: string;
};

export function LeaderboardList({
  topUsers,
  currentUserId,
}: {
  topUsers: LeaderboardUser[];
  currentUserId: string;
}) {
  const [selectedUser, setSelectedUser] = useState<MemberProfile | null>(null);

  return (
    <>
      <ScrubStagger className="divide-y divide-line">
        {topUsers.map((u, i) => {
          const rankInfo = levelProgress(u.xp);
          const isTop3 = i < 3;
          return (
            <div key={u.id} data-stagger-item onClick={() => {
                  setSelectedUser({
                    id: u.id,
                    displayName: u.name,
                    avatarColor: u.avatarColor,
                    careerStage: u.role,
                    company: u.firm !== "—" ? u.firm : null,
                    school: u.school !== "—" ? u.school : null,
                    jobArea: u.jobArea,
                    xp: u.xp,
                    currentStreak: u.currentStreak,
                  });
                }} className="cursor-pointer">
              <MouseGlow
                className={`relative transition-colors ${u.isMe ? "bg-brand/[0.06]" : "hover:bg-surface-raised/60"}`}
              >
                <div className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-4 px-4 py-3.5">
                  {u.isMe && <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-brand" />}
                  <div className={`text-center font-mono text-base font-bold tabnum ${isTop3 ? "text-gold" : "text-ink-faint"}`}>{i + 1}</div>
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface-raised text-sm font-bold text-canvas"
                      style={{ backgroundColor: u.avatarColor }}
                    >
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
                </div>
              </MouseGlow>
            </div>
          );
        })}
      </ScrubStagger>

      {selectedUser && (
        <MemberProfileModal
          profile={selectedUser}
          currentUserId={currentUserId}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
}
