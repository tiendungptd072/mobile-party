import type { Concept, ConceptCategory } from "@/types/concept";
import type { Technology } from "@/types/technology";

export type ConceptSearchEntry = {
  aliases: readonly string[];
  category: ConceptCategory;
  description: string;
  id: string;
  implementationNames: Partial<Record<Technology, string>>;
  keywords: readonly string[];
  slug: string;
  title: string;
};

export function createConceptSearchIndex(
  concepts: readonly Concept[],
): readonly ConceptSearchEntry[] {
  return concepts.map((concept) => ({
    id: concept.id,
    slug: concept.slug,
    title: concept.title,
    description: concept.description,
    category: concept.category,
    aliases: concept.aliases,
    keywords: concept.keywords,
    implementationNames: Object.fromEntries(
      Object.entries(concept.implementations).map(
        ([technology, implementation]) => [technology, implementation.name],
      ),
    ),
  }));
}

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase();
}

function scoreEntry(entry: ConceptSearchEntry, query: string): number {
  const fields = [
    [entry.title, 8],
    [entry.slug, 7],
    ...entry.aliases.map((alias) => [alias, 6] as const),
    ...entry.keywords.map((keyword) => [keyword, 4] as const),
    ...Object.values(entry.implementationNames).map(
      (implementation) => [implementation, 5] as const,
    ),
    [entry.category, 2],
    [entry.description, 1],
  ] as const;

  return fields.reduce((score, [field, weight]) => {
    const normalizedField = normalize(field);

    if (normalizedField === query) {
      return score + weight * 3;
    }

    if (normalizedField.startsWith(query)) {
      return score + weight * 2;
    }

    return normalizedField.includes(query) ? score + weight : score;
  }, 0);
}

/** Searches the small, build-time concept index without a network request. */
export function searchConceptIndex(
  index: readonly ConceptSearchEntry[],
  term: string,
): readonly ConceptSearchEntry[] {
  const query = normalize(term);

  if (!query) {
    return index;
  }

  return index
    .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter(({ score }) => score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.entry.title.localeCompare(right.entry.title),
    )
    .map(({ entry }) => entry);
}
