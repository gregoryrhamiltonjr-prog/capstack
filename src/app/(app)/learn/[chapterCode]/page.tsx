import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCompletedLessonIds, getCourseState } from "@/lib/progress";
import { effectiveFreeRoam } from "@/lib/subscription";
import { ChapterExperience } from "@/components/ChapterExperience";

export default async function LearnPage({
  params,
  searchParams,
}: {
  params: Promise<{ chapterCode: string }>;
  searchParams: Promise<{ lesson?: string; tab?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { chapterCode } = await params;
  const { lesson: lessonParam, tab } = await searchParams;
  const initialLesson = Number.isFinite(Number(lessonParam)) ? Math.max(0, Math.trunc(Number(lessonParam))) : 0;
  const initialTab = tab === "quiz" ? "quiz" : "lessons";

  const chapter = await db.chapter.findUnique({
    where: { id: chapterCode },
    include: {
      lessons: { orderBy: { orderIndex: "asc" } },
      questions: { orderBy: { orderIndex: "asc" } },
      glossary: true,
    },
  });

  if (!chapter) notFound();

  const progress = await db.chapterProgress.findUnique({
    where: { userId_chapterId: { userId: user.id, chapterId: chapter.id } },
  });
  const tracks = await getCourseState(user.id, effectiveFreeRoam(user));
  const track = tracks.find((t) => t.modules.some((m) => m.chapters.some((c) => c.code === chapter.code)));
  // Course order (across units), so "Next chapter" continues into the next unit
  // instead of dead-ending at the end of each unit.
  const ordered = track?.modules.flatMap((m) => m.chapters) ?? [];
  const idx = ordered.findIndex((c) => c.code === chapter.code);
  const chapterState = ordered[idx];

  if (!track || !chapterState?.viewable) redirect(track ? `/course/${track.code}` : "/map");

  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx < ordered.length - 1 ? ordered[idx + 1] : null;
  const completedLessonIds = await getCompletedLessonIds(user.id, chapter.lessons.map((l) => l.id));

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
      course={{ code: track.code, title: track.title }}
      prev={prev?.viewable ? { code: prev.code, title: prev.title } : null}
      next={next?.viewable ? { code: next.code, title: next.title } : null}
      initialCompletedIds={[...completedLessonIds]}
      initialLesson={initialLesson}
      initialTab={initialTab}
    />
  );
}
