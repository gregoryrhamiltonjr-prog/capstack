/**
 * One-off database maintenance belongs in operator-run scripts, not HTTP routes.
 * Keep a non-mutating tombstone so old bookmarks and prefetchers are harmless.
 * Deliberately imports neither authentication nor the database.
 */
export function retiredMaintenanceResponse(): Response {
  return Response.json(
    { error: "This maintenance endpoint has been retired." },
    { status: 410, headers: { "Cache-Control": "no-store" } }
  );
}
