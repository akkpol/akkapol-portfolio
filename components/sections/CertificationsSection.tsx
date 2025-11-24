import { GlassCard } from "@/components/ui/GlassCard";
import { Certification } from "@/types";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent.green">Certifications</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
            Credentials & Recognition
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((cert) => (
            <GlassCard key={cert.name} className="p-6">
              <p className="text-sm uppercase tracking-[0.4em] text-text-muted">{cert.year}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white">{cert.name}</h3>
              <p className="text-accent.blue">{cert.issuer}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
