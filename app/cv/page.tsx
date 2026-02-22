"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, FileText, ArrowLeft, Linkedin, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

const cvMarkdown = `# AKKAPOL KUMPAPUG
**AI Solutions Architect | Tech Integrator | Business Operations Optimizer**

**Location:** Nonthaburi, Thailand
**Phone:** 096-119-5161
**Email:** akkapol.kumpapug@gmail.com
**LinkedIn:** linkedin.com/in/akkapol-kumpapug
**Portfolio:** akkapol-portfolio.vercel.app

## EXECUTIVE SUMMARY
AI & Tech Integrator specializing in bringing Enterprise-grade automation and AI Agents to SMEs. As an independent consultant, I focus on building intelligent workflows that elevate decision-making and drive operational efficiency. Rather than simply writing code to spec, I act as a strategic reasoning partner—clarifying complex business challenges and translating them into practical, scalable tech solutions. Grounded in a unique blend of real-world systems execution, software engineering, and business operations, I bridge the gap between cutting-edge AI technology and sound human judgment to deliver measurable, long-term business value.

## TECHNICAL & STRATEGIC SKILLS
- **AI & Automation Stack:** AI Agents & LLM Integration, Private AI / Local LLM Deployment, Prompt Engineering, AI-Assisted IDEs (Cursor), Workflow Automation (n8n/Make concepts), Google AI Ecosystem
- **Enterprise Platforms:** Power Platform (Power Automate, Power Apps), SharePoint 2019 (On-Premise), SharePoint Designer
- **Frontend Development:** React, Next.js, JavaScript, TypeScript, jQuery, HTML/CSS, Tailwind, Bootstrap, Material UI, Ant Design
- **Backend & Data:** C#, .NET Framework, SQL Server, REST APIs, System Integration
- **Design & Tools:** UX/UI Design, Figma, Git, Visual Communication

## PROFESSIONAL EXPERIENCE

### Independent AI Solutions Architect
**Freelance Consultant | Nov 2023 – Present**
- Act as a strategic reasoning partner for businesses, utilizing AI and systems thinking to clarify ambiguous problems and test operational assumptions.
- Design and deploy Private AI infrastructures (Local LLMs & Open-source models) for organizations requiring strict data privacy and secure internal workflows.
- Design and implement intelligent workflows and automation systems that optimize decision quality and reduce manual overhead.
- Translate complex data and business insights into clear, practical technical directions grounded in realistic execution capabilities.
- Continuously research and integrate modern AI-assisted workflows (e.g., Cursor, Google AI ecosystem, LLM-based agents) to deliver high-value tech solutions for SMEs.

### Systems Integrator / SharePoint & Power Platform Developer
**C.C.S. Advance Tech Co., Ltd. | Nov 2022 – Nov 2025**
- Architected and maintained robust enterprise systems on SharePoint 2019 On-Premise, supporting cross-functional departmental needs.
- Designed automated workflows using Power Automate, effectively eliminating manual data entry bottlenecks and significantly accelerating process approval times.
- Built intuitive custom forms and modern user interfaces (using JavaScript, jQuery, HTML, CSS) tailored to specific user experiences.
- Successfully integrated legacy database systems with modern SharePoint lists, transforming fragmented business requirements into scalable digital tools.

### Front-End Web Developer
**Absolute Solution Co., Ltd. | Nov 2021 – Jul 2022**
- Developed dynamic, responsive user interfaces using React, Next.js, Ant Design, and Material UI, enhancing overall user engagement.
- Integrated complex REST APIs to support real-time data operations, ensuring seamless communication between front-end and backend architectures.
- Collaborated effectively within Agile workflows alongside designers and backend developers to deliver features on schedule.

### Operations Manager
**Frozen Restaurant | Oct 2018 – Dec 2020**
- Managed end-to-end daily operations, staff coordination, and resource planning.
- Gained hands-on executive experience in decision-making under real operational constraints, deeply informing currently approach to practical tech solutions.

### Junior .NET Developer
**Auction Trade Co., Ltd. | Oct 2015 – Feb 2018**
- Developed and maintained internal enterprise systems utilizing C#, .NET Framework, and SQL Server.
- Proactively identified and resolved critical bugs, optimized legacy code, and improved overall system stability and performance.

### Graphic Designer
**Manta Performing Arts | Dec 2013 – Dec 2014**
- Created visual assets, branding materials, and stage graphics.
- Built a strong foundation in creative thinking, visual communication, and user-centric design principles.

## EDUCATION & CERTIFICATIONS
- Data Analysis with Power BI — AskMe Solutions (2024 – Present)
- Development of SCADA Systems for Production Processes — Rajamangala University of Technology Phra Nakhon (2024 – Present)
- Full-Stack JavaScript Web Development (CodeCamp #9) — Software Park Thailand (2021)
- Undergraduate Coursework (Computer Science/IT) — Chandrakasem Rajabhat University (2013)
- Vocational Certificate in Electrical & Electronics — Tak Technical College (2010)

## PROFESSIONAL STRENGTHS
- **Research-Driven Analysis:** Ability to break down complex, ambiguous situations into structured, solvable components.
- **Cross-Disciplinary Communication:** Fluent in translating highly technical concepts for non-technical stakeholders (and vice versa).
- **Pragmatic Execution:** Designing solutions that are not just technologically advanced, but highly usable and informed by real-world operational constraints.
`;

export default function CVPage() {
    const [copied, setCopied] = useState(false);
    const [viewMarkdown, setViewMarkdown] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(cvMarkdown);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <main className="min-h-screen pt-28 pb-32 px-6 bg-slate-50/50 dark:bg-black">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm font-medium"
                >
                    <ArrowLeft size={16} /> กลับหน้าหลัก
                </Link>

                {/* Header and Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-background/50 border border-border/50 p-6 rounded-3xl backdrop-blur-sm shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                    <div>
                        <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Curriculum Vitae</h1>
                        <p className="text-muted-foreground mt-1">รายละเอียดประวัติการทำงานและทักษะ (อัปเดตล่าสุด)</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={handleCopy}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full text-sm font-semibold transition-all shadow-sm active:scale-95"
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                {copied ? (
                                    <motion.div
                                        key="check"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                    >
                                        <Check size={16} className="text-green-500" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="copy"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                    >
                                        <Copy size={16} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {copied ? "Copied!" : "Copy for LLM"}
                        </button>
                        <button
                            onClick={() => setViewMarkdown(!viewMarkdown)}
                            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm active:scale-95 ${viewMarkdown ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-background border border-border text-foreground hover:bg-muted"}`}
                        >
                            <FileText size={16} />
                            {viewMarkdown ? "View Rendered CV" : "View as Markdown"}
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="bg-white dark:bg-zinc-950 border border-border/50 rounded-[2rem] p-8 md:p-12 shadow-xl relative overflow-hidden ring-1 ring-black/5 dark:ring-white/5">

                    <AnimatePresence mode="wait">
                        {viewMarkdown ? (
                            <motion.div
                                key="markdown"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="relative"
                            >
                                <div className="absolute top-0 right-0 p-2 text-xs font-mono text-muted-foreground bg-muted/50 rounded-bl-xl border-l border-b border-border/50">
                                    raw-markdown.md
                                </div>
                                <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap leading-relaxed overflow-x-auto p-4 bg-muted/30 rounded-xl border border-border/30 mt-4 selection:bg-primary/20">
                                    {cvMarkdown}
                                </pre>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="rendered"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="prose prose-slate dark:prose-invert max-w-none 
                                prose-headings:font-display prose-headings:tracking-tight 
                                prose-h1:text-4xl prose-h1:mb-2 prose-h1:bg-gradient-to-r prose-h1:from-primary prose-h1:to-accent-purple prose-h1:bg-clip-text prose-h1:text-transparent
                                prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-4 prose-h2:mt-12 prose-h2:text-2xl prose-h2:font-bold
                                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-2
                                prose-a:text-primary hover:prose-a:text-primary/80 prose-a:transition-colors
                                prose-strong:text-foreground
                                prose-li:marker:text-primary"
                            >
                                <header className="mb-12">
                                    <h1 className="mb-0">Akkapol Kumpapug</h1>
                                    <p className="text-xl md:text-2xl font-medium text-muted-foreground mt-2">
                                        AI Solutions Architect | Tech Integrator | Business Operations Optimizer
                                    </p>

                                    <div className="flex flex-wrap gap-y-4 gap-x-8 mt-8 text-sm md:text-base">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin size={18} className="text-primary" /> Nonthaburi, Thailand
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Phone size={18} className="text-primary" /> 096-119-5161
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Mail size={18} className="text-primary" /> akkapol.kumpapug@gmail.com
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Linkedin size={18} className="text-primary" />
                                            <a href="https://linkedin.com/in/akkapol-kumpapug" target="_blank" rel="noreferrer">LinkedIn Profile</a>
                                        </div>
                                    </div>
                                </header>

                                <h2>Executive Summary</h2>
                                <p className="text-lg leading-relaxed text-muted-foreground italic border-l-4 border-primary/30 pl-6 my-6">
                                    AI & Tech Integrator specializing in bringing Enterprise-grade automation and AI Agents to SMEs.
                                    I act as a strategic reasoning partner—clarifying complex business challenges and translating
                                    them into practical, scalable tech solutions.
                                </p>

                                <h2>Professional Experience</h2>
                                <div className="space-y-12">
                                    {/* Freelance */}
                                    <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-transparent">
                                        <div className="absolute left-[-4px] top-2 w-2.5 h-2.5 rounded-full bg-primary" />
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                                            <h3 className="m-0">Independent AI Solutions Architect</h3>
                                            <span className="text-sm font-bold text-primary uppercase tracking-wider">Nov 2023 – Present</span>
                                        </div>
                                        <p className="font-semibold text-muted-foreground mb-4">Freelance Consultant | Nonthaburi</p>
                                        <ul>
                                            <li>Act as a strategic reasoning partner for businesses, utilizing AI and systems thinking to clarify ambiguous problems.</li>
                                            <li>Design and deploy Private AI infrastructures (Local LLMs) for organizations requiring strict data privacy.</li>
                                            <li>Design and implement intelligent workflows and automation systems that optimize decision quality.</li>
                                            <li>Translate complex data and business insights into practical technical directions.</li>
                                        </ul>
                                    </div>

                                    {/* C.C.S. */}
                                    <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-slate-400 before:to-transparent">
                                        <div className="absolute left-[-4px] top-2 w-2.5 h-2.5 rounded-full bg-slate-400" />
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                                            <h3 className="m-0">Systems Integrator / SharePoint & Power Platform Developer</h3>
                                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Nov 2022 – Nov 2025</span>
                                        </div>
                                        <p className="font-semibold text-muted-foreground mb-4">C.C.S. Advance Tech Co., Ltd. | Nonthaburi</p>
                                        <ul>
                                            <li>Architected and maintained robust enterprise systems on SharePoint 2019 On-Premise.</li>
                                            <li>Designed automated workflows using Power Automate, eliminating manual data entry bottlenecks.</li>
                                            <li>Built intuitive custom forms and modern user interfaces using JavaScript, jQuery, HTML, CSS.</li>
                                            <li>Integrated legacy database systems with modern SharePoint lists.</li>
                                        </ul>
                                    </div>

                                    {/* Absolute Solution */}
                                    <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-slate-400 before:to-transparent">
                                        <div className="absolute left-[-4px] top-2 w-2.5 h-2.5 rounded-full bg-slate-400" />
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                                            <h3 className="m-0">Front-End Web Developer</h3>
                                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Nov 2021 – Jul 2022</span>
                                        </div>
                                        <p className="font-semibold text-muted-foreground mb-4">Absolute Solution Co., Ltd. | Bangkok</p>
                                        <ul>
                                            <li>Developed dynamic, responsive user interfaces using React, Next.js, Ant Design, and Material UI.</li>
                                            <li>Integrated complex REST APIs to support real-time data operations.</li>
                                            <li>Collaborated effectively within Agile workflows alongside designers and backend developers.</li>
                                        </ul>
                                    </div>

                                    {/* Operations Manager */}
                                    <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-slate-400 before:to-transparent">
                                        <div className="absolute left-[-4px] top-2 w-2.5 h-2.5 rounded-full bg-slate-400" />
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                                            <h3 className="m-0">Operations Manager</h3>
                                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Oct 2018 – Dec 2020</span>
                                        </div>
                                        <p className="font-semibold text-muted-foreground mb-4">Frozen Restaurant | Kalasin</p>
                                        <ul>
                                            <li>Managed end-to-end daily operations, staff coordination, and resource planning.</li>
                                            <li>Gained hands-on executive experience in decision-making under real operational constraints.</li>
                                        </ul>
                                    </div>

                                    {/* Auction Trade */}
                                    <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-slate-400 before:to-transparent">
                                        <div className="absolute left-[-4px] top-2 w-2.5 h-2.5 rounded-full bg-slate-400" />
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                                            <h3 className="m-0">Junior .NET Developer</h3>
                                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Oct 2015 – Feb 2018</span>
                                        </div>
                                        <p className="font-semibold text-muted-foreground mb-4">Auction Trade Co., Ltd. | Bangkok</p>
                                        <ul>
                                            <li>Developed and maintained internal enterprise systems utilizing C#, .NET Framework, and SQL Server.</li>
                                            <li>Identified and resolved critical bugs and optimized legacy code.</li>
                                        </ul>
                                    </div>
                                </div>

                                <h2>Technical & Strategic Skills</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="bg-slate-50 dark:bg-zinc-900 border border-border/50 p-6 rounded-2xl">
                                        <h4 className="text-primary font-bold mb-3 mt-0 flex items-center gap-2">
                                            <ExternalLink size={16} /> AI & Automation
                                        </h4>
                                        <p className="text-sm text-balance m-0">AI Agents, LLM Integration, Local LLM, Prompt Engineering, Cursor, n8n, Google AI Ecosystem</p>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-zinc-900 border border-border/50 p-6 rounded-2xl">
                                        <h4 className="text-accent-purple font-bold mb-3 mt-0 flex items-center gap-2">
                                            <ExternalLink size={16} /> Web Technologies
                                        </h4>
                                        <p className="text-sm text-balance m-0">React, Next.js, TS, Tailwind, HTML/CSS, jQuery, C#, .NET, SQL Server</p>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-zinc-900 border border-border/50 p-6 rounded-2xl">
                                        <h4 className="text-indigo-500 font-bold mb-3 mt-0 flex items-center gap-2">
                                            <ExternalLink size={16} /> Platforms
                                        </h4>
                                        <p className="text-sm text-balance m-0">Power Automate, Power Apps, SharePoint On-Premise, SharePoint Designer</p>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-zinc-900 border border-border/50 p-6 rounded-2xl">
                                        <h4 className="text-slate-500 font-bold mb-3 mt-0 flex items-center gap-2">
                                            <ExternalLink size={16} /> Tools & Design
                                        </h4>
                                        <p className="text-sm text-balance m-0">UX/UI Design, Figma, Git, Visual Communication, Strategic Reasoning</p>
                                    </div>
                                </div>

                                <h2>Education & Certifications</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex justify-between items-start border-b border-border/30 pb-4">
                                        <div>
                                            <strong className="text-foreground block">Data Analysis with Power BI</strong>
                                            <span className="text-sm text-muted-foreground italic">AskMe Solutions</span>
                                        </div>
                                        <span className="text-xs font-bold text-muted-foreground">2024 – Present</span>
                                    </div>
                                    <div className="flex justify-between items-start border-b border-border/30 pb-4">
                                        <div>
                                            <strong className="text-foreground block">SCADA Systems for Production Processes</strong>
                                            <span className="text-sm text-muted-foreground italic">Rajamangala University of Technology Phra Nakhon</span>
                                        </div>
                                        <span className="text-xs font-bold text-muted-foreground">2024 – Present</span>
                                    </div>
                                    <div className="flex justify-between items-start border-b border-border/30 pb-4">
                                        <div>
                                            <strong className="text-foreground block">Full-Stack JavaScript Web Development (CodeCamp #9)</strong>
                                            <span className="text-sm text-muted-foreground italic">Software Park Thailand</span>
                                        </div>
                                        <span className="text-xs font-bold text-muted-foreground">2021</span>
                                    </div>
                                </div>

                                <div className="mt-12 p-8 bg-primary/5 border border-primary/20 rounded-3xl">
                                    <h2 className="mt-0 border-none">Professional Strengths</h2>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 m-0 p-0 list-none">
                                        <li className="flex gap-3 items-start">
                                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                            </div>
                                            <div>
                                                <strong className="text-foreground block">Research-Driven Analysis</strong>
                                                <span className="text-sm text-muted-foreground">Breaking down complex, ambiguous situations into solvable components.</span>
                                            </div>
                                        </li>
                                        <li className="flex gap-3 items-start">
                                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                            </div>
                                            <div>
                                                <strong className="text-foreground block">Strategic Reasoning</strong>
                                                <span className="text-sm text-muted-foreground">Translating technical concepts for non-technical stakeholders.</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </main >
    );
}
