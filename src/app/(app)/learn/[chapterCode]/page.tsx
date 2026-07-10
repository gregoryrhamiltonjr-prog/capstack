import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCourseState } from "@/lib/progress";
import { effectiveFreeRoam } from "@/lib/subscription";
import { ChapterExperience } from "@/components/ChapterExperience";

export default async function LearnPage({ params }: { params: Promise<{ chapterCode: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { chapterCode } = await params;

  const chapter = await db.chapter.findUnique({
    where: { id: chapterCode },
    include: {
      lessons: { orderBy: { orderIndex: "asc" } },
      questions: { orderBy: { orderIndex: "asc" } },
      glossary: true,
      module: { include: { chapters: { orderBy: { orderIndex: "asc" }, select: { id: true, code: true } } } },
    },
  });

  if (!chapter) {
    return (
      <div className="mx-auto max-w-3xl py-10 text-center">
        <h1 className="text-2xl font-bold">Chapter not found</h1>
        <p className="mt-2 text-ink-muted">The requested chapter ({chapterCode}) does not exist.</p>
      </div>
    );
  }

  const siblings = chapter.module.chapters;
  const idx = siblings.findIndex((c) => c.id === chapter.id);
  const prevCode = idx > 0 ? siblings[idx - 1].id : null;
  const nextCode = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1].id : null;

  const progress = await db.chapterProgress.findUnique({
    where: { userId_chapterId: { userId: user.id, chapterId: chapter.id } },
  });
  const tracks = await getCourseState(user.id, effectiveFreeRoam(user));
  const chapterState = tracks.flatMap((track) => track.modules.flatMap((module) => module.chapters)).find((c) => c.code === chapter.code);

  if (!chapterState?.viewable) redirect("/map");

  return (
    <ChapterExperience
      chapterId={chapter.id}
      chapterCode={chapter.code}
      title={chapter.title}
      objective={chapter.objective}
      lessons={chapter.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        readMinutes: l.readMinutes,
        blocks: l.blocks,
        orderIndex: l.orderIndex,
      }))}
      questions={chapter.questions.map((q) => ({
        id: q.id,
        type: q.type,
        prompt: q.prompt,
        data: q.data,
        explanation: q.explanation,
        hints: q.hints,
        points: q.points,
        orderIndex: q.orderIndex,
      }))}
      glossary={chapter.glossary.map((g) => ({ term: g.term, definition: g.definition }))}
      bestScorePct={progress?.bestScorePct ?? 0}
      quizUnlocked={chapterState.quizUnlocked}
      prevCode={prevCode}
      nextCode={nextCode}
    />
  );
}
