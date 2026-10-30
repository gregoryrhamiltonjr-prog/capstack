export const PASS_PCT = 70;

/** Whether the learner has given an answer that can be graded (blank answers are not submitted). */
export function isAnswerReady(type: string, state: { choice?: number; numeric?: string }): boolean {
  if (type === "mc" || type === "scenario") return typeof state.choice === "number";
  if (type === "numeric") return Number.isFinite(parseFloat(String(state.numeric ?? "").replace(/[^0-9.-]/g, "")));
  return true; // ordering always has a current order
}
