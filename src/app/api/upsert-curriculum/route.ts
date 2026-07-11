import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { ALL_TRACKS } from "@/content";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let trackOrder = 0;
    for (const t of ALL_TRACKS) {
      await prisma.track.upsert({
        where: { id: t.id },
        update: {
          realm: t.realm,
          code: t.code,
          title: t.title,
          tagline: t.tagline,
          description: t.description,
          tier: t.tier,
          difficulty: t.difficulty,
          estHours: t.estHours,
          orderIndex: t.orderIndex ?? trackOrder,
          flagship: t.flagship ?? false,
          prereqTrackIds: JSON.stringify(t.prereqTrackIds ?? []),
        },
        create: {
          id: t.id,
          realm: t.realm,
          code: t.code,
          title: t.title,
          tagline: t.tagline,
          description: t.description,
          tier: t.tier,
          difficulty: t.difficulty,
          estHours: t.estHours,
          orderIndex: t.orderIndex ?? trackOrder,
          flagship: t.flagship ?? false,
          prereqTrackIds: JSON.stringify(t.prereqTrackIds ?? []),
        },
      });
      trackOrder++;

      let modOrder = 0;
      for (const m of t.modules) {
        await prisma.module.upsert({
          where: { id: m.code },
          update: {
            trackId: t.id,
            code: m.code,
            title: m.title,
            description: m.description,
            estHours: m.estHours,
            difficultyTier: m.difficultyTier,
            adaptive: m.adaptive ?? false,
            orderIndex: modOrder,
            prereqModuleIds: JSON.stringify(m.prereqModuleCodes ?? []),
          },
          create: {
            id: m.code,
            trackId: t.id,
            code: m.code,
            title: m.title,
            description: m.description,
            estHours: m.estHours,
            difficultyTier: m.difficultyTier,
            adaptive: m.adaptive ?? false,
            orderIndex: modOrder,
            prereqModuleIds: JSON.stringify(m.prereqModuleCodes ?? []),
          },
        });
        modOrder++;

        let chOrder = 0;
        for (const c of m.chapters) {
          await prisma.chapter.upsert({
            where: { id: c.code },
            update: {
              moduleId: m.code,
              code: c.code,
              title: c.title,
              objective: c.objective,
              orderIndex: chOrder,
              stageCallouts: JSON.stringify(c.stageCallouts ?? {}),
            },
            create: {
              id: c.code,
              moduleId: m.code,
              code: c.code,
              title: c.title,
              objective: c.objective,
              orderIndex: chOrder,
              stageCallouts: JSON.stringify(c.stageCallouts ?? {}),
            },
          });
          chOrder++;

          let lOrder = 0;
          for (const l of c.lessons) {
            const lessonId = `${c.code}#${lOrder}`;
            await prisma.lesson.upsert({
              where: { id: lessonId },
              update: {
                chapterId: c.code,
                title: l.title,
                orderIndex: lOrder,
                readMinutes: l.readMinutes ?? 5,
                blocks: JSON.stringify(l.blocks),
              },
              create: {
                id: lessonId,
                chapterId: c.code,
                title: l.title,
                orderIndex: lOrder,
                readMinutes: l.readMinutes ?? 5,
                blocks: JSON.stringify(l.blocks),
              },
            });
            lOrder++;
          }

          let qOrder = 0;
          for (const q of c.quiz) {
            const quizId = `${c.code}Q${qOrder}`;
            await prisma.quizQuestion.upsert({
              where: { id: quizId },
              update: {
                chapterId: c.code,
                type: q.type,
                prompt: q.prompt,
                data: JSON.stringify(q.data),
                explanation: q.explanation,
                hints: JSON.stringify(q.hints),
                orderIndex: qOrder,
              },
              create: {
                id: quizId,
                chapterId: c.code,
                type: q.type,
                prompt: q.prompt,
                data: JSON.stringify(q.data),
                explanation: q.explanation,
                hints: JSON.stringify(q.hints),
                orderIndex: qOrder,
              },
            });
            qOrder++;
          }
        }
      }
    }
    return NextResponse.json({ success: true, message: "Curriculum upserted!" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
