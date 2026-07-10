"use client";

import { useMemo, useState } from "react";
import { ChatBox } from "./ChatBox";
import { MemberProfileModal, type MemberProfile, type PartnerButtonStatus } from "./MemberProfileModal";
import { UserAvatar } from "@/components/UserAvatar";

type Message = {
  id: string;
  body: string;
  createdAt: Date | string;
  senderId: string;
  sender: { id: string; displayName: string; avatarColor: string };
  attachmentName?: string | null;
  attachmentMime?: string | null;
  attachmentUrl?: string | null;
  attachmentSize?: number | null;
};

export function GroupRoom({
  channelId,
  messages,
  currentUserId,
  groupName,
  members,
  partnerStatuses = {},
}: {
  channelId: string;
  messages: Message[];
  currentUserId: string;
  groupName: string;
  members: MemberProfile[];
  /** Map of userId -> partner relationship from the current user's perspective */
  partnerStatuses?: Record<string, PartnerButtonStatus>;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [localStatus, setLocalStatus] = useState<Record<string, PartnerButtonStatus>>({});

  const byId = useMemo(() => {
    const m = new Map<string, MemberProfile>();
    for (const p of members) m.set(p.id, p);
    return m;
  }, [members]);

  const selected = selectedId ? byId.get(selectedId) ?? null : null;

  function statusFor(userId: string): PartnerButtonStatus {
    return localStatus[userId] ?? partnerStatuses[userId] ?? "none";
  }

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChatBox
            channelId={channelId}
            messages={messages}
            currentUserId={currentUserId}
            placeholder={`Message ${groupName}…`}
            onMemberClick={setSelectedId}
          />
        </div>

        <aside className="card h-fit bg-surface p-4">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-muted">Members</h2>
          <ul className="space-y-1">
            {members.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(m.id)}
                  className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition-colors hover:bg-surface-raised"
                >
                  <UserAvatar name={m.displayName} color={m.avatarColor} url={m.avatarUrl} size={32} />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-ink">
                      {m.displayName}
                      {m.id === currentUserId && <span className="ml-1 text-[10px] text-ink-faint">(you)</span>}
                    </div>
                    <div className="truncate text-[11px] text-ink-faint">
                      {m.groupRole === "owner" ? "Owner" : "Member"}
                      {m.company ? ` · ${m.company}` : ""}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {selected && (
        <MemberProfileModal
          profile={selected}
          currentUserId={currentUserId}
          partnerStatus={statusFor(selected.id)}
          onClose={() => setSelectedId(null)}
          onPartnerStatusChange={(userId, status) => {
            setLocalStatus((prev) => ({ ...prev, [userId]: status }));
          }}
        />
      )}
    </>
  );
}
