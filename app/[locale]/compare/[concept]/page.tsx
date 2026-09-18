import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookmarkButton } from "@/components/bookmarks/bookmark-button.client";
import { CodeComparison } from "@/components/compare/code-comparison";
import { MentalModel } from "@/components/compare/mental-model";
import { RelationshipBadge } from "@/components/compare/relationship-badge";
import { Badge } from "@/components/ui/badge";
import { Callout } from "@/components/ui/callout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { getConceptRelationship } from "@/lib/compare";
import { getConceptBySlug, getConcepts } from "@/lib/content/concepts";
import { getTechnologyById } from "@/lib/content/technologies";
import { isLocale, LOCALES } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import {
  createTechnologyPair,
  DEFAULT_TECHNOLOGY_PAIR,
} from "@/lib/technology-pair";
import { createLocalizedPageMetadata } from "@/lib/site";

type LocaleCompareConceptPageProps = {
  params: Promise<{ concept: string; locale: string }>;
  searchParams: Promise<{ source?: string; target?: string }>;
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getConcepts().map((concept) => ({ locale, concept: concept.slug })),
  );
}

export async function generateMetadata({
  params,
}: Pick<LocaleCompareConceptPageProps, "params">): Promise<Metadata> {
  const { concept: slug, locale } = await params;
  if (!isLocale(locale)) return {};
  const concept = getConceptBySlug(slug, locale);
  return concept
    ? createLocalizedPageMetadata({
        locale,
        path: `/compare/${concept.slug}`,
        title: `${getMessages(locale).compare.compare}: ${concept.title}`,
        description: concept.description,
      })
    : {};
}

export default async function LocaleCompareConceptPage({
  params,
  searchParams,
}: LocaleCompareConceptPageProps) {
  const [{ concept: slug, locale }, { source, target }] = await Promise.all([
    params,
    searchParams,
  ]);
  if (!isLocale(locale)) notFound();

  const concept = getConceptBySlug(slug, locale);
  if (!concept) notFound();

  const messages = getMessages(locale);
  const pair =
    (source && target ? createTechnologyPair(source, target) : undefined) ??
    DEFAULT_TECHNOLOGY_PAIR;
  const sourceTechnology = getTechnologyById(pair.source);
  const targetTechnology = getTechnologyById(pair.target);
  if (!sourceTechnology || !targetTechnology) notFound();

  const sourceImplementation = concept.implementations[pair.source];
  const targetImplementation = concept.implementations[pair.target];
  const relationship = getConceptRelationship(
    concept,
    pair.source,
    pair.target,
  );
  const codeComparison =
    sourceImplementation?.code && targetImplementation?.code
      ? {
          source: { ...sourceImplementation, code: sourceImplementation.code },
          target: { ...targetImplementation, code: targetImplementation.code },
        }
      : undefined;

  return (
    <Container className="flex-1 py-12 sm:py-16">
      <Link
        className="text-sm font-medium text-muted hover:text-foreground"
        href={`/${locale}/compare`}
      >
        {messages.compare.back}
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
      <section
        className="mt-10 grid gap-4 md:grid-cols-2"
        aria-label={messages.compare.quickMapping}
      >
        {[sourceTechnology, targetTechnology].map((technology) => {
          const implementation = concept.implementations[technology.id];
          return (
            <Card key={technology.id}>
              <CardHeader>
                <p className="text-sm font-medium text-muted">
                  {technology.shortName}
                </p>
                <CardTitle>
                  {implementation?.name ?? messages.compare.unavailable}
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
      </section>
      <section className="mt-8 max-w-4xl">
        {relationship ? (
          <div className="rounded-xl border border-subtle bg-surface-raised p-5">
            <RelationshipBadge relationship={relationship.type} />
            <p className="mt-3 leading-7 text-muted">
              {relationship.explanation}
            </p>
          </div>
        ) : (
          <Callout title={messages.compare.noMappingTitle} tone="warning">
            {messages.compare.noMapping}
          </Callout>
        )}
      </section>
      <section className="mt-10" aria-labelledby="code-comparison-title">
        <h2 id="code-comparison-title" className="text-2xl font-semibold">
          {messages.compare.implementation}
        </h2>
        <div className="mt-5">
          {codeComparison ? (
            <CodeComparison
              source={{
                implementation: codeComparison.source,
                technology: sourceTechnology,
              }}
              target={{
                implementation: codeComparison.target,
                technology: targetTechnology,
              }}
            />
          ) : (
            <Callout title={messages.compare.codeUnavailable} tone="warning">
              {messages.compare.codeUnavailableDescription}
            </Callout>
          )}
        </div>
      </section>
      <section className="mt-10 grid max-w-5xl gap-8 lg:grid-cols-2">
        <div>
          <MentalModel>{concept.mentalModel}</MentalModel>
          <h2 className="mt-8 text-xl font-semibold">
            {messages.compare.keyDifferences}
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
            {concept.differences.map((difference) => (
              <li key={difference} className="flex gap-3">
                <span aria-hidden="true" className="text-accent">
                  •
                </span>
                {difference}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <Callout title={messages.compare.commonMistakes} tone="warning">
            <ul className="list-disc space-y-2 pl-5">
              {concept.commonMistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </Callout>
          <Callout title={messages.compare.productionPattern} tone="success">
            <ul className="list-disc space-y-2 pl-5">
              {concept.productionNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </Callout>
        </div>
      </section>
    </Container>
  );
}
