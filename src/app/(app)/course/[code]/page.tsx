import { getCurrentUser } from "@/lib/auth";
import { getCourseState, getCompletedLessonIds } from "@/lib/progress";
import { effectiveFreeRoam } from "@/lib/subscription";
import { redirect, notFound } from "next/navigation";
import { CourseDetailView } from "@/components/CourseDetailView";

export default async function CoursePage({ params }: { params: Promise<{ code: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const { code } = await params;

  const tracks = await getCourseState(user.id, effectiveFreeRoam(user));
  const track = tracks.find((t) => t.code.toLowerCase() === decodeURIComponent(code).toLowerCase());
  if (!track) notFound();

  const completedLessonIds = await getCompletedLessonIds(user.id);
  return <CourseDetailView track={track} completedLessonIds={completedLessonIds} />;
}
