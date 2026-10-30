export default function DashboardLoading() {
  return (
    <div role="status" aria-label="Loading your learning desk" className="mx-auto max-w-6xl space-y-7">
      <span className="sr-only">Loading your dashboard…</span>
      <div aria-hidden="true" className="space-y-7 motion-safe:animate-pulse">
        <div className="space-y-3"><div className="h-3 w-36 rounded bg-surface-raised" /><div className="h-9 w-3/4 max-w-md rounded-lg bg-surface-raised" /></div>
        <div className="h-72 rounded-3xl border border-line bg-surface" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[1, 2, 3, 4].map((key) => <div key={key} className="h-32 rounded-2xl border border-line bg-surface" />)}</div>
        <div className="h-64 rounded-2xl border border-line bg-surface" />
      </div>
    </div>
  );
}
