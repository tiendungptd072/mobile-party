export const lambdasAndReceiversConcept = {
  id: "lambdas-and-receivers",
  slug: "lambdas-and-receivers",
  title: "Lambdas and Receiver Scopes",
  description:
    "Compare TypeScript callbacks with Kotlin function types, trailing lambdas, and receiver-scoped DSLs used throughout Compose.",
  category: "fundamentals",
  order: 5,
  aliases: [
    "higher-order function",
    "trailing lambda",
    "receiver lambda",
    "DSL scope",
  ],
  keywords: [
    "lambda",
    "callback",
    "receiver",
    "scope",
    "higher-order function",
  ],
  implementations: {
    "react-native": {
      name: "Typed callback",
      summary: "A function type describes the value emitted by a callback.",
      language: "typescript",
      filename: "select-user.ts",
      code: `function selectUser(id: string, onSelected: (id: string) => void) {
  onSelected(id);
}`,
    },
    kotlin: {
      name: "Function type",
      summary:
        "A Kotlin function type expresses the same value-in and Unit-out contract.",
      language: "kotlin",
      filename: "SelectUser.kt",
      code: `fun selectUser(id: String, onSelected: (String) -> Unit) {
    onSelected(id)
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both pass behavior as values, while Kotlin additionally uses receiver function types to constrain DSL operations to scopes such as RowScope and LazyListScope.",
    },
  ],
  mentalModel:
    "Map JavaScript callbacks to Kotlin function types first. Then treat receiver lambdas as callbacks with an implicit typed this-like receiver, not as globally available Compose functions.",
  differences: [
    "Kotlin uses Unit rather than void for a function that returns no meaningful value.",
    "Receiver scopes make APIs such as weight or item available only inside the matching DSL context.",
  ],
  commonMistakes: [
    "Trying to call RowScope or LazyListScope extensions outside the receiver scope that provides them.",
  ],
  productionNotes: [
    "Keep event lambdas narrow and name receiver slots after the capability callers receive.",
  ],
} as const;
