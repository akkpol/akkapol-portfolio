"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import AuthButton from "@/components/AuthButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cv", label: "CV Resume" },
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
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/liff")) return null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
        scrolled ? "backdrop-blur-2xl bg-background/80 shadow-sm border-b border-border/40" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent-purple bg-clip-text text-transparent hover:scale-105 transition-transform">
          Akkapol<span className="text-foreground">.dev</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative transition-colors hover:text-primary"
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 top-full block h-[2px] w-full bg-primary"
                  />
                )}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4 border-l border-border pl-6">
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>

        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="rounded-full border border-border bg-foreground/5 p-2 text-foreground backdrop-blur-md transition-colors hover:bg-foreground/10 md:hidden pb-2"
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen ? "true" : "false"}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="overflow-hidden border-t border-border md:hidden bg-background/95 backdrop-blur-3xl"
          >
            <div className="space-y-4 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-base font-medium text-foreground hover:text-primary transition-colors"
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

