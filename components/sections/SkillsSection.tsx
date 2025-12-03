import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { SkillGroup } from "@/types";

export function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  return (
    <section id="skills" className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent-purple">Skills</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-gray-900 dark:text-white sm:text-4xl">
            Tooling & Capabilities
          </h2>
          <p className="mt-3 text-text-muted">
            A blend of enterprise SharePoint, modern frontend, and automation skills that scale operations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((group, index) => (
            <GlassCard key={`${group.title}-${index}`} className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-white">{group.title}</h3>
                <motion.span
                  className="text-sm text-text-muted"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  {group.items?.length || 0} tools
                </motion.span>
              </div>
              <div className="mt-4 grid gap-3">
                {group.items?.map((item, idx) => (
                  <div key={`${item}-${idx}`} className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-text-primary/80">
                      <p>{item}</p>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
