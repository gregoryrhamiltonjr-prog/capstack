import { getCurrentUser } from "@/lib/auth";
import { getCourseState } from "@/lib/progress";
import { effectiveFreeRoam } from "@/lib/subscription";
import { redirect } from "next/navigation";
import { CourseMapView } from "@/components/CourseMapView";

export default async function MapPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/");

  const tracks = await getCourseState(user.id, effectiveFreeRoam(user));
  return <CourseMapView tracks={tracks} />;
}
