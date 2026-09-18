export const stackConcept = {
  id: "stack",
  slug: "stack",
  title: "Stack",
  category: "layout",
  order: 28,
  description:
    "Overlay content with React Native absolute positioning or Compose Box alignment.",
  aliases: ["position absolute", "zIndex", "overlay"],
  keywords: ["stack", "overlay", "badge", "layer", "alignment"],
  implementations: {
    "react-native": {
      name: "Absolute-positioned View",
      summary:
        "A relative parent anchors an overlay child with absolute positioning.",
      language: "typescript",
      filename: "avatar-badge.tsx",
      code: `<View style={{ position: "relative" }}>
  <Avatar user={user} />
  <View style={{ position: "absolute", right: 0, bottom: 0 }}><OnlineBadge /></View>
</View>`,
    },
    kotlin: {
      name: "Box",
      summary: "Box layers children and lets each child choose an alignment.",
      language: "kotlin",
      filename: "AvatarBadge.kt",
      code: `Box {
  Avatar(user)
  OnlineBadge(Modifier.align(Alignment.BottomEnd))
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both layer children; Box makes the common alignment relationship explicit without manual coordinates.",
    },
  ],
  mentalModel:
    "Use a stack only when the visual relationship is overlap. Let the parent establish the coordinate space and let overlays describe their anchor.",
  differences: [
    "React Native often uses position: absolute; Compose Box supports alignment through Modifier.align.",
    "Compose draw order follows composition order unless a zIndex is necessary.",
  ],
  commonMistakes: [
    "Using absolute positioning for ordinary rows or columns, which breaks with dynamic content and accessibility settings.",
  ],
  productionNotes: [
    "Ensure overlays do not hide required controls, remain accessible, and respond to text scale or variable image sizes.",
  ],
} as const;
