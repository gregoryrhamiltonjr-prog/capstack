import { useState } from "react";
import { createRoot } from "react-dom/client";
import { LessonAudio } from "../../src/components/LessonAudio";
import { lessonSpeechText } from "../../src/lib/lesson-audio";

function AudioFixture() {
  const [lesson, setLesson] = useState(0);
  const title = lesson ? "Sample lesson two" : "Sample lesson one";
  const text = lessonSpeechText(title, [
    { type: "prose", md: "Commercial real estate is held to generate income. This fixture contains synthetic lesson text only; no learner account or progress is connected." },
    { type: "worked", title: "Loan sizing", md: "Net operating income is $1,250,000. Divide it by a debt service coverage ratio of 1.25 to get maximum annual debt service of $1,000,000." },
    { type: "formula", md: "DSCR = NOI ÷ annual debt service", caption: "Use consistent annual values." },
  ]);
  return <main className="mx-auto max-w-3xl p-4"><article className="card p-5"><h1 className="mb-4 text-xl font-bold">Synthetic audio-control test</h1><LessonAudio key={lesson} title={title} text={text} /><button type="button" className="btn-ghost" onClick={() => setLesson((value) => value + 1)}>Next sample lesson</button></article></main>;
}
createRoot(document.getElementById("root")!).render(<AudioFixture />);
