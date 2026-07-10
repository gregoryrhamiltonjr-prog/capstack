import { getCurrentUser } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { Icon } from "@/components/ui";
import { ChatBox } from "@/components/social/ChatBox";

export default async function DmPage({ params }: { params: Promise<{ channelId: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { channelId } = await params;
  const channel = await db.channel.findUnique({ where: { id: channelId } });
  if (!channel || channel.kind !== "dm") notFound();

  // Authorization via deterministic name key
  if (channel.name?.startsWith("dm:")) {
    const parts = channel.name.split(":");
    if (!parts.includes(user.id)) redirect("/social");
  }

  const messages = await db.message.findMany({
    where: { channelId },
    include: { sender: { select: { id: true, displayName: true, avatarColor: true } } },
    orderBy: { createdAt: "asc" },
    take: 200,
  });

  // Other participant name
  let otherName = "Direct message";
  if (channel.name?.startsWith("dm:")) {
    const ids = channel.name.split(":").slice(1);
    const otherId = ids.find((id) => id !== user.id);
    if (otherId) {
      const other = await db.user.findUnique({ where: { id: otherId }, select: { displayName: true } });
      if (other) otherName = other.displayName;
    }
  } else {
    // legacy seed channel without key — infer from messages
    const otherSender = messages.find((m) => m.senderId !== user.id)?.sender;
    if (otherSender) otherName = otherSender.displayName;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-20">
      <div className="border-b border-line pb-5">
        <Link href="/social" className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-ink">
          <Icon name="arrowRight" size={12} className="rotate-180" /> Social
        </Link>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">{otherName}</h1>
        <p className="mt-1 text-sm text-ink-muted">Direct message</p>
      </div>

      <ChatBox channelId={channelId} messages={messages} currentUserId={user.id} placeholder={`Message ${otherName}…`} />
    </div>
  );
}
