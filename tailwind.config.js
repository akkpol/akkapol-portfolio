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
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        "text-primary": "var(--text-primary)",
        "text-muted": "var(--text-muted)",
        accent: {
          blue: "#38BDF8",
          purple: "#A855F7",
          green: "#22C55E",
          "neon-blue": "#00F0FF",
          "neon-purple": "#7000FF",
          "neon-pink": "#FF0099",
        },
      },
      fontFamily: {
        display: ["Inter", "Poppins", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.2), transparent 45%), radial-gradient(circle at 80% 0%, rgba(168,85,247,0.25), transparent 55%), radial-gradient(circle at 80% 50%, rgba(34,197,94,0.15), transparent 60%)",
        "hero-gradient":
          "linear-gradient(135deg, rgba(56,189,248,0.7), rgba(168,85,247,0.7))",
        "neon-mesh":
          "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)",
      },
      boxShadow: {
        "glow-blue": "0 0 20px rgba(56, 189, 248, 0.5)",
        "glow-purple": "0 0 20px rgba(168, 85, 247, 0.5)",
        "glow-neon": "0 0 10px rgba(0, 240, 255, 0.7), 0 0 20px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.3)",
        "glow-mixed":
          "0 20px 60px rgba(56,189,248,0.25), 0 30px 80px rgba(168,85,247,0.35)",
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
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
        "border-spin": "border-spin 7s linear infinite",
      },
    },
  },
  plugins: [],
};
