"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/locale";

function getLocaleFromPathname(pathname: string): Locale {
  const locale = pathname.split("/")[1];
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function LocaleSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function handleChange(nextLocale: Locale) {
    const segments = pathname.split("/");

    if (isLocale(segments[1])) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }

    router.push(segments.join("/") || `/${nextLocale}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      <span className="sr-only sm:not-sr-only">
        {locale === "vi" ? "Ngôn ngữ" : "Language"}
      </span>
      <select
        aria-label={locale === "vi" ? "Chọn ngôn ngữ" : "Select language"}
        className="rounded-md border border-subtle bg-surface px-2.5 py-1.5 text-sm text-foreground"
        value={locale}
        onChange={(event) => handleChange(event.target.value as Locale)}
      >
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </label>
  );
}
