import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.chapter.updateMany({
      where: {
        code: "T1.M1.1"
      },
      data: {
        title: "What is Commercial Real Estate?"
      }
    });
    return NextResponse.json({ success: true, message: "Updated chapter title!" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
