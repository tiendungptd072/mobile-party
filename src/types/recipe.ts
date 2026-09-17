import type { CodeLanguage, Technology } from "@/types/technology";

export type RecipeImplementation = {
  code: string;
  filename?: string;
  language: CodeLanguage;
  summary: string;
};

export type Recipe = {
  architectureNotes: readonly string[];
  category: string;
  description: string;
  flow: readonly string[];
  implementations: Partial<Record<Technology, RecipeImplementation>>;
  keywords: readonly string[];
  slug: string;
  title: string;
};
