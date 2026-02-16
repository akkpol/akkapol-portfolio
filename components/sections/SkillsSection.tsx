import { GlassCard } from "@/components/ui/GlassCard";
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
    <section id="skills" className="relative px-6 py-24">
       {/* Background */}
       <div className="absolute left-0 bottom-0 -z-10 h-[40rem] w-[40rem] bg-accent-neon-purple/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-neon-blue">Tech Stack</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
              Tools & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-neon-purple to-accent-neon-pink">Technologies</span>
            </h2>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
        >
          {skills.map((group, index) => (
            <motion.div
              key={group.title + index}
              variants={item}
              className={index === 0 || index === 3 || (index > 4 && index % 3 === 0) ? "lg:col-span-2" : ""}
            >
               {/* Bento Item */}
               <GlassCard className="h-full p-8 hover:bg-white/10 hover:border-accent-neon-blue/30 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     {/* Abstract glow shape */}
                     <div className="h-24 w-24 rounded-full bg-gradient-to-br from-accent-neon-blue to-accent-neon-purple blur-xl"></div>
                  </div>

                  <h3 className="relative z-10 text-2xl font-bold text-white mb-6 group-hover:text-accent-neon-blue transition-colors">
                    {group.title}
                  </h3>

                  <div className="relative z-10 flex flex-wrap gap-3">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-sm font-medium text-gray-300 backdrop-blur-md transition-colors group-hover:border-accent-neon-blue/20 group-hover:bg-accent-neon-blue/5 group-hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
               </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
