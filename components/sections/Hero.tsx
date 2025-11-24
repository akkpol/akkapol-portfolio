import { motion } from "framer-motion";
import { PrimaryButton, SecondaryButton } from "@/components/ui/PrimaryButton";
import { Basics } from "@/types";

const heroContainer = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

interface HeroSectionProps {
  basics: Basics;
}

export function HeroSection({ basics }: HeroSectionProps) {
  return (
    <section id="hero" className="relative isolate overflow-hidden px-6 pt-32 pb-16 sm:pb-24">
      <div className="absolute inset-0 -z-10">
        <div className="mx-auto h-[30rem] max-w-5xl bg-hero-gradient opacity-20 blur-[160px]" />
      </div>
      <motion.div
        className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row"
        variants={heroContainer}
        initial="hidden"
        animate="show"
      >
        <div className="flex-1 text-center md:text-left">
          <motion.p variants={heroItem} className="font-display text-sm uppercase tracking-[0.4em] text-text-muted">
            IT Developer / SharePoint / React
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-4 font-display text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {basics.name}
          </motion.h1>
          <motion.p variants={heroItem} className="mt-3 text-xl text-accent.blue">
            {basics.headline}
          </motion.p>
          <motion.p variants={heroItem} className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">
            {basics.about}
          </motion.p>

          <motion.div variants={heroItem} className="mt-6 flex flex-wrap gap-3">
            {basics.keywords && basics.keywords.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-text-primary"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={heroItem} className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton href="#experience">View Experience</PrimaryButton>
            <SecondaryButton href={`mailto:${basics.email}`}>Contact</SecondaryButton>
            <SecondaryButton href="/dashboard">Admin Dashboard</SecondaryButton>
          </motion.div>
        </div>

        <motion.div
          variants={heroItem}
          className="relative flex flex-1 justify-center"
        >
          <div className="relative h-72 w-72 rounded-[2.5rem] border border-white/10 bg-surface/70 p-1 shadow-glow-mixed backdrop-blur-3xl md:h-80 md:w-80">
            <div className="h-full w-full rounded-[2rem] bg-[url('/profile.jpg')] bg-cover bg-center" />
            <motion.div
              className="absolute -right-6 top-6 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-text-primary shadow-glow-blue backdrop-blur-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              SharePoint · Power Platform
            </motion.div>
            <motion.div
              className="absolute -left-8 bottom-6 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-text-primary shadow-glow-purple backdrop-blur-xl"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
            >
              React · Next.js
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
