"use client";

import { useRef, useEffect, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { sendMessageAction } from "@/lib/actions";
import { Icon } from "@/components/ui";

type Msg = {
  id: string;
  body: string;
  createdAt: Date | string;
  senderId: string;
  sender: { id: string; displayName: string; avatarColor: string };
  attachmentName?: string | null;
  attachmentMime?: string | null;
  attachmentUrl?: string | null;
  attachmentSize?: number | null;
};

function formatSize(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function ChatBox({
  channelId,
  messages,
  currentUserId,
  placeholder = "Write a message…",
  onMemberClick,
}: {
  channelId: string;
  messages: Msg[];
  currentUserId: string;
  placeholder?: string;
  onMemberClick?: (userId: string) => void;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fileLabel, setFileLabel] = useState<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex min-h-[420px] flex-col rounded-2xl border border-line bg-surface">
      <div className="border-b border-line px-4 py-2 text-[11px] text-ink-faint">
        Chats are filtered: no sensitive work data (secrets, SSN, account numbers) or inappropriate content.
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4 sm:p-5">
        {messages.length === 0 ? (
          <p className="py-12 text-center text-sm text-ink-muted">No messages yet. Start the thread.</p>
        ) : (
          messages.map((m) => {
            const mine = m.senderId === currentUserId;
            return (
              <div key={m.id} className={`flex gap-2.5 ${mine ? "flex-row-reverse" : ""}`}>
                <button
                  type="button"
                  onClick={() => onMemberClick?.(m.senderId)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-canvas transition-opacity hover:opacity-80"
                  style={{ backgroundColor: m.sender.avatarColor }}
                  title={m.sender.displayName}
                >
                  {m.sender.displayName.charAt(0)}
                </button>
                <div className={`max-w-[75%] ${mine ? "items-end" : "items-start"}`}>
                  <div className={`mb-0.5 text-[11px] text-ink-faint ${mine ? "text-right" : ""}`}>
                    {onMemberClick ? (
                      <button
                        type="button"
                        onClick={() => onMemberClick(m.senderId)}
                        className="font-medium hover:text-ink hover:underline"
                      >
                        {mine ? "You" : m.sender.displayName}
                      </button>
                    ) : (
                      <span>{mine ? "You" : m.sender.displayName}</span>
                    )}{" "}
                    ·{" "}
                    {new Date(m.createdAt).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                  <div
                    className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      mine ? "rounded-tr-md bg-brand/15 text-ink" : "rounded-tl-md bg-canvas text-ink"
                    }`}
                  >
                    {m.body}
                    {m.attachmentUrl && m.attachmentName && (
                      <a
                        href={m.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex items-center gap-2 rounded-xl border border-line bg-surface-raised/80 px-3 py-2 text-xs font-medium text-brand hover:border-brand/40"
                      >
                        <Icon name="book" size={14} />
                        <span className="min-w-0 truncate">{m.attachmentName}</span>
                        {m.attachmentSize != null && (
                          <span className="shrink-0 text-ink-faint">{formatSize(m.attachmentSize)}</span>
                        )}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {error && (
        <div className="mx-3 mb-0 rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">{error}</div>
      )}

      <form
        ref={formRef}
        action={(fd) => {
          setError(null);
          startTransition(async () => {
            const result = await sendMessageAction(fd);
            if (result && !result.ok) {
              setError(result.error);
              return;
            }
            formRef.current?.reset();
            setFileLabel(null);
            router.refresh();
          });
        }}
        className="space-y-2 border-t border-line p-3"
      >
        <input type="hidden" name="channelId" value={channelId} />
        {fileLabel && (
          <div className="flex items-center justify-between rounded-lg border border-line bg-canvas px-3 py-1.5 text-xs text-ink-muted">
            <span className="truncate">Attached: {fileLabel}</span>
            <button
              type="button"
              className="shrink-0 text-ink-faint hover:text-ink"
              onClick={() => {
                if (fileRef.current) fileRef.current.value = "";
                setFileLabel(null);
              }}
            >
              Remove
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <input
            ref={fileRef}
            type="file"
            name="file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setFileLabel(f ? f.name : null);
              setError(null);
            }}
          />
          <button
            type="button"
            className="btn-ghost shrink-0 px-3 text-sm"
            onClick={() => fileRef.current?.click()}
            disabled={pending}
            title="Attach a file"
            aria-label="Attach a file"
          >
            File
          </button>
          <input
            name="body"
            aria-label="Message"
            maxLength={2000}
            className="input flex-1"
            placeholder={placeholder}
            autoComplete="off"
            disabled={pending}
          />
          <button type="submit" className="btn-primary shrink-0 px-4 text-sm" disabled={pending}>
            {pending ? "…" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
