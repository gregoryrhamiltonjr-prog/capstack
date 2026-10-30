import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import { signMobileToken } from "@/lib/mobile-auth";
import { authenticationUnavailableResponse, isAuthenticationConfigured } from "@/lib/auth-configuration";

export async function POST(request: Request) {
  if (!isAuthenticationConfigured()) return authenticationUnavailableResponse();
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { email } });
    // Private platform: only provisioned admins may authenticate (match web credentials).
    if (!user?.passwordHash || !user.isAdmin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signMobileToken(user.id);

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        xp: user.xp,
        gems: 0,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
