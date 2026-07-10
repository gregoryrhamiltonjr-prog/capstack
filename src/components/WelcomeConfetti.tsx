"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Wordmark } from "@/components/Logo";

const DURATION_MS = 3200;
// Brass / gold / capital-stack palette (matches brand tokens).
const COLORS = ["#C79A3A", "#E0B856", "#F5B301", "#FBCE4B", "#6FA891", "#2E8BE6", "#ECE7DB"];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vrot: number;
  color: string;
  shape: "rect" | "circle";
};

/**
 * Full-screen confetti + welcome card, fired once when the app is entered with
 * `?welcome=1` (set on the post-checkout redirect). Auto-dismisses after a few
 * seconds and strips the param so a refresh doesn't replay it.
 */
function WelcomeConfettiInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);

  const active = searchParams.get("welcome") === "1";

  const dismiss = useCallback(() => {
    setShow(false);
    // Drop the flag from the URL without a new history entry.
    const rest = new URLSearchParams(searchParams);
    rest.delete("welcome");
    const qs = rest.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (!show) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dismiss, show]);

  useEffect(() => {
    if (!active) return;
    setShow(true);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const timer = window.setTimeout(dismiss, DURATION_MS);
    if (reduced) return () => window.clearTimeout(timer);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return () => window.clearTimeout(timer);

    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = [];
    // Two cannons from the bottom corners, blown up and across the screen.
    const cannon = (originX: number, dir: number) => {
      for (let i = 0; i < 90; i++) {
        const angle = -Math.PI / 2 + dir * 0.55 + (Math.random() - 0.5) * 0.5;
        const speed = 9 + Math.random() * 12;
        particles.push({
          x: originX,
          y: H + 10,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
          vy: Math.sin(angle) * speed - Math.random() * 4,
          size: 5 + Math.random() * 7,
          rot: Math.random() * Math.PI,
          vrot: (Math.random() - 0.5) * 0.3,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          shape: Math.random() > 0.5 ? "rect" : "circle",
        });
      }
    };
    cannon(W * 0.08, 1);
    cannon(W * 0.92, -1);

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, W, H);
      const fade = Math.max(0, 1 - Math.max(0, elapsed - (DURATION_MS - 900)) / 900);
      for (const p of particles) {
        p.vy += 0.28; // gravity
        p.vx *= 0.995; // drag
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (elapsed < DURATION_MS) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [active, dismiss]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={dismiss}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to CapStack"
        >
          <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
          <motion.div
            initial={{ scale: 0.9, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.05 }}
            onClick={(event) => event.stopPropagation()}
            className="card-raised relative mx-4 max-w-md px-8 py-10 text-center shadow-glow"
          >
            <Wordmark size={36} className="mx-auto text-2xl" />
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-ink">Welcome to CapStack!</h2>
            <p className="mt-2 text-ink-muted">Dive in and start exploring!</p>
            <button type="button" autoFocus onClick={dismiss} className="btn-primary mt-7 w-full">
              Let&apos;s go
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function WelcomeConfetti() {
  // useSearchParams requires a Suspense boundary in the App Router.
  return (
    <Suspense fallback={null}>
      <WelcomeConfettiInner />
    </Suspense>
  );
}
