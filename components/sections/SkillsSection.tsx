import { GlitchCard } from "@/components/ui/GlitchCard";
import { motion } from "framer-motion";
import { SkillGroup } from "@/types";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
};

export function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  return (
    <section id="skills" className="relative px-6 py-24 min-h-screen flex items-center">
      {/* Background: Digital Void */}
      <div className="absolute inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50rem] w-[50rem] rounded-full bg-accent-neon-blue/10 blur-[150px] animate-pulse-glow pointer-events-none"></div>

      <div className="mx-auto max-w-7xl w-full">
        {/* Header: Cyber Style */}
        <div className="mb-20 text-center relative">
          <div className="inline-block relative">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="font-display text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-neon-blue via-white to-accent-neon-purple drop-shadow-neon-blue tracking-tight"
            >
              SYSTEM CORE
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-2 left-0 h-[2px] bg-accent-neon-blue shadow-[0_0_10px_#00F0FF]"
            ></motion.div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-4 right-0 h-[1px] bg-accent-neon-purple opacity-70"
            ></motion.div>
          </div>
          <p className="mt-6 text-gray-400 font-mono tracking-widest text-sm uppercase opacity-80 animate-pulse">
            &lt; LOADING_MODULES /&gt;
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr"
        >
          {skills.map((group, index) => (
            <motion.div
              key={group.title + index}
              variants={item}
              className={`relative ${index === 0 ? "lg:col-span-2 row-span-2" : ""}`}
            >
              {/* Cyber Card */}
              <GlitchCard className="h-full group" borderColor={index % 2 === 0 ? "cyan" : "purple"}>
                <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-accent-neon-blue transition-colors tracking-wide">
                    {group.title.toUpperCase()}
                  </h3>
                  {/* Status Light */}
                  <div className="flex space-x-1">
                    <span className="h-2 w-2 rounded-full bg-accent-neon-blue animate-pulse"></span>
                    <span className="h-2 w-2 rounded-full bg-white/20"></span>
                    <span className="h-2 w-2 rounded-full bg-white/20"></span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {group.items.map((skill) => (
                    <div key={skill} className="relative group/skill cursor-default">
                      {/* Tech Chip Effect */}
                      <div className="absolute inset-0 bg-accent-neon-blue/5 scale-x-0 group-hover/skill:scale-x-100 transition-transform origin-left rounded-md"></div>
                      <div className="relative border border-white/10 hover:border-accent-neon-blue/50 rounded-md px-3 py-2 text-sm text-gray-400 hover:text-white transition-all duration-200 font-mono flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-accent-neon-purple/50 rounded-full group-hover/skill:bg-accent-neon-blue shadow-[0_0_5px_currentColor] transition-colors"></span>
                        <span>{skill}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative Code Overlay */}
                <div className="absolute bottom-4 right-4 opacity-10 font-mono text-[10px] text-accent-neon-blue leading-tight pointer-events-none select-none hidden group-hover:block">
                  010101 CORE<br />
                  DATA_STREAM<br />
                  v.2.0.4<br />
                  ACTIVE
                </div>
              </GlitchCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
