export const PASS_PCT = 70;

/** Whether the learner has given an answer that can be graded (blank answers are not submitted). */
export function isAnswerReady(type: string, state: { choice?: number; numeric?: string }): boolean {
  if (type === "mc" || type === "scenario") return typeof state.choice === "number";
  if (type === "numeric") return Number.isFinite(parseFloat(String(state.numeric ?? "").replace(/[^0-9.-]/g, "")));
  return true; // ordering always has a current order
}

/** Small deterministic PRNG so a question always renders the same way (SSR == client). */
function seededRandom(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A stable shuffle of indices 0..n-1 for a question. Authored content lists ordering
 * items in their correct sequence and often puts the right choice in the same slot, so
 * displaying authored order would give the answer away.
 */
export function stablePermutation(n: number, seed: string, avoidIdentity = false): number[] {
  const order = Array.from({ length: n }, (_, i) => i);
  if (n < 2) return order;
  const random = seededRandom(seed);
  for (let attempt = 0; attempt < 8; attempt++) {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    if (!avoidIdentity || order.some((v, i) => v !== i)) return order;
  }
  // Guaranteed non-identity fallback: rotate by one.
  return order.map((_, i) => (i + 1) % n);
}
