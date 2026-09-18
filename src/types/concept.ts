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

export const CONTENT_REFERENCE_KINDS = [
  "official-docs",
  "sample",
  "spec",
  "further-reading",
] as const;

export type ContentReferenceKind = (typeof CONTENT_REFERENCE_KINDS)[number];

/** An external source used to verify or expand educational content. */
export type ContentReference = {
  kind: ContentReferenceKind;
  technology?: Technology;
  title: string;
  url: string;
  verifiedAt: string;
  version?: string;
};

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
  references: readonly ContentReference[];
  relationships: readonly ConceptRelationship[];
  slug: string;
  title: string;
};
