"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui";
import { LessonSpeechPlayer, SPEECH_RATES, type SpeechState } from "@/lib/lesson-audio";

const PREFERENCE_KEY = "capstack.lessonAudio";

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

  return <section aria-labelledby={`${id}-title`} className="mb-6 rounded-xl border border-brand/20 bg-brand/[0.04] p-4">
    <h3 id={`${id}-title`} className="flex items-center gap-2 text-sm font-semibold text-ink"><Icon name="volume" size={17} className="text-brand-bright" />Listen to this lesson</h3>
    <div role="group" aria-label="Lesson audio controls" className="mt-3 flex flex-wrap items-end gap-3">
      <button type="button" disabled={!supported || !text} aria-label={`${label}: ${title}`} onClick={() => {
        if (playback.phase === "playing") player.current?.pause();
        else if (playback.phase === "paused") player.current?.resume();
        else player.current?.start({ rate, voice: voices.find((voice) => voice.voiceURI === selectedVoice) ?? null });
      }} className="btn-primary min-h-11"><Icon name={playback.phase === "playing" ? "pause" : "play"} size={16} />{label}</button>
      <button type="button" disabled={!active} onClick={() => player.current?.stop()} className="btn-ghost min-h-11"><Icon name="stop" size={15} />Stop</button>
      <button type="button" aria-expanded={showPreferences} aria-controls={`${id}-preferences`} onClick={() => setShowPreferences((show) => !show)} className="btn-ghost min-h-11 sm:hidden">Voice & speed</button>
      <div id={`${id}-preferences`} className={`${showPreferences ? "flex" : "hidden"} min-w-0 basis-full flex-wrap items-end gap-3 sm:contents`}>
      <div className="min-w-0"><label htmlFor={`${id}-rate`} className="mb-1 block text-xs text-ink-muted">Speed</label><select id={`${id}-rate`} value={rate} disabled={active || !supported} onChange={(event) => { const next = Number(event.target.value); setRate(next); remember(next, voiceURI); }} className="input min-h-11 !w-auto !py-2" aria-describedby={`${id}-hint`}>{SPEECH_RATES.map((value) => <option key={value} value={value}>{value}×</option>)}</select></div>
      <div className="min-w-0 basis-full sm:max-w-xs sm:flex-1 sm:basis-auto"><label htmlFor={`${id}-voice`} className="mb-1 block text-xs text-ink-muted">Voice</label><select id={`${id}-voice`} value={selectedVoice} disabled={active || !supported} onChange={(event) => { setVoiceURI(event.target.value); remember(rate, event.target.value); }} className="input min-h-11 min-w-0 !py-2" aria-describedby={`${id}-hint`}><option value="">Device default (English)</option>{voices.map((voice) => <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} · {voice.lang}{voice.localService ? " · device" : ""}</option>)}</select></div>
      </div>
    </div>
    {supported === false ? <p role="status" className="mt-3 text-sm text-ink-muted">Read-aloud isn’t available in this browser. Try a recent version of Safari, Chrome or Edge.</p> : !text ? <p className="mt-3 text-sm text-ink-muted">This lesson doesn’t have text available for read-aloud yet.</p> : null}
    <p role={playback.phase === "error" ? "alert" : "status"} aria-live="polite" className={`mt-3 text-sm empty:hidden ${playback.phase === "error" ? "text-danger" : "text-brand-bright"}`}>{status}</p>
    <p id={`${id}-hint`} className="mt-3 text-xs leading-5 text-ink-muted">Uses your browser’s voices; availability and offline playback depend on your device. Keep this page open and review diagrams and exercises on screen. Listening does not mark the lesson complete.{active ? " Stop playback to change voice or speed." : ""}</p>
  </section>;
}
