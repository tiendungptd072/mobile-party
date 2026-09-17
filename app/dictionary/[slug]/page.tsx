import Link from "next/link";
import type { Metadata } from "next";
import { BookmarkButton } from "@/components/bookmarks/bookmark-button.client";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { getConceptBySlug, getConcepts } from "@/lib/content/concepts";
import { getTechnologies } from "@/lib/content/technologies";
import { createPageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return getConcepts().map((concept) => ({ slug: concept.slug }));
}

type DictionaryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: DictionaryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  return concept
    ? createPageMetadata({
        title: concept.title,
        description: concept.description,
        path: `/dictionary/${concept.slug}`,
      })
    : {};
}

export default async function DictionaryDetailPage({
  params,
}: DictionaryDetailPageProps) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (!concept) {
    notFound();
  }

  return (
    <Container className="flex-1 py-12 sm:py-16">
      <Link
        className="text-sm font-medium text-muted hover:text-foreground"
        href="/dictionary"
      >
        Back to dictionary
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

      <section className="mt-10 max-w-4xl" aria-labelledby="terms-title">
        <h2 id="terms-title" className="text-2xl font-semibold">
          Search terms
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
          Framework APIs
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
                    {implementation?.name ?? "No direct equivalent"}
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
        <h2 className="text-xl font-semibold">Mental model</h2>
        <p className="mt-3 leading-7 text-muted">{concept.mentalModel}</p>
      </section>
    </Container>
  );
}
