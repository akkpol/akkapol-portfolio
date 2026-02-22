"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, FileText, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

const cvMarkdown = `# Akkapol Kumpapug
**IT & Tech Integrator | AI-Assisted Problem Solver**

**Location:** Bangkok, Nonthaburi, Thailand
**Email:** akkapol.kumpapug@gmail.com
**Phone:** 096-119-5161
**LinkedIn:** https://www.linkedin.com/in/akkapol-kumpapug

## Professional Summary
IT & Tech Integrator and technology consultant specializing in Business Automation and AI Agent integration for SMEs. Experienced in designing intelligent workflows to increase operational efficiency, reduce costs, and support data-driven decision making.

## Experience

### Present | AK3 Studio
**AI-Assisted Problem Solver**
- Analyze business problems and create AI-assisted workflows.
- Act as both technical expert and strategic partner in decision-making.
- Design system architectures ensuring solutions are practical, implementable, and scalable.

### Nov 2022 - Nov 2025 | C.C.S. Advance Tech
**SharePoint & Power Platform Developer**
- Developed enterprise-level systems on SharePoint.
- Created automated workflows (Power Automate) reducing manual tasks by over 40%.
- Built custom interfaces using JavaScript, HTML/CSS tailored to specific departmental needs.

### Nov 2021 - Jul 2022 | Absolute Solution
**Front-End Developer**
- Developed modern Web Applications using React and Next.js.
- Integrated systems with RESTful APIs.
- Worked in an Agile environment collaborating with designers and backend teams to deliver projects on time.

## Tech Stack & Capabilities
- **Expert:** AI Agent Integration
- **Advanced:** Power Platform, SharePoint 2019, React & Next.js, UX/UI Design
- **Intermediate:** C# & .NET, TypeScript / Node, Data Analysis
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
        <main className="min-h-screen pt-28 pb-32 px-6">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm font-medium"
                >
                    <ArrowLeft size={16} /> กลับหน้าหลัก
                </Link>

                {/* Header and Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-background/50 border border-border/50 p-6 rounded-3xl backdrop-blur-sm shadow-sm">
                    <div>
                        <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Curriculum Vitae</h1>
                        <p className="text-muted-foreground mt-1">รายละเอียดประวัติการทำงานและทักษะ</p>
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
                <div className="bg-background/80 md:bg-white/60 dark:md:bg-black/60 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden">

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
                           prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-2 prose-h2:mt-10
                           prose-h3:text-xl prose-h3:mt-8
                           prose-a:text-primary hover:prose-a:text-primary/80 prose-a:transition-colors
                           prose-strong:text-foreground
                           prose-li:marker:text-primary"
                            >
                                <h1>Akkapol Kumpapug</h1>
                                <p className="text-xl font-medium text-muted-foreground -mt-4 mb-8">IT & Tech Integrator | AI-Assisted Problem Solver</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-sm bg-muted/30 p-6 rounded-2xl border border-border/40">
                                    <div><strong>Location:</strong> Bangkok, Nonthaburi, Thailand</div>
                                    <div><strong>Email:</strong> akkapol.kumpapug@gmail.com</div>
                                    <div><strong>Phone:</strong> 096-119-5161</div>
                                    <div><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/akkapol-kumpapug" target="_blank" rel="noreferrer">LinkedIn Profile</a></div>
                                </div>

                                <h2>Professional Summary</h2>
                                <p>
                                    IT & Tech Integrator and technology consultant specializing in Business Automation and AI Agent integration for SMEs. Experienced in designing intelligent workflows to increase operational efficiency, reduce costs, and support data-driven decision making.
                                </p>

                                <h2>Experience</h2>

                                <div className="relative pl-6 border-l-2 border-primary/20 space-y-10 mt-6">
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                                        <h3>Present | AK3 Studio</h3>
                                        <p className="font-semibold text-primary mb-2">AI-Assisted Problem Solver</p>
                                        <ul>
                                            <li>Analyze business problems and create AI-assisted workflows.</li>
                                            <li>Act as both technical expert and strategic partner in decision-making.</li>
                                            <li>Design system architectures ensuring solutions are practical, implementable, and scalable.</li>
                                        </ul>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-muted-foreground/50 ring-4 ring-background" />
                                        <h3>Nov 2022 - Nov 2025 | C.C.S. Advance Tech</h3>
                                        <p className="font-semibold text-muted-foreground mb-2">SharePoint & Power Platform Developer</p>
                                        <ul>
                                            <li>Developed enterprise-level systems on SharePoint.</li>
                                            <li>Created automated workflows (Power Automate) reducing manual tasks by over 40%.</li>
                                            <li>Built custom interfaces using JavaScript, HTML/CSS tailored to specific departmental needs.</li>
                                        </ul>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-muted-foreground/50 ring-4 ring-background" />
                                        <h3>Nov 2021 - Jul 2022 | Absolute Solution</h3>
                                        <p className="font-semibold text-muted-foreground mb-2">Front-End Developer</p>
                                        <ul>
                                            <li>Developed modern Web Applications using React and Next.js.</li>
                                            <li>Integrated systems with RESTful APIs.</li>
                                            <li>Worked in an Agile environment collaborating with designers and backend teams to deliver projects on time.</li>
                                        </ul>
                                    </div>
                                </div>

                                <h2>Tech Stack & Capabilities</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div className="bg-background/50 p-4 rounded-xl border border-border/30">
                                        <strong className="text-primary block mb-2">Expert</strong>
                                        <span>AI Agent Integration</span>
                                    </div>
                                    <div className="bg-background/50 p-4 rounded-xl border border-border/30">
                                        <strong className="text-accent-purple block mb-2">Advanced</strong>
                                        <span>Power Platform, SharePoint 2019, React & Next.js, UX/UI Design</span>
                                    </div>
                                    <div className="bg-background/50 p-4 rounded-xl border border-border/30 md:col-span-2">
                                        <strong className="text-muted-foreground block mb-2">Intermediate</strong>
                                        <span>C# & .NET, TypeScript / Node, Data Analysis</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </main >
    );
}
