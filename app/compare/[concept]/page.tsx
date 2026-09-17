import Link from "next/link";
import type { Metadata } from "next";
import { BookmarkButton } from "@/components/bookmarks/bookmark-button.client";
import { notFound } from "next/navigation";
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
import { createPageMetadata } from "@/lib/site";
import {
  createTechnologyPair,
  DEFAULT_TECHNOLOGY_PAIR,
} from "@/lib/technology-pair";

export function generateStaticParams() {
  return getConcepts().map((concept) => ({ concept: concept.slug }));
}

type CompareConceptPageProps = {
  params: Promise<{ concept: string }>;
  searchParams: Promise<{ source?: string; target?: string }>;
};

export async function generateMetadata({
  params,
}: Pick<CompareConceptPageProps, "params">): Promise<Metadata> {
  const { concept: slug } = await params;
  const concept = getConceptBySlug(slug);

  return concept
    ? createPageMetadata({
        title: `Compare ${concept.title}`,
        description: concept.description,
        path: `/compare/${concept.slug}`,
      })
    : {};
}

export default async function CompareConceptPage({
  params,
  searchParams,
}: CompareConceptPageProps) {
  const [{ concept: slug }, { source, target }] = await Promise.all([
    params,
    searchParams,
  ]);
  const concept = getConceptBySlug(slug);

  if (!concept) {
    notFound();
  }

  const pair =
    (source && target ? createTechnologyPair(source, target) : undefined) ??
    DEFAULT_TECHNOLOGY_PAIR;
  const sourceTechnology = getTechnologyById(pair.source);
  const targetTechnology = getTechnologyById(pair.target);

  if (!sourceTechnology || !targetTechnology) {
    notFound();
  }

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
        href="/compare"
      >
        Back to comparisons
      </Link>

      <header className="mt-8 max-w-3xl">
        <Badge variant="accent" className="capitalize">
          {concept.category}
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
        aria-label="Quick mapping"
      >
        {[sourceTechnology, targetTechnology].map((technology) => {
          const implementation = concept.implementations[technology.id];

          return (
            <Card key={technology.id}>
              <CardHeader>
                <p className="text-sm font-medium text-muted">
                  {technology.shortName}
                </p>
                <CardTitle>{implementation?.name ?? "Not available"}</CardTitle>
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
          <Callout title="No direct mapping documented" tone="warning">
            This pair has no published relationship note yet. Compare the
            framework-specific implementations and keep their lifecycle and
            state rules in mind.
          </Callout>
        )}
      </section>

      <section className="mt-10" aria-labelledby="code-comparison-title">
        <h2 id="code-comparison-title" className="text-2xl font-semibold">
          Side-by-side implementation
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
            <Callout title="Code comparison unavailable" tone="warning">
              This concept does not yet include runnable examples for both
              selected technologies.
            </Callout>
          )}
        </div>
      </section>

      <section className="mt-10 grid max-w-5xl gap-8 lg:grid-cols-2">
        <div>
          <MentalModel>{concept.mentalModel}</MentalModel>
          <h2 className="mt-8 text-xl font-semibold">Key differences</h2>
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
          <Callout title="Common mistakes" tone="warning">
            <ul className="list-disc space-y-2 pl-5">
              {concept.commonMistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </Callout>
          <Callout title="Production pattern" tone="success">
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
