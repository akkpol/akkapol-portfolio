export default function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background text-text-primary">
      <div className="absolute inset-0 bg-radial-glow opacity-70" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-hero-gradient blur-[120px] opacity-40 animate-float-slow" />
      <div className="absolute bottom-0 left-[-10%] h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-accent.purple/50 to-accent.blue/40 blur-[140px] opacity-30 animate-float-slow" />
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}

