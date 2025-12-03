"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import AuthButton from "@/components/AuthButton";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#education", label: "Education" },
  { href: "/dashboard", label: "Admin" },
];

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    setScrolled(current > 30);
  });

  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
        scrolled ? "backdrop-blur-2xl bg-surface/80 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="font-display text-lg font-semibold tracking-tight text-text-primary">
          Akkapol.dev
        </a>

        <nav className="hidden items-center gap-6 text-sm text-text-muted md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <AuthButton />
          </div>
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="rounded-full border border-white/10 p-2 text-text-primary md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <div className="space-y-4 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-base text-text-primary/90"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-2">
                <ThemeToggle />
                <AuthButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

