import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/lib/i18n/locale";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

/** Public origin used for canonical URLs; override it during deployment. */
export const SITE_URL =
  configuredUrl && /^https?:\/\//.test(configuredUrl)
    ? configuredUrl.replace(/\/$/, "")
    : "https://mobile-party.dev";

type PageMetadataInput = {
  description: string;
  path: string;
  title: string;
};

export function createPageMetadata({
  description,
  path,
  title,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { card: "summary_large_image", title, description },
  };
}

type LocalizedPageMetadataInput = PageMetadataInput & { locale: Locale };

/** Creates canonical and language-alternate metadata for a localized route. */
export function createLocalizedPageMetadata({
  description,
  locale,
  path,
  title,
}: LocalizedPageMetadataInput): Metadata {
  const suffix = path === "/" ? "" : path;
  const localizedPath = `/${locale}${suffix}`;
  const languages = Object.fromEntries(
    LOCALES.map((candidate) => [candidate, `/${candidate}${suffix}`]),
  );

  return {
    title,
    description,
    alternates: { canonical: localizedPath, languages },
    openGraph: {
      title,
      description,
      locale: locale === "vi" ? "vi_VN" : "en_US",
      url: localizedPath,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
