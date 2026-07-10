"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import { db } from "./db";
import { getUserId, hashPassword, verifyPassword } from "./auth";
import { signIn, signOut } from "@/auth";
import { XP, HINT_MULT } from "./xp";
import { todayKey, weekKey, daysBetween } from "./util";

async function requireUserId(): Promise<string> {
  const uid = await getUserId();
  if (!uid) redirect("/login");
  return uid;
}

async function awardXp(userId: string, amount: number, reason: string) {
  if (amount <= 0) return;
  await db.user.update({ where: { id: userId }, data: { xp: { increment: amount } } });
  await db.xpEvent.create({ data: { userId, amount, reason, weekKey: weekKey() } });
}

async function bumpStreak(userId: string) {
  const u = await db.user.findUnique({ where: { id: userId } });
  if (!u) return;
  const today = todayKey();
  if (u.lastActiveDay === today) return; // already counted today
  let streak = 1;
  if (u.lastActiveDay) {
    const gap = daysBetween(u.lastActiveDay, today);
    if (gap === 1) streak = u.currentStreak + 1;
    else if (gap <= 0) streak = u.currentStreak; // clock oddity guard
    else streak = 1;
  }
  await db.user.update({
    where: { id: userId },
    data: {
      currentStreak: streak,
      longestStreak: Math.max(streak, u.longestStreak),
      lastActiveDay: today,
    },
  });
  await awardXp(userId, XP.streakDay, "daily streak");
}

// ---------------- AUTH ----------------
export async function signupAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const name = String(formData.get("name") || "").trim();
  const password = String(formData.get("password") || "");
  if (!email || !password || password.length < 6) redirect("/signup?error=1");
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    // If they signed up with Google/Apple already, don't clobber — send to login
    if (!existing.passwordHash) redirect("/login?error=oauth");
    redirect("/signup?error=exists");
  }
  const displayName = name || email.split("@")[0];
  await db.user.create({
    data: {
      email,
      name: displayName,
      displayName,
      passwordHash: await hashPassword(password),
    },
  });
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  if (res?.error) redirect("/login?error=1");
  redirect("/onboarding");
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const user = await db.user.findUnique({ where: { email } });
  if (!user) redirect("/login?error=1");
  if (!user.passwordHash) redirect("/login?error=oauth");
  if (!(await verifyPassword(password, user.passwordHash))) redirect("/login?error=1");

  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  redirect(user.onboarded ? "/dashboard" : "/onboarding");
}

export async function oauthSignInAction(formData: FormData) {
  const provider = String(formData.get("provider") || "");
  if (provider !== "google" && provider !== "apple") redirect("/login?error=1");
  await signIn(provider, { redirectTo: "/auth/complete" });
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

// ---------------- ONBOARDING & SETTINGS ----------------
export async function saveOnboarding(data: {
  careerStage: string;
  jobArea: string;
  weeklyGoal: number;
  startingRealm: string;
  guidedPath: string;
  school?: string;
  company?: string;
  placementPassed?: boolean;
  placementTrackId?: string;
}) {
  const uid = await requireUserId();
  await db.user.update({
    where: { id: uid },
    data: {
      careerStage: data.careerStage,
      jobArea: data.jobArea,
      weeklyGoal: data.weeklyGoal,
      startingRealm: data.startingRealm,
      guidedPath: data.guidedPath,
      school: data.school || null,
      company: data.company || null,
      onboarded: true,
    },
  });

  // Test-out: passing placement marks the starting track's intro module chapters tested_out (no XP).
  if (data.placementPassed && data.placementTrackId) {
    const introModule = await db.module.findFirst({
      where: { trackId: data.placementTrackId },
      orderBy: { orderIndex: "asc" },
      include: { chapters: true },
    });
    if (introModule) {
      for (const ch of introModule.chapters) {
        await db.chapterProgress.upsert({
          where: { userId_chapterId: { userId: uid, chapterId: ch.id } },
          create: { userId: uid, chapterId: ch.id, status: "tested_out", bestScorePct: 0, passedAt: new Date() },
          update: { status: "tested_out", passedAt: new Date() },
        });
      }
    }
  }
  redirect("/dashboard");
}

export async function updateSettings(data: { displayName?: string; careerStage?: string; jobArea?: string; weeklyGoal?: number; school?: string; company?: string; avatarColor?: string }) {
  const uid = await requireUserId();
  await db.user.update({
    where: { id: uid },
    data: {
      ...(data.displayName !== undefined ? { displayName: data.displayName } : {}),
      ...(data.careerStage !== undefined ? { careerStage: data.careerStage } : {}),
      ...(data.jobArea !== undefined ? { jobArea: data.jobArea } : {}),
      ...(data.weeklyGoal !== undefined ? { weeklyGoal: data.weeklyGoal } : {}),
      ...(data.school !== undefined ? { school: data.school || null } : {}),
      ...(data.company !== undefined ? { company: data.company || null } : {}),
      ...(data.avatarColor !== undefined ? { avatarColor: data.avatarColor } : {}),
    },
  });
  revalidatePath("/settings");
  revalidatePath("/profile");
}

export type AvatarUploadResult = { ok: true; url: string } | { ok: false; error: string };

const AVATAR_MAX_BYTES = 5 * 1024 * 1024;
const AVATAR_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]);

export async function uploadAvatarAction(formData: FormData): Promise<AvatarUploadResult> {
  const uid = await requireUserId();
  const raw = formData.get("avatar");
  if (!raw || typeof raw !== "object" || !("arrayBuffer" in raw)) {
    return { ok: false, error: "Choose an image to upload." };
  }
  const file = raw as File;
  if (file.size <= 0) return { ok: false, error: "Choose an image to upload." };
  if (file.size > AVATAR_MAX_BYTES) return { ok: false, error: "Headshot must be 5 MB or smaller." };

  const mime = (file.type || "").toLowerCase();
  if (!AVATAR_TYPES.has(mime)) {
    return { ok: false, error: "Use a JPG, PNG, WebP, or GIF image." };
  }

  const { sanitizeUploadName } = await import("./moderation");
  const bytes = Buffer.from(await file.arrayBuffer());

  // Basic magic-byte check for common image formats
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  const isGif = bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46;
  const isWebp = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46;
  if (!isJpeg && !isPng && !isGif && !isWebp) {
    return { ok: false, error: "That file doesn't look like a valid image." };
  }

  const ext = isJpeg ? "jpg" : isPng ? "png" : isGif ? "gif" : "webp";
  const safeBase = sanitizeUploadName(file.name).replace(/\.[^.]+$/, "") || "headshot";
  const dir = path.join(process.cwd(), "public", "uploads", "avatars", uid);
  await fs.mkdir(dir, { recursive: true });

  // Remove previous headshots for this user
  try {
    const existing = await fs.readdir(dir);
    await Promise.all(existing.map((f) => fs.unlink(path.join(dir, f)).catch(() => null)));
  } catch {
    /* empty dir ok */
  }

  const stored = `${Date.now()}-${safeBase}.${ext}`;
  await fs.writeFile(path.join(dir, stored), bytes);
  const url = `/uploads/avatars/${uid}/${stored}`;

  await db.user.update({ where: { id: uid }, data: { avatarUrl: url } });
  revalidatePath("/profile");
  revalidatePath("/social");
  revalidatePath("/dashboard");
  return { ok: true, url };
}

export async function removeAvatarAction(): Promise<AvatarUploadResult | { ok: true; url: null }> {
  const uid = await requireUserId();
  const user = await db.user.findUnique({ where: { id: uid }, select: { avatarUrl: true } });
  if (user?.avatarUrl?.startsWith("/uploads/avatars/")) {
    const full = path.join(process.cwd(), "public", user.avatarUrl);
    await fs.unlink(full).catch(() => null);
  }
  await db.user.update({ where: { id: uid }, data: { avatarUrl: null } });
  revalidatePath("/profile");
  revalidatePath("/social");
  revalidatePath("/dashboard");
  return { ok: true, url: null };
}

export async function toggleFreeRoam(value: boolean) {
  const uid = await requireUserId();
  await db.user.update({ where: { id: uid }, data: { freeRoam: value } });
  revalidatePath("/map");
  revalidatePath("/settings");
  revalidatePath("/dashboard");
  revalidatePath("/learn");
}

export async function toggleFreeRoamFromForm(formData: FormData) {
  const value = String(formData.get("freeRoam")) === "true";
  await toggleFreeRoam(value);
}

// ---------------- LEARNING ----------------
export async function recordLessonComplete(lessonId: string, chapterId: string, hintsUsed: number, quizUnlocked: boolean) {
  const uid = await requireUserId();
  const existing = await db.lessonProgress.findUnique({ where: { userId_lessonId: { userId: uid, lessonId } } });
  const alreadyCompleted = existing?.status === "completed" || existing?.status === "tested_out";
  // Free-roam viewing of a gated lesson = "explored" (no XP); a gated-unlocked lesson = "completed" (XP once).
  const status = quizUnlocked ? "completed" : "explored";
  await db.lessonProgress.upsert({
    where: { userId_lessonId: { userId: uid, lessonId } },
    create: { userId: uid, lessonId, status, hintsUsed, completedAt: quizUnlocked ? new Date() : null },
    update: { status: existing?.status === "completed" ? "completed" : status, hintsUsed: (existing?.hintsUsed ?? 0) + hintsUsed, completedAt: quizUnlocked ? new Date() : existing?.completedAt },
  });

  if (quizUnlocked && !alreadyCompleted) {
    await awardXp(uid, XP.lesson, "lesson complete");
    await bumpStreak(uid);
    await db.chapterProgress.upsert({
      where: { userId_chapterId: { userId: uid, chapterId } },
      create: { userId: uid, chapterId, status: "in_progress" },
      update: { status: (await db.chapterProgress.findUnique({ where: { userId_chapterId: { userId: uid, chapterId } } }))?.status === "passed" ? "passed" : "in_progress" },
    });
  }
  revalidatePath(`/learn/${chapterId}`);
}

export async function submitQuizResult(input: {
  chapterId: string;
  servedIds: string[];
  results: { questionId: string; correct: boolean; hintTier: number }[];
}) {
  const uid = await requireUserId();
  const total = input.servedIds.length || 1;
  const correct = input.results.filter((r) => r.correct).length;
  const scorePct = Math.round((correct / total) * 100);
  const passed = scorePct >= 70;

  const prior = await db.chapterProgress.findUnique({ where: { userId_chapterId: { userId: uid, chapterId: input.chapterId } } });
  const firstPass = passed && prior?.status !== "passed" && prior?.status !== "tested_out";

  // XP: awarded only on first pass to prevent farming. Per-correct XP scaled by hint tier used.
  let xpEarned = 0;
  if (firstPass) {
    for (const r of input.results) {
      if (r.correct) xpEarned += Math.round(XP.quizPerCorrect * (HINT_MULT[r.hintTier] ?? 1));
    }
    xpEarned += XP.chapterPass;
  }

  await db.quizAttempt.create({
    data: {
      userId: uid,
      chapterId: input.chapterId,
      scorePct,
      passed,
      servedIds: JSON.stringify(input.servedIds),
      answers: JSON.stringify(input.results),
      hintsUsed: input.results.filter((r) => r.hintTier > 0).length,
      xpAwarded: xpEarned,
    },
  });

  await db.chapterProgress.upsert({
    where: { userId_chapterId: { userId: uid, chapterId: input.chapterId } },
    create: { userId: uid, chapterId: input.chapterId, status: passed ? "passed" : "in_progress", bestScorePct: scorePct, passedAt: passed ? new Date() : null },
    update: {
      status: prior?.status === "passed" || prior?.status === "tested_out" ? prior.status : passed ? "passed" : "in_progress",
      bestScorePct: Math.max(prior?.bestScorePct ?? 0, scorePct),
      passedAt: passed && !prior?.passedAt ? new Date() : prior?.passedAt,
    },
  });

  if (firstPass && xpEarned > 0) {
    await awardXp(uid, xpEarned, "chapter quiz pass");
    await bumpStreak(uid);
  }

  revalidatePath("/dashboard");
  revalidatePath("/map");
  revalidatePath(`/learn/${input.chapterId}`);
  revalidatePath("/map");
  return { scorePct, passed, xpEarned, correct, total };
}

// ---------------- SOCIAL ----------------
export type PartnerRequestResult =
  | { ok: true; status: "sent" | "already_partners" | "already_pending" | "upgraded" }
  | { ok: false; error: string };

export async function sendConnectionRequest(targetUserId: string, asPartner = false): Promise<PartnerRequestResult> {
  const uid = await requireUserId();
  if (uid === targetUserId) return { ok: false, error: "You can't partner with yourself." };

  const target = await db.user.findUnique({ where: { id: targetUserId }, select: { id: true, displayName: true } });
  if (!target) return { ok: false, error: "User not found." };

  const exists = await db.connection.findFirst({
    where: { OR: [{ requesterId: uid, addresseeId: targetUserId }, { requesterId: targetUserId, addresseeId: uid }] },
  });
  if (exists) {
    if (asPartner && exists.status === "accepted" && exists.isPartner) {
      return { ok: true, status: "already_partners" };
    }
    if (asPartner && exists.status === "pending" && exists.isPartner) {
      return { ok: true, status: "already_pending" };
    }
    // Upgrade an existing accepted friend into a partner
    if (asPartner && exists.status === "accepted" && !exists.isPartner) {
      await db.connection.update({ where: { id: exists.id }, data: { isPartner: true } });
      revalidatePath("/social");
      return { ok: true, status: "upgraded" };
    }
    if (exists.status === "pending") {
      return { ok: true, status: "already_pending" };
    }
    return { ok: true, status: "already_partners" };
  }
  await db.connection.create({ data: { requesterId: uid, addresseeId: targetUserId, isPartner: asPartner } });
  revalidatePath("/social");
  return { ok: true, status: "sent" };
}

export async function requestPartnerAction(formData: FormData): Promise<PartnerRequestResult> {
  const targetUserId = String(formData.get("targetUserId") || "");
  if (!targetUserId) return { ok: false, error: "Missing user." };
  return sendConnectionRequest(targetUserId, true);
}

export async function respondConnection(connId: string, accept: boolean) {
  const uid = await requireUserId();
  const conn = await db.connection.findUnique({ where: { id: connId } });
  if (!conn || conn.addresseeId !== uid) return;
  if (accept) {
    // Only one active partner at a time for each user
    if (conn.isPartner) {
      await db.connection.updateMany({
        where: {
          status: "accepted",
          isPartner: true,
          OR: [{ requesterId: uid }, { addresseeId: uid }, { requesterId: conn.requesterId }, { addresseeId: conn.requesterId }],
        },
        data: { isPartner: false },
      });
    }
    await db.connection.update({ where: { id: connId }, data: { status: "accepted" } });
  } else {
    await db.connection.delete({ where: { id: connId } });
  }
  revalidatePath("/social");
}

export async function respondConnectionAction(formData: FormData) {
  const connId = String(formData.get("connId") || "");
  const accept = String(formData.get("accept") || "") === "1";
  if (!connId) return;
  await respondConnection(connId, accept);
}

export async function endPartnershipAction(formData: FormData) {
  const connId = String(formData.get("connId") || "");
  const uid = await requireUserId();
  const conn = await db.connection.findUnique({ where: { id: connId } });
  if (!conn || (conn.requesterId !== uid && conn.addresseeId !== uid)) return;
  await db.connection.update({ where: { id: connId }, data: { isPartner: false } });
  revalidatePath("/social");
}

export async function nudgePartner(connId: string) {
  const uid = await requireUserId();
  const conn = await db.connection.findUnique({ where: { id: connId } });
  if (!conn || (conn.requesterId !== uid && conn.addresseeId !== uid)) return;
  await db.connection.update({ where: { id: connId }, data: { nudgedAt: new Date() } });
  revalidatePath("/social");
}

export async function nudgePartnerAction(formData: FormData) {
  const connId = String(formData.get("connId") || "");
  if (!connId) return;
  await nudgePartner(connId);
}

export async function getOrCreateDM(otherUserId: string): Promise<string> {
  const uid = await requireUserId();
  const key = ["dm", ...[uid, otherUserId].sort()].join(":");
  let channel = await db.channel.findFirst({ where: { kind: "dm", name: key } });
  if (!channel) channel = await db.channel.create({ data: { kind: "dm", name: key } });
  return channel.id;
}

export async function openDmAction(formData: FormData) {
  const otherUserId = String(formData.get("otherUserId") || "");
  if (!otherUserId) return;
  const channelId = await getOrCreateDM(otherUserId);
  revalidatePath("/social");
  redirect(`/social/dm/${channelId}`);
}

export type SendMessageResult = { ok: true } | { ok: false; error: string };

export async function sendMessage(
  channelId: string,
  body: string,
  file?: { name: string; type: string; size: number; bytes: Buffer } | null
): Promise<SendMessageResult> {
  const uid = await requireUserId();
  const text = body.trim();
  if (!text && !file) return { ok: false, error: "Write a message or attach a file." };

  const channel = await db.channel.findUnique({ where: { id: channelId } });
  if (!channel) return { ok: false, error: "Chat not found." };

  if (channel.kind === "group" && channel.groupId) {
    const member = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: channel.groupId, userId: uid } },
    });
    if (!member) return { ok: false, error: "Join the group to chat." };
  }
  if (channel.kind === "dm" && channel.name?.startsWith("dm:")) {
    const parts = channel.name.split(":");
    if (!parts.includes(uid)) return { ok: false, error: "Not allowed." };
  }

  // Text moderation (sensitive work info + inappropriate content)
  if (text) {
    const { moderateText } = await import("./moderation");
    const check = moderateText(text);
    if (!check.ok) return { ok: false, error: check.reason };
  }

  let attachmentName: string | null = null;
  let attachmentMime: string | null = null;
  let attachmentUrl: string | null = null;
  let attachmentSize: number | null = null;

  if (file) {
    const { moderateFileContent, sanitizeUploadName } = await import("./moderation");
    const check = moderateFileContent(file.name, file.type || "application/octet-stream", file.bytes);
    if (!check.ok) return { ok: false, error: check.reason };

    const safeName = sanitizeUploadName(file.name);
    const dir = path.join(process.cwd(), "public", "uploads", "chat", channelId);
    await fs.mkdir(dir, { recursive: true });
    const stored = `${Date.now()}-${safeName}`;
    const full = path.join(dir, stored);
    await fs.writeFile(full, file.bytes);

    attachmentName = safeName;
    attachmentMime = file.type || "application/octet-stream";
    attachmentUrl = `/uploads/chat/${channelId}/${stored}`;
    attachmentSize = file.size;
  }

  const displayBody =
    text ||
    (attachmentName ? `Shared a file: ${attachmentName}` : "");

  await db.message.create({
    data: {
      channelId,
      senderId: uid,
      body: displayBody.slice(0, 2000),
      attachmentName,
      attachmentMime,
      attachmentUrl,
      attachmentSize,
    },
  });

  revalidatePath("/social");
  revalidatePath(`/social/groups/${channel.groupId ?? ""}`);
  revalidatePath(`/social/dm/${channelId}`);
  return { ok: true };
}

export async function sendMessageAction(formData: FormData): Promise<SendMessageResult> {
  const channelId = String(formData.get("channelId") || "");
  const body = String(formData.get("body") || "");
  if (!channelId) return { ok: false, error: "Missing chat." };

  const raw = formData.get("file");
  let file: { name: string; type: string; size: number; bytes: Buffer } | null = null;
  if (raw && typeof raw === "object" && "arrayBuffer" in raw) {
    const f = raw as File;
    if (f.size > 0) {
      const buf = Buffer.from(await f.arrayBuffer());
      file = { name: f.name, type: f.type, size: f.size, bytes: buf };
    }
  }

  if (!body.trim() && !file) return { ok: false, error: "Write a message or attach a file." };
  return sendMessage(channelId, body, file);
}

export async function createStudyGroup(name: string, description: string) {
  const uid = await requireUserId();
  if (!name.trim()) return null;
  const channel = await db.channel.create({ data: { kind: "group", name: `group:${name.trim().slice(0, 40)}` } });
  const group = await db.studyGroup.create({
    data: {
      name: name.trim().slice(0, 80),
      description: description.trim().slice(0, 280) || "A CapStack group.",
      ownerId: uid,
      channelId: channel.id,
    },
  });
  await db.channel.update({ where: { id: channel.id }, data: { groupId: group.id } });
  await db.groupMember.create({ data: { groupId: group.id, userId: uid, role: "owner" } });
  revalidatePath("/social");
  return group.id;
}

export async function createGroupAction(formData: FormData) {
  const name = String(formData.get("name") || "");
  const description = String(formData.get("description") || "");
  const id = await createStudyGroup(name, description);
  if (id) redirect(`/social/groups/${id}`);
}

export async function joinStudyGroup(groupId: string) {
  const uid = await requireUserId();
  const group = await db.studyGroup.findUnique({ where: { id: groupId } });
  if (!group) return;
  const exists = await db.groupMember.findUnique({ where: { groupId_userId: { groupId, userId: uid } } });
  if (exists) return;
  await db.groupMember.create({ data: { groupId, userId: uid, role: "member" } });
  // Ensure channel exists
  if (!group.channelId) {
    const channel = await db.channel.create({ data: { kind: "group", name: `group:${group.name}`, groupId } });
    await db.studyGroup.update({ where: { id: groupId }, data: { channelId: channel.id } });
  }
  revalidatePath("/social");
  revalidatePath(`/social/groups/${groupId}`);
}

export async function joinGroupAction(formData: FormData) {
  const groupId = String(formData.get("groupId") || "");
  if (!groupId) return;
  await joinStudyGroup(groupId);
  redirect(`/social/groups/${groupId}`);
}

export async function leaveStudyGroup(groupId: string) {
  const uid = await requireUserId();
  const membership = await db.groupMember.findUnique({ where: { groupId_userId: { groupId, userId: uid } } });
  if (!membership) return;
  // Owners can leave only if they transfer or group has other members — simple: allow leave, promote oldest member
  await db.groupMember.delete({ where: { id: membership.id } });
  if (membership.role === "owner") {
    const next = await db.groupMember.findFirst({ where: { groupId }, orderBy: { joinedAt: "asc" } });
    if (next) {
      await db.groupMember.update({ where: { id: next.id }, data: { role: "owner" } });
      await db.studyGroup.update({ where: { id: groupId }, data: { ownerId: next.userId } });
    } else {
      // empty group — delete
      const group = await db.studyGroup.findUnique({ where: { id: groupId } });
      if (group?.channelId) await db.channel.delete({ where: { id: group.channelId } }).catch(() => null);
      await db.studyGroup.delete({ where: { id: groupId } }).catch(() => null);
    }
  }
  revalidatePath("/social");
  revalidatePath(`/social/groups/${groupId}`);
}

export async function leaveGroupAction(formData: FormData) {
  const groupId = String(formData.get("groupId") || "");
  if (!groupId) return;
  await leaveStudyGroup(groupId);
  redirect("/social");
}
