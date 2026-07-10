import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Icon } from "@/components/ui";
import { MouseGlow, ScrubReveal } from "@/components/InteractiveWrappers";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-3xl space-y-10 pb-20">
      <header className="border-b border-line pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink">Settings</h1>
        <p className="mt-2 text-lg text-ink-muted">Manage your account and preferences.</p>
      </header>

      <ScrubReveal className="space-y-8">
        <MouseGlow className="card p-6 bg-surface">
          <h2 className="text-xl font-bold text-ink mb-6">Account Details</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1">Display Name</label>
              <input type="text" defaultValue={user.displayName} className="w-full bg-surface-raised border border-line rounded-lg px-4 py-2 text-ink focus:outline-none focus:border-brand transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1">Email Address</label>
              <input type="email" defaultValue={user.email} disabled className="w-full bg-canvas border border-line rounded-lg px-4 py-2 text-ink-muted cursor-not-allowed" />
            </div>
            <div className="pt-2">
              <button className="btn-primary px-6 py-2 text-sm shadow-glow">Save Changes</button>
            </div>
          </div>
        </MouseGlow>

        <MouseGlow className="card p-6 bg-surface">
          <h2 className="text-xl font-bold text-ink mb-6">Learning Preferences</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <div className="font-bold text-ink">Free Roam Mode</div>
                <div className="text-sm text-ink-muted mt-1">Unlock all modules without passing prerequisites. Disables XP tracking.</div>
              </div>
              <div className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${user.freeRoam ? 'bg-brand' : 'bg-surface-raised border border-line'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${user.freeRoam ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-ink">Weekly Goal</div>
                <div className="text-sm text-ink-muted mt-1">Target number of lessons to complete per week.</div>
              </div>
              <select defaultValue={user.weeklyGoal} className="bg-surface-raised border border-line rounded-lg px-4 py-2 text-ink outline-none focus:border-brand">
                <option value="1">1 Lesson / Week (Casual)</option>
                <option value="5">5 Lessons / Week (Regular)</option>
                <option value="10">10 Lessons / Week (Intense)</option>
              </select>
            </div>
          </div>
        </MouseGlow>

        <MouseGlow className="card p-6 border-danger/20 border bg-surface">
          <h2 className="text-xl font-bold text-danger mb-4">Danger Zone</h2>
          <p className="text-sm text-ink-muted mb-6">Once you delete your account, there is no going back. Please be certain.</p>
          <button className="px-4 py-2 bg-danger/10 text-danger font-bold rounded-lg hover:bg-danger/20 transition-colors border border-danger/30">
            Delete Account
          </button>
        </MouseGlow>
      </ScrubReveal>
    </div>
  );
}
