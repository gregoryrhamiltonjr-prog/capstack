import type { Block } from "../lib/types";

export type SeedQ = {
  type: "mc" | "numeric" | "ordering" | "scenario";
  prompt: string;
  data: unknown;
  explanation: string;
  hints: [string, string, string];
};

export type SeedLesson = {
  title: string;
  readMinutes?: number;
  blocks: Block[];
};

export type SeedChapter = {
  code: string;
  title: string;
  objective: string;
  stageCallouts?: Record<string, string>;
  lessons: SeedLesson[];
  quiz: SeedQ[];
  glossary?: { term: string; definition: string }[];
};

export type SeedModule = {
  code: string;
  title: string;
  description: string;
  estHours: string;
  difficultyTier: string;
  adaptive?: boolean;
  prereqModuleCodes?: string[];
  chapters: SeedChapter[];
};

export type SeedTrack = {
  id: string;
  realm: "cre" | "hf";
  code: string;
  title: string;
  tagline: string;
  description: string;
  tier: string;
  difficulty: string;
  estHours: string;
  orderIndex: number;
  flagship?: boolean;
  prereqTrackIds?: string[];
  modules: SeedModule[];
};

// terse block helpers
export const p = (md: string): Block => ({ type: "prose", md });
export const desk = (md: string, title = "How this shows up on the desk"): Block => ({ type: "callout", variant: "desk", title, md });
export const interview = (md: string, title = "Interview ammo"): Block => ({ type: "callout", variant: "interview", title, md });
export const note = (md: string, title?: string): Block => ({ type: "callout", variant: "note", title, md });
export const warn = (md: string, title?: string): Block => ({ type: "callout", variant: "warning", title, md });
export const practice = (md: string, title = "In practice"): Block => ({ type: "callout", variant: "practice", title, md });
export const worked = (title: string, md: string): Block => ({ type: "worked", title, md });
export const formula = (md: string, caption?: string): Block => ({ type: "formula", md, caption });
export const widget = (name: string, title?: string, props?: Record<string, unknown>): Block => ({ type: "widget", name, title, props });
export const crosslink = (toCode: string, label: string): Block => ({ type: "crosslink", toCode, label });
export const stage = (layers: Record<string, string>, title?: string): Block => ({ type: "stage", layers, title });
export const scene3d = (variant: "stack" | "building" | "waterfall" | "auto" = "auto", title?: string, props?: Record<string, unknown>): Block => ({
  type: "scene3d",
  variant,
  title,
  props,
});
export const poll = (id: string, question: string, options: string[], seed?: number[]): Block => ({
  type: "poll",
  id,
  question,
  options,
  seed,
});
export const game = (name: string, title?: string): Block => ({ type: "game", name, title });
export const artifact = (
  kind: "poll" | "game" | "scene3d",
  name?: string,
  title?: string,
  props?: Record<string, unknown>
): Block => ({ type: "artifact", kind, name, title, props });

// quiz helpers
export const mc = (prompt: string, choices: string[], correct: number, explanation: string, hints: [string, string, string]): SeedQ => ({
  type: "mc",
  prompt,
  data: { choices, correct },
  explanation,
  hints,
});
export const numeric = (prompt: string, answer: number, tolerance: number, explanation: string, hints: [string, string, string], opts?: { unit?: string; prefix?: string }): SeedQ => ({
  type: "numeric",
  prompt,
  data: { answer, tolerance, unit: opts?.unit, prefix: opts?.prefix },
  explanation,
  hints,
});
export const ordering = (prompt: string, itemsInOrder: string[], explanation: string, hints: [string, string, string]): SeedQ => ({
  type: "ordering",
  prompt,
  data: { items: itemsInOrder, correctOrder: itemsInOrder.map((_, i) => i) },
  explanation,
  hints,
});
export const scenario = (prompt: string, narrative: string, choices: string[], correct: number, explanation: string, hints: [string, string, string]): SeedQ => ({
  type: "scenario",
  prompt,
  data: { narrative, choices, correct },
  explanation,
  hints,
});
