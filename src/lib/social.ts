import { db } from "./db";

export async function getSocialState(userId: string) {
  const [memberships, allGroups, connections, candidates] = await Promise.all([
    db.groupMember.findMany({
      where: { userId },
      include: {
        group: {
          include: {
            members: { include: { user: { select: { id: true, displayName: true, avatarColor: true, lastActiveDay: true } } } },
            _count: { select: { members: true } },
          },
        },
      },
      orderBy: { joinedAt: "desc" },
    }),
    db.studyGroup.findMany({
      include: {
        members: { select: { userId: true } },
        _count: { select: { members: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.connection.findMany({
      where: { OR: [{ requesterId: userId }, { addresseeId: userId }] },
      include: {
        requester: { select: { id: true, displayName: true, avatarColor: true, company: true, school: true, careerStage: true, xp: true, currentStreak: true } },
        addressee: { select: { id: true, displayName: true, avatarColor: true, company: true, school: true, careerStage: true, xp: true, currentStreak: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.user.findMany({
      where: { id: { not: userId }, onboarded: true },
      select: {
        id: true,
        displayName: true,
        avatarColor: true,
        company: true,
        school: true,
        careerStage: true,
        jobArea: true,
        xp: true,
        currentStreak: true,
      },
      orderBy: { xp: "desc" },
      take: 24,
    }),
  ]);

  const myGroupIds = new Set(memberships.map((m) => m.groupId));
  const myGroups = memberships.map((m) => ({
    id: m.group.id,
    name: m.group.name,
    description: m.group.description,
    role: m.role,
    memberCount: m.group._count.members,
    channelId: m.group.channelId,
    isOwner: m.role === "owner",
  }));

  const discoverGroups = allGroups
    .filter((g) => !myGroupIds.has(g.id))
    .map((g) => ({
      id: g.id,
      name: g.name,
      description: g.description,
      memberCount: g._count.members,
    }));

  const partnerConn = connections.find((c) => c.status === "accepted" && c.isPartner);
  const partner = partnerConn
    ? partnerConn.requesterId === userId
      ? partnerConn.addressee
      : partnerConn.requester
    : null;

  const pendingIncoming = connections.filter((c) => c.status === "pending" && c.addresseeId === userId);
  const pendingOutgoing = connections.filter((c) => c.status === "pending" && c.requesterId === userId);

  const friends = connections
    .filter((c) => c.status === "accepted")
    .map((c) => {
      const other = c.requesterId === userId ? c.addressee : c.requester;
      return { ...other, connId: c.id, isPartner: c.isPartner, nudgedAt: c.nudgedAt };
    });

  const connectedIds = new Set(
    connections.flatMap((c) => [c.requesterId, c.addresseeId]).filter((id) => id !== userId)
  );

  const pendingOutgoingPartnerIds = new Set(
    pendingOutgoing.filter((c) => c.isPartner).map((c) => c.addresseeId)
  );
  const pendingIncomingPartnerIds = new Set(
    pendingIncoming.filter((c) => c.isPartner).map((c) => c.requesterId)
  );

  // Show everyone except current partner; mark pending on the button instead of hiding them
  const partnerCandidates = candidates
    .filter((u) => !(partner && u.id === partner.id))
    .map((u) => ({
      ...u,
      partnerStatus: pendingOutgoingPartnerIds.has(u.id)
        ? ("pending" as const)
        : pendingIncomingPartnerIds.has(u.id)
          ? ("incoming" as const)
          : connectedIds.has(u.id) &&
              connections.some(
                (c) =>
                  c.status === "accepted" &&
                  c.isPartner &&
                  (c.requesterId === u.id || c.addresseeId === u.id)
              )
            ? ("partner" as const)
            : ("none" as const),
    }));

  return {
    myGroups,
    discoverGroups,
    partner,
    partnerConnId: partnerConn?.id ?? null,
    partnerNudgedAt: partnerConn?.nudgedAt ?? null,
    pendingIncoming,
    pendingOutgoing,
    friends,
    partnerCandidates,
    connectedIds,
    pendingOutgoingPartnerIds: [...pendingOutgoingPartnerIds],
  };
}
