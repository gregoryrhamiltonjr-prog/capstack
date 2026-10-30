"use client";

import { useState } from "react";
import { Icon } from "@/components/ui";
import { levelProgress } from "@/lib/xp";
import { careerStageLabel } from "@/lib/presentation";
import { MemberProfileModal, type MemberProfile } from "@/components/social/MemberProfileModal";

export type LeaderboardUser = { id: string; name: string; school: string; role: string; firm: string; xp: number; isMe?: boolean; avatarColor: string; currentStreak: number; jobArea: string };

export function LeaderboardList({ topUsers, currentUserId }: { topUsers: LeaderboardUser[]; currentUserId: string }) {
  const [selectedUser, setSelectedUser] = useState<MemberProfile | null>(null);
  return (
    <>
      <ol className="divide-y divide-line">
        {topUsers.length === 0 && <li className="px-5 py-10 text-center text-sm leading-6 text-ink-muted">No learners are listed yet. Your progress will appear here as the private cohort grows.</li>}
        {topUsers.map((member, index) => {
          const rank = levelProgress(member.xp);
          const metadata = [careerStageLabel(member.role), member.firm && member.firm !== "—" ? member.firm : "", member.school && member.school !== "—" ? member.school : ""].filter(Boolean).join(" · ");
          return <li key={member.id}><button type="button" aria-label={`View ${member.name}'s profile, rank ${index + 1}, ${member.xp.toLocaleString()} XP`} onClick={() => setSelectedUser({ id: member.id, displayName: member.name, avatarColor: member.avatarColor, careerStage: member.role, company: member.firm || null, school: member.school || null, jobArea: member.jobArea, xp: member.xp, currentStreak: member.currentStreak })} className={`grid min-h-16 w-full min-w-0 grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-2 px-3 py-3 text-left transition-colors hover:bg-surface-raised sm:grid-cols-[2.25rem_minmax(0,1fr)_auto] sm:gap-4 sm:px-4 ${member.isMe ? "bg-brand/5" : ""}`}>
            <span className={`text-center font-mono text-sm font-semibold tabnum ${index < 3 ? "text-gold" : "text-ink-muted"}`}>{index + 1}</span>
            <span className="flex min-w-0 items-center gap-2 sm:gap-3"><span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-canvas sm:h-10 sm:w-10" style={{ backgroundColor: member.avatarColor }}>{member.name.charAt(0)}</span><span className="min-w-0"><span className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-ink"><span className="truncate">{member.name}</span>{member.isMe && <span className="shrink-0 rounded bg-brand/10 px-1.5 py-0.5 text-[10px] text-brand-bright">You</span>}{index < 3 && <Icon name="trophy" size={12} className="hidden shrink-0 text-gold sm:block" />}</span><span className="mt-0.5 block truncate text-[11px] text-ink-muted">{metadata}</span></span></span>
            <span className="text-right"><span className="hidden max-w-32 text-xs font-semibold text-brand-bright sm:block">{rank.rank}</span><span className="mt-1 block font-mono text-[11px] text-ink-muted tabnum sm:text-xs">{member.xp.toLocaleString()} XP</span></span>
          </button></li>;
        })}
      </ol>
      {selectedUser && <MemberProfileModal profile={selectedUser} currentUserId={currentUserId} onClose={() => setSelectedUser(null)} />}
    </>
  );
}
