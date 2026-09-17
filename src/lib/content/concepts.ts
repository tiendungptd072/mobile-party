import { rawConcepts } from "@content/concepts";
import type { Concept } from "@/types/concept";
import { validateConcepts } from "@/lib/content/schema";

const concepts = validateConcepts(rawConcepts);

export function getConcepts(): readonly Concept[] {
  return concepts;
}

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find((concept) => concept.slug === slug);
}

export function findConceptByTerm(term: string): Concept | undefined {
  const normalizedTerm = term.trim().toLocaleLowerCase();

  return concepts.find(
    (concept) =>
      concept.slug === normalizedTerm ||
      concept.aliases.some(
        (alias) => alias.toLocaleLowerCase() === normalizedTerm,
      ),
  );
}
