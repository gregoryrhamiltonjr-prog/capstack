import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CourseMapView } from "../src/components/CourseMapView";
import type { TrackState } from "../src/lib/progress";

const titles = ["The CRE Ecosystem", "NOI and the Operating Statement", "Valuation", "Deal Math: Debt and Equity Metrics"];
const track: TrackState = {
  id: "cre-basics", code: "T1", realm: "cre", title: "What is Commercial Real Estate?",
  tagline: "The vocabulary and math everything else stands on.", tier: "Foundations 100", flagship: false,
  estHours: "12–14h", prereqTrackIds: [], unlocked: true, complete: false, progressPct: 0,
  modules: titles.map((title, index) => ({
    id: `unit-${index}`, code: `T1.M${index + 1}`, title, description: `${title} description`,
    adaptive: false, difficultyTier: "Foundations 100", estHours: "1h", unlocked: true, complete: false,
    chapters: [{
      id: `chapter-${index}`, code: `T1.M${index + 1}.1`, title: index === 2 ? "Cap Rates" : `${title} chapter`,
      objective: "Understand the concept.", orderIndex: 0, lessonCount: 3, questionCount: 5,
      status: "available", viewable: true, quizUnlocked: true, bestScorePct: 0, lessonsDone: 0,
      lessons: [{ id: `lesson-${index}`, title: "Introduction", orderIndex: 0 }],
    }],
  })),
};
const render = (tracks = [track]) => renderToStaticMarkup(createElement(CourseMapView, { tracks }));

test("CRE Ecosystem and Valuation remain server-rendered neighbors in a normal grid", () => {
  const html = render();
  assert.match(html, /data-course-unit-grid="true" class="grid items-start gap-4 md:grid-cols-2"/);
  assert.match(html, /<h3[^>]*>The CRE Ecosystem<\/h3>/);
  assert.match(html, /<h3[^>]*>Valuation<\/h3>/);
  assert.match(html, /Cap Rates/);
});

test("unit cards contain no fragmentation, opacity reveal or 3D transform dependencies", () => {
  const html = render();
  assert.doesNotMatch(html, /columns-|break-inside|data-stagger-item|transform:|transform-style|opacity:0|overflow-hidden|truncate/);
  assert.match(html, /transition-colors hover:border-brand\/40/);
});

test("all unit headings preserve curriculum reading order", () => {
  const html = render();
  const headings = [...html.matchAll(/<h3[^>]*>(.*?)<\/h3>/g)].map((match) => match[1]);
  assert.deepEqual(headings, titles);
});

test("chapter links retain their destinations after removing hover wrappers", () => {
  const html = render();
  assert.match(html, /href="\/course\/T1"/);
  assert.match(html, /href="\/learn\/T1.M3.1"/);
  assert.equal([...html.matchAll(/href="\/learn\//g)].length, 4);
});

test("locked chapters remain visible but are not fake hash links", () => {
  const locked = structuredClone(track);
  locked.unlocked = false;
  locked.modules[2].unlocked = false;
  locked.modules[2].chapters[0].viewable = false;
  locked.modules[2].chapters[0].status = "locked";
  const html = render([locked]);
  assert.match(html, /Valuation/);
  assert.match(html, /Cap Rates/);
  assert.match(html, /Prerequisites required/);
  assert.match(html, /aria-disabled="true"/);
  assert.doesNotMatch(html, /href="#"|href="\/learn\/T1.M3.1"|pointer-events-none/);
});

test("long and untrusted unit titles stay in flow and are escaped", () => {
  const long = structuredClone(track);
  long.modules[0].title = "A very long unit title with <script>not executable</script> content";
  const html = render([long]);
  assert.match(html, /&lt;script&gt;not executable&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<script>|text-ellipsis|truncate/);
});

test("course and unit sections have labeled semantic boundaries", () => {
  const html = render();
  assert.match(html, /<section aria-labelledby="course-cre-basics"/);
  assert.match(html, /<section aria-labelledby="unit-unit-2"/);
  assert.match(html, /<h3 id="unit-unit-2"/);
});

test("empty curricula render safely without fabricated unit cards", () => {
  const html = render([]);
  assert.match(html, /0(?:<!-- -->)? CRE courses/);
  assert.doesNotMatch(html, /data-course-unit-grid/);
});
