export const layoutConcept = {
  id: "layout",
  slug: "layout",
  title: "Layout",
  description:
    "Arrange UI with flex direction in React Native and layout composables in Jetpack Compose.",
  category: "layout",
  order: 25,
  aliases: ["flexbox", "Row", "Column"],
  keywords: ["spacing", "alignment", "modifier", "style"],
  implementations: {
    "react-native": {
      name: "View with Flexbox styles",
      summary: "React Native uses a style object to configure layout on View.",
      language: "tsx",
      filename: "ProfileHeader.tsx",
      code: `<View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
  <Avatar />
  <Text>{name}</Text>
</View>`,
    },
    kotlin: {
      name: "Row with Modifier",
      summary:
        "Compose uses a layout composable and modifier chain for placement.",
      language: "kotlin",
      filename: "ProfileHeader.kt",
      code: `Row(verticalAlignment = Alignment.CenterVertically) {
    Avatar()
    Spacer(Modifier.width(12.dp))
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
        "Both use a flex-like mental model, but Compose layout behavior is expressed through composable parameters and Modifier rather than a single style object.",
    },
  ],
  mentalModel:
    "In Compose, Row or Column owns measurement and placement while Modifier decorates or constrains an individual child.",
  differences: [
    "React Native styles are plain JavaScript objects.",
    "Compose modifiers are ordered; changing their order can change layout and drawing.",
  ],
  commonMistakes: [
    "Assuming a Modifier affects a parent or sibling instead of the composable it is attached to.",
  ],
  productionNotes: [
    "Extract repeated spacing and alignment into reusable composables or design tokens.",
  ],
} as const;
