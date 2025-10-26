// Next.js Profile Page powered by LinkedIn Resume (Auto-filled from PDF)
'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin } from 'lucide-react';
import { linkedInData } from '@/data/profile';
import ProfileImage from '@/components/ProfileImage';
import ExperienceCard from '@/components/ExperienceCard';
import SkillCard from '@/components/SkillCard';
import CertificationCard from '@/components/CertificationCard';
import ThemeToggle from '@/components/ThemeToggle';
import { validateProfileData } from '@/utils/validation';

export default function ProfilePage() {
  const [dark, setDark] = useState(false);
  const [bannerUrl, setBannerUrl] = useState('/Evan Watzon.png');
  const [isValid, setIsValid] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Validate profile data on mount
  useEffect(() => {
    try {
      const valid = validateProfileData(linkedInData);
      setIsValid(valid);
      if (!valid) {
        console.error('Profile data validation failed');
      }
    } catch (error) {
      console.error('Error validating profile data:', error);
      setIsValid(false);
    }
  }, []);

  useEffect(() => {
    const test = new Image();
    test.src = '/Evan Watzon.png';
    test.onload = () => setBannerUrl('/Evan Watzon.png');
    test.onerror = () => setBannerUrl('/banner.png');
  }, []);

  // Early return if data is invalid
  if (!isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Invalid Profile Data
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please check the console for validation errors
          </p>
        </div>
      </div>
    );
  }

  const b = linkedInData.basics;

  let ticking = false;
  function onMouseMove(e: React.MouseEvent) {
    try {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        try {
          const el = cardRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rx = (y / rect.height) * -6;
            const ry = (x / rect.width) * 6;
            el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
          }
        } catch (error) {
          console.error('Error in mouse move animation:', error);
        } finally {
          ticking = false;
        }
      });
    } catch (error) {
      console.error('Error in onMouseMove:', error);
    }
  }

  function onMouseLeave() {
    try {
      const el = cardRef.current;
      if (!el) return;
      el.style.transform = 'rotateX(0deg) rotateY(0deg)';
    } catch (error) {
      console.error('Error in onMouseLeave:', error);
    }
  }

  return (
    <main className={(dark ? 'dark ' : '') + 'min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 transition-colors duration-300'}>
      <header className="sticky top-0 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 z-10">
        <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight gradient-text">{b.name}</a>
          <div className="flex items-center gap-4 text-sm">
            <a className="hover:underline" href="#experience">Experience</a>
            <a className="hover:underline" href="#skills">Skills</a>
            <a className="hover:underline" href="#certs">Certifications</a>
            <ThemeToggle dark={dark} onToggle={() => setDark(!dark)} />
          </div>
        </nav>
      </header>

      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-purple-900/10 dark:to-gray-950" />

        <div className="max-w-6xl mx-auto px-6 pt-12 pb-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid md:grid-cols-[280px,1fr] gap-8 items-center">
            <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="[perspective:1000px]">
              <div ref={cardRef} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl p-3 transition-transform will-change-transform">
                <ProfileImage src="/profile.jpg" alt={b.name} />
                <div className="mt-3 text-center text-sm gradient-text-blue font-semibold">Ready to ship 🚀</div>
              </div>
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight gradient-text-blue">{b.headline}</h1>
              <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">{b.about}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {b.keywords.map((k, i) => (
                  <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {k}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow text-gray-700 dark:text-gray-300" href={`mailto:${b.email}`}>
                  <Mail size={16} />Contact
                </a>
                <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow text-gray-700 dark:text-gray-300" href={b.socials.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={16} />LinkedIn
                </a>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                  <MapPin size={16} />{b.location}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="mt-10 overflow-hidden whitespace-nowrap border-y py-2 text-sm">
            <div className="inline-block animate-[marquee_18s_linear_infinite]">
              {[...Array(2)].map((_, loop) => (
                <span key={loop} className="mr-10">
                  <span className="mx-3">⚡ React</span>
                  <span className="mx-3">Next.js</span>
                  <span className="mx-3">SharePoint</span>
                  <span className="mx-3">C#</span>
                  <span className="mx-3">.NET</span>
                  <span className="mx-3">Power BI</span>
                  <span className="mx-3">Power Automate</span>
                  <span className="mx-3">SCADA</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 gradient-text">Experience</h2>
        {linkedInData.experience.map((exp, i) => (
          <ExperienceCard key={i} experience={exp} index={i} />
        ))}
      </section>

      <section id="skills" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 gradient-text-purple">Skills</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {linkedInData.skills.map((s, i) => (
            <SkillCard key={i} skill={s} index={i} />
          ))}
        </div>
      </section>

      <section id="certs" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 gradient-text-teal">Certifications</h2>
        {linkedInData.certifications.map((c, i) => (
          <CertificationCard key={i} certification={c} index={i} />
        ))}
      </section>

      <footer className="border-t border-gray-200 dark:border-gray-800 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} {b.name}. Built with Next.js · Tailwind · Framer Motion.</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </main>
  );
}
