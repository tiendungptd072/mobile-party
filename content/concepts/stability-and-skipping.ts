export const stabilityAndSkippingConcept = {
  id: "stability-and-skipping",
  slug: "stability-and-skipping",
  title: "Stability and Skipping",
  description:
    "Understand when Compose may skip recomposition and why React.memo is only an analogy, not an exact equivalent.",
  category: "lifecycle",
  order: 8.3,
  aliases: [
    "React.memo",
    "Compose stability",
    "strong skipping",
    "stable parameters",
  ],
  keywords: [
    "performance",
    "skipping",
    "stability",
    "memoization",
    "profiling",
  ],
  implementations: {
    "react-native": {
      name: "Memoized row",
      summary: "React.memo can skip a row render when props compare equal.",
      language: "tsx",
      filename: "UserRow.tsx",
      code: `const UserRow = memo(function UserRow({ id, name }: Props) {
  return <Text>{name}</Text>;
});`,
    },
    kotlin: {
      name: "Stable row inputs",
      summary:
        "Compose can skip an eligible call when its input values compare unchanged.",
      language: "kotlin",
      filename: "UserRow.kt",
      code: `@Composable
fun UserRow(id: String, name: String) {
    Text(name)
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both can avoid redundant UI work, but Compose compiler stability and strong-skipping behavior are not controlled by a direct React.memo-style wrapper.",
    },
  ],
  mentalModel:
    "First make state updates correct and UI functions cheap. Diagnose actual performance before changing model stability; Compose compiler settings and parameter stability affect skipping.",
  differences: [
    "React.memo compares component props; Compose may skip eligible composable calls according to compiler/runtime rules.",
    "Compose treats standard collection interfaces such as List as potentially unstable; val alone does not prove deep immutability.",
  ],
  commonMistakes: [
    "Adding @Immutable to a mutable object merely to silence a stability report.",
  ],
  productionNotes: [
    "Use Compose compiler reports and profiling to confirm a bottleneck; account for strong skipping and compiler version before optimizing.",
  ],
} as const;
