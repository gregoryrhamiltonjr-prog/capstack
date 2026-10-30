import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { activityWindowStart, dailyXpSeries, startOfUtcWeek, weeklyGoalProgress } from "../src/lib/dashboard";
import { DashboardView, type DashboardViewProps } from "../src/components/DashboardView";
import { isNavigationActive } from "../src/lib/navigation";

const now = new Date("2026-10-30T15:00:00Z");

test("UTC weeks start Monday and do not mutate their input", () => {
  assert.equal(startOfUtcWeek(now).toISOString(), "2026-10-26T00:00:00.000Z");
  assert.equal(now.toISOString(), "2026-10-30T15:00:00.000Z");
});

test("Sunday stays in the preceding week; Monday begins a new one", () => {
  assert.equal(startOfUtcWeek(new Date("2026-11-01T23:59:59Z")).toISOString(), "2026-10-26T00:00:00.000Z");
  assert.equal(startOfUtcWeek(new Date("2026-11-02T00:00:00Z")).toISOString(), "2026-11-02T00:00:00.000Z");
});

test("week and activity windows cross year boundaries correctly", () => {
  const date = new Date("2027-01-01T01:00:00Z");
  assert.equal(startOfUtcWeek(date).toISOString(), "2026-12-28T00:00:00.000Z");
  assert.equal(activityWindowStart(date).toISOString(), "2026-12-26T00:00:00.000Z");
});

test("activity always has seven ordered zero-filled days with today marked", () => {
  const series = dailyXpSeries([], now);
  assert.equal(series.length, 7);
  assert.equal(series[0].key, "2026-10-24");
  assert.equal(series[6].key, "2026-10-30");
  assert.equal(series[6].label, "Fri");
  assert.equal(series.filter((day) => day.today).length, 1);
  assert.ok(series.every((day) => day.xp === 0));
});

test("activity sums same-day events and excludes stale, future and non-finite events", () => {
  const series = dailyXpSeries([
    { amount: 20, createdAt: new Date("2026-10-30T10:00:00Z") },
    { amount: 10, createdAt: new Date("2026-10-30T12:00:00Z") },
    { amount: 100, createdAt: new Date("2026-10-23T23:59:59Z") },
    { amount: 100, createdAt: new Date("2026-10-30T16:00:00Z") },
    { amount: Number.NaN, createdAt: now },
  ], now);
  assert.equal(series[6].xp, 30);
  assert.equal(series.reduce((sum, day) => sum + day.xp, 0), 30);
});

test("empty weekly goals show zero actual progress rather than a fake 70%", () => {
  assert.deepEqual(weeklyGoalProgress(0, 5), { completed: 0, target: 5, remaining: 5, pct: 0, reached: false });
});

test("goal progress is capped while preserving extra completions", () => {
  assert.deepEqual(weeklyGoalProgress(7, 5), { completed: 7, target: 5, remaining: 0, pct: 100, reached: true });
});

test("invalid goal data is normalized safely", () => {
  assert.deepEqual(weeklyGoalProgress(-1, 0), weeklyGoalProgress(0, 5));
  assert.deepEqual(weeklyGoalProgress(Number.NaN, Number.POSITIVE_INFINITY), weeklyGoalProgress(0, 5));
});

const props: DashboardViewProps = {
  name: "Gregory Hamilton", xp: 0, streak: 0, weeklyGoal: 5, lessonsThisWeek: 0,
  unlockedCourses: 10, completedChapters: 0, totalChapters: 120,
  activity: dailyXpSeries([], now), weekLabel: "Week of Oct 26",
  next: { title: "What is Commercial Real Estate?", objective: "Build your foundation.", code: "T1.M1.1", course: "CRE foundations", lessons: 3 },
};
const render = (overrides: Partial<DashboardViewProps> = {}) => renderToStaticMarkup(createElement(DashboardView, { ...props, ...overrides }));

test("dashboard essential content and correct next link are present in server HTML", () => {
  const html = render();
  assert.match(html, /Welcome back, Gregory/);
  assert.match(html, /href="\/learn\/T1.M1.1"/);
  assert.match(html, /Continue learning/);
  assert.match(html, /Chapters cleared/);
  assert.doesNotMatch(html, /Modules passed|On track|opacity:0|visibility:hidden/);
});

test("dashboard exposes accessible progress values and zero-activity guidance", () => {
  const html = render();
  assert.match(html, /aria-label="Weekly lesson goal"[^>]*aria-valuenow="0"/);
  assert.match(html, /aria-valuetext="0 of 5 lessons completed"/);
  assert.match(html, /Finish your first lesson/);
  assert.match(html, /5 more lessons to reach your goal/);
});

test("caught-up and weekly-goal-complete states render without a broken lesson link", () => {
  const html = render({ next: null, lessonsThisWeek: 5 });
  assert.match(html, /You’re all caught up/);
  assert.match(html, /Goal reached/);
  assert.match(html, /href="\/map"/);
  assert.doesNotMatch(html, /href="\/learn\//);
});

test("profile text is escaped and empty display names have a usable fallback", () => {
  assert.doesNotMatch(render({ name: "<script>alert(1)</script>" }), /<script>alert/);
  assert.match(render({ name: "  " }), /Welcome back, Learner/);
});

test("navigation highlights courses while learning or viewing a course", () => {
  assert.equal(isNavigationActive("/learn/T1.M1.1", "/map"), true);
  assert.equal(isNavigationActive("/course/T1", "/map"), true);
  assert.equal(isNavigationActive("/social/groups/example", "/social"), true);
});

test("navigation does not match lookalike paths or missing routes", () => {
  assert.equal(isNavigationActive("/socialized", "/social"), false);
  assert.equal(isNavigationActive(null, "/dashboard"), false);
  assert.equal(isNavigationActive("/settings", "/profile"), false);
});
