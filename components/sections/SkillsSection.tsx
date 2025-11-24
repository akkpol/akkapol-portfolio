import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { Skill } from "@/types";
import SkillCard from "@/components/SkillCard";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent.purple">Skills</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
            Tooling & Capabilities
          </h2>
          <p className="mt-3 text-text-muted">
            A blend of enterprise SharePoint, modern frontend, and automation skills that scale operations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
           {skills.map((skill, index) => (
             <SkillCard key={index} skill={skill} index={index} />
           ))}
        </div>
      </div>
    </section>
  );
}
