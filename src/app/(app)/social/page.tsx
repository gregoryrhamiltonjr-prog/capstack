import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSocialState } from "@/lib/social";
import { SocialHub } from "@/components/social/SocialHub";

export default async function SocialPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const state = await getSocialState(user.id);

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-20">
      <header className="border-b border-line pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Social</h1>
        <p className="mt-1.5 text-ink-muted">Groups and accountability partners.</p>
      </header>

      <SocialHub
        myGroups={state.myGroups}
        discoverGroups={state.discoverGroups}
        partner={state.partner}
        partnerConnId={state.partnerConnId}
        partnerNudgedAt={state.partnerNudgedAt}
        pendingIncoming={state.pendingIncoming}
        pendingOutgoing={state.pendingOutgoing}
        friends={state.friends}
        partnerCandidates={state.partnerCandidates}
      />
    </div>
  );
}
