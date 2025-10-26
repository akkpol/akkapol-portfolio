// Next.js Profile Page powered by LinkedIn Resume (Auto-filled from PDF)
'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Award, Briefcase, CalendarDays } from 'lucide-react';

const linkedInData = {
  basics: {
    name: 'Akkapol Kumpapug',
    headline: 'IT Developer | JS, React, Next.js, C#, .NET | SharePoint',
    about:
      'Information Technology Developer with a strong focus on problem-solving and creative solutions. Experienced in SharePoint Administration, Frontend Development (React, Vue, Next.js), and Data Analysis (Power BI, Power Automate). Passionate about learning new technologies and applying them in innovative ways to deliver value.',
    location: 'Nonthaburi, Thailand',
    email: 'akkapol.kumpapug@gmail.com',
    socials: {
      linkedin: 'https://www.linkedin.com/in/akkapol-kumpapug',
    },
    keywords: ['SharePoint', 'JavaScript', 'React', 'Next.js', 'C#', '.NET', 'Power BI', 'Power Automate', 'SCADA']
  },
  experience: [
    {
      company: 'C.C.S. ADVANCE TECH. CO., LTD.',
      title: 'Information Technology Software Developer',
      startDate: '2023-11',
      endDate: 'Present',
      location: 'Nonthaburi, Thailand',
      highlights: [
        'Developed and maintained internal systems using SharePoint On-Premise.',
        'Enhanced automation workflows using Power Automate and Power BI dashboards.',
        'Collaborated on frontend projects using React and Next.js frameworks.'
      ],
    },
  ],
  skills: [
    { name: 'SharePoint', level: 90 },
    { name: 'JavaScript / React / Next.js', level: 85 },
    { name: 'C# / .NET', level: 80 },
    { name: 'Python', level: 70 },
    { name: 'Power BI', level: 75 },
    { name: 'SCADA', level: 60 }
  ],
  certifications: [
    { name: 'Fullstack JavaScript Web Development', issuer: 'LinkedIn Learning', year: '2024' },
    { name: 'Development of SCADA Systems for Production Processes', issuer: 'Training Program', year: '2024' },
    { name: 'Data Analysis with Power BI', issuer: 'Microsoft Learn', year: '2024' }
  ],
  education: [
    {
      institution: 'Chandrakasem Rajabhat University',
      degree: "Bachelor's Degree in Computer Science",
      startDate: '2008',
      endDate: '2014'
    }
  ]
};

function formatDate(isoMonth) {
  if (!isoMonth) return '';
  if (typeof isoMonth === 'string' && isoMonth.toLowerCase() === 'present') return 'Present';
  const parts = String(isoMonth).split('-');
  if (parts.length < 2) return String(isoMonth);
  const [y, m] = parts;
  const d = new Date(Number(y), Number(m) - 1 || 0, 1);
  return isNaN(d.getTime()) ? String(isoMonth) : d.toLocaleString('en-US', { month: 'short', year: 'numeric' });
}

function Progress({ value }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-gray-900" style={{ width: `${v}%` }} />
    </div>
  );
}

function ProfileImage({ src, alt }) {
  const [error, setError] = useState(false);
  return (
    <img
      src={error ? 'https://via.placeholder.com/560x560?text=Profile' : src}
      alt={alt}
      onError={() => setError(true)}
      className="w-full aspect-square object-cover rounded-xl"
    />
  );
}

export default function ProfilePage() {
  const b = linkedInData.basics;
  const [dark, setDark] = useState(false);
  const [bannerUrl, setBannerUrl] = useState('/Evan Watzon.png');

  const cardRef = useRef(null);

  useEffect(() => {
    const test = new Image();
    test.src = '/Evan Watzon.png';
    test.onload = () => setBannerUrl('/Evan Watzon.png');
    test.onerror = () => setBannerUrl('/banner.png');
  }, []);

  let ticking = false;
  function onMouseMove(e) {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const el = cardRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rx = (y / rect.height) * -6;
        const ry = (x / rect.width) * 6;
        el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
      ticking = false;
    });
  }

  function onMouseLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }

  return (
    <main className={(dark ? 'dark ' : '') + 'min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 dark:from-gray-900 dark:to-gray-950 dark:text-gray-50'}>
      <header className="sticky top-0 backdrop-blur bg-white/70 dark:bg-black/30 border-b z-10">
        <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight">{b.name}</a>
          <div className="flex items-center gap-4 text-sm">
            <a className="hover:underline" href="#experience">Experience</a>
            <a className="hover:underline" href="#skills">Skills</a>
            <a className="hover:underline" href="#certs">Certifications</a>
            <button onClick={() => setDark(!dark)} className="px-3 py-1 rounded-full border hover:shadow">
              {dark ? 'Light' : 'Dark'}
            </button>
          </div>
        </nav>
      </header>

      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/70 to-white via-white/60 dark:from-gray-900/70 dark:via-gray-900/60 dark:to-gray-950" />
        <div className="absolute inset-0 -z-20 bg-no-repeat bg-cover bg-center opacity-80 dark:opacity-60" style={{ backgroundImage: `url('${bannerUrl}')` }} />

        <div className="max-w-6xl mx-auto px-6 pt-12 pb-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid md:grid-cols-[280px,1fr] gap-8 items-center">
            <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="[perspective:1000px]">
              <div ref={cardRef} className="rounded-2xl border bg-white/70 dark:bg-white/10 shadow-xl p-3 transition-transform will-change-transform">
                <ProfileImage src="/profile.jpg" alt={b.name} />
                <div className="mt-3 text-center text-sm text-gray-700 dark:text-gray-200">Ready to ship 🚀</div>
              </div>
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">{b.headline}</h1>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">{b.about}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {linkedInData.basics.keywords.map((k, i) => (
                  <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs border bg-white/70 dark:bg-white/5">
                    {k}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full border hover:shadow" href={`mailto:${b.email}`}><Mail size={16} />Contact</a>
                <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full border hover:shadow" href={b.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn</a>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"><MapPin size={16} />{b.location}</span>
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
        <h2 className="text-2xl font-bold mb-6">Experience</h2>
        {linkedInData.experience.map((exp, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="mb-6 border rounded-2xl p-5 bg-white/70 dark:bg-white/5">
            <h3 className="font-semibold flex items-center gap-2"><Briefcase size={18} />{exp.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{exp.company}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
              <CalendarDays size={14} /> {formatDate(exp.startDate)} — {formatDate(exp.endDate)} · {exp.location}
            </p>
            <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 dark:text-gray-200 space-y-1">
              {exp.highlights.map((h, idx) => <li key={idx}>{h}</li>)}
            </ul>
          </motion.div>
        ))}
      </section>

      <section id="skills" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {linkedInData.skills.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }} className="rounded-2xl border p-5 bg-white/70 dark:bg-white/5">
              <div className="flex justify-between text-sm font-medium">
                <span>{s.name}</span>
                <span>{s.level}%</span>
              </div>
              <div className="mt-3 w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gray-900 dark:bg-gray-100" style={{ width: `${Math.max(0, Math.min(100, Number(s.level) || 0))}%` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="certs" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Certifications</h2>
        {linkedInData.certifications.map((c, i) => (
          <motion.div key={i} initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 120 }} className="flex items-center gap-3 border rounded-2xl p-4 bg-white/70 dark:bg-white/5 mb-3">
            <Award size={18} />
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{c.issuer} · {c.year}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <footer className="border-t mt-10">
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
