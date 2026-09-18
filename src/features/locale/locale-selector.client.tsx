"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import {
  getLocaleFromPathname,
  getLocalizedPath,
} from "@/features/locale/use-locale-messages.client";

export function LocaleSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);
  const messages = getMessages(locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function handleChange(nextLocale: Locale) {
    router.push(
      `${getLocalizedPath(pathname, nextLocale)}${window.location.search}`,
    );
  }

  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      <span className="sr-only sm:not-sr-only">{messages.language}</span>
      <select
        aria-label={messages.language}
        className="rounded-md border border-subtle bg-surface px-2.5 py-1.5 text-sm text-foreground"
        value={locale}
        onChange={(event) => handleChange(event.target.value as Locale)}
      >
        <option value="en">{messages.english}</option>
        <option value="vi">{messages.vietnamese}</option>
      </select>
    </label>
  );
}
