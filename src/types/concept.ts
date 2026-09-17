import type { CodeLanguage, Technology } from "@/types/technology";

export const CONCEPT_CATEGORIES = [
  "fundamentals",
  "state",
  "lifecycle",
  "layout",
  "interaction",
  "lists",
  "navigation",
  "async",
  "networking",
  "storage",
  "architecture",
  "testing",
  "build",
] as const;

export type ConceptCategory = (typeof CONCEPT_CATEGORIES)[number];

export type Relationship = "equivalent" | "similar" | "different";

export type ConceptImplementation = {
  code?: string;
  filename?: string;
  language: CodeLanguage;
  name: string;
  summary: string;
};

export type ConceptRelationship = {
  explanation: string;
  from: Technology;
  to: Technology;
  type: Relationship;
};

/** Normalized concept consumed by Learn, Compare, and Dictionary features. */
export type Concept = {
  aliases: readonly string[];
  category: ConceptCategory;
  commonMistakes: readonly string[];
  description: string;
  differences: readonly string[];
  id: string;
  implementations: Partial<Record<Technology, ConceptImplementation>>;
  keywords: readonly string[];
  mentalModel: string;
  order: number;
  productionNotes: readonly string[];
  relationships: readonly ConceptRelationship[];
  slug: string;
  title: string;
};
