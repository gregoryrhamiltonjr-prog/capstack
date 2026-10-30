// Raw browser-only fixture: not transpiled/serialized from the Node test runner.
(() => {
  const { available, blockedStorage } = window.__audioFixtureOptions;
  if (blockedStorage) Object.defineProperty(window, "localStorage", { configurable: true, get: () => { throw new Error("Storage blocked for test"); } });
  if (!available) {
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: undefined });
    Object.defineProperty(window, "SpeechSynthesisUtterance", { configurable: true, value: undefined });
    return;
  }
  const state = {
    spoken: [], cancels: 0, pauses: 0, resumes: 0, current: null,
    finish() { const unit = this.current; this.current = null; if (unit && unit.onend) unit.onend({}); },
    fail() { if (this.current && this.current.onerror) this.current.onerror({ error: "not-allowed" }); },
  };
  const voices = [
    { voiceURI: "test-us", name: "Sample US voice", lang: "en-US", localService: true, default: true },
    { voiceURI: "test-uk", name: "Sample UK voice", lang: "en-GB", localService: true, default: false },
    { voiceURI: "test-fr", name: "French sample", lang: "fr-FR", localService: true, default: false },
  ];
  class Unit {
    constructor(text) { this.text = text; this.rate = 1; this.voice = null; this.lang = ""; this.onstart = null; this.onend = null; this.onerror = null; }
  }
  const engine = Object.assign(new EventTarget(), {
    getVoices: () => voices,
    speak(unit) {
      state.current = unit;
      state.spoken.push({ text: unit.text, rate: unit.rate, voiceURI: unit.voice ? unit.voice.voiceURI : null, lang: unit.lang });
      queueMicrotask(() => { if (state.current === unit && unit.onstart) unit.onstart({}); });
    },
    pause() { state.pauses++; }, resume() { state.resumes++; },
    cancel() { state.cancels++; const old = state.current; state.current = null; if (old && old.onerror) old.onerror({ error: "canceled" }); },
  });
  Object.defineProperty(window, "speechSynthesis", { configurable: true, value: engine });
  Object.defineProperty(window, "SpeechSynthesisUtterance", { configurable: true, value: Unit });
  window.__lessonSpeechMock = state;
})();
