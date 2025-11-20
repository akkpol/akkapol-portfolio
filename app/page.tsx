 "use client";

import { HeroSection } from "@/components/sections/Hero";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { resumeContent } from "@/data/resumeContent";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, MapPin, Phone } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/PrimaryButton";

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen">
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <CertificationsSection />
      <EducationSection />

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
              <a href="mailto:akkapol.kumpapug@gmail.com" className="flex items-center gap-2 text-text-primary">
                <Mail size={16} />
                {resumeContent.basics.email}
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Phone / LINE</p>
              <p className="flex items-center gap-2 text-text-primary">
                <Phone size={16} />
                {resumeContent.basics.phone} · Line: {resumeContent.basics.line}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Location</p>
              <p className="flex items-center gap-2 text-text-primary">
                <MapPin size={16} />
                {resumeContent.basics.location}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <PrimaryButton href={resumeContent.basics.portfolio}>View Portfolio</PrimaryButton>
            <SecondaryButton href={resumeContent.basics.linkedin}>LinkedIn</SecondaryButton>
            <SecondaryButton href={resumeContent.basics.github}>GitHub</SecondaryButton>
          </div>
        </GlassCard>
      </section>

      <footer className="border-t border-white/5 bg-surface/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-center text-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Akkapol Kumpapug. Built with Next.js · Tailwind · Framer Motion.</p>
          <div className="flex justify-center gap-4 text-xs uppercase tracking-wide text-text-muted">
            <span>SharePoint · Automation · React</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
