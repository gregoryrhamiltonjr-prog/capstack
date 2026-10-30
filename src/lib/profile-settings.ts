import { CAREER_STAGES, JOB_AREAS } from "./types";

export type ProfileSettings = {
  displayName: string;
  weeklyGoal: number;
  careerStage: string;
  jobArea: string;
  company: string | null;
  school: string | null;
};
export type SettingsField = keyof ProfileSettings;
export type SettingsState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<SettingsField, string>>;
};
export const INITIAL_SETTINGS_STATE: SettingsState = { status: "idle", message: "" };

export function parseProfileSettings(form: FormData): { ok: true; value: ProfileSettings } | { ok: false; errors: NonNullable<SettingsState["errors"]> } {
  const text = (key: string) => typeof form.get(key) === "string" ? String(form.get(key)).trim() : "";
  const displayName = text("displayName");
  const goalText = text("weeklyGoal");
  const weeklyGoal = Number(goalText);
  const careerStage = text("careerStage");
  const jobArea = text("jobArea");
  const company = text("company");
  const school = text("school");
  const errors: NonNullable<SettingsState["errors"]> = {};
  if (!displayName || displayName.length > 80 || /[\u0000-\u001f\u007f]/.test(displayName)) errors.displayName = "Enter a display name of 1–80 characters.";
  if (!/^\d+$/.test(goalText) || !Number.isSafeInteger(weeklyGoal) || weeklyGoal < 1 || weeklyGoal > 50) errors.weeklyGoal = "Choose a weekly goal from 1 to 50 lessons.";
  if (!CAREER_STAGES.some((stage) => stage.id === careerStage)) errors.careerStage = "Choose a career stage from the list.";
  if (!JOB_AREAS.some((area) => area.id === jobArea)) errors.jobArea = "Choose a focus from the list.";
  for (const [key, value] of [["company", company], ["school", school]] as const) {
    if (value.length > 120 || /[\u0000-\u001f\u007f]/.test(value)) errors[key] = "Use 120 characters or fewer, on one line.";
  }
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { displayName, weeklyGoal, careerStage, jobArea, company: company || null, school: school || null } };
}

/** Testable persistence boundary; the server action supplies the authenticated writer. */
export async function persistProfileSettings(form: FormData, persist: (value: ProfileSettings) => Promise<unknown>): Promise<SettingsState> {
  const parsed = parseProfileSettings(form);
  if (!parsed.ok) return { status: "error", message: "Check the highlighted fields.", errors: parsed.errors };
  try {
    await persist(parsed.value);
    return { status: "success", message: "Your profile and learning preferences have been saved." };
  } catch {
    return { status: "error", message: "We couldn’t save your changes. Please try again." };
  }
}
