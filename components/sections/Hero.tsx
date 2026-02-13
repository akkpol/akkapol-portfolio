import { motion, useScroll, useTransform } from "framer-motion";
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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  },
};

const floatAnimation = {
  y: [0, -15, 0],
  rotate: [0, 2, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export function HeroSection({ basics }: { basics: Basics }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section id="hero" className="relative isolate min-h-[90vh] flex items-center overflow-hidden px-6 pt-32 pb-16 sm:pb-24">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-20 bg-surface/50" />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ y: y1, opacity: 0.6 }}
          className="absolute -top-[20%] -right-[10%] h-[40rem] w-[40rem] rounded-full bg-accent-blue/20 blur-[120px]"
        />
        <motion.div
          style={{ y: y2, opacity: 0.6 }}
          className="absolute top-[40%] -left-[10%] h-[35rem] w-[35rem] rounded-full bg-accent-purple/20 blur-[120px]"
        />
      </div>

      {/* Hero Decoration - Parallax Element */}
      <motion.div
        className="absolute right-0 top-1/4 -z-10 opacity-30 dark:opacity-20 pointer-events-none select-none"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{ y: y2 }}
      >
         <img src="/hero-decoration.png" alt="" className="w-[800px] max-w-none rotate-12" />
      </motion.div>

      <motion.div
        className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row"
        variants={heroContainer}
        initial="hidden"
        animate="show"
      >
        <div className="flex-1 text-center md:text-left z-10">
          <motion.div variants={heroItem} className="inline-block">
            <span className="inline-flex items-center rounded-full border border-accent-blue/30 bg-accent-blue/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent-blue backdrop-blur-sm">
              Available for Projects
            </span>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="mt-6 font-display text-5xl font-black leading-[1.1] text-text-primary sm:text-6xl lg:text-7xl tracking-tight"
          >
            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Digital</span> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-pink-500">Experiences</span>
          </motion.h1>

          <motion.p variants={heroItem} className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl">
            {basics.about}
          </motion.p>

          <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
            {basics.keywords.slice(0, 5).map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.1, rotate: -2 }}
                className="cursor-default rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent-blue/50 hover:text-accent-blue"
              >
                # {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={heroItem} className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
            <PrimaryButton href="#experience" className="shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 transition-all duration-300">
              Explore Work
            </PrimaryButton>
            <SecondaryButton href="mailto:akkapol.kumpapug@gmail.com" className="backdrop-blur-sm hover:bg-white/10">
              Let's Talk
            </SecondaryButton>
          </motion.div>
        </div>

        <motion.div
          variants={heroItem}
          className="relative flex flex-1 justify-center perspective-1000"
        >
          <TiltCard className="relative h-[22rem] w-[22rem] sm:h-[28rem] sm:w-[28rem] rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/20 bg-surface/40 p-2 shadow-2xl backdrop-blur-md">
              <div 
                className="h-full w-full rounded-[1.5rem] bg-cover bg-center transition-transform duration-700 hover:scale-110"
                style={{ backgroundImage: "url('/profile-hero.png')" }}
              />

              {/* Floating Cards */}
              <motion.div
                className="absolute -right-8 top-12 flex items-center gap-3 rounded-2xl border border-white/20 bg-surface/90 px-5 py-3 shadow-xl backdrop-blur-xl"
                animate={floatAnimation}
              >
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-text-primary">Open to Work</span>
              </motion.div>

              <motion.div
                className="absolute -left-6 bottom-10 rounded-2xl border border-white/20 bg-surface/90 px-5 py-4 shadow-xl backdrop-blur-xl"
                animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 1 } }}
              >
                <div className="text-xs text-text-muted uppercase tracking-wider">Specialty</div>
                <div className="text-sm font-bold text-text-primary">React & SharePoint</div>
              </motion.div>
            </div>
          </TiltCard>

          {/* Background Glow behind profile */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-accent-blue to-accent-purple opacity-40 blur-[80px]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
