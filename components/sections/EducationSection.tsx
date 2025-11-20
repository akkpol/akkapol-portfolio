import { resumeContent } from "@/data/resumeContent";
import { GlassCard } from "@/components/ui/GlassCard";

export function EducationSection() {
  return (
    <section id="education" className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent.blue">Education</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
            Lifelong Learning Path
          </h2>
          <p className="mt-3 text-text-muted">
            Formal studies plus self-driven practice to stay sharp and adaptable.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {resumeContent.education.map((edu) => (
            <GlassCard key={edu.program} className="p-5">
              <p className="text-sm uppercase tracking-[0.4em] text-text-muted">{edu.year}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-white">{edu.program}</h3>
              <p className="text-accent.purple">{edu.institution}</p>
              <p className="text-xs uppercase tracking-wide text-text-muted">{edu.location}</p>
              <p className="mt-4 text-sm text-text-muted">{edu.summary}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

