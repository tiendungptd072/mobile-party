import { LOCALES, type Locale } from "@/types/locale";
export { LOCALES, type Locale } from "@/types/locale";

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return LOCALES.some((locale) => locale === value);
}
