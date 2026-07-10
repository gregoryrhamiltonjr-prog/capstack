import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canvas / surfaces (dark-first institutional finance — "Capital Stack")
        canvas: "#0B0F17",
        surface: {
          DEFAULT: "#141B27",
          raised: "#1B2432",
          overlay: "#212C3D",
        },
        line: {
          DEFAULT: "#26303F",
          strong: "#33404F",
        },
        ink: {
          DEFAULT: "#ECE7DB", // warm parchment — reads like document, not screen
          muted: "#93A0B4",
          faint: "#8A96AC", // lightened from #5B6B85 to clear WCAG AA on canvas
        },
        // Brand: refined brass — seniority, capital, prestige (replaces neon green)
        brand: {
          DEFAULT: "#C79A3A",
          bright: "#E0B856",
          dim: "#9C7526",
          ghost: "rgba(199,154,58,0.12)",
        },
        // Prestige gold — reserved for apex ranks (Sponsor/GP, top of stack)
        gold: {
          DEFAULT: "#F5B301",
          soft: "#FBCE4B",
          deep: "#B8860B",
        },
        // Equity teal — safe/senior tranches & positive growth (used sparingly)
        equity: "#6FA891",
        info: "#3B82F6",
        warn: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.15rem",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(199,154,58,0.35), 0 0 28px -6px rgba(199,154,58,0.45)",
        goldglow: "0 0 0 1px rgba(245,179,1,0.4), 0 0 28px -6px rgba(245,179,1,0.4)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-in": {
          "0%": { opacity: "0", transform: "translateY(28px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "float-in-left": {
          "0%": { opacity: "0", transform: "translateX(-64px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "float-in-right": {
          "0%": { opacity: "0", transform: "translateX(64px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pop": {
          "0%": { transform: "scale(0.96)" },
          "60%": { transform: "scale(1.03)" },
          "100%": { transform: "scale(1)" },
        },
        "ring-fill": {
          "0%": { strokeDashoffset: "var(--from)" },
          "100%": { strokeDashoffset: "var(--to)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
        "float-in": "float-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "float-in-left": "float-in-left 1.2s cubic-bezier(0.16, 1, 0.3, 1) both",
        "float-in-right": "float-in-right 1.2s cubic-bezier(0.16, 1, 0.3, 1) both",
        pop: "pop 0.25s ease-out both",
        shimmer: "shimmer 1.4s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
