import "server-only";
import { auth, signOut } from "@/auth";
import { db } from "./db";
import { hashPassword, verifyPassword } from "./auth-password";

export { hashPassword, verifyPassword };

export async function getUserId(): Promise<string | null> {
  const session = await auth();
  const id = (session?.user as { id?: string } | undefined)?.id;
  return id ?? null;
}

export async function getCurrentUser() {
  const uid = await getUserId();
  if (!uid) return null;
  return db.user.findUnique({ where: { id: uid } });
}

/** @deprecated cookie sessions removed — Auth.js JWT handles this */
export async function createSession(_userId: string) {
  // no-op: credentials sign-in sets the session via Auth.js
}

export async function destroySession() {
  await signOut({ redirect: false });
}
