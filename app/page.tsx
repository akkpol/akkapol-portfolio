"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import ThreeFaceCanvas to avoid SSR issues with window/document
const ThreeFaceCanvas = dynamic(() => import("@/components/ui/ThreeFaceCanvas"), {
  ssr: false,
});

// Dynamically import InteractiveAIConsultant
const InteractiveAIConsultant = dynamic(() => import("@/components/ui/InteractiveAIConsultant"), {
  ssr: false,
});

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

interface ServiceSectionProps {
  title: string;
  description: string;
  color: string;
  accentColor: string;
  index: number;
}

function ServiceSection({ title, description, color, accentColor, index }: ServiceSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      id={`service-${index}`}
      className="snap-start h-screen flex flex-col justify-center items-center relative overflow-hidden px-8"
      style={{ opacity }}
    >
      {/* Background Parallax Layer */}
      <motion.div
        className={`absolute inset-0 z-0 opacity-10 blur-[100px] rounded-full ${accentColor}`}
        style={{ y: y1 }}
      />

      {/* Floating Background Icon/Graphic */}
      <motion.div
        className="absolute top-1/4 right-1/4 text-[20rem] font-display font-bold opacity-[0.03] z-0 select-none hidden md:block"
        style={{ y: y2 }}
      >
        0{index}
      </motion.div>

      <div className="relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className={`text-sm font-bold uppercase tracking-[0.3em] mb-4 block ${color}`}>
            Service 0{index}
          </span>
          <h3 className={`text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter ${color} drop-shadow-sm`}>
            {title}
          </h3>
          <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
            {description}
          </p>

          <div className="mt-16 flex justify-center gap-6">
            <Link
              href="mailto:akkapol.kumpapug@gmail.com"
              className={`px-10 py-4 rounded-full font-bold text-lg border-2 transition-all hover:scale-105 active:scale-95 ${color} border-current hover:bg-foreground hover:text-background`}
            >
              Consult Now
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function ServiceNavigation() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('header, section[id^="service-"], #service-intro, #service-footer, footer');
      let current = 0;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          current = index;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <button
          key={i}
          className={`w-3 h-3 rounded-full transition-all duration-500 ${activeSection === i
              ? "bg-primary scale-150 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
              : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
          onClick={() => {
            const sections = document.querySelectorAll('header, #service-intro, section[id^="service-"], #service-footer, footer');
            sections[i]?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("snap-y", "snap-mandatory", "scroll-smooth");
    return () => {
      document.documentElement.classList.remove("snap-y", "snap-mandatory", "scroll-smooth");
    };
  }, []);

  return (
    <>
      <ThreeFaceCanvas />

      <ServiceNavigation />

      <main ref={containerRef} className="text-foreground selection:bg-primary/20 font-body">

        {/* Header / Intro - Snap Start */}
        <motion.header
          className="snap-start relative h-screen flex flex-col items-center justify-center text-center px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <div className="pointer-events-auto max-w-4xl z-10">
            {/* Brand Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-background/80 md:bg-white/80 dark:md:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm mb-6 border border-border"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" className="text-primary" />
              </svg>
              <span className="text-sm font-bold tracking-wider text-muted-foreground uppercase">AI-Assisted Problem Solver</span>
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-display font-extrabold tracking-tighter mb-8 bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
              Transforming <br />
              <span className="bg-gradient-to-r from-primary via-accent-purple to-destructive bg-clip-text text-transparent animate-gradient-x">Business with AI</span>
            </h1>

            <p className="text-xl md:text-3xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto mb-10">
              ออกแบบระบบอัตโนมัติและวางสถาปัตยกรรม IT <br className="hidden md:block" />
              เพื่อช่วยให้ธุรกิจของคุณเติบโตอย่างก้าวกระโดดในยุคดิจิทัล
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="mailto:akkapol.kumpapug@gmail.com" className="bg-foreground text-background font-bold text-xl px-10 py-4 rounded-full shadow-xl hover:bg-foreground/90 transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95">
                Contact for Consultation
              </Link>
              <Link href="/cv" className="text-foreground font-semibold text-lg px-8 py-3 rounded-full border-2 border-border hover:bg-muted/50 transition-all">
                View Profile
              </Link>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
            <div className="w-1 h-12 bg-gradient-to-b from-primary to-transparent rounded-full" />
          </div>
        </motion.header>

        {/* Services Introduction - Snap Start */}
        <motion.section
          id="service-intro"
          className="snap-start h-screen flex flex-col justify-center items-center text-center p-8 md:p-20 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={revealVariants}
        >
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-8 text-foreground">
              Our <span className="bg-gradient-to-r from-primary via-accent-purple to-destructive bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="max-w-3xl text-2xl md:text-4xl text-muted-foreground leading-relaxed font-medium">
              ยกระดับธุรกิจของคุณด้วยเทคโนโลยี AI และ Automation ที่ออกแบบมาเพื่อแก้ปัญหาจริง และเพิ่มประสิทธิภาพการทำงานอย่างยั่งยืน
            </p>
            <div className="mt-16">
              <span className="text-primary text-sm font-bold uppercase tracking-[0.5em] animate-pulse">Scroll to Explore</span>
            </div>
          </div>
        </motion.section>

        {/* Service Sections */}
        <ServiceSection
          title="AI Automation & Consultant"
          description="รับให้คำปรึกษาและออกแบบระบบอัตโนมัติ (Business Automation) ด้วย AI เพื่อลดขั้นตอนการทำงานที่ซ้ำซ้อน และเพิ่มขีดความสามารถในการแข่งขันให้ธุรกิจของคุณ"
          color="text-primary"
          accentColor="bg-primary/10"
          index={1}
        />

        <ServiceSection
          title="System Design & Web Development"
          description="ออกแบบสถาปัตยกรรมระบบและวางโครงสร้าง IT ที่ยั่งยืน พร้อมพัฒนา Web Application สมัยใหม่ที่ตอบโจทย์การใช้งานจริงและรองรับการขยายตัวในอนาคต"
          color="text-accent-purple"
          accentColor="bg-accent-purple/10"
          index={2}
        />

        <ServiceSection
          title="AI Chatbot Solutions"
          description="พัฒนาระบบตอบคำถามอัตโนมัติอัจฉริยะ (Chatbot) ที่เชื่อมต่อกับฐานข้อมูลและ AI เพื่อให้บริการลูกค้าได้ตลอด 24 ชั่วโมง อย่างแม่นยำและเป็นธรรมชาติ"
          color="text-destructive"
          accentColor="bg-destructive/10"
          index={3}
        />

        <ServiceSection
          title="LINE Mini App & LIFF"
          description="พัฒนา LINE MINI App, LIFF App และ Messaging API เชื่อมต่อกับ LINE OA เพื่อสร้างประสบการณ์การใช้งานที่ไร้รอยต่อให้กับลูกค้าบนแอปพลิเคชัน LINE"
          color="text-foreground"
          accentColor="bg-foreground/5"
          index={4}
        />

        {/* Integrator Identity Section */}
        <motion.section
          id="service-footer"
          className="snap-start h-screen flex flex-col justify-center p-8 md:p-20 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={revealVariants}
        >
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <p className="text-3xl md:text-5xl text-muted-foreground leading-tight mb-16 font-medium">
              ผมคือ <strong className="text-foreground">IT & Tech Integrator</strong> ผู้เชี่ยวชาญด้านการประยุกต์ใช้ AI Agent ภายใต้การดำเนินงานของ <strong className="text-foreground">AK3 Studio</strong>
            </p>

            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center gap-4 bg-muted/30 px-8 py-4 rounded-full border border-border backdrop-blur-sm">
                <span className="flex h-4 w-4 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                </span>
                <span className="text-xl md:text-2xl font-bold text-primary">
                  พร้อมให้คำปรึกษาและดูหน้างานจริง
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Final CTA / Footer */}
        <motion.footer
          className="snap-start h-screen flex flex-col justify-center items-center text-center p-8 bg-foreground text-background relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={revealVariants}
        >
          <h2 className="text-6xl md:text-9xl font-display font-extrabold tracking-tighter mb-10">
            Ready for <br />
            <span className="text-primary">Liftoff?</span>
          </h2>
          <p className="text-2xl md:text-4xl mb-16 font-medium opacity-80">พร้อมที่จะนำระบบ AI และ Automation เข้ามาปรับปรุงธุรกิจของคุณหรือยัง?</p>

          <Link href="mailto:akkapol.kumpapug@gmail.com" className="inline-block bg-primary text-foreground font-bold text-2xl px-14 py-6 rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95">
            Contact Me
          </Link>

          <div className="mt-20 flex flex-col md:flex-row items-center gap-12 text-xl font-bold">
            <p className="flex items-center gap-3">
              <span className="text-3xl">📞</span> 096-119-5161
            </p>
            <Link href="https://www.linkedin.com/in/akkapol-kumpapug" target="_blank" className="hover:text-primary transition-colors border-b-2 border-current pb-1">
              LinkedIn Profile ↗
            </Link>
          </div>
        </motion.footer>

        {/* Interactive AI Consultant (Phase 3) - Temporarily hidden for UI focus */}
        {/* 
        <motion.section
          id="ai-consultant"
          className="py-16 bg-background/50 backdrop-blur-md border-t border-border"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={revealVariants}
        >
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6 text-foreground">
              Interactive <span className="bg-gradient-to-r from-primary via-accent-purple to-destructive bg-clip-text text-transparent">AI Consultant</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">สัมผัสกระบวนการให้คำปรึกษาจาก AK3 Assistant (ขับเคลื่อนด้วย Gemini 2.0) ลองสอบถามบริการ วางแผนงาน หรือโซลูชันธุรกิจได้เลยครับ</p>
            <InteractiveAIConsultant />
          </div>
        </motion.section>
        */}

      </main>

      {/* SVG Definitions for Logo Gradients */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="paint0_linear" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4285F4" />
            <stop offset="0.5" stopColor="#A142F4" />
            <stop offset="1" stopColor="#EA4335" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}
