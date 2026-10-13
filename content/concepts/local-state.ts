export const localStateConcept = {
  id: "local-state",
  slug: "local-state",
  title: "Local State",
  description:
    "Compare view-owned state with React Native useState and Compose state APIs.",
  category: "state",
  order: 20,
  aliases: ["useState", "remember", "mutableStateOf", "Compose state"],
  keywords: ["state", "counter", "recomposition", "render"],
  implementations: {
    "react-native": {
      name: "useState",
      summary: "Stores state for a mounted component instance.",
      language: "tsx",
      filename: "Counter.tsx",
    },
    kotlin: {
      name: "remember + mutableStateOf",
      summary: "Retains observable state across recompositions.",
      language: "kotlin",
      filename: "Counter.kt",
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both retain local UI state and trigger updates, but remember is scoped to composition identity rather than React hook position alone.",
    },
  ],
  mentalModel:
    "Think of remember plus mutableStateOf as local composition state, not as a mechanical replacement for every useState call.",
  differences: [
    "React state is updated through a setter; Compose state can use delegated property syntax.",
    "remember does not survive activity recreation unless paired with saveable state.",
  ],
  commonMistakes: [
    "Using remember for state that should belong to a ViewModel or survive recreation.",
  ],
  productionNotes: [
    "Hoist state and expose events when a composable should remain reusable and testable.",
  ],
} as const;
