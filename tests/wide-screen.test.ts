import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DashboardView } from "../src/components/DashboardView";
import { CourseMapView } from "../src/components/CourseMapView";
import { CourseDetailView } from "../src/components/CourseDetailView";
import { layoutDashboard, layoutTrack } from "./fixtures/responsive-layout";

test("the signed-in shell is full-width rather than a centered fixed-width island", () => {
  const source = readFileSync("src/app/(app)/layout.tsx", "utf8");
  assert.match(source, /<div className="min-h-dvh w-full lg:flex">/);
  assert.doesNotMatch(source, /max-w-\[1400px\]/);
  assert.match(source, /min-w-0 flex-1/);
});

test("dashboard and course overviews fill the available workspace", () => {
  for (const element of [
    createElement(DashboardView, layoutDashboard),
    createElement(CourseMapView, { tracks: [layoutTrack] }),
    createElement(CourseDetailView, { track: layoutTrack, completedLessonIds: new Set<string>() }),
  ]) {
    const html = renderToStaticMarkup(element);
    assert.match(html, /^<div class="w-full /);
    assert.doesNotMatch(html.split(">")[0], /max-w-|mx-auto/);
  }
});

test("course grids use extra columns on wide displays while preserving equal-height rows", () => {
  for (const file of ["src/components/CourseMapView.tsx", "src/components/CourseDetailView.tsx"]) {
    const source = readFileSync(file, "utf8");
    assert.match(source, /items-stretch/);
    assert.match(source, /min-\[1800px\]:grid-cols-3/);
    assert.match(source, /min-\[2400px\]:grid-cols-4/);
    assert.doesNotMatch(source, /columns-\d|InteractiveWrappers/);
  }
});

test("reading and settings pages keep deliberate readable widths", () => {
  assert.match(readFileSync("src/components/ChapterExperience.tsx", "utf8"), /max-w-5xl 2xl:max-w-6xl/);
  assert.match(readFileSync("src/app/(app)/settings/page.tsx", "utf8"), /max-w-3xl/);
});
