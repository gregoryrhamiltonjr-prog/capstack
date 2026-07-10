import { cn } from "@/lib/util";

// Stacked-bar glyph: 4 horizontal bars of decreasing width, gold top bar = equity (top of stack).
export function Logo({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="22" width="26" height="5" rx="1.5" fill="#10B981" />
      <rect x="5" y="15" width="22" height="5" rx="1.5" fill="#1FB07E" opacity="0.9" />
      <rect x="8" y="8" width="16" height="5" rx="1.5" fill="#2E8BE6" opacity="0.9" />
      <rect x="11" y="2" width="10" height="4.5" rx="1.5" fill="#F5B301" />
    </svg>
  );
}

export function Wordmark({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-bold tracking-tight", className)}>
      <Logo size={size} />
      <span className="text-ink">
        Cap<span className="text-brand">Stack</span>
      </span>
    </span>
  );
}
