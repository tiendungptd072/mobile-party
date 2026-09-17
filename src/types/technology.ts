export const TECHNOLOGY_IDS = [
  "react-native",
  "flutter",
  "kotlin",
  "swiftui",
] as const;

/** Stable technology identifiers persisted in URLs and browser storage. */
export type Technology = (typeof TECHNOLOGY_IDS)[number];

export type TechnologyDefinition = {
  id: Technology;
  language: CodeLanguage;
  name: string;
  shortName: string;
};

export const CODE_LANGUAGES = [
  "tsx",
  "typescript",
  "dart",
  "kotlin",
  "swift",
  "json",
  "bash",
] as const;

export type CodeLanguage = (typeof CODE_LANGUAGES)[number];
