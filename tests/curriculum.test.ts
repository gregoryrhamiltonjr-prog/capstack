import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { ALL_TRACKS, ROADMAP } from "../src/content";
import type { Block } from "../src/lib/types";
import { stablePermutation } from "../src/lib/quiz";

const published = JSON.parse(readFileSync("tests/fixtures/published-curriculum-ids.json", "utf8")) as {
  lessons: Record<string, string>;
  questions: Record<string, string>;
};
const widgetSource = readFileSync("src/components/widgets/index.tsx", "utf8");
const chapters = ALL_TRACKS.flatMap((t) => t.modules.flatMap((m) => m.chapters.map((c) => ({ track: t, module: m, chapter: c }))));
const chapterCodes = new Set(chapters.map((x) => x.chapter.code));

test("published lesson and quiz IDs never move (learner progress depends on them)", () => {
  const lessons = new Map<string, string>();
  const questions = new Map<string, string>();
  for (const { chapter } of chapters) {
    chapter.lessons.forEach((l, i) => lessons.set(`${chapter.code}#${i}`, l.title));
    chapter.quiz.forEach((q, i) => questions.set(`${chapter.code}Q${i}`, q.prompt));
  }
  for (const [id, title] of Object.entries(published.lessons)) assert.equal(lessons.get(id), title, `lesson ${id} moved or was removed`);
  for (const [id, prompt] of Object.entries(published.questions)) assert.equal(questions.get(id), prompt, `question ${id} moved or was removed`);
});

test("course, unit and chapter codes are unique and correctly nested", () => {
  const seen = new Set<string>();
  for (const t of ALL_TRACKS) {
    assert.ok(ROADMAP.some((r) => r.code === t.code && r.live), `${t.code} must be a live roadmap course`);
    for (const m of t.modules) {
      assert.ok(m.code.startsWith(`${t.code}.`), `${m.code} belongs under ${t.code}`);
      assert.ok(!seen.has(m.code), `duplicate ${m.code}`);
      seen.add(m.code);
      for (const c of m.chapters) {
        assert.ok(c.code.startsWith(`${m.code}.`), `${c.code} belongs under ${m.code}`);
        assert.ok(!seen.has(c.code), `duplicate ${c.code}`);
        seen.add(c.code);
      }
    }
  }
});

test("unit prerequisites exist and come earlier in the course", () => {
  for (const t of ALL_TRACKS) {
    const order = t.modules.map((m) => m.code);
    for (const m of t.modules) {
      for (const pre of m.prereqModuleCodes ?? []) {
        const index = order.indexOf(pre);
        assert.ok(index >= 0 && index < order.indexOf(m.code), `${m.code} prerequisite ${pre} must be an earlier unit in ${t.code}`);
      }
    }
  }
});

test("every chapter is complete enough to teach and assess", () => {
  for (const { chapter } of chapters) {
    assert.ok(chapter.title.trim() && chapter.objective.trim(), `${chapter.code} needs a title and objective`);
    assert.ok(chapter.lessons.length >= 1, `${chapter.code} has no lessons`);
    for (const lesson of chapter.lessons) assert.ok(lesson.blocks.length > 0, `${chapter.code} "${lesson.title}" is empty`);
    assert.ok(chapter.quiz.length >= 1, `${chapter.code} has no quiz`);
  }
});

test("quiz questions are well-formed and answerable", () => {
  for (const { chapter } of chapters) {
    for (const q of chapter.quiz) {
      const where = `${chapter.code}: ${q.prompt.slice(0, 60)}`;
      assert.equal(q.hints.length, 3, `${where} needs three hints`);
      assert.ok(q.hints.every((h) => h.trim()), `${where} has a blank hint`);
      assert.ok(q.explanation.trim(), `${where} needs an explanation`);
      const data = q.data as { choices?: string[]; correct?: number; answer?: number; tolerance?: number; items?: string[] };
      if (q.type === "mc" || q.type === "scenario") {
        assert.ok((data.choices?.length ?? 0) >= 2, `${where} needs choices`);
        assert.ok(Number.isInteger(data.correct) && data.correct! >= 0 && data.correct! < data.choices!.length, `${where} correct index out of range`);
        assert.equal(new Set(data.choices).size, data.choices!.length, `${where} has duplicate choices`);
      } else if (q.type === "numeric") {
        assert.ok(Number.isFinite(data.answer) && Number.isFinite(data.tolerance) && data.tolerance! >= 0, `${where} needs a numeric answer and tolerance`);
      } else if (q.type === "ordering") {
        assert.ok((data.items?.length ?? 0) >= 2, `${where} needs at least two items`);
        assert.equal(new Set(data.items).size, data.items!.length, `${where} has duplicate items`);
      } else {
        assert.fail(`${where} has unknown type ${q.type}`);
      }
    }
  }
});

// Chapters that existing lessons already link to and that are being written now.
// Remove each code as its chapter lands; the list must only ever shrink.
const PENDING_LINK_TARGETS = new Set(["T3.M7.1", "T3.M4.1", "T8.M1.1", "T3.M3.2"]);

test("cross-links and widgets point at things that exist", () => {
  for (const code of PENDING_LINK_TARGETS) assert.ok(!chapterCodes.has(code), `${code} now exists; remove it from PENDING_LINK_TARGETS`);
  for (const { chapter } of chapters) {
    for (const lesson of chapter.lessons) {
      for (const block of lesson.blocks as Block[]) {
        if (block.type === "crosslink") assert.ok(chapterCodes.has(block.toCode) || PENDING_LINK_TARGETS.has(block.toCode), `${chapter.code} links to missing chapter ${block.toCode}`);
        if (block.type === "widget") assert.match(widgetSource, new RegExp(`["']?${block.name}["']?\\s*:`), `${chapter.code} uses unknown widget ${block.name}`);
      }
    }
  }
});

test("quiz layout never reveals the answer: ordering starts unsolved and choices are shuffled stably", () => {
  for (let n = 2; n <= 8; n++) {
    for (const seed of ["T1.M1.1Q5:order", "a", "b", "HF-4.1.2Q0:order"]) {
      const order = stablePermutation(n, seed, true);
      assert.deepEqual([...order].sort((a, b) => a - b), Array.from({ length: n }, (_, i) => i));
      assert.ok(order.some((v, i) => v !== i), `identity order for n=${n}`);
      assert.deepEqual(stablePermutation(n, seed, true), order, "must be deterministic for SSR");
    }
  }
});
