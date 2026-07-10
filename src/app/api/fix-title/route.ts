import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
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
