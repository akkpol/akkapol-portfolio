 "use client";

import { HeroSection } from "@/components/sections/Hero";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/PrimaryButton";
import { useProfile } from "@/hooks/useProfile";

export default function ProfilePage() {
  const { data, loading, error } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent-blue" />
      </div>
    );
  }

  if (error || !data) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-background text-text-primary">
        <p>Error loading profile: {error || "No data found"}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <HeroSection basics={data.basics} />
      <ExperienceSection experience={data.experience} />
      <SkillsSection skills={data.skills} />
      <CertificationsSection certifications={data.certifications} />
      <EducationSection education={data.education} />

      <section id="contact" className="px-6 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-accent.purple">Contact</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
            Let’s build something smart and scalable
          </h2>
          <p className="mt-4 text-text-muted">
            Available for roles that combine SharePoint/Power Platform automation with modern frontend craft. I love
            shipping tools that bring clarity to complex workflows.
          </p>
        </div>
        <GlassCard className="mx-auto mt-8 max-w-4xl p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Email</p>
              <a href={`mailto:${data.basics.email}`} className="flex items-center gap-2 text-text-primary">
                <Mail size={16} />
                {data.basics.email}
              </a>
            </div>
            {/* Phone/LINE fields are not in Basics type/profile.json, using static placeholder or removing if strict */}
             {/* The Basics type doesn't have phone/line, so I'll comment this out or adapt if I can find where to store it.
                 profile.json doesn't have phone/line either.
                 I will keep the structure but hide dynamic content or hardcode if needed,
                 but strictly speaking I should only use available data.
                 Since the original resumeContent had it but profile.json doesn't, it's a data loss.
                 I will omit Phone/LINE section or put placeholders if desired.
                 For now, I'll remove the specific fields that don't exist in data.basics
             */}
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Socials</p>
               {data.basics.socials.linkedin && (
                <a href={data.basics.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-primary">
                  LinkedIn
                </a>
               )}
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Location</p>
              <p className="flex items-center gap-2 text-text-primary">
                <MapPin size={16} />
                {data.basics.location}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
             {/* Portfolio link is also not in Basics type explicitly, but maybe part of socials?
                 Currently type only has linkedin.
                 I'll default to just LinkedIn button if others are missing.
             */}
            <SecondaryButton href={data.basics.socials.linkedin}>LinkedIn</SecondaryButton>
          </div>
        </GlassCard>
      </section>

      <footer className="border-t border-white/5 bg-surface/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-center text-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {data.basics.name}. Built with Next.js · Tailwind · Framer Motion.</p>
          <div className="flex justify-center gap-4 text-xs uppercase tracking-wide text-text-muted">
            <span>SharePoint · Automation · React</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
