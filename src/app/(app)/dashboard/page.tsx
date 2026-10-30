import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCourseState, findNextChapter } from "@/lib/progress";
import { effectiveFreeRoam } from "@/lib/subscription";
import { db } from "@/lib/db";
import { activityWindowStart, dailyXpSeries, startOfUtcWeek } from "@/lib/dashboard";
import { DashboardView } from "@/components/DashboardView";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/");

  const now = new Date();
  const weekStart = startOfUtcWeek(now);
  const [tracks, events, lessonsThisWeek] = await Promise.all([
    getCourseState(user.id, effectiveFreeRoam(user)),
    db.xpEvent.findMany({
      where: { userId: user.id, createdAt: { gte: activityWindowStart(now), lte: now } },
      select: { amount: true, createdAt: true },
    }),
    db.lessonProgress.count({
      where: { userId: user.id, status: "completed", completedAt: { gte: weekStart, lte: now } },
    }),
  ]);
  const next = findNextChapter(tracks);
  const chapters = tracks.flatMap((track) => track.modules.flatMap((module) => module.chapters));

  return (
    <DashboardView
      name={user.displayName}
      xp={user.xp}
      streak={user.currentStreak}
      weeklyGoal={user.weeklyGoal}
      lessonsThisWeek={lessonsThisWeek}
      unlockedCourses={tracks.filter((track) => track.unlocked).length}
      completedChapters={chapters.filter((chapter) => chapter.status === "passed" || chapter.status === "tested_out").length}
      totalChapters={chapters.length}
      activity={dailyXpSeries(events, now)}
      weekLabel={`Week of ${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })}`}
      next={next ? {
        title: next.chapter.title,
        objective: next.chapter.objective,
        code: next.chapter.code,
        course: next.track.title,
        lessons: next.chapter.lessonCount,
      } : null}
    />
  );
}
