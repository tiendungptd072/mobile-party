"use client";

import { useEffect, useRef } from "react";
import type { ChangeEvent } from "react";
import { useLocaleMessages } from "@/features/locale/use-locale-messages.client";

const THEME_STORAGE_KEY = "mobile-guide:theme";

const themes = ["system", "light", "dark"] as const;

type Theme = (typeof themes)[number];

function isTheme(value: string | null): value is Theme {
  return value !== null && themes.some((theme) => theme === value);
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.remove("light", "dark");

  if (theme !== "system") {
    root.classList.add(theme);
  }
}

export function ThemeSelector() {
  const messages = useLocaleMessages();
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

      if (isTheme(storedTheme) && selectRef.current) {
        selectRef.current.value = storedTheme;
        applyTheme(storedTheme);
      }
    } catch {
      // Keep the system theme when storage is unavailable.
    }
  }, []);

  function handleThemeChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextTheme = event.target.value;

    if (!isTheme(nextTheme)) {
      return;
    }

    applyTheme(nextTheme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Applying the theme still works for the current page session.
    }
  }

  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      <span className="sr-only sm:not-sr-only">{messages.theme}</span>
      <select
        aria-label={messages.colorTheme}
        className="rounded-md border border-subtle bg-surface px-2.5 py-1.5 text-sm text-foreground"
        defaultValue="system"
        onChange={handleThemeChange}
        ref={selectRef}
      >
        <option value="system">{messages.system}</option>
        <option value="light">{messages.light}</option>
        <option value="dark">{messages.dark}</option>
      </select>
    </label>
  );
}
