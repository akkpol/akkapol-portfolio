"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlitchCardProps {
    children: React.ReactNode;
    className?: string;
    borderColor?: string;
}

export const GlitchCard = ({ children, className = "", borderColor = "cyan" }: GlitchCardProps) => {
    return (
        <div className={`relative group ${className}`}>
            {/* Glitch Layers (Create the chromatic aberration effect on hover) */}
            <div className="absolute inset-0 bg-transparent translate-x-[2px] translate-y-[-2px] opacity-0 group-hover:opacity-70 transition-opacity duration-100 z-0 pointer-events-none mix-blend-screen bg-accent-neon-blue/20" />
            <div className="absolute inset-0 bg-transparent translate-x-[-2px] translate-y-[2px] opacity-0 group-hover:opacity-70 transition-opacity duration-100 z-0 pointer-events-none mix-blend-screen bg-accent-neon-pink/20" />

            {/* Main Container */}
            <div className="relative z-10 h-full w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 group-hover:border-white/30 group-hover:bg-black/60 shadow-glass">

                {/* Scanline Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

                {/* Neon Glow Border */}
                <div className={`absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-${borderColor === 'cyan' ? 'accent-neon-blue/20' : 'accent-neon-purple/20'} to-transparent`} />

                {/* Content */}
                <div className="relative z-30 p-6 h-full flex flex-col">
                    {children}
                </div>

                {/* Corner Accents (HUD Style) */}
                <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-accent-neon-blue/50 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 h-4 w-4 border-r-2 border-b-2 border-accent-neon-purple/50 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
        </div>
    );
};
