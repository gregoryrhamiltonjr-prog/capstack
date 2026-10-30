import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LessonAudio } from "../src/components/LessonAudio";
import { LessonSpeechPlayer, lessonSpeechText, speechChunks, spokenMarkdown, type SpeechState } from "../src/lib/lesson-audio";

function fixture(text = "A short first paragraph.\n\nA short second paragraph.") {
  let current: SpeechSynthesisUtterance | null = null;
  const spoken: SpeechSynthesisUtterance[] = [];
  const states: SpeechState[] = [];
  let pauses = 0, resumes = 0, cancels = 0;
  const engine = {
    speak(unit: SpeechSynthesisUtterance) { current = unit; spoken.push(unit); unit.onstart?.call(unit, {} as SpeechSynthesisEvent); },
    cancel() { cancels++; const old = current; current = null; old?.onerror?.call(old, { error: "canceled" } as SpeechSynthesisErrorEvent); },
    pause() { pauses++; }, resume() { resumes++; },
  };
  const player = new LessonSpeechPlayer(engine, (value) => ({ text: value, rate: 1, lang: "", voice: null, onstart: null, onend: null, onerror: null } as unknown as SpeechSynthesisUtterance), text, (state) => states.push(state));
  return { player, spoken, states, counts: () => ({ pauses, resumes, cancels }), finish() { const unit = current; current = null; unit?.onend?.call(unit, {} as SpeechSynthesisEvent); }, fail() { current?.onerror?.call(current, { error: "not-allowed" } as SpeechSynthesisErrorEvent); } };
}

test("spoken text removes Markdown syntax but preserves link labels and finance values", () => {
  const result = spokenMarkdown("## **DSCR**\n- NOI is **$1,250,000**. See [the guide](https://example.com/guide).\n2 × 3 = 6 and 12 ÷ 3 = 4.");
  assert.match(result, /\$1,250,000/);
  assert.match(result, /the guide/);
  assert.match(result, /2 times 3 equals 6/);
  assert.match(result, /12 divided by 3 equals 4/);
  assert.doesNotMatch(result, /https:|\*\*|##|\]\(/);
});

test("narration includes lesson prose, worked examples, formulas and useful captions", () => {
  const text = lessonSpeechText("Debt metrics", [
    { type: "prose", md: "A lender uses cash flow." },
    { type: "worked", title: "Sizing", md: "$1,000,000 divided by 1.25." },
    { type: "formula", md: "DSCR = NOI ÷ debt service", caption: "Use annual values." },
    { type: "callout", variant: "warning", md: "Do not mix periods." },
  ]);
  for (const phrase of ["Debt metrics", "A lender uses cash flow", "Worked example: Sizing", "Use annual values", "Watch out", "Do not mix periods"]) assert.ok(text.includes(phrase));
});

test("interactive visuals are identified honestly, without speaking hidden props or answer data", () => {
  const text = lessonSpeechText("Tools", [
    { type: "widget", name: "dscr", props: { answer: "not narration" } },
    { type: "scene3d", title: "Capital stack" },
    { type: "poll", id: "example", question: "Which risk matters?", options: ["not narration"] },
  ]);
  assert.match(text, /Review this tool on screen/);
  assert.match(text, /Capital stack/);
  assert.match(text, /Which risk matters/);
  assert.doesNotMatch(text, /not narration/);
});

test("career-stage labels are readable in narration and empty lessons have no pretend audio", () => {
  assert.match(lessonSpeechText("Stages", [{ type: "stage", layers: { vp_plus: "Portfolio decisions." } }]), /VP\+: Portfolio decisions/);
  assert.equal(lessonSpeechText("Empty", []), "");
  assert.equal(lessonSpeechText("Unknown format", [{ type: "future-format" } as never]), "");
});

test("long lessons are split into bounded utterances without losing their words", () => {
  const text = Array.from({ length: 600 }, (_, index) => `word${index}`).join(" ");
  const chunks = speechChunks(text);
  assert.ok(chunks.length > 10);
  assert.ok(chunks.every((chunk) => chunk.length <= 220));
  assert.equal(chunks.join(" "), text);
  assert.deepEqual(speechChunks("  \n\n "), []);
  assert.throws(() => speechChunks("text", 0));
});

test("constructing a lesson player never auto-plays", () => {
  const f = fixture();
  assert.equal(f.spoken.length, 0);
  assert.equal(f.states.length, 0);
});

test("listen, pause, resume and natural completion advance in order", () => {
  const f = fixture();
  f.player.start({ rate: 1.25, voice: null });
  assert.equal(f.spoken.length, 1);
  assert.equal(f.spoken[0].rate, 1.25);
  f.player.pause();
  assert.equal(f.states.at(-1)?.phase, "paused");
  f.player.resume();
  assert.equal(f.states.at(-1)?.phase, "playing");
  f.finish();
  assert.equal(f.spoken.length, 2);
  f.finish();
  assert.equal(f.states.at(-1)?.phase, "finished");
  assert.equal(f.states.at(-1)?.completed, 2);
  assert.equal(f.counts().pauses, 1);
});

test("Stop cancels playback; stale callbacks cannot queue another utterance", () => {
  const f = fixture();
  f.player.start({ rate: 1, voice: null });
  const stale = f.spoken[0];
  f.player.stop();
  stale.onend?.call(stale, {} as SpeechSynthesisEvent);
  assert.equal(f.spoken.length, 1);
  assert.equal(f.states.at(-1)?.phase, "idle");
  assert.equal(f.counts().cancels, 1);
});

test("leaving a lesson disposes audio and no later event updates the UI", () => {
  const f = fixture();
  f.player.start({ rate: 1, voice: null });
  const stale = f.spoken[0];
  const count = f.states.length;
  f.player.dispose();
  stale.onend?.call(stale, {} as SpeechSynthesisEvent);
  f.player.start({ rate: 1, voice: null });
  assert.equal(f.states.length, count);
  assert.equal(f.spoken.length, 1);
  assert.equal(f.counts().cancels, 1);
});

test("a paused boundary waits for Resume rather than starting the next section", () => {
  const f = fixture();
  f.player.start({ rate: 1, voice: null });
  f.player.pause();
  f.finish();
  assert.equal(f.spoken.length, 1);
  f.player.resume();
  assert.equal(f.spoken.length, 2);
});

test("voice and rate are applied, with safe fallback for invalid rate", () => {
  const f = fixture();
  const voice = { name: "Sample voice", voiceURI: "test-only", lang: "en-GB", localService: true, default: false };
  f.player.start({ rate: 1.5, voice });
  assert.equal(f.spoken[0].voice, voice);
  assert.equal(f.spoken[0].lang, "en-GB");
  f.player.start({ rate: 99, voice: null });
  assert.equal(f.spoken[1].rate, 1);
  assert.equal(f.spoken[1].lang, "en-US");
});

test("browser audio errors are visible and can be retried", () => {
  const f = fixture();
  f.player.start({ rate: 1, voice: null });
  f.fail();
  assert.equal(f.states.at(-1)?.phase, "error");
  assert.match(f.states.at(-1)?.message ?? "", /browser blocked audio/);
  f.player.start({ rate: 1, voice: null });
  assert.equal(f.states.at(-1)?.phase, "playing");
});

test("lesson audio has labeled controls and explicitly avoids completion side effects", () => {
  const html = renderToStaticMarkup(createElement(LessonAudio, { title: "Sample lesson", text: "A short lesson." }));
  for (const phrase of ["Listen to this lesson", "Lesson audio controls", "Speed", "Voice", "Stop", "Listening does not mark the lesson complete"]) assert.ok(html.includes(phrase));
  const source = readFileSync("src/components/LessonAudio.tsx", "utf8");
  assert.doesNotMatch(source, /recordLessonComplete|submitQuizResult|fetch\(/);
  const page = readFileSync("src/components/ChapterExperience.tsx", "utf8");
  assert.match(page, /<LessonAudio key=\{lesson.id\}/);
});
