'use client';
import { useState } from 'react';

interface ThemeToggleProps {
  dark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ dark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="px-3 py-1 rounded-full border hover:shadow transition-shadow"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}

