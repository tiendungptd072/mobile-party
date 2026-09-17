import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { DictionarySearch } from "@/features/search/dictionary-search.client";
import { getConcepts } from "@/lib/content/concepts";
import { createConceptSearchIndex } from "@/lib/search/concept-index";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Dictionary",
  description: "Search mobile concepts, framework APIs, aliases, and keywords.",
  path: "/dictionary",
});

export default function DictionaryPage() {
  const index = createConceptSearchIndex(getConcepts());

  return (
    <Container className="flex-1 py-12 sm:py-16">
      <header className="max-w-3xl">
        <Badge variant="accent">Concept dictionary</Badge>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Find the mobile concept or API you already know.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Search concept names, aliases, framework APIs, categories, and
          keywords across the repository-backed learning content.
        </p>
      </header>
      <DictionarySearch index={index} />
    </Container>
  );
}
import type { Metadata } from "next";
