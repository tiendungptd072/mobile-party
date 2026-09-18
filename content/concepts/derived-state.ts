export const derivedStateConcept = {
  id: "derived-state",
  slug: "derived-state",
  title: "Derived State",
  description:
    "Calculate UI values from existing state without creating a second source of truth.",
  category: "state",
  order: 22,
  aliases: ["derived value", "useMemo", "derivedStateOf"],
  keywords: [
    "computed state",
    "memoization",
    "update frequency",
    "single source of truth",
  ],
  implementations: {
    "react-native": {
      name: "Render-time derivation",
      summary: "Calculate a cheap value directly from current props and state.",
      language: "tsx",
      filename: "CartSummary.tsx",
      code: `function CartSummary({ items }: Props) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <Text>Total: {total}</Text>;
}`,
    },
    kotlin: {
      name: "Recomposition-time derivation",
      summary:
        "Calculate a cheap value directly from the latest composable parameters.",
      language: "kotlin",
      filename: "CartSummary.kt",
      code: `@Composable
fun CartSummary(items: List<CartItem>) {
    val total = items.sumOf { it.price }
    Text("Total: $total")
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "equivalent",
      explanation:
        "Both should derive cheap values during rendering rather than synchronize duplicate mutable state.",
    },
  ],
  mentalModel:
    "If a value can be calculated from current inputs, calculate it. Reach for useMemo or derivedStateOf only when measured cost or update frequency justifies memoization.",
  differences: [
    "React memoization depends on dependency arrays.",
    "derivedStateOf is most useful when input state changes more often than the UI needs to update.",
  ],
  commonMistakes: [
    "Copying a derived value into mutable state and then using an effect to keep it synchronized.",
  ],
  productionNotes: [
    "Keep one source of truth; optimize derivation only after identifying meaningful recomposition or calculation cost.",
  ],
} as const;
