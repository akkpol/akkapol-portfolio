"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
};

export function PrimaryButton({ children, className, href = "#" }: ButtonProps) {
  return (
    <motion.a
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-accent.blue to-accent.purple px-6 py-3 font-medium text-white shadow-glow-mixed transition-shadow",
        className
      )}
    >
      {children}
    </motion.a>
  );
}

export function SecondaryButton({ children, className, href = "#" }: ButtonProps) {
  return (
    <motion.a
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-6 py-3 font-medium text-text-primary backdrop-blur-xl",
        className
      )}
    >
      {children}
    </motion.a>
  );
}

