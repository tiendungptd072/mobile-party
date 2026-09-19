export const sealedTypesConcept = {
  id: "sealed-types",
  slug: "sealed-types",
  title: "Discriminated Unions and Sealed Types",
  description:
    "Model a closed set of UI states with TypeScript discriminated unions and Kotlin sealed interfaces.",
  category: "fundamentals",
  order: 3,
  aliases: [
    "discriminated union",
    "sealed interface",
    "exhaustive when",
    "never",
  ],
  keywords: ["union", "sealed", "exhaustive", "state machine", "when"],
  implementations: {
    "react-native": {
      name: "Discriminated union",
      summary: "A literal status field narrows each possible UI-state shape.",
      language: "typescript",
      filename: "profile-state.ts",
      code: `type ProfileState =
  | { status: "loading" }
  | { status: "ready"; profile: Profile }
  | { status: "error"; message: string };`,
    },
    kotlin: {
      name: "Sealed UI state",
      summary:
        "A sealed hierarchy gives when an exhaustive, type-safe state set.",
      language: "kotlin",
      filename: "ProfileUiState.kt",
      code: `sealed interface ProfileUiState {
    data object Loading : ProfileUiState
    data class Ready(val profile: Profile) : ProfileUiState
    data class Error(val message: String) : ProfileUiState
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "equivalent",
      explanation:
        "Both model a closed family of variants whose payload becomes available after exhaustive type narrowing.",
    },
  ],
  mentalModel:
    "Translate a discriminant field into a sealed hierarchy, then render it with an exhaustive when. Each variant should contain only the data valid for that state.",
  differences: [
    "TypeScript unions are structural; Kotlin sealed subtypes are declared nominally within a controlled hierarchy.",
    "Kotlin when can enforce exhaustiveness without a default branch for sealed types.",
  ],
  commonMistakes: [
    "Using several unrelated booleans that allow impossible combinations such as loading and success at the same time.",
  ],
  productionNotes: [
    "Keep transient UI effects separate from durable screen state instead of adding one-shot events as persistent sealed-state variants.",
  ],
} as const;
