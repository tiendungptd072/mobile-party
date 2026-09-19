export const collectionTransformsConcept = {
  id: "collection-transforms",
  slug: "collection-transforms",
  title: "Collection Transformations",
  description:
    "Translate JavaScript array pipelines into Kotlin collection operations while preserving order, nullability, and allocation intent.",
  category: "fundamentals",
  order: 4,
  aliases: ["Array.map", "filter", "mapNotNull", "associateBy", "Sequence"],
  keywords: ["collections", "map", "filter", "reduce", "sequence", "immutable"],
  implementations: {
    "react-native": {
      name: "Array pipeline",
      summary: "Array methods filter and project immutable UI data.",
      language: "typescript",
      filename: "visible-users.ts",
      code: `const names = users
  .filter((user) => user.isActive)
  .map((user) => user.displayName);`,
    },
    kotlin: {
      name: "Collection pipeline",
      summary:
        "Kotlin collection operators express the same filter and projection.",
      language: "kotlin",
      filename: "VisibleUsers.kt",
      code: `val names = users
    .filter(User::isActive)
    .map(User::displayName)`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "The pipeline vocabulary is similar, but Kotlin distinguishes eager collections, lazy sequences, nullable transforms, and mutable collection interfaces.",
    },
  ],
  mentalModel:
    "Start with direct List operations because they are clear and eager. Use mapNotNull for nullable projections, associateBy for keyed lookup, and Sequence only when a measured pipeline benefits from laziness.",
  differences: [
    "Kotlin has separate read-only and mutable collection interfaces.",
    "Sequence defers intermediate work, while normal List transformations create eager results.",
  ],
  commonMistakes: [
    "Converting every pipeline to Sequence without considering collection size, repeated iteration, or terminal operations.",
  ],
  productionNotes: [
    "Perform expensive domain transformations outside composition and expose already prepared immutable UI models.",
  ],
} as const;
