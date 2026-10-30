import { getCurrentUser } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { Icon } from "@/components/ui";
import { GroupRoom } from "@/components/social/GroupRoom";
import { joinGroupAction, leaveGroupAction, prepareGroupChatAction } from "@/lib/actions";

export default async function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/");

  const { groupId } = await params;
  const group = await db.studyGroup.findUnique({
    where: { id: groupId },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              displayName: true,
              avatarColor: true,
              avatarUrl: true,
              company: true,
              school: true,
              careerStage: true,
              jobArea: true,
              xp: true,
              currentStreak: true,
            },
          },
        },
        orderBy: { joinedAt: "asc" },
      },
    },
  });

  if (!group) notFound();

  const membership = group.members.find((m) => m.userId === user.id);
  const isMember = !!membership;

  // Viewing or prefetching a page must never create database records.
  const channelId = group.channelId;

  const messages =
    isMember && channelId
      ? await db.message.findMany({
          where: { channelId },
          include: { sender: { select: { id: true, displayName: true, avatarColor: true } } },
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
          take: 200,
        })
      : [];

  const members = group.members.map((m) => ({
    id: m.user.id,
    displayName: m.user.displayName,
    avatarColor: m.user.avatarColor,
    avatarUrl: m.user.avatarUrl,
    careerStage: m.user.careerStage,
    company: m.user.company,
    school: m.user.school,
    jobArea: m.user.jobArea,
    xp: m.user.xp,
    currentStreak: m.user.currentStreak,
    groupRole: m.role,
  }));

  // Partner relationship for each member relative to the current user
  const memberIds = members.map((m) => m.id).filter((id) => id !== user.id);
  const connections = memberIds.length
    ? await db.connection.findMany({
        where: {
          OR: [
            { requesterId: user.id, addresseeId: { in: memberIds } },
            { addresseeId: user.id, requesterId: { in: memberIds } },
          ],
        },
      })
    : [];

  const partnerStatuses: Record<string, "none" | "pending" | "partner" | "incoming"> = {};
  for (const c of connections) {
    const otherId = c.requesterId === user.id ? c.addresseeId : c.requesterId;
    if (c.status === "accepted" && c.isPartner) partnerStatuses[otherId] = "partner";
    else if (c.status === "pending" && c.isPartner && c.requesterId === user.id) partnerStatuses[otherId] = "pending";
    else if (c.status === "pending" && c.isPartner && c.addresseeId === user.id) partnerStatuses[otherId] = "incoming";
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-20">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
        <div>
          <Link href="/social" className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-ink">
            <Icon name="arrowRight" size={12} className="rotate-180" /> Social
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{group.name}</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-muted">{group.description}</p>
          <div className="mt-2 text-xs text-ink-faint">
            {group.members.length} members
            {membership?.role === "owner" ? " · You own this group" : isMember ? " · Member" : ""}
          </div>
        </div>
        <div className="flex gap-2">
          {isMember ? (
            <form action={leaveGroupAction}>
              <input type="hidden" name="groupId" value={group.id} />
              <button type="submit" className="btn-ghost text-sm">
                Leave group
              </button>
            </form>
          ) : (
            <form action={joinGroupAction}>
              <input type="hidden" name="groupId" value={group.id} />
              <button type="submit" className="btn-primary text-sm">
                Join group
              </button>
            </form>
          )}
        </div>
      </div>

      {isMember && channelId ? (
        <GroupRoom
          channelId={channelId}
          messages={messages.reverse()}
          currentUserId={user.id}
          groupName={group.name}
          members={members}
          partnerStatuses={partnerStatuses}
        />
      ) : isMember ? (
        <section className="card p-6"><h2 className="text-lg font-semibold text-ink">Chat setup is needed</h2><p className="mt-2 text-sm leading-6 text-ink-muted">This group’s chat has not been prepared yet. Starting it does not send a message.</p><form action={prepareGroupChatAction} className="mt-4"><input type="hidden" name="groupId" value={group.id} /><button type="submit" className="btn-primary">Prepare group chat</button></form></section>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card flex min-h-[320px] flex-col items-center justify-center p-8 text-center lg:col-span-2">
            <Icon name="lock" size={28} className="mb-3 text-ink-faint" />
            <p className="text-sm text-ink-muted">Join this group to see the chat and participate.</p>
            <form action={joinGroupAction} className="mt-4">
              <input type="hidden" name="groupId" value={group.id} />
              <button type="submit" className="btn-primary text-sm">
                Join group
              </button>
            </form>
          </div>
          <aside className="card h-fit bg-surface p-4">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-muted">Members</h2>
            <ul className="space-y-2.5">
              {members.map((m) => (
                <li key={m.id} className="flex items-center gap-2.5 px-1">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-canvas"
                    style={{ backgroundColor: m.avatarColor }}
                  >
                    {m.displayName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-ink">{m.displayName}</div>
                    <div className="truncate text-[11px] text-ink-faint">
                      {m.groupRole === "owner" ? "Owner" : "Member"}
                      {m.company ? ` · ${m.company}` : ""}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </div>
  );
}
