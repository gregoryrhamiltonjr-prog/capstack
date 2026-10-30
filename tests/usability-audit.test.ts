import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CourseDetailView } from "../src/components/CourseDetailView";
import { isAnswerReady } from "../src/lib/quiz";
import { canAccessDirectMessage } from "../src/lib/chat-policy";
import { careerStageLabel, membershipControl } from "../src/lib/presentation";
import { parseProfileSettings, persistProfileSettings } from "../src/lib/profile-settings";
import type { TrackState } from "../src/lib/progress";

const longLesson = "NOI vs. NCF — and why lenders underwrite NCF instead of NOI when sizing a senior loan";
const track: TrackState = {
  id: "cre-basics", code: "T1", realm: "cre", title: "What is Commercial Real Estate?",
  tagline: "The vocabulary and math everything else stands on.", tier: "Foundations 100", flagship: false,
  estHours: "12–14h", prereqTrackIds: [], unlocked: true, complete: false, progressPct: 0,
  modules: [{
    id: "unit-1", code: "T1.M1", title: "The CRE Ecosystem", description: "The 30,000-foot map.",
    adaptive: false, difficultyTier: "Foundations 100", estHours: "1h", unlocked: true, complete: false,
    chapters: [
      {
        id: "T1.M1.1", code: "T1.M1.1", title: "What is Commercial Real Estate?", objective: "Define CRE.", orderIndex: 0,
        lessonCount: 3, questionCount: 8, status: "in_progress", viewable: true, quizUnlocked: true, bestScorePct: 0, lessonsDone: 1,
        lessons: [
          { id: "T1.M1.1#0", title: "CRE vs. residential", orderIndex: 0 },
          { id: "T1.M1.1#1", title: "The four quadrants", orderIndex: 1 },
          { id: "T1.M1.1#2", title: longLesson, orderIndex: 2 },
        ],
      },
      {
        id: "T1.M1.2", code: "T1.M1.2", title: "The Players and How Money Flows", objective: "Know the cast.", orderIndex: 1,
        lessonCount: 1, questionCount: 7, status: "available", viewable: true, quizUnlocked: false, bestScorePct: 0, lessonsDone: 0,
        lessons: [{ id: "T1.M1.2#0", title: "The cast of characters", orderIndex: 0 }],
      },
    ],
  }],
};

const renderCourse = (done: string[] = []) =>
  renderToStaticMarkup(createElement(CourseDetailView, { track, completedLessonIds: new Set(done) }));

test("course breakdown uses a stable grid, never CSS multi-columns", () => {
  const html = renderCourse();
  assert.match(html, /data-course-chapter-grid="true" class="grid items-stretch gap-4 md:grid-cols-2(?: [^"]*)?"/);
  assert.doesNotMatch(html, /columns-\d|break-inside/);
});

test("course breakdown shows full lesson titles and counts chapters consistently", () => {
  const html = renderCourse();
  assert.ok(html.includes(longLesson));
  assert.doesNotMatch(html, /class="truncate">NOI vs/);
  assert.match(html, /1 units · 2 chapters/);
  assert.doesNotMatch(html, /modules/);
});

test("course breakdown marks durably completed lessons and links lessons by position", () => {
  const html = renderCourse(["T1.M1.1#1"]);
  assert.equal((html.match(/\(completed\)/g) ?? []).length, 1);
  assert.match(html, /href="\/learn\/T1\.M1\.1\?lesson=2"/);
});

test("locked quizzes explain how to unlock them", () => {
  const html = renderCourse();
  assert.match(html, /href="\/learn\/T1\.M1\.1\?tab=quiz"/);
  assert.match(html, /Quiz · 7 questions <span[^>]*>\(pass earlier chapters to unlock\)/);
});

test("blank quiz answers cannot be checked", () => {
  assert.equal(isAnswerReady("mc", {}), false);
  assert.equal(isAnswerReady("mc", { choice: 0 }), true);
  assert.equal(isAnswerReady("scenario", { choice: 2 }), true);
  assert.equal(isAnswerReady("numeric", { numeric: "" }), false);
  assert.equal(isAnswerReady("numeric", { numeric: "abc" }), false);
  assert.equal(isAnswerReady("numeric", { numeric: "$1,250" }), true);
  assert.equal(isAnswerReady("ordering", {}), true);
});

test("learning surfaces no longer use pointer-driven tilt, glow or magnetic wrappers", () => {
  for (const file of [
    "src/components/ChapterExperience.tsx",
    "src/components/artifacts/ChapterQuiz.tsx",
    "src/components/LessonRenderer.tsx",
    "src/components/artifacts/Games.tsx",
    "src/components/artifacts/Poll.tsx",
    "src/components/social/SocialHub.tsx",
    "src/components/CourseDetailView.tsx",
  ]) {
    const source = readFileSync(file, "utf8");
    assert.doesNotMatch(source, /InteractiveWrappers|Tilt3D|MouseGlow|Magnetic|ScrubStagger|ParallaxLayer/, file);
  }
});

test("chapter page restores saved completion and keeps navigation in course order", () => {
  const source = readFileSync("src/components/ChapterExperience.tsx", "utf8");
  assert.match(source, /initialCompletedIds\.map/);
  assert.match(source, /scrollIntoView/);
  assert.match(source, /history\.replaceState/);
  const page = readFileSync("src/app/(app)/learn/[chapterCode]/page.tsx", "utf8");
  assert.match(page, /getCompletedLessonIds/);
  assert.match(page, /modules\.flatMap\(\(m\) => m\.chapters\)/);
  assert.match(page, /notFound\(\)/);
});

test("landing headline has a readable accessible name and fits short viewports", () => {
  const source = readFileSync("src/components/LandingCinema.tsx", "utf8");
  assert.match(source, /<span aria-hidden="true" className=\{`block whitespace-nowrap/);
  assert.match(source, /className="sr-only"/);
  assert.match(source, /end: "\+=110%"/);
  assert.match(source, /min\(8\.2vw, 11svh\)/);
  // Fixed-size slabs must scale with the stack on short screens and never block the CTAs.
  assert.match(source, /hero-tower pointer-events-none/);
  assert.match(source, /\[@media\(max-height:820px\)\]:scale-\[0\.66\]/);
});

test("fonts are self-hosted rather than loaded from a blocking third-party stylesheet", () => {
  assert.doesNotMatch(readFileSync("src/app/globals.css", "utf8"), /fonts\.googleapis/);
  assert.match(readFileSync("src/app/layout.tsx", "utf8"), /@fontsource\/ibm-plex-sans\/400\.css/);
});

test("direct-message access fails closed for malformed or foreign channels", () => {
  assert.equal(canAccessDirectMessage("dm:a:b", "a"), true);
  assert.equal(canAccessDirectMessage("dm:a:b", "b"), true);
  assert.equal(canAccessDirectMessage("dm:a:b", "c"), false);
  assert.equal(canAccessDirectMessage("dm:a:a", "a"), false);
  assert.equal(canAccessDirectMessage("legacy", "a"), false);
  assert.equal(canAccessDirectMessage(null, "a"), false);
  assert.equal(canAccessDirectMessage("dm:a:b:c", "a"), false);
});

test("profile settings validate input and report save failures", async () => {
  const form = (values: Record<string, string>) => {
    const data = new FormData();
    for (const [key, value] of Object.entries(values)) data.set(key, value);
    return data;
  };
  const valid = { displayName: " Greg ", weeklyGoal: "5", careerStage: "student", jobArea: "agency_am", company: "", school: "UNC" };
  const parsed = parseProfileSettings(form(valid));
  if (!parsed.ok) assert.fail(JSON.stringify(parsed.errors));
  assert.equal(parsed.value.displayName, "Greg");
  assert.equal(parsed.value.company, null);

  const invalid = parseProfileSettings(form({ ...valid, displayName: "", weeklyGoal: "0", careerStage: "ceo" }));
  assert.equal(invalid.ok, false);
  if (!invalid.ok) assert.deepEqual(Object.keys(invalid.errors).sort(), ["careerStage", "displayName", "weeklyGoal"]);

  const failed = await persistProfileSettings(form(valid), async () => { throw new Error("db down"); });
  assert.equal(failed.status, "error");
  let saved: unknown;
  const ok = await persistProfileSettings(form(valid), async (value) => { saved = value; });
  assert.equal(ok.status, "success");
  assert.ok(saved);
});

test("membership controls never send administrators to checkout", () => {
  assert.equal(membershipControl({ isAdmin: true, stripeCustomerId: null, subscriptionStatus: null, trialEndsAt: null, currentPeriodEnd: null } as never), "admin");
  assert.equal(careerStageLabel("unknown_stage"), "unknown stage");
});

test("landing page carries no fabricated testimonials or unbuilt-feature claims", () => {
  const landing = ["src/app/page.tsx", "src/components/LandingBlocks.tsx", "src/components/LandingCinema.tsx", "src/components/ComingSoon.tsx"]
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");
  for (const claim of [/Testimonials/, /proprietary screener/i, /four leaderboards/i, /company discovery/i, /Drag and drop/i, /next Friday/i, /founding-member pricing/i, /"6", "interactive/, /title: "LBO Modeling"/]) {
    assert.doesNotMatch(landing, claim);
  }
});
