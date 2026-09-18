import { rawConcepts } from "@content/concepts";
import type { Concept } from "@/types/concept";
import { validateConcepts } from "@/lib/content/schema";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { localizeConcept } from "@/lib/i18n/content";

const concepts = validateConcepts(rawConcepts);

export function getConcepts(
  locale: Locale = DEFAULT_LOCALE,
): readonly Concept[] {
  return concepts.map((concept) => localizeConcept(concept, locale));
}

export function getConceptBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Concept | undefined {
  const concept = concepts.find((candidate) => candidate.slug === slug);
  return concept ? localizeConcept(concept, locale) : undefined;
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
