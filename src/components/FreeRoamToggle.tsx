import { toggleFreeRoamFromForm } from "@/lib/actions";

export function FreeRoamToggle({ initial, locked = false }: { initial: boolean; locked?: boolean }) {
  const next = !initial;

  // During the trial (or without a paid plan) free roam can't be enabled.
  if (locked) {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={false}
        aria-disabled="true"
        disabled
        aria-label="Free roam mode is available on paid plans only"
        title="Available on paid plans — activates after your trial converts"
        className="relative h-6 w-12 shrink-0 cursor-not-allowed rounded-full border border-line bg-surface-raised p-1 opacity-60"
      >
        <span className="block h-4 w-4 translate-x-0 rounded-full bg-ink-faint shadow" />
      </button>
    );
  }

  return (
    <form action={toggleFreeRoamFromForm} className="shrink-0">
      <input type="hidden" name="freeRoam" value={String(next)} />
      <button
        type="submit"
        role="switch"
        aria-checked={initial}
        aria-label={initial ? "Turn free roam mode off" : "Turn free roam mode on"}
        className={`relative h-6 w-12 shrink-0 rounded-full p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
          initial ? "bg-brand" : "border border-line bg-surface-raised"
        }`}
      >
        <span
          className={`block h-4 w-4 rounded-full bg-white shadow transition-transform ${
            initial ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </form>
  );
}
