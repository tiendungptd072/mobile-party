import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookmarkButton } from "@/components/bookmarks/bookmark-button.client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { getConceptBySlug, getConcepts } from "@/lib/content/concepts";
import { getTechnologies } from "@/lib/content/technologies";
import { isLocale, LOCALES } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { createLocalizedPageMetadata } from "@/lib/site";

type LocaleDictionaryDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getConcepts().map((concept) => ({ locale, slug: concept.slug })),
  );
}

export async function generateMetadata({
  params,
}: LocaleDictionaryDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const concept = getConceptBySlug(slug, locale);
  return concept
    ? createLocalizedPageMetadata({
        locale,
        path: `/dictionary/${concept.slug}`,
        title: concept.title,
        description: concept.description,
      })
    : {};
}

export default async function LocaleDictionaryDetailPage({
  params,
}: LocaleDictionaryDetailPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const concept = getConceptBySlug(slug, locale);
  if (!concept) notFound();

  const messages = getMessages(locale);

  return (
    <Container className="flex-1 py-12 sm:py-16">
      <Link
        className="text-sm font-medium text-muted hover:text-foreground"
        href={`/${locale}/dictionary`}
      >
        {messages.dictionary.back}
      </Link>
      <header className="mt-8 max-w-3xl">
        <Badge variant="accent" className="capitalize">
          {messages.categories[concept.category]}
        </Badge>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {concept.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          {concept.description}
        </p>
        <div className="mt-5">
          <BookmarkButton bookmark={{ kind: "concept", slug: concept.slug }} />
        </div>
      </header>
      <section className="mt-10 max-w-4xl" aria-labelledby="terms-title">
        <h2 id="terms-title" className="text-2xl font-semibold">
          {messages.dictionary.terms}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[...concept.aliases, ...concept.keywords].map((term) => (
            <span
              key={term}
              className="rounded-full border border-subtle bg-surface-raised px-3 py-1.5 text-sm text-muted"
            >
              {term}
            </span>
          ))}
        </div>
      </section>
      <section className="mt-10" aria-labelledby="api-title">
        <h2 id="api-title" className="text-2xl font-semibold">
          {messages.dictionary.apis}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {getTechnologies().map((technology) => {
            const implementation = concept.implementations[technology.id];
            return (
              <Card key={technology.id}>
                <CardHeader>
                  <p className="text-sm font-medium text-muted">
                    {technology.shortName}
                  </p>
                  <CardTitle>
                    {implementation?.name ?? messages.dictionary.noEquivalent}
                  </CardTitle>
                </CardHeader>
                {implementation && (
                  <CardContent>
                    <p className="text-sm leading-6 text-muted">
                      {implementation.summary}
                    </p>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </section>
      <section className="mt-10 max-w-4xl rounded-xl border border-subtle bg-surface-raised p-5">
        <h2 className="text-xl font-semibold">
          {messages.compare.mentalModel}
        </h2>
        <p className="mt-3 leading-7 text-muted">{concept.mentalModel}</p>
      </section>
    </Container>
  );
}
