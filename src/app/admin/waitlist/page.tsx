import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { WaitlistActions } from "./WaitlistActions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Waitlist | Admin | CapStack",
};

export default async function AdminWaitlistPage() {
  // Layouts and pages may render in parallel. Authorize at the data boundary,
  // before loading private signup data, not only in the parent layout.
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/");

  const signups = await db.waitlistSignup.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">Waitlist</h1>
          <p className="mt-1 text-ink-muted">
            {signups.length} {signups.length === 1 ? "person" : "people"} waiting for access.
          </p>
        </div>
        
        {signups.length > 0 && <WaitlistActions signups={signups} />}
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface/50 shadow-sm backdrop-blur">
        {signups.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 rounded-full bg-brand/10 p-4 text-brand">
              {/* placeholder for icon if needed */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="text-lg font-semibold text-ink">No signups yet</h3>
            <p className="mt-1 max-w-sm text-sm text-ink-muted">
              When people join the waitlist on the landing page, they will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-surface-raised/50 text-xs uppercase text-ink-muted">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Email</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Source</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Signed Up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-ink">
                {signups.map((signup) => (
                  <tr key={signup.id} className="transition-colors hover:bg-surface-raised/30">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-ink-bright">
                      {signup.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-surface-raised px-2.5 py-0.5 text-xs font-medium text-ink-muted ring-1 ring-inset ring-line">
                        {signup.source}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-ink-muted">
                      {signup.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
