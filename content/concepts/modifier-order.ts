export const modifierOrderConcept = {
  id: "modifier-order",
  slug: "modifier-order",
  title: "Modifier Order and Bounds",
  description:
    "Understand how Compose Modifier order changes drawing, spacing, and touch bounds instead of treating it like a React Native style object.",
  category: "layout",
  order: 8.4,
  aliases: ["modifier chain", "padding order", "clickable bounds"],
  keywords: ["modifier", "layout", "background", "padding", "clickable"],
  implementations: {
    "react-native": {
      name: "A padded surface",
      summary:
        "A View style gives its background and padding to the same surface.",
      language: "tsx",
      filename: "Card.tsx",
      code: `<View style={{ backgroundColor: "#dbeafe", padding: 16 }}>
  <Text>Profile</Text>
</View>`,
    },
    kotlin: {
      name: "Ordered surface modifiers",
      summary: "Background before padding paints the outer bounds.",
      language: "kotlin",
      filename: "Card.kt",
      code: `Box(
    modifier = Modifier
        .background(Color(0xFFDBEAFE))
        .padding(16.dp),
) {
    Text("Profile")
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "different",
      explanation:
        "React Native style properties describe a view; each Compose Modifier element wraps the next, so changing their order can change drawing and hit-test bounds.",
    },
  ],
  mentalModel:
    "Read a Modifier chain from left to right as nested behavior around the content. Move background or clickable across padding only after deciding whether the padding belongs inside or outside that painted or tappable area.",
  differences: [
    "Modifier.background(...).padding(...) paints the padded area; Modifier.padding(...).background(...) leaves the outer padding outside the background.",
    "Modifier.clickable(...).padding(...) includes padding in the clickable region; reversing them changes that region.",
  ],
  commonMistakes: [
    "Reordering Modifier calls for formatting and accidentally changing visual or touch behavior.",
  ],
  productionNotes: [
    "Check rendered and clickable bounds with UI tests, especially for minimum touch targets and nested interactive surfaces.",
  ],
} as const;
