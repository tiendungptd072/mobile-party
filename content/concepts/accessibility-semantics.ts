export const accessibilitySemanticsConcept = {
  id: "accessibility-semantics",
  slug: "accessibility-semantics",
  title: "Accessibility Semantics and Test Tags",
  description:
    "Preserve the meaning, state, and discoverability of custom controls while keeping accessibility semantics separate from test-only identifiers.",
  category: "testing",
  order: 34.5,
  aliases: ["accessibilityRole", "testID", "semantics", "testTag"],
  keywords: ["accessibility", "screen reader", "semantics", "testing", "tag"],
  implementations: {
    "react-native": {
      name: "Accessible custom control",
      summary: "Give a custom touch target a label, role, and selected state.",
      language: "tsx",
      filename: "FavoriteButton.tsx",
      code: `<Pressable
  accessibilityLabel="Favorite article"
  accessibilityRole="button"
  accessibilityState={{ selected: isFavorite }}
  onPress={onToggle}
>
  <HeartIcon filled={isFavorite} />
</Pressable>`,
    },
    kotlin: {
      name: "Semantic custom control",
      summary: "Expose an equivalent role and state through Compose semantics.",
      language: "kotlin",
      filename: "FavoriteButton.kt",
      code: `IconToggleButton(checked = isFavorite, onCheckedChange = onToggle) {
    Icon(
        imageVector = Icons.Default.Favorite,
        contentDescription = "Favorite article",
    )
}`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both expose a control's purpose and current state to assistive technology, but Compose standard components often provide semantics automatically and custom composables can augment their semantics tree.",
    },
  ],
  mentalModel:
    "Build behavior with standard controls first because their semantics are already correct. When custom visuals are necessary, describe the user-visible role, label, state, and action; add a test identifier separately only for tests.",
  differences: [
    "React Native uses accessibility properties on a view; Compose exposes semantics through standard composables and Modifier.semantics or specialized modifiers such as toggleable.",
    "testID and Modifier.testTag are for test selection, not a substitute for a screen-reader label or role.",
  ],
  commonMistakes: [
    "Adding a test tag to an unlabeled icon-only control and assuming it becomes accessible.",
  ],
  productionNotes: [
    "Test screen-reader focus, state announcements, minimum touch targets, and the semantics tree; use stable tags only where behavioral tests need a selector.",
  ],
} as const;
