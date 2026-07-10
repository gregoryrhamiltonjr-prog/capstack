"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { uploadAvatarAction, removeAvatarAction } from "@/lib/actions";
import { UserAvatar } from "@/components/UserAvatar";

function CameraIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export function ProfileAvatarUpload({
  name,
  color,
  url,
}: {
  name: string;
  color: string;
  url?: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const displayUrl = preview || url || null;

  function upload(file: File) {
    setError(null);
    const obj = URL.createObjectURL(file);
    setPreview(obj);

    const fd = new FormData();
    fd.set("avatar", file);
    startTransition(async () => {
      const result = await uploadAvatarAction(fd);
      if (!result.ok) {
        setError(result.error);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }
      setPreview(result.url);
      router.refresh();
    });
  }

  return (
    <div className="space-y-1.5">
      <div className="group relative inline-block">
        <UserAvatar name={name} color={color} url={displayUrl} size={80} rounded="2xl" className="border-4 border-surface shadow-xl" />

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
          }}
        />

        <button
          type="button"
          disabled={pending}
          onClick={() => inputRef.current?.click()}
          className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-md transition-colors hover:border-brand/40 hover:text-brand disabled:opacity-60"
          title={url || preview ? "Change headshot" : "Upload headshot"}
          aria-label={url || preview ? "Change headshot" : "Upload headshot"}
        >
          {pending ? (
            <span className="text-[10px] font-bold">…</span>
          ) : (
            <CameraIcon size={13} />
          )}
        </button>

        {(url || preview) && !pending && (
          <button
            type="button"
            onClick={() => {
              setError(null);
              startTransition(async () => {
                await removeAvatarAction();
                setPreview(null);
                if (inputRef.current) inputRef.current.value = "";
                router.refresh();
              });
            }}
            className="absolute -right-1 -top-1 hidden h-5 w-5 items-center justify-center rounded-full border border-line bg-surface text-[10px] font-bold text-ink-muted shadow-sm hover:text-danger group-hover:flex"
            title="Remove headshot"
            aria-label="Remove headshot"
          >
            ×
          </button>
        )}
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
