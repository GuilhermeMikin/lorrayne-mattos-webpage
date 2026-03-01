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
    <div className="flex items-center gap-1.5">
      <span className="text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`${label}: ${isDark ? darkLabel : lightLabel}`}
        onClick={handleToggle}
        className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 ${
          isDark ? "bg-brand" : "bg-slate-300"
        }`}
      >
        <span className="sr-only">{isDark ? darkLabel : lightLabel}</span>
        <span
          className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            isDark ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
