import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getMobileUser } from "@/lib/mobile-auth";

export async function GET(request: Request) {
  try {
    const user = await getMobileUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Top 50 users by XP
    const users = await db.user.findMany({
      select: {
        id: true,
        displayName: true,
        avatarUrl: true,
        xp: true,
        careerStage: true,
      },
      orderBy: { xp: "desc" },
      take: 50,
    });

    return NextResponse.json({
      leaderboard: users,
    });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
