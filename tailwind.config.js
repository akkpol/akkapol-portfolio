/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        "text-primary": "var(--text-primary)",
        "text-muted": "var(--text-muted)",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          blue: "#38BDF8",
          purple: "#A855F7",
          green: "#22C55E",
          "neon-blue": "#00F0FF",
          "neon-purple": "#7000FF",
          "neon-pink": "#FF0099",
          "warm-orange": "#FB923C",
          "soft-teal": "#2DD4BF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "Poppins", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.2), transparent 45%), radial-gradient(circle at 80% 0%, rgba(168,85,247,0.25), transparent 55%), radial-gradient(circle at 80% 50%, rgba(34,197,94,0.15), transparent 60%)",
        "hero-gradient":
          "linear-gradient(135deg, rgba(56,189,248,0.7), rgba(168,85,247,0.7))",
        "neon-mesh":
          "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      },
      boxShadow: {
        "glow-blue": "0 0 20px rgba(56, 189, 248, 0.5)",
        "glow-purple": "0 0 20px rgba(168, 85, 247, 0.5)",
        "glow-neon": "0 0 10px rgba(0, 240, 255, 0.7), 0 0 20px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.3)",
        "glow-mixed":
          "0 20px 60px rgba(56,189,248,0.25), 0 30px 80px rgba(168,85,247,0.35)",
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      dropShadow: {
        "neon-blue": "0 0 10px rgba(0, 240, 255, 0.5)",
        "neon-purple": "0 0 10px rgba(168, 85, 247, 0.5)",
        "neon-white": "0 0 10px rgba(255, 255, 255, 0.5)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: 0.4 },
          "50%": { opacity: 0.8 },
        },
        "border-spin": {
          "100%": { transform: "rotate(-360deg)" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        "text-shimmer": {
          "0%": { "background-position": "0% 50%" },
          "100%": { "background-position": "100% 50%" },
        },
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
        "border-spin": "border-spin 7s linear infinite",
        blob: "blob 7s infinite",
        "text-shimmer": "text-shimmer 3s ease infinite",
      },
    },
  },
  plugins: [],
};
