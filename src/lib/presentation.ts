import { CAREER_STAGES, JOB_AREAS } from "./types";
import { hasAccess, type BillingUser } from "./subscription";

export function careerStageLabel(value: string): string {
  return CAREER_STAGES.find((stage) => stage.id === value)?.label ?? value.replace(/_/g, " ");
}
export function jobAreaLabel(value: string): string {
  return JOB_AREAS.find((area) => area.id === value)?.label ?? value.replace(/_/g, " ");
}
export function membershipControl(user: BillingUser & { isAdmin?: boolean; stripeCustomerId?: string | null }): "admin" | "manage" | "unavailable" | "subscribe" {
  if (user.isAdmin && !user.stripeCustomerId) return "admin";
  if (hasAccess(user)) return user.stripeCustomerId ? "manage" : "unavailable";
  return "subscribe";
}
