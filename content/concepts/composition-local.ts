export const compositionLocalConcept = {
  id: "composition-local",
  slug: "composition-local",
  title: "Context and CompositionLocal",
  description:
    "Compare subtree-scoped ambient values without turning CompositionLocal into a replacement for explicit screen state ownership.",
  category: "architecture",
  order: 8.5,
  aliases: ["CompositionLocalProvider", "React Context", "ambient values"],
  keywords: ["context", "provider", "theme", "dependency", "scope"],
  implementations: {
    "react-native": {
      name: "Provide a spacing value",
      summary: "A context provider supplies a value to descendants.",
      language: "tsx",
      filename: "Spacing.tsx",
    },
    kotlin: {
      name: "Provide a local spacing value",
      summary:
        "CompositionLocalProvider supplies a value to its composition subtree.",
      language: "kotlin",
      filename: "Spacing.kt",
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both supply a value to descendants without threading it through every intermediate function, but their runtime tracking and provider APIs differ.",
    },
  ],
  mentalModel:
    "Use a local for a genuinely cross-cutting value such as a design token that many descendants need. Keep screen-specific state and events as explicit parameters so ownership and dependencies remain visible.",
  differences: [
    "React consumers call useContext; Compose consumers read LocalSpacing.current during composition.",
    "A nested provider overrides the value only for its subtree; neither mechanism is durable storage or a screen-state owner.",
  ],
  commonMistakes: [
    "Putting every ViewModel or mutable screen value into a CompositionLocal to avoid passing parameters.",
  ],
  productionNotes: [
    "Define locals near their provider, document the default, and prefer explicit parameters for dependencies needed by only a few composables.",
  ],
} as const;
