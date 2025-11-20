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
        background: "#050816",
        surface: "#0F172A",
        "surface-muted": "rgba(15, 23, 42, 0.85)",
        "text-primary": "#E5E7EB",
        "text-muted": "#9CA3AF",
        accent: {
          blue: "#38BDF8",
          purple: "#A855F7",
          green: "#22C55E",
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
      },
      boxShadow: {
        "glow-blue": "0 10px 40px rgba(56,189,248,0.25)",
        "glow-purple": "0 10px 40px rgba(168,85,247,0.25)",
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
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
