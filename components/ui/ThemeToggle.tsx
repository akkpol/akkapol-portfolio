"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/50 dark:bg-black/50 border border-border text-foreground backdrop-blur-md shadow-sm transition-all hover:bg-white/80 dark:hover:bg-white/10 hover:shadow-md active:scale-95"
            aria-label="Toggle theme"
        >
            <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
            <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
