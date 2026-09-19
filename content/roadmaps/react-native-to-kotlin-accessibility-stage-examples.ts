export const accessibilityStageExamples = {
  "accessibility-semantics": {
    basic: {
      "react-native": {
        name: "Label an icon-only action",
        summary:
          "The screen reader receives a meaningful action label and role.",
        language: "tsx",
        filename: "DeleteButton.tsx",
        code: `<Pressable accessibilityLabel="Delete draft" accessibilityRole="button" onPress={onDelete}>
  <TrashIcon />
</Pressable>`,
      },
      kotlin: {
        name: "Label an icon-only action",
        summary:
          "A standard IconButton exposes button semantics and the icon supplies its label.",
        language: "kotlin",
        filename: "DeleteButton.kt",
        code: `IconButton(onClick = onDelete) {
    Icon(Icons.Default.Delete, contentDescription = "Delete draft")
}`,
      },
    },
    applied: {
      "react-native": {
        name: "Expose a selected toggle",
        summary:
          "A custom control tells assistive technology its selected state.",
        language: "tsx",
        filename: "FavoriteButton.tsx",
        code: `<Pressable
  accessibilityLabel="Favorite article"
  accessibilityRole="togglebutton"
  accessibilityState={{ checked: isFavorite }}
  onPress={onToggle}
>
  <HeartIcon filled={isFavorite} />
</Pressable>`,
      },
      kotlin: {
        name: "Expose a checked toggle",
        summary:
          "IconToggleButton provides toggle semantics and checked state.",
        language: "kotlin",
        filename: "FavoriteButton.kt",
        code: `IconToggleButton(checked = isFavorite, onCheckedChange = onToggle) {
    Icon(Icons.Default.Favorite, contentDescription = "Favorite article")
}`,
      },
    },
    production: {
      "react-native": {
        name: "Keep test selection separate",
        summary:
          "testID is a stable selector, while accessibility props remain user-facing metadata.",
        language: "tsx",
        filename: "SaveButton.tsx",
        code: `<Pressable
  testID="profile-save"
  accessibilityRole="button"
  accessibilityLabel="Save profile"
  onPress={onSave}
>
  <Text>Save</Text>
</Pressable>`,
      },
      kotlin: {
        name: "Keep test selection separate",
        summary:
          "testTag selects a node in tests; contentDescription remains user-facing semantics.",
        language: "kotlin",
        filename: "SaveButtonTest.kt",
        code: `IconButton(onClick = onSave, modifier = Modifier.testTag("profile-save")) {
    Icon(Icons.Default.Save, contentDescription = "Save profile")
}

composeTestRule.onNodeWithTag("profile-save").performClick()`,
      },
    },
  },
} as const;
