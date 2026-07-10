import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canvas / surfaces (dark-first premium fintech)
        canvas: "#0A0E16",
        surface: {
          DEFAULT: "#111827",
          raised: "#161F30",
          overlay: "#1B2536",
        },
        line: {
          DEFAULT: "#233047",
          strong: "#2E3D57",
        },
        ink: {
          DEFAULT: "#E9EEF7",
          muted: "#94A3B8",
          faint: "#5B6B85",
        },
        // Brand energy: electric neon green accents
        brand: {
          DEFAULT: "#39FF14",
          bright: "#66FF4D",
          dim: "#2DB30F",
          ghost: "rgba(57,255,20,0.12)",
        },
        // Prestige gold — reserved for MD+ ranks & equity (top of stack)
        gold: {
          DEFAULT: "#F5B301",
          soft: "#FBCE4B",
          deep: "#B8860B",
        },
        info: "#3B82F6",
        warn: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.15rem",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(57,255,20,0.35), 0 0 28px -6px rgba(57,255,20,0.45)",
        goldglow: "0 0 0 1px rgba(245,179,1,0.4), 0 0 28px -6px rgba(245,179,1,0.4)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
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
        pop: "pop 0.25s ease-out both",
        shimmer: "shimmer 1.4s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
