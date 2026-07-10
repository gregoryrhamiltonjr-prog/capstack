"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui";
import { MouseGlow, Tilt3D, ScrubStagger, Magnetic } from "@/components/InteractiveWrappers";
import {
  createGroupAction,
  joinGroupAction,
  requestPartnerAction,
  respondConnectionAction,
  endPartnershipAction,
  nudgePartnerAction,
  openDmAction,
  withdrawConnectionAction,
} from "@/lib/actions";

type GroupCard = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  role?: string;
  isOwner?: boolean;
};

type Person = {
  id: string;
  displayName: string;
  avatarColor: string;
  company: string | null;
  school: string | null;
  careerStage: string;
  xp: number;
  currentStreak: number;
  connId?: string;
  isPartner?: boolean;
  partnerStatus?: "none" | "pending" | "partner" | "incoming";
};

type Pending = {
  id: string;
  isPartner: boolean;
  requester: Person;
  addressee: Person;
};

export function SocialHub({
  myGroups,
  discoverGroups,
  partner,
  partnerConnId,
  partnerNudgedAt,
  pendingIncoming,
  pendingOutgoing,
  friends,
  partnerCandidates,
}: {
  myGroups: GroupCard[];
  discoverGroups: GroupCard[];
  partner: Person | null;
  partnerConnId: string | null;
  partnerNudgedAt: Date | string | null;
  pendingIncoming: Pending[];
  pendingOutgoing: Pending[];
  friends: Person[];
  partnerCandidates: Person[];
}) {
  const [tab, setTab] = useState<"mine" | "discover">("mine");
  const [showCreate, setShowCreate] = useState(false);
  const [showPartnerFinder, setShowPartnerFinder] = useState(false);
  const [pendingIds, setPendingIds] = useState<Set<string>>(
    () => new Set(partnerCandidates.filter((u) => u.partnerStatus === "pending").map((u) => u.id))
  );
  const [pendingRequest, startRequest] = useTransition();
  const router = useRouter();

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Groups column */}
      <section className="space-y-4 lg:col-span-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-xl border border-line bg-surface p-1">
            <button
              type="button"
              onClick={() => setTab("mine")}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                tab === "mine" ? "bg-brand/15 text-brand" : "text-ink-muted hover:text-ink"
              }`}
            >
              My groups
            </button>
            <button
              type="button"
              onClick={() => setTab("discover")}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                tab === "discover" ? "bg-brand/15 text-brand" : "text-ink-muted hover:text-ink"
              }`}
            >
              Discover
            </button>
          </div>
          <button type="button" className="btn-primary px-3 py-2 text-sm" onClick={() => setShowCreate((v) => !v)}>
            <Icon name="plus" size={14} /> New group
          </button>
        </div>

        {showCreate && (
          <MouseGlow className="card bg-surface p-4">
            <h3 className="mb-3 text-sm font-bold text-ink">Create a group</h3>
            <form action={createGroupAction} className="space-y-3">
              <div>
                <label className="label" htmlFor="group-name">
                  Name
                </label>
                <input id="group-name" name="name" required maxLength={80} className="input" placeholder="e.g. Agency AM cohort" />
              </div>
              <div>
                <label className="label" htmlFor="group-desc">
                  Description
                </label>
                <textarea
                  id="group-desc"
                  name="description"
                  maxLength={280}
                  rows={2}
                  className="input min-h-[72px] resize-y"
                  placeholder="What is this group for?"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary text-sm">
                  Create
                </button>
                <button type="button" className="btn-ghost text-sm" onClick={() => setShowCreate(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </MouseGlow>
        )}

        {tab === "mine" && (
          <ScrubStagger className="space-y-2.5">
            {myGroups.length === 0 ? (
              <div className="card border-dashed p-6 text-center">
                <p className="text-sm text-ink-muted">You haven&apos;t joined any groups yet.</p>
                <button type="button" className="btn-primary mt-3 text-sm" onClick={() => setTab("discover")}>
                  Browse groups
                </button>
              </div>
            ) : (
              myGroups.map((g) => (
                <div key={g.id} data-stagger-item>
                <Tilt3D intensity={2}>
                <Link href={`/social/groups/${g.id}`} className="block">
                  <MouseGlow className="card bg-surface p-4 transition-colors hover:border-brand/30">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-raised text-ink-muted">
                        <Icon name="users" size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate font-semibold text-ink">{g.name}</h3>
                          {g.isOwner && (
                            <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold">Owner</span>
                          )}
                        </div>
                        <p className="mt-0.5 line-clamp-1 text-xs text-ink-muted">{g.description}</p>
                        <div className="mt-1 text-xs text-ink-faint">{g.memberCount} members</div>
                      </div>
                      <Icon name="chevronRight" size={16} className="shrink-0 text-ink-faint" />
                    </div>
                  </MouseGlow>
                </Link>
                </Tilt3D>
                </div>
              ))
            )}
          </ScrubStagger>
        )}

        {tab === "discover" && (
          <ScrubStagger className="space-y-2.5">
            {discoverGroups.length === 0 ? (
              <div className="card border-dashed p-6 text-center text-sm text-ink-muted">No other groups to join right now. Create one.</div>
            ) : (
              discoverGroups.map((g) => (
                <div key={g.id} data-stagger-item>
                <Tilt3D intensity={2}>
                <MouseGlow className="card bg-surface p-4">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-raised text-ink-muted">
                      <Icon name="users" size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-ink">{g.name}</h3>
                      <p className="mt-0.5 text-xs leading-5 text-ink-muted">{g.description}</p>
                      <div className="mt-2 text-xs text-ink-faint">{g.memberCount} members</div>
                    </div>
                    <form action={joinGroupAction}>
                      <input type="hidden" name="groupId" value={g.id} />
                      <button type="submit" className="btn-primary shrink-0 px-3 py-1.5 text-xs">
                        Join
                      </button>
                    </form>
                  </div>
                </MouseGlow>
                </Tilt3D>
                </div>
              ))
            )}
          </ScrubStagger>
        )}
      </section>

      {/* Sidebar: partner + DMs/friends */}
      <aside className="space-y-4 lg:col-span-2">
        {/* Accountability partner */}
        <div className="card border-l-2 border-l-brand bg-surface p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-ink-muted">Accountability partner</h3>

          {partner && partnerConnId ? (
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-black text-canvas"
                  style={{ backgroundColor: partner.avatarColor }}
                >
                  {partner.displayName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-ink">{partner.displayName}</div>
                  <div className="truncate text-xs text-ink-muted">
                    {partner.careerStage}
                    {partner.company ? ` · ${partner.company}` : ""}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-faint">
                    {partner.currentStreak}d streak · {partner.xp.toLocaleString()} XP
                  </div>
                </div>
              </div>
              {partnerNudgedAt && (
                <p className="text-xs text-brand">
                  Nudged {new Date(partnerNudgedAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <form action={openDmAction}>
                  <input type="hidden" name="otherUserId" value={partner.id} />
                  <button type="submit" className="btn-primary px-3 py-1.5 text-xs">
                    Message
                  </button>
                </form>
                <form action={nudgePartnerAction}>
                  <input type="hidden" name="connId" value={partnerConnId} />
                  <Magnetic strength={0.3}>
                  <button type="submit" className="btn-ghost px-3 py-1.5 text-xs">
                    Nudge
                  </button>
                  </Magnetic>
                </form>
                <form action={endPartnershipAction}>
                  <input type="hidden" name="connId" value={partnerConnId} />
                  <button type="submit" className="btn-ghost px-3 py-1.5 text-xs text-ink-muted">
                    End
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              <p className="text-sm leading-relaxed text-ink-muted">
                Pair with someone on CapStack. Partners nudge each other to keep streaks and modules moving.
              </p>
              <button type="button" className="btn-primary mt-3 w-full py-2 text-sm" onClick={() => setShowPartnerFinder((v) => !v)}>
                {showPartnerFinder ? "Hide finder" : "Find a partner"}
              </button>
            </div>
          )}

          {/* Pending partner requests */}
          {pendingIncoming.filter((p) => p.isPartner).length > 0 && (
            <div className="mt-4 space-y-2 border-t border-line pt-3">
              <div className="text-xs font-bold uppercase tracking-wide text-ink-faint">Incoming requests</div>
              {pendingIncoming
                .filter((p) => p.isPartner)
                .map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-2 rounded-lg border border-line bg-canvas px-3 py-2">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-ink">{p.requester.displayName}</div>
                      <div className="truncate text-xs text-ink-muted">{p.requester.company || p.requester.school || p.requester.careerStage}</div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <form action={respondConnectionAction}>
                        <input type="hidden" name="connId" value={p.id} />
                        <input type="hidden" name="accept" value="1" />
                        <Magnetic strength={0.3}>
                        <button type="submit" className="btn-primary px-2 py-1 text-[11px]">
                          Accept
                        </button>
                        </Magnetic>
                      </form>
                      <form action={respondConnectionAction}>
                        <input type="hidden" name="connId" value={p.id} />
                        <input type="hidden" name="accept" value="0" />
                        <button type="submit" className="btn-ghost px-2 py-1 text-[11px]">
                          Decline
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {pendingOutgoing.filter((p) => p.isPartner).length > 0 && (
            <div className="mt-3 space-y-1.5 border-t border-line pt-3">
              <div className="text-xs font-bold uppercase tracking-wide text-ink-faint">Pending you sent</div>
              {pendingOutgoing
                .filter((p) => p.isPartner)
                .map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-2">
                    <div className="min-w-0 text-xs text-ink-muted">
                      Waiting on <span className="font-semibold text-ink">{p.addressee.displayName}</span>
                    </div>
                    <form action={withdrawConnectionAction}>
                      <input type="hidden" name="connId" value={p.id} />
                      <button type="submit" className="btn-ghost shrink-0 px-2 py-1 text-[11px] text-ink-muted">
                        Withdraw
                      </button>
                    </form>
                  </div>
                ))}
            </div>
          )}

          {showPartnerFinder && !partner && (
            <div className="mt-4 max-h-64 space-y-2 overflow-y-auto border-t border-line pt-3">
              {partnerCandidates.slice(0, 12).map((u) => {
                const isPending = pendingIds.has(u.id) || u.partnerStatus === "pending";
                const isIncoming = u.partnerStatus === "incoming";
                const isPartnered = u.partnerStatus === "partner";
                const locked = isPending || isIncoming || isPartnered;
                const label = isPending ? "Pending" : isIncoming ? "Incoming" : isPartnered ? "Partners" : "Request";

                return (
                  <div key={u.id} className="flex items-center gap-2 rounded-lg px-1 py-1.5">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-canvas"
                      style={{ backgroundColor: u.avatarColor }}
                    >
                      {u.displayName.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-ink">{u.displayName}</div>
                      <div className="truncate text-[11px] text-ink-faint">
                        {u.company || u.school || u.careerStage} · {u.currentStreak}d streak
                      </div>
                    </div>
                    {locked ? (
                      <button type="button" className="btn-ghost shrink-0 px-2 py-1 text-[11px] opacity-70" disabled>
                        {label}
                      </button>
                    ) : (
                      <form
                        action={(fd) => {
                          startRequest(async () => {
                            const result = await requestPartnerAction(fd);
                            if (!result.ok) return;
                            setPendingIds((prev) => new Set(prev).add(u.id));
                            router.refresh();
                          });
                        }}
                      >
                        <input type="hidden" name="targetUserId" value={u.id} />
                        <button type="submit" className="btn-ghost shrink-0 px-2 py-1 text-[11px]" disabled={pendingRequest}>
                          {pendingRequest ? "…" : "Request"}
                        </button>
                      </form>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Connections / DMs */}
        <div className="card bg-surface p-4">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-muted">Connections</h3>
          {friends.length === 0 ? (
            <p className="text-sm text-ink-muted">Accept a partner request or connect with people in groups to message them.</p>
          ) : (
            <ul className="divide-y divide-line/60">
              {friends.map((f) => (
                <li key={f.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-canvas"
                    style={{ backgroundColor: f.avatarColor }}
                  >
                    {f.displayName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-ink">
                      {f.displayName}
                      {f.isPartner && <span className="ml-1.5 text-[10px] font-bold text-brand">Partner</span>}
                    </div>
                    <div className="truncate text-xs text-ink-muted">{f.company || f.school || f.careerStage}</div>
                  </div>
                  <form action={openDmAction}>
                    <input type="hidden" name="otherUserId" value={f.id} />
                    <button type="submit" className="btn-ghost px-2 py-1 text-[11px]">
                      DM
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
