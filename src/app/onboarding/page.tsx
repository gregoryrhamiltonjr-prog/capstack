import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { OnboardingWizard } from "@/components/OnboardingWizard";

export default async function OnboardingPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.onboarded) redirect("/dashboard");
  return (
    <div className="min-h-dvh">
      <OnboardingWizard
        defaults={{
          stage: user.careerStage,
          area: user.jobArea,
          goal: user.weeklyGoal,
          realm: user.startingRealm,
          path: user.guidedPath,
          school: user.school ?? "",
          company: user.company ?? "",
        }}
      />
    </div>
  );
}
