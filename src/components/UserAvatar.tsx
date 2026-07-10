import { cn } from "@/lib/util";

/** Letter fallback or headshot image */
export function UserAvatar({
  name,
  color,
  url,
  size = 40,
  className,
  rounded = "full",
}: {
  name: string;
  color: string;
  url?: string | null;
  size?: number;
  className?: string;
  rounded?: "full" | "2xl" | "xl";
}) {
  const radius = rounded === "full" ? "rounded-full" : rounded === "2xl" ? "rounded-2xl" : "rounded-xl";
  const initial = (name || "?").charAt(0).toUpperCase();

  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={name}
        width={size}
        height={size}
        className={cn(radius, "object-cover shrink-0", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={cn(radius, "flex shrink-0 items-center justify-center font-black text-canvas", className)}
      style={{ width: size, height: size, backgroundColor: color, fontSize: Math.max(12, size * 0.38) }}
      aria-hidden
    >
      {initial}
    </div>
  );
}
