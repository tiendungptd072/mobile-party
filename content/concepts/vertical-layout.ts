export const verticalLayoutConcept = {
  id: "vertical-layout",
  slug: "vertical-layout",
  title: "Vertical Layout",
  category: "layout",
  order: 26,
  description:
    "Translate a flex-direction column layout into a Compose Column with deliberate arrangement and alignment.",
  aliases: ["flexDirection column", "vertical stack"],
  keywords: ["layout", "vertical", "spacing", "alignment", "flexbox"],
  implementations: {
    "react-native": {
      name: "View column",
      summary:
        "A View arranges children vertically when flexDirection is column.",
      language: "typescript",
      filename: "profile-summary.tsx",
      code: `<View style={{ flexDirection: "column", gap: 12, alignItems: "center" }}>
  <Avatar user={user} />
  <Text>{user.name}</Text>
</View>`,
    },
    kotlin: {
      name: "Column",
      summary:
        "Column arranges children vertically with explicit arrangement and alignment.",
      language: "kotlin",
      filename: "ProfileSummary.kt",
      code: `Column(
  verticalArrangement = Arrangement.spacedBy(12.dp),
  horizontalAlignment = Alignment.CenterHorizontally,
) {
  Avatar(user)
  Text(user.name)
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both place children on a vertical main axis and support spacing and cross-axis alignment.",
    },
  ],
  mentalModel:
    "Map the main-axis intent first: a React Native column becomes Column. Then translate cross-axis alignment and child sizing independently.",
  differences: [
    "React Native uses a style object; Compose passes layout choices as typed parameters and Modifiers.",
    "Compose uses a child Modifier for many child-specific constraints.",
  ],
  commonMistakes: [
    "Applying fillMaxSize or weight to the wrong child and accidentally changing the available space for siblings.",
  ],
  productionNotes: [
    "Use a scroll container or LazyColumn for content that can exceed the viewport instead of relying on a large static Column.",
  ],
} as const;
