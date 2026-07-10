import { toggleFreeRoamFromForm } from "@/lib/actions";

export function FreeRoamToggle({ initial }: { initial: boolean }) {
  const next = !initial;

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
