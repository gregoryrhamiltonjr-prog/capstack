import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { levelProgress } from "@/lib/xp";
import { ProfileAvatarUpload } from "@/components/ProfileAvatarUpload";
import { CourseProgressCards } from "@/components/CourseProgressCards";
import { careerStageLabel } from "@/lib/presentation";
import { getCourseState } from "@/lib/progress";
import { effectiveFreeRoam } from "@/lib/subscription";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/");
  const progress = levelProgress(user.xp);
  const courses = await getCourseState(user.id, effectiveFreeRoam(user));

  return <div className="mx-auto max-w-4xl 2xl:max-w-5xl space-y-6 pb-8">
    <section className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div aria-hidden="true" className="h-24 bg-gradient-to-r from-brand/20 via-info/10 to-transparent" />
      <div className="relative space-y-5 px-5 pb-6 sm:px-7"><div className="-mt-10"><ProfileAvatarUpload name={user.displayName} color={user.avatarColor} url={user.avatarUrl} /></div><div className="flex flex-wrap items-start justify-between gap-4"><div className="min-w-0"><h1 className="break-words text-2xl font-bold text-ink sm:text-3xl">{user.displayName}</h1><div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-muted"><span className="flex items-center gap-1.5"><Icon name="briefcase" size={14} />{careerStageLabel(user.careerStage)}</span>{user.company && <span className="flex min-w-0 items-center gap-1.5"><Icon name="building" size={14} className="shrink-0" /><span className="break-words">{user.company}</span></span>}{user.school && <span className="flex min-w-0 items-center gap-1.5"><Icon name="book" size={14} className="shrink-0" /><span className="break-words">{user.school}</span></span>}</div></div><Link href="/settings" className="btn-ghost">Edit profile</Link></div><dl className="grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-3">{[{ label: "Rank", value: progress.rank }, { label: "Total XP", value: user.xp.toLocaleString() }, { label: "Longest streak", value: `${user.longestStreak} days` }].map((stat) => <div key={stat.label}><dt className="text-xs text-ink-muted">{stat.label}</dt><dd className="mt-1 text-lg font-semibold text-ink tabnum">{stat.value}</dd></div>)}</dl></div>
    </section>
    <CourseProgressCards courses={courses} />
  </div>;
}
