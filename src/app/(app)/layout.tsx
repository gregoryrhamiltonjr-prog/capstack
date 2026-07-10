import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AppNav } from "@/components/AppNav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.onboarded) redirect("/onboarding");
  return (
    <div className="mx-auto flex min-h-dvh max-w-[1400px]">
      <AppNav xp={user.xp} streak={user.currentStreak} name={user.displayName} avatarColor={user.avatarColor} avatarUrl={user.avatarUrl} />
      <main className="min-w-0 flex-1 px-4 pb-24 pt-5 sm:px-6 lg:pb-8 lg:pt-8">{children}</main>
    </div>
  );
}
