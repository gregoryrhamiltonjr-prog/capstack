"use client";

import type { Block } from "@/lib/types";
import { Markdown } from "./Markdown";
import { LessonWidget } from "./widgets";
import { Icon } from "./ui";
import Link from "next/link";
import { cn } from "@/lib/util";
import { MouseGlow } from "./InteractiveWrappers";
import { CapitalStack3D, Building3D, Waterfall3D, ContextualScene3D } from "./models/Scene3D";
import { Poll } from "./artifacts/Poll";
import { LessonGame } from "./artifacts/Games";

const CALLOUT: Record<string, { icon: string; ring: string; text: string; label: string }> = {
  desk: { icon: "target", ring: "border-info/30 bg-info/5", text: "text-info", label: "On the desk" },
  interview: { icon: "spark", ring: "border-gold/30 bg-gold/5", text: "text-gold-soft", label: "Interview ammo" },
  note: { icon: "book", ring: "border-line bg-surface-raised", text: "text-ink-muted", label: "Note" },
  warning: { icon: "bolt", ring: "border-warn/30 bg-warn/5", text: "text-warn", label: "Watch out" },
  practice: { icon: "check", ring: "border-brand/30 bg-brand/5", text: "text-brand-bright", label: "In practice" },
};

function SceneBlock({
  variant = "auto",
  title,
  props,
  chapterCode,
}: {
  variant?: string;
  title?: string;
  props?: Record<string, unknown>;
  chapterCode?: string;
}) {
  if (variant === "stack") return <CapitalStack3D title={title} className="my-4" />;
  if (variant === "waterfall") return <Waterfall3D title={title} className="my-4" />;
  if (variant === "building") {
    return (
      <Building3D
        title={title}
        floors={(props?.floors as number) ?? 5}
        activeFloor={(props?.activeFloor as number) ?? 3}
        labels={props?.labels as string[] | undefined}
        className="my-4"
      />
    );
  }
  return <ContextualScene3D code={chapterCode ?? title ?? "CRE"} title={title} className="my-4" />;
}

export function LessonRenderer({
  blocks,
  chapterCode,
}: {
  blocks: Block[];
  chapterCode?: string;
}) {
  return (
    <div className="lesson-prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "prose":
            return <Markdown key={i} text={b.md} />;
          case "callout": {
            const c = CALLOUT[b.variant] ?? CALLOUT.note;
            return (
              <div key={i} className={cn("my-4 rounded-xl border p-3.5", c.ring)}>
                <div className={cn("mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide", c.text)}>
                  <Icon name={c.icon} size={14} />
                  {b.title ?? c.label}
                </div>
                <div className="text-[14.5px] leading-6 text-ink/90">
                  <Markdown text={b.md} />
                </div>
              </div>
            );
          }
          case "worked":
            return (
              <div key={i} className="my-4 rounded-xl border border-line bg-canvas p-4">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand">
                  <Icon name="chart" size={14} /> Worked example · {b.title}
                </div>
                <div className="text-[14.5px] leading-6">
                  <Markdown text={b.md} />
                </div>
              </div>
            );
          case "formula":
            return (
              <div key={i} className="my-4">
                <pre className="overflow-x-auto rounded-xl border border-line bg-[#070b12] p-3.5 font-mono text-[12.5px] leading-5 text-brand-bright">
                  {b.md.replace(/`/g, "")}
                </pre>
                {b.caption && <div className="mt-1 text-center text-xs text-ink-faint">{b.caption}</div>}
              </div>
            );
          case "widget":
            return (
              <div key={i}>
                <LessonWidget name={b.name} props={b.props} />
              </div>
            );
          case "crosslink":
            return (
              <Link
                key={i}
                href={`/learn/${b.toCode}`}
                className="my-3 flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-3.5 py-2.5 text-sm text-ink-muted transition-colors hover:border-brand/40 hover:text-ink"
              >
                <Icon name="arrowRight" size={15} className="text-brand" />
                <span className="text-xs font-semibold uppercase tracking-wide text-brand">Cross-link</span>
                <span className="text-ink">{b.label}</span>
              </Link>
            );
          case "stage":
            return (
              <div key={i} className="my-4 rounded-xl border border-brand/20 bg-brand/5 p-3.5">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand">
                  <Icon name="users" size={14} /> {b.title ?? "By career stage"}
                </div>
                <div className="space-y-1.5 text-[14px] leading-6">
                  {Object.entries(b.layers).map(([k, v]) => (
                    <div key={k}>
                      <span className="font-semibold capitalize text-ink">{k.replace("_", " ")}:</span>{" "}
                      <span className="text-ink/85">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "scene3d":
            return (
              <div key={i}>
                <SceneBlock variant={b.variant} title={b.title} props={b.props} chapterCode={chapterCode} />
              </div>
            );
          case "poll":
            return (
              <div key={i}>
                <Poll id={b.id} question={b.question} options={b.options} seed={b.seed} />
              </div>
            );
          case "game":
            return (
              <div key={i}>
                <LessonGame name={b.name} />
              </div>
            );
          case "artifact":
            return (
              <div key={i}>
                {b.kind === "game" && <LessonGame name={b.name ?? "cap-rate-guess"} />}
                {b.kind === "scene3d" && (
                  <SceneBlock variant={(b.name as string) ?? "auto"} title={b.title} props={b.props} chapterCode={chapterCode} />
                )}
                {b.kind === "poll" && b.props && (
                  <Poll
                    id={String(b.props.id ?? b.name ?? "poll")}
                    question={String(b.props.question ?? b.title ?? "Vote")}
                    options={(b.props.options as string[]) ?? ["Yes", "No"]}
                    seed={b.props.seed as number[] | undefined}
                  />
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
