"use client";

import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";

export function getLocaleFromPathname(pathname: string): Locale {
  const locale = pathname.split("/")[1];

  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}

/** Returns UI strings for the locale encoded in the current URL. */
export function useLocaleMessages() {
  return getMessages(getLocaleFromPathname(usePathname()));
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");

  if (isLocale(segments[1])) {
    segments[1] = locale;
  } else {
    segments.splice(1, 0, locale);
  }

  return segments.join("/") || `/${locale}`;
}
