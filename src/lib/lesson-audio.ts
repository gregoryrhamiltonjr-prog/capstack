import type { Block } from "./types";
import { careerStageLabel } from "./presentation";

export const SPEECH_RATES = [0.75, 1, 1.25, 1.5, 1.75, 2] as const;

export function spokenMarkdown(markdown: string): string {
  if (typeof markdown !== "string") return "";
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "link available in the lesson")
    .replace(/<[^>]+>/g, " ")
    .replace(/^(?:\s*#{1,6}|\s*>|\s*[-*+])\s+/gm, "")
    .replace(/(?:\*\*|__|~~|`)/g, "")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/&(?:amp|lt|gt|quot|apos|nbsp);/g, (entity) => ({ "&amp;": "&", "&lt;": " less than ", "&gt;": " greater than ", "&quot;": '"', "&apos;": "'", "&nbsp;": " " })[entity] ?? entity)
    .replace(/÷/g, " divided by ").replace(/×/g, " times ")
    .replace(/≤/g, " less than or equal to ").replace(/≥/g, " greater than or equal to ")
    .replace(/≈/g, " approximately ").replace(/→/g, " leads to ")
    .replace(/=/g, " equals ").replace(/\|/g, ", ")
    .replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

/** Lesson content only: never includes quiz questions, answers or completion actions. */
export function lessonSpeechText(title: string, blocks: Block[]): string {
  const parts = blocks.map((block): string => {
    switch (block.type) {
      case "prose": return block.md;
      case "callout": return `${block.title ?? ({ desk: "On the desk", interview: "Interview practice", note: "Note", warning: "Watch out", practice: "In practice" }[block.variant])}.\n${block.md}`;
      case "worked": return `Worked example: ${block.title}.\n${block.md}`;
      case "formula": return `Formula. ${block.md}${block.caption ? `. ${block.caption}` : ""}`;
      case "stage": return `${block.title ?? "By career stage"}.\n${Object.entries(block.layers ?? {}).map(([stage, text]) => `${stage === "default" ? "Additional context" : careerStageLabel(stage)}: ${text}`).join("\n\n")}`;
      case "crosslink": return `Related lesson: ${block.label}.`;
      case "widget": return `Interactive tool: ${block.title ?? block.name.replace(/-/g, " ")}. Review this tool on screen.`;
      case "scene3d": return `Visual model: ${block.title ?? "three dimensional illustration"}. Review this model on screen.`;
      case "poll": return `Reflection question: ${block.question}. Response options are available on screen.`;
      case "game": return `Practice activity: ${block.title ?? block.name.replace(/-/g, " ")}. Complete this activity on screen.`;
      case "artifact": return `Interactive activity: ${block.title ?? block.name?.replace(/-/g, " ") ?? block.kind}. Review this activity on screen.`;
      default: return "";
    }
  });
  const content = parts.map(spokenMarkdown).filter(Boolean);
  return content.length ? [spokenMarkdown(title), ...content].filter(Boolean).join("\n\n") : "";
}

/** Short utterances avoid engines silently stopping during long lessons. */
export function speechChunks(text: string, maxCharacters = 180): string[] {
  if (!Number.isInteger(maxCharacters) || maxCharacters < 40) throw new Error("Speech chunk size must be at least 40 characters.");
  const chunks: string[] = [];
  for (const paragraph of text.split(/\n\s*\n/)) {
    let chunk = "";
    const flush = () => { if (chunk.trim()) chunks.push(chunk.trim()); chunk = ""; };
    for (const rawWord of paragraph.split(/\s+/).filter(Boolean)) {
      let word = rawWord;
      if (word.length > maxCharacters) {
        flush();
        while (word.length > maxCharacters) { chunks.push(word.slice(0, maxCharacters)); word = word.slice(maxCharacters); }
      }
      if (chunk.length + word.length + 1 > maxCharacters) flush();
      chunk += `${chunk ? " " : ""}${word}`;
      if (chunk.length >= 60 && /[.!?]$/.test(word)) flush();
    }
    flush();
  }
  return chunks;
}

export type SpeechState = { phase: "idle" | "playing" | "paused" | "finished" | "error"; completed: number; total: number; message: string };
type SpeechEngine = Pick<SpeechSynthesis, "speak" | "cancel" | "pause" | "resume">;
type Preferences = { rate: number; voice: SpeechSynthesisVoice | null };

/** Browser engine is injected so playback/cancellation can be tested without audio services. */
export class LessonSpeechPlayer {
  private chunks: string[];
  private generation = 0;
  private unit: SpeechSynthesisUtterance | null = null;
  private preferences: Preferences = { rate: 1, voice: null };
  private state: SpeechState;
  private disposed = false;
  constructor(private engine: SpeechEngine, private create: (text: string) => SpeechSynthesisUtterance, text: string, private listener: ((state: SpeechState) => void) | null) {
    this.chunks = speechChunks(text);
    this.state = { phase: "idle", completed: 0, total: this.chunks.length, message: "" };
  }
  private emit() { this.listener?.({ ...this.state }); }
  start(preferences: Preferences) {
    if (this.disposed) return;
    this.stop(false);
    this.preferences = { rate: SPEECH_RATES.includes(preferences.rate as typeof SPEECH_RATES[number]) ? preferences.rate : 1, voice: preferences.voice };
    if (!this.chunks.length) return;
    this.state.phase = "playing";
    try { this.engine.resume(); this.speakNext(); } catch { this.fail("Audio couldn’t start. Try another voice or browser."); }
  }
  private speakNext() {
    if (this.disposed || this.state.phase !== "playing") return;
    const generation = this.generation;
    const unit = this.create(this.chunks[this.state.completed]);
    this.unit = unit;
    unit.rate = this.preferences.rate;
    unit.voice = this.preferences.voice;
    unit.lang = this.preferences.voice?.lang || "en-US";
    unit.onstart = () => { if (generation === this.generation && !this.disposed) this.emit(); };
    unit.onend = () => {
      if (generation !== this.generation || this.disposed) return;
      this.unit = null;
      this.state.completed++;
      if (this.state.completed >= this.chunks.length) this.state.phase = "finished";
      this.emit();
      if (this.state.phase === "playing") {
        try { this.speakNext(); } catch { this.fail("Audio stopped unexpectedly. Try listening again."); }
      }
    };
    unit.onerror = (event) => {
      if (generation !== this.generation || this.disposed) return;
      this.fail(event.error === "not-allowed" ? "Your browser blocked audio. Select Listen again to start it." : "This voice couldn’t play the lesson. Choose another voice or browser, then select Listen again.");
    };
    this.emit();
    this.engine.speak(unit);
  }
  pause() {
    if (this.disposed || this.state.phase !== "playing") return;
    try { this.engine.pause(); this.state.phase = "paused"; this.emit(); } catch { this.fail("Audio couldn’t pause. Playback has been stopped; try listening again."); }
  }
  resume() {
    if (this.disposed || this.state.phase !== "paused") return;
    this.state.phase = "playing";
    try { if (this.unit) this.engine.resume(); else this.speakNext(); this.emit(); } catch { this.fail("Audio couldn’t resume. Try listening again."); }
  }
  stop(notify = true) {
    const active = Boolean(this.unit) || this.state.phase === "playing" || this.state.phase === "paused";
    this.generation++;
    this.unit = null;
    if (active) { try { this.engine.cancel(); } catch { /* nothing else can safely stop this browser engine */ } }
    this.state = { phase: "idle", completed: 0, total: this.chunks.length, message: "" };
    if (notify) this.emit();
  }
  private fail(message: string) {
    this.generation++;
    this.unit = null;
    try { this.engine.cancel(); } catch { /* surface the original user-facing failure */ }
    this.state.phase = "error"; this.state.message = message; this.emit();
  }
  dispose() { this.disposed = true; this.listener = null; this.stop(false); }
}
