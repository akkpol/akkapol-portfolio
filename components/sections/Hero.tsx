import { motion } from "framer-motion";
import { PrimaryButton, SecondaryButton } from "@/components/ui/PrimaryButton";
import { Basics } from "@/types";
import TiltCard from "@/components/TiltCard";

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
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-neon-blue/20 via-background to-background opacity-40" />
      <div className="absolute top-1/2 left-1/2 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-neon-purple/10 blur-[120px]" />

      <motion.div
        className="mx-auto flex w-full max-w-7xl flex-col items-center gap-16 lg:flex-row lg:justify-between"
        variants={heroContainer}
        initial="hidden"
        animate="show"
      >
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div variants={heroItem} className="inline-flex items-center rounded-full border border-accent-neon-blue/30 bg-accent-neon-blue/10 px-4 py-1.5 backdrop-blur-sm">
             <span className="flex h-2 w-2 rounded-full bg-accent-neon-blue animate-pulse mr-2"></span>
             <span className="text-xs font-medium uppercase tracking-widest text-accent-neon-blue">
               Available for Work
             </span>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="mt-6 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-neon-blue to-accent-neon-purple">{basics.name}</span>
          </motion.h1>

          <motion.p variants={heroItem} className="mt-6 text-xl text-gray-300 sm:text-2xl font-light">
            {basics.headline}
          </motion.p>

          <motion.p variants={heroItem} className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400 lg:mx-0 mx-auto">
            {basics.about}
          </motion.p>

          <motion.div variants={heroItem} className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
            {basics.keywords.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/5 bg-white/5 px-3 py-1 text-sm text-gray-300 transition-colors hover:border-accent-neon-blue/50 hover:bg-accent-neon-blue/10"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={heroItem} className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
            <PrimaryButton href="#experience" className="!bg-none !bg-accent-neon-blue hover:!bg-accent-neon-blue/80 text-black border-none shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all">
              Explore My Work
            </PrimaryButton>
            <SecondaryButton href="#contact" className="border-white/20 hover:border-accent-neon-purple/50 hover:bg-accent-neon-purple/10 hover:text-accent-neon-purple transition-all">
              Contact Me
            </SecondaryButton>
          </motion.div>
        </div>

        {/* Visual Content (3D Card) */}
        <motion.div
          variants={heroItem}
          className="relative flex flex-1 justify-center lg:justify-end"
        >
          <div className="relative group">
            {/* Spinning Border Effect */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent-neon-blue via-accent-neon-purple to-accent-neon-blue opacity-30 blur-lg animate-pulse group-hover:opacity-60 transition-opacity duration-500" />

            <TiltCard className="relative h-80 w-80 md:h-96 md:w-96 rounded-2xl">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-surface/50 p-2 backdrop-blur-xl">
                 <div
                  className="h-full w-full rounded-xl bg-cover bg-center object-cover"
                  style={{ backgroundImage: `url('${basics.image || '/profile.jpg'}')` }}
                 />

                 {/* Floating Badges */}
                 <motion.div
                    className="absolute -right-4 top-10 rounded-xl border border-white/10 bg-black/80 px-4 py-2 text-sm font-bold text-accent-neon-blue shadow-lg backdrop-blur-md"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🚀 React / Next.js
                  </motion.div>

                  <motion.div
                    className="absolute -left-6 bottom-10 rounded-xl border border-white/10 bg-black/80 px-4 py-2 text-sm font-bold text-accent-neon-purple shadow-lg backdrop-blur-md"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    ⚡ SharePoint Expert
                  </motion.div>
              </div>
            </TiltCard>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
