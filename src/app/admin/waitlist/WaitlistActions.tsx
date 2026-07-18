"use client";

import { useState } from "react";
import { Icon } from "@/components/ui";
import { WaitlistSignup } from "@prisma/client";

export function WaitlistActions({ signups }: { signups: Pick<WaitlistSignup, "email">[] }) {
  const [copied, setCopied] = useState(false);
  
  const emails = signups.map((s) => s.email);
  const emailString = emails.join(", ");

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(emailString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy emails", err);
    }
  };

  const handleEmailAll = () => {
    const subject = encodeURIComponent("You're invited to CapStack");
    const body = encodeURIComponent(
      "Hey — thanks for joining the CapStack waitlist.\n\nWe've opened private access for you. Reply to this email and we'll provision your account (signup is invite-only — no public registration).\n\n— CapStack"
    );
    window.location.href = `mailto:?bcc=${emailString}&subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleCopyAll}
        className="flex items-center gap-2 rounded-xl bg-surface-raised px-4 py-2 text-sm font-semibold text-ink shadow-sm ring-1 ring-inset ring-line transition-colors hover:bg-surface-raised/70"
      >
        <Icon name={copied ? "check" : "copy"} size={16} className={copied ? "text-green-500" : ""} />
        {copied ? "Copied!" : "Copy All"}
      </button>

      <button
        onClick={handleEmailAll}
        className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-black shadow-glow transition-colors hover:bg-brand-bright"
      >
        <Icon name="mail" size={16} />
        Email All (BCC)
      </button>
    </div>
  );
}
