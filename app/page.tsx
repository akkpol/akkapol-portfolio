// Next.js Profile Page powered by LinkedIn Resume (Auto-filled from PDF)
'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Linkedin, Menu, X } from 'lucide-react';
import { linkedInData as defaultData } from '@/data/profile';
import ProfileImage from '@/components/ProfileImage';
import ExperienceCard from '@/components/ExperienceCard';
import SkillCard from '@/components/SkillCard';
import CertificationCard from '@/components/CertificationCard';
import ThemeToggle from '@/components/ThemeToggle';
import BugHunt from '@/components/BugHunt';
import TrumpRunner from '@/components/TrumpRunner';
import { validateProfileData } from '@/utils/validation';
import AuthButton from '@/components/AuthButton';
import { LinkedInData } from '@/types';

export default function ProfilePage() {
  const [isValid, setIsValid] = useState(true); // Assume valid until checked
  const [showGame, setShowGame] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [linkedInData, setLinkedInData] = useState<LinkedInData>(defaultData);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handlers must be declared before any conditional returns
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    let ticking = false;
    if (ticking) return;

    ticking = true;
    requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) {
        ticking = false;
        return;
      }
      try {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rx = (y / rect.height) * -6;
        const ry = (x / rect.width) * 6;
        el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      } catch (error) {
        console.error('Error in mouse move animation:', error);
      } finally {
        ticking = false;
      }
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    try {
      const el = cardRef.current;
      if (!el) return;
      el.style.transform = 'rotateX(0deg) rotateY(0deg)';
    } catch (error) {
      console.error('Error in onMouseLeave:', error);
    }
  }, []);

  // Fetch profile data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setLinkedInData(data);
          const valid = validateProfileData(data);
          setIsValid(valid);
        } else {
          // Fallback to default data
          const valid = validateProfileData(defaultData);
          setIsValid(valid);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Fallback to default data
        const valid = validateProfileData(defaultData);
        setIsValid(valid);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

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

  return (
    <main className="min-h-screen">
      {showGame && <BugHunt onClose={() => setShowGame(false)} />}
      
      <header className="sticky top-0 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 z-10">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight gradient-text text-base sm:text-lg">{b.name}</a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            <a className="hover:underline" href="#experience">Experience</a>
            <a className="hover:underline" href="#skills">Skills</a>
            <a className="hover:underline" href="#certs">Certifications</a>
            <ThemeToggle />
            <AuthButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <AuthButton />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow transition-shadow"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3 border-t border-gray-200 dark:border-gray-800">
                <a 
                  className="block hover:underline text-sm" 
                  href="#experience"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Experience
                </a>
                <a 
                  className="block hover:underline text-sm" 
                  href="#skills"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Skills
                </a>
                <a 
                  className="block hover:underline text-sm" 
                  href="#certs"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Certifications
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-purple-900/10 dark:to-gray-950" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid md:grid-cols-[280px,1fr] gap-6 sm:gap-8 items-center">
            <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="[perspective:1000px] w-[200px] sm:w-full mx-auto md:mx-0">
              <div ref={cardRef} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl p-3 transition-transform will-change-transform">
                <ProfileImage src="/profile.jpg" alt={b.name} />
              </div>
            </div>

            <div className="text-center md:text-left mt-4 md:mt-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight gradient-text-blue leading-tight">{b.headline}</h1>
              <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{b.about}</p>
              <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-2">
                {b.keywords.map((k) => (
                  <span key={k} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {k}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 text-sm">
                <a className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow text-gray-700 dark:text-gray-300" href={`mailto:${b.email}`}>
                  <Mail size={16} /><span>Contact</span>
                </a>
                <a className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow text-gray-700 dark:text-gray-300" href={b.socials.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={16} /><span>LinkedIn</span>
                </a>
                <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                  <MapPin size={16} /><span className="text-xs sm:text-sm">{b.location}</span>
                </span>
              </div>
            </div>
          </motion.div>

          <div className="mt-10 overflow-hidden whitespace-nowrap border-y py-2 text-xs sm:text-sm">
            <div className="inline-block animate-[marquee_18s_linear_infinite]">
              {[...Array(2)].map((_, loop) => (
                <span key={loop} className="mr-10" aria-hidden={loop > 0}>
                  {linkedInData.skills.map((skill) => (
                    <span key={skill.name} className="mx-3">{skill.name}</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Game Section */}
      {/* <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 gradient-text-purple">Play Mini Game</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">President Trump</p>
        </div>
        <TrumpRunner />
      </section> */}

      <section id="experience" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-2xl font-bold mb-6 gradient-text">Experience</h2>
        {linkedInData.experience.map((exp, i) => (
          <ExperienceCard key={exp.company + exp.startDate} experience={exp} index={i} />
        ))}
      </section>

      <section id="skills" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-2xl font-bold mb-6 gradient-text-purple">Skills</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {linkedInData.skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </section>

      <section id="certs" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-2xl font-bold mb-6 gradient-text-teal">Certifications</h2>
        {linkedInData.certifications.map((cert, i) => (
          <CertificationCard key={cert.name} certification={cert} index={i} />
        ))}
      </section>

      <footer className="border-t border-gray-200 dark:border-gray-800 mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {b.name}. Built with Next.js · Tailwind · Framer Motion.</p>
        </div>
      </footer>
    </main>
  );
}
