export const horizontalLayoutConcept = {
  id: "horizontal-layout",
  slug: "horizontal-layout",
  title: "Horizontal Layout",
  category: "layout",
  order: 27,
  description:
    "Translate a flex-direction row layout into a Compose Row with explicit space distribution.",
  aliases: ["flexDirection row", "horizontal stack"],
  keywords: ["layout", "horizontal", "weight", "alignment", "flexbox"],
  implementations: {
    "react-native": {
      name: "View row",
      summary: "A View lays children out on the horizontal main axis.",
      language: "typescript",
      filename: "profile-row.tsx",
      code: `<View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
  <Avatar user={user} />
  <Text style={{ flex: 1 }}>{user.name}</Text>
  <IconButton icon="more" />
</View>`,
    },
    kotlin: {
      name: "Row",
      summary:
        "Row uses weight for a flexible child and verticalAlignment for the cross axis.",
      language: "kotlin",
      filename: "ProfileRow.kt",
      code: `Row(verticalAlignment = Alignment.CenterVertically) {
  Avatar(user)
  Spacer(Modifier.width(12.dp))
  Text(user.name, Modifier.weight(1f))
  IconButton(onClick = onMore) { Icon(Icons.Default.MoreVert, null) }
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Row and a flex row share a horizontal main axis, but Compose distributes remaining width with Modifier.weight.",
    },
  ],
  mentalModel:
    "Translate flex: 1 on a row child to weight(1f), then check which dimension the Modifier affects in that parent.",
  differences: [
    "React Native's flex styles are CSS-like; Compose weight is scoped to Row or Column.",
    "Compose uses explicit Spacer composables when a fixed gap is clearer.",
  ],
  commonMistakes: [
    "Expecting weight to work outside a Row or Column scope, or using it when intrinsic content width is required.",
  ],
  productionNotes: [
    "Test long text, RTL, larger font scale, and narrow widths so trailing actions remain reachable.",
  ],
} as const;
