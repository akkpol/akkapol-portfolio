import { motion } from "framer-motion";
import { PrimaryButton, SecondaryButton } from "@/components/ui/PrimaryButton";
import { Basics } from "@/types";
import TiltCard from "@/components/TiltCard";
import LiquidImage from "@/components/ui/LiquidImage";

const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroSection({ basics }: { basics: Basics }) {
  return (
    <section id="hero" className="relative isolate min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-20 pb-16">
      {/* Organic Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-accent-neon-blue/20 blur-[100px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-accent-neon-purple/20 blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute top-[40%] left-[30%] h-[30rem] w-[30rem] rounded-full bg-accent-neon-pink/20 blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />
      </div>

      <motion.div
        className="mx-auto flex w-full max-w-7xl flex-col items-center gap-16 lg:flex-row lg:justify-between"
        variants={heroContainer}
        initial="hidden"
        animate="show"
      >
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left z-10">
          <motion.div variants={heroItem} className="inline-flex items-center rounded-full border border-accent-neon-blue/30 bg-accent-neon-blue/10 px-4 py-1.5 backdrop-blur-md shadow-glow-neon">
            <span className="flex h-2 w-2 rounded-full bg-accent-neon-blue animate-pulse mr-2"></span>
            <span className="text-xs font-medium uppercase tracking-widest text-accent-neon-blue font-display">
              Available for Work
            </span>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="mt-6 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-neon-blue via-white to-accent-neon-purple animate-text-shimmer bg-[length:200%_auto]">{basics.name}</span>
          </motion.h1>

          <motion.p variants={heroItem} className="mt-6 text-xl text-gray-300 sm:text-2xl font-light font-body">
            {basics.headline}
          </motion.p>

          <motion.p variants={heroItem} className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400 lg:mx-0 mx-auto">
            {basics.about}
          </motion.p>

          <motion.div variants={heroItem} className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
            {basics.keywords.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/5 bg-white/5 px-3 py-1 text-sm text-gray-300 transition-all hover:border-accent-neon-blue/50 hover:bg-accent-neon-blue/10 hover:shadow-glow-blue hover:-translate-y-1"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={heroItem} className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4" role="group" aria-label="Primary actions">
            <PrimaryButton href="#experience" className="!bg-accent-neon-blue !text-black border-none shadow-glow-neon hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] hover:scale-105 transition-all text-lg px-8 py-3 rounded-xl font-bold">
              Explore My Work
            </PrimaryButton>
            <SecondaryButton href="#contact" className="border-white/20 backdrop-blur-md hover:border-accent-neon-purple/50 hover:bg-accent-neon-purple/10 hover:text-accent-neon-purple transition-all text-lg px-8 py-3 rounded-xl">
              Contact Me
            </SecondaryButton>
          </motion.div>
        </div>

        {/* Visual Content (Holographic Commander) */}
        <motion.div
          variants={heroItem}
          className="relative flex flex-1 justify-center lg:justify-end z-10 mt-12 lg:mt-0"
        >
          <div className="relative w-full max-w-[500px] aspect-square lg:aspect-[4/5] flex items-center justify-center">
            {/* Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-neon-blue/20 via-accent-neon-purple/20 to-accent-neon-pink/20 blur-[60px] animate-pulse-glow rounded-full" />

            {/* Main Image Container */}
            <TiltCard className="relative w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700 ease-out group">

              {/* Glowing Ring Background */}
              <div className="absolute inset-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-glass animate-border-spin opacity-50" />
              <div className="absolute inset-8 rounded-full border border-accent-neon-blue/30 animate-reverse-spin opacity-30" />

              {/* The Hero Image (Liquid Effect with Hover Switch) */}
              <div
                className="relative w-full h-full animate-float-slow drop-shadow-neon-blue filter contrast-125 brightness-110 overflow-hidden rounded-full group/image"
              >
                {/* Default State: Standing (pos1.png) */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-100 group-hover/image:opacity-0">
                  <LiquidImage
                    imageSrc="/pos1.png"
                    alt="Akkapol Kumpapug (Standing)"
                    strength={0.02}
                    speed={0.1}
                    className="object-contain duration-700"
                  />
                </div>

                {/* Active State: Running (Run.png) */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover/image:opacity-100">
                  <LiquidImage
                    imageSrc="/Run.png"
                    alt="Akkapol Kumpapug (Action)"
                    strength={0.06} // Higher intensity for action
                    speed={0.25}   // Faster movement for running
                    className="object-contain duration-300 scale-105"
                  />
                </div>
              </div>

              {/* Holographic Overlay Effects */}
// ... existing code ...

              {/* Holographic Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

            </TiltCard>

            {/* Floating UI Elements (Decorations) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute top-1/4 -left-4 glass px-4 py-2 rounded-xl border border-accent-neon-blue/30 text-xs font-mono text-accent-neon-blue shadow-lg backdrop-blur-md hidden md:block"
            >
              AI_ARCHITECT::INITIALIZED
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute bottom-1/4 -right-4 glass px-4 py-2 rounded-xl border border-accent-neon-purple/30 text-xs font-mono text-accent-neon-purple shadow-lg backdrop-blur-md hidden md:block"
            >
              STATUS::OPTIMIZED
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
