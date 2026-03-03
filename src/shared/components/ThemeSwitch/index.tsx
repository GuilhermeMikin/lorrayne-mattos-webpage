"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "lorrayne-mattos-theme";

type ThemeMode = "light" | "dark";

type ThemeSwitchProps = {
  label: string;
  lightLabel: string;
  darkLabel: string;
};

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export default function ThemeSwitch({ label, lightLabel, darkLabel }: ThemeSwitchProps) {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    let savedTheme: string | null = null;
    try {
      savedTheme = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      savedTheme = null;
    }

    const initialTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "light";
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const isDark = theme === "dark";
  const handleToggle = () => {
    const nextTheme: ThemeMode = isDark ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Keep runtime behavior working even if storage is unavailable.
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`${label}: ${isDark ? darkLabel : lightLabel}`}
      onClick={handleToggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
    >
      <span className="sr-only">{isDark ? darkLabel : lightLabel}</span>
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
