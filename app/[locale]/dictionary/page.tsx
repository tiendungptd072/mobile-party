import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { DictionarySearch } from "@/features/search/dictionary-search.client";
import { getConcepts } from "@/lib/content/concepts";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale } from "@/lib/i18n/locale";
import { createConceptSearchIndex } from "@/lib/search/concept-index";
import { createLocalizedPageMetadata } from "@/lib/site";

type LocaleDictionaryPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: LocaleDictionaryPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const messages = getMessages(locale);
  return createLocalizedPageMetadata({
    locale,
    path: "/dictionary",
    title: messages.dictionary.badge,
    description: messages.dictionary.description,
  });
}

export default async function LocaleDictionaryPage({
  params,
}: LocaleDictionaryPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = getMessages(locale);
  const index = createConceptSearchIndex(getConcepts(locale));

  return (
    <Container className="flex-1 py-12 sm:py-16">
      <header className="max-w-3xl">
        <Badge variant="accent">{messages.dictionary.badge}</Badge>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {messages.dictionary.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          {messages.dictionary.description}
        </p>
      </header>
      <DictionarySearch index={index} />
    </Container>
  );
}
