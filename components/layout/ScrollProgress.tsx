"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-40 h-1 origin-left bg-gradient-to-r from-accent.blue via-accent.purple to-accent.green"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

