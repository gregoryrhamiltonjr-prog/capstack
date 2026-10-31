"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui";
import { LessonSpeechPlayer, SPEECH_RATES, type SpeechState } from "@/lib/lesson-audio";

const PREFERENCE_KEY = "***";

export function LessonAudio({ title, text }: { title: string; text: string }) {
  const id = useId();
  const player = useRef<LessonSpeechPlayer | null>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState("");
  const [rate, setRate] = useState(1);
  const [showPreferences, setShowPreferences] = useState(false);
  const [playback, setPlayback] = useState<SpeechState>({ phase: "idle", completed: 0, total: 0, message: "" });

  useEffect(() => {
    setPlayback({ phase: "idle", completed: 0, total: 0, message: "" });
    const available = typeof window.speechSynthesis?.speak === "function" && typeof window.SpeechSynthesisUtterance === "function";
    setSupported(available);
    if (!available) return;
    const engine = window.speechSynthesis;
    const current = new LessonSpeechPlayer(engine, (value) => new SpeechSynthesisUtterance(value), text, setPlayback);
    player.current = current;
    const loadVoices = () => {
      try { setVoices(engine.getVoices().filter((voice) => /^en(?:-|$)/i.test(voice.lang)).sort((a, b) => Number(b.localService) - Number(a.localService) || a.name.localeCompare(b.name))); }
      catch { setVoices([]); }
    };
    loadVoices();
    engine.addEventListener("voiceschanged", loadVoices);
    try {
      const saved = JSON.parse(localStorage.getItem(PREFERENCE_KEY) ?? "null") as { rate?: unknown; voiceURI?: unknown } | null;
      if (saved && SPEECH_RATES.includes(saved.rate as typeof SPEECH_RATES[number])) setRate(Number(saved.rate));
      if (saved && typeof saved.voiceURI === "string") setVoiceURI(saved.voiceURI);
    } catch { /* Browser/private-mode storage is optional. */ }
    return () => { engine.removeEventListener("voiceschanged", loadVoices); current.dispose(); if (player.current === current) player.current = null; };
  }, [text]);

  function remember(nextRate: number, nextVoice: string) {
    try { localStorage.setItem(PREFERENCE_KEY, JSON.stringify({ rate: nextRate, voiceURI: nextVoice })); } catch { /* Playback works without storage. */ }
  }
  const active = playback.phase === "playing" || playback.phase === "paused";
  const selectedVoice = voices.some((voice) => voice.voiceURI === voiceURI) ? voiceURI : "";
  const label = playback.phase === "playing" ? "Pause" : playback.phase === "paused" ? "Resume" : playback.phase === "finished" || playback.phase === "error" ? "Listen again" : "Listen";
  const status = playback.phase === "error" ? playback.message : playback.phase === "playing" ? "Reading aloud…" : playback.phase === "paused" ? "Audio paused." : playback.phase === "finished" ? "Finished reading this lesson." : "";

  return <section aria-labelledby={`${id}-title`} data-lesson-audio-toolbar className="mb-5">
    <h3 id={`${id}-title`} className="sr-only">Listen to this lesson</h3>
    <div role="group" aria-label="Lesson audio controls" className="flex min-w-0 flex-wrap items-center gap-2">
      <button type="button" disabled={!supported || !text} aria-label={`${label}: ${title}`} onClick={() => {
        setShowPreferences(false);
        if (playback.phase === "playing") player.current?.pause();
        else if (playback.phase === "paused") player.current?.resume();
        else player.current?.start({ rate, voice: voices.find((voice) => voice.voiceURI === selectedVoice) ?? null });
      }} className={`btn-ghost min-h-11 !rounded-lg !px-3 !py-2 ${active ? "!border-brand/40 !bg-brand/10 !text-brand-bright" : ""}`}><Icon name={playback.phase === "playing" ? "pause" : "volume"} size={16} className="text-brand-bright" />{label}</button>
      <button type="button" disabled={!active} onClick={() => player.current?.stop()} aria-label="Stop" title="Stop playback" className="flex h-11 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink disabled:opacity-30"><Icon name="stop" size={14} /><span className="sr-only">Stop</span></button>
      <div className="min-w-0"><label htmlFor={`${id}-rate`} className="sr-only">Speed</label><select id={`${id}-rate`} value={rate} disabled={active || !supported} onChange={(event) => { const next = Number(event.target.value); setRate(next); remember(next, voiceURI); }} className="min-h-11 max-w-20 rounded-lg border border-transparent bg-surface px-2 text-xs text-ink-muted focus-visible:border-brand disabled:opacity-50" title={active ? "Stop playback before changing speed" : "Playback speed"}>{SPEECH_RATES.map((value) => <option key={value} value={value}>{value}×</option>)}</select></div>
      <button type="button" disabled={!supported} aria-label="Voice options" aria-expanded={showPreferences} aria-controls={`${id}-preferences`} onClick={() => setShowPreferences((show) => !show)} className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-xs text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink disabled:opacity-50">Device voice<Icon name="chevronDown" size={12} /></button>
      <details className="text-xs text-ink-muted sm:ml-auto"><summary className="flex h-11 w-8 cursor-pointer list-none items-center justify-center rounded-lg hover:bg-surface-raised hover:text-ink [&::-webkit-details-marker]:hidden" aria-label="About audio" title="About audio"><span aria-hidden="true">ⓘ</span><span className="sr-only">About audio</span></summary><p className="max-w-md pb-2 leading-6">Uses your browser’s device voices, not recorded narration. Keep this page open and review diagrams and exercises on screen. Listening does not mark the lesson complete.</p></details>
    </div>
    <div id={`${id}-preferences`} hidden={!showPreferences} className="mt-2 min-w-0 border-t border-line pt-3">
      <label htmlFor={`${id}-voice`} className="mb-1.5 block text-xs text-ink-muted">Voice</label><select id={`${id}-voice`} value={selectedVoice} disabled={active || !supported} onChange={(event) => { setVoiceURI(event.target.value); remember(rate, event.target.value); }} className="input min-h-11 min-w-0 sm:max-w-md" aria-describedby={`${id}-hint`}><option value="">Device default (English)</option>{voices.map((voice) => <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} · {voice.lang}{voice.localService ? " · device" : ""}</option>)}</select>
      <p id={`${id}-hint`} className="mt-2 text-xs leading-5 text-ink-muted">Device voice quality varies by browser. Stop playback before changing voice or speed.</p>
    </div>
    {supported === false ? <p role="status" className="mt-2 text-xs text-ink-muted">Read-aloud isn’t available in this browser. Try a recent version of Safari, Chrome or Edge.</p> : !text ? <p className="mt-2 text-xs text-ink-muted">This lesson doesn’t have text available for read-aloud yet.</p> : null}
    <p role={playback.phase === "error" ? "alert" : "status"} aria-live="polite" className={`mt-2 text-xs empty:hidden ${playback.phase === "error" ? "text-danger" : "text-ink-muted"}`}>{status}</p>
  </section>;
}
