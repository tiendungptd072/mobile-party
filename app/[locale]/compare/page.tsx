import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { CompareIndex } from "@/features/compare/compare-index.client";
import { getConcepts } from "@/lib/content/concepts";
import { getTechnologies } from "@/lib/content/technologies";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale } from "@/lib/i18n/locale";
import { CONCEPT_CATEGORIES, type ConceptCategory } from "@/types/concept";
import { createLocalizedPageMetadata } from "@/lib/site";

type LocaleComparePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({
  params,
}: Pick<LocaleComparePageProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const messages = getMessages(locale);
  return createLocalizedPageMetadata({
    locale,
    path: "/compare",
    title: messages.compare.badge,
    description: messages.compare.description,
  });
}

function isConceptCategory(
  value: string | undefined,
): value is ConceptCategory {
  return CONCEPT_CATEGORIES.some((category) => category === value);
}

export default async function LocaleComparePage({
  params,
  searchParams,
}: LocaleComparePageProps) {
  const [{ locale }, { category }] = await Promise.all([params, searchParams]);

  if (!isLocale(locale)) notFound();

  const messages = getMessages(locale);
  const selectedCategory = isConceptCategory(category) ? category : undefined;
  const localizedConcepts = getConcepts(locale);
  const concepts = localizedConcepts.filter(
    (concept) => !selectedCategory || concept.category === selectedCategory,
  );
  const usedCategories = CONCEPT_CATEGORIES.filter((candidate) =>
    localizedConcepts.some((concept) => concept.category === candidate),
  );

  return (
    <Container className="flex-1 py-12 sm:py-16">
      <header className="max-w-3xl">
        <Badge variant="accent">{messages.compare.badge}</Badge>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {messages.compare.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          {messages.compare.description}
        </p>
      </header>
      <nav
        className="mt-8 flex flex-wrap gap-2"
        aria-label={messages.compare.categories}
      >
        <Link
          aria-current={!selectedCategory ? "page" : undefined}
          className="rounded-full border border-subtle bg-surface px-3 py-1.5 text-sm font-medium text-muted hover:text-foreground aria-[current=page]:border-accent aria-[current=page]:text-foreground"
          href={`/${locale}/compare`}
        >
          {messages.compare.all}
        </Link>
        {usedCategories.map((candidate) => (
          <Link
            key={candidate}
            aria-current={selectedCategory === candidate ? "page" : undefined}
            className="rounded-full border border-subtle bg-surface px-3 py-1.5 text-sm font-medium capitalize text-muted hover:text-foreground aria-[current=page]:border-accent aria-[current=page]:text-foreground"
            href={`/${locale}/compare?category=${candidate}`}
          >
            {messages.categories[candidate]}
          </Link>
        ))}
      </nav>
      <CompareIndex concepts={concepts} technologies={getTechnologies()} />
    </Container>
  );
}
