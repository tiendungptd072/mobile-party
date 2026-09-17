import type { Concept, ConceptRelationship } from "@/types/concept";
import type { Technology } from "@/types/technology";
import type { TechnologyPair } from "@/lib/technology-pair";

export function getConceptRelationship(
  concept: Concept,
  source: Technology,
  target: Technology,
): ConceptRelationship | undefined {
  return concept.relationships.find(
    (relationship) =>
      (relationship.from === source && relationship.to === target) ||
      (relationship.from === target && relationship.to === source),
  );
}

export function getCompareUrl(slug: string, pair: TechnologyPair): string {
  const searchParams = new URLSearchParams({
    source: pair.source,
    target: pair.target,
  });

  return `/compare/${slug}?${searchParams.toString()}`;
}
