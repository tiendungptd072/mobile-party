# Content Model

## Canonical identifiers

```ts
export const TECHNOLOGY_IDS = [
  "react-native",
  "flutter",
  "kotlin",
  "swiftui",
] as const;

export type Technology = (typeof TECHNOLOGY_IDS)[number];

export type Relationship = "equivalent" | "similar" | "different";
```

Display labels, languages, colors, and other presentation metadata remain in a
technology configuration keyed by these IDs. Display names are never used as
identifiers.

Canonical display order is React Native, Flutter, Jetpack Compose, then SwiftUI.

## Technology

```ts
export type TechnologyDefinition = {
  id: Technology;
  name: string;
  shortName: string;
  language: "tsx" | "dart" | "kotlin" | "swift";
};
```

## Concept

```ts
export type ConceptImplementation = {
  name: string;
  summary: string;
  language: CodeLanguage;
  code?: string;
  filename?: string;
};

export type ConceptRelationship = {
  from: Technology;
  to: Technology;
  type: Relationship;
  explanation: string;
};

export type Concept = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ConceptCategory;
  order: number;
  aliases: readonly string[];
  keywords: readonly string[];
  implementations: Partial<Record<Technology, ConceptImplementation>>;
  relationships: readonly ConceptRelationship[];
  mentalModel?: string;
  differences?: readonly string[];
  commonMistakes?: readonly string[];
  productionNotes?: readonly string[];
};
```

An implementation may be absent while content is being expanded. Rendering
must distinguish missing content from a concept that intentionally has no
direct equivalent.

During the MVP, every concept must include React Native and Kotlin
implementations. Flutter and SwiftUI remain optional until their content is
verified.

## Roadmap

```ts
export type RoadmapLesson = {
  conceptSlug: string;
  title: string;
  order: number;
};

export type RoadmapSection = {
  id: string;
  title: string;
  order: number;
  lessons: readonly RoadmapLesson[];
};

export type Roadmap = {
  source: Technology;
  target: Technology;
  sections: readonly RoadmapSection[];
};
```

Roadmaps reference canonical concept slugs. Lesson explanations remain in the
concept content rather than being duplicated in roadmap data.

## Recipe

```ts
export type RecipeImplementation = {
  summary: string;
  language: CodeLanguage;
  code: string;
  filename?: string;
};

export type Recipe = {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: readonly string[];
  flow: readonly string[];
  implementations: Partial<Record<Technology, RecipeImplementation>>;
  architectureNotes: readonly string[];
};
```

## Content placement

```text
content/
  technologies/
  concepts/
  roadmaps/
  recipes/
```

Use TypeScript for concise structured data and MDX for long educational prose.
UI modules consume the normalized model and do not know the source file format.
MDX metadata should use named exports because `@next/mdx` does not parse YAML
frontmatter without an additional plugin.

## Validation rules

The Phase 2 validator must reject:

- unknown technology or relationship values
- empty required text fields
- duplicate IDs or slugs
- slugs that are not `kebab-case`
- a relationship whose source and target are identical
- implementations with unsupported language identifiers
- roadmap lessons referencing unknown concept slugs
- related content references that are not canonical

Validation runs at build time and reports the content file and failing field.

## Search projection

The build-time search index derives normalized entries from title, aliases, API
names, category, technology, and keywords. It contains only serializable data
needed by the client and never duplicates full lesson bodies.
