import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { CompareIndex } from "@/features/compare/compare-index.client";
import { getConcepts } from "@/lib/content/concepts";
import { getTechnologies } from "@/lib/content/technologies";
import { createPageMetadata } from "@/lib/site";
import { CONCEPT_CATEGORIES, type ConceptCategory } from "@/types/concept";

type ComparePageProps = {
  searchParams: Promise<{ category?: string }>;
};

export const metadata: Metadata = createPageMetadata({
  title: "Compare concepts",
  description: "Compare mobile framework concepts, APIs, and mental models.",
  path: "/compare",
});

function isConceptCategory(
  value: string | undefined,
): value is ConceptCategory {
  return CONCEPT_CATEGORIES.some((category) => category === value);
}

function getCategoryLabel(category: ConceptCategory): string {
  return category.replace(/-/g, " ");
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { category } = await searchParams;
  const selectedCategory = isConceptCategory(category) ? category : undefined;
  const concepts = getConcepts().filter(
    (concept) => !selectedCategory || concept.category === selectedCategory,
  );
  const usedCategories = CONCEPT_CATEGORIES.filter((candidate) =>
    getConcepts().some((concept) => concept.category === candidate),
  );

  return (
    <Container className="flex-1 py-12 sm:py-16">
      <header className="max-w-3xl">
        <Badge variant="accent">Concept matrix</Badge>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Compare familiar patterns across mobile frameworks.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Start with the technologies in your selected learning path, then add
          others when a broader comparison helps.
        </p>
      </header>

      <nav
        className="mt-8 flex flex-wrap gap-2"
        aria-label="Concept categories"
      >
        <Link
          aria-current={!selectedCategory ? "page" : undefined}
          className="rounded-full border border-subtle bg-surface px-3 py-1.5 text-sm font-medium text-muted hover:text-foreground aria-[current=page]:border-accent aria-[current=page]:text-foreground"
          href="/compare"
        >
          All concepts
        </Link>
        {usedCategories.map((candidate) => (
          <Link
            key={candidate}
            aria-current={selectedCategory === candidate ? "page" : undefined}
            className="rounded-full border border-subtle bg-surface px-3 py-1.5 text-sm font-medium capitalize text-muted hover:text-foreground aria-[current=page]:border-accent aria-[current=page]:text-foreground"
            href={`/compare?category=${candidate}`}
          >
            {getCategoryLabel(candidate)}
          </Link>
        ))}
      </nav>

      <CompareIndex concepts={concepts} technologies={getTechnologies()} />
    </Container>
  );
}
