import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";

const getSecretKey = () => {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(secret);
};

export async function signMobileToken(userId: string) {
  return await new SignJWT({ uid: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d") // 30 day expiration for mobile
    .sign(getSecretKey());
}

export async function verifyMobileToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.uid as string;
  } catch (err) {
    return null;
  }
}

export async function getMobileUser(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.substring(7);
  const uid = await verifyMobileToken(token);
  if (!uid) return null;

  const user = await db.user.findUnique({ where: { id: uid } });
  // Private platform: reject tokens for non-admin accounts (e.g. leftover seed users).
  if (!user?.isAdmin) return null;
  return user;
}
