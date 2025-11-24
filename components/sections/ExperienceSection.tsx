import { GlassCard } from "@/components/ui/GlassCard";
import { Experience } from "@/types";

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="relative px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-accent.blue">Experience</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
            Building Digital Workflows & Interfaces
          </h2>
          <p className="mt-3 text-text-muted">
            From enterprise SharePoint solutions to React/Next.js frontends, these are the roles that shaped my craft.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 hidden w-px bg-gradient-to-b from-accent.purple via-accent.blue to-transparent md:block" />
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={exp.company + index} className="relative md:pl-12">
                <span className="absolute left-[10px] top-6 hidden h-3 w-3 rounded-full bg-gradient-to-r from-accent.blue to-accent.purple shadow-glow-blue md:block" />
                <GlassCard className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-text-muted">{exp.startDate} – {exp.endDate}</p>
                      <h3 className="mt-1 font-display text-2xl font-semibold text-white">{exp.title}</h3>
                      <p className="text-accent.blue">{exp.company} · {exp.location}</p>
                    </div>
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text-muted">
                    {exp.highlights.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
