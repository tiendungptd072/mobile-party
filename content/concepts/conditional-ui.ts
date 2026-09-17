export const conditionalUiConcept = {
  id: "conditional-ui",
  slug: "conditional-ui",
  title: "Conditional UI",
  description:
    "Show one UI branch from explicit state in React Native and Jetpack Compose.",
  category: "fundamentals",
  order: 15,
  aliases: ["conditional rendering", "if expression", "ternary"],
  keywords: ["loading", "empty state", "branch", "render"],
  implementations: {
    "react-native": {
      name: "JavaScript conditional rendering",
      summary:
        "Choose JSX with a conditional expression during a component render.",
      language: "tsx",
      filename: "Profile.tsx",
      code: `return isLoading ? <ActivityIndicator /> : <ProfileCard user={user} />;`,
    },
    kotlin: {
      name: "Kotlin if expression",
      summary:
        "Choose which composable is emitted from the current composition.",
      language: "kotlin",
      filename: "Profile.kt",
      code: `if (isLoading) CircularProgressIndicator() else ProfileCard(user)`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "equivalent",
      explanation:
        "Both describe UI as a branch of current state; Compose emits a different subtree rather than mutating an existing view.",
    },
  ],
  mentalModel:
    "Treat each branch as a state description. Do not imperatively show or hide a native view in response to state.",
  differences: [
    "React Native uses JavaScript expressions in JSX.",
    "Compose uses Kotlin control flow while composing UI.",
  ],
  commonMistakes: [
    "Leaving loading, empty, and error branches implicit so stale content remains visible.",
  ],
  productionNotes: [
    "Represent mutually exclusive screen states with a sealed UI-state model.",
  ],
} as const;
