# Lesson read-aloud — 2026-10-30

## Purpose
Greg asked why lessons had no listening option. The existing player only implemented text/interactive content and quizzes; no audio service or controls existed.

## Feature
Each lesson now has a clearly labeled Listen panel with Pause/Resume, Stop, 0.75×–2× speed and available English browser voices. On narrow screens, Voice & speed opens the preferences so the player does not push the reading text far down the page. Voice/speed choices are optional local browser preferences; listening requires an explicit click and never marks a lesson complete, changes XP, submits a quiz or auto-starts the next lesson.

- Browser Speech Synthesis, not prerecorded/downloadable audio or a paid TTS service.
- Narration uses lesson text, callouts, worked examples, formulas and captions, with Markdown cleaned for speech. Interactive models/tools and exercises are identified honestly as requiring on-screen review. Hidden widget props, quiz data and answer keys are not passed to narration.
- Short queued utterances prevent long lessons from being sent as one fragile speech request. Stop, lesson/tab change and unmount cancel the active lesson; stale events cannot resume an old one.
- Pause/Resume, errors/retry and unsupported browsers have explicit accessible states. Stop playback before changing voice/speed so preferences never silently restart a long lesson.
- Voice availability, quality, pronunciation, network requirements and background behavior depend on browser/OS. Keep the page open. This is not studio narration, a background-audio guarantee or offline audio files.

## Verification boundaries
Unit/regression coverage includes readable text extraction, chunking, voice/rate application, no autoplay, pause/resume/stop, completion, cancellation/disposal, stale events, errors/retry and no lesson-completion action in the audio component.

`npm run test:audio` mounts the actual React audio component in an isolated local browser with a mocked speech engine and synthetic text. It checks the hydrated controls, selected preferences, completion, lesson-change cleanup, blocked audio, unsupported browsers, blocked storage and mobile overflow. No live profile, database, external API, microphone, actual audio generation or audible-voice certification is involved. `npm run test:layout` continues to check existing responsive layouts.

Physical Safari/iMac/iPhone voice quality and audible playback require device validation; mocked tests must not be described as hearing real audio. No account, curriculum, database-schema, billing or signup changes. The separate production curriculum-load blocker is unchanged; controls narrate whichever lesson text is currently available.
