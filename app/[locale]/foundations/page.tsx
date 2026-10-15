import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FoundationIndex } from "@/components/foundations/foundation-index";
import { getFoundationArticles } from "@/lib/content/foundations";
import { isLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { createLocalizedPageMetadata } from "@/lib/site";

type FoundationsPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: FoundationsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const messages = getMessages(locale).foundations;
  return createLocalizedPageMetadata({
    locale,
    path: "/foundations",
    title: messages.title,
    description: messages.description,
  });
}

export default async function FoundationsPage({
  params,
}: FoundationsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <FoundationIndex articles={getFoundationArticles(locale)} locale={locale} />
  );
}
