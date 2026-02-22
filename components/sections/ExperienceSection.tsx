import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { Experience } from "@/types";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="relative px-6 py-24 overflow-hidden">
      {/* Background organic glows */}
      <div className="absolute top-[20%] right-[-10%] -z-10 h-[40rem] w-[40rem] bg-accent-neon-purple/10 blur-[120px] rounded-full animate-blob"></div>
      <div className="absolute bottom-[10%] left-[-5%] -z-10 h-[30rem] w-[30rem] bg-accent-neon-blue/10 blur-[100px] rounded-full animate-blob animation-delay-4000"></div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-accent-neon-blue font-display">Trajectory</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-neon-blue to-accent-neon-purple">Journey</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-text-muted max-w-md text-lg lg:text-right font-body"
          >
            A history of building scalable solutions and driving digital transformation through clean code and AI focus.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.company + index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <GlassCard className="h-full p-8 flex flex-col border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-accent-neon-blue/30 transition-all group overflow-hidden relative">
                {/* Decorative background element */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-neon-blue/5 rounded-full blur-2xl group-hover:bg-accent-neon-blue/10 transition-colors" />

                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-accent-neon-blue font-display text-xs font-bold uppercase tracking-wider">
                        <Calendar size={14} className="shrink-0" />
                        <span>{exp.startDate} — {exp.endDate}</span>
                      </div>
                      <h3 className="mt-2 text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-neon-blue group-hover:to-accent-neon-purple transition-all duration-300 font-display leading-tight">
                        {exp.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 items-center text-sm text-text-muted">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Briefcase size={14} className="text-accent-neon-purple" />
                      {exp.company}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-accent-neon-blue" />
                      {exp.location}
                    </div>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent my-2" />

                  <ul className="space-y-3 flex-grow">
                    {exp.highlights.slice(0, 4).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors font-body">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-tr from-accent-neon-blue to-accent-neon-purple shadow-[0_0_8px_rgba(0,240,255,0.4)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

