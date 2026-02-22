"use client";

import dynamic from "next/dynamic";

// Dynamically import ThreeBackground to avoid SSR issues with 'window'
const ThreeBackground = dynamic(() => import("./ThreeBackground"), {
  ssr: false,
});

export default function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background text-text-primary pointer-events-none">
      <ThreeBackground />
    </div>
  );
}

