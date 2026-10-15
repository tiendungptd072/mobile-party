import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FoundationReader } from "@/components/foundations/foundation-reader";
import {
  getFoundationArticle,
  getFoundationArticles,
  getRelatedFoundationArticles,
} from "@/lib/content/foundations";
import { getConcepts } from "@/lib/content/concepts";
import { isLocale, LOCALES } from "@/lib/i18n/locale";
import { createLocalizedPageMetadata } from "@/lib/site";

type FoundationPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

// Only reviewed, published registry entries have public reader routes.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getFoundationArticles(locale).map((article) => ({
      locale,
      slug: article.metadata.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: FoundationPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const article = getFoundationArticle(slug, locale);
  if (!article) return {};
  return {
    ...createLocalizedPageMetadata({
      locale,
      path: `/foundations/${slug}`,
      title: article.localized.title,
      description: article.localized.description,
    }),
    keywords: [...article.localized.keywords],
  };
}

export default async function FoundationPage({ params }: FoundationPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = getFoundationArticle(slug, locale);
  if (!article) notFound();
  const relatedConcepts = getConcepts(locale).filter((concept) =>
    article.metadata.relatedConcepts.includes(concept.slug),
  );
  return (
    <FoundationReader
      article={article}
      relatedArticles={getRelatedFoundationArticles(article)}
      relatedConcepts={relatedConcepts}
    />
  );
}
