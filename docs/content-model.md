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

export type ContentReference = {
  title: string;
  url: string;
  kind: "official-docs" | "sample" | "spec" | "further-reading";
  technology?: Technology;
  version?: string;
  verifiedAt: string;
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
  references: readonly ContentReference[];
};
```

An implementation may be absent while content is being expanded. Rendering
must distinguish missing content from a concept that intentionally has no
direct equivalent.

Every concept must include implementations for at least two supported
technologies. No particular pair is required: a concept with only Flutter and
SwiftUI implementations is valid. The validator enforces this minimum at
runtime; the normalized TypeScript model uses a partial technology map.

Relationships are optional pair overrides in source content. An omitted
`relationships` field is normalized to `[]`; an explicit empty array is also
valid. Every declared relationship must reference two distinct technologies
with implementations in that concept. Concepts with three or more technologies
do not need to describe every pair.

## Roadmap

```ts
export type RoadmapLesson = {
  conceptSlug: string;
  title: string;
  order: number;
  exercise: string;
  checklist: readonly string[];
  stages: readonly LessonStage[];
};

export type LessonStage = {
  id: "basic" | "applied" | "production";
  title: string;
  description: string;
  examples?: Partial<Record<Technology, ConceptImplementation>>;
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

### File-backed code

Implementation metadata omits `code` for `tsx`, `typescript`, and `kotlin`;
the validator rejects inline code in these languages for concepts, lesson
stages, and recipes. The server-only loader resolves omitted code from
`content/snippets/<concept>/<technology>/<stage>.<ext>`; Compare uses `basic`.
Recipe paths use `content/snippets/recipes/<recipe>/<technology>/main.<ext>`.

Source metadata may set `snippet` to an explicit path relative to
`content/snippets/`. Existing Learn basic examples with different code use
`learn-basic.tsx` or `learn-basic.kt` so the migration preserves both displays.
The normalized model exposes the loaded `code`, not the source reference.
Missing files raise `ContentValidationError` with the failing path.

Only code between `// #region show` and `// #endregion` is displayed when a
region is present; files without a region display in full. Kotlin package
declarations stay outside the region and are unique per file. See
[`content/snippets/README.md`](../content/snippets/README.md) for extensions,
package naming, and root-tool exclusions.

## Validation rules

The Phase 2 validator must reject:

- unknown technology or relationship values
- empty required text fields
- duplicate IDs or slugs
- slugs that are not `kebab-case`
- a relationship whose source and target are identical
- implementations with unsupported language identifiers
- concepts with fewer than two implementations
- relationships referencing implementations absent from the concept
- roadmap lessons referencing unknown concept slugs
- related content references that are not canonical
- external references that are not HTTPS, contain duplicate URLs, or omit a
  valid ISO verification date

Validation runs at build time and reports the content file and failing field.

## Search projection

The build-time search index derives normalized entries from title, aliases, API
names, category, technology, and keywords. It contains only serializable data
needed by the client and never duplicates full lesson bodies.
