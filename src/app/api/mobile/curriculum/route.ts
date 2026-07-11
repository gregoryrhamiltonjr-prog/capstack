import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getMobileUser } from "@/lib/mobile-auth";

export async function GET(request: Request) {
  try {
    const user = await getMobileUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the full curriculum tree
    const tracks = await db.track.findMany({
      orderBy: { orderIndex: "asc" },
      include: {
        modules: {
          orderBy: { orderIndex: "asc" },
          include: {
            chapters: {
              orderBy: { orderIndex: "asc" },
            },
          },
        },
      },
    });

    // Fetch user progress for chapters
    const progress = await db.chapterProgress.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json({
      tracks,
      progress,
    });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
