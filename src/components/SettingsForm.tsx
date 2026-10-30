"use client";

import { useActionState } from "react";
import { CAREER_STAGES, JOB_AREAS } from "@/lib/types";
import { INITIAL_SETTINGS_STATE, type SettingsState, type ProfileSettings, type SettingsField } from "@/lib/profile-settings";

type SettingsAction = (previous: SettingsState, form: FormData) => Promise<SettingsState>;

export function SettingsForm({ initial, email, action }: { initial: ProfileSettings; email: string; action: SettingsAction }) {
  const [state, formAction, pending] = useActionState(action, INITIAL_SETTINGS_STATE);
  const error = (field: SettingsField) => state.errors?.[field];
  const fieldError = (field: SettingsField) => error(field) ? <p id={`${field}-error`} className="mt-1.5 text-xs text-danger">{error(field)}</p> : null;
  const goals = [...new Set([1, 3, 5, 7, 10, initial.weeklyGoal])].sort((a, b) => a - b);

  return (
    <form action={formAction} aria-busy={pending} className="card p-5 sm:p-6">
      <fieldset disabled={pending} className="min-w-0 space-y-6">
        <legend className="mb-5 text-xl font-bold text-ink">Profile & learning preferences</legend>
        <div className="grid min-w-0 gap-5 sm:grid-cols-2">
          <div className="min-w-0"><label htmlFor="settings-displayName" className="label">Display name</label><input id="settings-displayName" name="displayName" defaultValue={initial.displayName} required maxLength={80} autoComplete="nickname" className="input" aria-invalid={Boolean(error("displayName"))} aria-describedby={error("displayName") ? "displayName-error" : undefined} />{fieldError("displayName")}</div>
          <div className="min-w-0"><label htmlFor="settings-email" className="label">Sign-in email</label><input id="settings-email" type="email" value={email} readOnly className="input !text-ink-muted" aria-describedby="email-help" /><p id="email-help" className="mt-1.5 text-xs text-ink-muted">Your sign-in email is read-only here.</p></div>
          <div className="min-w-0"><label htmlFor="settings-careerStage" className="label">Career stage</label><select id="settings-careerStage" name="careerStage" defaultValue={initial.careerStage} className="input min-w-0" aria-invalid={Boolean(error("careerStage"))} aria-describedby={error("careerStage") ? "careerStage-error" : undefined}>{CAREER_STAGES.map((stage) => <option key={stage.id} value={stage.id}>{stage.label}</option>)}</select>{fieldError("careerStage")}</div>
          <div className="min-w-0"><label htmlFor="settings-jobArea" className="label">Learning focus</label><select id="settings-jobArea" name="jobArea" defaultValue={initial.jobArea} className="input min-w-0" aria-invalid={Boolean(error("jobArea"))} aria-describedby={error("jobArea") ? "jobArea-error" : undefined}>{JOB_AREAS.map((area) => <option key={area.id} value={area.id}>{area.label}</option>)}</select>{fieldError("jobArea")}</div>
          <div className="min-w-0"><label htmlFor="settings-company" className="label">Company <span className="normal-case font-normal">(optional)</span></label><input id="settings-company" name="company" defaultValue={initial.company ?? ""} maxLength={120} autoComplete="organization" className="input" aria-invalid={Boolean(error("company"))} />{fieldError("company")}</div>
          <div className="min-w-0"><label htmlFor="settings-school" className="label">School <span className="normal-case font-normal">(optional)</span></label><input id="settings-school" name="school" defaultValue={initial.school ?? ""} maxLength={120} className="input" aria-invalid={Boolean(error("school"))} />{fieldError("school")}</div>
        </div>
        <div className="min-w-0 border-t border-line pt-5"><label htmlFor="settings-weeklyGoal" className="label">Weekly lesson goal</label><p id="goal-help" className="mb-3 text-sm leading-6 text-ink-muted">Choose a pace you can sustain. Progress is measured Monday–Sunday in UTC.</p><select id="settings-weeklyGoal" name="weeklyGoal" defaultValue={initial.weeklyGoal} className="input min-w-0 sm:max-w-xs" aria-invalid={Boolean(error("weeklyGoal"))} aria-describedby={`goal-help${error("weeklyGoal") ? " weeklyGoal-error" : ""}`}>{goals.map((goal) => <option key={goal} value={goal}>{goal} {goal === 1 ? "lesson" : "lessons"} per week</option>)}</select>{fieldError("weeklyGoal")}</div>
        <div className="flex flex-wrap items-center gap-4 border-t border-line pt-5"><button type="submit" className="btn-primary min-h-11" disabled={pending}>{pending ? "Saving…" : "Save changes"}</button><p role={state.status === "error" ? "alert" : "status"} aria-live="polite" className={`min-w-0 flex-1 text-sm leading-6 ${state.status === "error" ? "text-danger" : "text-brand-bright"}`}>{state.message}</p></div>
      </fieldset>
    </form>
  );
}
