import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { Experience } from "@/types";

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="relative px-6 py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -z-10 h-[30rem] w-[30rem] bg-accent-neon-blue/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-neon-purple">Career Path</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-neon-blue to-accent-neon-purple">Experience</span>
            </h2>
          </motion.div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-gradient-to-b from-accent-neon-blue via-accent-neon-purple to-transparent md:left-1/2 md:-ml-px" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.company + index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center justify-between md:justify-normal ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 -translate-x-1/2 md:left-1/2 h-4 w-4 rounded-full border-2 border-accent-neon-blue bg-background shadow-[0_0_10px_rgba(0,240,255,0.8)] z-10">
                  <div className="absolute inset-0 animate-ping rounded-full bg-accent-neon-blue opacity-50"></div>
                </div>

                {/* Content Side */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                  <GlassCard className="p-6 md:p-8 hover:border-accent-neon-blue/30 hover:shadow-[0_10px_40px_-10px_rgba(0,240,255,0.1)] transition-all duration-300 group">
                    <span className="mb-2 inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-accent-neon-blue backdrop-blur-sm">
                      {exp.startDate} - {exp.endDate}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-white group-hover:text-accent-neon-blue transition-colors">{exp.title}</h3>
                    <p className="text-lg font-medium text-gray-400">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-4">{exp.location}</p>

                    <ul className="mt-4 space-y-2 text-sm text-gray-300 leading-relaxed text-left">
                      {exp.highlights.slice(0, 3).map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                           <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-neon-purple" />
                           <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>

                {/* Spacer Side for Desktop */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
