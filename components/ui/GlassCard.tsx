import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 bg-clip-padding backdrop-blur-3xl shadow-lg dark:shadow-glow-mixed/30 transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

