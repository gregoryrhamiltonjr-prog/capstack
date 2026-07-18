import { NextResponse } from "next/server";
import { getMobileUser } from "@/lib/mobile-auth";

export async function GET(request: Request) {
  try {
    const user = await getMobileUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      xp: user.xp,
      gems: 0,
      currentStreak: user.currentStreak,
      careerStage: user.careerStage,
      jobArea: user.jobArea,
    });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
